import { Request, Response } from "express";
import { getTopStories } from "../services/story.service";

export const fetchTopStories=async(req:Request,res:Response)=>{
    try {
        const stories=await getTopStories();
        return res.status(200).json(stories);
    } catch (error) {
        return res.status(500).json({error:"Erreur lors de la récuperation des stories"});
        
    }
}