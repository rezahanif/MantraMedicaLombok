import Link from "next/link";
import { Stethoscope, Building2 } from "lucide-react";
import { C } from "@/lib/constants";

export default function Vision() {
  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ backgroundColor: C.light }}
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            ${C.teal} 0px,
            ${C.teal} 1px,
            transparent 1px,
            transparent 40px
          )`,
        }}
        aria-hidden
      />

      {/* Decorative radial */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.06] pointer-events-none"
        style={{ background: `radial-gradient(circle, ${C.teal}, transparent 70%)` }}
        aria-hidden
      />

      <div className="relative z-10 container mx-auto px-6 text-center max-w-3xl">
        <p
          className="text-xs uppercase tracking-[0.3em] font-semibold mb-3"
          style={{ color: C.teal }}
        >
          Looking Ahead
        </p>

        <h2
          className="font-display text-4xl md:text-5xl font-bold mb-8"
          style={{ color: C.dark }}
        >
          Our Vision
        </h2>

        <p
          className="text-base md:text-lg leading-relaxed mb-12"
          style={{ color: `${C.dark}bb` }}
        >
          We aspire to transform Senaru into a premier Wellness Tourism
          destination in Indonesia. By integrating emergency medical care,
          laboratory diagnostics, and therapeutic recovery, we want every
          visitor to leave Senaru feeling healthier and more revitalized than
          when they arrived.
        </p>

        {/* Mission quote */}
        <div
          className="relative py-8 px-8 md:px-12 rounded-2xl mb-12"
          style={{
            background: `linear-gradient(135deg, ${C.cardDark}, ${C.cardMid})`,
            border: `1px solid ${C.border}`,
          }}
        >
          <span
            className="absolute -top-5 left-1/2 -translate-x-1/2 text-6xl font-serif leading-none select-none"
            style={{ color: C.teal }}
            aria-hidden
          >
            "
          </span>
          <p
            className="font-display text-xl md:text-2xl font-semibold leading-snug"
            style={{ color: C.light }}
          >
            Your safety is our mission.{" "}
            <span style={{ color: C.tealLight }}>
              Your recovery is our passion.
            </span>
          </p>
        </div>

        {/* CTA sub-heading */}
        <p
          className="text-base font-medium mb-6"
          style={{ color: `${C.dark}99` }}
        >
          Want to learn more or plan your visit?
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
            style={{
              backgroundColor: C.teal,
              color: C.light,
              boxShadow: `0 4px 20px ${C.teal}44`,
            }}
          >
            <Building2 size={16} aria-hidden />
            Explore Our Facilities
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm border transition-all duration-300 hover:scale-[1.03]"
            style={{
              borderColor: C.teal,
              color: C.teal,
              backgroundColor: "transparent",
            }}
          >
            <Stethoscope size={16} aria-hidden />
            Contact Our Medical Team
          </Link>
        </div>
      </div>
    </section>
  );
}