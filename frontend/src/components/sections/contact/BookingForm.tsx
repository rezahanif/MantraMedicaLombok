"use client";

// src/components/contact/BookingForm.tsx
import { useState, useRef } from "react";
import { C } from "@/lib/constants";
import { serviceTypes, testimonials } from "@/data/contactData";
import { useBookingToast } from "@/components/shared/Bookingtoast";
import { supabase } from "@/lib/supabase";

const inputStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  background: "rgba(255,255,255,0.18)",
  border: "0.5px solid rgba(255,255,255,0.28)",
  borderRadius: 10,
  padding: "10px 14px",
  color: "#FAFAFA",
  fontSize: 13,
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  color: "rgba(250,250,250,0.65)",
  fontSize: 11,
  display: "block",
  marginBottom: 5,
};

const btnStyle: React.CSSProperties = {
  background: C.teal,
  color: "#FAFAFA",
  border: "none",
  borderRadius: 100,
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
  letterSpacing: "0.5px",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2), 0 6px 16px rgba(0,0,0,0.25)",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
};

// ── Swipe hook ────────────────────────────────────────────────
function useSwipe(onSwipeLeft: () => void, onSwipeRight: () => void) {
  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) delta > 0 ? onSwipeLeft() : onSwipeRight();
    touchStartX.current = null;
  };
  return { onTouchStart, onTouchEnd };
}

export default function BookingForm() {
  // ✅ Same toast context as BookingFormModal — works because
  //    BookingToastContainer wraps the whole app in layout.tsx
  const toast = useBookingToast();

  const [slide, setSlide] = useState(0);
  const [form, setForm] = useState({
    fullName: "", whatsapp: "", serviceType: "",
    preferredDate: "", preferredTime: "", additionalNotes: "",
  });
  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const next = () => setSlide((s) => (s + 1) % testimonials.length);
  const prev = () => setSlide((s) => (s - 1 + testimonials.length) % testimonials.length);
  const swipe = useSwipe(next, prev);

  const handleSubmit = async () => {
    if (!form.fullName.trim())                { toast.error("Please enter your full name.");       return; }
    if (!form.whatsapp.trim())                { toast.error("Please enter your WhatsApp number."); return; }
    if (!form.serviceType)                    { toast.error("Please select a service type.");      return; }
    if (!form.preferredDate)                  { toast.error("Please select a preferred date.");    return; }
    if (!form.preferredTime)                  { toast.error("Please select a preferred time.");    return; }
    if (!/^\d+$/.test(form.whatsapp.trim()))  { toast.warning("WhatsApp number should contain only digits."); return; }

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
    setForm({ fullName: "", whatsapp: "", serviceType: "", preferredDate: "", preferredTime: "", additionalNotes: "" });
  };

  const hoverIn  = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = "scale(1.08)";
    e.currentTarget.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.2), 0 8px 24px rgba(0,0,0,0.35)";
  };
  const hoverOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.2), 0 6px 16px rgba(0,0,0,0.25)";
  };

  return (
    <section
      style={{
        backgroundImage: "url('/images/panelkayuform.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "64px 32px",
        position: "relative",
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: "rgba(30,15,5,0.35)", pointerEvents: "none" }} />

      <style>{`
        @media (max-width: 499px) {
          .booking-desktop { display: none !important; }
          .booking-mobile  { display: flex !important; }
        }
        @media (min-width: 500px) {
          .booking-desktop { display: flex !important; }
          .booking-mobile  { display: none !important; }
        }
        input[type="date"]::-webkit-calendar-picker-indicator,
        input[type="time"]::-webkit-calendar-picker-indicator { filter: invert(1); opacity: 0.5; cursor: pointer; }
        select option { background: #3D2208; color: #FAFAFA; }
        .carousel-slide { user-select: none; -webkit-user-select: none; touch-action: pan-y; }
      `}</style>

      {/* ── DESKTOP ≥500px ── */}
      <div
        className="booking-desktop"
        style={{ maxWidth: 960, margin: "0 auto", gap: 40, alignItems: "center", position: "relative", zIndex: 2 }}
      >
        {/* Left — form */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
          <h2 style={{ color: "#FAFAFA", fontSize: 26, fontWeight: 700, margin: "0 0 10px" }}>Book Your Visit</h2>

          <div>
            <label style={labelStyle}>Full Name</label>
            <input type="text" value={form.fullName} onChange={set("fullName")} style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>WhatsApp Number</label>
            <input type="tel" value={form.whatsapp} onChange={set("whatsapp")} style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Service Type</label>
            <select
              value={form.serviceType}
              onChange={set("serviceType")}
              style={{ ...inputStyle, color: form.serviceType ? "#FAFAFA" : "rgba(250,250,250,0.45)", cursor: "pointer" }}
            >
              <option value="" disabled>Select a service</option>
              {serviceTypes.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={labelStyle}>Preferred Date</label>
              <input type="date" value={form.preferredDate} onChange={set("preferredDate")} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Preferred Time</label>
              <input type="time" value={form.preferredTime} onChange={set("preferredTime")} style={inputStyle} />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Additional Notes</label>
            <textarea value={form.additionalNotes} onChange={set("additionalNotes")} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
          </div>

          <div>
            <button onClick={handleSubmit} style={{ ...btnStyle, padding: "12px 32px" }} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
              Submit Booking
            </button>
          </div>
        </div>

        {/* Right — carousel + testimonial */}
        <div style={{ flex: 1 }}>
          <div
            className="carousel-slide"
            {...swipe}
            style={{ borderRadius: 20, overflow: "hidden", position: "relative", aspectRatio: "4/3", background: "linear-gradient(135deg, #1A2E2B, #2C4A3A)", marginBottom: 16, cursor: "grab" }}
          >
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.2)", fontSize: 13 }}>
              Gallery Photo {slide + 1}
            </div>
            <button onClick={prev} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.15)", border: "0.5px solid rgba(255,255,255,0.3)", borderRadius: "50%", width: 34, height: 34, color: "#fff", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
            <button onClick={next} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.15)", border: "0.5px solid rgba(255,255,255,0.3)", borderRadius: "50%", width: 34, height: 34, color: "#fff", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
            <div style={{ position: "absolute", bottom: 14, left: 14, right: 14, background: "rgba(33,33,33,0.82)", borderRadius: 12, padding: "12px 14px", backdropFilter: "blur(4px)" }}>
              <div style={{ display: "flex", gap: 2, marginBottom: 6 }}>
                {"★★★★★".split("").map((s, i) => (
                  <span key={i} style={{ color: i < testimonials[slide].rating ? "#C8A96A" : "rgba(255,255,255,0.2)", fontSize: 12 }}>{s}</span>
                ))}
              </div>
              <p style={{ color: "rgba(250,250,250,0.85)", fontSize: 12, lineHeight: 1.5, marginBottom: 4 }}>"{testimonials[slide].text}"</p>
              <p style={{ color: "rgba(250,250,250,0.45)", fontSize: 11 }}>— {testimonials[slide].author}</p>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 6 }}>
            {testimonials.map((_, i) => (
              <div key={i} onClick={() => setSlide(i)} style={{ width: i === slide ? 20 : 7, height: 7, borderRadius: 100, background: i === slide ? C.teal : "rgba(255,255,255,0.25)", cursor: "pointer", transition: "all 0.3s" }} />
            ))}
          </div>
        </div>
      </div>

      {/* ── MOBILE <500px ── */}
      <div
        className="booking-mobile"
        style={{ maxWidth: 960, margin: "0 auto", flexDirection: "column", gap: 28, position: "relative", zIndex: 2 }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <h2 style={{ color: "#FAFAFA", fontSize: 22, fontWeight: 700, margin: "0 0 6px" }}>Book Your Visit</h2>

          <div>
            <label style={{ ...labelStyle, fontSize: 10 }}>Full Name</label>
            <input type="text" value={form.fullName} onChange={set("fullName")} style={{ ...inputStyle, padding: "9px 12px", fontSize: 12 }} />
          </div>

          <div>
            <label style={{ ...labelStyle, fontSize: 10 }}>WhatsApp Number</label>
            <input type="tel" value={form.whatsapp} onChange={set("whatsapp")} style={{ ...inputStyle, padding: "9px 12px", fontSize: 12 }} />
          </div>

          <div>
            <label style={{ ...labelStyle, fontSize: 10 }}>Service Type</label>
            <select
              value={form.serviceType}
              onChange={set("serviceType")}
              style={{ ...inputStyle, padding: "9px 12px", fontSize: 12, color: form.serviceType ? "#FAFAFA" : "rgba(250,250,250,0.45)", cursor: "pointer" }}
            >
              <option value="" disabled>Select a service</option>
              {serviceTypes.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div>
              <label style={{ ...labelStyle, fontSize: 10 }}>Preferred Date</label>
              <input type="date" value={form.preferredDate} onChange={set("preferredDate")} style={{ ...inputStyle, padding: "9px 10px", fontSize: 12 }} />
            </div>
            <div>
              <label style={{ ...labelStyle, fontSize: 10 }}>Preferred Time</label>
              <input type="time" value={form.preferredTime} onChange={set("preferredTime")} style={{ ...inputStyle, padding: "9px 10px", fontSize: 12 }} />
            </div>
          </div>

          <div>
            <label style={{ ...labelStyle, fontSize: 10 }}>Additional Notes</label>
            <textarea value={form.additionalNotes} onChange={set("additionalNotes")} rows={3} style={{ ...inputStyle, padding: "9px 12px", fontSize: 12, resize: "vertical" }} />
          </div>

          <button onClick={handleSubmit} style={{ ...btnStyle, padding: "11px 24px", fontSize: 12, width: "100%" }} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
            Submit Booking
          </button>
        </div>

        {/* Carousel */}
        <div>
          <div
            className="carousel-slide"
            {...swipe}
            style={{ borderRadius: 20, overflow: "hidden", position: "relative", aspectRatio: "4/3", background: "linear-gradient(135deg, #1A2E2B, #2C4A3A)", marginBottom: 14, cursor: "grab" }}
          >
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.2)", fontSize: 12 }}>Gallery Photo {slide + 1}</div>
            <button onClick={prev} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.15)", border: "0.5px solid rgba(255,255,255,0.3)", borderRadius: "50%", width: 30, height: 30, color: "#fff", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
            <button onClick={next} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.15)", border: "0.5px solid rgba(255,255,255,0.3)", borderRadius: "50%", width: 30, height: 30, color: "#fff", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
            <div style={{ position: "absolute", bottom: 14, left: 12, right: 12, background: "rgba(33,33,33,0.82)", borderRadius: 12, padding: "12px 14px", backdropFilter: "blur(4px)" }}>
              <div style={{ display: "flex", gap: 2, marginBottom: 4 }}>
                {"★★★★★".split("").map((s, i) => <span key={i} style={{ color: i < testimonials[slide].rating ? "#C8A96A" : "rgba(255,255,255,0.2)", fontSize: 11 }}>{s}</span>)}
              </div>
              <p style={{ color: "rgba(250,250,250,0.85)", fontSize: 11, lineHeight: 1.4, marginBottom: 3 }}>"{testimonials[slide].text}"</p>
              <p style={{ color: "rgba(250,250,250,0.45)", fontSize: 10 }}>— {testimonials[slide].author}</p>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 5 }}>
            {testimonials.map((_, i) => <div key={i} onClick={() => setSlide(i)} style={{ width: i === slide ? 18 : 6, height: 6, borderRadius: 100, background: i === slide ? C.teal : "rgba(255,255,255,0.25)", cursor: "pointer", transition: "all 0.3s" }} />)}
          </div>
        </div>
      </div>
    </section>
  );
}