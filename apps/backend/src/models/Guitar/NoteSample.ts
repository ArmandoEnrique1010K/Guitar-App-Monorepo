import mongoose, { Schema, Document, Types } from "mongoose";

export interface INoteSample extends Document {
    noteIndex: string;
    audioUrl: number;
    // Referencia a la guitarra para relacionar una nota musical con una guitarra
    guitar: Types.ObjectId;
}

const noteSampleSchema: Schema = new Schema({
    noteIndex: {
        type: Number,
        required: true,
    },
    audioUrl: {
        type: String,
        required: true,
    },

    // Relacion de muchos a uno entre NoteSample y Guitar
    guitar: {
        type: Types.ObjectId,
        // Referencia a la entidad Guitar
        ref: "Guitar",
    },
});

const NoteSample = mongoose.model<INoteSample>("NoteSample", noteSampleSchema);
export default NoteSample;
