'use client';

import React, { useState, useEffect } from "react";
import { useTheme, useIsMobile } from "./AdminContext";
import { useBookingToast } from "@/components/shared/Bookingtoast";
import { supabase } from "@/lib/supabase";
import { ConfirmModal } from "./ConfirmModal";
import { Icon, icons } from "./AdminIcons";

// Local helper matching original logic
const getStatusColorLocal = (s: string, dark: boolean) => {
  const colors: Record<string, { bg: string; color: string }> = {
    confirmed: dark ? { bg: "#1B3530", color: "#6FC4B8" } : { bg: "#E8F5F2", color: "#4A7D72" },
    pending:   dark ? { bg: "#2A2010", color: "#C9933A" } : { bg: "#FEF6E8", color: "#B07B1A" },
    done:      dark ? { bg: "#111A30", color: "#5B85D4" } : { bg: "#EAF0FF", color: "#3B5FC0" },
    cancelled: dark ? { bg: "#2A1110", color: "#D4706A" } : { bg: "#FDECEA", color: "#B03A35" },
  };
  return colors[s] || (dark ? { bg: "#1E2D2B", color: "#A0B3B0" } : { bg: "#F0F0F0", color: "#666" });
};

export const PageAppointments: React.FC = () => {
  const { T, dark } = useTheme();
  const toast = useBookingToast();
  const isMobile = useIsMobile();
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbServices, setDbServices] = useState<string[]>([]);
  const [confirm, setConfirm] = useState<{
    title: string;
    msg: string;
    action: () => void;
    danger?: boolean;
  } | null>(null);

  const [form, setForm] = useState({
    name: "",
    wa: "",
    service: "",
    date: "",
    time: "",
    note: "",
  });

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await supabase
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false });
        if (data) {
          setRows(
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

  // Fetch active services from Supabase
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await supabase
          .from('services')
          .select('name, is_active')
          .eq('is_active', true)
          .order('id', { ascending: true });
        if (data) {
          const serviceNames = data.map((s: any) => s.name);
          setDbServices(serviceNames);
          if (serviceNames.length > 0) {
            setForm((p) => ({ ...p, service: serviceNames[0] }));
          }
        }
      } catch (err) {
        console.error('Failed to fetch services:', err);
      }
    };
    fetchServices();
  }, []);

  const statuses = ["All", "pending", "confirmed", "done", "cancelled"];
  const filtered = rows.filter(
    (r) =>
      (filter === "All" || r.status === filter) &&
      (r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.service.toLowerCase().includes(search.toLowerCase()))
  );

  const inp: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 9,
    border: `1.5px solid ${T.border}`,
    fontSize: 13,
    outline: "none",
    boxSizing: "border-box",
    color: T.text,
    background: T.surface2,
    fontFamily: "inherit",
  };

  return (
    <div>
      {confirm && (
        <ConfirmModal
          title={confirm.title}
          message={confirm.msg}
          danger={confirm.danger}
          confirmLabel={confirm.danger ? "Delete" : "Confirm"}
          onConfirm={() => {
            confirm.action();
            setConfirm(null);
          }}
          onCancel={() => setConfirm(null)}
        />
      )}
      <div
        style={{
          display: "flex",
          alignItems: isMobile ? "flex-start" : "center",
          justifyContent: "space-between",
          marginBottom: 22,
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? 12 : 0,
        }}
      >
        <div>
          <h1 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 700, color: T.text, margin: 0 }}>Appointments</h1>
          <p style={{ fontSize: 13, color: T.textMuted, margin: "4px 0 0" }}>Manage patient bookings</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            background: T.teal,
            color: "#fff",
            border: "none",
            borderRadius: 10,
            padding: "10px 18px",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          <Icon d={icons.plus} color="#fff" size={14} /> New Booking
        </button>
      </div>

      {showForm && (
        <div style={{ background: T.surface, borderRadius: 16, border: `1px solid ${T.border}`, padding: "20px 22px", marginBottom: 18 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: T.text, margin: "0 0 14px" }}>New Appointment</h3>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12 }}>
            {(
              [
                ["Full Name", "name", "text"],
                ["WhatsApp Number", "wa", "text"],
              ] as [string, "name" | "wa", string][]
            ).map(([lbl, key, type]) => (
              <div key={key}>
                <label style={{ fontSize: 11, color: T.textMuted, display: "block", marginBottom: 4, fontWeight: 600, textTransform: "uppercase" }}>{lbl}</label>
                <input
                  type={type}
                  value={form[key]}
                  onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                  style={inp}
                />
              </div>
            ))}
            <div>
              <label style={{ fontSize: 11, color: T.textMuted, display: "block", marginBottom: 4, fontWeight: 600, textTransform: "uppercase" }}>Service</label>
              <select
                value={form.service}
                onChange={(e) => setForm((p) => ({ ...p, service: e.target.value }))}
                style={{ ...inp, appearance: "none" }}
              >
                {dbServices.length > 0 ? (
                  dbServices.map((s) => <option key={s}>{s}</option>)
                ) : (
                  <option disabled>Loading services...</option>
                )}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 11, color: T.textMuted, display: "block", marginBottom: 4, fontWeight: 600, textTransform: "uppercase" }}>Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
                style={{ ...inp, colorScheme: dark ? "dark" : "light" }}
              />
            </div>
            <div>
              <label style={{ fontSize: 11, color: T.textMuted, display: "block", marginBottom: 4, fontWeight: 600, textTransform: "uppercase" }}>Time</label>
              <input
                type="time"
                value={form.time}
                onChange={(e) => setForm((p) => ({ ...p, time: e.target.value }))}
                style={{ ...inp, colorScheme: dark ? "dark" : "light" }}
              />
            </div>
            <div style={{ gridColumn: "1/-1" }}>
              <label style={{ fontSize: 11, color: T.textMuted, display: "block", marginBottom: 4, fontWeight: 600, textTransform: "uppercase" }}>Notes</label>
              <textarea
                value={form.note}
                onChange={(e) => setForm((p) => ({ ...p, note: e.target.value }))}
                rows={2}
                style={{ ...inp, resize: "vertical" }}
              />
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <button
              onClick={async () => {
                if (!form.name || !form.wa) return;
                try {
                  const { data: { user } } = await supabase.auth.getUser();
                  if (!user) {
                    toast.error("Not authenticated");
                    return;
                  }
                  const { data, error } = await supabase
                    .from('leads')
                    .insert([
                      {
                        user_id: user.id,
                        nama_lengkap: form.name,
                        whatsapp: form.wa,
                        service_type: form.service,
                        preferred_date: form.date,
                        preferred_time: form.time,
                        notes: form.note,
                        status: "pending",
                      },
                    ])
                    .select();
                  if (error) throw error;
                  if (data) {
                    setRows((p) => [
                      ...p,
                      {
                        id: data[0].id,
                        name: data[0].nama_lengkap,
                        wa: data[0].whatsapp,
                        service: data[0].service_type,
                        date: data[0].preferred_date,
                        time: data[0].preferred_time,
                        note: data[0].notes,
                        status: data[0].status,
                      },
                    ]);
                    toast.success('Appointment berhasil ditambahkan');
                  }
                  setForm({
                    name: "",
                    wa: "",
                    service: dbServices[0] || "",
                    date: "",
                    time: "",
                    note: "",
                  });
                  setShowForm(false);
                } catch (err) {
                  console.error(err);
                  toast.error('Gagal tambah appointment');
                }
              }}
              style={{
                background: T.teal,
                color: "#fff",
                border: "none",
                borderRadius: 9,
                padding: "10px 22px",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Submit
            </button>
            <button
              onClick={() => setShowForm(false)}
              style={{
                background: T.surface2,
                color: T.textMid,
                border: `1px solid ${T.border}`,
                borderRadius: 9,
                padding: "10px 22px",
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 180 }}>
          <div style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
            <Icon d={icons.search} color={T.textMuted} size={14} />
          </div>
          <input
            placeholder="Search…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ ...inp, padding: "9px 12px 9px 34px" }}
          />
        </div>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              style={{
                padding: "7px 12px",
                borderRadius: 8,
                fontSize: 11,
                fontWeight: 600,
                cursor: "pointer",
                border: "none",
                fontFamily: "inherit",
                background: filter === s ? T.teal : T.surface2,
                color: filter === s ? "#fff" : T.textMid,
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {isMobile ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map((r) => (
            <div key={r.id} style={{ background: T.surface, borderRadius: 14, border: `1px solid ${T.border}`, padding: "14px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: "50%",
                      background: T.teal,
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {r.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: T.text, margin: 0 }}>{r.name}</p>
                    <p style={{ fontSize: 11, color: T.textMuted, margin: 0 }}>{r.wa}</p>
                  </div>
                </div>
                <span style={{ ...getStatusColorLocal(r.status, dark), fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 20 }}>
                  {r.status}
                </span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, fontSize: 12, color: T.textMid, marginBottom: 10 }}>
                <span>{r.service}</span>
                <span>
                  {r.date} · {r.time}
                </span>
                {r.note && <span style={{ gridColumn: "1/-1", color: T.textMuted, fontStyle: "italic" }}>{r.note}</span>}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {r.status === "pending" && (
                  <button
                    onClick={() =>
                      setConfirm({
                        title: "Confirm Appointment",
                        msg: `Confirm for ${r.name}?`,
                        action: async () => {
                          try {
                            const { data: { user } } = await supabase.auth.getUser();
                            if (!user) {
                              toast.error("Not authenticated");
                              return;
                            }
                            const { error } = await supabase.from('leads').update({ status: 'confirmed' }).eq('id', r.id);
                            if (error) throw error;
                            setRows((p) => p.map((x) => (x.id === r.id ? { ...x, status: "confirmed" } : x)));
                            toast.success('Appointment confirmed');
                          } catch (err) {
                            console.error("Confirm error:", err);
                            toast.error('Failed to confirm');
                          }
                        },
                      })
                    }
                    style={{
                      flex: 1,
                      padding: "8px",
                      borderRadius: 8,
                      background: dark ? "#1B3530" : "#E8F5F2",
                      color: T.tealDk,
                      border: "none",
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    Confirm
                  </button>
                )}
                <button
                  onClick={() =>
                    setConfirm({
                      title: "Delete Appointment",
                      msg: `Delete for ${r.name}?`,
                      danger: true,
                      action: async () => {
                        try {
                          const { data: { user } } = await supabase.auth.getUser();
                          if (!user) {
                            toast.error("Not authenticated");
                            return;
                          }
                          const { data: appointmentCheck } = await supabase
                            .from('leads')
                            .select('id, user_id')
                            .eq('id', r.id)
                            .single();
                          if (!appointmentCheck) {
                            console.error("Appointment not found in DB!");
                            toast.error("Appointment not found");
                            return;
                          }
                          const { error } = await supabase.from('leads').delete().eq('id', r.id);
                          if (error) throw error;
                          setRows((p) => p.filter((x) => x.id !== r.id));
                          toast.success('Appointment berhasil dihapus');
                        } catch (err) {
                          console.error("Delete catch error:", err);
                          toast.error('Gagal hapus appointment');
                        }
                      },
                    })
                  }
                  style={{
                    flex: 1,
                    padding: "8px",
                    borderRadius: 8,
                    background: dark ? "#2A1110" : "#FDECEA",
                    color: "#D95E57",
                    border: "none",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p style={{ textAlign: "center", color: T.textMuted, padding: "40px 0", fontSize: 14 }}>
              No appointments found
            </p>
          )}
        </div>
      ) : (
        <div style={{ background: T.surface, borderRadius: 16, border: `1px solid ${T.border}`, overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: T.surface2 }}>
                  {["Patient", "WhatsApp", "Service", "Date & Time", "Notes", "Status", "Actions"].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "11px 14px",
                        textAlign: "left",
                        fontSize: 10,
                        fontWeight: 700,
                        color: T.textMuted,
                        textTransform: "uppercase",
                        letterSpacing: "0.6px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => (
                  <tr key={r.id} style={{ borderTop: `1px solid ${T.border}`, background: i % 2 === 0 ? T.surface : T.surface2 }}>
                    <td style={{ padding: "12px 14px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                        <div
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: "50%",
                            background: T.teal,
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 10,
                            fontWeight: 700,
                            flexShrink: 0,
                          }}
                        >
                          {r.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2)}
                        </div>
                        <span style={{ fontWeight: 600, color: T.text }}>{r.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: "12px 14px", color: T.textMid }}>{r.wa}</td>
                    <td style={{ padding: "12px 14px" }}>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          padding: "3px 9px",
                          borderRadius: 20,
                          background:
                            r.service === "Medical Checkup"
                              ? dark ? "#1B3530" : "#E8F5F2"
                              : r.service === "Spa & Recovery"
                              ? dark ? "#2A1E14" : "#F5EDE8"
                              : dark ? "#2A1110" : "#FDECEA",
                          color:
                            r.service === "Medical Checkup"
                              ? T.tealDk
                              : r.service === "Spa & Recovery"
                              ? dark ? "#C9933A" : "#7B4A2A"
                              : "#D95E57",
                        }}
                      >
                        {r.service}
                      </span>
                    </td>
                    <td style={{ padding: "12px 14px", color: T.textMid, whiteSpace: "nowrap" }}>
                      {r.date} · {r.time}
                    </td>
                    <td style={{ padding: "12px 14px", color: T.textMid, maxWidth: 150, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {r.note || "—"}
                    </td>
                    <td style={{ padding: "12px 14px" }}>
                      <span style={{ ...getStatusColorLocal(r.status, dark), fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 20 }}>
                        {r.status}
                      </span>
                    </td>
                    <td style={{ padding: "12px 14px" }}>
                      <div style={{ display: "flex", gap: 6 }}>
                        {r.status === "pending" && (
                          <button
                            onClick={() =>
                              setConfirm({
                                title: "Confirm Appointment",
                                msg: `Confirm for ${r.name}?`,
                                action: async () => {
                                  try {
                                    const { data: { user } } = await supabase.auth.getUser();
                                    if (!user) {
                                      toast.error("Not authenticated");
                                      return;
                                    }
                                    const { error } = await supabase.from('leads').update({ status: 'confirmed' }).eq('id', r.id);
                                    if (error) throw error;
                                    setRows((p) => p.map((x) => (x.id === r.id ? { ...x, status: "confirmed" } : x)));
                                    toast.success('Appointment confirmed');
                                  } catch (err) {
                                    console.error("Confirm error:", err);
                                    toast.error('Failed to confirm');
                                  }
                                },
                              })
                            }
                            style={{
                              padding: "5px 10px",
                              borderRadius: 7,
                              background: dark ? "#1B3530" : "#E8F5F2",
                              color: T.tealDk,
                              border: "none",
                              fontSize: 11,
                              fontWeight: 600,
                              cursor: "pointer",
                              fontFamily: "inherit",
                            }}
                          >
                            Confirm
                          </button>
                        )}
                        <button
                          onClick={() =>
                            setConfirm({
                              title: "Delete Appointment",
                              danger: true,
                              msg: `Delete for ${r.name}?`,
                              action: async () => {
                                try {
                                  const { data: { user } } = await supabase.auth.getUser();
                                  if (!user) {
                                    toast.error("Not authenticated");
                                    return;
                                  }
                                  const { data: appointmentCheck } = await supabase
                                    .from('leads')
                                    .select('id, user_id')
                                    .eq('id', r.id)
                                    .single();
                                  if (!appointmentCheck) {
                                    console.error("Appointment not found in DB!");
                                    toast.error("Appointment not found");
                                    return;
                                  }
                                  const { error } = await supabase.from('leads').delete().eq('id', r.id);
                                  if (error) throw error;
                                  setRows((p) => p.filter((x) => x.id !== r.id));
                                  toast.success('Appointment berhasil dihapus');
                                } catch (err) {
                                  console.error("Delete catch error:", err);
                                  toast.error('Gagal hapus appointment');
                                }
                              },
                            })
                          }
                          style={{
                            padding: "5px 10px",
                            borderRadius: 7,
                            background: dark ? "#2A1110" : "#FDECEA",
                            color: "#D95E57",
                            border: "none",
                            fontSize: 11,
                            fontWeight: 600,
                            cursor: "pointer",
                            fontFamily: "inherit",
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} style={{ padding: "40px", textAlign: "center", color: T.textMuted, fontSize: 14 }}>
                      No appointments found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
