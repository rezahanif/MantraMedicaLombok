import Link from "next/link";
import Image from "next/image";
import { C } from "@/lib/constants";
import { navLinks } from "@/data/shared";

export default function Footer() {
  return (
    <footer>
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
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <Image
                    src="/images/logovertical.webp"
                    alt="Mantra Medica"
                    width={240}
                    height={240}
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <p style={{ color: C.teal, fontWeight: 600, fontSize: 13, marginBottom: 14 }}>Quick Link</p>
                {navLinks.map((item) => (
                  <p key={item.label} style={{ color: C.teal, fontSize: 13, marginBottom: 8, opacity: 0.7 }}>
                    <Link href={item.href} style={{ color: "inherit", textDecoration: "none" }}>{item.label}</Link>
                  </p>
                ))}
              </div>

              {/* Departments */}
              <div>
                <p style={{ color: C.teal, fontWeight: 600, fontSize: 13, marginBottom: 14 }}>Departments</p>
                {["General Clinic", "Dental Clinic", "Pharmacy", "Radiology & Imaging", "Emergency", "Laboratory"].map((l) => (
                  <p key={l} style={{ color: C.teal, fontSize: 13, marginBottom: 8, opacity: 0.7 }}>
                    <a href="#" style={{ color: "inherit", textDecoration: "none" }}>{l}</a>
                  </p>
                ))}
              </div>

              {/* Contact */}
              <div>
                <p style={{ color: C.teal, fontWeight: 600, fontSize: 13, marginBottom: 14 }}>
                  Contact & Newsletter
                </p>
                {[
                  { icon: "📍", text: "Lombok, NTB" },
                  { icon: "📞", text: "+62-888-888-8888" },
                  { icon: "✉️", text: "mantramedica@gmail.com" },
                ].map((c) => (
                  <div key={c.text} style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 13 }}>{c.icon}</span>
                    <span style={{ color: C.teal, fontSize: 13, opacity: 0.7 }}>{c.text}</span>
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
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <Image
                  src="/images/logonavbar.webp"
                  alt="Mantra Medica"
                  width={60}
                  height={60}
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <p style={{ color: C.teal, fontWeight: 600, fontSize: 12, marginBottom: 10 }}>Quick Links</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {navLinks.map((item) => (
                  <p key={item.label} style={{ color: C.teal, fontSize: 12, opacity: 0.7 }}>
                    <Link href={item.href} style={{ color: "inherit", textDecoration: "none" }}>{item.label}</Link>
                  </p>
                ))}
              </div>
            </div>

            {/* Departments */}
            <div>
              <p style={{ color: C.teal, fontWeight: 600, fontSize: 12, marginBottom: 10 }}>Departments</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {["General Clinic", "Dental Clinic", "Pharmacy", "Radiology & Imaging", "Emergency", "Laboratory"].map((l) => (
                  <p key={l} style={{ color: C.teal, fontSize: 12, opacity: 0.7 }}>
                    <a href="#" style={{ color: "inherit", textDecoration: "none" }}>{l}</a>
                  </p>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <p style={{ color: C.teal, fontWeight: 600, fontSize: 12, marginBottom: 10 }}>Contact</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {[
                  { icon: "📍", text: "Lombok, NTB" },
                  { icon: "📞", text: "+62-888-888-8888" },
                  { icon: "✉️", text: "mantramedica@gmail.com" },
                ].map((c) => (
                  <div key={c.text} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 12 }}>{c.icon}</span>
                    <span style={{ color: C.teal, fontSize: 12, opacity: 0.7 }}>{c.text}</span>
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

      <style>{`
        @media (max-width: 860px) {
          .footer-desktop { display: none !important; }
          .footer-mobile { display: block !important; }
        }
      `}</style>
    </footer>
  );
}