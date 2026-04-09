import Link from "next/link";
import { C } from "@/lib/constants";
import { navLinks } from "@/data/shared";

export default function Footer() {
  return (
    <footer style={{ background: C.dark, padding: "48px 32px 24px" }}>
      <div className="max-w-5xl mx-auto">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr 1fr 1.4fr",
            gap: 40,
            marginBottom: 40,
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div
                style={{
                  background: C.teal,
                  width: 32,
                  height: 32,
                  borderRadius: 6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: C.light,
                  fontWeight: 700,
                  fontSize: 12,
                }}
              >
                MM
              </div>
              <span style={{ color: C.light, fontWeight: 600, fontSize: 14 }}>mantra medica</span>
            </div>
            <p style={{ color: "rgba(250,250,250,0.4)", fontSize: 12, lineHeight: 1.7 }}>
              your health journey
            </p>
          </div>

          <div>
            <p style={{ color: C.tealLight, fontWeight: 600, fontSize: 13, marginBottom: 14 }}>Quick Link</p>
            {navLinks.map((item) => (
              <p key={item.label} style={{ color: "rgba(250,250,250,0.5)", fontSize: 13, marginBottom: 8 }}>
                <Link href={item.href} style={{ color: "inherit", textDecoration: "none" }}>{item.label}</Link>
              </p>
            ))}
          </div>

          <div>
            <p style={{ color: C.tealLight, fontWeight: 600, fontSize: 13, marginBottom: 14 }}>Departments</p>
            {["General Clinic", "Dental Clinic", "Pharmacy", "Radiology & Imaging", "Emergency", "Laboratory"].map((l) => (
              <p key={l} style={{ color: "rgba(250,250,250,0.5)", fontSize: 13, marginBottom: 8 }}>
                <a href="#" style={{ color: "inherit", textDecoration: "none" }}>{l}</a>
              </p>
            ))}
          </div>

          <div>
            <p style={{ color: C.tealLight, fontWeight: 600, fontSize: 13, marginBottom: 14 }}>
              Contact & Newsletter
            </p>
            {[
              { icon: "📍", text: "Lombok, NTB" },
              { icon: "📞", text: "+62-888-888-8888" },
              { icon: "✉️", text: "mantramedica@gmail.com" },
            ].map((c) => (
              <div key={c.text} style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "flex-start" }}>
                <span style={{ fontSize: 13 }}>{c.icon}</span>
                <span style={{ color: "rgba(250,250,250,0.5)", fontSize: 13 }}>{c.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ color: "rgba(250,250,250,0.3)", fontSize: 12 }}>
            © 2026 Mantra Medicare. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy Policy", "Terms of Service"].map((l) => (
              <a
                key={l}
                href="#"
                style={{ color: "rgba(250,250,250,0.3)", fontSize: 12, textDecoration: "none" }}
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