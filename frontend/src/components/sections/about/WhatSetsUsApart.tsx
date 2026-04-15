import { C } from "@/lib/constants";

const cards = [
  {
    id: 1,
    title: "Urban Medical Standards\nin a Remote Setting",
    desc: "We bring city-standard healthcare to the mountain — ultra-modern equipment, licensed practitioners, right where you need it most.",
    image: "/images/altitude-sickness.webp",
    pills: ["Advance Tech", "Licensed MDs", "Protocol Adherence"],
  },
  {
    id: 2,
    title: "The Recovery Framework",
    desc: "We believe that an actual therapist and valley-view massage pavilion at Mount Rinjani is not a luxury — it's what proper recovery demands.",
    image: "/images/spahome.webp",
    pills: ["Physio Alignment", "Valleyside Setting", "Muscle Recovery"],
  },
  {
    id: 3,
    title: "Dedicated to Community\n& Travelers",
    desc: "We are proud to serve both international trekkers and the local Senaru community with the same standard of excellence.",
    image: "/images/community.webp",
    pills: ["Global Standards", "24/7 Support", "Trusted Partner"],
  },
];

export default function WhatSetsUsApart() {
  return (
    <section style={{ backgroundColor: C.light, paddingTop: 80, paddingBottom: 80, overflow: "hidden" }}>
      {/* Heading */}
      <div style={{ textAlign: "center", marginBottom: 56 }}>
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
            key={card.id}
            style={{
              position: "relative",
              borderRadius: 32,
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
                backgroundSize: "cover",
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
              <h3
                style={{
                  color: "#ffffff",
                  fontSize: 22,
                  fontWeight: 800,
                  lineHeight: 1.3,
                  margin: 0,
                  whiteSpace: "pre-line",
                  textShadow: "0 2px 8px rgba(0,0,0,0.4)",
                }}
              >
                {card.title}
              </h3>

              {/* Bottom: pills + desc */}
              <div>
                {/* Floating pills */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                  {card.pills.map((pill) => (
                    <span
                      key={pill}
                      style={{
                        background: "rgba(255,255,255,0.15)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(255,255,255,0.25)",
                        borderRadius: 100,
                        padding: "5px 14px",
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#ffffff",
                        letterSpacing: "0.03em",
                      }}
                    >
                      {pill}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p
                  style={{
                    color: "rgba(255,255,255,0.72)",
                    fontSize: 13,
                    lineHeight: 1.65,
                    margin: 0,
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