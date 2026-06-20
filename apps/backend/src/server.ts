import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "config/db";
import profileRoutes from "routes/User/profileRoutes";
import authRoutes from "routes/User/authRoutes";
import workspaceRoutes from "routes/Workspace/workspaceRoutes";
import presetRoutes from "routes/Workspace/presetRoutes";
import guitarRoutes from "routes/Guitar/guitarRoutes";
import noteSampleRoutes from "routes/Guitar/noteSampleRoutes";
import { corsConfig } from "config/cors";
import cors from "cors";

dotenv.config();
// console.log("API KEY:", process.env.RESEND_API_KEY);
// console.log("DATABASE URL:", process.env.DATABASE_URL);

connectDB();

const app = express();
// Logging
// app.use(morgan("dev"));

// Leer datos de formularios
app.use(express.json());
app.use(cors(corsConfig));
app.use(cookieParser());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/workspace", workspaceRoutes);
app.use("/api/preset", presetRoutes);
app.use("/api/guitar", guitarRoutes);
app.use("/api/noteSample", noteSampleRoutes);

/**
 * Servir archivos de audio mediante HTTP para que puedan ser consumidos
 * desde el frontend (React + Tone.js).
 *
 * Los navegadores bloquean el acceso a rutas locales del sistema de archivos
 * (file:///D:/...) cuando una aplicación web intenta cargarlas.
 *
 * Por ese motivo, los audios almacenados en:
 * D:/ArmandoEnrique1020k/Sonidos
 *
 * se exponen temporalmente mediante:
 * http://localhost:4000/audio
 *
 * Ejemplo:
 * D:/ArmandoEnrique1020k/Sonidos/cleanSolo/46.mp3
 * ↓
 * http://localhost:4000/audio/cleanSolo/46.mp3
 *
 * TODO:
 * Reemplazar express.static por almacenamiento en la nube
 * (Cloudflare R2, Amazon S3 o similar) antes del despliegue a producción.
 */
app.use("/audio", express.static("D:/ArmandoEnrique1020k/Sonidos"));

export default app;
