// src/app/services/page.tsx
import Image from "next/image";
import Navbar           from "@/components/shared/Navbar";
import Footer           from "@/components/shared/Footer";
import ServiceHero      from "@/components/sections/services/Servicehero";
import ServiceStatsBar  from "@/components/sections/services/Servicestatbar";
import ServiceGroups    from "@/components/sections/services/Servicegroups";

export default function ServicesPage() {
  return (
    <main style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar activePage="Medical Service" />
      <ServiceHero
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
      <ServiceStatsBar />
      <ServiceGroups />
    </main>
  );
}