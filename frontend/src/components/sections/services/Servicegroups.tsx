"use client";

// src/components/services/ServiceGroups.tsx

import { useState, useRef } from "react";
import Image from "next/image";
import { C } from "@/lib/constants";
import { serviceGroups, ServiceCard } from "@/data/serviceData";

const cardBgs = [
  `linear-gradient(150deg, #1C3A2E 0%, #2A5240 100%)`,
  `linear-gradient(150deg, #2A1F0E 0%, #4A3520 100%)`,
  `linear-gradient(150deg, ${C.cardDark} 0%, #1A2E2A 100%)`,
];

// ── Whitesirene icon customization (Mountain & Waterfall Rescue card)
// Sizes
const WHITESIRENE_ICON_EXPANDED = 28;  // Desktop expanded card
const WHITESIRENE_ICON_SMALL = 20;     // Desktop small card
const WHITESIRENE_ICON_MOBILE = 26;    // Mobile card
// Positions (top/bottom)
const WHITESIRENE_POS_EXPANDED = 8;    // Desktop expanded card marginBottom
const WHITESIRENE_POS_SMALL = 8;      // Desktop small card bottom position
const WHITESIRENE_POS_MOBILE = 7.5;      // Mobile card marginBottom

// ── Expanded card
function ExpandedCard({ card, groupIdx }: { card: ServiceCard; groupIdx: number }) {
  return (
    <div
      style={{
        borderRadius: 60,
        overflow: "hidden",
        position: "relative",
        width: "100%",
        height: "100%",
        background: cardBgs[groupIdx % cardBgs.length],
        backgroundImage: `url('${card.imagePath}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        border: `3px solid ${C.border}`,
        boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
      }}
    >
      {/* Gradient overlay - scaled up */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(63, 63, 63, 0.70)", transform: "scale(1.05)", transformOrigin: "center" }} />
      
      {/* Original gradient for depth */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.4) 55%, rgba(10,10,10,0.05) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "28px 24px", zIndex: 2 }}>
        <div style={{ display: "inline-flex", background: "rgba(255,255,255,0.1)", borderRadius: 100, padding: "3px 10px", fontSize: 10, letterSpacing: "1px", textTransform: "uppercase", color: "rgba(250,250,250,0.75)", marginBottom: 8, width: "fit-content" }}>
          {card.tag}
        </div>
        {/* Icon + Title */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <img src={card.iconPath} alt="icon" style={{ width: card.id === 31 ? WHITESIRENE_ICON_EXPANDED : 32, height: card.id === 31 ? WHITESIRENE_ICON_EXPANDED : 32, objectFit: "contain", marginBottom: card.id === 31 ? WHITESIRENE_POS_EXPANDED : 0 }} />
          <h4 style={{ color: C.light, fontSize: 18, fontWeight: 700, lineHeight: 1.25, margin: 0 }}>{card.title}</h4>
        </div>
        <p style={{ color: C.tealLight, fontSize: 11, marginBottom: 12, letterSpacing: "0.5px" }}>{card.hours}</p>
        <div style={{ width: 24, height: 1, background: `${C.teal}70`, marginBottom: 12 }} />
        <p style={{ color: "rgba(250,250,250,0.6)", fontSize: 12.5, lineHeight: 1.75, marginBottom: 18 }}>{card.desc}</p>
        <button style={{ background: C.teal, color: C.light, border: "none", borderRadius: 100, padding: "10px 22px", fontSize: 12, fontWeight: 600, cursor: "pointer", alignSelf: "flex-start" }}>
          {card.cta}
        </button>
      </div>
    </div>
  );
}

// ── Small card
function SmallCard({ card, groupIdx, onClick }: { card: ServiceCard; groupIdx: number; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        borderRadius: 48,
        overflow: "hidden",
        position: "relative",
        width: "90%",
        height: "100%",
        cursor: "pointer",
        background: cardBgs[groupIdx % cardBgs.length],
        backgroundImage: `url('${card.imagePath}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        border: `3px solid ${C.border}`,
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Gradient overlay - scaled up */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(63, 63, 63, 0.70)", transform: "scale(25)", transformOrigin: "center" }} />
      
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.2) 100%)" }} />
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center", pointerEvents: "none", zIndex: 3 }}>
        <div style={{ position: "relative", width: 32, height: 32, margin: "0 auto 6px" }}>
          <Image
            src="/icons/taptoexpandicon.webp"
            alt="Tap to Expand"
            width={28}
            height={28}
            style={{ objectFit: "contain", opacity: 0.8 }}
          />
          <div className="hint-pulse" style={{ border: `1.5px solid rgba(255,255,255,0.5)` }} />
        </div>
        <p style={{ fontSize: 9, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", margin: 0 }}>Tap to Expand</p>
      </div>
      <div style={{ position: "absolute", bottom: 12, left: 16, right: 9, padding: "10px 14px", zIndex: 2 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img src={card.iconPath} alt="icon" style={{ width: card.id === 31 ? WHITESIRENE_ICON_SMALL : 20, height: card.id === 31 ? WHITESIRENE_ICON_SMALL : 20, objectFit: "contain", flexShrink: 0, marginBottom: card.id === 31 ? WHITESIRENE_POS_SMALL : 0 }} />
          <p style={{ color: C.light, fontSize: 12, fontWeight: 600, lineHeight: 1.3, margin: 0 }}>{card.title}</p>
        </div>
      </div>
    </div>
  );
}

// ── Text block
function TextBlock({ category, categoryDesc, textAlign }: { category: string; categoryDesc: string; textAlign: "left" | "right" }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 8px", textAlign }}>
      <h3 style={{ color: C.light, fontSize: 20, fontWeight: 700, lineHeight: 1.3, marginBottom: 16 }}>{category}</h3>
      <div style={{ width: 32, height: 2, background: C.teal, marginBottom: 16, marginLeft: textAlign === "right" ? "auto" : 0 }} />
      <p style={{ color: "rgba(250,250,250,0.6)", fontSize: 13.5, lineHeight: 1.8, margin: 0 }}>{categoryDesc}</p>
    </div>
  );
}

// ── Desktop row
const SMALL_COL_H  = 400;
const EXPANDED_H   = 300;
const SMALL_GAP    = 16;
const SMALL_CARD_H = (SMALL_COL_H - SMALL_GAP) / 2;

function ServiceGroupRow({ group, groupIdx }: { group: typeof serviceGroups[0]; groupIdx: number }) {
  const [activeIdx, setActiveIdx] = useState(group.cards.length - 1);
  const activeCard = group.cards[activeIdx];
  const smallCards = group.cards.filter((_, i) => i !== activeIdx);

  const CardsColumn = (
    <div style={{ flex: 1.8, display: "flex", gap: 14, height: SMALL_COL_H, alignItems: "center" }}>
      <div style={{ flex: 1, height: SMALL_COL_H, display: "flex", flexDirection: "column", gap: SMALL_GAP }}>
        {smallCards.map((card: ServiceCard) => (
          <div key={card.id} style={{ height: SMALL_CARD_H, flexShrink: 0 }}>
            <SmallCard card={card} groupIdx={groupIdx} onClick={() => setActiveIdx(group.cards.indexOf(card))} />
          </div>
        ))}
      </div>
      <div style={{ flex: 1.4, height: EXPANDED_H, alignSelf: "center", flexShrink: 0 }}>
        <ExpandedCard card={activeCard} groupIdx={groupIdx} />
      </div>
    </div>
  );

  const TextColumn = (
    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", height: SMALL_COL_H }}>
      <TextBlock category={group.category} categoryDesc={group.categoryDesc} textAlign={group.textSide === "left" ? "left" : "right"} />
    </div>
  );

  const BELT_H   = 200;
  const BELT_TOP = (SMALL_COL_H - BELT_H) / 2;

  return (
    <div style={{ display: "flex", gap: 24, alignItems: "center", height: SMALL_COL_H, position: "relative" }}>
      <div style={{ position: "absolute", left: -32, right: -32, top: BELT_TOP, height: BELT_H, background: C.teal, zIndex: 0, pointerEvents: "none" }} />
      <div style={{ display: "flex", gap: 24, width: "100%", zIndex: 1, alignItems: "center", height: "100%" }}>
        {group.textSide === "left" ? <>{TextColumn}{CardsColumn}</> : <>{CardsColumn}{TextColumn}</>}
      </div>
    </div>
  );
}

// ── Mobile: horizontal scroll snap carousel per group ─────────────────────────
function MobileGroupCarousel({
  group,
  groupIdx,
}: {
  group: typeof serviceGroups[0];
  groupIdx: number;
}) {
  const [activeDot, setActiveDot] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    // card = 85% of viewport, gap = 12px
    const cardW = clientWidth * 0.85 + 12;
    const idx = Math.round(scrollLeft / cardW);
    setActiveDot(Math.min(Math.max(idx, 0), group.cards.length - 1));
  };

  const scrollTo = (idx: number) => {
    if (!scrollRef.current) return;
    const cardW = scrollRef.current.clientWidth * 0.85 + 12;
    scrollRef.current.scrollTo({ left: idx * cardW, behavior: "smooth" });
  };

  return (
    <div style={{ marginBottom: 52 }}>

      {/* ── Group header ── */}
      <div style={{ padding: "0 20px", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          {/* Teal pill number */}
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: C.teal,
              color: C.light,
              fontSize: 12,
              fontWeight: 800,
              flexShrink: 0,
            }}
          >
            {groupIdx + 1}
          </span>
          <div style={{ flex: 1, height: 1, background: `${C.teal}40` }} />
        </div>
        <h3 style={{ color: C.teal, fontSize: 20, fontWeight: 800, lineHeight: 1.3, margin: "0 0 8px" }}>
          {group.category}
        </h3>
        <p style={{ color: C.teal, fontSize: 13, lineHeight: 1.75, margin: 0, opacity: 0.7 }}>
          {group.categoryDesc}
        </p>
      </div>

      {/* ── Scroll track ── */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="mob-scroll"
        style={{
          display: "flex",
          gap: 12,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          // Padding: left aligns with header text, right exposes peek of next card
          paddingLeft: 20,
          // Extra right padding so the last card doesn't get clipped
          paddingRight: 20,
          paddingBottom: 6,
        }}
      >
        {group.cards.map((card: ServiceCard, ci: number) => (
          <div
            key={card.id}
            style={{
              flex: "0 0 84vw",
              height: 330,
              scrollSnapAlign: "start",
              borderRadius: 44,
              overflow: "hidden",
              position: "relative",
              background: cardBgs[groupIdx % cardBgs.length],
              backgroundImage: `url('${card.imagePath}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              // Active card: teal ring + lifted shadow; inactive: dimmed
              border: `2px solid ${ci === activeDot ? C.teal : C.border}`,
              boxShadow:
                ci === activeDot
                  ? `0 10px 32px rgba(0,0,0,0), 0 0 0 1px ${C.teal}50`
                  : "0 4px 12px rgba(0,0,0,0.18)",
              transform: ci === activeDot ? "scale(1)" : "scale(0.965)",
              transition: "transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease",
            }}
          >
            {/* Gradient overlay */}
            <div style={{ position: "absolute", inset: 0, background: "rgba(63, 63, 63, 0.70)" }} />
            
            {/* Photo gradient */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,8,8,0.96) 0%, rgba(8,8,8,0.38) 55%, rgba(8,8,8,0.06) 100%)" }} />

            {/* Teal top accent bar — full width on active */}
            <div
              style={{
                position: "absolute",
                top: 0, left: 0,
                height: 3,
                width: ci === activeDot ? "100%" : "30%",
                background: C.teal,
                transition: "width 0.4s ease",
                borderRadius: "0 0 3px 0",
              }}
            />

            {/* Card counter badge */}
            <div
              style={{
                position: "absolute",
                top: 14,
                right: 14,
                zIndex: 3,
                background: "rgba(0,0,0,0.4)",
                backdropFilter: "blur(6px)",
                borderRadius: 100,
                padding: "3px 10px",
                fontSize: 10,
                fontWeight: 700,
                color: "rgba(255,255,255,0.55)",
                letterSpacing: "0.04em",
              }}
            >
              {ci + 1}&thinsp;/&thinsp;{group.cards.length}
            </div>

            {/* Content */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "24px 22px",
                zIndex: 2,
              }}
            >
              {/* Tag */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(4px)",
                  borderRadius: 100,
                  padding: "4px 12px",
                  fontSize: 10,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  color: "rgba(250,250,250,0.8)",
                  marginBottom: 10,
                  width: "fit-content",
                }}
              >
                {card.tag}
              </div>

              {/* Icon + Title */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 5 }}>
                <img src={card.iconPath} alt="icon" style={{ width: card.id === 31 ? WHITESIRENE_ICON_MOBILE : 28, height: card.id === 31 ? WHITESIRENE_ICON_MOBILE : 28, objectFit: "contain", marginBottom: card.id === 31 ? WHITESIRENE_POS_MOBILE : 0 }} />
                <h4 style={{ color: C.light, fontSize: 19, fontWeight: 800, lineHeight: 1.25, margin: 0 }}>
                  {card.title}
                </h4>
              </div>
              <p style={{ color: C.tealLight, fontSize: 11, margin: "0 0 10px", letterSpacing: "0.5px" }}>
                {card.hours}
              </p>

              {/* Divider */}
              <div style={{ width: 28, height: 1, background: `${C.teal}70`, marginBottom: 10 }} />

              <p style={{ color: "rgba(250,250,250,0.62)", fontSize: 13, lineHeight: 1.7, margin: "0 0 18px" }}>
                {card.desc}
              </p>

              <button
                style={{
                  background: C.teal,
                  color: C.light,
                  border: "none",
                  borderRadius: 100,
                  padding: "11px 24px",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  alignSelf: "flex-start",
                  boxShadow: `0 4px 16px ${C.teal}55`,
                }}
              >
                {card.cta}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── Dot indicators ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 7,
          marginTop: 14,
        }}
      >
        {group.cards.map((_: ServiceCard, i: number) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Scroll to card ${i + 1}`}
            style={{
              width: i === activeDot ? 28 : 8,
              height: 8,
              borderRadius: 100,
              background: i === activeDot ? C.teal : `${C.teal}35`,
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "width 0.3s ease, background 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function MobileServiceGroups() {
  return (
    <div>
      {serviceGroups.map((group: typeof serviceGroups[number], gi: number) => (
        <MobileGroupCarousel key={group.id} group={group} groupIdx={gi} />
      ))}
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────────────────
export default function ServiceGroups() {
  return (
    <section style={{ background: C.light, padding: "64px 32px" }}>
      <style>{`
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
        /* Hide scrollbar across browsers */
        .mob-scroll::-webkit-scrollbar { display: none; }
        .mob-scroll { scrollbar-width: none; -ms-overflow-style: none; }

        @media (max-width: 860px) {
          .sg-desktop { display: none !important; }
          .sg-mobile  { display: block !important; }
          /* Let carousel bleed to screen edges */
          .sg-outer { padding-left: 0 !important; padding-right: 0 !important; }
          /* Increase border opacity on mobile for better visibility */
          .mob-scroll > div {
            border: 2px solid rgba(101, 163, 150, 0.6) !important;
          }
        }
        @media (min-width: 861px) {
          .sg-desktop { display: block !important; }
          .sg-mobile  { display: none !important; }
        }
      `}</style>

      <div className="max-w-5xl mx-auto sg-outer" style={{ display: "flex", flexDirection: "column", gap: 56 }}>

        {/* Desktop */}
        <div className="sg-desktop">
          {serviceGroups.map((group, gi) => (
            <div key={group.id} style={{ marginBottom: gi < serviceGroups.length - 1 ? 56 : 0 }}>
              <ServiceGroupRow group={group} groupIdx={gi} />
            </div>
          ))}
        </div>

        {/* Mobile */}
        <div className="sg-mobile" style={{ display: "none" }}>
          <MobileServiceGroups />
        </div>

      </div>
    </section>
  );
}