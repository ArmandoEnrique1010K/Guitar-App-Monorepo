import mongoose, { Schema, Document, Types } from "mongoose";

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

const Workspace = mongoose.model<IWorkspace>("Workspace", workspaceSchema);
export default Workspace;
