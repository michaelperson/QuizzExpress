# Quiz Express ⚡ — Exercice JavaScript (3 h)

> **Module** : Web Interactive — JavaScript
> **Thème** : chargement de données (`fetch` + **JSON**), itération (`forEach`, `for…in`, `for…of`), gestion des événements (`addEventListener` / `removeEventListener`), **fonctions callback** et **fonctions lambda** (fléchées)
> **Durée** : 3 h (séance encadrée)
> **Niveau** : intermédiaire — vous partez d'une **page vierge** (HTML + CSS + JS à écrire).

---

## 1. Le mot du formateur

Un quiz, c'est trompeusement simple : « j'affiche une question, l'utilisateur clique, je compte les points ». Sauf que c'est précisément le terrain de jeu idéal pour comprendre **la gestion des événements** — parce qu'à un moment, il faut **empêcher** le joueur de répondre deux fois. Et là, beaucoup d'étudiants découvrent que `removeEventListener` ne fonctionne **pas** avec une fonction fléchée écrite à la volée.

Nouveauté de cette version : les questions ne vivent plus **en dur** dans le JavaScript. Elles sont rangées dans des **fichiers JSON** — un par thème (JS, HTML, CSS) — que vous **chargez à la demande** avec `fetch`. C'est la vraie vie d'un développeur : les données viennent presque toujours de **l'extérieur** (un fichier, une API), et le code ne doit **rien** savoir de leur contenu. Séparer les **données** du **code** est l'un des réflexes les plus importants du métier.

Vous manipulerez aussi les **trois façons d'itérer** en JavaScript. Elles ne sont pas interchangeables : on ne parcourt pas un **tableau**, un **objet** et un **itérable** avec la même boucle. Choisir la bonne, c'est déjà écrire du code lisible.

---

## 2. Le jeu à construire

**Quiz Express** est un quiz **chronométré**, façon Kahoot, avec **choix du thème**.

- Sur l'écran d'accueil, le joueur **choisit un thème** dans une liste déroulante (JS, HTML, CSS…).
- Au démarrage, les questions du thème sont **chargées depuis le fichier JSON** correspondant.
- Une question s'affiche avec **4 réponses** (A, B, C, D).
- Un **compte à rebours** tourne pour chaque question (ex. 10 s).
- Le joueur répond **au clic** ou **au clavier** (touches A/B/C/D).
- Bonne réponse → points (avec **bonus de rapidité** et **bonus de série/streak**).
- Mauvaise réponse ou temps écoulé → on perd une **vie** (3 au départ) et la série retombe à 0.
- La partie se termine quand **toutes les questions sont passées** ou quand **les vies sont épuisées**.
- Un **écran de fin** récapitule chaque question (bonne/mauvaise) et affiche le **score final**. On peut y **rechoisir un thème** et **rejouer**.

---

## 3. ⭐ Concepts obligatoires — la carte d'identité de l'exercice

Chaque concept ci-dessous **doit** apparaître dans votre code, à l'endroit indiqué. C'est le cœur de l'évaluation.

| Concept | Où l'utiliser (imposé) |
|---|---|
| **`fetch` + JSON (asynchrone)** | Charger les questions depuis `data/<theme>.json` **selon le thème choisi**, avant de démarrer la partie. |
| **`for…in`** | Construire les **4 boutons de réponse** à partir de l'objet `options` (`{ A:…, B:…, C:…, D:… }`) de chaque question. On itère sur les **clés** de l'objet. |
| **`forEach`** | Parcourir le **tableau des boutons** créés pour leur **attacher** (puis détacher) les écouteurs. |
| **`for…of`** | Parcourir le **tableau des résultats** pour construire l'**écran de récapitulatif** de fin de partie. |
| **`addEventListener`** | Boutons de réponse, bouton « Démarrer », bouton « Suivant », bouton « Rejouer », et un écouteur **clavier** (`keydown`). |
| **`removeEventListener`** | **Verrouiller** les réponses dès que le joueur a cliqué : retirer les écouteurs des 4 boutons + l'écouteur clavier, pour empêcher une 2ᵉ réponse. |
| **Gestion des événements** | Utiliser l'**objet `event`** : `event.target` / `event.currentTarget` pour savoir quel bouton a été cliqué, `event.key` pour le clavier. |
| **Fonction callback** | Écrire une fonction `démarrerChrono(durée, onTick, onFin)` qui **reçoit des fonctions en paramètres** et les appelle. À noter : `fetch(...).then(callback)` et `setTimeout(callback, ...)` **sont** déjà des callbacks. |
| **Fonction lambda (fléchée)** | Utiliser des fonctions fléchées `() => …` pour les callbacks courts, **et comprendre quand on ne peut PAS en utiliser** (voir §8). |

> Gardez ce tableau sous les yeux : en fin de séance, vous devez pouvoir pointer **chaque ligne** dans votre code.

---

## 4. Objectifs pédagogiques

À l'issue de la séance, vous savez :

1. **charger des données externes** en JSON avec `fetch`, et comprendre que c'est **asynchrone** (le code n'attend pas tout seul) ;
2. séparer **les données** (JSON) du **code** (JS) ;
3. choisir **la bonne boucle** selon la donnée (tableau → `for…of`/`forEach`, objet → `for…in`) ;
4. générer du DOM **dynamiquement** à partir de données ;
5. **attacher** et surtout **retirer** des écouteurs d'événements ;
6. expliquer **pourquoi une fonction fléchée inline rend `removeEventListener` inopérant** ;
7. écrire et passer des **callbacks** (fonctions passées en argument) ;
8. exploiter l'**objet `event`** (cible, touche clavier).

---

## 5. Prérequis & mise en place

- Éditeur **VS Code** + extension **Live Server**.
- Structure attendue du projet :

```
QuizExpress/
├── index.html
├── css/
│   └── style.css
├── data/                ← les questions, une par thème
│   ├── js.json
│   ├── html.json
│   └── css.json
└── js/
    └── script.js
```

> ⚠️ **`fetch` exige un serveur HTTP.** Si vous ouvrez `index.html` par un double-clic (`file://`), `fetch` sera **bloqué** par le navigateur (erreur CORS / *Failed to fetch*). Lancez toujours le projet via **Live Server** (adresse en `http://127.0.0.1:5500/…`).

- Ouvrez la **console** (`F12`) en permanence pour traquer les erreurs.

---

## 6. Déroulé conseillé des 3 h

| Temps | Étape | Livrable intermédiaire |
|---|---|---|
| 0 h 00 – 0 h 15 | Lecture de l'énoncé + squelette HTML/CSS + création des fichiers JSON | Page qui s'affiche, `data/*.json` en place |
| 0 h 15 – 0 h 45 | **Charger** le JSON du thème avec `fetch` + afficher **une** question (`for…in`) | 1 question + 4 boutons issus du JSON |
| 0 h 45 – 1 h 30 | Écouteurs (`addEventListener` + `forEach`), détection bonne/mauvaise réponse | On peut répondre, le score bouge |
| 1 h 30 – 2 h 00 | **Verrouillage** des réponses (`removeEventListener`) + question suivante | Impossible de répondre deux fois |
| 2 h 00 – 2 h 30 | Chronomètre (callback `setInterval`) + vies + streak | Le temps presse, on peut perdre |
| 2 h 30 – 2 h 50 | Écran de fin + récap (`for…of`) + Rejouer (avec re-choix du thème) | Boucle de jeu complète |
| 2 h 50 – 3 h 00 | Nettoyage, console propre, vérification de la checklist | Rendu |

---

## 7. Les données : des fichiers JSON par thème

Les questions ne sont **plus** dans le JS. Créez un dossier `data/` contenant **un fichier par thème**. La valeur de chaque `<option>` de la liste déroulante correspond au **nom du fichier** : `value="js"` → `data/js.json`, `value="html"` → `data/html.json`, etc.

**Structure d'un fichier** — un **tableau** d'objets ; chaque question a un `enonce`, un objet `options` (clés `A`–`D`) et la clé de la bonne réponse `correct`. C'est ce contraste tableau / objet qui justifie d'utiliser `for…of` **et** `for…in`.

`data/js.json` (exemple prêt à l'emploi) :

```json
[
  {
    "enonce": "Quel langage s'exécute nativement dans le navigateur ?",
    "options": { "A": "Python", "B": "JavaScript", "C": "C#", "D": "Java" },
    "correct": "B"
  },
  {
    "enonce": "Que renvoie typeof [] en JavaScript ?",
    "options": { "A": "'array'", "B": "'list'", "C": "'object'", "D": "'undefined'" },
    "correct": "C"
  },
  {
    "enonce": "Quelle méthode AJOUTE un élément à la fin d'un tableau ?",
    "options": { "A": "push()", "B": "pop()", "C": "shift()", "D": "slice()" },
    "correct": "A"
  },
  {
    "enonce": "Quel symbole introduit une fonction fléchée ?",
    "options": { "A": "->", "B": "=>", "C": "::", "D": "~>" },
    "correct": "B"
  },
  {
    "enonce": "Quelle fonction arrête un setInterval ?",
    "options": { "A": "stopInterval()", "B": "clearTimeout()", "C": "clearInterval()", "D": "killTimer()" },
    "correct": "C"
  }
]
```

> **Attention à la syntaxe JSON** (elle est plus stricte que JS) : **toutes** les clés et les chaînes sont entre **guillemets doubles** `"…"`, **pas** de virgule après le dernier élément, **pas** de commentaires. Créez de la même façon `data/html.json` et `data/css.json` avec des questions de leur thème (au moins 5 chacune).

### Charger le JSON (deux styles au choix)

`fetch` renvoie une **promesse** : le fichier n'arrive **pas** instantanément. Vous devez donc démarrer la partie **une fois les données reçues**, pas avant.

```js
let questions = [];

// Style 1 — avec .then() (la callback classique)
const chargerQuestions = function(theme, onPret) {
  fetch(`data/${theme}.json`)
    .then((reponse) => reponse.json())   // .json() renvoie aussi une promesse
    .then((donnees) => {
      questions = donnees;
      onPret();                          // ← callback : « les données sont prêtes »
    });
};

// Style 2 — avec async / await (souvent plus lisible)
const chargerQuestions = async function(theme) {
  const reponse = await fetch(`data/${theme}.json`);
  questions = await reponse.json();
};
```

Le thème choisi se lit sur la liste déroulante : `document.getElementById("theme").value`.

---

## 8. 🔑 L'encadré à lire AVANT de coder : le piège `removeEventListener`

C'est le point qui fait gagner ou perdre une heure. `removeEventListener` ne peut retirer un écouteur **que si vous lui repassez exactement la même fonction** que celle fournie à `addEventListener`.

❌ **Ne marche pas** — la fonction fléchée inline crée une **nouvelle** fonction à chaque fois ; les deux références sont différentes :

```js
bouton.addEventListener("click", () => repondre(cle));
// … plus tard …
bouton.removeEventListener("click", () => repondre(cle)); // ❌ ne retire RIEN
```

✅ **Marche** — on garde **une référence** vers la même fonction :

```js
const gestionnaire = (event) => repondre(event);   // référence stockée
bouton.addEventListener("click", gestionnaire);
// … plus tard …
bouton.removeEventListener("click", gestionnaire);  // ✅ retiré
```

> **À vous de décider** : fonction nommée, ou fonction fléchée **stockée dans une variable**. L'essentiel est que la référence passée à `add` et à `remove` soit **identique**. C'est aussi pour ça qu'on garde les boutons dans un **tableau** : pour les reparcourir au `forEach` et détacher proprement.

---

## 9. Cahier des charges fonctionnel

1. Au démarrage : écran d'accueil avec titre, **liste déroulante de thème** et bouton **Démarrer**.
2. À « Démarrer » : **charger le JSON du thème sélectionné** (`fetch`), puis — **une fois les données reçues** — afficher la **1ʳᵉ question**, lancer le **chrono**, initialiser score = 0, vies = 3, série = 0.
3. Pour chaque question :
   - afficher l'énoncé et **générer les 4 boutons** depuis l'objet `options` ;
   - le joueur répond **au clic** ou **au clavier** (A/B/C/D) ;
   - **dès la réponse** : verrouiller (plus aucune réponse possible), colorer la bonne réponse en vert et, si erreur, la mauvaise en rouge ;
   - bonne réponse → `+points` ; mauvaise/temps écoulé → **−1 vie**, série remise à 0 ;
   - après un court délai, passer à la **question suivante** (ou bouton **Suivant**).
4. Fin de partie si **plus de questions** ou **0 vie** : afficher l'écran de fin avec le **récapitulatif** de chaque question et le **score final**.
5. Bouton **Rejouer** : relire le thème choisi sur l'écran de fin, **recharger** le JSON correspondant et tout réinitialiser.

---

## 10. Étapes guidées

À chaque étape, **testez dans le navigateur** (via Live Server) avant la suivante.

### Étape 1 — Le squelette (HTML/CSS) + les données
Vérifiez vos zones HTML (accueil avec `<select>`, zone question, zone réponses vide, HUD score/vies/série/chrono, écran de fin). Créez le dossier `data/` et vos fichiers JSON (§7).

### Étape 2 — Charger le JSON (`fetch`)
Écrivez `chargerQuestions(theme)` qui lit `data/<theme>.json` avec `fetch`, convertit en objet JS (`.json()`) et le range dans une variable `questions`. **Vérifiez** dans la console (`console.log(questions)`) que le tableau est bien rempli **avant** d'aller plus loin. Retenez : le code après `fetch` ne s'exécute **pas** tant que le fichier n'est pas arrivé.

### Étape 3 — Afficher une question (`for…in`)
Écrivez `afficherQuestion(index)` qui met l'énoncé dans le DOM, **vide** la zone réponses, puis **parcourt l'objet `options` avec `for…in`** pour créer **un bouton par réponse**. Stockez les boutons créés dans un **tableau**.

### Étape 4 — Brancher les réponses (`forEach` + `addEventListener`)
**Parcourez le tableau des boutons avec `forEach`** et attachez à chacun un écouteur `click`. Le gestionnaire utilise l'**objet `event`** (`event.currentTarget`) pour savoir quelle lettre a été choisie. Ajoutez un écouteur **clavier** (`keydown`) sur `document` qui lit `event.key`.

### Étape 5 — Vérifier la réponse + verrouiller (`removeEventListener`)
Écrivez `repondre(cle)` qui compare `cle` à `questions[index].correct`. **Puis verrouillez** : reparcourez le tableau des boutons (`forEach`) et faites `removeEventListener` (relisez le §8 !), et retirez l'écouteur clavier. Mettez à jour le **score** et la **série** ; sur erreur, **−1 vie**.

### Étape 6 — Le chronomètre (callback)
Écrivez `démarrerChrono(durée, onTick, onFin)` qui **reçoit deux callbacks** : `onTick(secondesRestantes)` appelé chaque seconde (via `setInterval`), et `onFin()` appelé à 0. **Mémorisez l'ID de l'intervalle** pour l'arrêter (`clearInterval`) dès qu'on répond ou qu'on change de question.

### Étape 7 — Enchaîner les questions
Après une réponse (clic, clavier ou timeout), attendez un court instant avec `setTimeout` (encore un **callback** !) puis affichez la question suivante. Gérez la fin : plus de questions **ou** 0 vie.

### Étape 8 — Écran de fin (`for…of`) + Rejouer
Construisez le **récapitulatif** en **parcourant avec `for…of`** le tableau des résultats. Affichez le score final. Le bouton **Rejouer** relit le thème, **recharge le JSON** et réinitialise tout (score, vies, série, index, écouteurs).

---

## 11. Exigences techniques

- Les **9 concepts du §3** doivent apparaître et être **réellement utilisés** (pas juste présents en commentaire).
- Les questions sont **chargées depuis les fichiers JSON** — **aucun** tableau de questions en dur dans le JS.
- La partie ne démarre qu'**après** réception des données (pas de `questions` vide au premier affichage).
- Les boutons de réponse sont **générés en JS** (rien d'écrit en dur dans le HTML).
- Tout `setInterval` **doit** être arrêté avec `clearInterval` (ID mémorisé).
- Après une réponse, il est **impossible** de répondre à nouveau (preuve que `removeEventListener` fonctionne).
- **Aucune erreur** dans la console.
- Code lisible : noms explicites, fonctions courtes, indentation propre, commentaires utiles.

---

## 12. Barème indicatif (/20)

| Critère | Points |
|---|---|
| `fetch` : chargement du bon JSON selon le thème, avant démarrage | 3 |
| `for…in` : génération des boutons depuis l'objet `options` | 3 |
| `forEach` : attache **et** détache des écouteurs | 2 |
| `for…of` : récapitulatif de fin de partie | 2 |
| `addEventListener` clic **et** clavier (objet `event` exploité) | 2 |
| `removeEventListener` : verrouillage effectif des réponses | 3 |
| Callback : `démarrerChrono(durée, onTick, onFin)` + `clearInterval` | 3 |
| Fonctions lambda employées à bon escient | 1 |
| Qualité du code / console propre / réinitialisation au Rejouer | 1 |

---

## 13. Bonus (si vous avez de l'avance)

- **Nouveaux thèmes** : ajoutez `data/git.json`, `data/sql.json`… et l'`<option>` correspondante. Zéro ligne de logique à changer si votre code lit bien le thème.
- **Gestion d'erreur de chargement** : afficher un message si le fichier JSON est introuvable (`.catch(...)` ou `try/catch` avec `await`).
- **Bonus de rapidité** : plus on répond vite, plus on marque (basé sur le temps restant).
- **Multiplicateur de série** : 3 bonnes réponses d'affilée → ×2 sur les points suivants.
- **Mélange** des questions et de l'ordre des réponses à chaque partie (fonction `melanger(tableau)`).
- **Barre de progression** des questions, ou un **meilleur score** conservé pendant la session.

---

## 14. Checklist de rendu

- [ ] Les questions viennent des fichiers **JSON**, pas du JS.
- [ ] Le jeu se lance via **Live Server** (pas en `file://`) sans erreur console.
- [ ] Changer de thème charge bien un **autre** jeu de questions.
- [ ] Je peux pointer **chaque concept du §3** dans mon code.
- [ ] Impossible de répondre deux fois à la même question.
- [ ] Le chrono s'arrête bien entre les questions (pas de double comptage).
- [ ] « Rejouer » repart vraiment de zéro (score, vies, série, écouteurs).

---

## 15. Mémo des concepts

| Outil | Sert à… | Donne accès à… | Forme typique |
|---|---|---|---|
| `fetch` | charger un fichier / une API | une **promesse** de réponse | `fetch(url).then(r => r.json())` |
| `for…in` | parcourir les **clés** d'un **objet** | la clé (`"A"`, `"B"`…) | `for (const cle in options) { … }` |
| `for…of` | parcourir les **valeurs** d'un **itérable** | l'élément | `for (const q of questions) { … }` |
| `forEach` | parcourir un **tableau** (ou NodeList) | l'élément + l'index | `boutons.forEach((btn, i) => { … })` |
| `addEventListener` | brancher un écouteur | — | `el.addEventListener("click", fn)` |
| `removeEventListener` | débrancher **la même** `fn` | — | `el.removeEventListener("click", fn)` |
| callback | passer une fonction en argument | — | `démarrerChrono(10, maj, fin)` |
| lambda | écrire une fonction concise | — | `(x) => x * 2` |

---

*Prêt ? Choisis ton thème — le chrono tourne déjà. ⚡*
