// src/components/contact/ContactInfo.tsx
"use client";

import { useState, useEffect } from "react";
import { C } from "@/lib/constants";
import { contactInfo } from "@/data/contactData";
import { supabase } from "@/lib/supabase";

export default function ContactInfo() {
  const [contactList, setContactList] = useState(contactInfo);
  const [links, setLinks] = useState({
    whatsapp: contactInfo[0].primary,  // Fallback: "+62 888 8888 8888"
    email: contactInfo[1].primary,     // Fallback: "Mantramedicare@gmail.com"
    maps: "https://maps.google.com/?q=Senaru+Bayan+Lombok",  // Fallback: Google Maps search
  });

  // Fetch contact info from clinic_info table
  useEffect(() => {
    const fetchContact = async () => {
      try {
        console.log("🔄 Fetching clinic_info...");
        const { data, error } = await supabase
          .from("clinic_info")
          .select("*");
        console.log("📥 Raw data from Supabase:", data);
        console.log("❌ Error (if any):", error);
        
        if (error) {
          console.error("❌ Error fetching contact info:", error);
          console.log("⚠️ Using fallback data from contactData.ts");
        } else if (data && data.length > 0) {
          const clinicData = data[0];
          console.log("✅ Fetched clinic_info:", clinicData);
          console.log("WhatsApp number:", clinicData.whatsapp_number);
          console.log("Email address:", clinicData.email_address);
          console.log("Google Maps link:", clinicData.google_maps_link);
          
          const finalMapsLink = clinicData.google_maps_link || "https://maps.google.com/?q=Senaru+Bayan+Lombok";
          console.log("📍 Final maps link to use:", finalMapsLink);
          
          setLinks({
            whatsapp: clinicData.whatsapp_number || contactInfo[0].primary,
            email: clinicData.email_address || contactInfo[1].primary,
            maps: finalMapsLink,
          });
          setContactList([
            {
              icon: "icons/call.webp",
              primary: clinicData.whatsapp_number || contactInfo[0].primary,
              secondary: "Available 24/7 for emergencies",
              cta: "Call Now",
              ctaColor: "#E05A4E",
            },
            {
              icon: "icons/email.webp",
              primary: clinicData.email_address || contactInfo[1].primary,
              secondary: "Response within 2 hours",
              cta: "Send Email",
              ctaColor: "#438BA9",
            },
            {
              icon: "icons/loc.webp",
              primary: clinicData.address_text || contactInfo[2].primary,
              secondary: "Near the main trekking gate",
              cta: "Open in Maps",
              ctaColor: "#65A396",
            },
          ]);
        } else {
          console.warn("⚠️ No data found in clinic_info table, using fallback");
        }
      } catch (err) {
        console.error("❌ Error:", err);
      }
    };
    fetchContact();
  }, []);

  return (
    <section style={{ background: C.teal, padding: "52px 32px", position: "relative", overflow: "hidden" }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .contact-section-heading { animation: fadeIn 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both; }
        .contact-info-desktop .contact-card { animation: slideUp 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both; }
        .contact-info-desktop .contact-card:nth-child(1) { animation-delay: 0.15s; }
        .contact-info-desktop .contact-card:nth-child(2) { animation-delay: 0.3s; }
        .contact-info-desktop .contact-card:nth-child(3) { animation-delay: 0.45s; }
        .contact-info-mobile .contact-card { animation: slideUp 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both; }
        .contact-info-mobile .contact-card:nth-child(1) { animation-delay: 0.15s; }
        .contact-info-mobile .contact-card:nth-child(2) { animation-delay: 0.25s; }
        .contact-info-mobile .contact-card:nth-child(3) { animation-delay: 0.35s; }

        @media (max-width: 499px) {
          .contact-info-desktop { display: none !important; }
          .contact-info-mobile  { display: grid !important; }
        }
        @media (min-width: 500px) {
          .contact-info-desktop { display: grid !important; }
          .contact-info-mobile  { display: none !important; }
        }
      `}</style>

      {/* Decorative quotation marks */}
      <div style={{ position: "absolute", top: 16, left: 20, fontSize: 48, color: "rgba(255,255,255,0.08)", lineHeight: 1, fontFamily: "serif" }}>"</div>
      <div style={{ position: "absolute", bottom: 16, right: 20, fontSize: 48, color: "rgba(255,255,255,0.08)", lineHeight: 1, fontFamily: "serif", transform: "rotate(180deg)" }}>"</div>

      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <h2 className="contact-section-heading" style={{ color: C.light, fontSize: 22, fontWeight: 700, textAlign: "center", marginBottom: 36 }}>
          Contact Information
        </h2>

        {/* Desktop: 3-column grid (≥500px) */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="contact-info-desktop">
          {contactList.map((item) => (
            <div key={item.primary} className="contact-card" style={{ textAlign: "center" }}>
              <div style={{ marginBottom: 10 }}>
                <img src={item.icon} alt="" style={{ width: 28, height: 28, objectFit: "contain", margin: "0 auto" }} />
              </div>
              <p style={{ color: C.light, fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{item.primary}</p>
              <p style={{ color: "rgba(250,250,250,0.65)", fontSize: 12, marginBottom: 16 }}>{item.secondary}</p>
              <button
                style={{ 
                  background: item.ctaColor,
                  color: C.light,
                  border: item.ctaColor === C.teal ? `1px solid rgba(255,255,255,0.4)` : "none",
                  borderRadius: 100,
                  padding: "8px 18px",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 12px rgba(0,0,0,0.15)`,
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onClick={() => {
                  console.log("Button clicked:", item.cta, "Links:", links);
                  if (item.cta === "Call Now" && links.whatsapp) {
                    console.log("Opening WhatsApp:", `https://wa.me/${links.whatsapp.replace(/\D/g, '')}`);
                    window.open(`https://wa.me/${links.whatsapp.replace(/\D/g, '')}`, "_blank");
                  } else if (item.cta === "Send Email" && links.email) {
                    console.log("Opening Email:", `mailto:${links.email}`);
                    window.open(`mailto:${links.email}`);
                  } else if (item.cta === "Open in Maps" && links.maps) {
                    console.log("Opening Maps:", links.maps);
                    window.open(links.maps, "_blank");
                  } else {
                    console.log("No action - missing data or CTA mismatch");
                  }
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1.08)";
                  (e.currentTarget as HTMLElement).style.boxShadow = `inset 0 1px 0 rgba(255,255,255,0.2), 0 6px 16px rgba(0,0,0,0.25)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                  (e.currentTarget as HTMLElement).style.boxShadow = `inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 12px rgba(0,0,0,0.15)`;
                }}
              >
                {item.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Mobile: 1-column stack (<500px) */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }} className="contact-info-mobile">
          {contactList.map((item) => (
            <div key={item.primary} className="contact-card" style={{ textAlign: "center", background: "rgba(255,255,255,0.08)", padding: 16, borderRadius: 16 }}>
              <div style={{ marginBottom: 8 }}>
                <img src={item.icon} alt="" style={{ width: 32, height: 32, objectFit: "contain", margin: "0 auto" }} />
              </div>
              <p style={{ color: C.light, fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{item.primary}</p>
              <p style={{ color: "rgba(250,250,250,0.65)", fontSize: 11, marginBottom: 12 }}>{item.secondary}</p>
              <button
                style={{ 
                  background: item.ctaColor,
                  color: C.light,
                  border: item.ctaColor === C.teal ? `1px solid rgba(255,255,255,0.4)` : "none",
                  borderRadius: 100,
                  padding: "7px 14px",
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: "pointer",
                  width: "100%",
                  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 12px rgba(0,0,0,0.15)`,
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onClick={() => {
                  console.log("Mobile button clicked:", item.cta, "Links:", links);
                  if (item.cta === "Call Now" && links.whatsapp) {
                    console.log("Opening WhatsApp:", `https://wa.me/${links.whatsapp.replace(/\D/g, '')}`);
                    window.open(`https://wa.me/${links.whatsapp.replace(/\D/g, '')}`, "_blank");
                  } else if (item.cta === "Send Email" && links.email) {
                    console.log("Opening Email:", `mailto:${links.email}`);
                    window.open(`mailto:${links.email}`);
                  } else if (item.cta === "Open in Maps" && links.maps) {
                    console.log("Opening Maps:", links.maps);
                    window.open(links.maps, "_blank");
                  } else {
                    console.log("No action - missing data or CTA mismatch");
                  }
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1.08)";
                  (e.currentTarget as HTMLElement).style.boxShadow = `inset 0 1px 0 rgba(255,255,255,0.2), 0 6px 16px rgba(0,0,0,0.25)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                  (e.currentTarget as HTMLElement).style.boxShadow = `inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 12px rgba(0,0,0,0.15)`;
                }}
              >
                {item.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}