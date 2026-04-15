export interface Service {
  id: number;
  tag: string;
  title: string;
  subtitle: string;
  hours: string;
  badge?: string;
  desc: string;
  bullets: string[];
  cta: string;
  ctaSecondary?: string;
  imagePath: string;
}

export const services: Service[] = [
  {
    id: 1,
    tag: "Medical Check Up",
    title: "Trek with Confidence",
    subtitle: "Pre-Climbing Medical Check-Ups",
    hours: "24 Hours",
    desc: "Mount Rinjani offers breathtaking views but demands peak physical condition. Your safety is our absolute priority. Mantra Medica provides specialized Medical Check-Up (MCU) services specifically designed for trekkers.",
    bullets: [
      "Official Health Certificates — We provide the comprehensive physical examinations and health certificates required by authorities for Rinjani trekking permits.",
      "Physical Readiness Consultation — Our medical team helps evaluate your fitness levels to mitigate risks like fatigue or injury on the trail, ensuring you are prepared for the climb ahead.",
    ],
    cta: "Book Now",
    ctaSecondary: "See More Services",
    imagePath: "/images/medcuphome.webp",
  },
  {
    id: 2,
    tag: "Spa & Reflexology",
    title: "Total Recovery",
    subtitle: "Therapeutic Spa & Reflexology",
    hours: "08.00 – 17.00",
    badge: "Available Home Service",
    desc: "After conquering the summit or exploring Senaru's majestic waterfalls, your body deserves to be restored. Our Recovery & Wellness wing combines traditional techniques with a deep understanding of medical anatomy.",
    bullets: [
      "Deep Tissue Massage — Specifically designed to release muscle tension and knots caused by strenuous physical activity.",
      "Foot Reflexology — Specifically designed to release muscle tension and knots caused by strenuous physical activity.",
      "A Healing Environment — Experience your treatments in a serene space designed to harmonize the mind and body.",
    ],
    cta: "Book Now",
    ctaSecondary: "See More Services",
    imagePath: "/images/spahome.webp",
  },
  {
    id: 3,
    tag: "Emergency & Home Visit",
    title: "24/7 Medical Care",
    subtitle: "Rapid Response When It Matters Most",
    hours: "24 Hours",
    desc: "Health concerns can arise at any time, especially when you are far from home. Mantra Medica offers round-the-clock medical assistance for guests experiencing illness or requiring emergency care.",
    bullets: [
      "Emergency & Acute Care — Expert management of altitude sickness, heat exhaustion, and common travel-related ailments.",
      "Home Visits & On-Call Services — Our doctors are available for hotel visits to provide treatment in the comfort of your accommodation.",
      "Professional Expertise — Rest easy knowing you are in the hands of experienced practitioners.",
    ],
    cta: "Call Now",
    ctaSecondary: "See More Services",
    imagePath: "/images/emergenhome.webp",
  },
];

export const stats = [
  { icon: "🩺", label: "Certified Doctor" },
  { icon: "⛰️", label: "Trekking Specialist" },
  { icon: "🌿", label: "Nature Scenery" },
  { icon: "🏠", label: "Home Service" },
];