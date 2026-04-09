"use client";

import { MapPin, Activity, Users } from "lucide-react";
import { differentiators } from "@/data/differentiators";
import { C } from "@/lib/constants";

const iconMap: Record<string, React.ReactNode> = {
  MapPin: <MapPin size={18} />,
  Activity: <Activity size={18} />,
  Users: <Users size={18} />,
};

export default function WhatSetsUsApart() {
  return (
    <section className="py-24" style={{ backgroundColor: C.light }}>
      <div className="container mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <p
            className="text-xs uppercase tracking-[0.3em] font-semibold mb-4"
            style={{ color: C.teal }}
          >
            Our Edge
          </p>
          <h2
            className="font-display text-4xl md:text-5xl font-bold"
            style={{ color: C.dark }}
          >
            What Set Us Apart
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {differentiators.map((item, idx) => (
            <div
              key={item.id}
              className="relative rounded-2xl overflow-hidden flex flex-col justify-between min-h-[320px] group"
              style={{
                backgroundColor: item.hasBgImage ? undefined : idx % 2 === 0 ? C.cardDark : C.cardMid,
                border: `1px solid ${C.border}`,
              }}
            >
              {/* Background image for the middle card */}
              {item.hasBgImage && (
                <>
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url('${item.bgImage}')`,
                      filter: "brightness(0.5)",
                    }}
                    aria-hidden
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(180deg, ${C.cardMid}aa 0%, ${C.cardDark}ee 100%)`,
                    }}
                    aria-hidden
                  />
                </>
              )}

              {/* Card content */}
              <div className="relative z-10 p-6 flex flex-col h-full">
                {/* Icon + Title */}
                <div className="mb-4">
                  <div
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold mb-3"
                    style={{ color: C.tealLight }}
                  >
                    {iconMap[item.icon]}
                    <span>{item.title}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-col gap-2 flex-1">
                  {item.tags.map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center gap-2 text-sm"
                      style={{ color: `${C.light}cc` }}
                    >
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${C.teal}33` }}
                      >
                        <svg
                          viewBox="0 0 12 12"
                          className="w-3 h-3"
                          fill="none"
                          aria-hidden
                        >
                          <circle cx="6" cy="6" r="5" stroke={C.teal} strokeWidth="1.5" />
                          <path d="M4 6l1.5 1.5L8 4.5" stroke={C.teal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      {tag}
                    </div>
                  ))}
                </div>

                {/* Description */}
                <p
                  className="mt-6 text-sm leading-relaxed border-t pt-4"
                  style={{ color: `${C.light}88`, borderColor: C.border }}
                >
                  {item.description}
                </p>
              </div>

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ boxShadow: `inset 0 0 40px ${C.teal}22` }}
                aria-hidden
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}