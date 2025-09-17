# 📖 Citations Aléatoires - Exercice React

Application React simple qui affiche des citations aléatoires avec possibilité de copie.

## 🚀 Installation

```bash
npm install
npm run dev
```

## Captures 

![App Screenshot](./capture/screenshot.png)

## ✨ Fonctionnalités

- Affichage de citations aléatoires (API DummyJSON)  
- Génération de nouvelles citations via bouton
- Copie dans le presse-papiers avec feedback visuel
- Hook personnalisé `useCopy` pour la gestion du clipboard
- Interface responsive avec thème clair épuré

## 🛠️ Technologies

- React 18 + Vite
- Axios pour les appels API
- CSS Modules pour les styles
- Hook personnalisé (useCopy)
- API DummyJSON : https://dummyjson.com/quotes/random

## 📁 Structure du projet

```
src/
├── components/
│   ├── quote/          # Composant d'affichage des citations
│   │   ├── Quote.jsx
│   │   └── quote.module.css
│   ├── randomButton/   # Bouton pour nouvelle citation
│   │   ├── RandomButton.jsx
│   │   └── randomButton.module.css
│   └── copy/          # Bouton de copie
│       ├── Copy.jsx
│       └── copy.module.css
├── hooks/
│   ├── useCopy.js     # Hook personnalisé pour clipboard
├── service/
│   └── fetchQuote.js  # Service API pour récupérer citations
├── Home.jsx           # Composant principal
├── index.css          # Styles globaux et variables CSS
└── main.jsx           # Point d'entrée
```

## 🎯 Hooks personnalisés

### `useCopy`
```javascript
const { copy, copied } = useCopy();
```
Gère la copie dans le presse-papiers avec feedback visuel "Copié !".

## 🎨 Fonctionnement

1. **Chargement initial** : Une citation s'affiche automatiquement
2. **Nouvelle citation** : Cliquez sur "Nouvelle citation" 
3. **Copie** : Cliquez sur "Copier" pour mettre la citation dans le clipboard