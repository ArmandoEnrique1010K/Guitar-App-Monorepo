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

// Habilita dotenv de forma global
dotenv.config();

// Conecta a la base de datos
connectDB();

// Configurar Express
const app = express();

// Leer datos de formularios
app.use(express.json());

// Habilitar CORS
app.use(cors(corsConfig));

// Parsear cookies
app.use(cookieParser());

// Rutas o endpoints concatenados
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/workspace", workspaceRoutes);
app.use("/api/preset", presetRoutes);
app.use("/api/guitar", guitarRoutes);
app.use("/api/noteSample", noteSampleRoutes);

// Obtiene archivos mediante HTTP para que puedan ser consumidos
// desde el frontend (React + Tone.js).

// Los navegadores bloquean el acceso a rutas locales del sistema de archivos
// (file:///D:/...) cuando una aplicación web intenta cargarlas.

// Por ese motivo, los archivos de audios almacenados en una carpeta de una
// PC como por ejemplo: D:/ArmandoEnrique1020k/Sonidos

// se exponen temporalmente mediante un endpoint como el siguiente:
// http://localhost:4000/audio

// Se puede utilizar express.static en un entorno de desarrollo para obtener
// los archivos de audio desde una carpeta del PC
app.use("/audio", express.static("D:/ArmandoEnrique1020k/Sonidos"));

// Ejemplo de uso:
// D:/ArmandoEnrique1020k/Sonidos/cleanSolo/46.mp3
// http://localhost:4000/audio/cleanSolo/46.mp3

// TODO: Reemplazar express.static por almacenamiento en la nube (Cloudflare R2, Amazon S3 o similar) antes del despliegue a producción.

// Exporta por defecto
export default app;
