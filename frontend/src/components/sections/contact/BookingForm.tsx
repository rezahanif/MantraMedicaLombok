"use client";

// src/components/contact/BookingForm.tsx
import { useState } from "react";
import { C } from "@/lib/constants";
import { serviceTypes, testimonials } from "@/data/contactData";

export default function BookingForm() {
  const [slide, setSlide] = useState(0);
  const [form, setForm] = useState({
    fullName: "", whatsapp: "", serviceType: "",
    preferredDate: "", preferredTime: "", additionalNotes: "",
  });

  const next = () => setSlide((s) => (s + 1) % testimonials.length);
  const prev = () => setSlide((s) => (s - 1 + testimonials.length) % testimonials.length);

  return (
    <section
      style={{
        // ↓ Replace gradient with: background: `url('/images/wood-texture.jpg') center/cover no-repeat`
        background: `linear-gradient(135deg, #5C3D1E 0%, #7A5230 40%, #6B4522 100%)`,
        padding: "64px 32px",
        position: "relative",
      }}
    >
      {/* Wood texture overlay */}
      <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(90deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 2px, transparent 2px, transparent 40px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", gap: 40, alignItems: "flex-start", position: "relative", zIndex: 2 }}>

        {/* Left — form */}
        <div style={{ flex: 1 }}>
          <h2 style={{ color: "#FAFAFA", fontSize: 26, fontWeight: 700, marginBottom: 24 }}>Book Your Visit</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Row 1 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { label: "Full Name", key: "fullName", type: "text", placeholder: "" },
                { label: "Whatsapp Number", key: "whatsapp", type: "tel", placeholder: "" },
              ].map((f) => (
                <div key={f.key}>
                  <label style={{ color: "rgba(250,250,250,0.6)", fontSize: 11, display: "block", marginBottom: 5 }}>{f.label}</label>
                  <input
                    type={f.type}
                    value={form[f.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    style={{ width: "100%", background: "rgba(255,255,255,0.12)", border: "0.5px solid rgba(255,255,255,0.2)", borderRadius: 8, padding: "9px 12px", color: "#FAFAFA", fontSize: 13, outline: "none" }}
                  />
                </div>
              ))}
            </div>

            {/* Service type */}
            <div>
              <label style={{ color: "rgba(250,250,250,0.6)", fontSize: 11, display: "block", marginBottom: 5 }}>Service Type</label>
              <select
                value={form.serviceType}
                onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
                style={{ width: "100%", background: "rgba(255,255,255,0.12)", border: "0.5px solid rgba(255,255,255,0.2)", borderRadius: 8, padding: "9px 12px", color: form.serviceType ? "#FAFAFA" : "rgba(250,250,250,0.4)", fontSize: 13, outline: "none", cursor: "pointer" }}
              >
                <option value="" disabled style={{ background: "#3D2208" }}>Select a service</option>
                {serviceTypes.map((s) => (
                  <option key={s} value={s} style={{ background: "#3D2208", color: "#FAFAFA" }}>{s}</option>
                ))}
              </select>
            </div>

            {/* Row 3 — date + notes */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={{ color: "rgba(250,250,250,0.6)", fontSize: 11, display: "block", marginBottom: 5 }}>Preferred Date</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 13 }}>📅</span>
                  <input
                    type="date"
                    value={form.preferredDate}
                    onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                    style={{ width: "100%", background: "rgba(255,255,255,0.12)", border: "0.5px solid rgba(255,255,255,0.2)", borderRadius: 8, padding: "9px 12px 9px 32px", color: "#FAFAFA", fontSize: 13, outline: "none" }}
                  />
                </div>
              </div>
              <div>
                <label style={{ color: "rgba(250,250,250,0.6)", fontSize: 11, display: "block", marginBottom: 5 }}>Additional Notes</label>
                <textarea
                  value={form.additionalNotes}
                  onChange={(e) => setForm({ ...form, additionalNotes: e.target.value })}
                  rows={1}
                  style={{ width: "100%", background: "rgba(255,255,255,0.12)", border: "0.5px solid rgba(255,255,255,0.2)", borderRadius: 8, padding: "9px 12px", color: "#FAFAFA", fontSize: 13, outline: "none", resize: "vertical" }}
                />
              </div>
            </div>

            {/* Preferred time */}
            <div style={{ maxWidth: "48%" }}>
              <label style={{ color: "rgba(250,250,250,0.6)", fontSize: 11, display: "block", marginBottom: 5 }}>Preferred Time</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 13 }}>⏰</span>
                <input
                  type="time"
                  value={form.preferredTime}
                  onChange={(e) => setForm({ ...form, preferredTime: e.target.value })}
                  style={{ width: "100%", background: "rgba(255,255,255,0.12)", border: "0.5px solid rgba(255,255,255,0.2)", borderRadius: 8, padding: "9px 12px 9px 32px", color: "#FAFAFA", fontSize: 13, outline: "none" }}
                />
              </div>
            </div>

            {/* Submit */}
            <div>
              <button
                style={{ background: C.teal, color: "#FAFAFA", border: "none", borderRadius: 100, padding: "12px 28px", fontSize: 13, fontWeight: 600, cursor: "pointer", letterSpacing: "0.5px" }}
              >
                Submit Booking
              </button>
            </div>
          </div>
        </div>

        {/* Right — image carousel + testimonial */}
        <div style={{ flex: 1 }}>
          <div style={{ borderRadius: 20, overflow: "hidden", position: "relative", aspectRatio: "4/3", background: "linear-gradient(135deg, #1A2E2B, #2C4A3A)", marginBottom: 16 }}>
            {/* ↓ Replace with: <Image src={`/images/gallery-${slide + 1}.jpg`} fill style={{ objectFit: "cover" }} alt="" /> */}
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.2)", fontSize: 13 }}>
              Gallery Photo {slide + 1}
            </div>

            {/* Arrows */}
            <button onClick={prev} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.15)", border: "0.5px solid rgba(255,255,255,0.3)", borderRadius: "50%", width: 34, height: 34, color: "#fff", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
            <button onClick={next} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.15)", border: "0.5px solid rgba(255,255,255,0.3)", borderRadius: "50%", width: 34, height: 34, color: "#fff", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>

            {/* Testimonial overlay */}
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

          {/* Dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: 6 }}>
            {testimonials.map((_, i) => (
              <div key={i} onClick={() => setSlide(i)} style={{ width: i === slide ? 20 : 7, height: 7, borderRadius: 100, background: i === slide ? C.teal : "rgba(255,255,255,0.25)", cursor: "pointer", transition: "all 0.3s" }} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}