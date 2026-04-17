"use client";

import Link from "next/link";
import { Stethoscope, Building2 } from "lucide-react";
import { C } from "@/lib/constants";

export default function Vision() {
  return (
    <section
      style={{
        position: "relative",
        backgroundColor: C.teal,
        padding: "96px 0",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .vision-heading { animation: fadeUp 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both; }
        .vision-text { animation: fadeUp 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both; animation-delay: 0.15s; }
        .vision-quote { animation: fadeUp 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both; animation-delay: 0.3s; }
        .vision-buttons { animation: fadeIn 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both; animation-delay: 0.45s; }
      `}</style>
      {/* Floating mountain silhouette decorations */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 80,
          opacity: 0.08,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 80'%3E%3Cpolygon points='0,80 200,20 400,60 600,10 800,50 1000,15 1200,45 1200,80' fill='white'/%3E%3C/svg%3E\")",
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
        aria-hidden
      />

      {/* Large quote mark left */}
      <div
        style={{
          position: "absolute",
          left: 24,
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: 200,
          fontFamily: "Georgia, serif",
          color: "rgba(255,255,255,0.06)",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
        }}
        aria-hidden
      >
        "
      </div>
      <div
        style={{
          position: "absolute",
          right: 24,
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: 200,
          fontFamily: "Georgia, serif",
          color: "rgba(255,255,255,0.06)",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
        }}
        aria-hidden
      >
        "
      </div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 960,
          margin: "0 auto",
          padding: "0 32px",
          textAlign: "center",
        }}
      >
        <h2
          className="vision-heading"
          style={{
            color: C.light,
            fontSize: "clamp(40px, 5vw, 64px)",
            fontWeight: 800,
            letterSpacing: "0.06em",
            marginBottom: 32,
            textShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          Our Vision
        </h2>

        <p
          className="vision-text"
          style={{
            color: "rgba(255,255,255,0.82)",
            fontSize: "clamp(15px, 1.6vw, 20px)",
            lineHeight: 1.7,
            marginBottom: 56,
            fontWeight: 500,
          }}
        >
          We aspire to transform Senaru into a premier Wellness Tourism
          destination in Indonesia. By integrating emergency medical care,
          laboratory diagnostics, and therapeutic recovery, we want every
          visitor to leave Senaru feeling healthier and more revitalized than
          when they arrived.
        </p>

        {/* Mission quote block */}
        <div
          className="vision-quote"
          style={{
            position: "relative",
            marginBottom: 52,
          }}
        >
          <p
            style={{
              fontSize: "clamp(20px, 2.5vw, 36px)",
              fontWeight: 800,
              color: C.light,
              lineHeight: 1.4,
              textShadow: "0 2px 8px rgba(0,0,0,0.15)",
              margin: 0,
            }}
          >
            "Your safety is our mission.{" "}
            <span style={{ color: "rgba(255,255,255,0.75)" }}>
              Your recovery is our passion
            </span>
            "
          </p>
        </div>

        {/* Sub-text */}
        <p
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: "clamp(14px, 1.4vw, 18px)",
            fontWeight: 600,
            marginBottom: 32,
          }}
        >
          Want to learn more or plan your visit?
        </p>

        {/* CTA Buttons */}
        <div
          className="vision-buttons"
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/services"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 28px",
              borderRadius: 100,
              backgroundColor: C.dark,
              color: C.light,
              fontWeight: 700,
              fontSize: 15,
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
            }}
          >
            <Building2 size={17} aria-hidden />
            Explore Our Facilities
          </Link>

          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 28px",
              borderRadius: 100,
              backgroundColor: "transparent",
              color: C.light,
              fontWeight: 700,
              fontSize: 15,
              textDecoration: "none",
              border: "1.5px solid rgba(255,255,255,0.6)",
              backdropFilter: "blur(6px)",
              transition: "transform 0.2s, background 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1.03)";
              (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
            }}
          >
            <Stethoscope size={17} aria-hidden />
            Contact Our Medical Team
          </Link>
        </div>
      </div>
    </section>
  );
}