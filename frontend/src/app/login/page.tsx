"use client";

import { useState, useEffect } from "react";

// ── Brand tokens ──────────────────────────────────────────────
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

// ── Eye icon paths ────────────────────────────────────────────
const EYE    = "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z";
const EYE_OFF= "M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94 M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19 M1 1l22 22";

function Icon({ d, size = 18, color = "currentColor" }: { d: string; size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

// ── Animated teal orb ─────────────────────────────────────────
function TealOrb({ cx, cy, r, opacity = 0.18, delay = 0 }: {
  cx: number; cy: number; r: number; opacity?: number; delay?: number;
}) {
  return (
    <circle cx={cx} cy={cy} r={r}
      fill={C.teal} fillOpacity={opacity}
      style={{ animation: `pulse-orb 6s ease-in-out ${delay}s infinite` }}
    />
  );
}

export default function LoginPage() {
  const [email,       setEmail]       = useState("");
  const [password,    setPassword]    = useState("");
  const [showPass,    setShowPass]    = useState(false);
  const [remember,    setRemember]    = useState(false);
  const [error,       setError]       = useState("");
  const [loading,     setLoading]     = useState(false);
  const [mounted,     setMounted]     = useState(false);
  const [forgotSent,  setForgotSent]  = useState(false);
  const [showForgot,  setShowForgot]  = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  useEffect(() => { setMounted(true); }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (email !== "admin@mantramedica.com") {
        setError("Invalid credentials. Please try again.");
      }
      // On success: redirect or call your auth handler
    }, 1400);
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotSent(true);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', -apple-system, sans-serif; }

        @keyframes fade-up {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0);    }
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
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(18px); }
          to   { opacity: 1; transform: translateX(0);    }
        }

        .login-wrap {
          display: flex;
          min-height: 100vh;
          background: ${C.bg};
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        /* ── Card ── */
        .login-card {
          display: flex;
          width: 100%;
          max-width: 900px;
          min-height: 580px;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 24px 80px rgba(33,33,33,0.12), 0 4px 16px rgba(101,163,150,0.1);
          animation: ${mounted ? "fade-up 0.6s cubic-bezier(0.22,0.61,0.36,1) both" : "none"};
        }

        /* ── Left panel (form) ── */
        .form-panel {
          flex: 1;
          background: ${C.light};
          padding: 52px 52px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        /* ── Right panel (dark) ── */
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

        /* ── Input ── */
        .inp-wrap {
          position: relative;
          margin-bottom: 14px;
        }
        .inp-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
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
        .inp-field:focus {
          border-color: ${C.teal};
          background: #fff;
        }
        .inp-field::placeholder { color: ${C.muted}; }

        /* ── Submit button ── */
        .btn-login {
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
          position: relative;
          overflow: hidden;
          margin-top: 6px;
        }
        .btn-login:hover:not(:disabled) { background: #333; transform: translateY(-1px); }
        .btn-login:active:not(:disabled) { transform: translateY(0); }
        .btn-login:disabled { opacity: 0.7; cursor: not-allowed; }

        /* ── Checkbox ── */
        .custom-check {
          width: 17px; height: 17px;
          border: 1.5px solid ${C.border};
          border-radius: 5px;
          background: ${C.bg};
          cursor: pointer;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color 0.2s, background 0.2s;
        }
        .custom-check.checked {
          background: ${C.teal};
          border-color: ${C.teal};
        }

        /* ── Forgot overlay ── */
        .forgot-overlay {
          position: fixed;
          inset: 0;
          background: rgba(33,33,33,0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          animation: fade-in 0.2s both;
          padding: 24px;
        }
        .forgot-modal {
          background: ${C.light};
          border-radius: 22px;
          padding: 36px 40px;
          width: 100%;
          max-width: 400px;
          animation: fade-up 0.3s cubic-bezier(0.22,0.61,0.36,1) both;
        }

        /* ── Mobile ── */
        @media (max-width: 700px) {
          .login-wrap { padding: 0; align-items: stretch; }
          .login-card {
            flex-direction: column-reverse;
            border-radius: 0;
            min-height: 100svh;
            box-shadow: none;
          }
          .form-panel {
            flex: 1;
            padding: 36px 28px 40px;
          }
          .hero-panel {
            width: 100%;
            min-height: 220px;
            flex-shrink: 0;
          }
        }

        @media (max-width: 480px) {
          .form-panel { padding: 32px 22px 36px; }
        }
      `}</style>

      <div className="login-wrap">
        <div className="login-card">

          {/* ── Left: Form Panel ─────────────────────────────── */}
          <div className="form-panel">

            {/* Logo */}
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:36,
              animation: mounted?"fade-up 0.55s cubic-bezier(0.22,0.61,0.36,1) 0.05s both":"none" }}>
              <div style={{ width:34, height:34, borderRadius:9, background:C.teal,
                display:"flex", alignItems:"center", justifyContent:"center" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2l2.5 7.5H22l-6.5 4.7 2.5 7.5L12 17l-6 4.7 2.5-7.5L2 9.5h7.5z" fill="white"/>
                </svg>
              </div>
              <div>
                <p style={{ fontSize:12, fontWeight:800, color:C.dark, margin:0, letterSpacing:"-0.2px" }}>Mantra</p>
                <p style={{ fontSize:9, fontWeight:700, color:C.teal, margin:0, letterSpacing:"1.8px", textTransform:"uppercase" }}>Medica</p>
              </div>
            </div>

            {/* Heading */}
            <div style={{ marginBottom:28,
              animation: mounted?"fade-up 0.55s cubic-bezier(0.22,0.61,0.36,1) 0.1s both":"none" }}>
              <h1 style={{ fontSize:26, fontWeight:800, color:C.dark, margin:"0 0 5px", letterSpacing:"-0.5px" }}>
                Sign in
              </h1>
              <p style={{ fontSize:13, color:C.muted, margin:0 }}>
                Admin access only — enter your credentials
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin}
              style={{ animation: mounted?"fade-up 0.55s cubic-bezier(0.22,0.61,0.36,1) 0.16s both":"none" }}>

              {/* Error */}
              {error && (
                <div style={{ background:"#FDECEA", border:"1px solid #F5C5C3", borderRadius:10, padding:"10px 14px",
                  marginBottom:14, fontSize:13, color:"#9B2B28", display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ fontSize:16 }}>⚠</span> {error}
                </div>
              )}

              {/* Email */}
              <div style={{ marginBottom:5 }}>
                <label style={{ fontSize:12, fontWeight:600, color:C.mid, display:"block", marginBottom:6, letterSpacing:"0.2px" }}>
                  Email Address
                </label>
              </div>
              <div className="inp-wrap">
                <span className="inp-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6"/>
                  </svg>
                </span>
                <input
                  className="inp-field"
                  type="email"
                  placeholder="admin@mantramedica.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>

              {/* Password */}
              <div style={{ marginBottom:5 }}>
                <label style={{ fontSize:12, fontWeight:600, color:C.mid, display:"block", marginBottom:6, letterSpacing:"0.2px" }}>
                  Password
                </label>
              </div>
              <div className="inp-wrap" style={{ marginBottom:14 }}>
                <span className="inp-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                  </svg>
                </span>
                <input
                  className="inp-field"
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(p => !p)}
                  style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)",
                    background:"none", border:"none", cursor:"pointer", padding:4, color:C.muted }}>
                  <Icon d={showPass ? EYE_OFF : EYE} color={C.muted} size={16}/>
                </button>
              </div>

              {/* Remember + Forgot */}
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:22 }}>
                <label style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer" }}
                  onClick={() => setRemember(p => !p)}>
                  <div className={`custom-check${remember?" checked":""}`}>
                    {remember && (
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span style={{ fontSize:13, color:C.mid, userSelect:"none" }}>Remember me</span>
                </label>
                <button type="button" onClick={() => setShowForgot(true)}
                  style={{ fontSize:13, color:C.teal, background:"none", border:"none", cursor:"pointer", fontWeight:600, padding:0, fontFamily:"inherit" }}>
                  Forgot Password?
                </button>
              </div>

              {/* Submit */}
              <button type="submit" className="btn-login" disabled={loading}>
                {loading ? (
                  <span style={{ display:"inline-flex", alignItems:"center", gap:10 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"
                      strokeLinecap="round" style={{ animation:"spin 0.8s linear infinite" }}>
                      <path d="M12 2a10 10 0 0110 10"/>
                    </svg>
                    Signing in…
                  </span>
                ) : "Sign In"}
              </button>
            </form>

            {/* Footer */}
            <p style={{ fontSize:11, color:C.muted, marginTop:24, textAlign:"center",
              animation: mounted?"fade-up 0.55s cubic-bezier(0.22,0.61,0.36,1) 0.22s both":"none" }}>
              For access issues, contact your super admin
            </p>
          </div>

          {/* ── Right: Hero Panel ─────────────────────────────── */}
          <div className="hero-panel">

            {/* SVG background orbs */}
            <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }}
              viewBox="0 0 360 600" preserveAspectRatio="xMidYMid slice">
              <TealOrb cx={280} cy={80}  r={130} opacity={0.12} delay={0}   />
              <TealOrb cx={60}  cy={200} r={90}  opacity={0.08} delay={2}   />
              <TealOrb cx={200} cy={480} r={110} opacity={0.10} delay={1}   />
              {/* Grid lines */}
              <g stroke={C.teal} strokeOpacity={0.06} strokeWidth={0.8}>
                {Array.from({length:8}).map((_,i)=>(
                  <line key={i} x1={i*50} y1={0} x2={i*50} y2={600}/>
                ))}
                {Array.from({length:13}).map((_,i)=>(
                  <line key={i} x1={0} y1={i*50} x2={360} y2={i*50}/>
                ))}
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

            {/* Teal diagonal accent line */}
            <div style={{ position:"absolute", top:0, right:60, width:1.5, height:"55%",
              background:`linear-gradient(to bottom, transparent, ${C.teal}60, transparent)`,
              transform:"rotate(12deg) translateX(20px)", transformOrigin:"top center" }}/>

            {/* Bottom content */}
            <div style={{ position:"relative", zIndex:2 }}>
              <p style={{ fontSize:11, color:C.tealLight, letterSpacing:"2px", textTransform:"uppercase",
                fontWeight:600, marginBottom:10 }}>
                Mantra Medica
              </p>
              <h2 style={{ fontSize:22, fontWeight:800, color:"#ffffff", lineHeight:1.25, marginBottom:12, letterSpacing:"-0.4px" }}>
                Your clinic,<br/>managed with care.
              </h2>
              <p style={{ fontSize:13, color:"rgba(255,255,255,0.5)", lineHeight:1.7, marginBottom:24 }}>
                Streamline appointments, manage patient reviews, and monitor your clinic operations — all in one place.
              </p>

              {/* Info card */}
              <div style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.09)",
                borderRadius:16, padding:"18px 20px", backdropFilter:"blur(8px)" }}>
                <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
                  <div style={{ width:36, height:36, borderRadius:10, background:C.tealDeep,
                    display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.tealLight}
                      strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 12l2 2 4-4 M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/>
                    </svg>
                  </div>
                  <div>
                    <p style={{ fontSize:13, fontWeight:700, color:"rgba(255,255,255,0.88)", margin:"0 0 4px" }}>
                      Secure Admin Access
                    </p>
                    <p style={{ fontSize:12, color:"rgba(255,255,255,0.45)", margin:0, lineHeight:1.6 }}>
                      This portal is restricted to authorized Mantra Medica administrators only.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Forgot Password Modal ─────────────────────────── */}
      {showForgot && (
        <div className="forgot-overlay" onClick={e => { if(e.target===e.currentTarget) { setShowForgot(false); setForgotSent(false); }}}>
          <div className="forgot-modal">
            {forgotSent ? (
              <div style={{ textAlign:"center" }}>
                <div style={{ width:60, height:60, borderRadius:"50%", background:"#E8F5F2",
                  display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 18px" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.teal}
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <h3 style={{ fontSize:18, fontWeight:800, color:C.dark, margin:"0 0 8px" }}>Email sent!</h3>
                <p style={{ fontSize:13, color:C.muted, lineHeight:1.7, margin:"0 0 24px" }}>
                  We've sent a password reset link to<br/>
                  <strong style={{ color:C.tealDark }}>{forgotEmail}</strong>
                </p>
                <button onClick={() => { setShowForgot(false); setForgotSent(false); }}
                  style={{ width:"100%", padding:"13px", borderRadius:11, background:C.dark, color:"#fff",
                    border:"none", fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
                  Back to Sign In
                </button>
              </div>
            ) : (
              <>
                <h3 style={{ fontSize:20, fontWeight:800, color:C.dark, margin:"0 0 8px" }}>Forgot password?</h3>
                <p style={{ fontSize:13, color:C.muted, lineHeight:1.6, margin:"0 0 22px" }}>
                  Enter your admin email and we'll send you a reset link.
                </p>
                <form onSubmit={handleForgot}>
                  <label style={{ fontSize:12, fontWeight:600, color:C.mid, display:"block", marginBottom:6 }}>Email Address</label>
                  <div style={{ position:"relative", marginBottom:18 }}>
                    <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={C.muted}
                        strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6"/>
                      </svg>
                    </span>
                    <input type="email" placeholder="admin@mantramedica.com"
                      value={forgotEmail} onChange={e=>setForgotEmail(e.target.value)}
                      style={{ width:"100%", padding:"13px 14px 13px 40px", borderRadius:11,
                        border:`1.5px solid ${C.border}`, fontSize:14, fontFamily:"inherit",
                        color:C.dark, background:C.bg, outline:"none", boxSizing:"border-box" }}/>
                  </div>
                  <button type="submit"
                    style={{ width:"100%", padding:"13px", borderRadius:11, background:C.teal, color:"#fff",
                      border:"none", fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"inherit", marginBottom:10 }}>
                    Send Reset Link
                  </button>
                  <button type="button" onClick={() => setShowForgot(false)}
                    style={{ width:"100%", padding:"13px", borderRadius:11, background:C.bg, color:C.mid,
                      border:`1px solid ${C.border}`, fontSize:14, cursor:"pointer", fontFamily:"inherit" }}>
                    Cancel
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}