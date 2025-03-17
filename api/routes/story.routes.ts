import express from "express";
import { fetchTopStories } from "../controllers/story.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { addFavorite, getFavoritesByUser, removeFavorite } from "../controllers/favorites.controller";

const router = express.Router();

router.get("/top_stories", fetchTopStories);
router.post("/favorite", authenticate, addFavorite);
router.get("/favorites/:userId", getFavoritesByUser);
router.delete("/favorites/:id", authenticate, removeFavorite);

export default router;