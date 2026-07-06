import mongoose, { Schema, Document } from "mongoose";

// Para definir una entidad primero se define el tipado y luego el schema
// Document es la interfaz que define el tipado de la entidad
export interface IGuitar extends Document {
    name: string;
}

// Schema es la definicion de la estructura de la entidad
const guitarSchema: Schema = new Schema({
    // Agrega la propiedad name
    name: {
        // El tipo es string
        type: String,
        // Es requerido (no puede estar vacío)
        required: true,
    },
});

// Model es la clase que se usa para interactuar con la base de datos
const Guitar = mongoose.model<IGuitar>("Guitar", guitarSchema);
export default Guitar;
