"use client";

// src/components/home/ServiceCards.tsx
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { C } from "@/lib/constants";
import { services } from "@/data/homeData";

// Per-service accent color
const getServiceStyle = (serviceId: number) => {
  if (serviceId === 1) return { icon: "/icons/stethoscopewhite.webp", color: "#65A396", rgb: "101,163,150" };
  if (serviceId === 2) return { icon: "/icons/bodymassage.webp",       color: "#604C3A", rgb: "96,76,58"   };
  if (serviceId === 3) return { icon: "/icons/ambulancewhite.webp",    color: "#D95E57", rgb: "217,94,87"  };
  return { icon: "/icons/stethoscopewhite.webp", color: "#65A396", rgb: "101,163,150" };
};

// Light base for expanded card — warm-neutral per service
const getExpandBase = (serviceId: number) => {
  if (serviceId === 1) return "#F4FAF9";
  if (serviceId === 2) return "#F5F0EB";
  if (serviceId === 3) return "#FDF5F5";
  return "#FAFAFA";
};

const getCardImage = (serviceId: number) => {
  if (serviceId === 1) return "/images/medcuphome.webp";
  if (serviceId === 2) return "/images/spahome.webp";
  if (serviceId === 3) return "/images/emergenhome.webp";
  return "/images/medcuphome.webp";
};

// Render "Bold Title — description" bullets
function BulletItem({ text, color }: { text: string; color: string }) {
  const sep = text.indexOf(" — ");
  if (sep === -1) {
    return (
      <li style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "flex-start" }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: color, flexShrink: 0, marginTop: 6 }} />
        <span style={{ color: "#111", fontSize: 13, lineHeight: 1.65 }}>{text}</span>
      </li>
    );
  }
  const title = text.slice(0, sep);
  const body  = text.slice(sep + 3);
  return (
    <li style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "flex-start" }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: color, flexShrink: 0, marginTop: 6 }} />
      <span style={{ fontSize: 13, lineHeight: 1.65 }}>
        <strong style={{ color: "#111", fontWeight: 600 }}>{title}</strong>
        <span style={{ color: "#444" }}> — {body}</span>
      </span>
    </li>
  );
}

export default function ServiceCards() {
  const [active, setActive]   = useState(0);
  const [inView, setInView]   = useState(false);
  const sectionRef            = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={{ background: C.light }} className="px-6 md:px-12 py-24">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes cardSlideUp {
          from { opacity: 0; transform: translateY(48px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        /* Smooth content reveal — replaces jarring fadeIn */
        @keyframes contentReveal {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        /* Hint ring pulse */
        @keyframes pulseRing {
          0%   { transform: translate(calc(-50% ), calc(-50% - 2px)) scale(1);   opacity: 0.7; }
          70%  { transform: translate(calc(-50% ), calc(-50% - 2px)) scale(1.9); opacity: 0;   }
          100% { transform: translate(calc(-50% ), calc(-50% - 2px)) scale(1);   opacity: 0;   }
        }
        .hint-pulse {
          position: absolute;
          width: 32px; height: 32px;
          border-radius: 50%;
          top: 50%; left: 50%;
          transform: translate(calc(-50% - 2px), calc(-50% - 2px));
          animation: pulseRing 2.2s ease-out infinite;
          pointer-events: none;
        }
        .svc-scroll::-webkit-scrollbar { display: none; }
        @media (max-width: 860px) {
          .service-desktop { display: none !important; }
          .service-mobile  { display: flex !important; }
        }
      `}</style>

      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div
          className="text-center mb-16"
          style={{
            animation: inView ? "fadeUp 0.6s cubic-bezier(0.22,0.61,0.36,1) both" : "none",
            opacity: inView ? undefined : 0,
          }}
        >
          <h2 style={{ color: C.dark, fontSize: 32, fontWeight: 700, marginBottom: 8 }}>
            Our Service
          </h2>
          <p style={{ color: "rgba(33,33,33,0.5)", fontSize: 15 }}>
            Specialized care for trekkers, complete services for everyone
          </p>
        </div>

        {/* ── DESKTOP: horizontal expand / shrink ── */}
        <div
          className="service-desktop"
          style={{ display: "flex", gap: 16, height: 420, marginBottom: 32, marginLeft: 30, marginRight: 30 }}
        >
          {services.map((svc, i) => {
            const isActive = active === i;
            const style    = getServiceStyle(svc.id);
            const baseColor = getExpandBase(svc.id);

            return (
              <div
                key={svc.id}
                onClick={() => setActive(i)}
                style={{
                  flex: isActive ? 3 : 1,
                  transition: "flex 0.6s cubic-bezier(0.4,0,0.2,1), background 0.4s, box-shadow 0.4s",
                  borderRadius: 24,
                  overflow: "hidden",
                  position: "relative",
                  cursor: isActive ? "default" : "pointer",
                  // Collapsed → photo; Expanded → tinted base + glass inset shadow
                  background: isActive
                    ? baseColor
                    : `url('${getCardImage(svc.id)}') center/cover`,
                  backgroundImage: isActive ? undefined : `url('${getCardImage(svc.id)}')`,
                  backgroundSize: isActive ? undefined : "cover",
                  backgroundPosition: isActive ? undefined : "center",
                  // Glass inner shadow when expanded
                  boxShadow: isActive
                    ? `inset 0 0 90px rgba(${style.rgb}, 0.18), inset 0 0 30px rgba(${style.rgb}, 0.10), inset 0 2px 0 rgba(255,255,255,0.7)`
                    : "none",
                  animation: inView ? "cardSlideUp 0.7s cubic-bezier(0.22,0.61,0.36,1) both" : "none",
                  animationDelay: `${100 + i * 120}ms`,
                  opacity: inView ? undefined : 0,
                }}
              >
                {/* Subtle colored tint overlay when expanded */}
                {isActive && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: `radial-gradient(ellipse at top left, rgba(${style.rgb},0.08) 0%, transparent 70%)`,
                      pointerEvents: "none",
                      zIndex: 0,
                    }}
                  />
                )}

                {/* Dark photo overlay (collapsed only) */}
                {!isActive && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(15,15,15,0.4)",
                      transition: "background 0.4s",
                    }}
                  />
                )}

                {/* Collapsed: tag top-left + CTA bottom-center */}
                {!isActive && (
                  <>
                    <div style={{ position: "absolute", top: 12, left: 12, zIndex: 4 }}>
                      <div
                        style={{
                          display: "inline-flex", alignItems: "center", gap: 6,
                          borderRadius: 100, padding: "6px 10px",
                          fontSize: 10, letterSpacing: "1px", textTransform: "uppercase",
                          color: "rgba(250,250,250,0.9)",
                        }}
                      >
                        <Image src={style.icon} alt={svc.tag} width={14} height={14} style={{ objectFit: "contain" }} />
                        {svc.tag}
                      </div>
                    </div>

                    <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", zIndex: 4 }}>
                      <button
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          backdropFilter: "blur(6px)",
                          color: C.light,
                          border: "1px solid rgba(255,255,255,0.12)",
                          borderRadius: 100,
                          padding: "8px 12px",
                          fontSize: 12, fontWeight: 600, cursor: "pointer",
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {svc.cta}
                      </button>
                    </div>
                  </>
                )}

                {/* Expand hint — no outer ring, just icon + pulse */}
                {!isActive && (
                  <div
                    style={{
                      position: "absolute", top: "50%", left: "50%",
                      transform: "translate(-50%, -50%)",
                      textAlign: "center", pointerEvents: "none", zIndex: 3,
                    }}
                  >
                    <div style={{ position: "relative", width: 32, height: 32, margin: "0 auto 8px" }}>
                      <Image
                        src="/icons/taptoexpandicon.webp"
                        alt={`Expand ${svc.title}`}
                        width={28}
                        height={28}
                        style={{ objectFit: "contain", opacity: 0.8 }}
                      />
                      {/* Pulse ring behind icon */}
                      <div
                        className="hint-pulse"
                        style={{ border: `1.5px solid rgba(255,255,255,0.5)` }}
                      />
                    </div>
                    <p style={{ fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>
                      Tap to Expand
                    </p>
                  </div>
                )}

                {/* Card content */}
                <div
                  style={{
                    position: "absolute", inset: 0,
                    display: "flex", flexDirection: "column",
                    // Collapsed → anchor to bottom; Expanded → start from top
                    justifyContent: isActive ? "flex-start" : "flex-end",
                    padding: isActive ? "0" : "24px 18px",
                    zIndex: 2, transition: "padding 0.4s",
                  }}
                >
                  {/* Expanded: image on left (fixed, full height) */}
                  {isActive && (
                    <div
                      style={{
                        position: "absolute", left: 0, top: 0, bottom: 0, width: "40%",
                        display: "flex", alignItems: "center", justifyContent: "center", padding: "16px",
                      }}
                    >
                      <Image
                        src={getCardImage(svc.id)}
                        alt={svc.title}
                        width={200} height={300}
                        style={{ objectFit: "contain", width: "90%", height: "auto" }}
                      />
                    </div>
                  )}

                  {/* Content — right panel, scrollable when expanded */}
                  <div
                    style={{
                      marginLeft: isActive ? "40%" : 0,
                      transition: "margin-left 0.4s",
                      maxWidth: isActive ? "60%" : "100%",
                      // Scrollable panel — fills full card height when expanded
                      height: isActive ? "100%" : "auto",
                      overflowY: isActive ? "auto" : "visible",
                      padding: isActive ? "24px 24px 24px 20px" : "0",
                      scrollbarWidth: "none",
                    }}
                    className={isActive ? "svc-scroll" : undefined}
                  >

                    {/* Tag — always at the top when expanded */}
                    {isActive && (
                      <div
                        style={{
                          display: "inline-flex", alignItems: "center", gap: 6,
                          background: style.color,
                          borderRadius: 100, padding: "4px 12px",
                          fontSize: 10, letterSpacing: "1px", textTransform: "uppercase",
                          color: "rgba(250,250,250,0.9)", marginBottom: 10, width: "fit-content",
                          animation: "contentReveal 0.4s ease both",
                          animationDelay: "120ms",
                        }}
                      >
                        <Image src={style.icon} alt={svc.tag} width={14} height={14} style={{ objectFit: "contain" }} />
                        {svc.tag}
                      </div>
                    )}

                    {/* Title */}
                    {isActive && (
                      <h3
                        style={{
                          color: "#000000", fontSize: 22, fontWeight: 700,
                          lineHeight: 1.2, marginBottom: 4,
                          animation: "contentReveal 0.4s ease both",
                          animationDelay: "180ms",
                        }}
                      >
                        {svc.title}
                      </h3>
                    )}

                    {/* Scrollable body — no max-height clipping, just opacity fade-in */}
                    <div
                      style={{
                        opacity: isActive ? 1 : 0,
                        transition: "opacity 0.35s",
                      }}
                    >
                      <div style={{ width: "100%", height: 1, background: `${style.color}60`, margin: "10px 0" }} />
                      <p
                        style={{
                          color: style.color, fontSize: 12, fontWeight: 500,
                          marginBottom: 8, fontStyle: "italic",
                          animation: isActive ? "contentReveal 0.45s ease both" : "none",
                          animationDelay: "240ms",
                        }}
                      >
                        {svc.subtitle}
                      </p>
                      <p
                        style={{
                          color: "#333", fontSize: 13, lineHeight: 1.7, marginBottom: 14,
                          animation: isActive ? "contentReveal 0.45s ease both" : "none",
                          animationDelay: "290ms",
                        }}
                      >
                        {svc.desc}
                      </p>

                      {/* Bullets */}
                      <ul
                        style={{
                          listStyle: "none", padding: 0, margin: "0 0 18px",
                          animation: isActive ? "contentReveal 0.45s ease both" : "none",
                          animationDelay: "330ms",
                        }}
                      >
                        {svc.bullets.map((b, bi) => (
                          <BulletItem key={bi} text={b} color={style.color} />
                        ))}
                      </ul>

                      {/* CTA buttons */}
                      <div
                        style={{
                          display: "flex", gap: 10, flexWrap: "wrap",
                          animation: isActive ? "contentReveal 0.45s ease both" : "none",
                          animationDelay: "380ms",
                        }}
                      >
                        <button
                          style={{
                            background: style.color,
                            color: C.light,
                            border: "none", borderRadius: 100,
                            padding: "10px 22px", fontSize: 12, fontWeight: 600, cursor: "pointer",
                          }}
                        >
                          {svc.cta}
                        </button>
                        {svc.ctaSecondary && (
                          <Link
                            href={svc.id === 1 ? "/services" : svc.id === 2 ? "/recovery" : "/"}
                            style={{ textDecoration: "none" }}
                          >
                            <button
                              style={{
                                background: "transparent",
                                color: style.color,
                                border: `1px solid ${style.color}`,
                                borderRadius: 100,
                                padding: "10px 18px",
                                fontSize: 12, cursor: "pointer",
                              }}
                            >
                              {svc.ctaSecondary}
                            </button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── MOBILE: vertical stack ── */}
        <div
          className="service-mobile"
          style={{ display: "none", flexDirection: "column", gap: 16, marginBottom: 32, marginLeft: 20, marginRight: 20 }}
        >
          {services.map((svc, i) => {
            const style = getServiceStyle(svc.id);
            return (
              <div
                key={svc.id}
                style={{
                  borderRadius: 24, overflow: "hidden", position: "relative", minHeight: 294,
                  background: `url('${getCardImage(svc.id)}') center/110% no-repeat`,
                  animation: inView ? "cardSlideUp 0.7s cubic-bezier(0.22,0.61,0.36,1) both" : "none",
                  animationDelay: `${100 + i * 120}ms`,
                  opacity: inView ? undefined : 0,
                }}
              >
                <div style={{ position: "absolute", inset: 0, background: "rgba(15,15,15,0.4)" }} />
                
                <div
                  style={{
                    position: "absolute", inset: 0,
                    display: "flex", flexDirection: "column", justifyContent: "flex-end",
                    padding: "28px 24px 42px 24px", zIndex: 2,
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 6,
                      background: "rgba(255,255,255,0.1)", borderRadius: 100,
                      padding: "4px 12px", fontSize: 10, letterSpacing: "1px",
                      textTransform: "uppercase", color: "rgba(250,250,250,0.85)",
                      marginBottom: 10, width: "fit-content",
                    }}
                  >
                    <Image src={style.icon} alt={svc.tag} width={14} height={14} style={{ objectFit: "contain" }} />
                    {svc.tag}
                  </div>
                  <h3 style={{ color: C.light, fontSize: 22, fontWeight: 700, lineHeight: 1.2, marginBottom: 6 }}>{svc.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 500, marginBottom: 8, fontStyle: "italic" }}>{svc.subtitle}</p>
                  <p style={{ color: "rgba(250,250,250,0.6)", fontSize: 13, lineHeight: 1.7, marginBottom: 20 }}>{svc.desc}</p>
                  <button
                    style={{
                      background: "rgba(255,255,255,0.15)", backdropFilter: "blur(6px)",
                      color: C.light, border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: 100, padding: "12px 24px",
                      fontSize: 13, fontWeight: 600, cursor: "pointer", alignSelf: "flex-start",
                    }}
                  >
                    {svc.cta}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}