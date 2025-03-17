import { Request, Response } from "express";
import User from "../models/user.model";
import axios from "axios";
import Favories from "../models/favorites.model";

const HACKER_NEWS_API = "https://hacker-news.firebaseio.com/v0";

export const addFavorite = async (req: Request, res: Response) => {
    const { userId, storyId } = req.body;
    try {
        const user = await User.findOne({ where: { id: userId } });

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        const { data } = await axios.get(`${HACKER_NEWS_API}/topstories.json`);

        if (!data.includes(storyId)) {
            return res.status(404).json({ message: "Story non trouvée" });
        }

        const story = await Favories.create({ userId, storyId });

        return res.status(201).json({ message: "Nouveau favori ajouté avec succès", story });
    } catch (error) {
        console.error("Erreur lors de l'ajout du favori:", error);
        return res.status(500).json({ message: "Erreur lors de l'ajout du favori" });
    }
};

export const getFavoritesByUser = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        // Récupérer tous les favoris de l'utilisateur
        const favorites = await Favories.findAll({ where: { userId } });

        if (favorites.length === 0) {
            return res.status(200).json({ message: "Aucun favori trouvé", stories: [] });
        }

        const stories = await Promise.all(
            favorites.map(async (fav) => {
                try {
                    const { data } = await axios.get(`${HACKER_NEWS_API}/item/${fav.storyId}.json`);
                    return data;
                } catch (error) {
                    console.error(`Erreur lors de la récupération de l'histoire ${fav.storyId}:`, error);
                    return null;
                }
            })
        );

        const validStories = stories.filter((story) => story !== null);

        return res.status(200).json({ stories: validStories });

    } catch (error) {
        console.error("Erreur lors de la récupération des favoris:", error);
        return res.status(500).json({ message: "Erreur lors de la récupération des favoris" });
    }
};

export const removeFavorite=async(req:Request,res:Response)=>{
    const {id}=req.params;
    try {
        await Favories.destroy({where:{id}});
        return res.status(203).json({message:"Favori supprimé"})
    } catch (error) {
        return res.status(500).json({message:"Erreur lors de la suppression du favori"});
        
    }
}


