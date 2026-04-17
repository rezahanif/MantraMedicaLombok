"use client";

// src/components/contact/BookingFormModal.tsx
// Wired to BookingToast — wrap your page/layout with <BookingToastContainer />

import { useEffect, useRef, useState } from "react";
import { C } from "@/lib/constants";
import { serviceTypes } from "@/data/contactData";
import { useBookingToast } from "@/components/shared/Bookingtoast";

interface Props {
  open: boolean;
  onClose: () => void;
}

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

// Required fields for validation
const REQUIRED: Array<keyof typeof EMPTY_FORM> = [
  "fullName",
  "whatsapp",
  "serviceType",
  "preferredDate",
  "preferredTime",
];

const EMPTY_FORM = {
  fullName: "",
  whatsapp: "",
  serviceType: "",
  preferredDate: "",
  preferredTime: "",
  additionalNotes: "",
};

export default function BookingFormModal({ open, onClose }: Props) {
  const [visible,  setVisible]  = useState(false);
  const [mounted,  setMounted]  = useState(false);
  const [form,     setForm]     = useState(EMPTY_FORM);
  const [errors,   setErrors]   = useState<Partial<Record<keyof typeof EMPTY_FORM, boolean>>>({});
  const backdropRef = useRef<HTMLDivElement>(null);
  const toast = useBookingToast();

  const set = (key: keyof typeof EMPTY_FORM) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      // Clear error on change
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: false }));
    };

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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleSubmit = () => {
    // Validate required fields
    const newErrors: typeof errors = {};
    let hasError = false;
    REQUIRED.forEach((key) => {
      if (!form[key].trim()) {
        newErrors[key] = true;
        hasError = true;
      }
    });

    if (hasError) {
      setErrors(newErrors);
      toast.error("Please fill in all required fields before submitting.");
      return;
    }

    // ── Success path ──────────────────────────────────────────
    // Replace with your actual API call / WhatsApp redirect here
    console.log("Booking submitted:", form);
    toast.success("Booking confirmed! We'll reach out via WhatsApp soon.");
    setForm(EMPTY_FORM);
    setErrors({});
    onClose();
  };

  if (!mounted) return null;

  // Field border — red tint when validation failed
  const inpField = (key: keyof typeof EMPTY_FORM): React.CSSProperties => ({
    ...inp,
    border: errors[key]
      ? "0.5px solid rgba(217,94,87,0.8)"
      : inp.border,
    background: errors[key]
      ? "rgba(217,94,87,0.12)"
      : inp.background,
  });

  return (
    <>
      <style>{`
        @keyframes bfm-fade-in  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes bfm-fade-out { from { opacity: 1; } to { opacity: 0; } }
        @keyframes bfm-pop-in   { from { opacity: 0; transform: scale(0.94) translateY(12px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes bfm-pop-out  { from { opacity: 1; transform: scale(1) translateY(0); } to { opacity: 0; transform: scale(0.94) translateY(12px); } }
        @keyframes bfm-slide-up   { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes bfm-slide-down { from { transform: translateY(0); } to { transform: translateY(100%); } }

        .bfm-backdrop {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(15,8,2,0.68);
          backdrop-filter: blur(3px);
          display: flex; align-items: center; justify-content: center;
          padding: 24px 16px;
          animation: bfm-fade-in 0.28s ease forwards;
        }
        .bfm-backdrop.bfm-out { animation: bfm-fade-out 0.32s ease forwards; }

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

        @media (max-width: 499px) {
          .bfm-backdrop { align-items: flex-end; padding: 0; }
          .bfm-modal {
            max-width: 100%; border-radius: 20px 20px 0 0; max-height: 92vh;
            animation: bfm-slide-up 0.36s cubic-bezier(0.32,0.72,0,1) forwards;
          }
          .bfm-backdrop.bfm-out .bfm-modal { animation: bfm-slide-down 0.3s ease forwards; }
          .bfm-drag-pill { display: block !important; }
        }

        .bfm-modal::-webkit-scrollbar { width: 4px; }
        .bfm-modal::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 4px; }
        .bfm-modal input[type="date"]::-webkit-calendar-picker-indicator,
        .bfm-modal input[type="time"]::-webkit-calendar-picker-indicator { filter: invert(1); opacity: 0.45; cursor: pointer; }
        .bfm-modal select option { background: #3D2208; color: #FAFAFA; }
        .bfm-close:hover { background: rgba(255,255,255,0.22) !important; }

        /* Shake animation for error fields */
        @keyframes field-shake {
          0%,100% { transform: translateX(0); }
          20%     { transform: translateX(-5px); }
          60%     { transform: translateX(5px); }
        }
        .field-error { animation: field-shake 0.35s ease; }
      `}</style>

      <div
        ref={backdropRef}
        className={`bfm-backdrop${visible ? "" : " bfm-out"}`}
        onMouseDown={(e) => { if (e.target === backdropRef.current) onClose(); }}
      >
        <div className="bfm-modal">
          <div style={{ position: "absolute", inset: 0, background: "rgba(28,14,4,0.38)", pointerEvents: "none", zIndex: 0 }} />

          {/* Close */}
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
          >✕</button>

          {/* Mobile drag pill */}
          <div
            className="bfm-drag-pill"
            style={{
              display: "none", width: 40, height: 4, borderRadius: 2,
              background: "rgba(255,255,255,0.28)", margin: "12px auto 0",
              position: "relative", zIndex: 1,
            }}
          />

          <div style={{ position: "relative", zIndex: 1, padding: "40px" }}>
            <h2 style={{ color: "#FAFAFA", fontSize: 24, fontWeight: 700, margin: "0 0 24px", letterSpacing: "-0.3px" }}>
              Book Your Visit
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

              <div className={errors.fullName ? "field-error" : ""}>
                <label style={lbl}>
                  Full Name <span style={{ color: "#D95E57" }}>*</span>
                </label>
                <input type="text" value={form.fullName} onChange={set("fullName")} style={inpField("fullName")} placeholder="Your full name" />
              </div>

              <div className={errors.whatsapp ? "field-error" : ""}>
                <label style={lbl}>
                  WhatsApp Number <span style={{ color: "#D95E57" }}>*</span>
                </label>
                <input type="tel" value={form.whatsapp} onChange={set("whatsapp")} style={inpField("whatsapp")} placeholder="+62 8xx xxxx xxxx" />
              </div>

              <div className={errors.serviceType ? "field-error" : ""}>
                <label style={lbl}>
                  Service Type <span style={{ color: "#D95E57" }}>*</span>
                </label>
                <select
                  value={form.serviceType}
                  onChange={set("serviceType")}
                  style={{
                    ...inpField("serviceType"),
                    color: form.serviceType ? "#FAFAFA" : "rgba(250,250,250,0.4)",
                    cursor: "pointer",
                  }}
                >
                  <option value="" disabled>Select a service</option>
                  {serviceTypes.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div className={errors.preferredDate ? "field-error" : ""}>
                  <label style={lbl}>Preferred Date <span style={{ color: "#D95E57" }}>*</span></label>
                  <input type="date" value={form.preferredDate} onChange={set("preferredDate")} style={inpField("preferredDate")} />
                </div>
                <div className={errors.preferredTime ? "field-error" : ""}>
                  <label style={lbl}>Preferred Time <span style={{ color: "#D95E57" }}>*</span></label>
                  <input type="time" value={form.preferredTime} onChange={set("preferredTime")} style={inpField("preferredTime")} />
                </div>
              </div>

              <div>
                <label style={lbl}>Additional Notes</label>
                <textarea
                  value={form.additionalNotes}
                  onChange={set("additionalNotes")}
                  rows={3}
                  style={{ ...inp, resize: "vertical" }}
                  placeholder="Any specific concerns or requests…"
                />
              </div>

              <button
                onClick={handleSubmit}
                style={{
                  background: C.teal, color: "#FAFAFA", border: "none",
                  borderRadius: 100, padding: "12px 32px",
                  fontSize: 13, fontWeight: 600, cursor: "pointer",
                  letterSpacing: "0.5px", alignSelf: "flex-start",
                  marginTop: 4, transition: "opacity 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
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