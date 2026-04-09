import type { Metadata } from "next";
import Image from "next/image";
import AboutHero from "@/components/sections/about/AboutHero";
import Story from "@/components/sections/about/Story";
import WhatSetsUsApart from "@/components/sections/about/WhatSetsUsApart";
import MeetTeam from "@/components/sections/about/MeetTeam";
import Vision from "@/components/sections/about/Vision";

export const metadata: Metadata = {
  title: "About Us | Mantra Medica",
  description:
    "Learn how Mantra Medica was founded to serve adventurers and the local community at the foot of Rinjani with world-class medical care and holistic recovery.",
};

export default function AboutPage() {
  return (
    <main style={{ fontFamily: "'Inter', sans-serif" }}>
      <AboutHero
        photoSlot={
          <Image
            src="/images/dryoga.webp"
            alt="Dr. I Gede Yoga Mahendra Putra"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        }
      />
      <Story />
      <WhatSetsUsApart />
      <MeetTeam />
      <Vision />
    </main>
  );
}