import mongoose, { Schema, Document, Types } from "mongoose";
import Preset from "./Preset";

export interface IWorkspace extends Document {
    name: string;
    user: Types.ObjectId;
    // Es redundante definir un campo para el conteo de configuraciones
    // presetCount: number;
}

const workspaceSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },

    // Relacion workspace a user, muchos a uno
    user: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },

    // Este campo es redundante porque se puede hacer un conteo desde el controlador
    // presetCount: {
    //     type: Number,
    //     required: true
    // },
});

// Middleware que se ejecuta antes de eliminar un Workspace mediante
// document.deleteOne().
workspaceSchema.pre(
    "deleteOne",
    { document: true },
    async function (this: IWorkspace) {
        // Elimina todas las configuraciones que pertenecen al Workspace.
        await Preset.deleteMany({
            workspace: this._id,
        });
    },
);

const Workspace = mongoose.model<IWorkspace>("Workspace", workspaceSchema);
export default Workspace;
