"use client"; 

import Image from "next/image";
import { C } from "@/lib/constants";

const cards = [
  {
    id: 1,
    title: "Urban Medical Standards\nin a Remote Setting",
    titlemargin: -5,
    desc: "We bring city-standard healthcare to the mountain — ultra-modern equipment, licensed practitioners, right where you need it most.",
    image: "/images/aboutkiri.webp",
    icon: "/icons/Lochealthicon.webp",
    iconMarginTop: 0,
    iconWidth: 40,
    iconHeight: 40,
    iconMarginLeft: 290,
    iconLeft: "1px",
    pills: [
      { text: "Advance Tech", icon: "/icons/advanceicon.webp", iconWidth: 16, iconHeight: 16, marginTop: 0, marginLeft: 0 },
      { text: "Licensed MDs", icon: "/icons/licenseicon.webp", iconWidth: 16, iconHeight: 16, marginTop: 0, marginLeft: 0 },
      { text: "Protocol Adherence", icon: "/icons/listicon.webp", iconWidth: 16, iconHeight: 16, marginTop: 0, marginLeft: 0 },
    ],
  },
  {
    id: 2,
    title: "The Recovery Framework",
    titlemargin: 13,
    desc: "We believe that an actual therapist and valley-view massage pavilion at Mount Rinjani is not a luxury — it's what proper recovery demands.",
    image: "/images/abouttengah.webp",
    icon: "/icons/spa.webp",
    iconMarginTop: -2,
    iconWidth: 42,
    iconHeight: 42,
    iconMarginLeft: 290,
    iconLeft: "1px",
    pills: [
      { text: "Physio Alignment", icon: "/icons/physioicon.webp", iconWidth: 16, iconHeight: 16, marginTop: 0, marginLeft: 0 },
      { text: "Valleyside Setting", icon: "/icons/gunungputihicon.webp", iconWidth: 16, iconHeight: 16, marginTop: 0, marginLeft: 0 },
      { text: "Muscle Recovery", icon: "/icons/muscleicon.webp", iconWidth: 16, iconHeight: 16, marginTop: 0, marginLeft: 0 },
    ],
  },
  {
    id: 3,
    title: "Dedicated to Community\n& Travelers",
    titlemargin: -5,
    desc: "We are proud to serve both international trekkers and the local Senaru community with the same standard of excellence.",
    image: "/images/aboutkanan.webp",
    icon: "/icons/mountainproicon.webp",
    iconWidth: 60,
    iconHeight: 60,
    iconMarginTop: -15,
    iconMarginLeft: 290,
    iconLeft: "-5px",
    pills: [
      { text: "Global Standards", icon: "/icons/globalicon.webp", iconWidth: 16, iconHeight: 16, marginTop: 0, marginLeft: 0 },
      { text: "24/7 Support", icon: "/icons/timefullicon.webp", iconWidth: 16, iconHeight: 16, marginTop: 0, marginLeft: 0 },
      { text: "Trusted Partner", icon: "/icons/trusticon.webp", iconWidth: 16, iconHeight: 16, marginTop: 0, marginLeft: 0 },
    ],
  },
];

export default function WhatSetsUsApart() {
  return (
    <section className="what-sets-apart-section" style={{ backgroundColor: C.light, overflow: "hidden" }}>
      <style>{`
        .what-sets-apart-section {
          padding-top: 120px;
          padding-bottom: 80px;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .what-heading { animation: fadeUp 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both; }
        .what-card { animation: slideUp 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both; }
        .what-card:nth-child(1) { animation-delay: 0.1s; }
        .what-card:nth-child(2) { animation-delay: 0.2s; }
        .what-card:nth-child(3) { animation-delay: 0.3s; }
        @media (max-width: 499px) {
          .what-sets-apart-section {
            padding-top: 80px;
            padding-bottom: 80px;
          }
        }
      `}</style>
      {/* Heading */}
      <div className="what-heading" style={{ textAlign: "center", marginBottom: 56 }}>
        <h2
          style={{
            fontSize: "clamp(32px, 4vw, 56px)",
            fontWeight: 800,
            color: C.dark,
            letterSpacing: "0.12em",
            margin: 0,
          }}
        >
          What Set Us Apart
        </h2>
      </div>

      {/* Cards row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 32px",
        }}
        className="what-cards"
      >
        {cards.map((card) => (
          <div
            className="what-card"
            key={card.id}
            style={{
              position: "relative",
              borderRadius: 48,
              overflow: "hidden",
              minHeight: 440,
              boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
            }}
          >
            {/* Full-bleed photo */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url('${card.image}')`,
                backgroundSize: "130%",
                backgroundPosition: "center",
              }}
            />

            {/* Dark overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(20,14,10,0.42)",
              }}
            />

            {/* Content */}
            <div
              style={{
                position: "relative",
                zIndex: 2,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "28px 24px 28px",
              }}
            >
              {/* Title at top */}
              <div style={{ position: "relative"}}>
                <Image
                  src={card.icon}
                  alt={card.title}
                  width={card.iconWidth}
                  height={card.iconHeight}
                  style={{ 
                    position: "absolute", 
                    objectFit: "contain", 
                    top: card.iconMarginTop, 
                    left: card.iconLeft
                  }}
                />
                <h3
                  style={{
                    color: "#ffffff",
                    fontSize: 19,
                    fontWeight: 700,
                    lineHeight: 1.3,
                    marginTop: card.titlemargin,
                    marginLeft: 55,
                    whiteSpace: "pre-line",
                    textShadow: "0 2px 8px rgba(0,0,0,0.4)",
                  }}
                >
                  {card.title}
                </h3>
              </div>

              {/* Bottom: pills + desc */}
              <div>
                {/* Floating pills */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
                  {card.pills.map((pill, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        background: "rgba(255,255,255,0.15)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(255,255,255,0.25)",
                        borderRadius: 100,         
                        padding: "6px 12px",
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#ffffff",
                        letterSpacing: "0.03em",
                        marginTop: pill.marginTop,
                        marginLeft: pill.marginLeft,
                      }}
                    >
                      <Image
                        src={pill.icon}
                        alt={pill.text}
                        width={pill.iconWidth}
                        height={pill.iconHeight}
                        style={{ objectFit: "contain", flexShrink: 0 }}
                      />
                      <span>{pill.text}</span>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <p
                  style={{
                    color: "rgba(255,255,255,0.72)",
                    fontSize: 13,
                    lineHeight: 1.65,
                    marginLeft: 5,
                    marginBottom: 55,
                  }}
                >
                  {card.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 860px) {
          .what-cards { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}