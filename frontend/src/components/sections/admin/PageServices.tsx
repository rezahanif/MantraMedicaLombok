'use client';

import React, { useState, useEffect } from "react";
import { useTheme, useIsMobile } from "./AdminContext";
import { useBookingToast } from "@/components/shared/Bookingtoast";
import { supabase } from "@/lib/supabase";
import { ConfirmModal } from "./ConfirmModal";
import { Icon, icons } from "./AdminIcons";
import { INITIAL_SERVICES } from "./AdminConstants";

export const PageServices: React.FC = () => {
  const { T, dark } = useTheme();
  const isMobile = useIsMobile();
  const toast = useBookingToast();
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<typeof INITIAL_SERVICES[0] | null>(null);
  const [confirm, setConfirm] = useState<{ id: number; name: string } | null>(null);
  const [loading, setLoading] = useState(true);

  const COLORS = ["#65A396", "#604C3A", "#D95E57", "#5B85D4", "#8B6DB0", "#E8A444"];
  const emptyForm = { name: "", tag: "", hours: "", desc: "", color: "#65A396", active: true };
  const [form, setForm] = useState(emptyForm);

  const getColorByIndex = (index: number) => COLORS[index % COLORS.length];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await supabase.from('services').select('*').order('id', { ascending: true });
        if (data) {
          setServices(
            data.map((d: any, idx: number) => ({
              id: d.id,
              name: d.name,
              tag: d.tag || '',
              hours: d.hours || '',
              desc: d.description || '',
              color: getColorByIndex(idx),
              active: d.is_active === true,
            }))
          );
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const openAdd = () => {
    setEditItem(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (s: typeof INITIAL_SERVICES[0]) => {
    setEditItem(s);
    setForm({
      name: s.name,
      tag: s.tag,
      hours: s.hours,
      desc: s.desc,
      color: s.color,
      active: s.active,
    });
    setShowForm(true);
  };

  const save = async () => {
    if (!form.name) return;
    try {
      if (editItem) {
        const { error } = await supabase
          .from('services')
          .update({
            name: form.name,
            tag: form.tag,
            hours: form.hours,
            description: form.desc,
            is_active: form.active,
          })
          .eq('id', editItem.id);
        if (error) throw error;
        setServices((p) => p.map((x) => (x.id === editItem.id ? { ...x, ...form } : x)));
        toast.success('Service updated');
      } else {
        const { data, error } = await supabase
          .from('services')
          .insert([
            {
              name: form.name,
              tag: form.tag,
              hours: form.hours,
              description: form.desc,
              is_active: form.active,
            },
          ])
          .select();

        if (error) throw error;
        if (!data || data.length === 0) {
          toast.error('Insert returned no data');
          return;
        }
        setServices((p) => [
          ...p,
          {
            id: data[0].id,
            name: data[0].name,
            tag: data[0].tag || '',
            hours: data[0].hours || '',
            desc: data[0].description || '',
            color: getColorByIndex(p.length),
            active: data[0].is_active || true,
          },
        ]);
        toast.success('Service added');
      }
      setShowForm(false);
      setForm(emptyForm);
    } catch (err: any) {
      console.error(err);
      toast.error('Failed to save service: ' + err.message);
    }
  };

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
          title="Delete Service"
          message={`Delete "${confirm.name}"? This cannot be undone.`}
          danger
          onConfirm={async () => {
            try {
              const { error } = await supabase.from('services').delete().eq('id', confirm.id);
              if (error) throw error;
              setServices((p) => p.filter((x) => x.id !== confirm.id));
              toast.success('Service deleted');
            } catch (err) {
              console.error(err);
              toast.error('Failed to delete service');
            }
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
          gap: 12,
        }}
      >
        <div>
          <h1 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 700, color: T.text, margin: 0 }}>Services</h1>
          <p style={{ fontSize: 13, color: T.textMuted, margin: "4px 0 0" }}>
            {services.filter((s) => s.active).length} active · {services.length} total
          </p>
        </div>
        <button
          onClick={openAdd}
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
          <Icon d={icons.plus} color="#fff" size={14} /> Add Service
        </button>
      </div>

      {showForm && (
        <div style={{ background: T.surface, borderRadius: 16, border: `1px solid ${T.teal}`, padding: "20px 22px", marginBottom: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: T.text, margin: "0 0 16px" }}>
            {editItem ? "Edit Service" : "New Service"}
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontSize: 11, color: T.textMuted, display: "block", marginBottom: 4, fontWeight: 600, textTransform: "uppercase" }}>Service Name</label>
              <input
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                placeholder="e.g. Medical Checkup"
                style={inp}
              />
            </div>
            <div>
              <label style={{ fontSize: 11, color: T.textMuted, display: "block", marginBottom: 4, fontWeight: 600, textTransform: "uppercase" }}>Category / Tag</label>
              <input
                value={form.tag}
                onChange={(e) => setForm((p) => ({ ...p, tag: e.target.value }))}
                placeholder="e.g. Clinic"
                style={inp}
              />
            </div>
            <div>
              <label style={{ fontSize: 11, color: T.textMuted, display: "block", marginBottom: 4, fontWeight: 600, textTransform: "uppercase" }}>Operational Hours</label>
              <input
                value={form.hours}
                onChange={(e) => setForm((p) => ({ ...p, hours: e.target.value }))}
                placeholder="e.g. 08:00 – 17:00"
                style={inp}
              />
            </div>
            <div>
              <label style={{ fontSize: 11, color: T.textMuted, display: "block", marginBottom: 4, fontWeight: 600, textTransform: "uppercase" }}>Description</label>
              <input
                value={form.desc}
                onChange={(e) => setForm((p) => ({ ...p, desc: e.target.value }))}
                placeholder="Short description..."
                style={inp}
              />
            </div>
            <div style={{ gridColumn: "1/-1", display: "flex", alignItems: "center", gap: 10, marginTop: 4 }}>
              <button
                onClick={() => setForm((p) => ({ ...p, active: !p.active }))}
                style={{
                  width: 42,
                  height: 24,
                  borderRadius: 100,
                  background: form.active ? T.teal : T.border,
                  border: "none",
                  cursor: "pointer",
                  padding: 2,
                  position: "relative",
                  transition: "background 0.25s",
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "#fff",
                    transition: "transform 0.25s",
                    transform: form.active ? "translateX(18px)" : "translateX(0)",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
                  }}
                />
              </button>
              <span style={{ fontSize: 13, color: T.textMid, fontWeight: 500 }}>Active Service</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button
              onClick={save}
              disabled={!form.name}
              style={{
                background: T.teal,
                color: "#fff",
                border: "none",
                borderRadius: 9,
                padding: "10px 24px",
                fontSize: 13,
                fontWeight: 600,
                cursor: !form.name ? "not-allowed" : "pointer",
                opacity: !form.name ? 0.55 : 1,
                fontFamily: "inherit",
              }}
            >
              Save
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setForm(emptyForm);
              }}
              style={{
                background: T.surface2,
                color: T.textMid,
                border: `1px solid ${T.border}`,
                borderRadius: 9,
                padding: "10px 20px",
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

      {loading ? (
        <p style={{ textAlign: "center", color: T.textMuted, padding: "40px 0" }}>Loading services...</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill,minmax(310px,1fr))", gap: 14 }}>
          {services.map((svc) => (
            <div
              key={svc.id}
              style={{
                background: T.surface,
                borderRadius: 16,
                border: `1.5px solid ${T.border}`,
                padding: "20px 22px",
                display: "flex",
                flexDirection: "column",
                opacity: svc.active ? 1 : 0.6,
                position: "relative",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: svc.color,
                    background: svc.color + "15",
                    padding: "3px 9px",
                    borderRadius: 20,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {svc.tag}
                </span>
                <div style={{ display: "flex", gap: 6 }}>
                  <button
                    onClick={() => openEdit(svc)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 4,
                      color: T.textMuted,
                    }}
                  >
                    <Icon d={icons.edit} color={T.textMuted} size={15} />
                  </button>
                  <button
                    onClick={() => setConfirm({ id: svc.id, name: svc.name })}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 4,
                      color: "#D95E57",
                    }}
                  >
                    <Icon d={icons.trash} color="#D95E57" size={15} />
                  </button>
                </div>
              </div>

              <h3 style={{ fontSize: 16, fontWeight: 700, color: T.text, margin: "0 0 4px" }}>{svc.name}</h3>
              <div style={{ display: "flex", alignItems: "center", gap: 5, color: T.textMuted, fontSize: 11, marginBottom: 10 }}>
                <span>⏰</span>
                <span>{svc.hours}</span>
              </div>
              <p style={{ fontSize: 12, color: T.textMid, lineHeight: 1.6, margin: "0 0 20px", flex: 1 }}>{svc.desc}</p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: 12,
                  borderTop: `1px solid ${T.border}`,
                }}
              >
                <span style={{ fontSize: 11, fontWeight: 600, color: svc.active ? T.teal : T.textMuted }}>
                  {svc.active ? "● Active & Booking" : "○ Inactive"}
                </span>

                {/* Toggle active */}
                <button
                  onClick={async () => {
                    try {
                      const { data, error } = await supabase
                        .from('services')
                        .update({ is_active: !svc.active })
                        .eq('id', svc.id)
                        .select();

                      if (error) {
                        toast.error('Failed: ' + error.message);
                        return;
                      }

                      if (!data || data.length === 0) {
                        toast.error('Update failed - 0 rows affected');
                        return;
                      }

                      const updated = data[0];
                      setServices((p) =>
                        p.map((x) =>
                          x.id === svc.id
                            ? {
                                id: x.id,
                                name: x.name,
                                tag: x.tag,
                                hours: x.hours,
                                desc: x.desc,
                                color: x.color,
                                active: updated.is_active === true,
                              }
                            : x
                        )
                      );
                      toast.success(updated.is_active ? 'Service activated' : 'Service deactivated');
                    } catch (err) {
                      console.error(err);
                      toast.error('Failed to toggle status');
                    }
                  }}
                  style={{
                    width: 38,
                    height: 20,
                    borderRadius: 100,
                    background: svc.active ? T.teal : T.border,
                    border: "none",
                    cursor: "pointer",
                    padding: 1.5,
                    position: "relative",
                    transition: "background 0.2s",
                  }}
                >
                  <div
                    style={{
                      width: 17,
                      height: 17,
                      borderRadius: "50%",
                      background: "#fff",
                      transition: "transform 0.2s",
                      transform: svc.active ? "translateX(18px)" : "translateX(0)",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                    }}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
