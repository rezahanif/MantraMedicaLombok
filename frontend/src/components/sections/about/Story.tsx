import Image from "next/image";
import { C } from "@/lib/constants";

export default function Story() {
  return (
    <>
      {/* ─── Story Row ─── */}
      <section
        className="py-20 overflow-hidden"
        style={{ backgroundColor: C.light }}
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Doctor image with decorative circle */}
            <div className="relative flex justify-center md:justify-start">
              <div
                className="relative w-72 h-72 md:w-80 md:h-80 rounded-full flex items-end justify-center overflow-hidden"
                style={{ backgroundColor: `${C.teal}30` }}
              >
                {/* Decorative circle rings */}
                <div
                  className="absolute -top-4 -left-4 w-20 h-20 rounded-full border-2 opacity-30"
                  style={{ borderColor: C.teal }}
                  aria-hidden
                />
                <div
                  className="absolute top-8 -right-6 w-10 h-10 rounded-full opacity-60"
                  style={{ backgroundColor: C.teal }}
                  aria-hidden
                />

                <Image
                  src="/assets/images/team/dr-nyoman.jpg"
                  alt="dr. Nyoman Ardyatri Kairavini"
                  width={320}
                  height={360}
                  className="object-cover object-top rounded-b-full"
                  style={{ maxHeight: "90%" }}
                />
              </div>
              {/* Name tag */}
              <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-0 text-xs px-4 py-2 rounded-full shadow-lg whitespace-nowrap"
                style={{
                  backgroundColor: C.dark,
                  color: C.tealLight,
                  border: `1px solid ${C.border}`,
                }}
              >
                dr. Nyoman Ardyatri Kairavini
              </div>
            </div>

            {/* Story text */}
            <div>
              <p
                className="text-xs uppercase tracking-[0.3em] font-semibold mb-3"
                style={{ color: C.teal }}
              >
                Our Story
              </p>
              <h2
                className="font-display text-4xl md:text-5xl font-bold mb-8"
                style={{ color: C.dark }}
              >
                Our Story
              </h2>
              <p
                className="text-base md:text-lg leading-relaxed"
                style={{ color: `${C.dark}cc` }}
              >
                Mantra Medica was founded on the realization that the journey to
                Rinjani's summit—or even the trek to Senaru's waterfalls—demands
                peak physical resilience. We identified a vital need for a medical
                service that is not only responsive in emergencies but also provides
                a premium recovery experience for travelers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Name Meaning Quote ─── */}
      <section
        className="py-16 relative overflow-hidden"
        style={{ backgroundColor: C.teal }}
      >
        {/* Background texture circles */}
        <div
          className="absolute -left-24 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-10"
          style={{ backgroundColor: C.light }}
          aria-hidden
        />
        <div
          className="absolute -right-16 -bottom-16 w-48 h-48 rounded-full opacity-10"
          style={{ backgroundColor: C.dark }}
          aria-hidden
        />

        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-center">
            {/* Quote text */}
            <div className="relative">
              <span
                className="absolute -top-6 -left-2 text-7xl font-serif opacity-20 leading-none select-none"
                style={{ color: C.light }}
                aria-hidden
              >
                "
              </span>
              <p
                className="text-base md:text-lg leading-relaxed relative z-10"
                style={{ color: C.light }}
              >
                The name{" "}
                <strong className="font-bold">"Mantra"</strong> reflects our
                intention of peace and mindfulness in healing, while{" "}
                <strong className="font-bold">"Medica"</strong> affirms our
                commitment to evidence-based medical science. We are proud to
                continue a legacy of dedicated care in this region, enhanced by
                modern facilities and a design that honors the natural beauty of
                North Lombok.
              </p>
              <span
                className="block text-right text-7xl font-serif opacity-20 leading-none select-none -mt-4"
                style={{ color: C.light }}
                aria-hidden
              >
                "
              </span>
            </div>

            {/* Logo */}
            <div className="flex flex-col items-center gap-2 min-w-[120px]">
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${C.light}22` }}
              >
                {/* Placeholder logo mark — replace with actual <Image> */}
                <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none">
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
              <div className="text-center">
                <p className="font-display font-bold text-sm" style={{ color: C.light }}>
                  mantra medica
                </p>
                <p className="text-xs opacity-60" style={{ color: C.light }}>
                  your health journey
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}