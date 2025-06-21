import express from "express";
import {
  checkAuth,
  login,
  logOut,
  signUp,
  updateProfile,
} from "../Controller/auth.Controller.js";
import { protectRoute } from "../Middleware/auth.middleware.js";
const router = express.Router();

router.post("/login", login);
router.post("/signUp", signUp);
router.post("/logOut", logOut);

router.put("/update-profile", protectRoute, updateProfile);

router.get("/check", protectRoute, checkAuth);
export default router;
