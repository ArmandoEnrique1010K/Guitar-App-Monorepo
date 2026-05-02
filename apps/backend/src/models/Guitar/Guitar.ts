import mongoose, { Schema, Document, Types } from "mongoose";

export interface IGuitar extends Document {
  name: string;
}

const guitarSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const Guitar = mongoose.model<IGuitar>("Guitar", guitarSchema);
export default Guitar;
