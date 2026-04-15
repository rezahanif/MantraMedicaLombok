import Image from "next/image";
import { C } from "@/lib/constants";

export default function Story() {
  return (
    <>
      {/* ─── Story Row ─── */}
      <section
        style={{
          backgroundColor: C.light,
          padding: "80px 0",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 32px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "center",
          }}
          className="story-grid"
        >
          {/* Left — Doctor portrait in circle */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            {/* Decorative large circle bg */}
            <div
              style={{
                position: "relative",
                width: 320,
                height: 320,
                borderRadius: "50%",
                backgroundColor: `${C.teal}28`,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              {/* Decorative ring */}
              <div
                style={{
                  position: "absolute",
                  top: -16,
                  left: -16,
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  border: `2px solid ${C.teal}`,
                  opacity: 0.3,
                }}
                aria-hidden
              />
              {/* Decorative dot */}
              <div
                style={{
                  position: "absolute",
                  top: 32,
                  right: -20,
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  backgroundColor: C.teal,
                  opacity: 0.6,
                }}
                aria-hidden
              />

              <Image
                src="/assets/images/team/dr-nyoman.jpg"
                alt="dr. Nyoman Ardyatri Kairavini"
                width={290}
                height={340}
                style={{
                  objectFit: "cover",
                  objectPosition: "top",
                  maxHeight: "90%",
                  borderRadius: "0 0 50% 50%",
                }}
              />
            </div>

            {/* Name pill */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: C.dark,
                color: C.tealLight ?? C.teal,
                border: `1px solid ${C.border}`,
                borderRadius: 100,
                padding: "6px 20px",
                fontSize: 12,
                fontWeight: 600,
                whiteSpace: "nowrap",
                boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
              }}
            >
              dr. Nyoman Ardyatri Kairavini
            </div>
          </div>

          {/* Right — Story text */}
          <div>
            <p
              style={{
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                fontWeight: 700,
                color: C.teal,
                marginBottom: 12,
              }}
            >
              Our Story
            </p>
            <h2
              style={{
                fontSize: "clamp(32px, 4vw, 56px)",
                fontWeight: 800,
                color: C.dark,
                marginBottom: 28,
                lineHeight: 1.1,
              }}
            >
              Our Story
            </h2>
            <p
              style={{
                fontSize: "clamp(15px, 1.5vw, 18px)",
                lineHeight: 1.75,
                color: `${C.dark}cc`,
              }}
            >
              Mantra Medica was founded on the realization that the journey to
              Rinjani's summit—or even the trek to Senaru's waterfalls—demands
              peak physical resilience. We identified a vital need for a medical
              service that is not only responsive in emergencies but also provides
              a premium recovery experience for travelers.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Name Meaning Quote — Teal background ─── */}
      <section
        style={{
          backgroundColor: C.teal,
          padding: "72px 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background texture circles */}
        <div
          style={{
            position: "absolute",
            left: -96,
            top: "50%",
            transform: "translateY(-50%)",
            width: 256,
            height: 256,
            borderRadius: "50%",
            backgroundColor: C.light,
            opacity: 0.1,
          }}
          aria-hidden
        />
        <div
          style={{
            position: "absolute",
            right: -64,
            bottom: -64,
            width: 192,
            height: 192,
            borderRadius: "50%",
            backgroundColor: C.dark,
            opacity: 0.1,
          }}
          aria-hidden
        />

        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 32px",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 40,
            alignItems: "center",
          }}
          className="quote-grid"
        >
          {/* Quote */}
          <div style={{ position: "relative" }}>
            {/* Opening quote mark */}
            <span
              style={{
                position: "absolute",
                top: -24,
                left: -8,
                fontSize: 80,
                fontFamily: "Georgia, serif",
                lineHeight: 1,
                color: C.light,
                opacity: 0.2,
                userSelect: "none",
                pointerEvents: "none",
              }}
              aria-hidden
            >
              "
            </span>

            <p
              style={{
                fontSize: "clamp(15px, 1.5vw, 18px)",
                lineHeight: 1.75,
                color: C.light,
                position: "relative",
                zIndex: 1,
              }}
            >
              The name{" "}
              <strong style={{ fontWeight: 800 }}>"Mantra"</strong> reflects our
              intention of peace and mindfulness in healing, while{" "}
              <strong style={{ fontWeight: 800 }}>"Medica"</strong> affirms our
              commitment to evidence-based medical science. We are proud to
              continue a legacy of dedicated care in this region, enhanced by
              modern facilities and a design that honors the natural beauty of
              North Lombok.
            </p>

            {/* Closing quote mark */}
            <span
              style={{
                display: "block",
                textAlign: "right",
                fontSize: 80,
                fontFamily: "Georgia, serif",
                lineHeight: 1,
                color: C.light,
                opacity: 0.2,
                marginTop: -16,
                userSelect: "none",
                pointerEvents: "none",
              }}
              aria-hidden
            >
              "
            </span>
          </div>

          {/* Logo mark */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              minWidth: 120,
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 14,
                backgroundColor: `${C.light}22`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg viewBox="0 0 40 40" style={{ width: 40, height: 40 }} fill="none">
                <path
                  d="M20 4 L36 13 L36 31 L20 40 L4 31 L4 13 Z"
                  fill={C.light}
                  opacity="0.2"
                />
                <path
                  d="M14 20 L20 8 L26 20 M14 28 L20 16 L26 28"
                  stroke={C.light}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontWeight: 700, fontSize: 13, color: C.light, margin: 0 }}>
                mantra medica
              </p>
              <p style={{ fontSize: 11, color: C.light, opacity: 0.6, margin: 0 }}>
                your health journey
              </p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .story-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .quote-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}