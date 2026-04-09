// src/components/services/ServiceStatsBar.tsx
import { C } from "@/lib/constants";
import { serviceStats } from "@/data/serviceData";

export default function ServiceStatsBar() {
  return (
    <div style={{ background: C.light, borderBottom: `1px solid ${C.border}` }} className="px-8 py-5">
      <div className="max-w-5xl mx-auto flex items-center justify-around">
        {serviceStats.map((s: typeof serviceStats[number]) => (
          <div key={s.label} className="flex flex-col items-center gap-1">
            <span style={{ fontSize: 22 }}>{s.icon}</span>
            <span style={{ color: C.dark, fontSize: 12, fontWeight: 500, letterSpacing: "0.5px", textAlign: "center" }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}