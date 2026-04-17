import Image from "next/image";
import { C } from "@/lib/constants";

// ── BlubDoctor background positioning
const BLUB_DOCTOR_DESKTOP_POS_X = 0;          // Horizontal offset in px: positive = right, negative = left
const BLUB_DOCTOR_DESKTOP_POS_Y = 0;          // Vertical offset in px: positive = down, negative = up
const BLUB_DOCTOR_DESKTOP_ZOOM = 1;           // Zoom scale: 1 = 100%, 1.2 = 120%, etc.

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
        className="story-section"
      >
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to   { opacity: 1; }
          }
          @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-32px); }
            to   { opacity: 1; transform: translateX(0); }
          }
          .story-photo { animation: fadeIn 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both; }
          .story-text { animation: slideInLeft 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both; animation-delay: 0.15s; }
          .story-quote { animation: fadeIn 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both; animation-delay: 0.3s; }
          .story-logo { animation: fadeIn 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both; animation-delay: 0.4s; }
        `}</style>
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
          {/* Left — Doctor portrait */}
          <div className="story-photo" style={{ position: "relative", display: "flex", justifyContent: "center", left: "clamp(40px, 6vw, 120px)", width: "clamp(270px, 27vw, 459px)", height: "clamp(351px, 36.45vw, 581px)" }}>
            {/* BlubDoctor background layer */}
            <div style={{ position: "absolute", inset: 0, backgroundImage: `url('/images/blubdoctor.webp')`, backgroundPosition: `calc(50% + ${BLUB_DOCTOR_DESKTOP_POS_X}px) calc(50% + ${BLUB_DOCTOR_DESKTOP_POS_Y}px)`, backgroundSize: `${BLUB_DOCTOR_DESKTOP_ZOOM * 100}%`, backgroundRepeat: "no-repeat", zIndex: 0 }} />
            
            {/* Doctor photo layer */}
            <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
              <Image
                src="/images/DrIra.webp"
                alt="dr. Nyoman Ardyatri Kairavini"
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
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
                backgroundColor: C.teal,
                color: "rgba(250,250,250,0.85)",
                border: `1px solid ${C.tealLight}40`,
                backdropFilter: "blur(10px)",
                borderRadius: 100,
                padding: "6px 20px",
                fontSize: 12,
                fontWeight: 600,
                whiteSpace: "nowrap",
                boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                zIndex: 2,
              }}
            >
              dr. Nyoman Ardyatri Kairavini
            </div>
          </div>

          {/* Right — Story text */}
          <div className="story-text">
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
          <div className="story-quote" style={{ position: "relative" }}>
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
          <div className="story-logo"
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
                position: "relative",
                bottom: 25,
                left: 0,
                width: 160,
                height: 120,
                borderRadius: 14,
                backgroundColor: C.light,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src="/images/logovertical.webp"
                alt="Mantra Medica Logo"
                width={180}
                height={240}
                style={{ objectFit: "contain", position: "relative", left: 3}}
              />
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @media (max-width: 499px) {
          .story-section { margin-top: 0 !important; }
          .story-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .story-grid > div:first-child { 
            left: 0 !important; 
            width: 100% !important; 
            height: auto !important;
            aspect-ratio: 16 / 20;
          }
          .story-grid > div:first-child img {
            object-position: top !important;
          }
          .story-grid > div:last-child {
            margin-top: 24px !important;
          }
          .quote-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}