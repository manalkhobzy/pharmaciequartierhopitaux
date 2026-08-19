export const PHARMACIE = {
  nom: "Pharmacie Quartier des Hôpitaux",
  slogan: "Votre santé, notre priorité depuis 45 ans",
  adresse: "279 Boulevard Abdelmoumen, Casablanca 20340, Maroc",
  adresseShort: "279 Bd Abdelmoumen, Casablanca",
  telephone: "05 22 86 06 54",
  telephoneLink: "+212522860654",
  whatsapp: "212653468785",
  whatsappDisplay: "06 53 46 87 85",
  email: "",
  instagram: "pharmaquartierdeshopitaux",
  instagramUrl: "https://instagram.com/pharmaquartierdeshopitaux",
  googleMapsUrl: "https://maps.google.com/?q=279+Bd+Abdelmoumen+Casablanca",
  googleMapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3324.1!2d-7.6254!3d33.5992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s279+Bd+Abdelmoumen+Casablanca!5e0!3m2!1sfr!2sma!4v1",
  noteGoogle: 5.0,
  nbAvis: 21,
  anneeCreation: 1979,
  horaires: [
    { jour: "Lundi", jourCourt: "Lun", ouverture: "09:00", fermeture: "20:00", ouvert: true },
    { jour: "Mardi", jourCourt: "Mar", ouverture: "09:00", fermeture: "20:00", ouvert: true },
    { jour: "Mercredi", jourCourt: "Mer", ouverture: "09:00", fermeture: "20:00", ouvert: true },
    { jour: "Jeudi", jourCourt: "Jeu", ouverture: "09:00", fermeture: "20:00", ouvert: true },
    { jour: "Vendredi", jourCourt: "Ven", ouverture: "09:00", fermeture: "20:00", ouvert: true },
    { jour: "Samedi", jourCourt: "Sam", ouverture: "09:00", fermeture: "13:30", ouvert: true },
    { jour: "Dimanche", jourCourt: "Dim", ouverture: null, fermeture: null, ouvert: false },
  ],
  whatsappOrdonnanceMsg:
    "Bonjour,%20je%20souhaite%20envoyer%20mon%20ordonnance",
  whatsappContactMsg:
    "Bonjour,%20j%27ai%20une%20question%20pour%20la%20Pharmacie%20Quartier%20des%20H%C3%B4pitaux",
} as const

export const SERVICES = [
  {
    id: "ordonnance-whatsapp",
    titre: "Ordonnance WhatsApp",
    description: "Envoyez votre ordonnance par photo, récupérez en pharmacie",
    icon: "MessageCircle",
  },
  {
    id: "preparations-magistrales",
    titre: "Préparations magistrales",
    description: "Formules sur mesure en collaboration avec vos dermatos",
    icon: "FlaskConical",
  },
  {
    id: "parapharmacie",
    titre: "Parapharmacie",
    description: "Libre accès : soins, beauté, hygiène des grandes marques",
    icon: "ShoppingBag",
  },
  {
    id: "phytotherapie",
    titre: "Phytothérapie",
    description: "Plantes médicinales et compléments naturels",
    icon: "Leaf",
  },
  {
    id: "aromatherapie",
    titre: "Aromathérapie",
    description: "Huiles essentielles et conseils d'utilisation",
    icon: "Droplets",
  },
  {
    id: "homeopathie",
    titre: "Homéopathie",
    description: "Sur commande, disponible sous 24 à 48 h",
    icon: "Pill",
  },
  {
    id: "prise-de-tension",
    titre: "Prise de tension",
    description: "Mesure gratuite en officine, sans rendez-vous",
    icon: "Heart",
  },
  {
    id: "conseil-dietetique",
    titre: "Conseil diététique",
    description: "Suivi nutritionnel personnalisé par nos équipes",
    icon: "Apple",
  },
  {
    id: "marques-dermo",
    titre: "Marques dermo",
    description: "La Roche-Posay, Vichy, CeraVe, Dercos, Avène…",
    icon: "Sparkles",
  },
] as const

export type MembreEquipe = {
  id: string
  nom: string
  titre: string
  titreLong: string
  description: string
  /** null = pas encore de portrait : l'initiale du prénom est affichée à la place */
  photo: string | null
}

export const EQUIPE: MembreEquipe[] = [
  {
    id: "manal-khobzi-sordo",
    nom: "Dr Manal Khobzi Sordo",
    titre: "Docteur en Pharmacie",
    titreLong: "Docteur en Pharmacie, Faculté de Pharmacie de Lille",
    description:
      "Diplômée de la Faculté de Pharmacie de Lille, la Dr Khobzi Sordo a exercé 2 ans en France avant de reprendre la Pharmacie Quartier des Hôpitaux. Spécialisée en dermatologie, phytothérapie et aromathérapie.",
    photo: "/images/Manal.webp",
  },
  {
    id: "asmae",
    nom: "Asmae",
    titre: "Pharmacienne assistante",
    titreLong: "Pharmacienne assistante",
    description:
      "Pharmacienne assistante, Asmae vous accompagne à la délivrance de vos ordonnances et vous conseille sur vos traitements.",
    photo: "/images/Asmae.webp",
  },
  {
    id: "ilham",
    nom: "Ilham",
    titre: "Aide pharmacien",
    titreLong: "Aide pharmacien, plus de 20 ans d'expérience",
    description:
      "Forte de plus de 20 ans d'expérience en officine, Ilham prépare vos ordonnances et vous oriente au quotidien.",
    photo: "/images/Ilham.webp",
  },
  {
    id: "nezha",
    nom: "Nezha",
    titre: "Aide pharmacien",
    titreLong: "Aide pharmacien, de formation infirmière",
    description:
      "De formation infirmière, Nezha apporte un regard soignant à l'accueil et au suivi des patients de la pharmacie.",
    photo: "/images/Nezha.webp",
  },
  {
    id: "rayhab",
    nom: "Rayhab",
    titre: "Conseillère en dermo-cosmétique",
    titreLong: "Conseillère en dermo-cosmétique et parapharmacie",
    description:
      "Rayhab vous guide dans le choix de vos soins : dermo-cosmétique, capillaire, hygiène et bien-être.",
    photo: "/images/Rayhab.webp",
  },
]

export const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/notre-pharmacie", label: "Notre pharmacie" },
  { href: "/nos-services", label: "Nos services" },
  { href: "/actualites-et-conseils", label: "Actualités et conseils" },
  { href: "/ordonnance", label: "Ordonnance" },
  { href: "/nous-contacter", label: "Nous contacter" },
] as const
