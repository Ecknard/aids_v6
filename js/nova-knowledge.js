/* ============================================
   AIDS — Base de connaissance du chatbot Nova
   Toutes les réponses sont construites UNIQUEMENT
   à partir du contenu réel du site. Ne rien inventer
   ici qui ne soit pas déjà affiché sur la page.
   ============================================ */

window.NOVA_KNOWLEDGE = [
  {
    id: 'mission',
    keywords: ['mission', 'missions', 'objectif', 'objectifs', 'que fait l\'association', 'role de l\'association'],
    answer: "L'AIDS agit sur plusieurs axes : l'accès à l'éducation de base (lecture, écriture, calcul), le développement de compétences pratiques pour l'autonomie, le soutien aux personnes isolées socialement, la protection de l'enfance (orphelins), et des programmes de développement humain durable, en France comme à l'international."
  },
  {
    id: 'zones',
    keywords: ['pays', 'zone', 'international', 'ou', 'où', 'presence', 'présence', 'togo', 'allemagne', 'etats-unis', 'états-unis', 'washington', 'france', 'lome', 'lomé'],
    answer: "L'association a des membres et une présence en France, en Allemagne, aux États-Unis (Washington) et au Togo (Lomé), pour une action véritablement internationale."
  },
  {
    id: 'don',
    keywords: ['don', 'donner', 'donation', 'soutenir', 'financer', 'argent', 'aider financierement', 'helloasso', 'payer'],
    answer: "Vous pouvez faire un don directement depuis la section « Votre don change des vies » du site, via notre partenaire HelloAsso (paiement sécurisé, 0% de frais prélevés sur votre don, reçu fiscal disponible sur demande)."
  },
  {
    id: 'benevolat',
    keywords: ['benevole', 'bénévole', 'benevolat', 'bénévolat', 'aider', 'participer', 'rejoindre', 'membre', 'adherer', 'adhérer'],
    answer: "Pour devenir bénévole, membre, ou rejoindre l'association, le plus simple est d'utiliser notre formulaire de contact (section « Contactez-nous ») en sélectionnant l'objet « Devenir membre » ou « Bénévolat »."
  },
  {
    id: 'statut',
    keywords: ['statut', 'juridique', 'association', 'loi 1901', 'legal', 'légal', 'officiel', 'rna', 'reconnue'],
    answer: "L'AIDS (Alliance Internationale pour le Développement Social) est une association loi 1901 à but non lucratif, déclarée le 12 juin 2023 (n° RNA W922020314) et publiée au Journal Officiel le 20 juin 2023."
  },
  {
    id: 'historique',
    keywords: ['histoire', 'historique', 'creation', 'création', 'fondee', 'fondée', 'depuis quand', 'annee', 'année', '2023'],
    answer: "L'association a été fondée le 12 juin 2023 et déclarée à la préfecture des Hauts-de-Seine. Ses statuts ont été mis à jour et signés le 23 janvier 2024 lors de l'Assemblée Générale constitutive."
  },
  {
    id: 'equipe',
    keywords: ['equipe', 'équipe', 'president', 'président', 'tresorier', 'trésorier', 'secretaire', 'secrétaire', 'qui'],
    answer: "Le bureau est composé de MENSAH Kodjo Samuel (Président), DZIWONOU Kisito F. (Trésorier) et BOGUI Omar Steeves K. (Secrétaire Exécutif). D'autres membres sont basés en Allemagne, aux États-Unis et au Togo."
  },
  {
    id: 'contact',
    keywords: ['contact', 'contacter', 'joindre', 'email', 'mail', 'adresse', 'telephone', 'téléphone', 'ecrire', 'écrire'],
    answer: "Vous pouvez nous écrire à alliance.ids92@yahoo.com, utiliser le formulaire de contact du site, ou nous retrouver au 4 allée Jacques Brel, 93160 Noisy-le-Grand, France."
  },
  {
    id: 'transparence',
    keywords: ['rapport', 'transparence', 'bilan', 'compte', 'document', 'statuts pdf', 'journal officiel'],
    answer: "Nos documents officiels (statuts, publication au Journal Officiel, procès-verbal de l'AG constitutive) sont téléchargeables dans la section « Rapport d'activité » du site. Notre premier rapport d'activité annuel complet est en cours de préparation."
  },
  {
    id: 'partenaires',
    keywords: ['partenaire', 'partenariat', 'collaboration', 'sponsor'],
    answer: "Nous collaborons avec plusieurs institutions publiques et associations partageant nos valeurs. Si vous souhaitez devenir partenaire, contactez-nous via le formulaire du site en précisant l'objet « Partenariat »."
  }
];

window.NOVA_FALLBACK = "Je n'ai pas assez d'informations pour répondre précisément à cette question. Je vous invite à utiliser notre formulaire de contact — notre équipe vous répondra directement 🙂";

window.NOVA_SUGGESTIONS = [
  { label: 'Nos missions', id: 'mission' },
  { label: 'Faire un don', id: 'don' },
  { label: 'Devenir bénévole', id: 'benevolat' },
  { label: 'Nous contacter', id: 'contact' }
];
