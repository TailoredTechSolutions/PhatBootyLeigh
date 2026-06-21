/* ============================================================
   HOST LEIGH — APP SHELL & ROUTING
   Role switcher (Host / Client / Supplier) demonstrates the
   firewall; sidebar + topbar; page routing; persistence.
   ============================================================ */
const { useState, useEffect } = React;

const NAV = [
  { sec: "Command" },
  { id: "overview", label: "Overview", icon: "overview" },
  { id: "pipeline", label: "Gig Pipeline", icon: "kanban", badge: "11" },
  { id: "calendar", label: "Calendar", icon: "calendar" },
  { id: "meet", label: "Meet Leigh", icon: "user" },
  { sec: "Operations" },
  { id: "suppliers", label: "Supplier Firewall", icon: "suppliers" },
  { id: "escrow", label: "Escrow Tracker", icon: "escrow" },
  { id: "discount", label: "Discount Engine", icon: "discount" },
];

const ROLES = [
  { id: "host", label: "Host", icon: "shield", desc: "Full command center" },
  { id: "client", label: "Client", icon: "user", desc: "Booking & payment portal" },
  { id: "supplier", label: "Supplier", icon: "card", desc: "Isolated engagement view" },
];

function Sidebar({ page, go }) {
  const H = window.HL.HOST;
  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "var(--sidebar-w)", height: "100vh", background: "rgba(18,18,31,0.82)", backdropFilter: "var(--blur-glass)", WebkitBackdropFilter: "var(--blur-glass)", borderRight: "1px solid var(--border-soft)", display: "flex", flexDirection: "column", zIndex: 100 }}>
      <div style={{ padding: "24px 20px 18px", borderBottom: "1px solid var(--border-hair)" }}>
        <div style={{ width: 44, height: 44, borderRadius: "50%", border: "1.5px solid var(--gd-400)", overflow: "hidden", marginBottom: 10, flexShrink: 0 }}>
            <img src="assets/photos/leigh-portrait.jpeg" alt="Leigh" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 15%" }} />
          </div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 600, color: "var(--ob-50)", letterSpacing: "0.3px" }}>Host Leigh</div>
        <div className="hl-sparkle-gold" style={{ fontFamily: "var(--font-mono-alt)", fontSize: 9, letterSpacing: "2px", textTransform: "uppercase", marginTop: 3 }}>Empire Dashboard</div>
      </div>
      <div style={{ flex: 1, padding: "12px 0", overflowY: "auto" }}>
        {NAV.map((n, i) => n.sec ? (
          <div key={i} style={{ fontSize: 9, color: "var(--ob-400)", letterSpacing: "1.5px", textTransform: "uppercase", padding: "20px 20px 6px", fontFamily: "var(--font-mono-alt)" }}>{n.sec}</div>
        ) : (
          <button key={n.id} onClick={() => go(n.id)} style={{
            width: "100%", display: "flex", alignItems: "center", gap: 11, padding: "10px 20px", cursor: "pointer",
            background: page === n.id ? "rgba(212,175,55,0.08)" : "transparent",
            color: page === n.id ? "var(--gd-300)" : "var(--ob-200)",
            border: "none", borderLeft: `2px solid ${page === n.id ? "var(--gd-400)" : "transparent"}`,
            fontFamily: "var(--font-body)", fontSize: 12.5, textAlign: "left", transition: "var(--tr-all)",
          }} onMouseEnter={e => { if (page !== n.id) { e.currentTarget.style.background = "rgba(212,175,55,0.05)"; e.currentTarget.style.color = "var(--ob-50)"; } }}
            onMouseLeave={e => { if (page !== n.id) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--ob-200)"; } }}>
            <Icon name={n.icon} size={16} />
            {n.label}
            {n.badge && <span style={{ marginLeft: "auto", background: "var(--rose-600)", color: "#fff", fontSize: 9, fontWeight: 600, padding: "1px 7px", borderRadius: 20 }}>{n.badge}</span>}
          </button>
        ))}
      </div>
      <div style={{ padding: "14px 20px", borderTop: "1px solid var(--border-hair)", display: "flex", alignItems: "center", gap: 7 }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--success)", boxShadow: "0 0 6px var(--success)" }} />
        <span style={{ fontFamily: "var(--font-mono-alt)", fontSize: 9.5, color: "var(--ob-400)", letterSpacing: "0.5px" }}>BIR-registered · 2026</span>
      </div>
    </div>
  );
}

function RoleSwitcher({ role, setRole }) {
  return (
    <div style={{ display: "flex", gap: 4, padding: 4, background: "var(--surface-raised)", border: "1px solid var(--border-hair)", borderRadius: "var(--r-md)" }}>
      {ROLES.map((r) => {
        const active = role === r.id;
        return (
          <button key={r.id} onClick={() => setRole(r.id)} title={r.desc} style={{
            display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 12px", borderRadius: "var(--r-sm)", cursor: "pointer",
            border: "none", fontFamily: "var(--font-body)", fontSize: 12, transition: "var(--tr-all)",
            background: active ? "var(--gd-400)" : "transparent", color: active ? "var(--ob-950)" : "var(--ob-200)", fontWeight: active ? 600 : 500,
          }}>
            <Icon name={r.icon} size={14} />{r.label}
          </button>
        );
      })}
    </div>
  );
}

function Topbar({ role, setRole, page }) {
  const titles = { overview: "Overview", pipeline: "Gig Pipeline", calendar: "Calendar", suppliers: "Supplier Firewall", escrow: "Escrow Tracker", discount: "Discount Engine", meet: "Meet Leigh" };  const crumb = { host: "Host · Command Center", client: "Viewing as Client", supplier: "Viewing as Supplier" }[role];
  const [notifOpen, setNotifOpen] = React.useState(false);
  const [notifs, setNotifs] = React.useState([
    { tone: "danger", title: "Catering overdue — KIA Launch", meta: "Red Ribbon Catering · expected yesterday" },
    { tone: "warning", title: "50% balance uncollected — PIEPCO", meta: "Due Jul 5 · ₱57,000" },
    { tone: "success", title: "AV testing scheduled — KIA Makati", meta: "Today 3:00 PM · all suppliers briefed" },
  ]);
  const clearNotifs = () => { setNotifs([]); setNotifOpen(false); };
  const dotColor = { danger: "var(--danger)", warning: "var(--warning)", success: "var(--success)" };
  return (
    <div style={{ position: "sticky", top: 0, background: "var(--glass-bg)", backdropFilter: "var(--blur-glass)", borderBottom: "1px solid var(--border-hair)", padding: "13px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 90 }}>
      <div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, color: "var(--ob-50)", lineHeight: 1.1 }}>{role === "host" ? (titles[page] || "Portfolio") : (role === "client" ? "Client Portal" : "Supplier Portal")}</div>
        <div className="hl-sparkle-pink" style={{ fontFamily: "var(--font-mono-alt)", fontSize: 24, letterSpacing: "1.5px", textTransform: "uppercase", marginTop: 3 }}>{crumb}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <RoleSwitcher role={role} setRole={setRole} />
        <div style={{ position: "relative" }}>
          <button onClick={() => setNotifOpen(o => !o)} style={{ background: notifOpen ? "rgba(212,175,55,0.08)" : "none", border: "1px solid var(--border-soft)", color: "var(--ob-100)", width: 34, height: 34, borderRadius: "var(--r-sm)", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <Icon name="bell" size={16} />
            {notifs.length > 0 && <span style={{ position: "absolute", top: 6, right: 7, width: 6, height: 6, borderRadius: "50%", background: "var(--rose-500)" }} />}
          </button>
          {notifOpen && (
            <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, width: 320, background: "var(--surface-card)", border: "1px solid var(--border-strong)", borderRadius: "var(--r-lg)", boxShadow: "var(--shadow-deep)", zIndex: 200, overflow: "hidden" }}>
              <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--border-divider)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 600, color: "var(--ob-50)" }}>Notifications</span>
                {notifs.length > 0 && <span style={{ fontSize: 10, color: "var(--rose-400)", fontFamily: "var(--font-mono)", letterSpacing: "1px" }}>{notifs.length} NEW</span>}
              </div>
              {notifs.length === 0 && (
                <div style={{ padding: "28px 16px", textAlign: "center", color: "var(--ob-300)", fontSize: 13 }}>All caught up ✓</div>
              )}
              {notifs.map((n, i) => (
                <div key={i} style={{ display: "flex", gap: 12, padding: "13px 16px", borderBottom: i < notifs.length - 1 ? "1px solid var(--border-divider)" : "none", cursor: "pointer", transition: "background 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(212,175,55,0.04)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: dotColor[n.tone], boxShadow: `0 0 6px ${dotColor[n.tone]}`, flexShrink: 0, marginTop: 5 }} />
                  <div>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ob-50)", lineHeight: 1.3 }}>{n.title}</div>
                    <div style={{ fontSize: 11, color: "var(--ob-300)", marginTop: 3 }}>{n.meta}</div>
                  </div>
                </div>
              ))}
              <div style={{ padding: "10px 16px", textAlign: "center", borderTop: "1px solid var(--border-divider)" }}>
                {notifs.length > 0 && <button onClick={clearNotifs} style={{ background: "none", border: "none", fontSize: 11, color: "var(--gd-300)", cursor: "pointer", fontFamily: "var(--font-body)", letterSpacing: "0.3px" }}>Mark all as read</button>}
                {notifs.length === 0 && <button onClick={() => setNotifOpen(false)} style={{ background: "none", border: "none", fontSize: 11, color: "var(--ob-300)", cursor: "pointer", fontFamily: "var(--font-body)" }}>Close</button>}
              </div>
            </div>
          )}
        </div>
        {role === "host" && <Btn variant="primary" icon="plus" onClick={() => window.hlToast("New gig — opening intake form…")}>New gig</Btn>}
      </div>
    </div>
  );
}

function App() {
  const [role, setRole] = useState(() => localStorage.getItem("hl_role") || "host");
  const [page, setPage] = useState(() => localStorage.getItem("hl_page") || "overview");
  const [supGig, setSupGig] = useState("kia");        // firewall gig selector
  const [discGig, setDiscGig] = useState("kia");      // discount gig selector
  const [clientGig, setClientGig] = useState("kia");
  const [supplierId, setSupplierId] = useState("kia-av");
  const [drawer, setDrawer] = useState(null);

  useEffect(() => { localStorage.setItem("hl_role", role); }, [role]);
  useEffect(() => { localStorage.setItem("hl_page", page); }, [page]);

  const go = (pg, gid) => {
    setPage(pg);
    if (gid && pg === "suppliers") setSupGig(gid);
    if (gid && pg === "discount") setDiscGig(gid);
    window.scrollTo(0, 0);
  };
  const openGig = (id) => setDrawer(id);
  const openSupplier = (id) => { setSupplierId(id); setRole("supplier"); };

  let body;
  if (role === "client") body = <ClientPortal gigId={clientGig} setGigId={setClientGig} />;
  else if (role === "supplier") body = <SupplierPortal supplierId={supplierId} setSupplierId={setSupplierId} onBack={() => setRole("host")} />;
  else {
    body = {
      overview: <Overview go={go} />,
      pipeline: <Pipeline openGig={openGig} />,
      calendar: <CalendarView openGig={openGig} />,
      meet: <MeetLeigh />,
      suppliers: <Suppliers gigId={supGig} setGigId={setSupGig} openSupplier={openSupplier} />,
      escrow: <Escrow />,
      discount: <DiscountEngine gigId={discGig} setGigId={setDiscGig} />,
    }[page] || <Overview go={go} />;
  }

  return (
    <React.Fragment>
      {/* ── Full-viewport galaxy background ── */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <Lightfall
          store={window.HL_BG}
          colors={(window.HL_BG && window.HL_BG.colors) || ["#d4af37", "#e8ca6a", "#c94560", "#d96275"]}
          backgroundColor={(window.HL_BG && window.HL_BG.backgroundColor) || "#1a1a2e"}
          speed={0.6} streakCount={8} streakWidth={1} streakLength={1.3}
          glow={1} density={1} twinkle={1} zoom={2} backgroundGlow={0.85}
          opacity={0.72} mouseInteraction={false} mouseStrength={0} mouseRadius={0.6}
        />
      </div>
      {role === "host" && <Sidebar page={page} go={go} />}
      <div style={{ position: "relative", zIndex: 1, marginLeft: role === "host" ? "var(--sidebar-w)" : 0, minHeight: "100vh", display: "flex", flexDirection: "column", transition: "margin 0.3s var(--ease-standard)" }}>
        <Topbar role={role} setRole={setRole} page={page} />
        <div style={{ padding: "24px 28px", flex: 1 }}>{body}</div>
      </div>
      {role === "host" && <GigDrawer gigId={drawer} onClose={() => setDrawer(null)} go={go} />}
      
      <ToastHost />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
