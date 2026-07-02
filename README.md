# Quiz Express ⚡ — Exercice JavaScript (3 h)

> **Module** : Web Interactive — JavaScript
> **Thème** : itération (`forEach`, `for…in`, `for…of`), gestion des événements (`addEventListener` / `removeEventListener`), **fonctions callback** et **fonctions lambda** (fléchées)
> **Durée** : 3 h (séance encadrée)
> **Niveau** : intermédiaire — vous partez d'une **page vierge** (HTML + CSS + JS à écrire).

---

## 1. Le mot du formateur

Un quiz, c'est trompeusement simple : « j'affiche une question, l'utilisateur clique, je compte les points ». Sauf que c'est précisément le terrain de jeu idéal pour comprendre **la gestion des événements** — parce qu'à un moment, il faut **empêcher** le joueur de répondre deux fois. Et là, beaucoup d'étudiants découvrent que `removeEventListener` ne fonctionne **pas** avec une fonction fléchée écrite à la volée.

C'est tout l'enjeu de cet exercice : non seulement *brancher* des écouteurs, mais aussi savoir les **débrancher proprement**. Un écouteur qu'on oublie de retirer, c'est un bug fantôme qui rend les points en double et vous fait perdre une heure en fin de projet.

Vous allez aussi manipuler les **trois façons d'itérer** en JavaScript. Elles ne sont pas interchangeables : on ne parcourt pas un **tableau**, un **objet** et un **itérable** avec la même boucle. Choisir la bonne, c'est déjà écrire du code lisible.

---

## 2. Le jeu à construire

**Quiz Express** est un quiz de culture générale **chronométré**, façon Kahoot.

- Une question s'affiche avec **4 réponses** (A, B, C, D).
- Un **compte à rebours** tourne pour chaque question (ex. 10 s).
- Le joueur répond **au clic** ou **au clavier** (touches A/B/C/D).
- Bonne réponse → points (avec **bonus de rapidité** et **bonus de série/streak**).
- Mauvaise réponse ou temps écoulé → on perd une **vie** (3 au départ) et la série retombe à 0.
- La partie se termine quand **toutes les questions sont passées** ou quand **les vies sont épuisées**.
- Un **écran de fin** récapitule chaque question (bonne/mauvaise) et affiche le **score final**.

---

## 3. ⭐ Concepts obligatoires — la carte d'identité de l'exercice

Chaque concept ci-dessous **doit** apparaître dans votre code, à l'endroit indiqué. C'est le cœur de l'évaluation.

| Concept | Où l'utiliser (imposé) |
|---|---|
| **`for…in`** | Construire les **4 boutons de réponse** à partir de l'objet `options` (`{ A:…, B:…, C:…, D:… }`) de chaque question. On itère sur les **clés** de l'objet. |
| **`forEach`** | Parcourir le **tableau des boutons** créés pour leur **attacher** (puis détacher) les écouteurs. |
| **`for…of`** | Parcourir le **tableau `questions`** (ou le tableau des résultats) pour construire l'**écran de récapitulatif** de fin de partie. |
| **`addEventListener`** | Boutons de réponse, bouton « Démarrer », bouton « Suivant », bouton « Rejouer », et un écouteur **clavier** (`keydown`). |
| **`removeEventListener`** | **Verrouiller** les réponses dès que le joueur a cliqué : retirer les écouteurs des 4 boutons + l'écouteur clavier, pour empêcher une 2ᵉ réponse. |
| **Gestion des événements** | Utiliser l'**objet `event`** : `event.target` / `event.currentTarget` pour savoir quel bouton a été cliqué, `event.key` pour le clavier. |
| **Fonction callback** | Écrire une fonction `démarrerChrono(durée, onTick, onFin)` qui **reçoit des fonctions en paramètres** et les appelle. Idem avec `setInterval` / `setTimeout`. |
| **Fonction lambda (fléchée)** | Utiliser des fonctions fléchées `() => …` pour les callbacks courts, **et comprendre quand on ne peut PAS en utiliser** (voir §8). |

> Gardez ce tableau sous les yeux : en fin de séance, vous devez pouvoir pointer **chaque ligne** dans votre code.

---

## 4. Objectifs pédagogiques

À l'issue de la séance, vous savez :

1. choisir **la bonne boucle** selon la donnée (tableau → `for…of`/`forEach`, objet → `for…in`) ;
2. générer du DOM **dynamiquement** à partir de données ;
3. **attacher** et surtout **retirer** des écouteurs d'événements ;
4. expliquer **pourquoi une fonction fléchée inline rend `removeEventListener` inopérant** ;
5. écrire et passer des **callbacks** (fonctions passées en argument) ;
6. exploiter l'**objet `event`** (cible, touche clavier).

---

## 5. Prérequis & mise en place

- Éditeur **VS Code** + extension **Live Server**.
- Vous créez **vous-mêmes** les trois fichiers :

```
QuizExpress/
├── index.html
├── css/
│   └── style.css
└── js/
    └── script.js
```

- Ouvrez la **console** (`F12`) en permanence pour traquer les erreurs.

---

## 6. Déroulé conseillé des 3 h

| Temps | Étape | Livrable intermédiaire |
|---|---|---|
| 0 h 00 – 0 h 20 | Lecture de l'énoncé + squelette HTML/CSS | Page qui s'affiche, vide |
| 0 h 20 – 0 h 45 | Données + affichage **statique** d'une question (`for…in`) | 1 question + 4 boutons à l'écran |
| 0 h 45 – 1 h 30 | Écouteurs (`addEventListener` + `forEach`), détection bonne/mauvaise réponse | On peut répondre, le score bouge |
| 1 h 30 – 2 h 00 | **Verrouillage** des réponses (`removeEventListener`) + passage à la question suivante | Impossible de répondre deux fois |
| 2 h 00 – 2 h 30 | Chronomètre (callback `setInterval`) + vies + streak | Le temps presse, on peut perdre |
| 2 h 30 – 2 h 50 | Écran de fin + récap (`for…of`) + Rejouer | Boucle de jeu complète |
| 2 h 50 – 3 h 00 | Nettoyage, console propre, vérification de la checklist | Rendu |

---

## 7. Données de départ (à copier dans `script.js`)

Pour ne pas perdre de temps à inventer des questions, partez de ce jeu de données. **Notez la structure** : `questions` est un **tableau** d'objets, et `options` est un **objet** (clés `A`–`D`). C'est ce contraste qui justifie d'utiliser `for…of` **et** `for…in`.

```js
const questions = [
  {
    enonce: "Quel langage s'exécute nativement dans le navigateur ?",
    options: { A: "Python", B: "JavaScript", C: "C#", D: "Java" },
    correct: "B"
  },
  {
    enonce: "Que renvoie typeof [] en JavaScript ?",
    options: { A: "'array'", B: "'list'", C: "'object'", D: "'undefined'" },
    correct: "C"
  },
  {
    enonce: "Quelle méthode AJOUTE un élément à la fin d'un tableau ?",
    options: { A: "push()", B: "pop()", C: "shift()", D: "slice()" },
    correct: "A"
  },
  {
    enonce: "Quel symbole introduit une fonction fléchée ?",
    options: { A: "->", B: "=>", C: "::", D: "~>" },
    correct: "B"
  },
  {
    enonce: "Quelle boucle est faite pour parcourir les CLÉS d'un objet ?",
    options: { A: "for...of", B: "forEach", C: "for...in", D: "while" },
    correct: "C"
  },
  {
    enonce: "Quelle fonction arrête un setInterval ?",
    options: { A: "stopInterval()", B: "clearTimeout()", C: "clearInterval()", D: "killTimer()" },
    correct: "C"
  },
  {
    enonce: "event.target désigne…",
    options: { A: "la fenêtre", B: "l'élément qui a déclenché l'événement", C: "le document", D: "le parent direct" },
    correct: "B"
  },
  {
    enonce: "Pour retirer un écouteur, removeEventListener exige…",
    options: { A: "le même nom d'événement seulement", B: "n'importe quelle fonction", C: "la MÊME référence de fonction", D: "rien de spécial" },
    correct: "C"
  }
];
```

> Vous pouvez en ajouter, ou changer le thème (jeux vidéo, ciné, sport…). Gardez la **structure**.

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

1. Au démarrage, écran d'accueil avec titre + bouton **Démarrer**.
2. À « Démarrer » : afficher la **1ʳᵉ question**, lancer le **chrono**, initialiser score = 0, vies = 3, série = 0.
3. Pour chaque question :
   - afficher l'énoncé et **générer les 4 boutons** depuis l'objet `options` ;
   - le joueur répond **au clic** ou **au clavier** (A/B/C/D) ;
   - **dès la réponse** : verrouiller (plus aucune réponse possible), colorer la bonne réponse en vert et, si erreur, la mauvaise en rouge ;
   - bonne réponse → `+points` (base + bonus temps + bonus série) ; mauvaise/temps écoulé → **−1 vie**, série remise à 0 ;
   - après un court délai, passer à la **question suivante** (ou bouton **Suivant**).
4. Fin de partie si **plus de questions** ou **0 vie** : afficher l'écran de fin avec le **récapitulatif** de chaque question et le **score final**.
5. Bouton **Rejouer** : tout réinitialiser et recommencer.

---

## 10. Étapes guidées

À chaque étape, **testez dans le navigateur** avant la suivante.

### Étape 1 — Le squelette (HTML/CSS)
Créez `index.html` avec au minimum ces zones (choisissez vos `id`/classes, mais documentez-les) : un conteneur d'accueil, une zone **question**, une zone **réponses** (vide, remplie par le JS), un affichage **score / vies / série / chrono**, et un conteneur **écran de fin**. Un peu de CSS pour que ce soit lisible et agréable (couleurs bonne/mauvaise réponse, états désactivés).

### Étape 2 — Afficher une question (`for…in`)
Copiez le tableau `questions`. Écrivez une fonction `afficherQuestion(index)` qui met l'énoncé dans le DOM, **vide** la zone réponses, puis **parcourt l'objet `options` avec `for…in`** pour créer **un `<button>` par réponse** (texte = `A : …`). Stockez les boutons créés dans un **tableau**.

### Étape 3 — Brancher les réponses (`forEach` + `addEventListener`)
**Parcourez le tableau des boutons avec `forEach`** et attachez à chacun un écouteur `click`. Le gestionnaire utilise l'**objet `event`** (`event.currentTarget`) pour savoir quelle lettre a été choisie. Ajoutez aussi un écouteur **clavier** (`keydown`) sur `document` qui lit `event.key`.

### Étape 4 — Vérifier la réponse + verrouiller (`removeEventListener`)
Écrivez `repondre(cle)` qui compare `cle` à `questions[index].correct`. **Puis verrouillez** : reparcourez le tableau des boutons (`forEach`) et faites `removeEventListener` (relisez le §8 !), et retirez aussi l'écouteur clavier. Mettez à jour le **score** et la **série** ; sur erreur, **−1 vie**.

### Étape 5 — Le chronomètre (callback)
Écrivez une fonction `démarrerChrono(durée, onTick, onFin)` qui **reçoit deux callbacks** : `onTick(secondesRestantes)` appelé chaque seconde (via `setInterval`), et `onFin()` appelé à 0. **Mémorisez l'ID de l'intervalle** pour pouvoir l'arrêter (`clearInterval`) dès qu'on répond ou qu'on change de question. Temps écoulé = mauvaise réponse.

### Étape 6 — Enchaîner les questions
Après une réponse (clic, clavier ou timeout), attendez un court instant avec `setTimeout` (encore un **callback** !) puis affichez la question suivante. Gérez la fin : plus de questions **ou** 0 vie.

### Étape 7 — Écran de fin (`for…of`) + Rejouer
Construisez un **récapitulatif** : **parcourez avec `for…of`** un tableau qui mémorise, pour chaque question, la réponse donnée et si elle était correcte. Affichez le score final. Le bouton **Rejouer** réinitialise tout (score, vies, série, index, écouteurs) et relance.

---

## 11. Exigences techniques

- Les **8 concepts du §3** doivent apparaître et être **réellement utilisés** (pas juste présents en commentaire).
- Les boutons de réponse sont **générés en JS** (rien d'écrit en dur dans le HTML).
- Tout `setInterval` **doit** être arrêté avec `clearInterval` (ID mémorisé).
- Après une réponse, il est **impossible** de répondre à nouveau (preuve que `removeEventListener` fonctionne).
- **Aucune erreur** dans la console.
- Code lisible : noms explicites, fonctions courtes, indentation propre, commentaires utiles.

---

## 12. Barème indicatif (/20)

| Critère | Points |
|---|---|
| `for…in` : génération des boutons depuis l'objet `options` | 3 |
| `forEach` : attache **et** détache des écouteurs | 3 |
| `for…of` : récapitulatif de fin de partie | 2 |
| `addEventListener` clic **et** clavier (objet `event` exploité) | 3 |
| `removeEventListener` : verrouillage effectif des réponses | 3 |
| Callback : `démarrerChrono(durée, onTick, onFin)` + `clearInterval` | 3 |
| Fonctions lambda employées à bon escient | 1 |
| Qualité du code / console propre / réinitialisation au Rejouer | 2 |

---

## 13. Bonus (si vous avez de l'avance)

- **Bonus de rapidité** : plus on répond vite, plus on marque (basé sur le temps restant).
- **Multiplicateur de série** : 3 bonnes réponses d'affilée → ×2 sur les points suivants.
- **Catégories** : un objet `{ Histoire: [...], Code: [...], Ciné: [...] }` et un `for…in` pour générer un menu de catégories.
- **Mélange** des questions et de l'ordre des réponses à chaque partie (fonction `melanger(tableau)`).
- **Barre de progression** des questions, ou un **meilleur score** conservé pendant la session.
- **Effets** : animation/secousse sur mauvaise réponse, son sur bonne réponse.

---

## 14. Checklist de rendu

- [ ] Le jeu se lance, s'enchaîne et se termine sans erreur console.
- [ ] Je peux pointer **chaque concept du §3** dans mon code.
- [ ] Impossible de répondre deux fois à la même question.
- [ ] Le chrono s'arrête bien entre les questions (pas de double comptage).
- [ ] « Rejouer » repart vraiment de zéro (score, vies, série, écouteurs).
- [ ] `index.html`, `css/style.css`, `js/script.js` présents et propres.

---

## 15. Mémo des concepts

| Outil | Sert à parcourir… | Donne accès à… | Forme typique |
|---|---|---|---|
| `for…in` | les **clés** d'un **objet** | la clé (`"A"`, `"B"`…) | `for (const cle in options) { … }` |
| `for…of` | les **valeurs** d'un **itérable** (tableau, NodeList…) | l'élément | `for (const q of questions) { … }` |
| `forEach` | un **tableau** (ou NodeList) | l'élément + l'index | `boutons.forEach((btn, i) => { … })` |
| `addEventListener` | — | brancher un écouteur | `el.addEventListener("click", fn)` |
| `removeEventListener` | — | débrancher **la même** `fn` | `el.removeEventListener("click", fn)` |
| callback | — | une fonction passée en argument | `démarrerChrono(10, maj, fin)` |
| lambda | — | écrire une fonction concise | `(x) => x * 2` |

---

*Prêt ? Le chrono tourne déjà. ⚡*
