import mongoose, { Schema, Document, Types } from "mongoose";

export interface IWorkspace extends Document {
    name: string;
    user: Types.ObjectId;
    // presetCount: number;
}

const workspaceSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },
    // presetCount: {
    //     type: Number,
    // },
});

const Workspace = mongoose.model<IWorkspace>("Workspace", workspaceSchema);
export default Workspace;
