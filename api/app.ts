import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { sequelize } from "./config/db";
import authRoutes from "./routes/auth.routes";
import storyRoutes from "./routes/story.routes";
import userRoutes from "./routes/user.routes";
import cors from "cors";
import  User  from "./models/user.model";
import bcrypt from "bcrypt";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Middleware pour gérer les erreurs JSON mal formées
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && err.message.includes("Unexpected token")) {
    return res.status(400).json({ error: "JSON mal formé" });
  }
  next();
});

const PORT = process.env.PORT || 8080;

//Routes
app.use("/api/auth", authRoutes);
app.use("/api",userRoutes);
app.use("/api/story", storyRoutes);

app.use("/uploads",express.static("uploads"));
app.get("/", (request: Request, response: Response) => {
  return response.status(200).send({ message: "API HackerNews est en ligne" });
});

//Fonction pour insérer des utilisateurs fictifs si la base est vide
async function seedDatabase() {
  try {
    const count = await User.count();
    if (count === 0) {
        const saltRounds = 10;
        const hashedPassword1 = await bcrypt.hash("password123", saltRounds);
        const hashedPassword2 = await bcrypt.hash("securepass456", saltRounds);
      await User.bulkCreate([
        {
          username: "JohnDoe",
          email: "john@example.com",
          age: 30,
          password: hashedPassword1,
          description: "Développeur passionné par Next.js",
          profilPicture: "https://photos.example.com/150",
          isVisible: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "JaneSmith",
          email: "jane@example.com",
          age: 28,
          password: hashedPassword2,
          description: "Amatrice de Hackernews",
          profilPicture: "https://photos.example.com/150",
          isVisible: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
      console.log("Base de données pré-remplie avec des utilisateurs fictifs !");
    } else {
      console.log("La base contient déjà des utilisateurs.");
    }
  } catch (error) {
    console.error("Erreur lors du seeding :", error);
  }
}


sequelize
  .sync()
  .then(async () => {
    console.log("Base de données synchronisée !");
    await seedDatabase();
    app.listen(PORT, () => {
      console.log(`Serveur en ligne sur http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erreur lors de la connexion à la base de données :", err);
  });

export default app;
