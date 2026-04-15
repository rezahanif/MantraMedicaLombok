import Image from "next/image";
import { teamMembers } from "@/data/team";
import { C } from "@/lib/constants";

export default function MeetTeam() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#3a2a1e",
      }}
    >
      {/* Wood panel texture background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/images/woodpanel.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.55,
        }}
        aria-hidden
      />

      {/* Dark overlay for legibility */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(30,18,10,0.82) 0%, rgba(30,18,10,0.55) 100%)",
        }}
        aria-hidden
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 1200,
          margin: "0 auto",
          padding: "88px 32px 88px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "center",
        }}
        className="meet-grid"
      >
        {/* Left — text */}
        <div>
          <h2
            style={{
              color: C.light,
              fontSize: "clamp(28px, 3vw, 44px)",
              fontWeight: 800,
              letterSpacing: "0.06em",
              marginBottom: 28,
              textShadow: "0 2px 8px rgba(0,0,0,0.4)",
            }}
          >
            Meet Our Medical Team
          </h2>

          <p
            style={{
              color: `${C.light}cc`,
              fontSize: 17,
              lineHeight: 1.7,
              marginBottom: 20,
              fontWeight: 600,
            }}
          >
            Your trust is our greatest priority. Mantra Medica is managed by
            medical professionals who understand the unique physical challenges
            of mountain terrain.
          </p>

          {/* Accent line */}
          <div
            style={{
              width: 64,
              height: 2,
              backgroundColor: C.teal,
              marginBottom: 20,
              borderRadius: 2,
            }}
            aria-hidden
          />

          <p
            style={{
              color: `${C.light}88`,
              fontSize: 17,
              lineHeight: 1.7,
              fontWeight: 600,
            }}
          >
            Supported by a team of professional nurses and therapists, we
            ensure every patient receives care that is personal, compassionate,
            and effective.
          </p>
        </div>

        {/* Right — staggered doctor photos */}
        <div
          style={{
            display: "flex",
            gap: 20,
            justifyContent: "center",
            alignItems: "flex-end",
            position: "relative",
          }}
        >
          {/* Decorative background ellipse */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 320,
              height: 380,
              borderRadius: "50%",
              background: `rgba(101,163,150,0.18)`,
              filter: "blur(32px)",
              pointerEvents: "none",
            }}
            aria-hidden
          />

          {teamMembers.map((member, idx) => (
            <div
              key={member.id}
              style={{
                flex: 1,
                maxWidth: 200,
                // Stagger: first card sits higher
                marginBottom: idx === 0 ? 0 : 32,
                marginTop: idx === 0 ? 32 : 0,
                position: "relative",
              }}
            >
              {/* Small decorative dot */}
              {idx === 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: -12,
                    right: -8,
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: C.teal,
                    opacity: 0.7,
                  }}
                  aria-hidden
                />
              )}

              {/* Photo */}
              <div
                style={{
                  borderRadius: 20,
                  overflow: "hidden",
                  aspectRatio: "3/4",
                  position: "relative",
                  border: `1px solid ${C.border}`,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                }}
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  style={{ objectFit: "cover", objectPosition: "top" }}
                  className="transition-transform duration-500 hover:scale-105"
                />
                {/* Bottom gradient fade */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "35%",
                    background: `linear-gradient(to top, rgba(30,18,10,0.85), transparent)`,
                  }}
                  aria-hidden
                />
              </div>

              {/* Name badge */}
              <div
                style={{
                  marginTop: 10,
                  padding: "8px 12px",
                  borderRadius: 12,
                  textAlign: "center",
                  background: "rgba(255,255,255,0.07)",
                  border: `1px solid ${C.border}`,
                  backdropFilter: "blur(10px)",
                }}
              >
                <p
                  style={{
                    color: C.light,
                    fontSize: 12,
                    fontWeight: 700,
                    lineHeight: 1.3,
                    margin: 0,
                  }}
                >
                  {member.name}
                </p>
                <p
                  style={{
                    color: C.tealLight ?? C.teal,
                    fontSize: 11,
                    marginTop: 2,
                    margin: "2px 0 0",
                  }}
                >
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .meet-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}