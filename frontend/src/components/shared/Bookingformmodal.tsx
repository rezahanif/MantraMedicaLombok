"use client";

// src/components/contact/BookingFormModal.tsx
//
// Usage:
//   import BookingFormModal from "@/components/contact/BookingFormModal";
//   const [open, setOpen] = useState(false);
//   <button onClick={() => setOpen(true)}>Book Now</button>
//   <BookingFormModal open={open} onClose={() => setOpen(false)} />
//
// Drop-in overlay — renders at the bottom of your layout via a portal-style
// fixed container. Pass `open` and `onClose` props from the parent.

import { useEffect, useRef, useState } from "react";
import { C } from "@/lib/constants";
import { serviceTypes } from "@/data/contactData";

/* ─── Types ──────────────────────────────────────────────── */
interface Props {
  open: boolean;
  onClose: () => void;
}

/* ─── Shared input tokens ────────────────────────────────── */
const inp: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  background: "rgba(255,255,255,0.16)",
  border: "0.5px solid rgba(255,255,255,0.28)",
  borderRadius: 10,
  padding: "10px 14px",
  color: "#FAFAFA",
  fontSize: 13,
  outline: "none",
  fontFamily: "inherit",
};

const lbl: React.CSSProperties = {
  color: "rgba(250,250,250,0.62)",
  fontSize: 11,
  display: "block",
  marginBottom: 5,
  letterSpacing: "0.3px",
};

/* ─── Component ──────────────────────────────────────────── */
export default function BookingFormModal({ open, onClose }: Props) {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    fullName: "", whatsapp: "", serviceType: "",
    preferredDate: "", preferredTime: "", additionalNotes: "",
  });
  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  /* Mount before animating in; unmount after animating out */
  useEffect(() => {
    if (open) {
      setMounted(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    } else {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 380);
      return () => clearTimeout(t);
    }
  }, [open]);

  /* Lock body scroll */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);


  if (!mounted) return null;

  return (
    <>
      <style>{`
        @keyframes bfm-fade-in  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes bfm-fade-out { from { opacity: 1; } to { opacity: 0; } }
        @keyframes bfm-slide-up   { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes bfm-slide-down { from { transform: translateY(0); }    to { transform: translateY(100%); } }
        @keyframes bfm-pop-in  { from { opacity: 0; transform: scale(0.94) translateY(12px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes bfm-pop-out { from { opacity: 1; transform: scale(1) translateY(0); }       to { opacity: 0; transform: scale(0.94) translateY(12px); } }

        .bfm-backdrop {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(15, 8, 2, 0.68);
          backdrop-filter: blur(3px);
          display: flex; align-items: center; justify-content: center;
          padding: 24px 16px;
          animation: bfm-fade-in 0.28s ease forwards;
        }
        .bfm-backdrop.bfm-out { animation: bfm-fade-out 0.32s ease forwards; }

        /* Desktop modal */
        .bfm-modal {
          position: relative;
          width: 100%; max-width: 480px;
          max-height: calc(100vh - 48px);
          border-radius: 20px; overflow: hidden; overflow-y: auto;
          background-image: url('/images/panelkayuform.webp');
          background-size: cover; background-position: center;
          display: flex; flex-direction: column;
          animation: bfm-pop-in 0.32s cubic-bezier(0.34,1.3,0.64,1) forwards;
        }
        .bfm-backdrop.bfm-out .bfm-modal { animation: bfm-pop-out 0.28s ease forwards; }

        /* Mobile bottom sheet — overrides at ≤499px */
        @media (max-width: 499px) {
          .bfm-backdrop {
            align-items: flex-end;
            padding: 0;
          }
          .bfm-modal {
            max-width: 100%;
            border-radius: 20px 20px 0 0;
            max-height: 92vh;
            animation: bfm-slide-up 0.36s cubic-bezier(0.32,0.72,0,1) forwards;
          }
          .bfm-backdrop.bfm-out .bfm-modal {
            animation: bfm-slide-down 0.3s ease forwards;
          }
        }

        /* Scrollbar inside modal */
        .bfm-modal::-webkit-scrollbar { width: 4px; }
        .bfm-modal::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 4px; }

        /* Calendar / time picker icon colour fix */
        .bfm-modal input[type="date"]::-webkit-calendar-picker-indicator,
        .bfm-modal input[type="time"]::-webkit-calendar-picker-indicator { filter: invert(1); opacity: 0.45; cursor: pointer; }

        /* Select option bg */
        .bfm-modal select option { background: #3D2208; color: #FAFAFA; }

        /* Close button hover */
        .bfm-close:hover { background: rgba(255,255,255,0.22) !important; }

        /* Mobile drag pill */
        @media (max-width: 499px) {
          .bfm-drag-pill { display: block !important; }
        }
      `}</style>

      {/* Backdrop — click outside closes */}
      <div
        ref={backdropRef}
        className={`bfm-backdrop${visible ? "" : " bfm-out"}`}
        onMouseDown={(e) => { if (e.target === backdropRef.current) onClose(); }}
      >
        <div className="bfm-modal">

          {/* Wood overlay tint */}
          <div style={{ position: "absolute", inset: 0, background: "rgba(28, 14, 4, 0.38)", pointerEvents: "none", zIndex: 0 }} />

          {/* Close button */}
          <button
            className="bfm-close"
            onClick={onClose}
            aria-label="Close"
            style={{
              position: "absolute", top: 16, right: 16, zIndex: 10,
              width: 34, height: 34, borderRadius: "50%",
              background: "rgba(255,255,255,0.14)",
              border: "0.5px solid rgba(255,255,255,0.26)",
              color: "#FAFAFA", fontSize: 18, lineHeight: 1,
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.18s",
            }}
          >
            ✕
          </button>

          {/* Mobile drag pill */}
          <div
            className="bfm-drag-pill"
            style={{
              display: "none", width: 40, height: 4, borderRadius: 2,
              background: "rgba(255,255,255,0.28)", margin: "12px auto 0",
              position: "relative", zIndex: 1,
            }}
          />

          {/* ── INNER CONTENT ── */}
          <div style={{ position: "relative", zIndex: 1, padding: "40px 40px 40px 40px" }}>
            <h2 style={{ color: "#FAFAFA", fontSize: 24, fontWeight: 700, margin: "0 0 24px", letterSpacing: "-0.3px" }}>
              Book Your Visit
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

              {/* Full Name */}
              <div>
                <label style={lbl}>Full Name</label>
                <input type="text" value={form.fullName} onChange={set("fullName")} style={inp} />
              </div>

              {/* WhatsApp */}
              <div>
                <label style={lbl}>WhatsApp Number</label>
                <input type="tel" value={form.whatsapp} onChange={set("whatsapp")} style={inp} />
              </div>

              {/* Service Type */}
              <div>
                <label style={lbl}>Service Type</label>
                <select
                  value={form.serviceType}
                  onChange={set("serviceType")}
                  style={{ ...inp, color: form.serviceType ? "#FAFAFA" : "rgba(250,250,250,0.4)", cursor: "pointer" }}
                >
                  <option value="" disabled>Select a service</option>
                  {serviceTypes.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Date + Time */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={lbl}>Preferred Date</label>
                  <input type="date" value={form.preferredDate} onChange={set("preferredDate")} style={inp} />
                </div>
                <div>
                  <label style={lbl}>Preferred Time</label>
                  <input type="time" value={form.preferredTime} onChange={set("preferredTime")} style={inp} />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label style={lbl}>Additional Notes</label>
                <textarea
                  value={form.additionalNotes}
                  onChange={set("additionalNotes")}
                  rows={3}
                  style={{ ...inp, resize: "vertical" }}
                />
              </div>

              {/* Submit */}
              <button
                style={{
                  background: C.teal, color: "#FAFAFA", border: "none",
                  borderRadius: 100, padding: "12px 32px",
                  fontSize: 13, fontWeight: 600, cursor: "pointer",
                  letterSpacing: "0.5px", alignSelf: "flex-start",
                  marginTop: 4,
                }}
              >
                Submit Booking
              </button>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}