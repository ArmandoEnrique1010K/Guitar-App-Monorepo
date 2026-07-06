import mongoose, { Schema, Document, Types } from "mongoose";

export interface IToken extends Document {
    token: string;
    user: Types.ObjectId;
    // Date es el tipo para fechas
    createdAt: Date;
}

const tokenSchema: Schema = new Schema({
    token: {
        type: String,
        required: true,
    },
    // Relacion de muchos a uno entre Token y User
    user: {
        type: Types.ObjectId,
        ref: "User",
    },
    expiresAt: {
        type: Date,
        // default permite establecer un valor por defecto
        // En este caso es la fecha actual en la que se crea el
        // registro
        default: Date.now(),
        // expires permite establecer un tiempo de expiración
        // luego de la fecha actual

        // Si llegara a pasar ese tiempo, se elimina automaticamente
        // el registro

        // En este caso es 10 minutos
        expires: 1000 * 60 * 10,
    },
});

const Token = mongoose.model<IToken>("Token", tokenSchema);
export default Token;
