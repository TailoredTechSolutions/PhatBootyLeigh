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
  { id: "portfolio", label: "Portfolio", icon: "portfolio" },
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
    <div style={{ position: "fixed", top: 0, left: 0, width: "var(--sidebar-w)", height: "100vh", background: "var(--surface-card)", borderRight: "1px solid var(--border-soft)", display: "flex", flexDirection: "column", zIndex: 100 }}>
      <div style={{ padding: "24px 20px 18px", borderBottom: "1px solid var(--border-hair)" }}>
        <div style={{ width: 44, height: 44, borderRadius: "50%", border: "1.5px solid var(--gd-400)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600, color: "var(--gd-400)", marginBottom: 10 }}>{H.monogram}</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 600, color: "var(--ob-50)", letterSpacing: "0.5px" }}>Host Leigh</div>
        <div style={{ fontSize: 10, color: "var(--ob-200)", letterSpacing: "2px", textTransform: "uppercase", marginTop: 2 }}>Empire Dashboard</div>
      </div>
      <div style={{ flex: 1, padding: "12px 0", overflowY: "auto" }}>
        {NAV.map((n, i) => n.sec ? (
          <div key={i} style={{ fontSize: 9, color: "var(--ob-300)", letterSpacing: "2.5px", textTransform: "uppercase", padding: "14px 20px 5px" }}>{n.sec}</div>
        ) : (
          <button key={n.id} onClick={() => go(n.id)} style={{
            width: "100%", display: "flex", alignItems: "center", gap: 11, padding: "10px 20px", cursor: "pointer",
            background: page === n.id ? "rgba(212,175,55,0.08)" : "transparent",
            color: page === n.id ? "var(--gd-300)" : "var(--ob-200)",
            border: "none", borderLeft: `2px solid ${page === n.id ? "var(--gd-400)" : "transparent"}`,
            fontFamily: "var(--font-body)", fontSize: 13, textAlign: "left", transition: "var(--tr-all)",
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
        <span style={{ fontSize: 10, color: "var(--ob-300)", letterSpacing: "1px" }}>BIR-registered · 2026</span>
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
  const titles = { overview: "Overview", pipeline: "Gig Pipeline", calendar: "Calendar", suppliers: "Supplier Firewall", escrow: "Escrow Tracker", discount: "Discount Engine" };  const crumb = { host: "Host · Command Center", client: "Viewing as Client", supplier: "Viewing as Supplier" }[role];
  return (
    <div style={{ position: "sticky", top: 0, background: "var(--glass-bg)", backdropFilter: "var(--blur-glass)", borderBottom: "1px solid var(--border-hair)", padding: "13px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 90 }}>
      <div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 600, color: "var(--ob-50)" }}>{role === "host" ? (titles[page] || "Portfolio") : (role === "client" ? "Client Portal" : "Supplier Portal")}</div>
        <div style={{ fontSize: 10.5, color: "var(--ob-300)", letterSpacing: "1px", textTransform: "uppercase", marginTop: 1 }}>{crumb}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <RoleSwitcher role={role} setRole={setRole} />
        <button onClick={() => window.hlToast("3 new notifications")} style={{ background: "none", border: "1px solid var(--border-soft)", color: "var(--ob-100)", width: 34, height: 34, borderRadius: "var(--r-sm)", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
          <Icon name="bell" size={16} />
          <span style={{ position: "absolute", top: 6, right: 7, width: 6, height: 6, borderRadius: "50%", background: "var(--rose-500)" }} />
        </button>
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
  else if (role === "supplier") body = <SupplierPortal supplierId={supplierId} setSupplierId={setSupplierId} />;
  else {
    body = {
      overview: <Overview go={go} />,
      pipeline: <Pipeline openGig={openGig} />,
      calendar: <CalendarView openGig={openGig} />,
      portfolio: <PortfolioView />,
      suppliers: <Suppliers gigId={supGig} setGigId={setSupGig} openSupplier={openSupplier} />,
      escrow: <Escrow />,
      discount: <DiscountEngine gigId={discGig} setGigId={setDiscGig} />,
    }[page] || <Overview go={go} />;
  }

  return (
    <React.Fragment>
      {role === "host" && <Sidebar page={page} go={go} />}
      <div style={{ marginLeft: role === "host" ? "var(--sidebar-w)" : 0, minHeight: "100vh", display: "flex", flexDirection: "column", transition: "margin 0.3s var(--ease-standard)" }}>
        <Topbar role={role} setRole={setRole} page={page} />
        <div style={{ padding: 28, flex: 1 }}>{body}</div>
      </div>
      {role === "host" && <GigDrawer gigId={drawer} onClose={() => setDrawer(null)} go={go} />}
      <ToastHost />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
