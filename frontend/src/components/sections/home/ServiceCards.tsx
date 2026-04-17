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

const getCardImage = (serviceId: number) => {
  if (serviceId === 1) return "/images/medcuphome.webp";
  if (serviceId === 2) return "/images/spahome.webp";
  if (serviceId === 3) return "/images/emergenhome.webp";
  return "/images/medcuphome.webp";
};

const getBulletDot = (serviceId: number) => {
  if (serviceId === 1) return "/icons/greenmountaindot.webp";
  if (serviceId === 2) return "/icons/brownbamboodot.webp";
  if (serviceId === 3) return "/icons/redsirenedot.webp";
  return "/icons/greenmountaindot.webp";
};

const getBulletSize = (serviceId: number) => {
  if (serviceId === 1) return { width: 24, height: 24 };
  if (serviceId === 2) return { width: 17, height: 17 };
  if (serviceId === 3) return { width: 17, height: 17 };
  return { width: 24, height: 24 };
};

const getServiceIconSizeCollapsed = (serviceId: number) => {
  if (serviceId === 1) return { width: 21, height: 21 };
  if (serviceId === 2) return { width: 22, height: 22 };
  if (serviceId === 3) return { width: 36, height: 36 };
  return { width: 21, height: 21 };
};

const getServiceIconSizeExpanded = (serviceId: number) => {
  if (serviceId === 1) return { width: 14, height: 14 };
  if (serviceId === 2) return { width: 15, height: 15 };
  if (serviceId === 3) return { width: 17, height: 17 };
  return { width: 14, height: 14 };
};
const getCollapseCardInfo = (serviceId: number) => {
  if (serviceId === 1)
    return {
      hours: "08.00 - 17.00",
      icon: "/icons/gunungwhite.webp",
      label: "Certified for Rinjani Trek",
    };
  if (serviceId === 2)
    return {
      hours: "08.00 - 17.00",
      icon: "/icons/housewhite.webp",
      label: "Available Home Service",
    };
  if (serviceId === 3)
    return {
      hours: "",
      icon: "/icons/timefullicon.webp",
      label: "Available 24 Hours",
    };
  return { hours: "", icon: "", label: "" };
};

const getCollapseCardInfoIconSize = (serviceId: number) => {
  if (serviceId === 1) return { width: 18, height: 18 };
  if (serviceId === 2) return { width: 15, height: 15 };
  if (serviceId === 3) return { width: 14, height: 14 };
  return { width: 16, height: 16 };
};

const getCollapseCardInfoTop = (serviceId: number) => {
  if (serviceId === 1) return 50;
  if (serviceId === 2) return 50;
  if (serviceId === 3) return 60;
  return 50;
};
const getBulletGap = (serviceId: number) => {
  if (serviceId === 1) return 12;
  if (serviceId === 2) return 12;
  if (serviceId === 3) return 6;
  return 12;
};
// Render "Bold Title — description" bullets
function BulletItem({ text, dotImage, serviceId, bulletGap }: { text: string; dotImage: string; serviceId: number; bulletGap: number }) {
  const size = getBulletSize(serviceId);
  const sep = text.indexOf(" — ");
  if (sep === -1) {
    return (
      <li style={{ display: "flex", gap: 10, marginBottom: bulletGap, alignItems: "flex-start" }}>
        <div style={{ flexShrink: 0, marginTop: 6, marginBottom: 3, position: "relative", width: size.width, height: size.height }}>
          <Image src={dotImage} alt="bullet dot" width={size.width} height={size.height} style={{ objectFit: "contain" }} />
        </div>
        <span style={{ color: "#111", fontSize: 13, lineHeight: 1.65 }}>{text}</span>
      </li>
    );
  }
  const title = text.slice(0, sep);
  const body  = text.slice(sep + 3);
  return (
    <li style={{ display: "flex", gap: 10, marginBottom: bulletGap, alignItems: "flex-start" }}>
      <div style={{ flexShrink: 0, marginTop: -2, marginBottom: 3, position: "relative", width: size.width, height: size.height }}>
        <Image src={dotImage} alt="bullet dot" width={size.width} height={size.height} style={{ objectFit: "contain" }} />
      </div>
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
        @keyframes contentReveal {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
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
        @media (max-width: 500px) {
          .service-mobile .svc-mobile-tag {
            display: none !important;
          }
          .service-mobile .svc-card-content { 
            padding: 24px 20px 36px 20px !important; 
          }
          .service-mobile .svc-btn { 
            padding: 10px 20px !important; 
            font-size: 12px !important; 
          }
        }
        @media (max-width: 400px) {
          .service-mobile .svc-card-content { 
            padding: 20px 16px 30px 16px !important; 
          }
          .service-mobile .svc-btn { 
            padding: 9px 16px !important; 
            font-size: 11px !important; 
          }
        }
        @media (max-width: 350px) {
          .service-mobile .svc-card-content { 
            padding: 16px 12px 24px 12px !important; 
          }
          .service-mobile .svc-btn { 
            padding: 8px 12px !important; 
            font-size: 11px !important; 
          }
        }
        @media (max-width: 300px) {
          .service-mobile .svc-card-content { 
            padding: 12px 8px 20px 8px !important; 
          }
          .service-mobile .svc-btn { 
            padding: 6px 10px !important; 
            font-size: 10px !important; 
          }
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
                  // Expanded: glassy tinted bg; Collapsed: photo
                  background: isActive
                    ? `rgba(${style.rgb}, 0.40)`
                    : undefined,
                  backgroundImage: isActive ? undefined : `url('${getCardImage(svc.id)}')`,
                  backgroundSize: isActive ? undefined : "120%",
                  backgroundPosition: isActive ? undefined : "center",
                  // Glassy inset shadow when expanded
                  boxShadow: isActive
                    ? "0px 4px 4px rgba(0,0,0,0.25) inset, 0px 4px 4px rgba(0,0,0,0.25) inset"
                    : "none",
                  animation: inView ? "cardSlideUp 0.7s cubic-bezier(0.22,0.61,0.36,1) both" : "none",
                  animationDelay: `${100 + i * 120}ms`,
                  opacity: inView ? undefined : 0,
                }}
              >
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
                    <div style={{ position: "absolute", top: 12, left: 12, zIndex: 5 }}>
                      <div
                        style={{
                          display: "inline-flex", alignItems: "center", gap: 6,
                          borderRadius: 100, padding: "6px 10px",
                          fontSize: 12, letterSpacing: "1px", textTransform: "uppercase",
                          color: "rgba(250,250,250,0.9)",
                        }}
                      >
                        <Image src={style.icon} alt={svc.tag} width={getServiceIconSizeCollapsed(svc.id).width} height={getServiceIconSizeCollapsed(svc.id).height} style={{ objectFit: "contain" }} />
                        {svc.tag}
                      </div>
                    </div>

                    <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", zIndex: 5 }}>
                      <button
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          backdropFilter: "blur(6px)",
                          color: C.light,
                          border: "1px solid rgba(255,255,255,0.12)",
                          borderRadius: 100,
                          padding: "8px 12px",
                          fontSize: 12, fontWeight: 600, cursor: "pointer",
                          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 12px rgba(0,0,0,0.15)",
                          transition: "transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease",
                        }}
                        onClick={(e) => e.stopPropagation()}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.transform = "scale(1.08)";
                          (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)";
                          (e.currentTarget as HTMLElement).style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.25), 0 6px 16px rgba(0,0,0,0.25)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                          (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                          (e.currentTarget as HTMLElement).style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 12px rgba(0,0,0,0.15)";
                        }}
                      >
                        {svc.cta}
                      </button>
                    </div>

                    {/* Card info: hours + icon + label */}
                    {(() => {
                      const info = getCollapseCardInfo(svc.id);
                      const iconSize = getCollapseCardInfoIconSize(svc.id);
                      const topPosition = getCollapseCardInfoTop(svc.id);
                      return (
                        <div
                          style={{
                            position: "absolute",
                            top: topPosition,
                            left: 24,
                            textAlign: "left",
                            pointerEvents: "none",
                            zIndex: 3,
                          }}
                        >
                          {info.hours && (
                            <p
                              style={{
                                margin: "0 0 8px",
                                fontSize: 12,
                                fontWeight: 300,
                                color: "rgba(250,250,250,0.65)",
                                letterSpacing: "0.3px",
                              }}
                            >
                              {info.hours}
                            </p>
                          )}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                            }}
                          >
                            <Image
                              src={info.icon}
                              alt={info.label}
                              width={iconSize.width}
                              height={iconSize.height}
                              style={{ objectFit: "contain" }}
                            />
                            <p
                              style={{
                                margin: 0,
                                fontSize: 12,
                                fontWeight: 350,
                                color: "#FAFAFA",
                                letterSpacing: "0.2px",
                              }}
                            >
                              {info.label}
                            </p>
                          </div>
                        </div>
                      );
                    })()}
                  </>
                )}

                {/* Expand hint */}
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

                {/* ── EXPANDED CARD CONTENT ── */}
                {isActive && (
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "row", zIndex: 2 }}>

                    {/* Photo — marginLeft 19, vertically centered */}
                    <div
                      style={{
                        flexShrink: 0,
                        width: "40%",
                        marginLeft: 1,
                        marginTop: 3,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Image
                        src={getCardImage(svc.id)}
                        alt={svc.title}
                        width={200}
                        height={300}
                        style={{ objectFit: "contain", width: "90%", height: "auto" }}
                      />
                    </div>

                    {/* Text panel — 26px gap from photo, no scroll, vertically centered */}
                    <div
                      style={{
                        flex: 1,
                        marginTop: 15,
                        marginLeft: 10,
                        paddingRight: 28,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        overflowY: "visible",
                      }}
                    >
                      {/* Tag */}
                      <div
                        style={{
                          display: "inline-flex", alignItems: "center", gap: 6,
                          background: style.color,
                          borderRadius: 100, padding: "4px 12px",
                          fontSize: 10, letterSpacing: "1px", textTransform: "uppercase",
                          color: "rgba(250,250,250,0.9)", marginBottom: -10, width: "fit-content",
                          animation: "contentReveal 0.4s ease both",
                          animationDelay: "120ms",
                        }}
                      >
                        <Image src={style.icon} alt={svc.tag} width={getServiceIconSizeExpanded(svc.id).width} height={getServiceIconSizeExpanded(svc.id).height} style={{ objectFit: "contain" }} />
                        {svc.tag}
                      </div>

                      {/* Title */}
                      <h3
                        style={{
                          color: "#000000", fontSize: 22, fontWeight: 700,
                          lineHeight: 1, marginBottom: 1,
                          animation: "contentReveal 0.4s ease both",
                          animationDelay: "180ms",
                        }}
                      >
                        {svc.title}
                      </h3>

                      {/* Subtitle */}
                      <p
                        style={{
                          color: style.color, fontSize: 12, fontWeight: 500,
                          marginBottom: -5, fontStyle: "italic",
                          animation: "contentReveal 0.45s ease both",
                          animationDelay: "240ms",
                        }}
                      >
                        {svc.subtitle}
                      </p>

                      {/* Description */}
                      <p
                        style={{
                          color: "#333", fontSize: 12, lineHeight: 1.5, marginBottom: 10,
                          animation: "contentReveal 0.45s ease both",
                          animationDelay: "290ms",
                        }}
                      >
                        {svc.desc}
                      </p>

                      {/* Bullets */}
                      <ul
                        style={{
                          listStyle: "none", padding: 0, margin: "0 0 -5px", marginTop: 3,
                          animation: "contentReveal 0.45s ease both",
                          animationDelay: "330ms",
                        }}
                      >
                        {svc.bullets.map((b, bi) => (
                          <BulletItem key={bi} text={b} dotImage={getBulletDot(svc.id)} serviceId={svc.id} bulletGap={getBulletGap(svc.id)} />
                        ))}
                      </ul>

                      {/* CTA buttons */}
                      <div
                        style={{
                          display: "flex", gap: 10, flexWrap: "wrap",
                          animation: "contentReveal 0.45s ease both",
                          animationDelay: "380ms",
                          marginTop: "auto",
                          marginBottom: 20,
                        }}
                      >
                        <button
                          style={{
                            background: style.color,
                            color: C.light,
                            border: "none",
                            borderRadius: 9999,
                            padding: "11px 26px",
                            fontSize: 12, fontWeight: 600, cursor: "pointer",
                            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 12px rgba(0,0,0,0.2)",
                            transition: "transform 0.2s ease, box-shadow 0.2s ease",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.transform = "scale(1.08)";
                            (e.currentTarget as HTMLElement).style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.2), 0 6px 16px rgba(0,0,0,0.3)";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                            (e.currentTarget as HTMLElement).style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 12px rgba(0,0,0,0.2)";
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
                                borderRadius: 9999,
                                padding: "11px 22px",
                                fontSize: 12, cursor: "pointer",
                                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
                                transition: "transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease",
                              }}
                              onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.transform = "scale(1.08)";
                                (e.currentTarget as HTMLElement).style.background = `rgba(${style.rgb}/0.08)`;
                                (e.currentTarget as HTMLElement).style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 12px rgba(0,0,0,0.15)";
                              }}
                              onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                                (e.currentTarget as HTMLElement).style.background = "transparent";
                                (e.currentTarget as HTMLElement).style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.1)";
                              }}
                            >
                              {svc.ctaSecondary}
                            </button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                )}

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
                  background: i === 0 ? `url('${getCardImage(svc.id)}') center 20%/110% no-repeat` : `url('${getCardImage(svc.id)}') center/110% no-repeat`,
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
                  className="svc-card-content"
                >
                  <div
                    className="svc-mobile-tag"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 6,
                      background: "rgba(255,255,255,0.1)", borderRadius: 100,
                      padding: "4px 12px", fontSize: 10, letterSpacing: "1px",
                      textTransform: "uppercase", color: "rgba(250,250,250,0.85)",
                      marginBottom: 10, width: "fit-content",
                    }}
                  >
                    <Image src={style.icon} alt={svc.tag} width={getServiceIconSizeExpanded(svc.id).width} height={getServiceIconSizeExpanded(svc.id).height} style={{ objectFit: "contain" }} />
                    {svc.tag}
                  </div>
                  <h3 style={{ color: C.light, fontSize: 22, fontWeight: 700, lineHeight: 1.2, marginBottom: 6 }}>{svc.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 500, marginBottom: 8, fontStyle: "italic" }}>{svc.subtitle}</p>
                  <p style={{ color: "rgba(250,250,250,0.6)", fontSize: 13, lineHeight: 1.7, marginBottom: 20 }}>{svc.desc}</p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <button
                      className="svc-btn"
                      style={{
                        background: style.color,
                        color: C.light, border: "none",
                        borderRadius: 9999, padding: "12px 28px",
                        fontSize: 13, fontWeight: 600, cursor: "pointer",
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 12px rgba(0,0,0,0.2)",
                        transition: "transform 0.2s ease, box-shadow 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = "scale(1.08)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.2), 0 6px 16px rgba(0,0,0,0.3)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 12px rgba(0,0,0,0.2)";
                      }}
                    >
                      {svc.cta}
                    </button>
                    {(svc.id === 1 || svc.id === 2) && (
                      <Link href={svc.id === 1 ? "/services" : "/recovery"} style={{ textDecoration: "none" }}>
                        <button
                          className="svc-btn"
                          style={{
                            background: "rgba(255,255,255,0.15)", backdropFilter: "blur(6px)",
                            color: C.light, border: "1px solid rgba(255,255,255,0.2)",
                            borderRadius: 9999, padding: "12px 28px",
                            fontSize: 13, fontWeight: 600, cursor: "pointer",
                            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 12px rgba(0,0,0,0.15)",
                            transition: "transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.transform = "scale(1.08)";
                            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.25)";
                            (e.currentTarget as HTMLElement).style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.25), 0 6px 16px rgba(0,0,0,0.25)";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.15)";
                            (e.currentTarget as HTMLElement).style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 12px rgba(0,0,0,0.15)";
                          }}
                        >
                          See More Services
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}