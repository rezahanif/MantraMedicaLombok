"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { C } from "@/lib/constants";
import { navLinks } from "@/data/shared";

export default function Navbar({ activePage }: { activePage?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  const currentPage = activePage ?? navLinks.find((link) => link.href === pathname)?.label;


  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY < lastScrollY || window.scrollY < 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "20px",
        pointerEvents: "none",
        transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: isVisible ? "translateY(0)" : "translateY(-100%)",
      }}
    >
      <nav
        style={{
          background: "rgba(250,250,250,0.95)",
          backdropFilter: "blur(8px)",
          borderRadius: 100,
          padding: "6px 6px 6px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: 1100,
          margin: "0 auto",
          boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
          pointerEvents: "auto",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0, textDecoration: "none", marginTop: -6, marginLeft: -8 }}>
          <Image
            src="/images/logonavbar.webp"
            alt="Mantra Medica"
            width={192}
            height={38}
            priority
            style={{ objectFit: "contain" }}
          />
        </Link>

        {/* Desktop Links */}
        <div
          className="nav-links"
          style={{ display: "flex", alignItems: "center", gap: 20, marginLeft: 24 }}
        >
          {navLinks.map((item) => {
            const isActive = currentPage ? currentPage === item.label : pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                style={{
                  color: isActive ? C.teal : C.dark,
                  fontWeight: isActive ? 700 : 400,
                  fontSize: 14,
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Right Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Hamburger (mobile only) */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "transparent",
              border: "none",
              borderRadius: 8,
              width: 36,
              height: 36,
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <span style={{ display: "block", width: "60%", height: 2, background: C.teal, borderRadius: 2 }} />
            <span style={{ display: "block", width: "60%", height: 2, background: C.teal, borderRadius: 2 }} />
          </button>

          <Link
            href="/contact"
            className="emergency-btn"
            style={{
              background: "#E05A4E",
              color: "white",
              borderRadius: 100,
              padding: "8px 16px",
              fontSize: 12,
              fontWeight: 600,
              textDecoration: "none",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Image
              src="/icons/whatsappwhite.webp"
              alt="Emergency"
              width={16}
              height={16}
              style={{ objectFit: "contain" }}
            />
            <span>Emergency Call</span>
          </Link>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div
          style={{
            background: "white",
            borderRadius: 20,
            marginTop: 10,
            padding: "12px 8px",
            pointerEvents: "auto",
            maxWidth: 1100,
            margin: "10px auto",
            boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
          }}
        >
          {navLinks.map((item) => {
            const isActive = currentPage ? currentPage === item.label : pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "10px 20px",
                  borderRadius: 12,
                  color: isActive ? C.teal : C.dark,
                  fontWeight: isActive ? 700 : 400,
                  fontSize: 14,
                  textDecoration: "none",
                  background: isActive ? `${C.teal}11` : "transparent",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .nav-links { display: none !important; }
          .hamburger { display: flex !important; }
          .emergency-btn { padding: 6px 12px !important; font-size: 11px !important; }
          .emergency-btn span { display: none; }
        }
      `}</style>
    </div>
  );
}