import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Accès non autorisé, token manquant" });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number, username: string };
        req.body.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token invalid" });
    }
}