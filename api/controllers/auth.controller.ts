import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model";
import { generateToken } from "../utils/jwt.utils";
import Joi from "joi";

// Schéma de validation sans `profilePicture`
const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  age: Joi.number().integer().min(13).optional(),
  description: Joi.string().max(500).optional(),
  isVisible: Joi.boolean().optional(),
});

export const register = async (req: Request, res: Response) => {
  // Validation des données
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { username, email, password, age, description, isVisible } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "Cet email est déjà utilisé" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const profilPicture = req.file ? `/uploads/${req.file.filename}` : null;

    // Création de l'utilisateur
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      age,
      profilPicture,
      description,
      isVisible: isVisible ?? true,
    });

    return res.status(201).json({
      message: "Utilisateur créé avec succès",
      token: generateToken(user.id, username),
      profilPicture,
    });
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    return res.status(500).json({ message: "Erreur lors de l'inscription" });
  }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log({ email, password })
    try {
        const user = await User.findOne({ where: email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect" });
        }
        return res.status(200).json({ message: "Connexion réussie", token: generateToken(user.id, user.username) })

    } catch (error) {
        return res.status(500).json({ message: "Erreur lors de la connexion" });
    }
}