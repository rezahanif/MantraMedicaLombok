// src/app/contact/page.tsx
import Image from "next/image";
import Navbar          from "@/components/shared/Navbar";
import Footer          from "@/components/shared/Footer";
import ContactHero     from "@/components/sections/contact/ContactHero";
import MapSection      from "@/components/sections/contact/MapSection";
import ContactInfo     from "@/components/sections/contact/ContactInfo";
import BookingForm     from "@/components/sections/contact/BookingForm";
import EmergencyBanner from "@/components/sections/contact/Emergencybanner";

export default function ContactPage() {
  return (
    <main style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar activePage="Contact & Location" />
      <ContactHero
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
      <MapSection />
      <ContactInfo />
      <BookingForm />
      <EmergencyBanner />
    </main>
  );
}