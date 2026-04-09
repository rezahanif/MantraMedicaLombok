import Image from "next/image";
import { teamMembers } from "@/data/team";
import { C } from "@/lib/constants";

export default function MeetTeam() {
  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{ backgroundColor: C.dark }}
    >
      {/* Earthy texture overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/assets/images/team-bg-texture.jpg')" }}
        aria-hidden
      />

      {/* Top border glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${C.teal}66, transparent)` }}
        aria-hidden
      />

      <div className="relative z-10 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left – Text */}
          <div>
            <p
              className="text-xs uppercase tracking-[0.3em] font-semibold mb-4"
              style={{ color: C.tealLight }}
            >
              Our People
            </p>
            <h2
              className="font-display text-4xl md:text-5xl font-bold mb-8"
              style={{ color: C.light }}
            >
              Meet Our Medical Team
            </h2>

            <p
              className="text-base md:text-lg leading-relaxed mb-6"
              style={{ color: `${C.light}bb` }}
            >
              Your trust is our greatest priority. Mantra Medica is managed by
              medical professionals who understand the unique physical challenges
              of mountain terrain.
            </p>

            <div
              className="w-12 h-0.5 mb-4"
              style={{ backgroundColor: C.teal }}
              aria-hidden
            />

            <p
              className="text-base md:text-lg leading-relaxed"
              style={{ color: `${C.light}88` }}
            >
              Supported by a team of professional nurses and therapists, we
              ensure every patient receives care that is personal, compassionate,
              and effective.
            </p>
          </div>

          {/* Right – Team photos */}
          <div className="flex gap-4 justify-center md:justify-end items-end">
            {teamMembers.map((member, idx) => (
              <div
                key={member.id}
                className="relative group flex-1 max-w-[200px]"
                style={{ marginBottom: idx === 0 ? "24px" : "0" }}
              >
                {/* Photo container */}
                <div
                  className="rounded-2xl overflow-hidden aspect-[3/4] relative"
                  style={{ border: `1px solid ${C.border}` }}
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Gradient fade at bottom */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1/3"
                    style={{
                      background: `linear-gradient(to top, ${C.dark}, transparent)`,
                    }}
                    aria-hidden
                  />
                </div>

                {/* Name tag */}
                <div
                  className="mt-3 px-3 py-2 rounded-xl text-center"
                  style={{
                    backgroundColor: `${C.cardMid}88`,
                    border: `1px solid ${C.border}`,
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <p
                    className="text-xs font-semibold leading-snug"
                    style={{ color: C.light }}
                  >
                    {member.name}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: C.tealLight }}
                  >
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}