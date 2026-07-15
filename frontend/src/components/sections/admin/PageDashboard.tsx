'use client';

import React, { useState, useEffect } from "react";
import { useTheme, useIsMobile } from "./AdminContext";
import { supabase } from "@/lib/supabase";
import { StatCard } from "./StatCard";
import { icons } from "./AdminIcons";
import { INITIAL_SERVICES, REVIEWS_DATA, APPOINTMENTS_DATA } from "./AdminConstants";

// Local helper matching the original PageDashboard logic
const getStatusColorLocal = (s: string, dark: boolean) => {
  const colors: Record<string, { bg: string; color: string }> = {
    confirmed: dark ? { bg: "#1B3530", color: "#6FC4B8" } : { bg: "#E8F5F2", color: "#4A7D72" },
    pending:   dark ? { bg: "#2A2010", color: "#C9933A" } : { bg: "#FEF6E8", color: "#B07B1A" },
    done:      dark ? { bg: "#111A30", color: "#5B85D4" } : { bg: "#EAF0FF", color: "#3B5FC0" },
    cancelled: dark ? { bg: "#2A1110", color: "#D4706A" } : { bg: "#FDECEA", color: "#B03A35" },
  };
  return colors[s] || (dark ? { bg: "#1E2D2B", color: "#A0B3B0" } : { bg: "#F0F0F0", color: "#666" });
};

export const PageDashboard: React.FC = () => {
  const { T, dark, setPage } = useTheme();
  const isMobile = useIsMobile();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await supabase
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false });
        if (data) {
          setAppointments(
            data.map((d: any) => ({
              id: d.id,
              name: d.nama_lengkap,
              wa: d.whatsapp,
              service: d.service_type,
              date: d.preferred_date,
              time: d.preferred_time,
              note: d.notes,
              status: d.status || 'pending',
            }))
          );
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const today = appointments.filter((a) => a.date === new Date().toISOString().split('T')[0]);
  const pending = appointments.filter((a) => a.status === "pending").length;
  const pendingReviews = REVIEWS_DATA.filter((r) => !r.visible).length;
  const recent = appointments.slice(0, 5);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 700, color: T.text, margin: 0 }}>Dashboard</h1>
        <p style={{ fontSize: 13, color: T.textMuted, margin: "4px 0 0" }}>Welcome back — here's what's happening today</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
        <StatCard label="Today" value={today.length} sub="appointments" iconD={icons.calendar} iconBg={dark ? "#1B3530" : "#E8F5F2"} />
        <StatCard label="Pending" value={pending} sub="bookings" subColor={pending > 0 ? T.amber : T.teal} iconD={icons.plus} iconBg={dark ? "#2A2010" : "#FEF3E8"} />
        <StatCard label="Reviews" value={pendingReviews} sub={pendingReviews > 0 ? "need review" : "all published"} iconD={icons.star} iconBg={dark ? "#1E1530" : "#F5F0FF"} />
        <StatCard label="Services" value={INITIAL_SERVICES.filter((s) => s.active).length} sub="active" iconD={icons.service} iconBg={dark ? "#1B3530" : "#E8F5F2"} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.5fr 1fr", gap: 14 }}>
        {/* Upcoming */}
        <div style={{ background: T.surface, borderRadius: 16, border: `1px solid ${T.border}`, padding: "18px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: T.text, margin: 0 }}>Upcoming Appointments</h3>
            <button onClick={() => setPage("Appointments")} style={{ fontSize: 12, color: T.teal, background: "none", border: "none", cursor: "pointer", fontWeight: 600, fontFamily: "inherit", padding: 0 }}>See all →</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {APPOINTMENTS_DATA.slice(0, 5).map((a) => (
              <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 11px", background: T.surface2, borderRadius: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: T.teal, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12, flexShrink: 0 }}>
                  {a.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: T.text, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.name}</p>
                  <p style={{ fontSize: 11, color: T.textMuted, margin: 0 }}>{a.service} · {a.time}</p>
                </div>
                <span style={{ ...getStatusColorLocal(a.status, dark), fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 20, flexShrink: 0 }}>{a.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent appointments (right panel) */}
        <div style={{ background: T.surface, borderRadius: 16, border: `1px solid ${T.border}`, padding: "18px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: T.text, margin: 0 }}>Recent Appointments</h3>
            <button onClick={() => setPage("Appointments")} style={{ fontSize: 12, color: T.teal, background: "none", border: "none", cursor: "pointer", fontWeight: 600, fontFamily: "inherit", padding: 0 }}>All →</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {recent.map((a) => (
              <div key={a.id} style={{ padding: "9px 11px", background: T.surface2, borderRadius: 10, borderLeft: `3px solid ${getStatusColorLocal(a.status, dark).color}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: T.text, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "60%" }}>{a.name}</p>
                  <span style={{ fontSize: 10, fontWeight: 700, ...getStatusColorLocal(a.status, dark), padding: "1px 7px", borderRadius: 20, flexShrink: 0 }}>{a.status}</span>
                </div>
                <p style={{ fontSize: 11, color: T.textMid, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.service} · {a.date} {a.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
