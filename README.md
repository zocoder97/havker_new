# Clone Hackernews - Next.js 14 & Node.js

## Description
Ce projet est un clone amélioré de la page d’accueil de [Hackernews](https://news.ycombinator.com/) avec une interface moderne et une gestion des utilisateurs. Il permet de :
- Consulter les histoires de l’API Hackernews.
- Créer un compte et se connecter.
- Ajouter des histoires en favoris.
- Modifier son profil utilisateur.
- Voir les autres utilisateurs et leurs favoris.

## Technologies utilisées
### Frontend (Next.js 14)
- React + Next.js (App Router)
- TypeScript
- TailwindCSS (optionnel)
- ShadCN UI (optionnel)
- Axios pour les requêtes HTTP

### Backend (Node.js + Express)
- Express.js pour l’API REST
- Sequelize ORM pour la base de données
- MySQL comme base de données
- JWT pour l’authentification
- Winston pour la gestion des logs

## Structure du projet
```
/mon-projet
│── /front                # Frontend (Next.js 14)
│   ├── pages/            # Pages principales
│   ├── components/       # Composants réutilisables
│   ├── services/         # Appels API
│   ├── Dockerfile        # Conteneurisation du frontend
│   ├── package.json
│   ├── ...
│
│── /back                 # Backend (Node.js + Express)
│   ├── models/           # Modèles Sequelize
│   ├── routes/           # Routes API
│   ├── controllers/      # Logique métier
│   ├── middlewares/      # Middlewares (authentification, validation)
│   ├── Dockerfile        # Conteneurisation du backend
│   ├── .env              # Variables d'environnement
│   ├── package.json
│   ├── ...
│
│── docker-compose.yml    # Orchestration avec Docker
│── Makefile              # Automatisation des commandes Docker
│── README.md             # Documentation du projet
│── .gitignore            # Fichiers à ignorer dans Git
```

## Installation et lancement
### 1. Prérequis
- Docker et Docker Compose installés
- Node.js >= 18 (si exécution sans Docker)
- MySQL installé (si exécution locale)

### 2. Démarrer avec Docker
Dans le dossier du projet, exécute :
```sh
make up
```
Cela va :
- Lancer la base de données MySQL
- Démarrer le backend sur `http://localhost:8080`
- Démarrer le frontend sur `http://localhost:3000`

Pour arrêter les services :
```sh
make down
```

### 3. Démarrer manuellement (sans Docker)
#### Backend
```sh
cd back
npm install
npm start
```
#### Frontend
```sh
cd front
npm install
npm run dev
```
Le frontend sera disponible sur `http://localhost:3000`.

## Fonctionnalités
✅ Connexion / Inscription  
✅ Gestion du profil utilisateur  
✅ Liste des histoires avec filtrage  
✅ Système de favoris  
✅ Base de données MySQL  
✅ API sécurisée avec JWT  

## Contribution
1. Forker le projet  
2. Créer une branche `feature/nom-de-la-feature`  
3. Committer vos modifications  
4. Soumettre une pull request  

