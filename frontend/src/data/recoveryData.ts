// src/data/recoveryData.ts

export interface Treatment {
  id: number;
  tag: string;
  title: string;
  hours: string;
  desc: string;
  cta: string;
  imagePath: string;
}

export const treatments: Treatment[] = [
  {
    id: 1,
    tag: "Body Therapy",
    title: "Therapeutic Body Massage",
    hours: "08.00 - 17.00",
    desc: 'Our specialized massage techniques focus on deep tissue recovery. Whatever you are dealing with, our therapists use a medical-grade understanding of anatomy to release tension and restore mobility.',
    cta: "Book Now",
    imagePath: "/images/body-massage.jpg",
  },
  {
    id: 2,
    tag: "Reflexology",
    title: "Revitalizing Foot Reflexology",
    hours: "08.00 - 17.00",
    desc: "Targeted pressure points on the feet mapped to organs and systems throughout the body. Our reflexologists restore balance, reduce fatigue, and stimulate circulation.",
    cta: "Book Now",
    imagePath: "/images/foot-reflexology.jpg",
  },
  {
    id: 3,
    tag: "Hot Stone",
    title: "Hot Stone Ritual",
    hours: "09.00 - 16.00",
    desc: "Smooth volcanic stones heated and placed along key energy points, combined with long massage strokes. Deeply relaxing and muscle-relieving after strenuous trekking.",
    cta: "Book Now",
    imagePath: "/images/hot-stone.jpg",
  },
];

export const whyChooseSlides = [
  { imagePath: "/images/view-1.jpg", caption: "Panoramic Rinjani view" },
  { imagePath: "/images/view-2.jpg", caption: "Tranquil treatment room" },
  { imagePath: "/images/view-3.jpg", caption: "Outdoor wellness area" },
];

export const homeCareFeatures = [
  {
    icon: "icons/handuk.webp",
    title: "Professional Setup",
    desc: "Our therapists arrive with everything needed to transform your private space into a personal wellness retreat.",
  },
  {
    icon: "icons/pintu.webp",
    title: "In-Villa Service",
    desc: "We offer professional Home Care treatments at your villa or hotel within Senaru and the surrounding areas.",
  },
];