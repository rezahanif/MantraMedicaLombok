'use client';

import React, { useState, useEffect } from "react";
import { useTheme } from "./AdminContext";
import { useBookingToast } from "@/components/shared/Bookingtoast";
import { supabase } from "@/lib/supabase";
import { ConfirmModal } from "./ConfirmModal";
import { Icon, icons } from "./AdminIcons";

const Stars: React.FC<{ n: number }> = ({ n }) => {
  const { T } = useTheme();
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ color: i < n ? T.amber : "#555", fontSize: 14 }}>
          ★
        </span>
      ))}
    </>
  );
};

export const PageReviews: React.FC = () => {
  const { T, dark } = useTheme();
  const toast = useBookingToast();
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirm, setConfirm] = useState<{ id: number; name: string } | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [dbServices, setDbServices] = useState<string[]>([]);
  const [form, setForm] = useState({
    reviewer_name: "",
    service_tag: "",
    rating: 5,
    comment: "",
    is_published: false,
  });

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

  // Fetch reviews from Supabase
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await supabase
          .from('reviews')
          .select('*')
          .order('review_date', { ascending: false });
        if (data) setReviews(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
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
          const names = data.map((s: any) => s.name);
          setDbServices(names);
          if (names.length > 0) {
            setForm((p) => ({ ...p, service_tag: names[0] }));
          }
        }
      } catch (err) {
        console.error('Failed to fetch services:', err);
      }
    };
    fetchServices();
  }, []);

  const handlePublishToggle = async (review: any) => {
    const publishedCount = reviews.filter((r) => r.is_published).length;
    const isCurrentlyPublished = review.is_published;

    if (!isCurrentlyPublished && publishedCount >= 3) {
      toast.warning("Max 3 published reviews. Unpublish satu review yang lain dulu.");
      return;
    }

    try {
      const { error } = await supabase
        .from('reviews')
        .update({ is_published: !isCurrentlyPublished })
        .eq('id', review.id);
      if (error) throw error;

      setReviews((p) =>
        p.map((x) => (x.id === review.id ? { ...x, is_published: !x.is_published } : x))
      );
    } catch (err) {
      console.error(err);
      toast.error('Gagal update review');
    }
  };

  const handleSubmit = async () => {
    if (!form.reviewer_name.trim() || !form.comment.trim()) return;

    if (form.is_published) {
      const publishedCount = reviews.filter((r) => r.is_published).length;
      if (publishedCount >= 3) {
        toast.warning("Max 3 published reviews. Simpan sebagai hidden dulu.");
        return;
      }
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Not authenticated");
        return;
      }
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('reviews')
        .insert([
          {
            user_id: user.id,
            reviewer_name: form.reviewer_name,
            service_tag: form.service_tag,
            rating: form.rating,
            comment: form.comment,
            review_date: today,
            is_published: form.is_published,
          },
        ])
        .select();
      if (error) throw error;
      if (data) {
        setReviews((p) => [...p, data[0]]);
        toast.success("Review berhasil ditambahkan");
      }
      setForm({ reviewer_name: "", service_tag: dbServices[0] || "", rating: 5, comment: "", is_published: false });
      setShowForm(false);
    } catch (err) {
      console.error(err);
      toast.error('Gagal tambah review');
    }
  };

  return (
    <div>
      {confirm && (
        <ConfirmModal
          title="Delete Review"
          message={`Delete review from ${confirm.name}?`}
          danger
          onConfirm={async () => {
            try {
              await supabase.from('reviews').delete().eq('id', confirm!.id);
              setReviews((p) => p.filter((x) => x.id !== confirm!.id));
              toast.success("Review berhasil dihapus");
            } catch (err) {
              console.error(err);
              toast.error('Gagal hapus review');
            }
            setConfirm(null);
          }}
          onCancel={() => setConfirm(null)}
        />
      )}

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: T.text, margin: 0 }}>Reviews</h1>
          <p style={{ fontSize: 13, color: T.textMuted, margin: "4px 0 0" }}>
            {reviews.filter((r) => r.is_published).length} of {reviews.length} published (max 3)
          </p>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setForm({
              reviewer_name: "",
              service_tag: dbServices[0] || "",
              rating: 5,
              comment: "",
              is_published: false,
            });
          }}
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
          <Icon d={icons.plus} color="#fff" size={14} /> Add Review
        </button>
      </div>

      {/* Add Review form */}
      {showForm && (
        <div style={{ background: T.surface, borderRadius: 16, border: `1.5px solid ${T.teal}`, padding: "20px 22px", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: T.text, margin: 0 }}>New Review</h3>
            <button onClick={() => setShowForm(false)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
              <Icon d={icons.x} color={T.textMuted} size={16} />
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            {/* Name */}
            <div>
              <label style={{ fontSize: 11, color: T.textMuted, display: "block", marginBottom: 4, fontWeight: 600, textTransform: "uppercase" }}>Patient Name *</label>
              <input
                value={form.reviewer_name}
                onChange={(e) => setForm((p) => ({ ...p, reviewer_name: e.target.value }))}
                placeholder="e.g. Dian R."
                style={inp}
              />
            </div>

            {/* Service */}
            <div>
              <label style={{ fontSize: 11, color: T.textMuted, display: "block", marginBottom: 4, fontWeight: 600, textTransform: "uppercase" }}>Service</label>
              <select
                value={form.service_tag}
                onChange={(e) => setForm((p) => ({ ...p, service_tag: e.target.value }))}
                style={{ ...inp, appearance: "none" }}
              >
                {dbServices.length > 0 ? (
                  dbServices.map((s) => <option key={s}>{s}</option>)
                ) : (
                  <option disabled>Loading services...</option>
                )}
              </select>
            </div>
          </div>

          {/* Star rating picker */}
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 11, color: T.textMuted, display: "block", marginBottom: 6, fontWeight: 600, textTransform: "uppercase" }}>Rating *</label>
            <div style={{ display: "flex", gap: 6 }}>
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setForm((p) => ({ ...p, rating: n }))}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 2,
                    fontSize: 26,
                    color: n <= form.rating ? "#E8A444" : "#CCC",
                    lineHeight: 1,
                    transition: "transform 0.1s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  ★
                </button>
              ))}
              <span style={{ fontSize: 13, color: T.textMuted, alignSelf: "center", marginLeft: 6 }}>
                {form.rating} star{form.rating > 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {/* Review text */}
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 11, color: T.textMuted, display: "block", marginBottom: 4, fontWeight: 600, textTransform: "uppercase" }}>Review Text *</label>
            <textarea
              value={form.comment}
              onChange={(e) => setForm((p) => ({ ...p, comment: e.target.value }))}
              rows={3}
              placeholder="Write the review content here…"
              style={{ ...inp, resize: "vertical" }}
            />
          </div>

          {/* Publish toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <button
              onClick={() => setForm((p) => ({ ...p, is_published: !p.is_published }))}
              style={{
                width: 42,
                height: 24,
                borderRadius: 100,
                background: form.is_published ? T.teal : T.border,
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
                  transform: form.is_published ? "translateX(18px)" : "translateX(0)",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
                }}
              />
            </button>
            <span style={{ fontSize: 13, color: T.textMid, fontWeight: 500 }}>
              {form.is_published ? "Publish immediately (~max 3)" : "Save as hidden"}
            </span>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={handleSubmit}
              disabled={!form.reviewer_name.trim() || !form.comment.trim()}
              style={{
                background: T.teal,
                color: "#fff",
                border: "none",
                borderRadius: 9,
                padding: "10px 24px",
                fontSize: 13,
                fontWeight: 600,
                cursor: !form.reviewer_name.trim() || !form.comment.trim() ? "not-allowed" : "pointer",
                opacity: !form.reviewer_name.trim() || !form.comment.trim() ? 0.55 : 1,
                fontFamily: "inherit",
              }}
            >
              Add Review
            </button>
            <button
              onClick={() => setShowForm(false)}
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
        <p style={{ textAlign: "center", color: T.textMuted, padding: "40px 0" }}>Loading reviews...</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 14 }}>
          {reviews.map((r) => (
            <div
              key={r.id}
              style={{
                background: T.surface,
                borderRadius: 16,
                border: `1.5px solid ${r.is_published ? T.teal : T.border}`,
                padding: "16px 18px",
                position: "relative",
                opacity: r.is_published ? 1 : 0.65,
              }}
            >
              {!r.is_published && (
                <span
                  style={{
                    position: "absolute",
                    top: 11,
                    right: 12,
                    fontSize: 9,
                    background: T.surface2,
                    color: T.textMuted,
                    padding: "2px 7px",
                    borderRadius: 20,
                    fontWeight: 700,
                    letterSpacing: "0.5px",
                  }}
                >
                  HIDDEN
                </span>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 9 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: T.teal,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {r.reviewer_name
                    .replace(".", "")
                    .split(" ")
                    .map((w: string) => w[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: T.text, margin: 0 }}>{r.reviewer_name}</p>
                  <p style={{ fontSize: 11, color: T.textMuted, margin: 0 }}>
                    {r.service_tag} · {r.review_date}
                  </p>
                </div>
              </div>
              <div style={{ marginBottom: 7 }}>
                <Stars n={r.rating} />
              </div>
              <p style={{ fontSize: 12, color: T.textMid, lineHeight: 1.6, margin: "0 0 12px" }}>{r.comment}</p>
              <div style={{ display: "flex", gap: 7 }}>
                <button
                  onClick={() => handlePublishToggle(r)}
                  style={{
                    flex: 1,
                    padding: "8px",
                    borderRadius: 8,
                    border: `1px solid ${r.is_published ? T.border : T.teal}`,
                    background: r.is_published ? T.surface2 : dark ? "#1B3530" : "#E8F5F2",
                    color: r.is_published ? T.textMid : T.tealDk,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  {r.is_published ? "Hide" : "Publish"}
                </button>
                <button
                  onClick={() => setConfirm({ id: r.id, name: r.reviewer_name })}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 8,
                    border: `1px solid ${dark ? "#2A1110" : "#FDECEA"}`,
                    background: dark ? "#2A1110" : "#FDECEA",
                    color: "#D95E57",
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
        </div>
      )}
    </div>
  );
};
