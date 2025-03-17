import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";

// Récupérer tous les utilisateurs visibles
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({ where: { isVisible: true } });
    return res.status(200).json(users);
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    return res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
};

// Récupérer un utilisateur par ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    return res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { username, email, age, password, description, profilePicture } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    let hashedPassword = user.password;
    if (password) {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }

    await user.update({
      username,
      email,
      age,
      password: hashedPassword,
      description,
      profilePicture,
    });

    return res.status(200).json({ message: "Utilisateur mis à jour avec succès" });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
    return res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

export const updateVisibility = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { isVisible } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    await user.update({ isVisible });

    return res.status(200).json({ message: "Visibilité mise à jour avec succès" });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la visibilité :", error);
    return res.status(500).json({ message: "Erreur interne du serveur" });
  }
};
