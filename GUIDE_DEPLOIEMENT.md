# 🚀 Guide de déploiement — Site AIDS sur Vercel

---

## 🆕 MISE À JOUR — Juillet 2026 (audit + corrections)

Cette version du site a fait l'objet d'un audit complet (performance, accessibilité, SEO, RGPD) suivi de corrections. Résumé de ce qui a changé :

### Corrigé automatiquement
- **Performance** : images converties en WebP, poids total divisé par ~30 (4,4 Mo → ~150 Ko), chargement des polices non bloquant
- **Accessibilité** : 0 violation WCAG 2.1 A/AA vérifiée avec axe-core (menu hamburger, hiérarchie des titres, focus clavier du chatbot, landmarks)
- **RGPD** : pages Mentions légales + Politique de confidentialité créées, case de consentement ajoutée au formulaire
- **SEO** : image de partage social (Open Graph) générée, `sitemap.xml` et `robots.txt` ajoutés
- **Contenu** : placeholder vidéo de développeur retiré

### Ajouté
- 🌗 Bouton de bascule mode clair/sombre (icône cloche, header) — mémorisé en local, respecte la préférence système
- 🤖 Chatbot **Nova**, propulsée par un vrai modèle de langage (Llama 3.3, via **Groq — 100% gratuit, sans carte bancaire**) via une fonction serverless sécurisée — comprend les questions reformulées, pas seulement des mots-clés exacts. ⚠️ **Nécessite une clé API gratuite à configurer avant de fonctionner** — voir section dédiée ci-dessous.

### Toujours en attente de votre part (voir ci-dessous, section déjà présente dans ce guide)
- Vraies URLs des réseaux sociaux
- Vidéo de présentation (si vous en avez une)
- Rapport d'activité 2024 (PDF)

📄 Le détail technique complet de chaque correction est dans le fichier `CHECKLIST_FINALE.md` à la racine du projet.

---

## ⚙️ ÉTAPE OBLIGATOIRE — Activer Nova (clé API gratuite)

Nova est une vraie IA (modèle Llama 3.3, servi par **Groq**) et non plus une simple recherche par mots-clés. **Ce choix a été fait spécifiquement parce que Groq propose un palier 100% gratuit, sans carte bancaire à ajouter, adapté à une petite association :** environ 14 400 requêtes par jour et 30 requêtes par minute — bien plus que le trafic attendu sur ce site. Il n'y a aucun abonnement, aucune facturation automatique, aucun risque de facture surprise : si vous ne dépassez pas ces limites (ce qui est très improbable pour ce site), le coût est **strictement 0 €**.

Sans cette étape, Nova affichera un message d'excuse poli et redirigera vers le formulaire de contact, mais ne répondra pas aux questions.

### 1. Obtenir une clé API Groq (gratuite)
1. Aller sur **https://console.groq.com**
2. Créer un compte avec votre email (ou Google/GitHub) — **aucune carte bancaire n'est demandée**
3. Aller dans **API Keys → Create API Key**
4. Copier la clé générée — elle ne sera affichée qu'une seule fois

### 2. Ajouter la clé dans Vercel
1. Sur le dashboard Vercel, ouvrir le projet **aids-website**
2. Aller dans **Settings → Environment Variables**
3. Ajouter :
   - **Name** : `GROQ_API_KEY`
   - **Value** : coller votre clé Groq
   - **Environment** : cocher Production (et Preview si vous voulez tester sur les previews aussi)
4. Cliquer **Save**
5. **Important** : retourner dans l'onglet **Deployments**, ouvrir les "..." du dernier déploiement → **Redeploy** (les variables d'environnement ne s'appliquent qu'aux déploiements créés après leur ajout)

### 3. Vérifier que ça fonctionne
Une fois redéployé, ouvrez votre site, cliquez sur la bulle Nova en bas à droite, et posez une question comme *"Comment faire un don ?"*. Si vous obtenez une vraie réponse (pas le message d'excuse), c'est configuré correctement.

### Si vous approchez un jour la limite gratuite
Groq propose un palier "Developer" (ajout d'une carte bancaire, mais sans minimum de dépense) qui multiplie les limites par ~10. Pour une association de votre taille, il est très improbable que vous en ayez besoin un jour — mais si Nova se met à répondre "beaucoup de messages récemment", c'est le signe qu'il faudrait l'envisager.

### Comment Nova fonctionne techniquement
- Le front-end (`js/nova-chatbot.js`) envoie la question à `/api/nova`
- Cette fonction serverless (`api/nova.js`) tourne **côté serveur Vercel**, ajoute le contexte sur l'association (missions, dons, contact...) et appelle l'API Groq avec la clé stockée en variable d'environnement — **la clé n'est jamais visible depuis le navigateur du visiteur**
- Si l'appel échoue (clé manquante, quota dépassé, panne réseau), Nova bascule automatiquement sur une recherche par mots-clés locale (`js/nova-knowledge.js`) pour ne jamais laisser le visiteur sans réponse
- Une limite anti-abus interne est intégrée en plus de celle de Groq : 30 messages par heure et par visiteur

---

## ⚠️ Note sur les instructions ci-dessous

Le guide original ci-dessous a été écrit lors de la première mise en ligne du site. Certaines étapes (création du repo GitHub, premier déploiement Vercel, photo du président) sont **déjà faites** — elles restent utiles si vous devez un jour redéployer le site ailleurs depuis zéro. L'adresse email `contact@aids-asso.org` mentionnée plus bas est un exemple : votre vraie adresse actuelle est `alliance.ids92@yahoo.com`.

---



Vous avez reçu un dossier `aids-website` contenant :
```
aids-website/
├── index.html          ← Page principale
├── css/
│   └── style.css       ← Tous les styles
├── js/
│   └── scripts.js      ← Interactivité
├── images/
│   └── president.jpg   ← Votre photo
└── vercel.json         ← Configuration Vercel
```

**À faire avant de déployer :**
- Ajouter les photos des autres membres dans `images/` (ex: `treasurer.jpg`, `secretary.jpg`)
- Mettre à jour les liens réseaux sociaux dans `index.html` (chercher `href="#"` dans la section `.social-links`)
- Remplacer `contact@aids-asso.org` par votre vraie adresse email
- Configurer HelloAsso : mettre votre vrai lien HelloAsso dans le bouton "Faire un don"

---

## Étape 2 : Créer un compte GitHub (gratuit)

1. Aller sur https://github.com
2. Cliquer "Sign up" et créer un compte gratuit

---

## Étape 3 : Mettre le site sur GitHub

1. Sur GitHub, cliquer le **"+"** en haut à droite → "New repository"
2. Nommer le repo : `aids-website`
3. Laisser **Public** coché → cliquer "Create repository"
4. Suivre les instructions pour "upload an existing folder" (ou glisser-déposer les fichiers)

---

## Étape 4 : Déployer sur Vercel

1. Aller sur https://vercel.com
2. Cliquer "Sign Up" → choisir "Continue with GitHub"
3. Une fois connecté, cliquer **"Add New Project"**
4. Trouver votre repo `aids-website` → cliquer **"Import"**
5. Laisser tous les paramètres par défaut → cliquer **"Deploy"**
6. ✅ En 30 secondes, votre site est en ligne !

Votre URL sera : `aids-website.vercel.app`

---

## Étape 5 : Personnaliser l'URL (optionnel)

Sur Vercel, dans Settings → Domains, vous pouvez :
- Changer l'URL en `aids-asso.vercel.app` (gratuit)
- Connecter un vrai domaine comme `aids-asso.org` (~12€/an sur OVH ou Gandi)

---

## 📧 Activer le formulaire de contact (recommandé)

Pour que le formulaire envoie vraiment des emails, utiliser **Formspree** (gratuit) :

1. Aller sur https://formspree.io → créer un compte gratuit
2. Créer un nouveau formulaire → copier votre Form ID (ex: `xrgjaopb`)
3. Dans `index.html`, modifier la balise `<form>` :
   ```html
   <form id="contact-form" action="https://formspree.io/f/VOTRE_ID" method="POST">
   ```
4. Supprimer le `e.preventDefault()` dans `scripts.js` (ou laisser Formspree gérer)

---

## 🖼️ Ajouter les photos des membres

1. Nommer les photos : `treasurer.jpg`, `secretary.jpg`, etc.
2. Les copier dans le dossier `images/`
3. Dans `index.html`, remplacer les `<div class="team-avatar-placeholder">` par :
   ```html
   <img src="images/treasurer.jpg" alt="DZIWONOU Kisito F." />
   ```

---

## 🔗 Mettre à jour les réseaux sociaux

Dans `index.html`, chercher la section `.social-links` et remplacer `href="#"` par vos vrais liens :
```html
<a href="https://facebook.com/votre-page" ...>
<a href="https://instagram.com/votre-compte" ...>
<a href="https://linkedin.com/company/votre-organisation" ...>
```

---

## 💙 HelloAsso — Configurer les dons

1. Aller sur https://www.helloasso.com
2. Créer votre espace association (gratuit)
3. Créer un formulaire de don
4. Copier votre lien HelloAsso
5. Dans `index.html`, remplacer le lien dans `.btn-don`

---

Besoin d'aide ? Contactez-nous sur Discord ou par email.
