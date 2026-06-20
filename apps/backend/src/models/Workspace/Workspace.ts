import mongoose, { Schema, Document, Types } from "mongoose";

export interface IWorkspace extends Document {
    name: string;
    user: Types.ObjectId;
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
});

const Workspace = mongoose.model<IWorkspace>("Workspace", workspaceSchema);
export default Workspace;
