// src/app/recovery/page.tsx
import Image from "next/image";
import Navbar             from "@/components/shared/Navbar";
import Footer             from "@/components/shared/Footer";
import RecoveryHero       from "@/components/sections/recovery/Recoveryhero";
import SignatureTreatment from "@/components/sections/recovery/Signaturetreatment";
import WhyChoose          from "@/components/sections/recovery/Whychoose";
import HomeCare           from "@/components/sections/recovery/Homecare";

export default function RecoveryPage() {
  return (
    <main style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar activePage="Recovery & Wellness" />
      <RecoveryHero
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
      <SignatureTreatment />
      <WhyChoose />
      <HomeCare />
    </main>
  );
}