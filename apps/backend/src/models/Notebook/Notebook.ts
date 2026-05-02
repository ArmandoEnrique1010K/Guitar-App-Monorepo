import mongoose, { Schema, Document, Types } from "mongoose";

export interface INotebook extends Document {
  name: string;
  user: Types.ObjectId;
}

const notebookSchema: Schema = new Schema({
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

const Notebook = mongoose.model<INotebook>("Notebook", notebookSchema);
export default Notebook;
