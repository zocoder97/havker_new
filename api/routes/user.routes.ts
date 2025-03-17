import express from "express";
import { getUsers, getUserById, updateUser, updateVisibility } from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();

//Récupérer tous les utilisateurs
router.get("/users", getUsers);

//Récupérer un utilisateur par ID
router.get("/user/:userId", getUserById);

//Mettre à jour les informations d'un utilisateur
router.put("/user/:userId",authenticate, updateUser);

//Mettre à jour la visibilité d'un utilisateur
router.put("/update_is_visible/:userId",authenticate, updateVisibility);

export default router;