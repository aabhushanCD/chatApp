import express from "express";
import cors from "cors";

import authRoutes from "./Routes/auth.route.js";
import messageRoutes from "./Routes/message.route.js";
import dotenv from "dotenv";
import { connectDb } from "./Lib/connectDb.js";
import { DeleteAllMessages } from "../src/Controller/chat.Controller.js";
import cookieParser from "cookie-parser";
import { app, server } from "./Lib/socket.js";
dotenv.config();
const PORT = process.env.PORT || 5000;
const allowedOrigins = [
  "https://chat-app-olive-psi.vercel.app",
  "http://localhost:3000",
  "http://localhost:5173",
];
app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (mobile apps, postman, socket)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
// cookieparser
app.use(cookieParser());

// clean UP delete all Message
// DeleteAllMessages();
app.use(express.json({ limit: "10mb" }));

// Authentication Routes contain here (login, signUp, checkuser)
app.use("/api/auth", authRoutes);

// Message Routes contain here (login, signUp, checkuser)
app.use("/api/messages", messageRoutes);

server.listen(PORT, "0.0.0.0", () => {
  connectDb();
  console.log("server is running in " + PORT);
});
