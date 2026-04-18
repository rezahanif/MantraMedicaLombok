"use client";

export const dynamic = 'force-dynamic';

// src/app/reset-password/page.tsx
// ─────────────────────────────────────────────────────────────
// Usage: linked from the password-reset email as
//   /reset-password?token=<jwt>
//
// Reads ?token from the URL. On submit, call your API:
//   POST /api/auth/reset-password  { token, newPassword }
// ─────────────────────────────────────────────────────────────

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

// ── Brand tokens (identical to LoginPage) ────────────────────
const C = {
  tealLight: "#87B2A8",
  teal:      "#65A396",
  tealDark:  "#4A7D72",
  tealDeep:  "#2E5C54",
  dark:      "#212121",
  mid:       "#5A5A5A",
  muted:     "#9A9A9A",
  border:    "#E4ECEB",
  bg:        "#F4F8F7",
  light:     "#FFFFFF",
  danger:    "#D95E57",
};

const EYE     = "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z";
const EYE_OFF = "M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94 M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19 M1 1l22 22";

function Icon({ d, size = 16, color = "currentColor" }: { d: string; size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

function TealOrb({ cx, cy, r, opacity = 0.18, delay = 0 }: {
  cx: number; cy: number; r: number; opacity?: number; delay?: number;
}) {
  return (
    <circle cx={cx} cy={cy} r={r} fill={C.teal} fillOpacity={opacity}
      style={{ animation: `pulse-orb 6s ease-in-out ${delay}s infinite` }} />
  );
}

// ── Password strength ─────────────────────────────────────────
function getStrength(pw: string): { score: number; label: string; color: string } {
  if (!pw) return { score: 0, label: "", color: "transparent" };
  let score = 0;
  if (pw.length >= 8)              score++;
  if (/[A-Z]/.test(pw))            score++;
  if (/[0-9]/.test(pw))            score++;
  if (/[^A-Za-z0-9]/.test(pw))     score++;
  const map = [
    { label: "Too short",  color: C.danger },
    { label: "Weak",       color: "#E8A444" },
    { label: "Fair",       color: "#E8A444" },
    { label: "Good",       color: C.teal },
    { label: "Strong",     color: C.tealDark },
  ];
  return { score, ...map[score] };
}

function ResetPasswordContent() {
  const searchParams  = useSearchParams();
  const router        = useRouter();
  const token         = searchParams.get("token") ?? "";

  const [newPass,     setNewPass]     = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showNew,     setShowNew]     = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error,       setError]       = useState("");
  const [loading,     setLoading]     = useState(false);
  const [success,     setSuccess]     = useState(false);
  const [mounted,     setMounted]     = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const strength = getStrength(newPass);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!newPass) { setError("Please enter a new password."); return; }
    if (newPass.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (newPass !== confirmPass) { setError("Passwords do not match."); return; }

    setLoading(true);

    // Update password via Supabase
    const { error } = await supabase.auth.updateUser({
      password: newPass
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setLoading(false);
      setSuccess(true);
      // Logout setelah ganti password — user harus login ulang
      await supabase.auth.signOut();
      // Redirect ke login setelah 2 detik
      setTimeout(() => router.push('/login'), 2000);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', -apple-system, sans-serif; }

        @keyframes fade-up {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes pulse-orb {
          0%, 100% { transform: scale(1);    opacity: 0.18; }
          50%       { transform: scale(1.12); opacity: 0.28; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes check-pop {
          0%   { transform: scale(0.4); opacity: 0; }
          70%  { transform: scale(1.15); }
          100% { transform: scale(1);   opacity: 1; }
        }

        .rp-wrap {
          display: flex;
          min-height: 100vh;
          background: ${C.bg};
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .rp-card {
          display: flex;
          width: 100%;
          max-width: 900px;
          min-height: 580px;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 24px 80px rgba(33,33,33,0.12), 0 4px 16px rgba(101,163,150,0.1);
          animation: ${mounted ? "fade-up 0.6s cubic-bezier(0.22,0.61,0.36,1) both" : "none"};
        }

        .form-panel {
          flex: 1;
          background: ${C.light};
          padding: 52px 52px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .hero-panel {
          width: 360px;
          flex-shrink: 0;
          background: ${C.dark};
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 36px;
        }

        .inp-wrap { position: relative; margin-bottom: 14px; }
        .inp-icon {
          position: absolute; left: 14px; top: 50%;
          transform: translateY(-50%); pointer-events: none;
        }
        .inp-field {
          width: 100%;
          padding: 13px 44px 13px 42px;
          border-radius: 11px;
          border: 1.5px solid ${C.border};
          font-size: 14px;
          font-family: inherit;
          color: ${C.dark};
          background: ${C.bg};
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .inp-field:focus { border-color: ${C.teal}; background: #fff; }
        .inp-field::placeholder { color: ${C.muted}; }
        .inp-field.inp-error { border-color: ${C.danger}; }
        .inp-field.inp-ok    { border-color: ${C.teal}; }

        .btn-submit {
          width: 100%;
          padding: 14px;
          border-radius: 11px;
          border: none;
          background: ${C.dark};
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          margin-top: 6px;
        }
        .btn-submit:hover:not(:disabled) { background: #333; transform: translateY(-1px); }
        .btn-submit:active:not(:disabled) { transform: translateY(0); }
        .btn-submit:disabled { opacity: 0.7; cursor: not-allowed; }

        .strength-bar {
          height: 4px;
          border-radius: 4px;
          background: ${C.border};
          margin-top: 8px;
          overflow: hidden;
        }
        .strength-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.35s ease, background 0.35s ease;
        }

        .rule {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 12px;
          color: ${C.muted};
          margin-bottom: 5px;
          transition: color 0.2s;
        }
        .rule.met { color: ${C.tealDark}; }
        .rule-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: ${C.border};
          flex-shrink: 0;
          transition: background 0.2s;
        }
        .rule.met .rule-dot { background: ${C.teal}; }

        /* Mobile */
        @media (max-width: 700px) {
          .rp-wrap  { padding: 0; align-items: stretch; }
          .rp-card  { flex-direction: column-reverse; border-radius: 0; min-height: 100svh; box-shadow: none; }
          .form-panel { flex: 1; padding: 36px 28px 40px; }
          .hero-panel { width: 100%; min-height: 200px; flex-shrink: 0; }
        }
        @media (max-width: 480px) {
          .form-panel { padding: 32px 22px 36px; }
        }
      `}</style>

      <div className="rp-wrap">
        <div className="rp-card">

          {/* ── Left: Form Panel ─────────────────────────────── */}
          <div className="form-panel">

            {/* Logo */}
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:36,
              animation: mounted ? "fade-up 0.55s cubic-bezier(0.22,0.61,0.36,1) 0.05s both" : "none" }}>
              <img src="/images/logonavbar.webp" alt="Mantra Medica" style={{ width:150, height:75, objectFit:"contain" }}/>
            </div>

            {success ? (
              /* ── Success state ── */
              <div style={{ animation: "fade-up 0.45s cubic-bezier(0.22,0.61,0.36,1) both" }}>
                <div style={{ width:68, height:68, borderRadius:"50%", background:"#E8F5F2",
                  display:"flex", alignItems:"center", justifyContent:"center", marginBottom:22,
                  animation: "check-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.1s both" }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={C.teal}
                    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <h1 style={{ fontSize:24, fontWeight:800, color:C.dark, margin:"0 0 8px", letterSpacing:"-0.5px" }}>
                  Password updated!
                </h1>
                <p style={{ fontSize:13, color:C.muted, lineHeight:1.7, margin:"0 0 28px" }}>
                  Your password has been changed successfully.<br/>
                  You can now sign in with your new password.
                </p>
                <button
                  onClick={() => router.push("/login")}
                  className="btn-submit"
                  style={{ background: C.teal }}
                >
                  Back to Sign In
                </button>
              </div>
            ) : (
              /* ── Form state ── */
              <>
                <div style={{ marginBottom:28,
                  animation: mounted ? "fade-up 0.55s cubic-bezier(0.22,0.61,0.36,1) 0.1s both" : "none" }}>
                  <h1 style={{ fontSize:26, fontWeight:800, color:C.dark, margin:"0 0 5px", letterSpacing:"-0.5px" }}>
                    Set new password
                  </h1>
                  <p style={{ fontSize:13, color:C.muted, margin:0 }}>
                    Choose a strong password for your admin account
                  </p>
                </div>

                <form onSubmit={handleSubmit}
                  style={{ animation: mounted ? "fade-up 0.55s cubic-bezier(0.22,0.61,0.36,1) 0.16s both" : "none" }}>

                  {/* Error */}
                  {error && (
                    <div style={{ background:"#FDECEA", border:"1px solid #F5C5C3", borderRadius:10,
                      padding:"10px 14px", marginBottom:14, fontSize:13, color:"#9B2B28",
                      display:"flex", alignItems:"center", gap:8 }}>
                      <span style={{ fontSize:16 }}>⚠</span> {error}
                    </div>
                  )}

                  {/* New password */}
                  <div style={{ marginBottom:5 }}>
                    <label style={{ fontSize:12, fontWeight:600, color:C.mid, display:"block", marginBottom:6, letterSpacing:"0.2px" }}>
                      New Password
                    </label>
                  </div>
                  <div className="inp-wrap">
                    <span className="inp-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.muted}
                        strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                        <path d="M7 11V7a5 5 0 0110 0v4"/>
                      </svg>
                    </span>
                    <input
                      className={`inp-field${newPass && strength.score < 2 ? " inp-error" : newPass && strength.score >= 3 ? " inp-ok" : ""}`}
                      type={showNew ? "text" : "password"}
                      placeholder="Min. 8 characters"
                      value={newPass}
                      onChange={e => setNewPass(e.target.value)}
                      autoComplete="new-password"
                    />
                    <button type="button" onClick={() => setShowNew(p => !p)}
                      style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)",
                        background:"none", border:"none", cursor:"pointer", padding:4, color:C.muted }}>
                      <Icon d={showNew ? EYE_OFF : EYE} color={C.muted} size={16}/>
                    </button>
                  </div>

                  {/* Strength bar */}
                  {newPass && (
                    <div style={{ marginBottom:14 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
                        <div className="strength-bar" style={{ flex:1, marginRight:10 }}>
                          <div className="strength-fill" style={{
                            width: `${(strength.score / 4) * 100}%`,
                            background: strength.color,
                          }} />
                        </div>
                        <span style={{ fontSize:11, fontWeight:600, color: strength.color, minWidth:48, textAlign:"right" }}>
                          {strength.label}
                        </span>
                      </div>
                      {/* Rules */}
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"2px 12px", marginTop:6 }}>
                        {[
                          { label:"At least 8 characters", met: newPass.length >= 8 },
                          { label:"One uppercase letter",  met: /[A-Z]/.test(newPass) },
                          { label:"One number",            met: /[0-9]/.test(newPass) },
                          { label:"One special character", met: /[^A-Za-z0-9]/.test(newPass) },
                        ].map((r) => (
                          <div key={r.label} className={`rule${r.met ? " met" : ""}`}>
                            <div className="rule-dot" />
                            {r.label}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Confirm password */}
                  <div style={{ marginBottom:5 }}>
                    <label style={{ fontSize:12, fontWeight:600, color:C.mid, display:"block", marginBottom:6, letterSpacing:"0.2px" }}>
                      Confirm Password
                    </label>
                  </div>
                  <div className="inp-wrap" style={{ marginBottom: 22 }}>
                    <span className="inp-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.muted}
                        strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                        <path d="M7 11V7a5 5 0 0110 0v4"/>
                      </svg>
                    </span>
                    <input
                      className={`inp-field${confirmPass && confirmPass !== newPass ? " inp-error" : confirmPass && confirmPass === newPass ? " inp-ok" : ""}`}
                      type={showConfirm ? "text" : "password"}
                      placeholder="Re-enter your password"
                      value={confirmPass}
                      onChange={e => setConfirmPass(e.target.value)}
                      autoComplete="new-password"
                    />
                    <button type="button" onClick={() => setShowConfirm(p => !p)}
                      style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)",
                        background:"none", border:"none", cursor:"pointer", padding:4, color:C.muted }}>
                      <Icon d={showConfirm ? EYE_OFF : EYE} color={C.muted} size={16}/>
                    </button>
                    {/* Inline match indicator */}
                    {confirmPass && (
                      <span style={{ position:"absolute", right:40, top:"50%", transform:"translateY(-50%)" }}>
                        {confirmPass === newPass
                          ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.teal} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                          : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.danger} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                        }
                      </span>
                    )}
                  </div>

                  {/* Submit */}
                  <button type="submit" className="btn-submit" disabled={loading}>
                    {loading ? (
                      <span style={{ display:"inline-flex", alignItems:"center", gap:10 }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"
                          strokeLinecap="round" style={{ animation:"spin 0.8s linear infinite" }}>
                          <path d="M12 2a10 10 0 0110 10"/>
                        </svg>
                        Updating password…
                      </span>
                    ) : "Update Password"}
                  </button>
                </form>

                {/* Back link */}
                <p style={{ fontSize:12, color:C.muted, marginTop:20, textAlign:"center",
                  animation: mounted ? "fade-up 0.55s cubic-bezier(0.22,0.61,0.36,1) 0.22s both" : "none" }}>
                  Remember it?{" "}
                  <button onClick={() => router.push("/login")}
                    style={{ background:"none", border:"none", color:C.teal, fontWeight:600,
                      fontSize:12, cursor:"pointer", padding:0, fontFamily:"inherit" }}>
                    Back to Sign In
                  </button>
                </p>
              </>
            )}
          </div>

          {/* ── Right: Hero Panel (identical to LoginPage) ────── */}
          <div className="hero-panel">
            <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }}
              viewBox="0 0 360 600" preserveAspectRatio="xMidYMid slice">
              <TealOrb cx={280} cy={80}  r={130} opacity={0.12} delay={0} />
              <TealOrb cx={60}  cy={200} r={90}  opacity={0.08} delay={2} />
              <TealOrb cx={200} cy={480} r={110} opacity={0.10} delay={1} />
              <g stroke={C.teal} strokeOpacity={0.06} strokeWidth={0.8}>
                {Array.from({ length: 8  }).map((_, i) => <line key={`v${i}`} x1={i*50} y1={0}   x2={i*50} y2={600} />)}
                {Array.from({ length: 13 }).map((_, i) => <line key={`h${i}`} x1={0}    y1={i*50} x2={360}  y2={i*50} />)}
              </g>
            </svg>

            {/* Big teal "M" mark */}
            <div style={{ position:"absolute", top:32, left:36 }}>
              <svg width="60" height="52" viewBox="0 0 60 52" fill="none">
                <path d="M4 48 L4 8 L30 34 L56 8 L56 48" stroke={C.teal} strokeWidth="3.5"
                  strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.9"/>
                <path d="M4 48 L4 8 L30 34 L56 8 L56 48" stroke="white" strokeWidth="1"
                  strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.12"/>
              </svg>
            </div>

            <div style={{ position:"absolute", top:0, right:60, width:1.5, height:"55%",
              background:`linear-gradient(to bottom, transparent, ${C.teal}60, transparent)`,
              transform:"rotate(12deg) translateX(20px)", transformOrigin:"top center" }}/>

            {/* Bottom content */}
            <div style={{ position:"relative", zIndex:2 }}>
              <p style={{ fontSize:11, color:C.tealLight, letterSpacing:"2px", textTransform:"uppercase",
                fontWeight:600, marginBottom:10 }}>
                Mantra Medica
              </p>
              <h2 style={{ fontSize:22, fontWeight:800, color:"#ffffff", lineHeight:1.25,
                marginBottom:12, letterSpacing:"-0.4px" }}>
                Secure your<br/>account again.
              </h2>
              <p style={{ fontSize:13, color:"rgba(255,255,255,0.5)", lineHeight:1.7, marginBottom:24 }}>
                Create a strong, unique password to keep your admin access protected. Never share your credentials.
              </p>

              {/* Tips card */}
              <div style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.09)",
                borderRadius:16, padding:"18px 20px", backdropFilter:"blur(8px)" }}>
                <p style={{ fontSize:12, fontWeight:700, color:"rgba(255,255,255,0.7)", margin:"0 0 12px",
                  letterSpacing:"0.3px", textTransform:"uppercase" }}>
                  Tips for a strong password
                </p>
                {[
                  "Mix uppercase and lowercase letters",
                  "Include numbers and symbols",
                  "Avoid using personal info",
                  "Don't reuse old passwords",
                ].map((tip) => (
                  <div key={tip} style={{ display:"flex", alignItems:"flex-start", gap:10, marginBottom:8 }}>
                    <div style={{ width:5, height:5, borderRadius:"50%", background:C.teal,
                      flexShrink:0, marginTop:5 }} />
                    <p style={{ fontSize:12, color:"rgba(255,255,255,0.45)", margin:0, lineHeight:1.6 }}>
                      {tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}