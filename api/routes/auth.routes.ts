import express from "express";
import { login, register } from "../controllers/auth.controller";
import upload from "../middlewares/upload.middleware";

const router=express.Router();

router.post("/register", upload.single("profilePicture"), register);
router.post("/login",login);

export default router;