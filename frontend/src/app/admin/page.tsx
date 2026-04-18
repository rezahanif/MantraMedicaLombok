'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect, useRef, createContext, useContext, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useBookingToast } from "@/components/shared/Bookingtoast";

// ── Theme tokens ──────────────────────────────────────────────
const lightT = {
  bg:"#F4F8F7", surface:"#FFFFFF", surface2:"#F4F8F7",
  text:"#212121", textMid:"#5A5A5A", textMuted:"#9A9A9A",
  border:"#E4ECEB", teal:"#65A396", tealDk:"#4A7D72",
  tealLt:"#87B2A8", danger:"#D95E57", amber:"#E8A444",
  overlay:"rgba(33,33,33,0.45)",
};
const darkT = {
  bg:"#121A19", surface:"#1A2523", surface2:"#1E2D2B",
  text:"#E8F0EF", textMid:"#A0B3B0", textMuted:"#5A7A75",
  border:"#263B38", teal:"#7CB7AC", tealDk:"#A8CFC8",
  tealLt:"#3D635B", danger:"#E07B75", amber:"#E8A444",
  overlay:"rgba(0,0,0,0.65)",
};
type ThemeTokens = typeof lightT;

const ThemeCtx = createContext<{ T:ThemeTokens; dark:boolean; setDark:(v:boolean)=>void; setPage:(p:string)=>void }>(
  { T:lightT, dark:false, setDark:()=>{}, setPage:()=>{} }
);
const useTheme = () => useContext(ThemeCtx);
function useIsMobile(bp=768){ const [m,setM]=useState(false); useEffect(()=>{ const c=()=>setM(window.innerWidth<bp); c(); window.addEventListener('resize',c); return ()=>window.removeEventListener('resize',c); },[bp]); return m; }

// ── Mock data ─────────────────────────────────────────────────
const APPOINTMENTS_DATA: any[] = []; // Data diambil dari Supabase table 'leads'
const REVIEWS_DATA: any[] = []; // Data diambil dari Supabase table 'reviews'
const PHOTOS_DATA: any[] = []; // Fotos diambil dari Supabase, bukan hardcoded

// ── Services data ─────────────────────────────────────────────
const INITIAL_SERVICES = [
  { id:1, name:"Medical Checkup",         tag:"Clinic",     hours:"08:00 – 17:00", desc:"Comprehensive health screening including blood work, vitals, and consultation.",  color:"#65A396", active:true  },
  { id:2, name:"Spa & Recovery",           tag:"Wellness",   hours:"09:00 – 21:00", desc:"Therapeutic massage and reflexology tailored for post-trek muscle recovery.",      color:"#604C3A", active:true  },
  { id:3, name:"Emergency Care",           tag:"Emergency",  hours:"24 Hours",      desc:"Round-the-clock emergency response for altitude sickness, injuries, and acute illness.", color:"#D95E57", active:true  },
  { id:4, name:"Home Visit",               tag:"On-Call",    hours:"08:00 – 20:00", desc:"Our doctors come to your accommodation for consultations and treatment.",          color:"#65A396", active:true  },
  { id:5, name:"Laboratory Diagnostics",   tag:"Lab",        hours:"08:00 – 16:00", desc:"In-house blood tests, urinalysis, and rapid diagnostics for faster results.",      color:"#5B85D4", active:false },
];

const NOTIFS = [
  { id:1, icon:"📅", title:"New appointment", body:"Dian Rahayu – Apr 16, 09:00", time:"10 min ago",  read:false },
  { id:2, icon:"⭐", title:"New review",       body:"Bagas S. left a 4-star review", time:"1 hr ago",   read:false },
  { id:3, icon:"⏳", title:"Pending booking",  body:"Rizki Pratama awaiting confirm", time:"2 hrs ago",  read:false },
  { id:4, icon:"📧", title:"New email",         body:"Dewi Kusuma – rescheduling req", time:"3 hrs ago",  read:true  },
];

// ── Helpers ───────────────────────────────────────────────────
const getStatusColor = (s:string, dark:boolean) => ({
  Confirmed: dark?{bg:"#1B3530",color:"#6FC4B8"}:{bg:"#E8F5F2",color:"#4A7D72"},
  Pending:   dark?{bg:"#2A2010",color:"#C9933A"}:{bg:"#FEF6E8",color:"#B07B1A"},
  Done:      dark?{bg:"#111A30",color:"#5B85D4"}:{bg:"#EAF0FF",color:"#3B5FC0"},
  Cancelled: dark?{bg:"#2A1110",color:"#D4706A"}:{bg:"#FDECEA",color:"#B03A35"},
}[s] || (dark?{bg:"#1E2D2B",color:"#A0B3B0"}:{bg:"#F0F0F0",color:"#666"}));

const Stars = ({n}:{n:number}) => {
  const {T} = useTheme();
  return <>{Array.from({length:5}).map((_,i)=><span key={i} style={{color:i<n?T.amber:"#555",fontSize:14}}>★</span>)}</>;
};

// ── Icons ─────────────────────────────────────────────────────
const Icon = ({d,size=18,color="currentColor"}:{d:string;size?:number;color?:string}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>
);
const icons = {
  dashboard: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  calendar:  "M8 2v4 M16 2v4 M3 10h18 M3 6a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6z",
  star:      "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  image:     "M21 19V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14 M3 15l5-5 4 4 4-4 4 5",
  settings:  "M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
  help:      "M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10z M12 17h.01 M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3",
  logout:    "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4 M16 17l5-5-5-5 M21 12H9",
  plus:      "M12 5v14 M5 12h14",
  search:    "M21 21l-4.35-4.35 M17 11A6 6 0 115 11a6 6 0 0112 0z",
  bell:      "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0",
  chevDown:  "M6 9l6 6 6-6",
  menu:      "M3 12h18 M3 6h18 M3 18h18",
  x:         "M18 6L6 18 M6 6l12 12",
  sun:       "M12 1v2 M12 21v2 M4.22 4.22l1.42 1.42 M18.36 18.36l1.42 1.42 M1 12h2 M21 12h2 M4.22 19.78l1.42-1.42 M18.36 5.64l1.42-1.42 M12 5a7 7 0 000 14A7 7 0 0012 5z",
  moon:      "M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z",
  upload:    "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M17 8l-5-5-5 5 M12 3v12",
  trash:     "M3 6h18 M8 6V4h8v2 M19 6l-1 14H6L5 6",
  eye:       "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z",
  eyeOff:    "M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94 M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19 M1 1l22 22",
  arrowLeft: "M19 12H5 M12 19l-7-7 7-7",
  service:   "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2 M9 5a2 2 0 002 2h2a2 2 0 002-2 M9 5a2 2 0 012-2h2a2 2 0 012 2 M12 12h.01 M12 16h.01",
  map:       "M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z M12 7a3 3 0 100 6 3 3 0 000-6z",
  edit:      "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
  toggle:    "M9 12l2 2 4-4",
  mail:      "M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z M22 6l-10 7L2 6",
};

// ── Confirm Modal ─────────────────────────────────────────────
interface ConfirmProps { title:string; message:string; confirmLabel?:string; danger?:boolean; onConfirm:()=>void; onCancel:()=>void; }
function ConfirmModal({ title, message, confirmLabel="Confirm", danger=false, onConfirm, onCancel }:ConfirmProps) {
  const {T} = useTheme();
  return (
    <div style={{ position:"fixed", inset:0, background:T.overlay, display:"flex", alignItems:"center", justifyContent:"center", zIndex:200, padding:20 }}>
      <div style={{ background:T.surface, borderRadius:20, padding:"28px 30px", width:"100%", maxWidth:380, boxShadow:"0 20px 60px rgba(0,0,0,0.25)" }}>
        <div style={{ width:52,height:52,borderRadius:"50%",background:danger?"#FDECEA":"#E8F5F2",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px" }}>
          <Icon d={danger?icons.trash:icons.calendar} color={danger?"#D95E57":"#65A396"} size={22}/>
        </div>
        <h3 style={{ fontSize:17, fontWeight:700, color:T.text, margin:"0 0 8px", textAlign:"center" }}>{title}</h3>
        <p style={{ fontSize:13, color:T.textMuted, lineHeight:1.6, margin:"0 0 22px", textAlign:"center" }}>{message}</p>
        <div style={{ display:"flex", gap:10 }}>
          <button onClick={onCancel} style={{ flex:1, padding:"11px", borderRadius:10, background:T.surface2, color:T.textMid, border:`1px solid ${T.border}`, fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>Cancel</button>
          <button onClick={onConfirm} style={{ flex:1, padding:"11px", borderRadius:10, background:danger?"#D95E57":T.teal, color:"#fff", border:"none", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}

// ── Notification Dropdown ─────────────────────────────────────
function NotifDropdown({ onClose }:{ onClose:()=>void }) {
  const {T, dark} = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const [notifs, setNotifs] = useState(NOTIFS);
  useEffect(()=>{
    const h=(e:MouseEvent)=>{ if(ref.current&&!ref.current.contains(e.target as Node)) onClose(); };
    setTimeout(()=>document.addEventListener('mousedown',h),0);
    return ()=>document.removeEventListener('mousedown',h);
  },[onClose]);
  const unread = notifs.filter(n=>!n.read).length;
  return (
    <div ref={ref} style={{ position:"absolute", top:"calc(100% + 10px)", right:0, width:320, background:T.surface, borderRadius:16, border:`1px solid ${T.border}`, boxShadow:`0 8px 32px ${dark?"rgba(0,0,0,0.4)":"rgba(33,33,33,0.12)"}`, zIndex:100, overflow:"hidden" }}>
      <div style={{ padding:"14px 16px", borderBottom:`1px solid ${T.border}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:14, fontWeight:700, color:T.text }}>Notifications</span>
          {unread>0 && <span style={{ background:T.teal, color:"#fff", fontSize:10, fontWeight:700, padding:"1px 7px", borderRadius:20 }}>{unread}</span>}
        </div>
        {unread>0 && <button onClick={()=>setNotifs(p=>p.map(n=>({...n,read:true})))} style={{ fontSize:11, color:T.teal, background:"none", border:"none", cursor:"pointer", fontFamily:"inherit", fontWeight:600 }}>Mark all read</button>}
      </div>
      <div style={{ maxHeight:300, overflowY:"auto" }}>
        {notifs.map(n=>(
          <div key={n.id} onClick={()=>setNotifs(p=>p.map(x=>x.id===n.id?{...x,read:true}:x))}
            style={{ padding:"12px 16px", borderBottom:`1px solid ${T.border}`, cursor:"pointer", background:n.read?T.surface:(dark?"#1B3530":"#E8F5F2"), borderLeft:`3px solid ${n.read?"transparent":T.teal}` }}>
            <div style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
              <span style={{ fontSize:18, flexShrink:0 }}>{n.icon}</span>
              <div style={{ flex:1, minWidth:0 }}>
                <p style={{ fontSize:13, fontWeight:n.read?500:700, color:T.text, margin:0 }}>{n.title}</p>
                <p style={{ fontSize:11, color:T.textMid, margin:"2px 0 0", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{n.body}</p>
                <p style={{ fontSize:10, color:T.textMuted, margin:"2px 0 0" }}>{n.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding:"10px 16px", borderTop:`1px solid ${T.border}`, textAlign:"center" }}>
        <span style={{ fontSize:12, color:T.textMuted }}>End of notifications</span>
      </div>
    </div>
  );
}

// ── Avatar Dropdown ───────────────────────────────────────────
function AvatarDropdown({ onClose, onLogout }:{ onClose:()=>void; onLogout:()=>void }) {
  const {T, dark} = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const h=(e:MouseEvent)=>{ if(ref.current&&!ref.current.contains(e.target as Node)) onClose(); };
    setTimeout(()=>document.addEventListener('mousedown',h),0);
    return ()=>document.removeEventListener('mousedown',h);
  },[onClose]);
  return (
    <div ref={ref} style={{ position:"absolute", top:"calc(100% + 10px)", right:0, width:220, background:T.surface, borderRadius:14, border:`1px solid ${T.border}`, boxShadow:`0 8px 28px ${dark?"rgba(0,0,0,0.45)":"rgba(33,33,33,0.13)"}`, zIndex:100, overflow:"hidden" }}>
      {/* Profile row */}
      <div style={{ padding:"14px 16px", borderBottom:`1px solid ${T.border}`, display:"flex", alignItems:"center", gap:10 }}>
        <div style={{ width:38, height:38, borderRadius:"50%", background:T.teal, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, flexShrink:0 }}>AM</div>
        <div style={{ minWidth:0 }}>
          <p style={{ fontSize:13, fontWeight:700, color:T.text, margin:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>Admin Mantra</p>
          <p style={{ fontSize:11, color:T.textMuted, margin:0 }}>Super Admin</p>
        </div>
      </div>
      {/* Actions */}
      <div style={{ padding:"6px" }}>
        <button
          onClick={()=>{ onLogout(); onClose(); }}
          style={{ display:"flex", alignItems:"center", gap:9, width:"100%", padding:"9px 10px", borderRadius:9, border:"none", background:"transparent", color:"#D95E57", fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"inherit", textAlign:"left" }}
          onMouseEnter={e=>(e.currentTarget.style.background=dark?"#2A1110":"#FDECEA")}
          onMouseLeave={e=>(e.currentTarget.style.background="transparent")}
        >
          <Icon d={icons.logout} color="#D95E57" size={15}/>
          Sign Out
        </button>
      </div>
    </div>
  );
}

// ── Stat Card ─────────────────────────────────────────────────
function StatCard({ label, value, sub, subColor, iconD, iconBg }:{ label:string; value:number|string; sub:string; subColor?:string; iconD:string; iconBg?:string }) {
  const {T} = useTheme();
  return (
    <div style={{ background:T.surface, borderRadius:16, border:`1px solid ${T.border}`, padding:"18px 20px", display:"flex", alignItems:"flex-start", gap:13, minWidth:0 }}>
      <div style={{ width:42, height:42, borderRadius:12, background:iconBg||T.surface2, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
        <Icon d={iconD} color={T.teal} size={19}/>
      </div>
      <div style={{ minWidth:0 }}>
        <p style={{ fontSize:11, color:T.textMuted, margin:"0 0 3px", fontWeight:600, letterSpacing:"0.4px", textTransform:"uppercase" }}>{label}</p>
        <p style={{ fontSize:26, fontWeight:700, color:T.text, margin:"0 0 2px", lineHeight:1 }}>{value}</p>
        <p style={{ fontSize:12, color:subColor||T.teal, margin:0, fontWeight:500 }}>{sub}</p>
      </div>
    </div>
  );
}

// ── Page: Dashboard ───────────────────────────────────────────
function PageDashboard() {
  const {T, dark, setPage} = useTheme();
  const isMobile = useIsMobile();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await supabase
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false });
        if (data) setAppointments(data.map((d:any) => ({
          id: d.id,
          name: d.nama_lengkap,
          wa: d.whatsapp,
          service: d.service_type,
          date: d.preferred_date,
          time: d.preferred_time,
          note: d.notes,
          status: d.status || 'Pending'
        })));
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchAppointments();
  }, []);

  const today    = appointments.filter(a=>a.date===new Date().toISOString().split('T')[0]);
  const pending  = appointments.filter(a=>a.status==="Pending").length;
  const pendingReviews = REVIEWS_DATA.filter(r=>!r.visible).length;
  const recent   = appointments.slice(0,5);

  return (
    <div>
      <div style={{ marginBottom:24 }}>
        <h1 style={{ fontSize:isMobile?20:24, fontWeight:700, color:T.text, margin:0 }}>Dashboard</h1>
        <p style={{ fontSize:13, color:T.textMuted, margin:"4px 0 0" }}>Welcome back — here's what's happening today</p>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr 1fr":"repeat(4,1fr)", gap:12, marginBottom:20 }}>
        <StatCard label="Today"   value={today.length} sub="appointments"   iconD={icons.calendar} iconBg={dark?"#1B3530":"#E8F5F2"}/>
        <StatCard label="Pending" value={pending}      sub="bookings"  subColor={pending>0?T.amber:T.teal} iconD={icons.plus}     iconBg={dark?"#2A2010":"#FEF3E8"}/>
        <StatCard label="Reviews" value={pendingReviews} sub={pendingReviews>0?"need review":"all published"} iconD={icons.star} iconBg={dark?"#1E1530":"#F5F0FF"}/>
        <StatCard label="Services" value={INITIAL_SERVICES.filter(s=>s.active).length} sub="active" iconD={icons.service} iconBg={dark?"#1B3530":"#E8F5F2"}/>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1.5fr 1fr", gap:14 }}>
        {/* Upcoming */}
        <div style={{ background:T.surface, borderRadius:16, border:`1px solid ${T.border}`, padding:"18px 20px" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
            <h3 style={{ fontSize:14, fontWeight:700, color:T.text, margin:0 }}>Upcoming Appointments</h3>
            <button onClick={()=>setPage("Appointments")} style={{ fontSize:12, color:T.teal, background:"none", border:"none", cursor:"pointer", fontWeight:600, fontFamily:"inherit", padding:0 }}>See all →</button>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
            {APPOINTMENTS_DATA.slice(0,5).map(a=>(
              <div key={a.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 11px", background:T.surface2, borderRadius:10 }}>
                <div style={{ width:34, height:34, borderRadius:"50%", background:T.teal, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:12, flexShrink:0 }}>
                  {a.name.split(" ").map((w:string)=>w[0]).join("").slice(0,2)}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ fontSize:13, fontWeight:600, color:T.text, margin:0, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{a.name}</p>
                  <p style={{ fontSize:11, color:T.textMuted, margin:0 }}>{a.service} · {a.time}</p>
                </div>
                <span style={{ ...getStatusColor(a.status,dark), fontSize:10, fontWeight:600, padding:"3px 8px", borderRadius:20, flexShrink:0 }}>{a.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent appointments (right panel) */}
        <div style={{ background:T.surface, borderRadius:16, border:`1px solid ${T.border}`, padding:"18px 20px" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
            <h3 style={{ fontSize:14, fontWeight:700, color:T.text, margin:0 }}>Recent Appointments</h3>
            <button onClick={()=>setPage("Appointments")} style={{ fontSize:12, color:T.teal, background:"none", border:"none", cursor:"pointer", fontWeight:600, fontFamily:"inherit", padding:0 }}>All →</button>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {recent.map(a=>(
              <div key={a.id} style={{ padding:"9px 11px", background:T.surface2, borderRadius:10, borderLeft:`3px solid ${getStatusColor(a.status,dark).color}` }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:2 }}>
                  <p style={{ fontSize:12, fontWeight:700, color:T.text, margin:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:"60%" }}>{a.name}</p>
                  <span style={{ fontSize:10, fontWeight:700, ...getStatusColor(a.status,dark), padding:"1px 7px", borderRadius:20, flexShrink:0 }}>{a.status}</span>
                </div>
                <p style={{ fontSize:11, color:T.textMid, margin:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{a.service} · {a.date} {a.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Page: Appointments ────────────────────────────────────────
function PageAppointments() {
  const {T, dark} = useTheme();
  const toast = useBookingToast();
  const isMobile = useIsMobile();
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await supabase
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false });
        if (data) setRows(data.map((d:any) => ({
          id: d.id,
          name: d.nama_lengkap,
          wa: d.whatsapp,
          service: d.service_type,
          date: d.preferred_date,
          time: d.preferred_time,
          note: d.notes,
          status: d.status || 'Pending'
        })));
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchAppointments();
  }, []);
  const [confirm, setConfirm] = useState<{title:string;msg:string;action:()=>void;danger?:boolean}|null>(null);
  const [form, setForm] = useState({name:"",wa:"",service:"Medical Checkup",date:"",time:"",note:""});
  const statuses = ["All","Confirmed","Pending","Done","Cancelled"];
  const services = ["Medical Checkup","Spa & Recovery","Emergency Care"];
  const filtered = rows.filter(r=>(filter==="All"||r.status===filter)&&(r.name.toLowerCase().includes(search.toLowerCase())||r.service.toLowerCase().includes(search.toLowerCase())));
  const inp:React.CSSProperties = { width:"100%", padding:"10px 12px", borderRadius:9, border:`1.5px solid ${T.border}`, fontSize:13, outline:"none", boxSizing:"border-box", color:T.text, background:T.surface2, fontFamily:"inherit" };

  return (
    <div>
      {confirm && <ConfirmModal title={confirm.title} message={confirm.msg} danger={confirm.danger} confirmLabel={confirm.danger?"Delete":"Confirm"} onConfirm={()=>{confirm.action();setConfirm(null);}} onCancel={()=>setConfirm(null)}/>}
      <div style={{ display:"flex", alignItems:isMobile?"flex-start":"center", justifyContent:"space-between", marginBottom:22, flexDirection:isMobile?"column":"row", gap:isMobile?12:0 }}>
        <div>
          <h1 style={{ fontSize:isMobile?20:24, fontWeight:700, color:T.text, margin:0 }}>Appointments</h1>
          <p style={{ fontSize:13, color:T.textMuted, margin:"4px 0 0" }}>Manage patient bookings</p>
        </div>
        <button onClick={()=>setShowForm(!showForm)} style={{ display:"flex", alignItems:"center", gap:7, background:T.teal, color:"#fff", border:"none", borderRadius:10, padding:"10px 18px", fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>
          <Icon d={icons.plus} color="#fff" size={14}/> New Booking
        </button>
      </div>
      {showForm && (
        <div style={{ background:T.surface, borderRadius:16, border:`1px solid ${T.border}`, padding:"20px 22px", marginBottom:18 }}>
          <h3 style={{ fontSize:14, fontWeight:700, color:T.text, margin:"0 0 14px" }}>New Appointment</h3>
          <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:12 }}>
            {([["Full Name","name","text"],["WhatsApp Number","wa","text"]] as [string,"name"|"wa",string][]).map(([lbl,key,type])=>(
              <div key={key}>
                <label style={{ fontSize:11, color:T.textMuted, display:"block", marginBottom:4, fontWeight:600, textTransform:"uppercase" }}>{lbl}</label>
                <input type={type} value={form[key]} onChange={e=>setForm(p=>({...p,[key]:e.target.value}))} style={inp}/>
              </div>
            ))}
            <div>
              <label style={{ fontSize:11, color:T.textMuted, display:"block", marginBottom:4, fontWeight:600, textTransform:"uppercase" }}>Service</label>
              <select value={form.service} onChange={e=>setForm(p=>({...p,service:e.target.value}))} style={{...inp,appearance:"none"}}>{services.map(s=><option key={s}>{s}</option>)}</select>
            </div>
            <div>
              <label style={{ fontSize:11, color:T.textMuted, display:"block", marginBottom:4, fontWeight:600, textTransform:"uppercase" }}>Date</label>
              <input type="date" value={form.date} onChange={e=>setForm(p=>({...p,date:e.target.value}))} style={{...inp,colorScheme:dark?"dark":"light"}}/>
            </div>
            <div>
              <label style={{ fontSize:11, color:T.textMuted, display:"block", marginBottom:4, fontWeight:600, textTransform:"uppercase" }}>Time</label>
              <input type="time" value={form.time} onChange={e=>setForm(p=>({...p,time:e.target.value}))} style={{...inp,colorScheme:dark?"dark":"light"}}/>
            </div>
            <div style={{ gridColumn:"1/-1" }}>
              <label style={{ fontSize:11, color:T.textMuted, display:"block", marginBottom:4, fontWeight:600, textTransform:"uppercase" }}>Notes</label>
              <textarea value={form.note} onChange={e=>setForm(p=>({...p,note:e.target.value}))} rows={2} style={{...inp,resize:"vertical"}}/>
            </div>
          </div>
          <div style={{ display:"flex", gap:10, marginTop:12 }}>
            <button onClick={async()=>{ if(!form.name||!form.wa)return; try { const { data: { user } } = await supabase.auth.getUser(); if (!user) { toast.error("Not authenticated"); return; } const { data, error } = await supabase.from('leads').insert([{ user_id: user.id, nama_lengkap: form.name, whatsapp: form.wa, service_type: form.service, preferred_date: form.date, preferred_time: form.time, notes: form.note, status: "Pending" }]).select(); if (error) throw error; if (data) { setRows(p=>[...p, { id: data[0].id, name: data[0].nama_lengkap, wa: data[0].whatsapp, service: data[0].service_type, date: data[0].preferred_date, time: data[0].preferred_time, note: data[0].notes, status: data[0].status }]); toast.success('Appointment berhasil ditambahkan'); } setForm({name:"",wa:"",service:"Medical Checkup",date:"",time:"",note:""}); setShowForm(false); } catch (err) { console.error(err); toast.error('Gagal tambah appointment'); } }} style={{ background:T.teal, color:"#fff", border:"none", borderRadius:9, padding:"10px 22px", fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>Submit</button>
            <button onClick={()=>setShowForm(false)} style={{ background:T.surface2, color:T.textMid, border:`1px solid ${T.border}`, borderRadius:9, padding:"10px 22px", fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>Cancel</button>
          </div>
        </div>
      )}
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14, flexWrap:"wrap" }}>
        <div style={{ position:"relative", flex:1, minWidth:180 }}>
          <div style={{ position:"absolute", left:11, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}><Icon d={icons.search} color={T.textMuted} size={14}/></div>
          <input placeholder="Search…" value={search} onChange={e=>setSearch(e.target.value)} style={{...inp,padding:"9px 12px 9px 34px"}}/>
        </div>
        <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
          {statuses.map(s=>(
            <button key={s} onClick={()=>setFilter(s)} style={{ padding:"7px 12px", borderRadius:8, fontSize:11, fontWeight:600, cursor:"pointer", border:"none", fontFamily:"inherit", background:filter===s?T.teal:T.surface2, color:filter===s?"#fff":T.textMid }}>{s}</button>
          ))}
        </div>
      </div>
      {isMobile ? (
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {filtered.map(r=>(
            <div key={r.id} style={{ background:T.surface, borderRadius:14, border:`1px solid ${T.border}`, padding:"14px 16px" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
                <div style={{ display:"flex", alignItems:"center", gap:9 }}>
                  <div style={{ width:34, height:34, borderRadius:"50%", background:T.teal, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, flexShrink:0 }}>{r.name.split(" ").map((w:string)=>w[0]).join("").slice(0,2)}</div>
                  <div><p style={{ fontSize:13, fontWeight:700, color:T.text, margin:0 }}>{r.name}</p><p style={{ fontSize:11, color:T.textMuted, margin:0 }}>{r.wa}</p></div>
                </div>
                <span style={{ ...getStatusColor(r.status,dark), fontSize:10, fontWeight:700, padding:"3px 8px", borderRadius:20 }}>{r.status}</span>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6, fontSize:12, color:T.textMid, marginBottom:10 }}>
                <span>{r.service}</span><span>{r.date} · {r.time}</span>
                {r.note && <span style={{ gridColumn:"1/-1", color:T.textMuted, fontStyle:"italic" }}>{r.note}</span>}
              </div>
              <div style={{ display:"flex", gap:8 }}>
                {r.status==="Pending" && <button onClick={()=>setConfirm({title:"Confirm Appointment",msg:`Confirm for ${r.name}?`,action:()=>setRows(p=>p.map(x=>x.id===r.id?{...x,status:"Confirmed"}:x))})} style={{ flex:1, padding:"8px", borderRadius:8, background:dark?"#1B3530":"#E8F5F2", color:T.tealDk, border:"none", fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>Confirm</button>}
                <button onClick={()=>setConfirm({title:"Delete Appointment",msg:`Delete for ${r.name}?`,danger:true,action:async()=>{ try { const { data: { user } } = await supabase.auth.getUser(); if (!user) { toast.error("Not authenticated"); return; } console.log("=== DELETE APPOINTMENT START ==="); console.log("Appointment ID:", r.id, "Type:", typeof r.id); console.log("User ID:", user.id, "Type:", typeof user.id); const { data: appointmentCheck } = await supabase.from('leads').select('id, user_id').eq('id', r.id).single(); console.log("Appointment in DB:", appointmentCheck); if (!appointmentCheck) { console.error("Appointment not found in DB!"); toast.error("Appointment not found"); return; } console.log("Appointment user_id:", appointmentCheck.user_id, "Match?", appointmentCheck.user_id === user.id); const { error } = await supabase.from('leads').delete().eq('id',r.id).eq('user_id', user.id); if(error) { console.error("Delete error:", { message: error.message, code: error.code, details: error.details }); throw error; } console.log("Delete success!"); setRows(p=>p.filter(x=>x.id!==r.id)); toast.success('Appointment berhasil dihapus'); } catch(err) { console.error("Delete catch error:", err); toast.error('Gagal hapus appointment'); }}})} style={{ flex:1, padding:"8px", borderRadius:8, background:dark?"#2A1110":"#FDECEA", color:"#D95E57", border:"none", fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>Delete</button>
              </div>
            </div>
          ))}
          {filtered.length===0 && <p style={{ textAlign:"center", color:T.textMuted, padding:"40px 0", fontSize:14 }}>No appointments found</p>}
        </div>
      ) : (
        <div style={{ background:T.surface, borderRadius:16, border:`1px solid ${T.border}`, overflow:"hidden" }}>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
              <thead>
                <tr style={{ background:T.surface2 }}>
                  {["Patient","WhatsApp","Service","Date & Time","Notes","Status","Actions"].map(h=>(
                    <th key={h} style={{ padding:"11px 14px", textAlign:"left", fontSize:10, fontWeight:700, color:T.textMuted, textTransform:"uppercase", letterSpacing:"0.6px", whiteSpace:"nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r,i)=>(
                  <tr key={r.id} style={{ borderTop:`1px solid ${T.border}`, background:i%2===0?T.surface:T.surface2 }}>
                    <td style={{ padding:"12px 14px" }}><div style={{ display:"flex", alignItems:"center", gap:9 }}><div style={{ width:30, height:30, borderRadius:"50%", background:T.teal, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:700, flexShrink:0 }}>{r.name.split(" ").map((w:string)=>w[0]).join("").slice(0,2)}</div><span style={{ fontWeight:600, color:T.text }}>{r.name}</span></div></td>
                    <td style={{ padding:"12px 14px", color:T.textMid }}>{r.wa}</td>
                    <td style={{ padding:"12px 14px" }}><span style={{ fontSize:11, fontWeight:600, padding:"3px 9px", borderRadius:20, background:r.service==="Medical Checkup"?(dark?"#1B3530":"#E8F5F2"):r.service==="Spa & Recovery"?(dark?"#2A1E14":"#F5EDE8"):(dark?"#2A1110":"#FDECEA"), color:r.service==="Medical Checkup"?T.tealDk:r.service==="Spa & Recovery"?(dark?"#C9933A":"#7B4A2A"):"#D95E57" }}>{r.service}</span></td>
                    <td style={{ padding:"12px 14px", color:T.textMid, whiteSpace:"nowrap" }}>{r.date} · {r.time}</td>
                    <td style={{ padding:"12px 14px", color:T.textMid, maxWidth:150, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{r.note||"—"}</td>
                    <td style={{ padding:"12px 14px" }}><span style={{ ...getStatusColor(r.status,dark), fontSize:10, fontWeight:700, padding:"3px 9px", borderRadius:20 }}>{r.status}</span></td>
                    <td style={{ padding:"12px 14px" }}>
                      <div style={{ display:"flex", gap:6 }}>
                        {r.status==="Pending" && <button onClick={()=>setConfirm({title:"Confirm Appointment",msg:`Confirm for ${r.name}?`,action:()=>setRows(p=>p.map(x=>x.id===r.id?{...x,status:"Confirmed"}:x))})} style={{ padding:"5px 10px", borderRadius:7, background:dark?"#1B3530":"#E8F5F2", color:T.tealDk, border:"none", fontSize:11, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>Confirm</button>}
                        <button onClick={()=>setConfirm({title:"Delete Appointment",msg:`Delete for ${r.name}?`,danger:true,action:async()=>{ try { const { data: { user } } = await supabase.auth.getUser(); if (!user) { toast.error("Not authenticated"); return; } console.log("=== DELETE APPOINTMENT START ==="); console.log("Appointment ID:", r.id, "Type:", typeof r.id); console.log("User ID:", user.id, "Type:", typeof user.id); const { data: appointmentCheck } = await supabase.from('leads').select('id, user_id').eq('id', r.id).single(); console.log("Appointment in DB:", appointmentCheck); if (!appointmentCheck) { console.error("Appointment not found in DB!"); toast.error("Appointment not found"); return; } console.log("Appointment user_id:", appointmentCheck.user_id, "Match?", appointmentCheck.user_id === user.id); const { error } = await supabase.from('leads').delete().eq('id',r.id).eq('user_id', user.id); if(error) { console.error("Delete error:", { message: error.message, code: error.code, details: error.details }); throw error; } console.log("Delete success!"); setRows(p=>p.filter(x=>x.id!==r.id)); toast.success('Appointment berhasil dihapus'); } catch(err) { console.error("Delete catch error:", err); toast.error('Gagal hapus appointment'); }}})} style={{ padding:"5px 10px", borderRadius:7, background:dark?"#2A1110":"#FDECEA", color:"#D95E57", border:"none", fontSize:11, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length===0 && <tr><td colSpan={7} style={{ padding:"40px", textAlign:"center", color:T.textMuted, fontSize:14 }}>No appointments found</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Page: Services ────────────────────────────────────────────
function PageServices() {
  const {T, dark} = useTheme();
  const isMobile = useIsMobile();
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<typeof INITIAL_SERVICES[0]|null>(null);
  const [confirm, setConfirm] = useState<{id:number;name:string}|null>(null);
  const COLORS = ["#65A396","#604C3A","#D95E57","#5B85D4","#8B6DB0","#E8A444"];
  const emptyForm = { name:"", tag:"", hours:"", desc:"", color:"#65A396", active:true };
  const [form, setForm] = useState(emptyForm);

  const openAdd  = () => { setEditItem(null); setForm(emptyForm); setShowForm(true); };
  const openEdit = (s:typeof INITIAL_SERVICES[0]) => { setEditItem(s); setForm({name:s.name,tag:s.tag,hours:s.hours,desc:s.desc,color:s.color,active:s.active}); setShowForm(true); };
  const save = () => {
    if(!form.name) return;
    if(editItem) {
      setServices(p=>p.map(x=>x.id===editItem.id?{...x,...form}:x));
    } else {
      setServices(p=>[...p,{id:Date.now(),...form}]);
    }
    setShowForm(false);
  };

  const inp:React.CSSProperties = { width:"100%", padding:"10px 12px", borderRadius:9, border:`1.5px solid ${T.border}`, fontSize:13, outline:"none", boxSizing:"border-box", color:T.text, background:T.surface2, fontFamily:"inherit" };

  return (
    <div>
      {confirm && <ConfirmModal title="Delete Service" message={`Delete "${confirm.name}"? This cannot be undone.`} danger
        onConfirm={()=>{ setServices(p=>p.filter(x=>x.id!==confirm.id)); setConfirm(null); }} onCancel={()=>setConfirm(null)}/>}

      <div style={{ display:"flex", alignItems:isMobile?"flex-start":"center", justifyContent:"space-between", marginBottom:22, flexDirection:isMobile?"column":"row", gap:12 }}>
        <div>
          <h1 style={{ fontSize:isMobile?20:24, fontWeight:700, color:T.text, margin:0 }}>Services</h1>
          <p style={{ fontSize:13, color:T.textMuted, margin:"4px 0 0" }}>{services.filter(s=>s.active).length} active · {services.length} total</p>
        </div>
        <button onClick={openAdd} style={{ display:"flex", alignItems:"center", gap:7, background:T.teal, color:"#fff", border:"none", borderRadius:10, padding:"10px 18px", fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>
          <Icon d={icons.plus} color="#fff" size={14}/> Add Service
        </button>
      </div>

      {/* Add / Edit form */}
      {showForm && (
        <div style={{ background:T.surface, borderRadius:16, border:`1.5px solid ${T.teal}`, padding:"20px 22px", marginBottom:20 }}>
          <h3 style={{ fontSize:14, fontWeight:700, color:T.text, margin:"0 0 16px" }}>{editItem?"Edit Service":"New Service"}</h3>
          <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:12 }}>
            <div>
              <label style={{ fontSize:11, color:T.textMuted, display:"block", marginBottom:4, fontWeight:600, textTransform:"uppercase" }}>Service Name</label>
              <input value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} placeholder="e.g. Medical Checkup" style={inp}/>
            </div>
            <div>
              <label style={{ fontSize:11, color:T.textMuted, display:"block", marginBottom:4, fontWeight:600, textTransform:"uppercase" }}>Tag / Category</label>
              <input value={form.tag} onChange={e=>setForm(p=>({...p,tag:e.target.value}))} placeholder="e.g. Clinic" style={inp}/>
            </div>
            <div>
              <label style={{ fontSize:11, color:T.textMuted, display:"block", marginBottom:4, fontWeight:600, textTransform:"uppercase" }}>Operating Hours</label>
              <input value={form.hours} onChange={e=>setForm(p=>({...p,hours:e.target.value}))} placeholder="e.g. 08:00 – 17:00" style={inp}/>
            </div>
            <div>
              <label style={{ fontSize:11, color:T.textMuted, display:"block", marginBottom:4, fontWeight:600, textTransform:"uppercase" }}>Accent Color</label>
              <div style={{ display:"flex", gap:7, marginTop:4 }}>
                {COLORS.map(c=>(
                  <button key={c} onClick={()=>setForm(p=>({...p,color:c}))} style={{ width:28, height:28, borderRadius:"50%", background:c, border:form.color===c?"3px solid #fff":"2px solid transparent", outline:form.color===c?`2px solid ${c}`:"none", cursor:"pointer", padding:0, flexShrink:0 }}/>
                ))}
              </div>
            </div>
            <div style={{ gridColumn:"1/-1" }}>
              <label style={{ fontSize:11, color:T.textMuted, display:"block", marginBottom:4, fontWeight:600, textTransform:"uppercase" }}>Description</label>
              <textarea value={form.desc} onChange={e=>setForm(p=>({...p,desc:e.target.value}))} rows={2} placeholder="Short description of this service…" style={{...inp,resize:"vertical"}}/>
            </div>
          </div>
          <div style={{ display:"flex", gap:10, marginTop:14, alignItems:"center" }}>
            <button onClick={save} style={{ background:T.teal, color:"#fff", border:"none", borderRadius:9, padding:"10px 24px", fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>{editItem?"Save Changes":"Add Service"}</button>
            <button onClick={()=>setShowForm(false)} style={{ background:T.surface2, color:T.textMid, border:`1px solid ${T.border}`, borderRadius:9, padding:"10px 20px", fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Service cards */}
      <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:14 }}>
        {services.map(svc=>(
          <div key={svc.id} style={{ background:T.surface, borderRadius:16, border:`1.5px solid ${svc.active?svc.color+"44":T.border}`, padding:"18px 20px", opacity:svc.active?1:0.6, position:"relative", overflow:"hidden" }}>
            {/* Color accent bar */}
            <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:svc.color, borderRadius:"16px 16px 0 0" }}/>

            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:10, marginTop:4 }}>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                  <span style={{ fontSize:11, fontWeight:700, padding:"2px 10px", borderRadius:100, background:svc.color+"22", color:svc.color }}>{svc.tag}</span>
                  {!svc.active && <span style={{ fontSize:9, fontWeight:700, color:T.textMuted, background:T.surface2, padding:"2px 7px", borderRadius:100, border:`1px solid ${T.border}` }}>INACTIVE</span>}
                </div>
                <h3 style={{ fontSize:15, fontWeight:700, color:T.text, margin:0 }}>{svc.name}</h3>
                <p style={{ fontSize:12, color:T.teal, margin:"2px 0 0", fontWeight:500 }}>⏰ {svc.hours}</p>
              </div>

              {/* Toggle active */}
              <button
                onClick={()=>setServices(p=>p.map(x=>x.id===svc.id?{...x,active:!x.active}:x))}
                style={{ width:42, height:24, borderRadius:100, background:svc.active?svc.color:T.border, border:"none", cursor:"pointer", padding:2, transition:"background 0.25s", flexShrink:0, position:"relative" }}
                title={svc.active?"Deactivate":"Activate"}
              >
                <div style={{ width:20, height:20, borderRadius:"50%", background:"#fff", transition:"transform 0.25s", transform:svc.active?"translateX(18px)":"translateX(0)", boxShadow:"0 1px 4px rgba(0,0,0,0.25)" }}/>
              </button>
            </div>

            <p style={{ fontSize:12, color:T.textMid, lineHeight:1.65, margin:"0 0 14px" }}>{svc.desc}</p>

            <div style={{ display:"flex", gap:8 }}>
              <button onClick={()=>openEdit(svc)} style={{ display:"flex", alignItems:"center", gap:5, flex:1, padding:"8px", justifyContent:"center", borderRadius:9, border:`1px solid ${T.border}`, background:T.surface2, color:T.textMid, fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>
                <Icon d={icons.edit} color={T.textMid} size={13}/> Edit
              </button>
              <button onClick={()=>setConfirm({id:svc.id,name:svc.name})} style={{ padding:"8px 14px", borderRadius:9, border:`1px solid ${dark?"#2A1110":"#FDECEA"}`, background:dark?"#2A1110":"#FDECEA", color:"#D95E57", fontSize:12, cursor:"pointer", fontFamily:"inherit" }}>
                <Icon d={icons.trash} color="#D95E57" size={13}/>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Page: Reviews ─────────────────────────────────────────────
function PageReviews() {
  const {T, dark} = useTheme();
  const toast = useBookingToast();
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirm, setConfirm] = useState<{id:number;name:string}|null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    reviewer_name: "", service_tag: "Medical Checkup", rating: 5, comment: "", is_published: false,
  });

  const services = ["Medical Checkup","Spa & Recovery","Emergency Care"];
  const inp:React.CSSProperties = {
    width:"100%", padding:"10px 12px", borderRadius:9,
    border:`1.5px solid ${T.border}`, fontSize:13, outline:"none",
    boxSizing:"border-box", color:T.text, background:T.surface2, fontFamily:"inherit",
  };

  // Fetch reviews dari Supabase
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await supabase
          .from('reviews')
          .select('*')
          .order('review_date', { ascending: false });
        if (data) setReviews(data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchReviews();
  }, []);

  const handlePublishToggle = async (review:any) => {
    const publishedCount = reviews.filter(r => r.is_published).length;
    const isCurrentlyPublished = review.is_published;

    // Jika mau publish dan sudah ada 3 yang published
    if (!isCurrentlyPublished && publishedCount >= 3) {
      toast.warning("Max 3 published reviews. Unpublish satu review yang lain dulu.");
      return;
    }

    // Update di Supabase
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Not authenticated");
        return;
      }
      const { error } = await supabase
        .from('reviews')
        .update({ is_published: !isCurrentlyPublished })
        .eq('id', review.id)
        .eq('user_id', user.id);
      if (error) throw error;
      
      // Update local state
      setReviews(p => p.map(x => x.id === review.id ? { ...x, is_published: !x.is_published } : x));
    } catch (err) {
      console.error(err);
      toast.error('Gagal update review');
    }
  };

  const handleSubmit = async () => {
    if (!form.reviewer_name.trim() || !form.comment.trim()) return;
    
    // Check kalau mau publish, apakah sudah max 3
    if (form.is_published) {
      const publishedCount = reviews.filter(r => r.is_published).length;
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
        .insert([{
          user_id: user.id,
          reviewer_name: form.reviewer_name,
          service_tag: form.service_tag,
          rating: form.rating,
          comment: form.comment,
          review_date: today,
          is_published: form.is_published,
        }])
        .select();
      if (error) throw error;
      if (data) {
        setReviews(p => [...p, data[0]]);
        toast.success("Review berhasil ditambahkan");
      }
      setForm({ reviewer_name:"", service_tag:"Medical Checkup", rating:5, comment:"", is_published:false });
      setShowForm(false);
    } catch (err) {
      console.error(err);
      toast.error('Gagal tambah review');
    }
  };

  return (
    <div>
      {confirm && <ConfirmModal title="Delete Review" message={`Delete review from ${confirm.name}?`} danger
        onConfirm={async()=>{ try { const { data: { user } } = await supabase.auth.getUser(); if (!user) { toast.error("Not authenticated"); setConfirm(null); return; } await supabase.from('reviews').delete().eq('id',confirm!.id).eq('user_id', user.id); setReviews(p=>p.filter(x=>x.id!==confirm!.id)); toast.success("Review berhasil dihapus"); } catch(err) { console.error(err); toast.error('Gagal hapus review'); } setConfirm(null); }}
        onCancel={()=>setConfirm(null)}/>}

      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:22, flexWrap:"wrap", gap:12 }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:700, color:T.text, margin:0 }}>Reviews</h1>
          <p style={{ fontSize:13, color:T.textMuted, margin:"4px 0 0" }}>
            {reviews.filter(r=>r.is_published).length} of {reviews.length} published (max 3)
          </p>
        </div>
        <button onClick={()=>{ setShowForm(true); setForm({reviewer_name:"",service_tag:"Medical Checkup",rating:5,comment:"",is_published:false}); }}
          style={{ display:"flex", alignItems:"center", gap:7, background:T.teal, color:"#fff", border:"none", borderRadius:10, padding:"10px 18px", fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>
          <Icon d={icons.plus} color="#fff" size={14}/> Add Review
        </button>
      </div>

      {/* Add Review form */}
      {showForm && (
        <div style={{ background:T.surface, borderRadius:16, border:`1.5px solid ${T.teal}`, padding:"20px 22px", marginBottom:20 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
            <h3 style={{ fontSize:14, fontWeight:700, color:T.text, margin:0 }}>New Review</h3>
            <button onClick={()=>setShowForm(false)} style={{ background:"none", border:"none", cursor:"pointer", padding:4 }}>
              <Icon d={icons.x} color={T.textMuted} size={16}/>
            </button>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
            {/* Name */}
            <div>
              <label style={{ fontSize:11, color:T.textMuted, display:"block", marginBottom:4, fontWeight:600, textTransform:"uppercase" }}>Patient Name *</label>
              <input value={form.reviewer_name} onChange={e=>setForm(p=>({...p,reviewer_name:e.target.value}))} placeholder="e.g. Dian R." style={inp}/>
            </div>

            {/* Service */}
            <div>
              <label style={{ fontSize:11, color:T.textMuted, display:"block", marginBottom:4, fontWeight:600, textTransform:"uppercase" }}>Service</label>
              <select value={form.service_tag} onChange={e=>setForm(p=>({...p,service_tag:e.target.value}))} style={{...inp,appearance:"none" as const}}>
                {services.map(s=><option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Star rating picker */}
          <div style={{ marginBottom:12 }}>
            <label style={{ fontSize:11, color:T.textMuted, display:"block", marginBottom:6, fontWeight:600, textTransform:"uppercase" }}>Rating *</label>
            <div style={{ display:"flex", gap:6 }}>
              {[1,2,3,4,5].map(n=>(
                <button key={n} onClick={()=>setForm(p=>({...p,rating:n}))}
                  style={{ background:"none", border:"none", cursor:"pointer", padding:2, fontSize:26, color:n<=form.rating?"#E8A444":"#CCC", lineHeight:1, transition:"transform 0.1s" }}
                  onMouseEnter={e=>(e.currentTarget.style.transform="scale(1.2)")}
                  onMouseLeave={e=>(e.currentTarget.style.transform="scale(1)")}>★</button>
              ))}
              <span style={{ fontSize:13, color:T.textMuted, alignSelf:"center", marginLeft:6 }}>{form.rating} star{form.rating>1?"s":""}</span>
            </div>
          </div>

          {/* Review text */}
          <div style={{ marginBottom:12 }}>
            <label style={{ fontSize:11, color:T.textMuted, display:"block", marginBottom:4, fontWeight:600, textTransform:"uppercase" }}>Review Text *</label>
            <textarea value={form.comment} onChange={e=>setForm(p=>({...p,comment:e.target.value}))} rows={3}
              placeholder="Write the review content here…"
              style={{...inp, resize:"vertical"}}/>
          </div>

          {/* Publish toggle */}
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
            <button onClick={()=>setForm(p=>({...p,is_published:!p.is_published}))}
              style={{ width:42, height:24, borderRadius:100, background:form.is_published?T.teal:T.border, border:"none", cursor:"pointer", padding:2, position:"relative", transition:"background 0.25s" }}>
              <div style={{ width:20, height:20, borderRadius:"50%", background:"#fff", transition:"transform 0.25s", transform:form.is_published?"translateX(18px)":"translateX(0)", boxShadow:"0 1px 4px rgba(0,0,0,0.25)" }}/>
            </button>
            <span style={{ fontSize:13, color:T.textMid, fontWeight:500 }}>
              {form.is_published ? "Publish immediately (~max 3)" : "Save as hidden"}
            </span>
          </div>

          <div style={{ display:"flex", gap:10 }}>
            <button onClick={handleSubmit} disabled={!form.reviewer_name.trim()||!form.comment.trim()}
              style={{ background:T.teal, color:"#fff", border:"none", borderRadius:9, padding:"10px 24px", fontSize:13, fontWeight:600, cursor:(!form.reviewer_name.trim()||!form.comment.trim())?"not-allowed":"pointer", opacity:(!form.reviewer_name.trim()||!form.comment.trim())?0.55:1, fontFamily:"inherit" }}>
              Add Review
            </button>
            <button onClick={()=>setShowForm(false)} style={{ background:T.surface2, color:T.textMid, border:`1px solid ${T.border}`, borderRadius:9, padding:"10px 20px", fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Review cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))", gap:14 }}>
        {reviews.map(r=>(
          <div key={r.id} style={{ background:T.surface, borderRadius:16, border:`1.5px solid ${r.is_published?T.teal:T.border}`, padding:"16px 18px", position:"relative", opacity:r.is_published?1:0.65 }}>
            {!r.is_published && <span style={{ position:"absolute", top:11, right:12, fontSize:9, background:T.surface2, color:T.textMuted, padding:"2px 7px", borderRadius:20, fontWeight:700, letterSpacing:"0.5px" }}>HIDDEN</span>}
            <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:9 }}>
              <div style={{ width:36, height:36, borderRadius:"50%", background:T.teal, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, flexShrink:0 }}>
                {r.reviewer_name.replace(".","").split(" ").map((w:string)=>w[0]).join("").slice(0,2)}
              </div>
              <div>
                <p style={{ fontSize:13, fontWeight:700, color:T.text, margin:0 }}>{r.reviewer_name}</p>
                <p style={{ fontSize:11, color:T.textMuted, margin:0 }}>{r.service_tag} · {r.review_date}</p>
              </div>
            </div>
            <div style={{ marginBottom:7 }}><Stars n={r.rating}/></div>
            <p style={{ fontSize:12, color:T.textMid, lineHeight:1.6, margin:"0 0 12px" }}>{r.comment}</p>
            <div style={{ display:"flex", gap:7 }}>
              <button onClick={()=>handlePublishToggle(r)}
                style={{ flex:1, padding:"8px", borderRadius:8, border:`1px solid ${r.is_published?T.border:T.teal}`, background:r.is_published?T.surface2:(dark?"#1B3530":"#E8F5F2"), color:r.is_published?T.textMid:T.tealDk, fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>
                {r.is_published?"Hide":"Publish"}
              </button>
              <button onClick={()=>setConfirm({id:r.id,name:r.reviewer_name})}
                style={{ padding:"8px 12px", borderRadius:8, border:`1px solid ${dark?"#2A1110":"#FDECEA"}`, background:dark?"#2A1110":"#FDECEA", color:"#D95E57", fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Page: Photos ──────────────────────────────────────────────
function PagePhotos() {
  const toast = useBookingToast();
  const {T, dark} = useTheme();
  const [photos, setPhotos] = useState<any[]>([]);
  const [cat, setCat] = useState("All");
  const [confirm, setConfirm] = useState<{id:number;title:string;storage_path?:string}|null>(null);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ label:"", category:"Facility" });
  const [previewFile, setPreviewFile] = useState<File|null>(null);
  const [previewUrl,  setPreviewUrl]  = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  // Fetch photos from Supabase on mount
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const { data } = await supabase.from('gallery').select('*').order('id', { ascending: false });
        console.log("Gallery data structure:", data?.[0]); // DEBUG: See column names
        if (data) setPhotos(data.map((d:any) => ({
          id: d.id,
          url: d.photo_url,
          label: d.title,
          category: d.category,
          visible: d.is_visible,
          storage_path: d.storage_path
        })));
      } catch (err) { console.error(err); }
    };
    fetchPhotos();
  }, []);

  const cats = ["All","Facility","Spa"];
  const filtered = cat==="All" ? photos : photos.filter(p=>p.category===cat);
  const inp:React.CSSProperties = {
    width:"100%", padding:"10px 12px", borderRadius:9,
    border:`1.5px solid ${T.border}`, fontSize:13, outline:"none",
    boxSizing:"border-box", color:T.text, background:T.surface2, fontFamily:"inherit",
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setPreviewFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  // Check jika kategori sudah penuh (5 foto)
  const isCategoryFull = photos.filter(p=>p.category===form.category).length >= 5;

  const handleSubmit = async () => {
    if (!form.label || !previewFile) return;
    setUploading(true);
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      console.log("Current user:", user?.id); // DEBUG
      
      if (!user) {
        toast.error("Not authenticated. Please login.");
        setUploading(false);
        return;
      }

      // 1. Check kuota per kategori (maks 5 foto per kategori)
      const { count: catCount } = await supabase
        .from("gallery")
        .select("*", { count:"exact", head:true })
        .eq("category", form.category);
      
      if (catCount && catCount >= 5) {
        toast.warning(`Kategori "${form.category}" sudah penuh (max 5). Hapus foto lama dulu.`);
        setUploading(false);
        return;
      }
      
      // 2. Generate filename & upload ke Storage
      const fileExt = previewFile.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `public/${fileName}`;
      
      const { error: upErr } = await supabase.storage.from("gallery_photos").upload(filePath, previewFile, { cacheControl:"3600", upsert:false });
      if (upErr) throw upErr;
      
      // 3. Get public URL
      const { data: { publicUrl } } = supabase.storage.from("gallery_photos").getPublicUrl(filePath);
      
      // 4. Insert ke database dengan user_id (untuk RLS)
      const insertPayload = {
        user_id: user.id,
        title: form.label,
        category: form.category,
        photo_url: publicUrl,
        storage_path: filePath,
        is_visible: true
      };
      console.log("Insert payload:", insertPayload); // DEBUG: See exactly what's being sent
      
      const { data: insData, error: insErr } = await supabase.from("gallery").insert([insertPayload]).select();
      
      if (insErr) {
        console.error("Insert error details:", { message: insErr.message, code: insErr.code, details: insErr.details }); // DEBUG: Details
        throw insErr;
      }
      
      console.log("Insert success! Data:", insData); // DEBUG: Success response
      
      if (insData && insData.length > 0) {
        const newPhoto = insData[0];
        setPhotos(prev => [...prev, { id:newPhoto.id, url:newPhoto.photo_url, label:newPhoto.title, category:newPhoto.category, visible:newPhoto.is_visible }]);
      }
      setShowForm(false); setForm({label:"",category:"Facility"}); setPreviewFile(null); setPreviewUrl("");
      toast.success("Foto berhasil diupload!");
    } catch (err: any) { console.error("Full error:", err); toast.error(`Upload gagal: ${err.message || err}`); }
    finally { setUploading(false); }
  };

  return (
    <div>
      {confirm && <ConfirmModal title="Delete Photo" message={`Delete "${confirm.title}"?`} danger
        onConfirm={async ()=>{
          try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
              toast.error("Not authenticated");
              setConfirm(null);
              return;
            }
            
            console.log("Deleting photo ID:", confirm.id, "Storage path:", confirm.storage_path); // DEBUG
            
            // 1. Delete file dari Storage dulu (gunakan storage_path dari DB)
            const { error: storageError } = await supabase
              .storage
              .from('gallery_photos')
              .remove([confirm.storage_path]);
            
            if (storageError) {
              console.error("Storage delete error:", storageError);
              throw storageError;
            }
            
            console.log("Storage delete success, now deleting from DB..."); // DEBUG
            
            // 2. Jika file di storage berhasil dihapus, baru hapus baris di tabel
            const { error: dbError } = await supabase
              .from('gallery')
              .delete()
              .eq('id', confirm.id)
              .eq('user_id', user.id);
            
            if (dbError) {
              console.error("Delete error FULL:", { message: dbError.message, code: dbError.code, details: dbError.details }); // DEBUG
              throw dbError;
            }
            
            console.log("Delete success!"); // DEBUG
            setPhotos(p=>p.filter(x=>x.id!==confirm!.id));
            toast.success('Foto dan data berhasil dibersihkan!');
          } catch (err: any) {
            console.error("Delete catch error:", err); // DEBUG
            toast.error('Delete failed: ' + err.message);
          }
          setConfirm(null);
        }}
        onCancel={()=>setConfirm(null)}/>}

      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:22, flexWrap:"wrap", gap:12 }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:700, color:T.text, margin:0 }}>Photos</h1>
          <p style={{ fontSize:13, color:T.textMuted, margin:"4px 0 0" }}>
            {photos.filter(p=>p.visible).length} visible · {photos.length} total
          </p>
        </div>
        <button
          onClick={()=>{ setShowForm(true); setForm({label:"",category:"Facility"}); setPreviewFile(null); setPreviewUrl(""); }}
          disabled={isCategoryFull}
          title={isCategoryFull ? "Kategori penuh (5 foto max). Hapus foto lama dulu." : "Upload foto baru"}
          style={{ display:"flex", alignItems:"center", gap:7, background:isCategoryFull?T.border:T.teal, color:"#fff", border:"none", borderRadius:10, padding:"10px 18px", fontSize:13, fontWeight:600, cursor:isCategoryFull?"not-allowed":"pointer", fontFamily:"inherit", opacity:isCategoryFull?0.5:1 }}
        >
          <Icon d={icons.upload} color="#fff" size={14}/> {isCategoryFull?"Kategori Penuh":"Upload Photo"}
        </button>
      </div>

      {/* Upload form — shown BEFORE file picker */}
      {showForm && (
        <div style={{ background:T.surface, borderRadius:16, border:`1.5px solid ${T.teal}`, padding:"20px 22px", marginBottom:20 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
            <h3 style={{ fontSize:14, fontWeight:700, color:T.text, margin:0 }}>New Photo</h3>
            <button onClick={()=>setShowForm(false)} style={{ background:"none", border:"none", cursor:"pointer", padding:4 }}>
              <Icon d={icons.x} color={T.textMuted} size={16}/>
            </button>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:14 }}>
            <div>
              <label style={{ fontSize:11, color:T.textMuted, display:"block", marginBottom:4, fontWeight:600, textTransform:"uppercase" }}>Photo Label *</label>
              <input value={form.label} onChange={e=>setForm(p=>({...p,label:e.target.value}))} placeholder="e.g. Spa Room" style={inp}/>
            </div>
            <div>
              <label style={{ fontSize:11, color:T.textMuted, display:"block", marginBottom:4, fontWeight:600, textTransform:"uppercase" }}>Category *</label>
              <select value={form.category} onChange={e=>setForm(p=>({...p,category:e.target.value}))} style={{...inp,appearance:"none" as const}}>
                {["Facility","Spa"].map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div style={{ marginBottom:16 }}>
            <label style={{ fontSize:11, color:T.textMuted, display:"block", marginBottom:6, fontWeight:600, textTransform:"uppercase" }}>Photo File *</label>
            {!previewUrl ? (
              <button onClick={()=>fileRef.current?.click()}
                style={{ width:"100%", padding:"28px 0", borderRadius:12, border:`2px dashed ${T.border}`, background:T.surface2, color:T.textMuted, fontSize:13, cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:8, fontFamily:"inherit" }}>
                <Icon d={icons.image} color={T.textMuted} size={28}/>
                Click to choose photo
              </button>
            ) : (
              <div style={{ display:"flex", alignItems:"flex-start", gap:14 }}>
                <div style={{ position:"relative" }}>
                  <img src={previewUrl} alt="preview" style={{ width:140, height:96, objectFit:"cover", borderRadius:10, border:`1px solid ${T.border}`, display:"block" }}/>
                  <button onClick={()=>{ setPreviewFile(null); setPreviewUrl(""); if(fileRef.current) fileRef.current.value=""; }}
                    style={{ position:"absolute", top:5, right:5, background:"rgba(0,0,0,0.55)", border:"none", borderRadius:"50%", width:20, height:20, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", padding:0 }}>
                    <Icon d={icons.x} color="#fff" size={11}/>
                  </button>
                </div>
                <div>
                  <p style={{ fontSize:12, color:T.textMid, margin:"0 0 6px", fontWeight:500 }}>{previewFile?.name}</p>
                  <button onClick={()=>fileRef.current?.click()} style={{ fontSize:11, color:T.teal, background:"none", border:"none", cursor:"pointer", fontFamily:"inherit", fontWeight:600, padding:0 }}>Change file</button>
                </div>
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} style={{ display:"none" }}/>
          </div>

          <div style={{ display:"flex", gap:10 }}>
            <button onClick={handleSubmit} disabled={!form.label||!previewFile||uploading}
              style={{ background:T.teal, color:"#fff", border:"none", borderRadius:9, padding:"10px 24px", fontSize:13, fontWeight:600, cursor:(!form.label||!previewFile||uploading)?"not-allowed":"pointer", opacity:(!form.label||!previewFile||uploading)?0.55:1, fontFamily:"inherit" }}>
              {uploading ? "Uploading…" : "Upload Photo"}
            </button>
            <button onClick={()=>setShowForm(false)} style={{ background:T.surface2, color:T.textMid, border:`1px solid ${T.border}`, borderRadius:9, padding:"10px 20px", fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Category filter */}
      <div style={{ display:"flex", gap:7, marginBottom:16, flexWrap:"wrap" }}>
        {cats.map(c=>(
          <button key={c} onClick={()=>setCat(c)} style={{ padding:"8px 16px", borderRadius:8, fontSize:12, fontWeight:600, cursor:"pointer", border:"none", fontFamily:"inherit", background:cat===c?T.teal:T.surface2, color:cat===c?"#fff":T.textMid }}>{c}</button>
        ))}
      </div>

      {/* Photo grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))", gap:14 }}>
        {filtered.map(p=>(
          <div key={p.id} style={{ borderRadius:14, overflow:"hidden", border:`1.5px solid ${T.border}`, background:T.surface, opacity:p.visible?1:0.6 }}>
            <div style={{ position:"relative", paddingTop:"65%" }}>
              <img src={p.url} alt={p.label} style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }}/>
              {!p.visible && <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.4)", display:"flex", alignItems:"center", justifyContent:"center" }}><span style={{ fontSize:10, color:"#fff", background:"rgba(0,0,0,0.5)", padding:"3px 9px", borderRadius:20, fontWeight:700 }}>HIDDEN</span></div>}
            </div>
            <div style={{ padding:"11px 13px" }}>
              <p style={{ fontSize:13, fontWeight:600, color:T.text, margin:"0 0 2px" }}>{p.label}</p>
              <p style={{ fontSize:11, color:T.textMuted, margin:"0 0 9px" }}>{p.category}</p>
              <div style={{ display:"flex", gap:7 }}>
                <button onClick={async ()=>{
                  if (!p.visible) {
                    const visibleCount = photos.filter(x=>x.category===p.category&&x.visible).length;
                    if (visibleCount >= 3) { toast.warning(`Maks 3 foto "${p.category}" yang visible. Sembunyikan satu dulu.`); return; }
                  }
                  try {
                    // Get current user
                    const { data: { user } } = await supabase.auth.getUser();
                    if (!user) {
                      toast.error("Not authenticated");
                      return;
                    }
                    
                    console.log("=== TOGGLE START ===");
                    console.log("Photo ID from state:", p.id, "Type:", typeof p.id);
                    console.log("User ID:", user.id, "Type:", typeof user.id);
                    
                    // First, fetch the photo to see what user_id it has
                    const { data: photoCheck } = await supabase
                      .from('gallery')
                      .select('id, user_id, is_visible')
                      .eq('id', p.id)
                      .single();
                    
                    console.log("Photo in DB:", photoCheck); // DEBUG: See actual photo data
                    
                    if (!photoCheck) {
                      console.error("Photo not found in DB!");
                      toast.error("Photo not found in database");
                      return;
                    }
                    
                    console.log("Photo user_id in DB:", photoCheck.user_id, "Current user ID:", user.id, "Match?", photoCheck.user_id === user.id);
                    
                    const { data: updateData, error } = await supabase
                      .from('gallery')
                      .update({ is_visible: !p.visible })
                      .eq('id', p.id)
                      .eq('user_id', user.id) // Verify ownership via RLS
                      .select();
                    
                    console.log("Update response - Data:", updateData, "Error:", error); // DEBUG
                    
                    if (error) {
                      console.error("Update error FULL:", { message: error.message, code: error.code, details: error.details, hint: error.hint }); // DEBUG
                      throw error;
                    }
                    
                    if (updateData && updateData.length > 0) {
                      console.log("Update SUCCESS! Fresh data:", updateData[0]); // DEBUG
                      setPhotos(prev=>prev.map(x=>x.id===p.id?{...x,visible:!x.visible}:x));
                      toast.success(p.visible ? "Hidden" : "Shown");
                    } else {
                      console.warn("Update returned empty data - no rows matched"); // DEBUG
                      toast.error("Photo not found or permission denied");
                    }
                  } catch (err: any) { 
                    console.error("Toggle catch error:", err); // DEBUG
                    toast.error('Update failed: ' + err.message);
                  }
                }}
                  style={{ flex:1, padding:"7px", borderRadius:7, border:`1px solid ${p.visible?T.border:T.teal}`, background:p.visible?T.surface2:(dark?"#1B3530":"#E8F5F2"), color:p.visible?T.textMid:T.tealDk, fontSize:11, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>
                  {p.visible?"Hide":"Show"}
                </button>
                  <button onClick={()=>setConfirm({id:p.id,title:p.label,storage_path:p.storage_path})} style={{ padding:"7px 10px", borderRadius:7, border:`1px solid ${dark?"#2A1110":"#FDECEA"}`, background:dark?"#2A1110":"#FDECEA", color:"#D95E57", fontSize:11, cursor:"pointer", fontFamily:"inherit" }}>
                  <Icon d={icons.trash} color="#D95E57" size={12}/>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Page: Settings ────────────────────────────────────────────
function PageSettings() {
  const {T, dark, setDark} = useTheme();
  const isMobile = useIsMobile();
  const [tab, setTab] = useState("Profile");
  const [showPass, setShowPass] = useState(false);
  const [name, setName] = useState("Admin Mantra");
  const [email, setEmail] = useState("admin@mantramedica.com");
  const [saved, setSaved] = useState(false);
  const tabs = ["Profile","Security","Display","Integrations"];
  const save = () => { setSaved(true); setTimeout(()=>setSaved(false),2000); };
  const inp:React.CSSProperties = { width:"100%", padding:"11px 14px", borderRadius:10, border:`1.5px solid ${T.border}`, fontSize:13, outline:"none", boxSizing:"border-box", color:T.text, background:T.surface2, fontFamily:"inherit" };

  // Integration state — fetch from clinic_info table
  const [integrations, setIntegrations] = useState([
    { id:"gmail",  name:"Gmail",           desc:"Not connected",                    connected:false, value:"", icon:"📧" },
    { id:"wa",     name:"WhatsApp Number", desc:"Not connected",                    connected:false, value:"", icon:"💬" },
    { id:"gmaps",  name:"Google Maps",     desc:"Not connected",                    connected:false, value:"", icon:"🗺️" },
    { id:"location", name:"Location",      desc:"Not connected",                    connected:false, value:"", icon:"📍" },
  ]);
  const [mapPopup, setMapPopup] = useState<{id:string;label:string;current:string}|null>(null);
  const [popupInput, setPopupInput] = useState("");
  const [loading, setLoading] = useState(true);

  // Load clinic info from database on mount
  useEffect(() => {
    const loadClinicInfo = async () => {
      try {
        const { data } = await supabase.from('clinic_info').select('*').single();
        if (data) {
          setIntegrations(prev => prev.map(item => {
            const fieldMap: Record<string, keyof typeof data> = {
              'gmail': 'email_address',
              'wa': 'whatsapp_number',
              'gmaps': 'gmaps_link',
              'location': 'address_text',
            };
            const dbField = fieldMap[item.id];
            const value = data[dbField] || '';
            return {
              ...item,
              value,
              connected: !!value,
              desc: value ? `Connected: ${value}` : 'Not connected',
            };
          }));
        }
      } catch (err) {
        console.error('Error loading clinic info:', err);
      } finally {
        setLoading(false);
      }
    };
    loadClinicInfo();
  }, []);

  const openPopup = (item:typeof integrations[0]) => {
    setMapPopup({id:item.id, label:item.name, current:item.value});
    setPopupInput(item.value);
  };
  
  const savePopup = async () => {
    if(!mapPopup) return;
    try {
      const fieldMap: Record<string, string> = {
        'gmail': 'email_address',
        'wa': 'whatsapp_number',
        'gmaps': 'gmaps_link',
        'location': 'address_text',
      };
      const dbField = fieldMap[mapPopup.id];
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.error('Not authenticated');
        return;
      }
      const { error } = await supabase.from('clinic_info').update({ [dbField]: popupInput }).eq('id', 1).eq('user_id', user.id);
      if (error) throw error;
      setIntegrations(p=>p.map(x=>x.id===mapPopup.id?{...x,connected:!!popupInput,value:popupInput,desc:popupInput?`Connected: ${popupInput}`:"Not connected"}:x));
      setMapPopup(null);
    } catch (err) {
      console.error('Error saving to database:', err);
    }
  };

  return (
    <div>
      {/* Connect popup modal */}
      {mapPopup && (
        <div style={{ position:"fixed", inset:0, background:T.overlay, display:"flex", alignItems:"center", justifyContent:"center", zIndex:200, padding:20 }}>
          <div style={{ background:T.surface, borderRadius:20, padding:"28px 30px", width:"100%", maxWidth:400, boxShadow:"0 20px 60px rgba(0,0,0,0.25)" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
              <h3 style={{ fontSize:16, fontWeight:700, color:T.text, margin:0 }}>{integrations.find(x=>x.id===mapPopup.id)?.connected?"Change":"Connect"} {mapPopup.label}</h3>
              <button onClick={()=>setMapPopup(null)} style={{ background:"none", border:"none", cursor:"pointer", color:T.textMuted, padding:4 }}><Icon d={icons.x} color={T.textMuted} size={18}/></button>
            </div>
            <label style={{ fontSize:11, color:T.textMuted, display:"block", marginBottom:6, fontWeight:600, textTransform:"uppercase" }}>
              {mapPopup.id==="gmaps" ? "Google Maps Embed URL" : mapPopup.id==="wa" ? "WhatsApp Number" : mapPopup.id==="location" ? "Location Address" : "Email Address"}
            </label>
            <input
              autoFocus
              value={popupInput}
              onChange={e=>setPopupInput(e.target.value)}
              placeholder={mapPopup.id==="gmaps"?"https://maps.google.com/...":mapPopup.id==="wa"?"+62 8xx-xxxx-xxxx":mapPopup.id==="location"?"e.g. Rinjani, Lombok Utara":"email@domain.com"}
              style={{...inp,marginBottom:18}}
            />
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={()=>setMapPopup(null)} style={{ flex:1, padding:"11px", borderRadius:10, background:T.surface2, color:T.textMid, border:`1px solid ${T.border}`, fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>Cancel</button>
              <button onClick={savePopup} style={{ flex:1, padding:"11px", borderRadius:10, background:T.teal, color:"#fff", border:"none", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>Save</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ marginBottom:22 }}>
        <h1 style={{ fontSize:22, fontWeight:700, color:T.text, margin:0 }}>Settings</h1>
        <p style={{ fontSize:13, color:T.textMuted, margin:"4px 0 0" }}>Manage your account and preferences</p>
      </div>
      <div style={{ display:"flex", gap:14, flexDirection:isMobile?"column":"row" }}>
        <div style={{ width:isMobile?"100%":170, flexShrink:0 }}>
          <div style={{ background:T.surface, borderRadius:14, border:`1px solid ${T.border}`, overflow:"hidden", display:isMobile?"flex":"block", flexWrap:"wrap" }}>
            {tabs.map(t=>(
              <button key={t} onClick={()=>setTab(t)} style={{ display:"block", width:isMobile?"auto":"100%", flex:isMobile?"1":"unset", padding:"11px 14px", textAlign:"left", border:"none", borderBottom:isMobile?"none":`1px solid ${T.border}`, borderRight:isMobile?`1px solid ${T.border}`:"none", background:tab===t?(dark?"#1B3530":"#E8F5F2"):T.surface, color:tab===t?T.tealDk:T.textMid, fontSize:12, fontWeight:tab===t?700:500, cursor:"pointer", fontFamily:"inherit" }}>{t}</button>
            ))}
          </div>
        </div>
        <div style={{ flex:1, background:T.surface, borderRadius:16, border:`1px solid ${T.border}`, padding:"22px 24px" }}>
          {tab==="Profile" && (
            <div>
              <h3 style={{ fontSize:15, fontWeight:700, color:T.text, margin:"0 0 18px" }}>Profile</h3>
              <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:20 }}>
                <div style={{ width:56, height:56, borderRadius:"50%", background:T.teal, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, fontWeight:700 }}>AM</div>
                <div><p style={{ fontSize:14, fontWeight:700, color:T.text, margin:0 }}>{name}</p><p style={{ fontSize:12, color:T.textMuted, margin:"2px 0 5px" }}>Super Admin</p><button style={{ fontSize:11, color:T.teal, background:"none", border:"none", cursor:"pointer", padding:0, fontFamily:"inherit", fontWeight:600 }}>Change avatar</button></div>
              </div>
              {([["Full Name","text",name,setName],["Email Address","email",email,setEmail]] as [string,string,string,(v:string)=>void][]).map(([lbl,type,val,setter])=>(
                <div key={lbl} style={{ marginBottom:14 }}>
                  <label style={{ fontSize:11, color:T.textMuted, display:"block", marginBottom:5, fontWeight:600, textTransform:"uppercase" }}>{lbl}</label>
                  <input type={type} value={val} onChange={e=>setter(e.target.value)} style={inp}/>
                </div>
              ))}
            </div>
          )}
          {tab==="Security" && (
            <div>
              <h3 style={{ fontSize:15, fontWeight:700, color:T.text, margin:"0 0 18px" }}>Password</h3>
              {["Current Password","New Password","Confirm New Password"].map(lbl=>(
                <div key={lbl} style={{ marginBottom:14, position:"relative" }}>
                  <label style={{ fontSize:11, color:T.textMuted, display:"block", marginBottom:5, fontWeight:600, textTransform:"uppercase" }}>{lbl}</label>
                  <input type={showPass?"text":"password"} placeholder="••••••••" style={{...inp,paddingRight:44}}/>
                  <button onClick={()=>setShowPass(p=>!p)} style={{ position:"absolute", right:12, bottom:10, background:"none", border:"none", cursor:"pointer", padding:4 }}>
                    <Icon d={showPass?icons.eyeOff:icons.eye} color={T.textMuted} size={15}/>
                  </button>
                </div>
              ))}
              <div style={{ padding:"12px 14px", background:dark?"#2A2010":"#FEF6E8", borderRadius:10, border:`1px solid ${dark?"#4A3A1A":"#F5DCA8"}` }}>
                <p style={{ fontSize:12, color:dark?"#C9933A":"#8A5C10", margin:0 }}>🔒 Use 8+ characters with uppercase, lowercase, numbers, and symbols.</p>
              </div>
            </div>
          )}
          {tab==="Display" && (
            <div>
              <h3 style={{ fontSize:15, fontWeight:700, color:T.text, margin:"0 0 18px" }}>Display</h3>
              <div style={{ marginBottom:20 }}>
                <label style={{ fontSize:11, color:T.textMuted, display:"block", marginBottom:10, fontWeight:600, textTransform:"uppercase" }}>Theme</label>
                <div style={{ display:"flex", gap:9 }}>
                  {[["Light",false],["Dark",true]].map(([label,isDark])=>(
                    <button key={label as string} onClick={()=>setDark(isDark as boolean)} style={{ display:"flex", alignItems:"center", gap:7, padding:"10px 18px", borderRadius:9, border:`1.5px solid ${dark===(isDark as boolean)?T.teal:T.border}`, background:dark===(isDark as boolean)?(dark?"#1B3530":"#E8F5F2"):T.surface, color:dark===(isDark as boolean)?T.tealDk:T.textMid, fontSize:13, fontWeight:dark===(isDark as boolean)?700:500, cursor:"pointer", fontFamily:"inherit" }}>
                      <Icon d={isDark?icons.moon:icons.sun} color={dark===(isDark as boolean)?T.teal:T.textMuted} size={15}/>
                      {label as string}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          {tab==="Integrations" && (
            <div>
              <h3 style={{ fontSize:15, fontWeight:700, color:T.text, margin:"0 0 18px" }}>Integrations</h3>
              {integrations.map(item=>(
                <div key={item.id} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 16px", background:T.surface2, borderRadius:12, marginBottom:9 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:11 }}>
                    <span style={{ fontSize:20 }}>{item.icon}</span>
                    <div>
                      <p style={{ fontSize:13, fontWeight:700, color:T.text, margin:0 }}>{item.name}</p>
                      <p style={{ fontSize:11, color:item.connected?T.teal:T.textMuted, margin:0 }}>{item.desc}</p>
                    </div>
                  </div>
                  {/* Only "Change" or "Connect" — no Disconnect */}
                  <button
                    onClick={()=>openPopup(item)}
                    style={{ padding:"7px 14px", borderRadius:8, border:`1px solid ${item.connected?T.border:T.teal}`, background:item.connected?T.surface:(dark?"#1B3530":"#E8F5F2"), color:item.connected?T.textMid:T.tealDk, fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}
                  >
                    {item.connected?"Change":"Connect"}
                  </button>
                </div>
              ))}
            </div>
          )}
          <div style={{ marginTop:20, paddingTop:18, borderTop:`1px solid ${T.border}`, display:"flex", alignItems:"center", gap:12 }}>
            <button onClick={save} style={{ padding:"10px 26px", borderRadius:10, background:T.teal, color:"#fff", border:"none", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>Save Changes</button>
            {saved && <span style={{ fontSize:13, color:T.teal, fontWeight:600 }}>✓ Saved</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Page: Help ────────────────────────────────────────────────
function PageHelp() {
  const {T, dark} = useTheme();
  return (
    <div>
      <div style={{ marginBottom:22 }}>
        <h1 style={{ fontSize:22, fontWeight:700, color:T.text, margin:0 }}>Help & Support</h1>
        <p style={{ fontSize:13, color:T.textMuted, margin:"4px 0 0" }}>Contact the Mantra Medica technical team</p>
      </div>
      <div style={{ maxWidth:520 }}>
        <div style={{ background:T.surface, borderRadius:20, border:`1px solid ${T.border}`, padding:"28px 30px", textAlign:"center", marginBottom:14 }}>
          <div style={{ width:58,height:58,borderRadius:"50%",background:dark?"#1B3530":"#E8F5F2",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px" }}>
            <Icon d={icons.help} color={T.teal} size={26}/>
          </div>
          <h2 style={{ fontSize:18, fontWeight:700, color:T.text, margin:"0 0 8px" }}>Need help?</h2>
          <p style={{ fontSize:13, color:T.textMuted, lineHeight:1.7, margin:"0 0 24px" }}>Reach out directly for support, feature requests, or dashboard issues.</p>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" style={{ display:"flex", alignItems:"center", gap:11, padding:"13px 18px", borderRadius:12, background:dark?"#0E2A24":"#E8F8F0", border:`1.5px solid ${dark?"#1E4A3E":"#A8DFC8"}`, textDecoration:"none" }}>
              <Icon d={icons.map} color="#128C7E" size={20}/>
              <div style={{ textAlign:"left" }}>
                <p style={{ fontSize:13, fontWeight:700, color:dark?"#5ECFB5":"#0A6B54", margin:0 }}>WhatsApp Super Admin</p>
                <p style={{ fontSize:11, color:dark?"#3A9478":"#3A9478", margin:0 }}>+62 812-3456-7890 · Usually replies in minutes</p>
              </div>
            </a>
            <a href="mailto:superadmin@mantramedica.com" style={{ display:"flex", alignItems:"center", gap:11, padding:"13px 18px", borderRadius:12, background:dark?"#111830":"#EEF2FF", border:`1.5px solid ${dark?"#243060":"#C4CFFE"}`, textDecoration:"none" }}>
              <Icon d={icons.mail} color="#4361CB" size={20}/>
              <div style={{ textAlign:"left" }}>
                <p style={{ fontSize:13, fontWeight:700, color:dark?"#7B9FE8":"#2B3E9E", margin:0 }}>Email Super Admin</p>
                <p style={{ fontSize:11, color:dark?"#4C5FA5":"#4C5FA5", margin:0 }}>superadmin@mantramedica.com · Within 24h</p>
              </div>
            </a>
          </div>
        </div>
        <div style={{ background:T.surface, borderRadius:16, border:`1px solid ${T.border}`, padding:"18px 22px" }}>
          <h3 style={{ fontSize:13, fontWeight:700, color:T.text, margin:"0 0 13px" }}>Frequently Asked</h3>
          {[["How do I add an appointment?","Appointments → New Booking, fill in details and submit."],["How do I publish a review?","Go to Reviews and click Publish on the review."],["How do I connect Google Maps?","Settings → Integrations → Google Maps → Connect, paste your embed URL."]].map(([q,a],i)=>(
            <div key={i} style={{ marginBottom:11, paddingBottom:11, borderBottom:i<2?`1px solid ${T.border}`:"none" }}>
              <p style={{ fontSize:12, fontWeight:600, color:T.text, margin:"0 0 2px" }}>{q}</p>
              <p style={{ fontSize:11, color:T.textMuted, margin:0, lineHeight:1.6 }}>{a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Sidebar ───────────────────────────────────────────────────
function SidebarContent({ page, setPage, onNavClick }:{ page:string; setPage:(p:string)=>void; onNavClick?:()=>void }) {
  const {T, dark} = useTheme();
  const nav = [
    { id:"Dashboard",    icon:icons.dashboard, label:"Dashboard" },
    { id:"Appointments", icon:icons.calendar,  label:"Appointments", badge:APPOINTMENTS_DATA.filter(a=>a.status==="Pending").length },
    { id:"Services",     icon:icons.service,   label:"Services" },
    { id:"Reviews",      icon:icons.star,      label:"Reviews" },
    { id:"Photos",       icon:icons.image,     label:"Photos" },
  ];
  const bottom = [
    { id:"Settings", icon:icons.settings, label:"Settings" },
    { id:"Help",     icon:icons.help,     label:"Help"     },
  ];
  const go = (id:string) => { setPage(id); onNavClick?.(); };
  const btnStyle = (id:string, danger=false):React.CSSProperties => {
    const active = page===id;
    return { display:"flex", alignItems:"center", gap:10, width:"100%", padding:"10px 10px", borderRadius:10, border:"none", cursor:"pointer", marginBottom:2, textAlign:"left", fontFamily:"inherit",
      background:active?(danger?(dark?"#2A1110":"#FDECEA"):(dark?"#1B3530":"#E8F5F2")):"transparent",
      color:active?(danger?"#D95E57":T.tealDk):danger?"#D95E57":T.textMid };
  };

  return (
    <>
      <div style={{ padding:"20px 9px 16px", borderBottom:`1px solid ${T.border}`, display:"flex", alignItems:"center" }}>
        <div style={{ display:"flex", alignItems:"center", gap:9 }}>
          <img src="/images/logonavbar.webp" alt="Mantra Medica" style={{ width:120, height:27, borderRadius:9, objectFit:"contain" }} />
        </div>
      </div>
      <nav style={{ flex:1, padding:"12px 10px", overflowY:"auto" }}>
        <p style={{ fontSize:10, fontWeight:700, color:T.textMuted, letterSpacing:"1.2px", textTransform:"uppercase", padding:"4px 8px 6px", margin:0 }}>Menu</p>
        {nav.map(item=>(
          <button key={item.id} onClick={()=>go(item.id)} style={btnStyle(item.id)}>
            <Icon d={item.icon} color={page===item.id?T.teal:T.textMuted} size={16}/>
            <span style={{ fontSize:13, fontWeight:page===item.id?700:500, flex:1 }}>{item.label}</span>
            {(item.badge||0)>0 && <span style={{ background:page===item.id?T.teal:(dark?"#1B3530":"#E8F5F2"), color:page===item.id?"#fff":T.tealDk, fontSize:10, fontWeight:700, padding:"1px 6px", borderRadius:20 }}>{item.badge}</span>}
          </button>
        ))}
      </nav>
      <div style={{ padding:"10px 10px 14px", borderTop:`1px solid ${T.border}` }}>
        {bottom.map(item=>(
          <button key={item.id} onClick={()=>go(item.id)} style={btnStyle(item.id)}>
            <Icon d={item.icon} color={page===item.id?T.teal:T.textMuted} size={16}/>
            <span style={{ fontSize:13, fontWeight:page===item.id?700:500 }}>{item.label}</span>
          </button>
        ))}
      </div>
    </>
  );
}

// ── Main App ──────────────────────────────────────────────────
export default function MantraMedicaDashboard() {
  const router = useRouter();
  const [dark, setDark] = useState(false);
  const T = dark ? darkT : lightT;
  const [page, setPage] = useState("Dashboard");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [showAvatar, setShowAvatar] = useState(false);
  const isMobile = useIsMobile();
  const unreadNotifs = NOTIFS.filter(n=>!n.read).length;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    // Clear localStorage juga
    if (typeof window !== 'undefined') {
      localStorage.removeItem('sb-auth-token');
      localStorage.clear();
    }
    router.push("/login");
  };

  useEffect(()=>{ if(!isMobile) setDrawerOpen(false); },[isMobile]);

  const renderPage = () => {
    switch(page) {
      case "Dashboard":    return <PageDashboard/>;
      case "Appointments": return <PageAppointments/>;
      case "Services":     return <PageServices/>;
      case "Reviews":      return <PageReviews/>;
      case "Photos":       return <PagePhotos/>;
      case "Settings":     return <PageSettings/>;
      case "Help":         return <PageHelp/>;
      default: return null;
    }
  };

  return (
    <ThemeCtx.Provider value={{ T, dark, setDark, setPage }}>
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

      <div style={{ display:"flex", height:"100vh", background:T.bg, fontFamily:"'DM Sans', -apple-system, sans-serif", overflow:"hidden" }}>

        {/* Desktop Sidebar */}
        {!isMobile && (
          <aside style={{ width:210, background:T.surface, borderRight:`1px solid ${T.border}`, display:"flex", flexDirection:"column", flexShrink:0 }}>
            <SidebarContent page={page} setPage={setPage}/>
          </aside>
        )}

        {/* Mobile Drawer */}
        {isMobile && drawerOpen && (
          <>
            <div onClick={()=>setDrawerOpen(false)} style={{ position:"fixed", inset:0, background:T.overlay, zIndex:49, animation:"fade-in 0.2s both" }}/>
            <aside style={{ position:"fixed", left:0, top:0, bottom:0, width:240, background:T.surface, borderRight:`1px solid ${T.border}`, display:"flex", flexDirection:"column", zIndex:50, animation:"slide-in 0.28s cubic-bezier(0.22,0.61,0.36,1) both" }}>
              <div style={{ padding:"14px 18px", borderBottom:`1px solid ${T.border}`, display:"flex", justifyContent:"flex-end" }}>
                <button onClick={()=>setDrawerOpen(false)} style={{ background:"none", border:"none", cursor:"pointer", padding:4, color:T.textMuted }}><Icon d={icons.x} color={T.textMuted} size={20}/></button>
              </div>
              <SidebarContent page={page} setPage={setPage} onNavClick={()=>setDrawerOpen(false)}/>
            </aside>
          </>
        )}

        {/* Main */}
        <main style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0, overflow:"hidden" }}>

          {/* Top bar */}
          <div style={{ background:T.surface, borderBottom:`1px solid ${T.border}`, padding:isMobile?"12px 16px":"13px 26px", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0, gap:12 }}>
            {isMobile ? (
              <>
                <button onClick={()=>setDrawerOpen(true)} style={{ background:"none", border:"none", cursor:"pointer", padding:4, flexShrink:0 }}>
                  <Icon d={icons.menu} color={T.textMid} size={22}/>
                </button>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <div style={{ width:26, height:26, borderRadius:7, background:T.teal, display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.5 7.5H22l-6.5 4.7 2.5 7.5L12 17l-6 4.7 2.5-7.5L2 9.5h7.5z" fill="white"/></svg>
                  </div>
                  <span style={{ fontSize:13, fontWeight:800, color:T.text }}>Mantra Medica</span>
                </div>
              </>
            ) : (
              <div style={{ position:"relative", width:220 }}>
                <div style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}><Icon d={icons.search} color={T.textMuted} size={14}/></div>
                <input placeholder="Search…" style={{ width:"100%", padding:"8px 12px 8px 32px", borderRadius:9, border:`1.5px solid ${T.border}`, fontSize:13, outline:"none", background:T.surface2, boxSizing:"border-box", color:T.text, fontFamily:"inherit" }}/>
              </div>
            )}

            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              {/* Theme toggle */}
              <button onClick={()=>setDark(!dark)} style={{ width:34, height:34, borderRadius:9, background:T.surface2, border:`1px solid ${T.border}`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", flexShrink:0 }}>
                <Icon d={dark?icons.sun:icons.moon} color={T.textMid} size={16}/>
              </button>

              {/* Bell */}
              <div style={{ position:"relative", flexShrink:0 }}>
                <button onClick={()=>{ setShowNotif(p=>!p); setShowAvatar(false); }} style={{ width:34, height:34, borderRadius:9, background:T.surface2, border:`1px solid ${T.border}`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", position:"relative" }}>
                  <Icon d={icons.bell} color={T.textMid} size={16}/>
                  {unreadNotifs>0 && <span style={{ position:"absolute", top:4, right:4, width:8, height:8, borderRadius:"50%", background:T.danger, border:`2px solid ${T.surface}` }}/>}
                </button>
                {showNotif && <NotifDropdown onClose={()=>setShowNotif(false)}/>}
              </div>

              {/* Avatar with dropdown */}
              {!isMobile && (
                <div style={{ position:"relative", flexShrink:0 }}>
                  <button
                    onClick={()=>{ setShowAvatar(p=>!p); setShowNotif(false); }}
                    style={{ display:"flex", alignItems:"center", gap:8, padding:"5px 9px", background:T.surface2, borderRadius:9, cursor:"pointer", border:`1px solid ${showAvatar?T.teal:T.border}`, transition:"border-color 0.15s" }}
                  >
                    <div style={{ width:26, height:26, borderRadius:"50%", background:T.teal, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:700 }}>AM</div>
                    <div>
                      <p style={{ fontSize:11, fontWeight:700, color:T.text, margin:0 }}>Admin Mantra</p>
                      <p style={{ fontSize:9, color:T.textMuted, margin:0 }}>Super Admin</p>
                    </div>
                    <div style={{ transition:"transform 0.2s", transform:showAvatar?"rotate(180deg)":"rotate(0deg)" }}>
                      <Icon d={icons.chevDown} color={T.textMuted} size={12}/>
                    </div>
                  </button>
                  {showAvatar && (
                    <AvatarDropdown
                      onClose={()=>setShowAvatar(false)}
                      onLogout={handleLogout}
                    />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Page content */}
          <div style={{ flex:1, overflowY:"auto", padding:isMobile?"18px 16px":"26px 26px" }}>
            {renderPage()}
          </div>
        </main>
      </div>
    </ThemeCtx.Provider>
  );
}