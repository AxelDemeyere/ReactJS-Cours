# 📝 Application de Notes Sécurisées

Une application moderne de gestion de notes avec authentification JWT, construite avec React 19, TypeScript et un design glassmorphism.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/react-19.1.1-blue.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.8.3-blue.svg)
![Vite](https://img.shields.io/badge/vite-7.1.6-purple.svg)

## ✨ Fonctionnalités

### 🔐 Authentification JWT
- **Connexion** et **inscription** sécurisées
- Token JWT stocké dans le localStorage
- Routes protégées avec redirection automatique
- Gestion automatique de l'expiration du token
- Déconnexion avec nettoyage complet de la session

### 📋 Gestion des Notes (CRUD)
- **Créer** des notes avec titre et contenu
- **Lister** toutes vos notes dans une interface bento moderne
- **Modifier** vos notes existantes
- **Supprimer** vos notes avec confirmation
- Interface responsive avec grille adaptative

### 🎨 Design Moderne
- **Thème sombre** avec palette de couleurs sophistiquée
- **Effet glassmorphism** (transparence + flou d'arrière-plan)
- **Style bento** avec cartes de tailles variées
- **Micro-interactions** fluides et animations élégantes
- **Typographie** système moderne (-apple-system, Segoe UI)

## 🏗️ Architecture

### Structure du Projet
```
src/
├── auth/                    # Gestion de l'authentification
│   ├── AuthContext.tsx      # Contexte React (types)
│   ├── AuthProvider.tsx     # Provider avec logique JWT
│   └── ProtectedRoute.tsx   # Composant de route protégée
│
├── components/              # Composants réutilisables
│   ├── Button/              # Bouton avec variants (primary, secondary, danger)
│   ├── Form/                # Formulaire avec gestion d'erreurs
│   ├── Input/               # Champs de saisie standard + titre
│   └── Textarea/            # Zone de texte avec mode flexible
│
├── pages/                   # Pages de l'application
│   ├── LoginPage/           # Connexion (publique)
│   ├── RegisterPage/        # Inscription (publique)
│   ├── NotesListPage/       # Liste des notes (protégée)
│   ├── NoteFormPage/        # Création/édition (protégée)
│   └── NotFoundPage/        # Page 404
│
├── App.tsx                  # Layout principal avec navigation
├── main.tsx                 # Point d'entrée avec routage
└── index.css                # Styles globaux et variables CSS
```

### Stack Technique
- **React 19** avec hooks modernes
- **TypeScript** pour la sécurité des types
- **React Router 7** pour la navigation
- **CSS Modules** pour l'encapsulation des styles
- **Vite** pour le bundling et le développement

## 🚀 Installation et Démarrage

### Prérequis
- Node.js (version 18+)
- Backend Spring Boot fonctionnel sur `http://localhost:8080`

### Installation
```bash
# Cloner le projet
git clone <url-du-repo>
cd exo5

# Installer les dépendances
npm install

# Démarrer en mode développement
npm run dev
```

### Scripts Disponibles
```bash
npm run dev      # Serveur de développement (http://localhost:5173)
npm run build    # Build de production
npm run preview  # Aperçu du build de production
npm run lint     # Vérification ESLint
```

## 🌐 Routage

### Routes Publiques
- `/login` - Page de connexion
- `/register` - Page d'inscription

### Routes Protégées
- `/` - Redirection vers `/notes`
- `/notes` - Liste des notes
- `/notes/new` - Création d'une nouvelle note
- `/notes/:id` - Édition d'une note existante

### Route Spéciale
- `*` - Page 404 pour toutes les autres URLs

## 🔌 API Backend Attendue

L'application communique avec un backend Spring Boot via les endpoints suivants :

### Authentification
```http
POST /api/auth/login
Content-Type: application/json
Body: { "email": "user@example.com", "password": "password" }
Response: { "accessToken": "jwt-token", "tokenType": "Bearer" }

POST /api/auth/register  
Content-Type: application/json
Body: { "email": "user@example.com", "password": "password" }
Response: { "accessToken": "jwt-token", "tokenType": "Bearer" }
```

### Notes (nécessitent authentification)
```http
GET /api/notes
Authorization: Bearer <token>
Response: [{ "id": 1, "title": "Titre", "content": "Contenu" }]

POST /api/notes
Authorization: Bearer <token>
Content-Type: application/json
Body: { "title": "Nouveau titre", "content": "Nouveau contenu" }

PUT /api/notes/:id
Authorization: Bearer <token>
Content-Type: application/json
Body: { "title": "Titre modifié", "content": "Contenu modifié" }

DELETE /api/notes/:id
Authorization: Bearer <token>
```

## 🎯 Fonctionnement

### 1. Authentification
1. L'utilisateur arrive sur `/login` ou `/register`
2. Saisie des identifiants et soumission du formulaire
3. Appel API vers le backend Spring Boot
4. En cas de succès : stockage du token JWT et redirection vers `/notes`
5. Le token est automatiquement inclus dans tous les appels API protégés

### 2. Protection des Routes
- `ProtectedRoute` vérifie la présence d'un token valide
- Si pas de token : redirection automatique vers `/login`
- Si token présent : accès autorisé aux pages protégées

### 3. Gestion des Notes
- **Liste** : Affichage en grille bento avec cartes de tailles variées
- **Création** : Formulaire avec titre et contenu, validation côté client
- **Édition** : Chargement des données existantes, modification et sauvegarde
- **Suppression** : Confirmation utilisateur puis suppression côté serveur

### 4. Gestion d'État
- **AuthContext** : État global de l'authentification (token, user, méthodes)
- **localStorage** : Persistance du token entre les sessions
- **useState local** : État des formulaires et données temporaires

## 🔧 Configuration

### Variables d'Environnement (optionnelles)
```env
VITE_API_BASE_URL=http://localhost:8080  # URL du backend (défaut: "")
```

## 📱 Utilisation

1. **Première visite** : Créer un compte sur `/register`
2. **Connexion** : Se connecter via `/login`
3. **Navigation** : Utiliser le menu de navigation en haut
4. **Créer une note** : Cliquer sur "Nouvelle note" ou utiliser `/notes/new`
5. **Gérer les notes** : Éditer ou supprimer depuis la liste des notes
6. **Déconnexion** : Utiliser le bouton "Déconnexion" dans le header

