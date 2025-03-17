import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

export const generateToken = (userId: number, username: string) => {
    return jwt.sign({ userId, username }, JWT_SECRET, { expiresIn: "3d" });
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET);
}