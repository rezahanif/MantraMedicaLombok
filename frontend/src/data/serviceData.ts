// src/data/servicesData.ts

export interface ServiceCard {
  id: number;
  tag: string;
  title: string;
  hours: string;
  desc: string;
  cta: string;
  imagePath: string; // → /public/images/
  iconPath: string;  // → /public/images/ (icon for card)
}

export interface ServiceGroup {
  id: number;
  category: string;
  categoryDesc: string;
  // "left" = text left, cards middle, expanded right
  // "right" = expanded left, cards middle, text right
  textSide: "left" | "right";
  cards: ServiceCard[];
}

export const serviceGroups: ServiceGroup[] = [
  {
    id: 1,
    category: "Adventure Medicine & Pre-Climbing Readiness",
    categoryDesc:
      "Preparation is the foundation of a successful expedition. Before you take your first step toward the summit of Mount Rinjani, ensure your body is ready for the challenge.",
    textSide: "left",
    cards: [
      {
        id: 11,
        tag: "Safety Briefing",
        title: "Safety Briefing",
        hours: "08.00 - 17.00",
        desc: "Comprehensive pre-climb safety orientation covering altitude risks, emergency protocols, and physical preparation requirements for Mount Rinjani.",
        cta: "Book Now",
        imagePath: "/images/pertama1.webp",
        iconPath: "/icons/safety.webp",
      },
      {
        id: 12,
        tag: "Health Certificate",
        title: "Mandatory Health Certificates",
        hours: "08.00 - 17.00",
        desc: "Official health certification required by Rinjani National Park authorities. Includes physical exam, fitness assessment, and documentation.",
        cta: "Book Now",
        imagePath: "/images/pertama2.webp",
        iconPath: "/icons/certified.webp",
      },
      {
        id: 13,
        tag: "Consultation",
        title: "Mountain Medicine Consultation",
        hours: "08.00 - 17.00",
        desc: "Expert guidance on preventing and managing high-altitude conditions, including Altitude Sickness (AMS), Hypothermia, and physical exhaustion.",
        cta: "Book Now",
        imagePath: "/images/pertama3.webp",
        iconPath: "/icons/pill.webp",
      },
    ],
  },
  {
    id: 2,
    category: "Common Traveler Ailments",
    categoryDesc:
      "Travel-related illnesses can disrupt your plans. Our clinic offers comprehensive diagnostic and therapeutic services to get you back on your feet quickly.",
    textSide: "right",
    cards: [
      {
        id: 21,
        tag: "General Clinic",
        title: "Common Traveler Ailments",
        hours: "08.00 - 17.00",
        desc: "Professional treatment for Bali Belly (digestive distress), nausea, vomiting, fever, flu, and stomach pain.",
        cta: "Book Now",
        imagePath: "/images/kedua1.webp",
        iconPath: "/icons/sick.webp",
      },
      {
        id: 22,
        tag: "Recovery",
        title: "Recovery & Hangover Therapy",
        hours: "08.00 - 17.00",
        desc: "IV drip therapy and recovery treatments to restore hydration, vitamins, and energy after a long night or strenuous activity.",
        cta: "Book Now",
        imagePath: "/images/kedua2.webp",
        iconPath: "/icons/vitdrop.webp",
      },
      {
        id: 23,
        tag: "Laboratory",
        title: "In-House Laboratory",
        hours: "08.00 - 17.00",
        desc: "On-site diagnostic lab for rapid blood tests, urinalysis, and pathogen screening — results within hours, not days.",
        cta: "Book Now",
        imagePath: "/images/kedua3.webp",
        iconPath: "/icons/lab.webp",
      },
    ],
  },
  {
    id: 3,
    category: "Emergency Evacuation & Global Insurance Support",
    categoryDesc:
      "In the event of a serious accident at a waterfall or on the mountain trail, our team is trained to act fast and coordinate with the best medical facilities in the region.",
    textSide: "left",
    cards: [
      {
        id: 31,
        tag: "Emergency",
        title: "Mountain & Waterfall Rescue",
        hours: "24 Hours",
        desc: "Rapid emergency response and medical evacuation for accidents on Rinjani trails, waterfalls, and surrounding areas.",
        cta: "Call Now",
        imagePath: "/images/ketiga2.webp",
        iconPath: "/icons/whitesirene.webp",
      },
      {
        id: 32,
        tag: "Referral",
        title: "Comprehensive Referral System",
        hours: "24 Hours",
        desc: "Seamless coordination with hospitals in Mataram and Bali for cases requiring specialist care or surgical intervention.",
        cta: "Learn More",
        imagePath: "/images/ketiga3.webp",
        iconPath: "/icons/relation.webp",
      },
      {
        id: 33,
        tag: "Insurance",
        title: "International Insurance Acceptance",
        hours: "08.00 - 17.00",
        desc: "We aim to make your recovery stress-free. Mantra Medica accepts international travel insurance from all countries, subject to the terms and conditions of your specific policy.",
        cta: "Book Now",
        imagePath: "/images/ketiga1.webp",
        iconPath: "/icons/worldshadow.webp",
      },
    ],
  },
];

export const serviceStats = [
  { icon: "🩺", label: "Licensed Doctors" },
  { icon: "⚡", label: "Fast Response" },
  { icon: "⛰️", label: "Trek-Specialist" },
  { icon: "🕐", label: "Open Daily 08.00-22.00" },
];