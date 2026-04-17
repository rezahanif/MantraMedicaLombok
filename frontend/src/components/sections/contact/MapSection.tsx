// src/components/contact/MapSection.tsx
// Layout: [Map ~50%] [Card 1] [Card 2]  — all one row, same height
// Padding mirrors hero section: outer 0 40px, inner maxWidth 1400 centered

import { C } from "@/lib/constants";
import { serviceCards } from "@/data/contactData";

export default function MapSection() {
  return (
    <section
      style={{
        background: C.light,
        // Match hero outer padding
        padding: "0 40px 56px",
      }}
    >
      <style>{`
        .ms-row {
          display: flex;
          gap: 20px;
          align-items: stretch;
          max-width: 1400px;
          margin: 0 auto;
          /* Left padding nudges content to match hero h1 position */
          padding: 0 40px;
        }

        /* Location pill floats above the map */
        .ms-location-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: #fff;
          border: 1px solid ${C.border};
          border-radius: 100px;
          padding: 7px 16px;
          font-size: 13px;
          font-weight: 500;
          color: ${C.dark};
          margin-bottom: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
          width: fit-content;
        }

        /* Map column — wider */
        .ms-map-col {
          flex: 2;
          min-width: 0;
          display: flex;
          flex-direction: column;
        }

        .ms-map-frame {
          flex: 1;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid ${C.border};
          min-height: 260px;
          background: #E8EFF5;
        }

        /* Each service card — equal flex */
        .ms-card {
          flex: 1;
          min-width: 0;
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          min-height: 260px;
          border: 1px solid ${C.border};
          display: flex;
          flex-direction: column;
        }

        /* ── Mobile: stack everything ── */
        @media (max-width: 700px) {
          .ms-row {
            flex-direction: column;
            padding: 0;
            gap: 16px;
          }
          .ms-map-frame { min-height: 200px; }
          .ms-card { min-height: 200px; }
        }

        /* ── Tablet: map full width, cards side by side below ── */
        @media (min-width: 701px) and (max-width: 960px) {
          .ms-row { flex-wrap: wrap; }
          .ms-map-col { flex: 1 1 100%; }
          .ms-card { flex: 1 1 calc(50% - 10px); min-height: 220px; }
        }
      `}</style>

      <div className="ms-row">

        {/* ── Map column ── */}
        <div className="ms-map-col">
          {/* Location pill */}
          <div className="ms-location-pill">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.teal} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            Rinjani, Lombok Utara
          </div>

          {/* Map embed */}
          <div className="ms-map-frame">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.5!2d116.47!3d-8.32!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOCozMCcwMC4wIlMgMTE2uzI4JzEyLjAiRQ!5e0!3m2!1sen!2sid!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* ── Service cards — inline, one per card ── */}
        {serviceCards.map((svc: typeof serviceCards[number]) => (
          <div
            key={svc.title}
            className="ms-card"
            style={{ background: svc.bg }}
          >
            {/* Photo gradient overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.15) 40%, rgba(10,10,10,0.80) 100%)",
                zIndex: 1,
              }}
            />

            {/* Content */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "20px 20px 22px",
              }}
            >
              {/* Top: icon + title */}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 10,
                  }}
                >
                  {/* Service icon */}
                  {svc.icon && (
                    <img
                      src={svc.icon}
                      alt=""
                      style={{ width: 24, height: 24, objectFit: "contain", opacity: 0.9 }}
                    />
                  )}
                  <h4
                    style={{
                      color: "#FAFAFA",
                      fontSize: 18,
                      fontWeight: 800,
                      margin: 0,
                      lineHeight: 1.2,
                      textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                    }}
                  >
                    {svc.title}
                  </h4>
                </div>

                {/* Tag pill */}
                <div
                  style={{
                    display: "inline-flex",
                    background: "rgba(101,163,150,0.75)",
                    backdropFilter: "blur(6px)",
                    borderRadius: 100,
                    padding: "4px 12px",
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#fff",
                    letterSpacing: "0.02em",
                  }}
                >
                  {svc.tag}
                </div>
              </div>

              {/* Middle: hours + note */}
              <div>
                <p
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    color: "#FAFAFA",
                    fontSize: 20,
                    fontWeight: 700,
                    margin: "0 0 6px",
                    lineHeight: 1.3,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.8 }}>
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  {svc.hours}
                </p>
                <p
                  style={{
                    color: "rgba(250,250,250,0.65)",
                    fontSize: 12,
                    lineHeight: 1.55,
                    margin: 0,
                  }}
                >
                  {svc.note}
                </p>
              </div>

              {/* Bottom: CTA */}
              <div>
                <button
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: svc.ctaColor,
                    color: svc.ctaColor === "#FAFAFA" || svc.ctaColor === "#fff" ? "#212121" : "#FAFAFA",
                    border: "none",
                    borderRadius: 100,
                    padding: "10px 22px",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: `0 4px 14px rgba(0,0,0,0.25)`,
                    letterSpacing: "0.01em",
                  }}
                >
                  {svc.ctaIcon && (
                    <img src={svc.ctaIcon} alt="" style={{ width: 18, height: 18, objectFit: "contain" }} />
                  )}
                  {svc.cta}
                </button>
              </div>
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}