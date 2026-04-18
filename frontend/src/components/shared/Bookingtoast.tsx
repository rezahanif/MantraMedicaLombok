"use client";

// src/components/shared/Bookingtoast.tsx
//
// Usage:
//   // In layout.tsx — wrap everything inside BookingToastContainer:
//   <BookingToastContainer>
//     <Navbar />
//     {children}
//     <Footer />
//   </BookingToastContainer>
//
//   // In any component:
//   const toast = useBookingToast();
//   toast.success("Booking confirmed!");
//   toast.error("Please fill in all required fields.");
//   toast.warning("Something looks off.");

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

/* ─── Design tokens ──────────────────────────────────────── */
const T = {
  success: { bg: "#65A396", border: "#4d8a7e", label: "Success" },
  error:   { bg: "#D95E57", border: "#bf4840", label: "Action Required" },
  warning: { bg: "#E8A444", border: "#c98a2e", label: "Warning" },
} as const;

type ToastType = keyof typeof T;

interface Toast {
  id:      string;
  type:    ToastType;
  message: string;
}

/* ─── Context ────────────────────────────────────────────── */
interface ToastAPI {
  success: (msg: string) => void;
  error:   (msg: string) => void;
  warning: (msg: string) => void;
}

const ToastCtx = createContext<ToastAPI | null>(null);

export function useBookingToast(): ToastAPI {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useBookingToast must be used inside <BookingToastContainer>");
  return ctx;
}

/* ─── Progress bar ───────────────────────────────────────── */
function useProgress(duration = 3000) {
  const [width, setWidth] = useState(100);
  const raf   = useRef<number>(0);
  const start = useRef<number>(0);

  useEffect(() => {
    start.current = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start.current;
      const pct = Math.max(0, 100 - (elapsed / duration) * 100);
      setWidth(pct);
      if (pct > 0) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [duration]);

  return width;
}

/* ─── Single toast ───────────────────────────────────────── */
function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  const [exiting, setExiting] = useState(false);
  const progress = useProgress(3000);
  const t = T[toast.type];

  const dismiss = useCallback(() => {
    setExiting(true);
    setTimeout(() => onRemove(toast.id), 340);
  }, [toast.id, onRemove]);

  useEffect(() => {
    if (progress === 0) dismiss();
  }, [progress, dismiss]);

  const Icon = () => {
    if (toast.type === "success")
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="9" stroke="white" strokeWidth="1.5" strokeOpacity="0.5"/>
          <path d="M6 10l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    if (toast.type === "error")
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="9" stroke="white" strokeWidth="1.5" strokeOpacity="0.5"/>
          <path d="M7 7l6 6M13 7l-6 6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="9" stroke="white" strokeWidth="1.5" strokeOpacity="0.5"/>
        <path d="M10 6v5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="10" cy="14" r="1" fill="white"/>
      </svg>
    );
  };

  return (
    <>
      <style>{`
        @keyframes toast-in-desktop  { from { opacity:0; transform:translateX(calc(100% + 24px)); } to { opacity:1; transform:translateX(0); } }
        @keyframes toast-out-desktop { from { opacity:1; transform:translateX(0); } to { opacity:0; transform:translateX(calc(100% + 24px)); } }
        @keyframes toast-in-mobile   { from { opacity:0; transform:translateY(120%); } to { opacity:1; transform:translateY(0); } }
        @keyframes toast-out-mobile  { from { opacity:1; transform:translateY(0); }   to { opacity:0; transform:translateY(120%); } }
        .bk-toast       { animation: toast-in-desktop  0.36s cubic-bezier(0.32,0.72,0,1) forwards; }
        .bk-toast.bk-exit { animation: toast-out-desktop 0.32s ease forwards; }
        @media (max-width: 499px) {
          .bk-toast         { animation: toast-in-mobile  0.36s cubic-bezier(0.32,0.72,0,1) forwards; }
          .bk-toast.bk-exit { animation: toast-out-mobile 0.32s ease forwards; }
        }
        .bk-close:hover  { background: rgba(255,255,255,0.25) !important; }
        .bk-close:active { transform: scale(0.92); }
      `}</style>

      <div
        className={`bk-toast${exiting ? " bk-exit" : ""}`}
        role="alert"
        aria-live="assertive"
        style={{
          position: "relative", width: "100%", borderRadius: 16,
          overflow: "hidden", background: t.bg,
          boxShadow: "0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)",
          display: "flex", flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 18px 14px" }}>
          <div style={{
            flexShrink: 0, width: 40, height: 40, borderRadius: "50%",
            background: "rgba(255,255,255,0.18)", border: "1.5px solid rgba(255,255,255,0.35)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ margin: 0, fontSize: 11, fontWeight: 600, letterSpacing: "1.2px", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: 3 }}>
              {t.label}
            </p>
            <p style={{ margin: 0, fontSize: 13.5, fontWeight: 600, color: "#FFFFFF", lineHeight: 1.45 }}>
              {toast.message}
            </p>
          </div>

          <button
            className="bk-close"
            onClick={dismiss}
            aria-label="Dismiss"
            style={{
              flexShrink: 0, width: 30, height: 30, borderRadius: "50%",
              background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)",
              color: "#FFFFFF", fontSize: 15, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.15s",
            }}
          >
            ✕
          </button>
        </div>

        <div
          aria-hidden="true"
          style={{
            position: "absolute", bottom: 0, left: 0, height: 3,
            width: `${progress}%`, background: "rgba(255,255,255,0.45)",
            transition: "width 0.1s linear", borderRadius: "0 2px 2px 0",
          }}
        />
      </div>
    </>
  );
}

/* ─── Container — wraps children so entire app is inside Provider ── */
export function BookingToastContainer({ children }: { children?: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const add = useCallback((type: ToastType, message: string) => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, message }]);
  }, []);

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const api: ToastAPI = {
    success: (msg) => add("success", msg),
    error:   (msg) => add("error",   msg),
    warning: (msg) => add("warning", msg),
  };

  return (
    <ToastCtx.Provider value={api}>
      {/* ✅ App content lives inside the Provider */}
      {children}

      {/* Toast portal — fixed overlay, always on top */}
      <style>{`
        .bk-portal {
          position: fixed; top: 24px; right: 24px; z-index: 99999;
          display: flex; flex-direction: column; gap: 12px;
          width: clamp(300px, 90vw, 400px);
          pointer-events: none;
        }
        .bk-portal > * { pointer-events: all; }
        @media (max-width: 499px) {
          .bk-portal {
            top: auto; bottom: 24px;
            right: 50%; transform: translateX(50%);
            width: calc(100vw - 32px);
          }
        }
      `}</style>
      <div className="bk-portal" aria-live="polite" aria-label="Notifications">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onRemove={remove} />
        ))}
      </div>
    </ToastCtx.Provider>
  );
}