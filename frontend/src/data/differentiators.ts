export interface Differentiator {
  id: string;
  icon: string; // lucide icon name or emoji fallback
  title: string;
  tags: string[];
  description: string;
  hasBgImage?: boolean;
  bgImage?: string;
}

export const differentiators: Differentiator[] = [
  {
    id: "urban-standards",
    icon: "MapPin",
    title: "Urban Medical Standards in a Remote Setting",
    tags: ["Advance Tech", "Licensed MDs", "Protocol Adherence"],
    description:
      "We bring city-standard healthcare after the mountain, ultra-modern console care to the heart of North Lombok.",
    hasBgImage: false,
  },
  {
    id: "recovery-framework",
    icon: "Activity",
    title: "The Recovery Framework",
    tags: ["Physio Alignment", "Valleyside Setting", "Muscle Recovery"],
    description:
      "We believe that an actual physio-propocier and valley-view massage pavilion at Mount Rinjani is what true recovery demands.",
    hasBgImage: true,
    bgImage: "/assets/images/recovery-bg.jpg",
  },
  {
    id: "community-travelers",
    icon: "Users",
    title: "Dedicated to Community & Travelers",
    tags: ["Global Standards", "24/7 Support", "Trusted Partner"],
    description:
      "We are proud parting serve to serve international standard and local community with equal heart.",
    hasBgImage: false,
  },
];