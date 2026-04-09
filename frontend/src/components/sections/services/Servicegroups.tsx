"use client";

// src/components/services/ServiceGroups.tsx
// ── Layout per row:
//    textSide="left"  → [text block] [2 small cards] [expanded card]
//    textSide="right" → [expanded card] [2 small cards] [text block]
// ── Clicking a small card swaps it into the expanded position with animation

import { useState } from "react";
import { C } from "@/lib/constants";
import { serviceGroups, ServiceCard } from "@/data/serviceData";

// Card background gradients — swap with real photos via backgroundImage
const cardBgs = [
  `linear-gradient(150deg, #1C3A2E 0%, #2A5240 100%)`,
  `linear-gradient(150deg, #2A1F0E 0%, #4A3520 100%)`,
  `linear-gradient(150deg, ${C.cardDark} 0%, #1A2E2A 100%)`,
];

// ── Single expanded card
function ExpandedCard({ card, groupIdx }: { card: ServiceCard; groupIdx: number }) {
  return (
    <div
      style={{
        borderRadius: 20,
        overflow: "hidden",
        position: "relative",
        height: "100%",
        // ↓ Replace with: background: `url('${card.imagePath}') center/cover no-repeat`
        background: cardBgs[groupIdx % cardBgs.length],
        border: `1px solid ${C.border}`,
        boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.4) 55%, rgba(10,10,10,0.05) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "28px 24px", zIndex: 2 }}>
        <div style={{ display: "inline-flex", background: "rgba(255,255,255,0.1)", borderRadius: 100, padding: "3px 10px", fontSize: 10, letterSpacing: "1px", textTransform: "uppercase", color: "rgba(250,250,250,0.75)", marginBottom: 8, width: "fit-content" }}>
          {card.tag}
        </div>
        <h4 style={{ color: C.light, fontSize: 18, fontWeight: 700, lineHeight: 1.25, marginBottom: 6 }}>{card.title}</h4>
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

// ── Single small (collapsed) card
function SmallCard({ card, groupIdx, onClick }: { card: ServiceCard; groupIdx: number; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        borderRadius: 16,
        overflow: "hidden",
        position: "relative",
        flex: 1,
        cursor: "pointer",
        // ↓ Replace with: background: `url('${card.imagePath}') center/cover no-repeat`
        background: cardBgs[groupIdx % cardBgs.length],
        border: `1px solid ${C.border}`,
        transition: "transform 0.2s",
        minHeight: 0,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.2) 100%)" }} />

      {/* Expand hint */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center", pointerEvents: "none", zIndex: 3 }}>
        <div style={{ width: 28, height: 28, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 6px", color: "rgba(255,255,255,0.5)", fontSize: 14 }}>+</div>
        <p style={{ fontSize: 9, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>Tap to Expand</p>
      </div>

      {/* Card label at bottom */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "12px 14px", zIndex: 2 }}>
        <p style={{ color: C.light, fontSize: 12, fontWeight: 600, lineHeight: 1.3, margin: 0 }}>{card.title}</p>
      </div>
    </div>
  );
}

// ── Text block (category title + desc)
function TextBlock({ category, categoryDesc, textAlign }: { category: string; categoryDesc: string; textAlign: "left" | "right" }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 8px",
        textAlign: textAlign === "right" ? "right" : "left",
      }}
    >
      <h3 style={{ color: C.light, fontSize: 20, fontWeight: 700, lineHeight: 1.3, marginBottom: 16 }}>
        {category}
      </h3>
      <div style={{ width: 32, height: 2, background: C.teal, marginBottom: 16, marginLeft: textAlign === "right" ? "auto" : 0 }} />
      <p style={{ color: "rgba(250,250,250,0.6)", fontSize: 13.5, lineHeight: 1.8 }}>
        {categoryDesc}
      </p>
    </div>
  );
}

// ── One full service group row
function ServiceGroupRow({ group, groupIdx }: { group: typeof serviceGroups[0]; groupIdx: number }) {
  // activeIdx: which card is currently expanded
  const [activeIdx, setActiveIdx] = useState(group.cards.length - 1); // default: last card expanded

  const activeCard = group.cards[activeIdx];
  const smallCards = group.cards.filter((_, i) => i !== activeIdx);

  // Cards column: 2 small stacked + 1 expanded side by side
  const CardsColumn = (
    <div style={{ display: "flex", gap: 12, flex: 1.8, height: "100%" }}>
      {/* 2 small stacked */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
        {smallCards.map((card: ServiceCard) => (
          <SmallCard
            key={card.id}
            card={card}
            groupIdx={groupIdx}
            onClick={() => setActiveIdx(group.cards.indexOf(card))}
          />
        ))}
      </div>
      {/* 1 expanded */}
      <div style={{ flex: 1.4 }}>
        <ExpandedCard card={activeCard} groupIdx={groupIdx} />
      </div>
    </div>
  );

  const TextColumn = (
    <div style={{ flex: 1 }}>
      <TextBlock
        category={group.category}
        categoryDesc={group.categoryDesc}
        textAlign={group.textSide === "left" ? "left" : "right"}
      />
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        gap: 24,
        height: 320,
        alignItems: "stretch",
      }}
    >
      {group.textSide === "left" ? (
        // text | cards
        <>{TextColumn}{CardsColumn}</>
      ) : (
        // cards | text
        <>{CardsColumn}{TextColumn}</>
      )}
    </div>
  );
}

// ── Mobile version: vertical stack, all expanded
function MobileServiceGroups() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {serviceGroups.map((group: typeof serviceGroups[number], gi: number) => (
        <div key={group.id}>
          {/* Category header */}
          <div style={{ marginBottom: 16 }}>
            <h3 style={{ color: C.light, fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{group.category}</h3>
            <div style={{ width: 28, height: 2, background: C.teal, marginBottom: 10 }} />
            <p style={{ color: "rgba(250,250,250,0.6)", fontSize: 13, lineHeight: 1.75 }}>{group.categoryDesc}</p>
          </div>
          {/* All cards stacked */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {group.cards.map((card: ServiceCard) => (
              <div key={card.id} style={{ borderRadius: 18, overflow: "hidden", position: "relative", minHeight: 220, background: cardBgs[gi % cardBgs.length], border: `1px solid ${C.border}` }}>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.2) 70%, transparent 100%)" }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "22px 20px", zIndex: 2 }}>
                  <div style={{ display: "inline-flex", background: "rgba(255,255,255,0.1)", borderRadius: 100, padding: "3px 10px", fontSize: 10, letterSpacing: "1px", textTransform: "uppercase", color: "rgba(250,250,250,0.75)", marginBottom: 8, width: "fit-content" }}>{card.tag}</div>
                  <h4 style={{ color: C.light, fontSize: 17, fontWeight: 700, marginBottom: 4 }}>{card.title}</h4>
                  <p style={{ color: C.tealLight, fontSize: 11, marginBottom: 10 }}>{card.hours}</p>
                  <p style={{ color: "rgba(250,250,250,0.6)", fontSize: 12.5, lineHeight: 1.7, marginBottom: 14 }}>{card.desc}</p>
                  <button style={{ background: C.teal, color: C.light, border: "none", borderRadius: 100, padding: "9px 20px", fontSize: 12, fontWeight: 600, cursor: "pointer", alignSelf: "flex-start" }}>{card.cta}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main export
export default function ServiceGroups() {
  return (
    <section
      style={{
        // Alternating teal band background to match the design
        background: C.teal,
        padding: "64px 32px",
      }}
    >
      <div className="max-w-5xl mx-auto" style={{ display: "flex", flexDirection: "column", gap: 56 }}>

        {/* Desktop rows */}
        <div className="sg-desktop">
          {serviceGroups.map((group, gi) => (
            <div key={group.id} style={{ marginBottom: gi < serviceGroups.length - 1 ? 48 : 0 }}>
              <ServiceGroupRow group={group} groupIdx={gi} />
            </div>
          ))}
        </div>

        {/* Mobile stack */}
        <div className="sg-mobile" style={{ display: "none" }}>
          <MobileServiceGroups />
        </div>

      </div>

      <style>{`
        @media (max-width: 860px) {
          .sg-desktop { display: none !important; }
          .sg-mobile  { display: block !important; }
        }
      `}</style>
    </section>
  );
}