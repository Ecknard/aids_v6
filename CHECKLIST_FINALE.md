# Checklist finale — Corrections & nouvelles fonctionnalités
*Générée le 9 juillet 2026*

## ✅ Corrigé — Priorité 1 : Performance
- [x] Images compressées et converties en WebP (+ fallback JPG) → poids images 4,4 Mo → ~120 Ko (-97%)
- [x] `loading="lazy"` sur toutes les images hors zone visible immédiate
- [x] `width`/`height` explicites sur toutes les balises `<img>`
- [x] Polices Google Fonts chargées en non-bloquant (`media="print" onload`)
- [x] `@import` CSS bloquant supprimé
- [x] `fetchpriority="high"` sur l'image du hero (LCP)

## ✅ Corrigé — Priorité 2 : Contenu
- [x] Placeholder vidéo de développeur retiré, remplacé par un état "à venir" propre
- [x] Compteurs "Membres actifs"/"Pays présents" vérifiés : **fonctionnaient déjà correctement** (animation JS au scroll, ce n'était pas un bug — correction de mon diagnostic initial)
- [ ] Icônes réseaux sociaux : **en attente des vraies URLs de votre part**

## ✅ Corrigé — Priorité 3 : Conformité légale
- [x] Page Mentions légales créée (`mentions-legales.html`)
- [x] Page Politique de confidentialité créée (`politique-confidentialite.html`)
- [x] Case de consentement RGPD ajoutée au formulaire de contact
- [x] Liens du footer pointant vers les vraies pages (au lieu de `#`)

## ✅ Corrigé — Priorité 4 : Accessibilité
- [x] Menu hamburger : `<div>` → vrai `<button aria-expanded>`
- [x] Lien "Retour en haut" : souligné (plus seulement coloré)
- [x] Hiérarchie des titres H1→H2→H3 corrigée (plus de saut de niveau)
- [x] Tout le contenu englobé dans des landmarks (`<main>`, `role="complementary"`)
- [x] Fenêtre Nova rendue `inert` quand fermée (pas de piège au focus clavier)
- [x] **Vérifié avec axe-core : 0 violation WCAG 2.1 A/AA** sur les 3 pages du site

## ✅ Corrigé — Priorité 5 : SEO
- [x] Image Open Graph 1200×630 générée (`images/og-image.jpg`)
- [x] Balises `twitter:card`, `og:url`, `og:image:width/height`, `canonical` ajoutées
- [x] `sitemap.xml` créé
- [x] `robots.txt` créé

## ✅ Ajouté — Mode clair/sombre
- [x] Bouton bascule (icône cloche animée) dans le header, sur toutes les pages
- [x] Mémorisation du choix en `localStorage`
- [x] Respect de `prefers-color-scheme` par défaut
- [x] Script anti-flash dans le `<head>` (pas de flash au chargement)
- [x] Contraste vérifié conforme WCAG AA dans les deux thèmes

## ✅ Ajouté — Chatbot Nova (V2 — propulsée par un LLM)
- [x] Fonction serverless sécurisée `api/nova.js` (Vercel, runtime Node) — la clé API n'est **jamais** exposée côté client
- [x] Appel à l'API **Groq** (modèle Llama 3.3 70B, **100% gratuit, sans carte bancaire**) avec un prompt système strict : répond uniquement à partir des infos réelles du site, refuse les questions hors-sujet, ignore les tentatives de détournement de rôle, ne révèle jamais ses instructions internes
- [x] Historique de conversation transmis (6 derniers échanges) pour des réponses contextuelles
- [x] Limite anti-abus : 30 messages/heure/visiteur (429 au-delà)
- [x] Repli local automatique (recherche par mots-clés) si l'API est indisponible — le visiteur n'est jamais bloqué
- [x] Indicateur "Nova est en train d'écrire..." pendant l'attente de la réponse
- [x] Widget flottant bas-droite, accessible clavier, cohérent en mode clair/sombre
- [x] **Testé** : validation des cas d'erreur (méthode refusée, message vide, historique tronqué, clé API absente, rate-limiting) avec un serveur Node local, + un test avec `fetch` simulé confirmant que le format de requête envoyé à Groq et le parsing de sa réponse sont corrects. Note de transparence : mon environnement de test ne peut pas atteindre `api.groq.com` en direct (restriction réseau de mon sandbox), donc l'appel réel n'a pas pu être vérifié de bout en bout comme je l'avais fait avec Anthropic — la logique est validée, le test live final revient à vous une fois la clé configurée
- [ ] **Action requise de votre part** : ajouter la clé `GROQ_API_KEY` (gratuite, sans CB) dans les variables d'environnement Vercel — voir `GUIDE_DEPLOIEMENT.md`, sans quoi Nova reste en mode "excuse polie + redirection contact"

---

## ⏳ En attente d'informations de votre part

| Élément | Ce qu'il me faut |
|---|---|
| Réseaux sociaux | Vraies URLs Facebook / Instagram / LinkedIn |
| Vidéo de présentation | Un lien YouTube/Vimeo si disponible |
| Rapport d'activité 2024 | Le PDF quand il sera prêt |
| **Clé API Nova (gratuite)** | ⚠️ **Bloquant pour Nova** : créer un compte sur console.groq.com (aucune CB) puis ajouter `GROQ_API_KEY` dans Vercel (Settings → Environment Variables), voir `GUIDE_DEPLOIEMENT.md` |

---

## 🧪 Comment j'ai vérifié (transparence méthodologique)

- **Accessibilité** : scan automatisé avec `axe-core` (le même moteur que l'extension axe DevTools) sur les 3 pages du site → 0 violation WCAG 2.1 A/AA
- **Performance** : mesure du poids réseau réel transféré au chargement (Playwright + Chromium headless) → ~157 Ko contre 4,4 Mo initialement
- **Rendu visuel** : captures d'écran automatisées en desktop et mobile, mode clair et sombre, menu mobile ouvert, chatbot Nova en conversation
- **Code** : validation syntaxique de tous les fichiers JS (`node -c`), vérification qu'aucune image référencée n'est manquante

Je n'ai pas pu lancer un vrai rapport Lighthouse/PageSpeed Insights chiffré depuis mon environnement (pas d'accès à l'URL de production Vercel), donc je vous recommande de relancer PageSpeed Insights sur l'URL déployée après mise en ligne pour confirmer le nouveau score — je m'attends à un score Performance largement supérieur à 90, contre 70/76 avant corrections.

---

## 🆕 Nouveau lot de corrections — Juillet 2026 (v3)

### Hero
- [x] Carte redimensionnée (ratio 5:3, plus horizontale) via `object-fit:cover` — recadrage, aucune déformation
- [x] Alignement vertical carte/titre corrigé et vérifié par mesure DOM précise (écart final : 1,7px)
- [x] Colonne carte élargie de +12% par rapport à la colonne texte
- [x] Labels de villes (Washington, Lomé, France, Allemagne) retirés — points, connexions et animations conservés et améliorés (glow plus subtil, particules animées le long des connexions, effet de respiration)
- [x] Carte visible sous le texte sur mobile (au lieu d'être masquée)
- [x] Petites finitions : hiérarchie badge/titre resserrée, hauteur des boutons CTA harmonisée au pixel près

### Mode clair/sombre
- [x] Bouton cloche remplacé par un switch à piste unique (curseur glissant, icône soleil/lune), sur les 3 pages du site

### Correctifs transversaux
- [x] Icônes réseaux sociaux mortes (liens `#`) retirées de la section contact
- [x] Compteurs : la vraie valeur (6, 3) est maintenant dans le HTML source ; l'animation JS n'est qu'une amélioration progressive
- [x] Cartes du carrousel partenaires dupliquées marquées `aria-hidden="true"` (évite la double lecture par lecteurs d'écran / indexation Google)
- [x] Carrousel partenaires : défilement tactile manuel activé (pause de l'animation pendant l'interaction), scrollbar masquée, zone rendue accessible au clavier (`tabindex`, `role="region"`)
- [x] Sous-menu "À propos" désormais accessible au clavier (`:focus-within`), plus seulement au survol souris
- [x] Champs de formulaire : police passée à 16px (évite le zoom automatique iOS Safari), hauteur minimale 44px garantie
- [x] Widget de don HelloAsso : hauteur d'iframe augmentée sur mobile/petit écran pour éviter le contenu tronqué
- [x] Balisage Schema.org JSON-LD (type NGO) ajouté dans le `<head>` — validé syntaxiquement
- [x] Hiérarchie des titres re-vérifiée intégralement (1 seul H1, aucun saut de niveau détecté sur tout le document)
- [x] Textes alternatifs des images rendus plus descriptifs (carte, photo)
- [x] Avatars de l'équipe uniformisés : les 3 membres du bureau (Président inclus) utilisent désormais le même style d'avatar-initiales — **décision explicite prise sur demande, au prix de la photo réelle du Président** ; facilement réversible si vous préférez garder sa photo

### Bouton Nova
- [x] Nom "Nova" affiché à côté de l'icône sur desktop, icône seule sur mobile (≤480px)
- [x] Animation au survol (translation + léger agrandissement ~4%, transition douce)
- [x] Typographie Syne (déjà utilisée sur le site) plutôt qu'une police tierce, pour rester cohérent avec l'identité graphique existante

### Vérifications effectuées
- [x] 0 débordement horizontal détecté aux breakpoints 360px, 390px, 414px, 768px (mesure DOM, pas simple inspection visuelle)
- [x] 0 violation WCAG 2.1 A/AA (axe-core) sur les 3 pages après tous les changements — y compris un problème que j'ai moi-même introduit puis détecté et corrigé (zone défilable non focusable)
- [x] Tous les fichiers JS validés syntaxiquement, toutes les images référencées vérifiées présentes, toutes les ancres de navigation vérifiées intactes
