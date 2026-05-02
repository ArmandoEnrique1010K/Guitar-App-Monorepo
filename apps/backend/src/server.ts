import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "config/db";
import profileRoutes from "routes/User/profileRoutes";
import authRoutes from "routes/User/authRoutes";
import notebookRoutes from "routes/Notebook/notebookRoutes";
import configurationRoutes from "routes/Notebook/configurationRoutes";

dotenv.config();
console.log("API KEY:", process.env.RESEND_API_KEY);

connectDB();
const app = express();
// Logging
// app.use(morgan("dev"));

// Leer datos de formularios
app.use(express.json());
// app.use(cors(corsConfig));
app.use(cookieParser());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/notebook", notebookRoutes);
app.use("/api/configuration", configurationRoutes);

export default app;
