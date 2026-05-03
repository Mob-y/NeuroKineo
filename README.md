# 🧠 NeuroKineo

> Application web de quiz de révision pour les étudiants en kinésithérapie.

---

## 📋 Présentation

NeuroKineo est un outil de révision interactif conçu pour les étudiants et praticiens en kinésithérapie. Il permet de s'entraîner sur des questions d'anatomie, de physiologie et de pathologie, organisées par matière, année de formation et niveau de difficulté.

Le projet est développé en HTML / CSS / JavaScript vanilla — sans framework, sans dépendance externe — pour rester simple, rapide et facilement maintenable.

---

## ✨ Fonctionnalités

- Navigation par matière → année → chapitre → niveau de difficulté
- 3 niveaux de difficulté (Facile opérationnel, Moyen et Difficile à venir)
- QCM avec 4 choix de réponses (niveau Facile)
- Correction immédiate avec explication pédagogique
- Page de résultats détaillée avec score et récapitulatif des erreurs
- Questions mélangées aléatoirement à chaque session
- Design responsive — fonctionne sur mobile et desktop

---

## 🗂️ Structure du projet

```
NeuroKineo/
├── index.html          # Point d'entrée — toutes les pages de l'application
├── css/
│   └── style.css       # Styles globaux
├── js/
│   ├── app.js          # Logique de navigation et moteur de quiz
│   └── questions.js    # Base de données des questions
├── assets/
│   └── images/         # Images pour les questions (niveaux Moyen et Difficile)
└── README.md
```

---

## 🚀 Lancer le projet en local

Aucune installation requise. Deux options :

**Option 1 — Extension VSCode (recommandé)**
1. Installer l'extension [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) dans VSCode
2. Clic droit sur `index.html` → `Open with Live Server`

**Option 2 — Directement dans le navigateur**
1. Ouvrir le fichier `index.html` dans n'importe quel navigateur moderne

---

## 📚 Ajouter des questions

Les questions sont dans `js/questions.js`. La structure est la suivante :

```javascript
const QUESTIONS = {
  anatomie: {                          // clé de la matière
    label: "Anatomie & Physiologie",
    annees: {
      1: {                             // année (1, 2, 3...)
        label: "1ère année",
        sousSections: {
          tissus: {                    // clé du chapitre
            label: "Tissus et organes",
            facile: [                  // tableau de questions niveau facile
              {
                id: "unique_id",
                type: "qcm4",
                question: "Texte de la question ?",
                reponses: ["Choix A", "Choix B", "Choix C", "Choix D"],
                bonne_reponse: 0,      // index de la bonne réponse (0 = A)
                explication: "Explication pédagogique affichée après réponse."
              }
            ]
          }
        }
      }
    }
  }
}
```

---

## 🛣️ Roadmap

- [x] Navigation complète (matière → année → chapitre → niveau)
- [x] Niveau Facile — QCM 4 choix
- [x] Résultats avec correction détaillée
- [x] Mélange aléatoire des questions
- [ ] Niveau Moyen — QCM 2 images + Vrai/Faux + identification
- [ ] Niveau Difficile — réponse texte libre
- [ ] Ajout des images pour les questions visuelles
- [ ] Système de score et historique de sessions
- [ ] Mode révision (revoir uniquement les questions ratées)
- [ ] Export des résultats en PDF

---

## 🛠️ Stack technique

| Technologie | Usage |
|-------------|-------|
| HTML5 | Structure des pages |
| CSS3 | Styles et responsive |
| JavaScript ES6 | Logique applicative |
| Google Fonts (Nunito) | Typographie |

Aucun framework, aucune dépendance npm.

---

## 👥 Auteurs

Projet développé en binôme :

- **[Mob-y](https://github.com/Mob-y)** — Développement
- **Sa femme** — Contenu pédagogique & validation médicale (kinésithérapeute)

---

## ⚠️ Avertissement

Les questions présentes dans cette application sont fournies à titre indicatif. Elles ne remplacent pas les cours officiels ni les supports pédagogiques des instituts de formation en masso-kinésithérapie. Toute question médicale ou clinique doit être validée par un professionnel de santé.

---

## 📄 Licence

Ce projet est open source — libre d'utilisation à des fins pédagogiques non commerciales.