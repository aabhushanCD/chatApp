import express from "express";
import { login, logOut, signUp } from "../Controller/auth.Controller.js";
const router = express.Router();

router.post("/login", login);
router.post("/signUp", signUp);
router.post("/logOut", logOut);

export default router;
