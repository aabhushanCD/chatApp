import express from "express";
import cors from "cors";
import { Socket } from "socket.io";
import authRoutes from "./Routes/auth.route.js";
import messageRoutes from "./Routes/message.route.js";
import dotenv from "dotenv";
import { connectDb } from "./Lib/connectDb.js";

import cookieParser from "cookie-parser";
dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // ⬅️ Replace with frontend URL for better security
    credentials: true,
  })
);
// cookieparser
app.use(cookieParser());

app.use(express.json({ limit: "10mb" }));

// Authentication Routes contain here (login, signUp, checkuser)
app.use("/api/auth", authRoutes);

// Message Routes contain here (login, signUp, checkuser)
app.use("/api/messages", messageRoutes);

app.listen(PORT, () => {
  connectDb();
  console.log("server is running in " + PORT);
});
