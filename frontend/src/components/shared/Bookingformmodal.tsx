"use client";

// src/components/contact/BookingFormModal.tsx
//
// Usage:
//   import BookingFormModal from "@/components/contact/BookingFormModal";
//   const [open, setOpen] = useState(false);
//   <button onClick={() => setOpen(true)}>Book Now</button>
//   <BookingFormModal open={open} onClose={() => setOpen(false)} />
//
// Requires <BookingToastContainer /> mounted in layout.tsx (already done).

import { useEffect, useRef, useState } from "react";
import { C } from "@/lib/constants";
import { useBookingToast } from "@/components/shared/Bookingtoast";
import { supabase } from "@/lib/supabase";

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

export default function BookingFormModal({ open, onClose }: Props) {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const lastScrollRef = useRef(0);
  const [services, setServices] = useState<any[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);

  // ✅ Real toast — works because BookingToastContainer is in layout.tsx
  const toast = useBookingToast();

  // Fetch active services from Supabase
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await supabase
          .from('services')
          .select('name, is_active')
          .eq('is_active', true)
          .order('id', { ascending: true });
        console.log("Fetched active services:", data);
        if (data) setServices(data.map((s:any) => s.name));
      } catch (err) { console.error('Failed to fetch services:', err); }
      finally { setServicesLoading(false); }
    };
    fetchServices();
    // Re-fetch every 10 seconds to catch admin updates
    const interval = setInterval(fetchServices, 10000);
    return () => clearInterval(interval);
  }, []);

  const [form, setForm] = useState({
    fullName: "", whatsapp: "", serviceType: "",
    preferredDate: "", preferredTime: "", additionalNotes: "",
  });
  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

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

  // Mobile swipe-down-to-dismiss for modal
  useEffect(() => {
    if (!modalRef.current || !visible || window.innerWidth > 499) return;

    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      lastScrollRef.current = 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchCurrentY = e.touches[0].clientY;
      const swipeDelta = touchCurrentY - touchStartY;

      // Only track downward swipes when at top of modal
      if (swipeDelta > 0 && modalRef.current && modalRef.current.scrollTop === 0) {
        lastScrollRef.current = swipeDelta;
      }
    };

    const handleTouchEnd = () => {
      // Close modal if swiped down more than 60px threshold
      if (lastScrollRef.current > 60) {
        onClose();
      }
      lastScrollRef.current = 0;
    };

    const modal = modalRef.current;
    modal.addEventListener("touchstart", handleTouchStart);
    modal.addEventListener("touchmove", handleTouchMove);
    modal.addEventListener("touchend", handleTouchEnd);

    return () => {
      modal.removeEventListener("touchstart", handleTouchStart);
      modal.removeEventListener("touchmove", handleTouchMove);
      modal.removeEventListener("touchend", handleTouchEnd);
    };
  }, [visible, onClose]);

  const handleSubmit = async () => {
    if (!form.fullName.trim())   { toast.error("Please enter your full name.");       return; }
    if (!form.whatsapp.trim())   { toast.error("Please enter your WhatsApp number."); return; }
    if (!form.serviceType)       { toast.error("Please select a service type.");      return; }
    if (!form.preferredDate)     { toast.error("Please select a preferred date.");    return; }
    if (!form.preferredTime)     { toast.error("Please select a preferred time.");    return; }
    if (!/^\d+$/.test(form.whatsapp.trim())) {
      toast.warning("WhatsApp number should contain only digits.");
      return;
    }

    // Insert booking into Supabase
    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          nama_lengkap: form.fullName,
          whatsapp: form.whatsapp,
          service_type: form.serviceType,
          preferred_date: form.preferredDate,
          preferred_time: form.preferredTime,
          notes: form.additionalNotes,
          status: 'pending'
        }
      ]);

    if (error) {
      toast.error("Booking failed: " + error.message);
      return;
    }

    toast.success("Booking confirmed! We'll contact you via WhatsApp.");
    setTimeout(() => {
      setForm({ fullName: "", whatsapp: "", serviceType: "", preferredDate: "", preferredTime: "", additionalNotes: "" });
      onClose();
    }, 500);
  };

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

        /* Desktop — no scroll, fits viewport */
        .bfm-modal {
          position: relative;
          width: 100%; max-width: 480px;
          border-radius: 20px;
          overflow: hidden;
          animation: bfm-pop-in 0.32s cubic-bezier(0.34,1.3,0.64,1) forwards;
        }
        .bfm-backdrop.bfm-out .bfm-modal { animation: bfm-pop-out 0.28s ease forwards; }

        /* Mobile bottom sheet — can scroll */
        @media (max-width: 499px) {
          .bfm-backdrop { align-items: flex-end; padding: 0; }
          .bfm-modal {
            max-width: 100%;
            border-radius: 20px 20px 0 0;
            max-height: 92vh;
            overflow-y: auto;
            animation: bfm-slide-up 0.36s cubic-bezier(0.32,0.72,0,1) forwards;
          }
          .bfm-backdrop.bfm-out .bfm-modal { animation: bfm-slide-down 0.3s ease forwards; }
        }

        .bfm-modal::-webkit-scrollbar { width: 4px; }
        .bfm-modal::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 4px; }
        .bfm-modal input[type="date"]::-webkit-calendar-picker-indicator,
        .bfm-modal input[type="time"]::-webkit-calendar-picker-indicator { filter: invert(1); opacity: 0.45; cursor: pointer; }
        .bfm-modal select option { background: #3D2208; color: #FAFAFA; }
        .bfm-close:hover { background: rgba(255,255,255,0.22) !important; }
        @media (max-width: 499px) { .bfm-drag-pill { display: block !important; } }
      `}</style>

      <div
        ref={backdropRef}
        className={`bfm-backdrop${visible ? "" : " bfm-out"}`}
        onMouseDown={(e) => { if (e.target === backdropRef.current) onClose(); }}
      >
        <div className="bfm-modal" ref={modalRef}>

          {/* ✅ Background as real divs — covers 100% reliably on both desktop & mobile,
              no pseudo-element, no background-attachment:fixed */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
            backgroundImage: "url('/images/panelkayuform.webp')",
            backgroundSize: "cover", backgroundPosition: "center",
          }} />
          <div style={{
            position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
            background: "rgba(28, 14, 4, 0.42)",
          }} />

          {/* Close */}
          <button
            className="bfm-close"
            onClick={onClose}
            aria-label="Close"
            style={{
              position: "absolute", top: 16, right: 16, zIndex: 11,
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

          {/* Mobile drag pill — indicator to scroll down to dismiss */}
          <div
            className="bfm-drag-pill"
            style={{
              display: "none", width: 40, height: 4, borderRadius: 2,
              background: "rgba(255,255,255,0.28)", margin: "12px auto 0",
              position: "relative", zIndex: 1, cursor: "grab", userSelect: "none",
            }}
          />

          {/* Form */}
          <div style={{ position: "relative", zIndex: 1, padding: "40px" }}>
            <h2 style={{ color: "#FAFAFA", fontSize: 24, fontWeight: 700, margin: "0 0 24px", letterSpacing: "-0.3px" }}>
              Book Your Visit
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

              <div>
                <label style={lbl}>Full Name</label>
                <input type="text" value={form.fullName} onChange={set("fullName")} style={inp} />
              </div>

              <div>
                <label style={lbl}>WhatsApp Number</label>
                <input type="tel" value={form.whatsapp} onChange={set("whatsapp")} style={inp} />
              </div>

              <div>
                <label style={lbl}>Service Type</label>
                <select
                  value={form.serviceType}
                  onChange={set("serviceType")}
                  style={{ ...inp, color: form.serviceType ? "#FAFAFA" : "rgba(250,250,250,0.4)", cursor: "pointer" }}
                >
                  <option value="" disabled>Select a service</option>
                  {services.length > 0 ? services.map((s) => <option key={s} value={s}>{s}</option>) : <option disabled>Loading services...</option>}
                </select>
              </div>

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

              <div>
                <label style={lbl}>Additional Notes</label>
                <textarea
                  value={form.additionalNotes}
                  onChange={set("additionalNotes")}
                  rows={3}
                  style={{ ...inp, resize: "vertical" }}
                />
              </div>

              <button
                onClick={handleSubmit}
                style={{
                  background: C.teal, color: "#FAFAFA", border: "none",
                  borderRadius: 100, padding: "12px 32px",
                  fontSize: 13, fontWeight: 600, cursor: "pointer",
                  letterSpacing: "0.5px", alignSelf: "flex-start", marginTop: 4,
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