import express from "express";
import cors from "cors";
import { Socket } from "socket.io";
import authRoutes from "./Routes/auth.route.js";
import dotenv from "dotenv";
import { connectDb } from "./DB/connectDb.js";
import { Socket } from "socket.io";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT;
app.use("/api/auth", authRoutes);



app.listen(port, () => {
  connectDb();
  console.log("server is running in " + port);
});
