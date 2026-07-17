"use client";

import Link from "next/link";
import Image from "next/image";
import { C } from "@/lib/constants";
import { navLinks, footerLinks } from "@/data/shared";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";

export default function Footer() {
  const [inView, setInView] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const [contact, setContact] = useState(footerLinks.contact);
  const [mapsLink, setMapsLink] = useState("https://maps.google.com/?q=Senaru+Bayan+Lombok");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  // Load clinic info from database
  useEffect(() => {
    const loadClinicInfo = async () => {
      try {
        const { data } = await supabase.from('clinic_info').select('*').single();
        if (data) {
          setContact([
            { icon: "icons/locgreen.webp", text: data.address_text || footerLinks.contact[0].text },
            { icon: "icons/callgreen.webp", text: data.whatsapp_number || footerLinks.contact[1].text },
            { icon: "icons/emailgreen.webp", text: data.email_address || footerLinks.contact[2].text },
          ]);
          if (data.google_maps_link) {
            setMapsLink(data.google_maps_link);
          }
        }
      } catch (err) {
        console.error('Error loading clinic info:', err);
      }
    };
    loadClinicInfo();
  }, []);

  return (
    <footer ref={footerRef}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @media (max-width: 860px) {
          .footer-desktop { display: none !important; }
          .footer-mobile { display: block !important; }
        }
      `}</style>
      {/* Desktop Footer */}
      <div className="footer-desktop">
        {/* Top Section - Light background */}
        <div style={{ background: C.light, padding: "48px 32px 32px" }}>
          <div className="max-w-5xl mx-auto">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 1fr 1fr 1.4fr",
                gap: 40,
                marginBottom: 32,
              }}
            >
              {/* Logo */}
              <div style={{
                animation: inView ? "fadeUp 0.6s cubic-bezier(0.22,0.61,0.36,1) 100ms both" : "none",
                opacity: inView ? undefined : 0,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, marginTop: -30 }}>
                  <Image
                    src="/images/Text-Vertical-Green.webp"
                    alt="Mantra Medica"
                    width={240}
                    height={240}
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </div>

              {/* Quick Links */}
              <div style={{
                animation: inView ? "fadeUp 0.6s cubic-bezier(0.22,0.61,0.36,1) 150ms both" : "none",
                opacity: inView ? undefined : 0,
              }}>
                <p style={{ color: C.teal, fontWeight: 600, fontSize: 13, marginBottom: 14 }}>Quick Link</p>
                {navLinks.map((item) => (
                  <p key={item.label} style={{ color: C.teal, fontSize: 13, marginBottom: 8, opacity: 0.7 }}>
                    <Link href={item.href} style={{ color: "inherit", textDecoration: "none" }}>{item.label}</Link>
                  </p>
                ))}
              </div>

              {/* Departments */}
              <div style={{
                animation: inView ? "fadeUp 0.6s cubic-bezier(0.22,0.61,0.36,1) 200ms both" : "none",
                opacity: inView ? undefined : 0,
              }}>
                <p style={{ color: C.teal, fontWeight: 600, fontSize: 13, marginBottom: 14 }}>Departments</p>
                {["General Clinic", "Dental Clinic", "Pharmacy", "Radiology & Imaging", "Emergency", "Laboratory"].map((l) => (
                  <p key={l} style={{ color: C.teal, fontSize: 13, marginBottom: 8, opacity: 0.7 }}>
                    <a href="#" style={{ color: "inherit", textDecoration: "none" }}>{l}</a>
                  </p>
                ))}
              </div>

              {/* Contact */}
              <div style={{
                animation: inView ? "fadeUp 0.6s cubic-bezier(0.22,0.61,0.36,1) 250ms both" : "none",
                opacity: inView ? undefined : 0,
              }}>
                <p style={{ color: C.teal, fontWeight: 600, fontSize: 13, marginBottom: 14 }}>
                  Contact & Newsletter
                </p>
                {contact.map((c) => (
                  <div key={c.text} style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "flex-start" }}>
                    <Image
                      src={`/${c.icon}`}
                      alt=""
                      width={16}
                      height={16}
                      style={{ objectFit: "contain", marginTop: 1, flexShrink: 0 }}
                    />
                     {c.icon === "icons/callgreen.webp" ? (
                      <a
                        href={`https://wa.me/${c.text.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: C.teal, fontSize: 13, opacity: 0.7, textDecoration: "none", cursor: "pointer" }}
                      >
                        {c.text}
                      </a>
                    ) : c.icon === "icons/locgreen.webp" ? (
                      <a
                        href={mapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: C.teal, fontSize: 13, opacity: 0.7, textDecoration: "none", cursor: "pointer" }}
                      >
                        {c.text}
                      </a>
                    ) : c.icon === "icons/emailgreen.webp" ? (
                      <a
                        href={`mailto:${c.text}`}
                        style={{ color: C.teal, fontSize: 13, opacity: 0.7, textDecoration: "none", cursor: "pointer" }}
                      >
                        {c.text}
                      </a>
                    ) : (
                      <span style={{ color: C.teal, fontSize: 13, opacity: 0.7 }}>{c.text}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Teal background */}
        <div style={{ background: C.teal, padding: "20px 32px" }}>
          <div className="max-w-5xl mx-auto">
            <div
              style={{
                paddingTop: 20,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p style={{ color: C.light, fontSize: 12 }}>
                © 2026 Mantra Medicare. All rights reserved.
              </p>
              <div style={{ display: "flex", gap: 20 }}>
                {["Privacy Policy", "Terms of Service"].map((l) => (
                  <a
                    key={l}
                    href="#"
                    style={{ color: C.light, fontSize: 12, textDecoration: "none" }}
                  >
                    {l}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Footer */}
      <div className="footer-mobile" style={{ display: "none" }}>
        {/* Top Section - Light background */}
        <div style={{ background: C.light, padding: "32px 16px 24px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {/* Logo */}
            <div style={{
              animation: inView ? "fadeUp 0.6s cubic-bezier(0.22,0.61,0.36,1) 100ms both" : "none",
              opacity: inView ? undefined : 0,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <Image
                  src="/images/logonavbar.webp"
                  alt="Mantra Medica"
                  width={150}
                  height={150}
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>

            {/* Quick Links */}
            <div style={{
              animation: inView ? "fadeUp 0.6s cubic-bezier(0.22,0.61,0.36,1) 150ms both" : "none",
              opacity: inView ? undefined : 0,
            }}>
              <p style={{ color: C.teal, fontWeight: 600, fontSize: 12, marginBottom: 10 }}>Quick Links</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {navLinks.map((item) => (
                  <p key={item.label} style={{ color: C.teal, fontSize: 12, opacity: 0.7 }}>
                    <Link href={item.href} style={{ color: "inherit", textDecoration: "none" }}>{item.label}</Link>
                  </p>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div style={{
              animation: inView ? "fadeUp 0.6s cubic-bezier(0.22,0.61,0.36,1) 200ms both" : "none",
              opacity: inView ? undefined : 0,
            }}>
              <p style={{ color: C.teal, fontWeight: 600, fontSize: 12, marginBottom: 10 }}>Contact</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {contact.map((c) => (
                  <div key={c.text} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <Image
                      src={`/${c.icon}`}
                      alt=""
                      width={14}
                      height={14}
                      style={{ objectFit: "contain", marginTop: 1, flexShrink: 0 }}
                    />
                     {c.icon === "icons/callgreen.webp" ? (
                      <a
                        href={`https://wa.me/${c.text.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: C.teal, fontSize: 12, opacity: 0.7, textDecoration: "none", cursor: "pointer" }}
                      >
                        {c.text}
                      </a>
                    ) : c.icon === "icons/locgreen.webp" ? (
                      <a
                        href={mapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: C.teal, fontSize: 12, opacity: 0.7, textDecoration: "none", cursor: "pointer" }}
                      >
                        {c.text}
                      </a>
                    ) : c.icon === "icons/emailgreen.webp" ? (
                      <a
                        href={`mailto:${c.text}`}
                        style={{ color: C.teal, fontSize: 12, opacity: 0.7, textDecoration: "none", cursor: "pointer" }}
                      >
                        {c.text}
                      </a>
                    ) : (
                      <span style={{ color: C.teal, fontSize: 12, opacity: 0.7 }}>{c.text}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Teal background */}
        <div style={{ background: C.teal, padding: "16px" }}>
          <p style={{ color: C.light, fontSize: 11, marginBottom: 12, lineHeight: 1.5 }}>
            © 2026 Mantra Medicare. All rights reserved.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 12 }}>
            {["Privacy Policy", "Terms of Service"].map((l) => (
              <a
                key={l}
                href="#"
                style={{ color: C.light, fontSize: 11, textDecoration: "none" }}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}