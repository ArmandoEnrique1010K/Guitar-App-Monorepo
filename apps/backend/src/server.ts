import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";

dotenv.config();
connectDB();

const app = express();
// Logging
// app.use(morgan("dev"));

// Leer datos de formularios
app.use(express.json());
// app.use(cors(corsConfig));

// Rutas
// app.use("/api/auth", authRoutes);

export default app;
