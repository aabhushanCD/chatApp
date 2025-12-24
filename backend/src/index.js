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
const PORT = process.env.PORT;

app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, origin); // Reflect the request origin
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
