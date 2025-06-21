import express from "express";
import cors from "cors";
import { Socket } from "socket.io";
import authRoutes from "./Routes/auth.route.js";
import dotenv from "dotenv";
import { connectDb } from "./Lib/connectDb.js";

import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;
app.use("/api/auth", authRoutes);
app.use(cookieParser());
app.listen(PORT, () => {
  connectDb();
  console.log("server is running in " + PORT);
});
