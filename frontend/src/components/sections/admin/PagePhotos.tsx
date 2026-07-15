'use client';

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "./AdminContext";
import { useBookingToast } from "@/components/shared/Bookingtoast";
import { supabase } from "@/lib/supabase";
import { ConfirmModal } from "./ConfirmModal";
import { Icon, icons } from "./AdminIcons";

export const PagePhotos: React.FC = () => {
  const toast = useBookingToast();
  const { T, dark } = useTheme();
  const [photos, setPhotos] = useState<any[]>([]);
  const [cat, setCat] = useState("All");
  const [confirm, setConfirm] = useState<{ id: number; title: string; storage_path?: string } | null>(null);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ label: "", category: "Facility" });
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  // Fetch photos from Supabase on mount
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const { data } = await supabase.from('gallery').select('*').order('id', { ascending: false });
        if (data) {
          setPhotos(
            data.map((d: any) => ({
              id: d.id,
              url: d.photo_url,
              label: d.title,
              category: d.category,
              visible: d.is_visible,
              storage_path: d.storage_path,
            }))
          );
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchPhotos();
  }, []);

  const cats = ["All", "Facility", "Spa"];
  const filtered = cat === "All" ? photos : photos.filter((p) => p.category === cat);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreviewFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  // Check if category is full (5 photos max)
  const isCategoryFull = photos.filter((p) => p.category === form.category).length >= 5;

  const handleSubmit = async () => {
    if (!form.label || !previewFile) return;
    setUploading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Not authenticated. Please login.");
        setUploading(false);
        return;
      }

      // Check quota per category (max 5 photos per category)
      const { count: catCount } = await supabase
        .from("gallery")
        .select("*", { count: "exact", head: true })
        .eq("category", form.category);

      if (catCount && catCount >= 5) {
        toast.warning(`Kategori "${form.category}" sudah penuh (max 5). Hapus foto lama dulu.`);
        setUploading(false);
        return;
      }

      // Generate filename & upload to Storage
      const fileExt = previewFile.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `public/${fileName}`;

      const { error: upErr } = await supabase.storage.from("gallery_photos").upload(filePath, previewFile, {
        cacheControl: "3600",
        upsert: false,
      });
      if (upErr) throw upErr;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage.from("gallery_photos").getPublicUrl(filePath);

      // Insert into database
      const insertPayload = {
        user_id: user.id,
        title: form.label,
        category: form.category,
        photo_url: publicUrl,
        storage_path: filePath,
        is_visible: true,
      };

      const { data: insData, error: insErr } = await supabase.from("gallery").insert([insertPayload]).select();

      if (insErr) {
        console.error("Insert error details:", { message: insErr.message, code: insErr.code, details: insErr.details });
        throw insErr;
      }

      if (insData && insData.length > 0) {
        const newPhoto = insData[0];
        setPhotos((prev) => [
          ...prev,
          {
            id: newPhoto.id,
            url: newPhoto.photo_url,
            label: newPhoto.title,
            category: newPhoto.category,
            visible: newPhoto.is_visible,
            storage_path: newPhoto.storage_path,
          },
        ]);
      }
      setShowForm(false);
      setForm({ label: "", category: "Facility" });
      setPreviewFile(null);
      setPreviewUrl("");
      toast.success("Foto berhasil diupload!");
    } catch (err: any) {
      console.error("Full error:", err);
      toast.error(`Upload gagal: ${err.message || err}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {confirm && (
        <ConfirmModal
          title="Delete Photo"
          message={`Delete "${confirm.title}"?`}
          danger
          onConfirm={async () => {
            try {
              const { data: { user } } = await supabase.auth.getUser();
              if (!user) {
                toast.error("Not authenticated");
                setConfirm(null);
                return;
              }

              // 1. Delete file from Storage
              if (confirm.storage_path) {
                const { error: storageError } = await supabase.storage.from('gallery_photos').remove([confirm.storage_path]);
                if (storageError) {
                  console.error("Storage delete error:", storageError);
                  throw storageError;
                }
              }

              // 2. Delete database record
              const { error: dbError } = await supabase.from('gallery').delete().eq('id', confirm.id);
              if (dbError) {
                console.error("Delete error FULL:", { message: dbError.message, code: dbError.code, details: dbError.details });
                throw dbError;
              }

              setPhotos((p) => p.filter((x) => x.id !== confirm!.id));
              toast.success('Foto dan data berhasil dibersihkan!');
            } catch (err: any) {
              console.error("Delete catch error:", err);
              toast.error('Delete failed: ' + err.message);
            }
            setConfirm(null);
          }}
          onCancel={() => setConfirm(null)}
        />
      )}

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: T.text, margin: 0 }}>Photos</h1>
          <p style={{ fontSize: 13, color: T.textMuted, margin: "4px 0 0" }}>
            {photos.filter((p) => p.visible).length} visible · {photos.length} total
          </p>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setForm({ label: "", category: "Facility" });
            setPreviewFile(null);
            setPreviewUrl("");
          }}
          disabled={isCategoryFull}
          title={isCategoryFull ? "Kategori penuh (5 foto max). Hapus foto lama dulu." : "Upload foto baru"}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            background: isCategoryFull ? T.border : T.teal,
            color: "#fff",
            border: "none",
            borderRadius: 10,
            padding: "10px 18px",
            fontSize: 13,
            fontWeight: 600,
            cursor: isCategoryFull ? "not-allowed" : "pointer",
            fontFamily: "inherit",
            opacity: isCategoryFull ? 0.5 : 1,
          }}
        >
          <Icon d={icons.upload} color="#fff" size={14} /> {isCategoryFull ? "Kategori Penuh" : "Upload Photo"}
        </button>
      </div>

      {/* Upload form */}
      {showForm && (
        <div style={{ background: T.surface, borderRadius: 16, border: `1.5px solid ${T.teal}`, padding: "20px 22px", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: T.text, margin: 0 }}>New Photo</h3>
            <button onClick={() => setShowForm(false)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
              <Icon d={icons.x} color={T.textMuted} size={16} />
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
            <div>
              <label style={{ fontSize: 11, color: T.textMuted, display: "block", marginBottom: 4, fontWeight: 600, textTransform: "uppercase" }}>Photo Label *</label>
              <input
                value={form.label}
                onChange={(e) => setForm((p) => ({ ...p, label: e.target.value }))}
                placeholder="e.g. Spa Room"
                style={inp}
              />
            </div>
            <div>
              <label style={{ fontSize: 11, color: T.textMuted, display: "block", marginBottom: 4, fontWeight: 600, textTransform: "uppercase" }}>Category *</label>
              <select
                value={form.category}
                onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                style={{ ...inp, appearance: "none" }}
              >
                {["Facility", "Spa"].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 11, color: T.textMuted, display: "block", marginBottom: 6, fontWeight: 600, textTransform: "uppercase" }}>Photo File *</label>
            {!previewUrl ? (
              <button
                onClick={() => fileRef.current?.click()}
                style={{
                  width: "100%",
                  padding: "28px 0",
                  borderRadius: 12,
                  border: `2px dashed ${T.border}`,
                  background: T.surface2,
                  color: T.textMuted,
                  fontSize: 13,
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: "inherit",
                }}
              >
                <Icon d={icons.image} color={T.textMuted} size={28} />
                Click to choose photo
              </button>
            ) : (
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                <div style={{ position: "relative" }}>
                  <img
                    src={previewUrl}
                    alt="preview"
                    style={{ width: 140, height: 96, objectFit: "cover", borderRadius: 10, border: `1px solid ${T.border}`, display: "block" }}
                  />
                  <button
                    onClick={() => {
                      setPreviewFile(null);
                      setPreviewUrl("");
                      if (fileRef.current) fileRef.current.value = "";
                    }}
                    style={{
                      position: "absolute",
                      top: 5,
                      right: 5,
                      background: "rgba(0,0,0,0.55)",
                      border: "none",
                      borderRadius: "50%",
                      width: 20,
                      height: 20,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    <Icon d={icons.x} color="#fff" size={11} />
                  </button>
                </div>
                <div>
                  <p style={{ fontSize: 12, color: T.textMid, margin: "0 0 6px", fontWeight: 500 }}>{previewFile?.name}</p>
                  <button
                    onClick={() => fileRef.current?.click()}
                    style={{ fontSize: 11, color: T.teal, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontWeight: 600, padding: 0 }}
                  >
                    Change file
                  </button>
                </div>
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={handleSubmit}
              disabled={!form.label || !previewFile || uploading}
              style={{
                background: T.teal,
                color: "#fff",
                border: "none",
                borderRadius: 9,
                padding: "10px 24px",
                fontSize: 13,
                fontWeight: 600,
                cursor: !form.label || !previewFile || uploading ? "not-allowed" : "pointer",
                opacity: !form.label || !previewFile || uploading ? 0.55 : 1,
                fontFamily: "inherit",
              }}
            >
              {uploading ? "Uploading…" : "Upload Photo"}
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

      {/* Category filter */}
      <div style={{ display: "flex", gap: 7, marginBottom: 16, flexWrap: "wrap" }}>
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              border: "none",
              fontFamily: "inherit",
              background: cat === c ? T.teal : T.surface2,
              color: cat === c ? "#fff" : T.textMid,
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Photo grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: 14 }}>
        {filtered.map((p) => (
          <div key={p.id} style={{ borderRadius: 14, overflow: "hidden", border: `1.5px solid ${T.border}`, background: T.surface, opacity: p.visible ? 1 : 0.6 }}>
            <div style={{ position: "relative", paddingTop: "65%" }}>
              <img src={p.url} alt={p.label} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              {!p.visible && (
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 10, color: "#fff", background: "rgba(0,0,0,0.5)", padding: "3px 9px", borderRadius: 20, fontWeight: 700 }}>HIDDEN</span>
                </div>
              )}
            </div>
            <div style={{ padding: "11px 13px" }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: T.text, margin: "0 0 2px" }}>{p.label}</p>
              <p style={{ fontSize: 11, color: T.textMuted, margin: "0 0 9px" }}>{p.category}</p>
              <div style={{ display: "flex", gap: 7 }}>
                <button
                  onClick={async () => {
                    if (!p.visible) {
                      const visibleCount = photos.filter((x) => x.category === p.category && x.visible).length;
                      if (visibleCount >= 3) {
                        toast.warning(`Maks 3 foto "${p.category}" yang visible. Sembunyikan satu dulu.`);
                        return;
                      }
                    }
                    try {
                      const { data: { user } } = await supabase.auth.getUser();
                      if (!user) {
                        toast.error("Not authenticated");
                        return;
                      }

                      const { data: photoCheck } = await supabase
                        .from('gallery')
                        .select('id, user_id, is_visible')
                        .eq('id', p.id)
                        .single();

                      if (!photoCheck) {
                        toast.error("Photo not found in database");
                        return;
                      }

                      const { data: updateData, error } = await supabase
                        .from('gallery')
                        .update({ is_visible: !p.visible })
                        .eq('id', p.id)
                        .select();

                      if (error) throw error;

                      if (updateData && updateData.length > 0) {
                        setPhotos((prev) => prev.map((x) => (x.id === p.id ? { ...x, visible: !x.visible } : x)));
                        toast.success(p.visible ? "Hidden" : "Shown");
                      } else {
                        toast.error("Photo not found or permission denied");
                      }
                    } catch (err: any) {
                      console.error("Toggle catch error:", err);
                      toast.error('Update failed: ' + err.message);
                    }
                  }}
                  style={{
                    flex: 1,
                    padding: "7px",
                    borderRadius: 7,
                    border: `1px solid ${p.visible ? T.border : T.teal}`,
                    background: p.visible ? T.surface2 : dark ? "#1B3530" : "#E8F5F2",
                    color: p.visible ? T.textMid : T.tealDk,
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  {p.visible ? "Hide" : "Show"}
                </button>
                <button
                  onClick={() => setConfirm({ id: p.id, title: p.label, storage_path: p.storage_path })}
                  style={{
                    padding: "7px 10px",
                    borderRadius: 7,
                    border: `1px solid ${dark ? "#2A1110" : "#FDECEA"}`,
                    background: dark ? "#2A1110" : "#FDECEA",
                    color: "#D95E57",
                    fontSize: 11,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  <Icon d={icons.trash} color="#D95E57" size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
