// src/app/page.tsx
import Image from "next/image";
import { C } from "@/lib/constants";
import Hero from "@/components/sections/home/Hero";
import ServiceCards from "@/components/sections/home/ServiceCards";
import RecoveryBanner from "@/components/sections/home/RecoveryBanner";

export default function HomePage() {
  return (
    <main style={{ fontFamily: "'Inter', sans-serif" }}>
      <Hero
        title="Welcome to Mantra Medica"
        doctorName="dr. I Gede Yoga Mahendra Putra"
        description={
          <>
            Your <strong style={{ color: C.light }}>Health & Recovery Hub</strong> at the
            Gateway to Rinjani. Nestled in the heart of{" "}
            <strong style={{ color: C.light }}>Senaru</strong>, we cater to adventurers,
            global travelers, and the local community — built on the belief that every great
            journey begins with{" "}
            <strong style={{ color: C.light }}>thorough preparation</strong> and concludes
            with perfect recovery.
          </>
        }
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
      <ServiceCards />
      <RecoveryBanner />
    </main>
  );
}