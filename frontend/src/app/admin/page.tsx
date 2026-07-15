'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

import { lightT, darkT, ThemeCtx, useIsMobile } from "@/components/sections/admin/AdminContext";
import { Icon, icons } from "@/components/sections/admin/AdminIcons";
import { NOTIFS } from "@/components/sections/admin/AdminConstants";
import { NotifDropdown } from "@/components/sections/admin/NotifDropdown";
import { AvatarDropdown } from "@/components/sections/admin/AvatarDropdown";
import { SidebarContent } from "@/components/sections/admin/SidebarContent";

import { PageDashboard } from "@/components/sections/admin/PageDashboard";
import { PageAppointments } from "@/components/sections/admin/PageAppointments";
import { PageServices } from "@/components/sections/admin/PageServices";
import { PageReviews } from "@/components/sections/admin/PageReviews";
import { PagePhotos } from "@/components/sections/admin/PagePhotos";
import { PageSettings } from "@/components/sections/admin/PageSettings";
import { PageHelp } from "@/components/sections/admin/PageHelp";

export default function MantraMedicaDashboard() {
  const router = useRouter();
  const [dark, setDark] = useState(false);
  const T = dark ? darkT : lightT;
  const [page, setPage] = useState("Dashboard");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [showAvatar, setShowAvatar] = useState(false);
  const isMobile = useIsMobile();
  const [pendingCount, setPendingCount] = useState(0);

  const unreadNotifs = NOTIFS.filter((n) => !n.read).length;

  useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        const { count } = await supabase
          .from('leads')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending');
        if (count !== null) {
          setPendingCount(count);
        }
      } catch (err) {
        console.error('Error fetching pending appointments count:', err);
      }
    };
    fetchPendingCount();
  }, [page]); // Update when changing pages/tabs to reflect updates

  const handleLogout = async () => {
    await supabase.auth.signOut();
    if (typeof window !== 'undefined') {
      localStorage.removeItem('sb-auth-token');
      localStorage.clear();
    }
    router.push("/login");
  };

  useEffect(() => {
    if (!isMobile) setDrawerOpen(false);
  }, [isMobile]);

  const renderPage = () => {
    switch (page) {
      case "Dashboard":
        return <PageDashboard />;
      case "Appointments":
        return <PageAppointments />;
      case "Services":
        return <PageServices />;
      case "Reviews":
        return <PageReviews />;
      case "Photos":
        return <PagePhotos />;
      case "Settings":
        return <PageSettings />;
      case "Help":
        return <PageHelp />;
      default:
        return null;
    }
  };

  return (
    <ThemeCtx.Provider value={{ T, dark, setDark, page, setPage }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', -apple-system, sans-serif; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${T.border}; border-radius: 9px; }
        @keyframes slide-in { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        @keyframes fade-in  { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

      <div style={{ display: "flex", height: "100vh", background: T.bg, fontFamily: "'DM Sans', -apple-system, sans-serif", overflow: "hidden" }}>
        {/* Desktop Sidebar */}
        {!isMobile && (
          <aside style={{ width: 210, background: T.surface, borderRight: `1px solid ${T.border}`, display: "flex", flexDirection: "column", flexShrink: 0 }}>
            <SidebarContent page={page} setPage={setPage} pendingCount={pendingCount} />
          </aside>
        )}

        {/* Mobile Drawer */}
        {isMobile && drawerOpen && (
          <>
            <div onClick={() => setDrawerOpen(false)} style={{ position: "fixed", inset: 0, background: T.overlay, zIndex: 49, animation: "fade-in 0.2s both" }} />
            <aside style={{ position: "fixed", left: 0, top: 0, bottom: 0, width: 240, background: T.surface, borderRight: `1px solid ${T.border}`, display: "flex", flexDirection: "column", zIndex: 50, animation: "slide-in 0.28s cubic-bezier(0.22,0.61,0.36,1) both" }}>
              <div style={{ padding: "14px 18px", borderBottom: `1px solid ${T.border}`, display: "flex", justifyContent: "flex-end" }}>
                <button onClick={() => setDrawerOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: T.textMuted }}>
                  <Icon d={icons.x} color={T.textMuted} size={20} />
                </button>
              </div>
              <SidebarContent page={page} setPage={setPage} pendingCount={pendingCount} onNavClick={() => setDrawerOpen(false)} />
            </aside>
          </>
        )}

        {/* Main */}
        <main style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
          {/* Top bar */}
          <div style={{ background: T.surface, borderBottom: `1px solid ${T.border}`, padding: isMobile ? "12px 16px" : "13px 26px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, gap: 12 }}>
            {isMobile ? (
              <>
                <button onClick={() => setDrawerOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, flexShrink: 0 }}>
                  <Icon d={icons.menu} color={T.textMid} size={22} />
                </button>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 26, height: 26, borderRadius: 7, background: T.teal, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2l2.5 7.5H22l-6.5 4.7 2.5 7.5L12 17l-6 4.7 2.5-7.5L2 9.5h7.5z" fill="white" />
                    </svg>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 800, color: T.text }}>Mantra Medica</span>
                </div>
              </>
            ) : (
              <div style={{ position: "relative", width: 220 }}>
                <div style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                  <Icon d={icons.search} color={T.textMuted} size={14} />
                </div>
                <input placeholder="Search…" style={{ width: "100%", padding: "8px 12px 8px 32px", borderRadius: 9, border: `1.5px solid ${T.border}`, fontSize: 13, outline: "none", background: T.surface2, boxSizing: "border-box", color: T.text, fontFamily: "inherit" }} />
              </div>
            )}

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* Theme toggle */}
              <button onClick={() => setDark(!dark)} style={{ width: 34, height: 34, borderRadius: 9, background: T.surface2, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
                <Icon d={dark ? icons.sun : icons.moon} color={T.textMid} size={16} />
              </button>

              {/* Bell */}
              <div style={{ position: "relative", flexShrink: 0 }}>
                <button onClick={() => { setShowNotif((p) => !p); setShowAvatar(false); }} style={{ width: 34, height: 34, borderRadius: 9, background: T.surface2, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" }}>
                  <Icon d={icons.bell} color={T.textMid} size={16} />
                  {unreadNotifs > 0 && <span style={{ position: "absolute", top: 4, right: 4, width: 8, height: 8, borderRadius: "50%", background: T.danger, border: `2px solid ${T.surface}` }} />}
                </button>
                {showNotif && <NotifDropdown onClose={() => setShowNotif(false)} />}
              </div>

              {/* Avatar with dropdown */}
              {!isMobile && (
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <button
                    onClick={() => { setShowAvatar((p) => !p); setShowNotif(false); }}
                    style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 9px", background: T.surface2, borderRadius: 9, cursor: "pointer", border: `1px solid ${showAvatar ? T.teal : T.border}`, transition: "border-color 0.15s" }}
                  >
                    <div style={{ width: 26, height: 26, borderRadius: "50%", background: T.teal, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700 }}>AM</div>
                    <div>
                      <p style={{ fontSize: 11, fontWeight: 700, color: T.text, margin: 0 }}>Admin Mantra</p>
                      <p style={{ fontSize: 9, color: T.textMuted, margin: 0 }}>Super Admin</p>
                    </div>
                    <div style={{ transition: "transform 0.2s", transform: showAvatar ? "rotate(180deg)" : "rotate(0deg)" }}>
                      <Icon d={icons.chevDown} color={T.textMuted} size={12} />
                    </div>
                  </button>
                  {showAvatar && (
                    <AvatarDropdown
                      onClose={() => setShowAvatar(false)}
                      onLogout={handleLogout}
                    />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Page content */}
          <div style={{ flex: 1, overflowY: "auto", padding: isMobile ? "18px 16px" : "26px 26px" }}>
            {renderPage()}
          </div>
        </main>
      </div>
    </ThemeCtx.Provider>
  );
}