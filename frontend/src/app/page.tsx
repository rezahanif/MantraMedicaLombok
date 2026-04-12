// src/app/page.tsx
import Hero from "@/components/sections/home/Hero";
import ServiceCards from "@/components/sections/home/ServiceCards";
import RecoveryBanner from "@/components/sections/home/RecoveryBanner";

export default function HomePage() {
  return (
    <main style={{ fontFamily: "'Inter', sans-serif" }}>
      <Hero />
      <ServiceCards />
      <RecoveryBanner />
    </main>
  );
}