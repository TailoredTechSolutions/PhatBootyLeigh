/* ============================================================
   HOST LEIGH — HOST VIEWS
   Overview · Pipeline · Suppliers(firewall) · Escrow ·
   Discount Engine · Calendar. Exported to window.
   ============================================================ */

// ───────────────────────── KPI MODALS ─────────────────────────
function ActiveGigsPanel({ gigs, HL, onClose, go }) {
  const stageColor = { confirmed: "var(--gd-400)", prep: "var(--warning)" };
  const stageLabel = { confirmed: "Confirmed", prep: "In Prep" };
  return (
    <div style={{ padding: 28 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 10, letterSpacing: "3px", textTransform: "uppercase", color: "var(--gd-300)", marginBottom: 6 }}>Active Gigs</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "var(--ob-50)" }}>{gigs.length} events on the books</div>
        </div>
        <button onClick={onClose} style={{ background: "none", border: "1px solid var(--border-soft)", color: "var(--ob-200)", width: 32, height: 32, borderRadius: "var(--r-sm)", cursor: "pointer", fontSize: 18, lineHeight: 1 }}>×</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        {gigs.map(g => {
          const cv = g.suppliers && g.suppliers.length ? HL.contractValue(g) : null;
          const clickable = g.suppliers && g.suppliers.length > 0;
          return (
            <div key={g.id}
              onClick={() => { if (clickable) { onClose(); go("suppliers", g.id); } }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = clickable ? "var(--gd-400)" : "var(--border-hair)"; e.currentTarget.style.transform = clickable ? "translateY(-2px)" : "none"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-hair)"; e.currentTarget.style.transform = "none"; }}
              style={{ background: "var(--surface-raised)", border: "1px solid var(--border-hair)", borderRadius: "var(--r-lg)", padding: 20, cursor: clickable ? "pointer" : "default", transition: "var(--tr-all)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontSize: 10, color: stageColor[g.stage] || "var(--ob-300)", fontFamily: "var(--font-mono)", letterSpacing: "1px", textTransform: "uppercase" }}>◆ {stageLabel[g.stage] || g.stage}</span>
                <Tag>{g.type}</Tag>
              </div>
              <div style={{ fontSize: 17, fontWeight: 700, color: "var(--ob-50)", marginBottom: 4, lineHeight: 1.2 }}>{g.client}</div>
              <div style={{ fontSize: 12.5, color: "var(--ob-200)", marginBottom: 10 }}>{g.event}</div>
              <div style={{ fontSize: 11, color: "var(--ob-300)", marginBottom: 4 }}>{g.date}{g.time ? ` · ${g.time}` : ""}</div>
              <div style={{ fontSize: 11, color: "var(--ob-300)", marginBottom: cv ? 14 : 0 }}>{g.venue}</div>
              {cv && <div style={{ fontFamily: "var(--font-mono)", fontSize: 20, color: "var(--gd-300)", fontWeight: 500 }}>{HL.pesoK(cv)}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CollectedPanel({ gigs, HL, onClose }) {
  const total = gigs.reduce((s, g) => s + HL.contractValue(g), 0);
  const collected = gigs.reduce((s, g) => s + HL.contractValue(g) * (g.clientPaidPct / 100), 0);
  return (
    <div style={{ padding: 28 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 10, letterSpacing: "3px", textTransform: "uppercase", color: "var(--success-text)", marginBottom: 6 }}>Collected</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "var(--ob-50)" }}>{HL.pesoK(collected)} received to date</div>
        </div>
        <button onClick={onClose} style={{ background: "none", border: "1px solid var(--border-soft)", color: "var(--ob-200)", width: 32, height: 32, borderRadius: "var(--r-sm)", cursor: "pointer", fontSize: 18, lineHeight: 1 }}>×</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 24 }}>
        <KPI label="Total Contracted" value={HL.pesoK(total)} />
        <KPI label="Collected" value={HL.pesoK(collected)} tone="success" sub={{ text: Math.round(collected / total * 100) + "% of total", tone: "up" }} />
        <KPI label="Still Owed" value={HL.pesoK(total - collected)} tone="warning" />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {gigs.map((g, i) => {
          const cv = HL.contractValue(g);
          const paid = cv * g.clientPaidPct / 100;
          const fullyPaid = g.clientPaidPct >= 100;
          return (
            <div key={g.id} style={{ padding: "18px 0", borderBottom: i < gigs.length - 1 ? "1px solid var(--border-divider)" : "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "var(--ob-50)", marginBottom: 3 }}>{g.client}</div>
                  <div style={{ fontSize: 12, color: "var(--ob-300)" }}>{g.event} · {g.date}</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 22, color: "var(--success-text)", lineHeight: 1 }}>{HL.peso(paid)}</div>
                  <div style={{ fontSize: 11, color: "var(--ob-300)", marginTop: 4 }}>of {HL.peso(cv)}</div>
                </div>
                {fullyPaid && <Tag tone="green">✓ Paid in full</Tag>}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ flex: 1 }}><Bar pct={g.clientPaidPct} color="var(--success)" /></div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--success-text)", flexShrink: 0 }}>{g.clientPaidPct}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function OutstandingPanel({ gigs, HL, onClose }) {
  const outstanding = gigs.filter(g => g.clientPaidPct < 100);
  const totalOut = outstanding.reduce((s, g) => s + HL.contractValue(g) * ((100 - g.clientPaidPct) / 100), 0);
  return (
    <div style={{ padding: 28 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 10, letterSpacing: "3px", textTransform: "uppercase", color: "var(--warning-text)", marginBottom: 6 }}>Outstanding</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "var(--ob-50)" }}>{HL.pesoK(totalOut)} uncollected</div>
        </div>
        <button onClick={onClose} style={{ background: "none", border: "1px solid var(--border-soft)", color: "var(--ob-200)", width: 32, height: 32, borderRadius: "var(--r-sm)", cursor: "pointer", fontSize: 18, lineHeight: 1 }}>×</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {outstanding.map((g) => {
          const cv = HL.contractValue(g);
          const paid = cv * g.clientPaidPct / 100;
          const owed = cv - paid;
          const overdue = g.clientPaidPct === 0;
          return (
            <div key={g.id} style={{ background: overdue ? "rgba(239,68,68,0.05)" : "var(--surface-raised)", border: `1px solid ${overdue ? "rgba(239,68,68,0.2)" : "var(--border-hair)"}`, borderRadius: "var(--r-lg)", padding: 20 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 14 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: "var(--ob-50)" }}>{g.client}</span>
                    {overdue && <Tag tone="rose">⚠ Overdue</Tag>}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--ob-300)" }}>{g.event} · {g.date}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 24, color: overdue ? "var(--danger-text)" : "var(--warning-text)", lineHeight: 1 }}>{HL.peso(owed)}</div>
                  <div style={{ fontSize: 11, color: "var(--ob-300)", marginTop: 4 }}>{g.clientPaidPct}% paid · {HL.peso(cv)} total</div>
                </div>
              </div>
              <Bar pct={g.clientPaidPct} color={overdue ? "var(--danger)" : "var(--warning)"} />
              <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
                <Btn size="sm" variant={overdue ? "danger" : "secondary"} icon="message" onClick={() => window.hlToast(`Payment reminder sent to ${g.client} ✓`)}>Send reminder</Btn>
                <Btn size="sm" variant="ghost" icon="phone" onClick={() => window.open("https://wa.me/63", "_blank")}>Call client</Btn>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ContractedPanel({ gigs, HL, onClose }) {
  const total = gigs.reduce((s, g) => s + HL.contractValue(g), 0);
  const collected = gigs.reduce((s, g) => s + HL.contractValue(g) * (g.clientPaidPct / 100), 0);
  return (
    <div style={{ padding: 28 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 10, letterSpacing: "3px", textTransform: "uppercase", color: "var(--gd-300)", marginBottom: 6 }}>Contracted</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "var(--ob-50)" }}>{HL.pesoK(total)} across {gigs.length} gigs</div>
        </div>
        <button onClick={onClose} style={{ background: "none", border: "1px solid var(--border-soft)", color: "var(--ob-200)", width: 32, height: 32, borderRadius: "var(--r-sm)", cursor: "pointer", fontSize: 18, lineHeight: 1 }}>×</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 24 }}>
        <KPI label="Total Contracted" value={HL.pesoK(total)} />
        <KPI label="Collected" value={HL.pesoK(collected)} tone="success" sub={{ text: Math.round(collected / total * 100) + "% of total", tone: "up" }} />
        <KPI label="Outstanding" value={HL.pesoK(total - collected)} tone="warning" />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {gigs.map((g, i) => {
          const cv = HL.contractValue(g);
          const paid = cv * g.clientPaidPct / 100;
          const overdue = g.clientPaidPct === 0;
          return (
            <div key={g.id} style={{ padding: "18px 0", borderBottom: i < gigs.length - 1 ? "1px solid var(--border-divider)" : "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "var(--ob-50)", marginBottom: 3 }}>{g.client}</div>
                  <div style={{ fontSize: 12, color: "var(--ob-300)" }}>{g.event} · {g.date}</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 22, color: "var(--gd-300)", lineHeight: 1 }}>{HL.peso(cv)}</div>
                  <div style={{ fontSize: 11, color: overdue ? "var(--danger-text)" : "var(--ob-300)", marginTop: 4 }}>
                    {overdue ? "⚠ Awaiting downpayment" : `${g.clientPaidPct}% paid · ${HL.peso(paid)}`}
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 12 }}>
                <Bar pct={g.clientPaidPct} color={overdue ? "var(--danger)" : "var(--grad-gold)"} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ───────────────────────── OVERVIEW ─────────────────────────
function Overview({ go }) {
  const HL = window.HL;
  const active = HL.activeGigs;
  const fin = HL.financeGigs;
  const contracted = fin.reduce((s, g) => s + HL.contractValue(g), 0);
  const collected = fin.reduce((s, g) => s + HL.contractValue(g) * (g.clientPaidPct / 100), 0);
  const outstanding = contracted - collected;
  const next = HL.gigById("kia");
  const [modal, setModal] = React.useState(null);

  const alerts = [
    { tone: "success", title: "★ 9th Nation Builders & MosLiv Award — Int'l Female Host for Advocacy", meta: "Alongside Gov. Vilma Santos-Recto & Mayor Vico Sotto · Okada Manila Grand Ballroom · Nov 27, 2025", cta: null },
    { tone: "warning", title: "🌏 New Role: COO for Asia — Andre Norman (Ambassador of Hope)", meta: "Appointed May 29, 2026 · Bringing hope & transformation across the Asia region", cta: null },
    { tone: "success", title: "👑 Historic: First Lady of the Philippines in audience — NWMC 2026", meta: "National Women's Month Congress · March 9, 2026 · Highest-profile audience possible in PH", cta: null },
  ];
  const toneBg = { danger: "rgba(239,68,68,0.06)", warning: "rgba(245,158,11,0.06)", success: "rgba(34,197,94,0.06)" };
  const toneBd = { danger: "rgba(239,68,68,0.18)", warning: "rgba(245,158,11,0.18)", success: "rgba(34,197,94,0.15)" };
  const toneDot = { danger: "var(--danger)", warning: "var(--warning)", success: "var(--success)" };

  return (
    <React.Fragment>
      <div style={{ position: "relative", zIndex: 1 }}>
      {/* KPI Modals */}
      {modal && (
        <div onClick={() => setModal(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.72)", backdropFilter: "blur(8px)", zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", padding: 32 }}>
          <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 920, maxHeight: "82vh", overflowY: "auto", background: "var(--surface-card)", border: "1px solid var(--border-strong)", borderRadius: "var(--r-xl)", boxShadow: "var(--shadow-deep)" }}>
            {modal === "active" && <ActiveGigsPanel gigs={active} HL={HL} onClose={() => setModal(null)} go={go} />}
            {modal === "contracted" && <ContractedPanel gigs={fin} HL={HL} onClose={() => setModal(null)} />}
            {modal === "collected" && <CollectedPanel gigs={fin} HL={HL} onClose={() => setModal(null)} />}
            {modal === "outstanding" && <OutstandingPanel gigs={fin} HL={HL} onClose={() => setModal(null)} />}
          </div>
        </div>
      )}
      {/* Hero banner — glass over the full-page galaxy background */}
      <div style={{ position: "relative", height: 196, borderRadius: "var(--r-lg)", overflow: "hidden", marginBottom: 24, border: "1px solid var(--border-strong)", boxShadow: "var(--shadow-card)" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(95deg, rgba(10,10,20,0.72) 0%, rgba(10,10,20,0.38) 55%, rgba(10,10,20,0.08) 100%)", backdropFilter: "blur(0px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", height: "100%", padding: "0 36px", display: "flex", flexDirection: "column", justifyContent: "center", pointerEvents: "none" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", color: "var(--gd-300)", marginBottom: 8 }}>Welcome back, Boss ✦</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 700, color: "var(--ob-50)", lineHeight: 1.05 }}>The empire, at a glance.</div>
          <div style={{ fontSize: 12.5, color: "var(--ob-200)", marginTop: 8 }}>14+ years · 100+ events in 2025 · {active.length} active gigs · next up {next.client}, {next.date}</div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
        <BorderGlow animated edgeSensitivity={42} glowColor="40 65 55" backgroundColor="var(--surface-card)" borderRadius={14} glowRadius={26} glowIntensity={1.3} coneSpread={28} colors={["#d4af37", "#c94560", "#e8ca6a"]}>
          <div onClick={() => setModal("active")} style={{ cursor: "pointer" }} title="View all active gigs">
            <KPI label="Active Gigs" value={active.length} sub={{ text: "↑ +2 this month · tap to expand", tone: "up" }} />
          </div>
        </BorderGlow>
        <BorderGlow animated edgeSensitivity={42} glowColor="40 65 55" backgroundColor="var(--surface-card)" borderRadius={14} glowRadius={26} glowIntensity={1.3} coneSpread={28} colors={["#d4af37", "#c94560", "#e8ca6a"]}>
          <div onClick={() => setModal("contracted")} style={{ cursor: "pointer" }} title="View all contracted gigs">
            <KPI label="Contracted" value={HL.pesoK(contracted)} sub={{ text: "across active events · tap to expand", tone: "muted" }} />
          </div>
        </BorderGlow>
        <BorderGlow animated edgeSensitivity={42} glowColor="40 65 55" backgroundColor="var(--surface-card)" borderRadius={14} glowRadius={26} glowIntensity={1.3} coneSpread={28} colors={["#d4af37", "#c94560", "#e8ca6a"]}>
          <div onClick={() => setModal("collected")} style={{ cursor: "pointer" }} title="View collection breakdown">
            <KPI label="Collected" value={HL.pesoK(collected)} tone="success" sub={{ text: Math.round(collected / contracted * 100) + "% of contracted · tap", tone: "up" }} />
          </div>
        </BorderGlow>
        <BorderGlow animated edgeSensitivity={42} glowColor="40 65 55" backgroundColor="var(--surface-card)" borderRadius={14} glowRadius={26} glowIntensity={1.3} coneSpread={28} colors={["#d4af37", "#c94560", "#e8ca6a"]}>
          <div onClick={() => setModal("outstanding")} style={{ cursor: "pointer" }} title="View outstanding invoices">
            <KPI label="Outstanding" value={HL.pesoK(outstanding)} tone="warning" sub={{ text: "1 overdue · tap to review", tone: "warn" }} />
          </div>
        </BorderGlow>
      </div>

      <div style={{ marginBottom: 20 }}>
      <BorderGlow animated edgeSensitivity={40} glowColor="30 10 10" backgroundColor="var(--surface-card)" borderRadius={14} glowRadius={28} glowIntensity={1.4} coneSpread={32} colors={["#d4af37", "#c94560", "#e8ca6a"]}>
      <Card title="Today's Alerts" icon="bolt" style={{ background: "transparent", border: "none", boxShadow: "none" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {alerts.map((a, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, background: toneBg[a.tone], border: `1px solid ${toneBd[a.tone]}`, borderRadius: "var(--r-md)" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: toneDot[a.tone], boxShadow: `0 0 6px ${toneDot[a.tone]}`, flexShrink: 0 }} />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ob-50)" }}>{a.title}</div>
                <div style={{ fontSize: 11, color: "var(--ob-300)", marginTop: 2 }}>{a.meta}</div>
              </div>
              {a.cta && <span style={{ marginLeft: "auto" }}><Btn size="sm" variant={a.tone === "danger" ? "danger" : "secondary"} onClick={a.act}>{a.cta}</Btn></span>}
            </div>
          ))}
        </div>
      </Card>
      </BorderGlow>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* BorderGlow (React Bits) on the featured event card */}
        <BorderGlow animated edgeSensitivity={38} glowColor="45 65 60" backgroundColor="var(--surface-card)" borderRadius={14} glowRadius={26} glowIntensity={1.3} coneSpread={29} colors={["#d4af37", "#c94560", "#e8ca6a"]}>
          <div style={{ padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 16, gap: 8 }}>
              <span style={{ color: "var(--gd-400)", display: "inline-flex" }}><Icon name="calendar" size={17} /></span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600, color: "var(--ob-50)" }}>Next Confirmed Event</span>
            </div>
            <div style={{ background: "var(--surface-raised)", borderRadius: "var(--r-md)", padding: 16 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--gd-400)", letterSpacing: "1px", marginBottom: 6 }}>{next.date.toUpperCase()} · {next.time}</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: "var(--ob-50)", marginBottom: 4 }}>{next.client} — {next.event}</div>
              <div style={{ fontSize: 12, color: "var(--ob-300)", marginBottom: 12 }}>{next.venue} · ~{next.pax} guests</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                <Tag tone="gold">{next.type}</Tag><Tag tone="green">Confirmed</Tag><Tag>{HL.pesoK(HL.contractValue(next))}</Tag>
              </div>
            </div>
            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
              <Btn size="sm" fullWidth onClick={() => go("suppliers")}>View suppliers</Btn>
              <Btn size="sm" fullWidth onClick={() => go("escrow")}>Payment status</Btn>
            </div>
          </div>
        </BorderGlow>
        <Card title="Quick Actions" icon="spark">
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[["kanban", "View the full gig pipeline", "pipeline"], ["suppliers", "Check supplier firewall & statuses", "suppliers"], ["escrow", "Escrow & payment tracker", "escrow"], ["discount", "Run the discount & margin engine", "discount"]].map(([ic, lbl, pg]) => (
              <BorderGlow key={pg} animated edgeSensitivity={52} glowColor="45 55 50" backgroundColor="var(--surface-raised)" borderRadius={8} glowRadius={22} glowIntensity={1.25} coneSpread={28} colors={["#d4af37", "#c94560", "#e8ca6a"]}>
                <button onClick={() => go(pg)} style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 12, textAlign: "left", padding: "12px 14px",
                  background: "transparent", border: "none", borderRadius: "var(--r-md)",
                  color: "var(--ob-100)", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: 13, transition: "var(--tr-all)",
                }} onMouseEnter={e => { e.currentTarget.style.color = "var(--gd-300)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "var(--ob-100)"; }}>
                  <span style={{ color: "var(--gd-400)", display: "inline-flex" }}><Icon name={ic} size={16} /></span>
                  {lbl}
                  <span style={{ marginLeft: "auto", color: "var(--ob-300)", display: "inline-flex" }}><Icon name="arrow" size={15} /></span>
                </button>
              </BorderGlow>
            ))}
          </div>
        </Card>
      </div>
    </div>
    </React.Fragment>
  );
}

// ───────────────────────── PIPELINE ─────────────────────────
function Pipeline({ openGig }) {
  const HL = window.HL;
  return (
    <div style={{ background: "rgba(10,10,20,0.45)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", borderRadius: "var(--r-xl)", padding: "24px 20px", border: "1px solid var(--border-hair)" }}>
      <PageHero eyebrow="Gig Pipeline" title="Every deal, every stage." sub="Drag-free kanban of the whole book. Click any card to open its firewall, escrow and run-of-show." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
        {HL.STAGES.map((st) => {
          const cards = HL.GIGS.filter((g) => g.stage === st.key);
          return (
            <div key={st.key}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: st.color }}>{st.glyph} {st.label}</div>
                <span style={{ background: "var(--ob-700)", color: "var(--ob-200)", fontSize: 10, padding: "2px 7px", borderRadius: 20, fontFamily: "var(--font-mono)" }}>{cards.length}</span>
              </div>
              {cards.map((g) => {
                const clickable = g.suppliers.length > 0;
                return (
                  <div key={g.id} onClick={() => clickable && openGig(g.id)} style={{
                    background: "var(--surface-raised)", border: "1px solid var(--border-hair)", borderRadius: "var(--r-md)",
                    padding: 14, marginBottom: 10, cursor: clickable ? "pointer" : "default", opacity: g.stage === "done" ? 0.55 : 1,
                    transition: "var(--tr-all)",
                  }} onMouseEnter={e => { if (clickable) { e.currentTarget.style.borderColor = "var(--border-strong)"; e.currentTarget.style.transform = "translateY(-1px)"; } }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-hair)"; e.currentTarget.style.transform = "none"; }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ob-50)", marginBottom: 4 }}>{g.client}</div>
                    <div style={{ fontSize: 11, color: "var(--ob-200)", marginBottom: 8 }}>{g.event}</div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {g.stage === "confirmed" && <Tag tone="gold">{HL.pesoK(HL.contractValue(g))}</Tag>}
                      {g.note && <Tag tone="rose">{g.note}</Tag>}
                      {g.paid ? <Tag tone="green">Paid ✓</Tag> : <Tag>{g.date}</Tag>}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ───────────────────── SUPPLIERS / FIREWALL ─────────────────────
function Suppliers({ gigId, setGigId, openSupplier }) {
  const HL = window.HL;
  const gigs = HL.GIGS.filter((g) => g.suppliers.length);
  const gig = HL.gigById(gigId) || gigs[0];
  return (
    <React.Fragment>
      <div style={{ position: "relative", zIndex: 1, background: "rgba(10,10,20,0.45)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", borderRadius: "var(--r-xl)", padding: "24px 20px", border: "1px solid var(--border-hair)" }}>
      <PageHero eyebrow="Supplier Firewall" title="They work for you. They never see each other." />
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16, padding: "12px 16px", background: "rgba(212,175,55,0.05)", border: "1px solid var(--border-soft)", borderRadius: "var(--r-md)" }}>
        <span style={{ color: "var(--gd-400)", display: "inline-flex" }}><Icon name="shield" size={20} /></span>
        <div style={{ fontSize: 12.5, color: "var(--ob-100)", lineHeight: 1.5 }}>
          <b style={{ color: "var(--gd-300)" }}>Firewall active.</b> Each supplier has a private channel and sees only their own scope — never the client's identity, your margin, or the other suppliers. Open a row to view their isolated portal.
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {gigs.map((g) => (
          <button key={g.id} onClick={() => setGigId(g.id)} style={{
            padding: "7px 14px", borderRadius: "var(--r-pill)", fontFamily: "var(--font-body)", fontSize: 12, cursor: "pointer",
            border: "1px solid", transition: "var(--tr-all)",
            ...(g.id === gig.id ? { background: "var(--gd-400)", borderColor: "var(--gd-400)", color: "var(--ob-950)", fontWeight: 600 }
              : { background: "none", borderColor: "var(--border-soft)", color: "var(--ob-200)" }),
          }}>{g.client}</button>
        ))}
      </div>

      <Card title={`${gig.client} — ${gig.event}`} icon="suppliers"
        action={<span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ob-300)" }}>{gig.date} · {gig.suppliers.length} suppliers</span>}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["Supplier", "Category", "Private channel", "Cue", "Status", ""].map((h, i) => (
                <th key={i} style={{ fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--ob-300)", textAlign: i === 5 ? "right" : "left", padding: "0 12px 10px", borderBottom: "1px solid var(--border-soft)", fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {gig.suppliers.map((s) => (
              <tr key={s.id} onClick={() => openSupplier(s.id)} style={{ cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(212,175,55,0.04)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <td style={tdS}><div style={{ fontWeight: 600, color: "var(--ob-50)" }}>{s.name}</div><div style={{ fontSize: 11, color: "var(--ob-300)" }}>{s.scope}</div></td>
                <td style={tdS}><Tag>{s.cat}</Tag></td>
                <td style={{ ...tdS, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ob-200)" }}>{s.contact}</td>
                <td style={{ ...tdS, fontSize: 11, color: "var(--ob-200)" }}>{s.cue}</td>
                <td style={tdS}><StatusPill status={s.status} /></td>
                <td style={{ ...tdS, textAlign: "right" }}>
                  <Btn size="sm" variant={s.status === "late" ? "danger" : "secondary"} icon="phone"
                    onClick={(e) => {
                      e.stopPropagation();
                      const raw = (s.contact || "").replace(/\D/g, "");
                      const intl = raw.startsWith("0") ? "63" + raw.slice(1) : raw;
                      window.open("https://wa.me/" + intl, "_blank");
                    }}>
                    {s.status === "late" ? "Call now" : "Call"}
                  </Btn>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      </div>
    </React.Fragment>
  );
}
const tdS = { padding: "13px 12px", borderBottom: "1px solid var(--border-divider)", fontSize: 13, color: "var(--ob-100)", verticalAlign: "middle" };

// ───────────────────────── ESCROW ─────────────────────────
function Escrow() {
  const HL = window.HL;
  const gigs = HL.financeGigs;
  const [modal, setModal] = React.useState(null); // "contracted" | "collected" | "escrow" | "overdue"
  const totals = gigs.reduce((a, g) => {
    const cv = HL.contractValue(g);
    const paid = cv * (g.clientPaidPct / 100);
    const supCost = HL.supplierTotal(g, false);
    const released = g.suppliers.reduce((s, x) => s + x.quote * (x.paidPct / 100), 0);
    a.contracted += cv; a.collected += paid; a.supCost += supCost; a.released += released;
    if (g.clientPaidPct === 0) a.overdue += cv;
    return a;
  }, { contracted: 0, collected: 0, supCost: 0, released: 0, overdue: 0 });

  const MODALS = {
    contracted: {
      title: "Contracted Work", sub: "All confirmed event contracts and their full value breakdown.",
      rows: gigs.map((g) => {
        const cv = HL.contractValue(g);
        const supCost = HL.supplierTotal(g, false);
        return { client: g.client, event: g.event, date: g.date, contract: HL.peso(cv), suppliers: HL.peso(supCost), fee: HL.peso(g.hostingFee), margin: HL.peso(cv - supCost - g.hostingFee) };
      }),
      cols: ["Client", "Event", "Date", "Contract Value", "Supplier Cost", "Hosting Fee", "Margin"],
      keys: ["client", "event", "date", "contract", "suppliers", "fee", "margin"],
    },
    collected: {
      title: "Collected Payments", sub: "What clients have paid so far versus total contracted.",
      rows: gigs.map((g) => {
        const cv = HL.contractValue(g); const paid = cv * (g.clientPaidPct / 100);
        return { client: g.client, event: g.event, contract: HL.peso(cv), collected: HL.peso(paid), pct: g.clientPaidPct + "%", balance: HL.peso(cv - paid), status: g.clientPaidPct === 0 ? "⚠ Overdue" : g.clientPaidPct === 100 ? "✓ Paid" : "Partial" };
      }),
      cols: ["Client", "Event", "Total", "Collected", "% Paid", "Balance", "Status"],
      keys: ["client", "event", "contract", "collected", "pct", "balance", "status"],
    },
    escrow: {
      title: "Held in Escrow", sub: "Collected funds not yet released to suppliers — your float.",
      rows: gigs.map((g) => {
        const cv = HL.contractValue(g); const paid = cv * (g.clientPaidPct / 100);
        const released = g.suppliers.reduce((s, x) => s + x.quote * (x.paidPct / 100), 0);
        return { client: g.client, event: g.event, collected: HL.peso(paid), released: HL.peso(released), held: HL.peso(paid - released) };
      }),
      cols: ["Client", "Event", "Collected", "Released", "Held"],
      keys: ["client", "event", "collected", "released", "held"],
    },
    overdue: {
      title: "Overdue Balances", sub: "Clients with zero or late payment — action required.",
      rows: gigs.filter((g) => g.clientPaidPct < 100).map((g) => {
        const cv = HL.contractValue(g); const paid = cv * (g.clientPaidPct / 100);
        return { client: g.client, event: g.event, date: g.date, contract: HL.peso(cv), paid: HL.peso(paid), outstanding: HL.peso(cv - paid), pct: g.clientPaidPct + "% paid" };
      }),
      cols: ["Client", "Event", "Date", "Contract", "Paid", "Outstanding", "Progress"],
      keys: ["client", "event", "date", "contract", "paid", "outstanding", "pct"],
    },
  };

  const m = modal && MODALS[modal];

  return (
    <div style={{ background: "rgba(10,10,20,0.45)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", borderRadius: "var(--r-xl)", padding: "24px 20px", border: "1px solid var(--border-hair)" }}>
      {/* Splash modal */}
      {m && (
        <div onClick={() => setModal(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.78)", backdropFilter: "blur(10px)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center", padding: 32 }}>
          <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 960, maxHeight: "86vh", overflowY: "auto", background: "var(--surface-card)", border: "1px solid var(--border-strong)", borderRadius: "var(--r-xl)", boxShadow: "var(--shadow-deep)", padding: "32px 36px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
              <div>
                <div style={{ fontFamily: "var(--font-mono-alt)", fontSize: 10, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--gd-300)", marginBottom: 6 }}>Escrow · {m.title}</div>
                <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 600, color: "var(--ob-50)" }}>{m.title}</h2>
                <p style={{ margin: "6px 0 0", fontSize: 13, color: "var(--ob-300)" }}>{m.sub}</p>
              </div>
              <button onClick={() => setModal(null)} style={{ background: "none", border: "none", color: "var(--ob-300)", fontSize: 22, cursor: "pointer", lineHeight: 1, marginTop: 2 }}>×</button>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {m.cols.map((c) => (
                    <th key={c} style={{ padding: "8px 12px", textAlign: "left", fontFamily: "var(--font-mono-alt)", fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--ob-300)", borderBottom: "1px solid var(--border-soft)" }}>{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {m.rows.map((row, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid var(--border-divider)" }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(212,175,55,0.04)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    {m.keys.map((k) => (
                      <td key={k} style={{ padding: "13px 12px", fontSize: 13, color: k === "client" ? "var(--ob-50)" : k.includes("margin") || k === "held" ? "var(--success-text)" : k === "outstanding" ? "var(--warning-text)" : "var(--ob-100)", fontFamily: k === "contract" || k === "suppliers" || k === "fee" || k === "margin" || k === "collected" || k === "balance" || k === "paid" || k === "released" || k === "held" ? "var(--font-mono)" : "var(--font-body)", fontWeight: k === "client" ? 600 : 400 }}>{row[k]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <PageHero eyebrow="Escrow Tracker" title="Client pays you. You release suppliers." sub="Money sits with you between collection and event sign-off — your leverage, your float, your protection." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 20 }}>
        <div onClick={() => setModal("contracted")} style={{ cursor: "pointer" }} title="Click for full breakdown"><KPI label="Contracted" value={HL.pesoK(totals.contracted)} /></div>
        <div onClick={() => setModal("collected")} style={{ cursor: "pointer" }} title="Click for full breakdown"><KPI label="Collected" value={HL.pesoK(totals.collected)} tone="success" /></div>
        <div onClick={() => setModal("escrow")} style={{ cursor: "pointer" }} title="Click for full breakdown"><KPI label="Held in escrow" value={HL.pesoK(totals.collected - totals.released)} tone="default" sub={{ text: "not yet released · tap to expand", tone: "muted" }} /></div>
        <div onClick={() => setModal("overdue")} style={{ cursor: "pointer" }} title="Click for full breakdown"><KPI label="Overdue" value={HL.pesoK(totals.overdue)} tone="danger" sub={{ text: "1 client · tap to expand", tone: "down" }} /></div>
      </div>

      <Card title="Per-Event Escrow Flow" icon="escrow">
        <div style={{ display: "flex", flexDirection: "column" }}>
          {gigs.map((g) => {
            const cv = HL.contractValue(g);
            const paid = cv * (g.clientPaidPct / 100);
            const supCost = HL.supplierTotal(g, false);
            const released = g.suppliers.reduce((s, x) => s + x.quote * (x.paidPct / 100), 0);
            const margin = cv - supCost - g.hostingFee;
            const overdue = g.clientPaidPct === 0;
            return (
              <div key={g.id} style={{ padding: "16px 0", borderBottom: "1px solid var(--border-divider)" }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ob-50)" }}>{g.client}</div>
                    <div style={{ fontSize: 11, color: "var(--ob-300)" }}>{g.event} · {g.date}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 15, color: "var(--ob-50)" }}>{HL.peso(cv)}</div>
                    <div style={{ fontSize: 10, color: overdue ? "var(--warning-text)" : "var(--ob-300)" }}>{overdue ? "Awaiting downpayment — OVERDUE" : `${g.clientPaidPct}% collected`}</div>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                  <EscrowStage label="Client → You" amt={HL.peso(paid)} of={HL.peso(cv)} pct={g.clientPaidPct} color={overdue ? "var(--danger)" : "var(--grad-gold)"} />
                  <EscrowStage label="You → Suppliers" amt={HL.peso(released)} of={HL.peso(supCost)} pct={Math.round(released / supCost * 100)} color="var(--ob-300)" />
                  <div>
                    <div style={{ fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--ob-300)", marginBottom: 6 }}>Your margin</div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 15, color: "var(--success-text)", marginBottom: 6 }}>{HL.peso(margin)}</div>
                    <div style={{ fontSize: 10, color: "var(--ob-300)" }}>incl. ₱{(g.hostingFee / 1000)}K hosting fee</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
function EscrowStage({ label, amt, of, pct, color }) {
  return (
    <div>
      <div style={{ fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--ob-300)", marginBottom: 6 }}>{label}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 6 }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 15, color: "var(--ob-50)" }}>{amt}</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ob-300)" }}>/ {of}</span>
      </div>
      <Bar pct={pct || 0} color={color} />
    </div>
  );
}

// ───────────────────── DISCOUNT / MARGIN ENGINE ─────────────────────
function DiscountEngine({ gigId, setGigId }) {
  const HL = window.HL;
  const gigs = HL.GIGS.filter((g) => g.suppliers.length);
  const gig = HL.gigById(gigId) || gigs[0];
  const floor = HL.supplierTotal(gig, true);
  const quoted = HL.supplierTotal(gig, false);

  const [markup, setMarkup] = React.useState(gig.markupPct);
  const [hosting, setHosting] = React.useState(gig.hostingFee);
  const [discount, setDiscount] = React.useState(0); // % off client price
  React.useEffect(() => { setMarkup(gig.markupPct); setHosting(gig.hostingFee); setDiscount(0); }, [gig.id]);

  const baseClient = quoted * (1 + markup / 100) + hosting;
  const clientPrice = baseClient * (1 - discount / 100);
  const margin = clientPrice - quoted; // what you keep after paying supplier quotes
  const marginPct = clientPrice ? (margin / clientPrice) * 100 : 0;
  const protectedFloor = clientPrice - floor; // cushion above true supplier floor
  const danger = clientPrice < quoted;

  return (
    <div style={{ background: "rgba(10,10,20,0.45)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", borderRadius: "var(--r-xl)", padding: "24px 20px", border: "1px solid var(--border-hair)" }}>
      <PageHero eyebrow="Discount & Margin Engine" title="Give the number. Keep the margin." sub="Discounts come off your markup — never the supplier floor. Simulate before you commit on the call." />
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {gigs.map((g) => (
          <button key={g.id} onClick={() => setGigId(g.id)} style={{
            padding: "7px 14px", borderRadius: "var(--r-pill)", fontFamily: "var(--font-body)", fontSize: 12, cursor: "pointer", border: "1px solid", transition: "var(--tr-all)",
            ...(g.id === gig.id ? { background: "var(--gd-400)", borderColor: "var(--gd-400)", color: "var(--ob-950)", fontWeight: 600 } : { background: "none", borderColor: "var(--border-soft)", color: "var(--ob-200)" }),
          }}>{g.client}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 16 }}>
        {/* Controls */}
        <Card title="Simulator" icon="discount">
          <Slider label="Coordination markup" value={markup} min={15} max={45} step={1} unit="%" onChange={setMarkup} hint="House rule: 25–40% covers follow-ups, day-of stress, contingency." />
          <Slider label="Hosting fee" value={hosting} min={0} max={120000} step={1000} unit="₱" fmt={HL.peso} onChange={setHosting} hint="Your on-mic talent fee, separate from supplier coordination." />
          <Slider label="Client discount" value={discount} min={0} max={25} step={1} unit="%" onChange={setDiscount} hint="“Suki na tayo, pwede pa bumaba?” — give it off the markup." accent />
          <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--border-divider)", display: "flex", gap: 8 }}>
            <Btn size="sm" onClick={() => setDiscount(d => Math.min(25, d + 5))}>+5% off</Btn>
            <Btn size="sm" onClick={() => { setDiscount(10); window.hlToast("Loyalty scenario: 10% off the markup"); }}>Repeat-client loyalty</Btn>
            <Btn size="sm" variant="ghost" onClick={() => { setMarkup(gig.markupPct); setHosting(gig.hostingFee); setDiscount(0); }}>Reset</Btn>
          </div>
        </Card>

        {/* Output */}
        <Card title="Quote Breakdown" icon="card" style={danger ? { borderColor: "var(--danger)" } : null}>
          <Row k="Supplier floor (true cost)" v={HL.peso(floor)} mono dim />
          <Row k="Supplier quotes (what you pay)" v={HL.peso(quoted)} mono />
          <Row k={`+ Coordination markup (${markup}%)`} v={HL.peso(quoted * markup / 100)} mono />
          <Row k="+ Hosting fee" v={HL.peso(hosting)} mono />
          <div style={{ borderTop: "1px solid var(--border-divider)", margin: "8px 0" }} />
          <Row k="List package price" v={HL.peso(baseClient)} mono />
          {discount > 0 && <Row k={`− Client discount (${discount}%)`} v={"− " + HL.peso(baseClient - clientPrice)} mono tone="rose" />}
          <div style={{ marginTop: 14, padding: 16, background: "var(--surface-raised)", borderRadius: "var(--r-md)", textAlign: "center" }}>
            <div style={{ fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: "var(--ob-200)", marginBottom: 6 }}>Client pays</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 30, fontWeight: 500, color: "var(--gd-300)", lineHeight: 1 }}>{HL.peso(clientPrice)}</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
            <Mini label="Your margin" value={HL.peso(margin)} pct={`${marginPct.toFixed(0)}% of price`} tone={danger ? "danger" : "success"} />
            <Mini label="Floor cushion" value={HL.peso(protectedFloor)} pct="above true cost" tone={protectedFloor < 0 ? "danger" : "default"} />
          </div>
          {danger && <div style={{ marginTop: 12, fontSize: 11.5, color: "var(--danger-text)", textAlign: "center" }}>⚠ Below your supplier quotes — you'd be paying to work. Pull back the discount.</div>}
        </Card>
      </div>
    </div>
  );
}
function Slider({ label, value, min, max, step, unit, fmt, onChange, hint, accent }) {
  const disp = fmt ? fmt(value) : (unit === "%" ? value + "%" : value);
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 7 }}>
        <span style={{ fontSize: 12, color: "var(--ob-100)", fontWeight: 500 }}>{label}</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: accent ? "var(--rose-400)" : "var(--gd-300)" }}>{disp}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: accent ? "var(--rose-500)" : "var(--gd-400)", cursor: "pointer" }} />
      {hint && <div style={{ fontSize: 10.5, color: "var(--ob-300)", marginTop: 5, lineHeight: 1.4 }}>{hint}</div>}
    </div>
  );
}
function Row({ k, v, mono, dim, tone }) {
  const c = tone === "rose" ? "var(--rose-400)" : dim ? "var(--ob-300)" : "var(--ob-100)";
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "5px 0" }}>
      <span style={{ fontSize: 12.5, color: dim ? "var(--ob-300)" : "var(--ob-200)" }}>{k}</span>
      <span style={{ fontFamily: mono ? "var(--font-mono)" : "inherit", fontSize: 13, color: c }}>{v}</span>
    </div>
  );
}
function Mini({ label, value, pct, tone }) {
  const c = { success: "var(--success-text)", danger: "var(--danger-text)", default: "var(--gd-300)" }[tone];
  return (
    <div style={{ padding: 12, background: "var(--surface-raised)", borderRadius: "var(--r-md)", textAlign: "center" }}>
      <div style={{ fontSize: 9, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--ob-300)", marginBottom: 5 }}>{label}</div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 18, color: c, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 9.5, color: "var(--ob-300)", marginTop: 4 }}>{pct}</div>
    </div>
  );
}

// ───────────────────────── CALENDAR ─────────────────────────
function CalendarView({ openGig }) {
  const HL = window.HL;
  // July 2025 — starts on Tuesday (index 2)
  const events = { 12: "kia", 18: "jollibee", 19: "piepco" };
  const first = 2, days = 31;
  const cells = [];
  for (let i = 0; i < first; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(d);
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 118px)", gap: 16 }}>
      {/* Box 1 — title + sync */}
      <div style={{ background: "rgba(10,10,20,0.45)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", borderRadius: "var(--r-xl)", padding: "18px 24px", border: "1px solid var(--border-hair)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
      <PageHero eyebrow="Event Calendar" title="July 2025" sub="The booked month. Gold marks a confirmed event — click to open it." />
      {/* calendar sync buttons */}
      <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>

          <button
            onClick={() => {
              const url = "https://calendar.google.com/calendar/r/eventedit?text=Host+Leigh+Events&dates=20250712T100000/20250712T220000&details=Sync+your+Host+Leigh+bookings+with+Google+Calendar.";
              window.open(url, "_blank");
            }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 9, padding: "9px 18px", cursor: "pointer",
              borderRadius: "var(--r-sm)", border: "1px solid var(--border-soft)", background: "var(--surface-raised)",
              fontFamily: "var(--font-body)", fontSize: 13, color: "var(--ob-100)", transition: "var(--tr-all)",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gd-400)"; e.currentTarget.style.color = "var(--gd-300)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-soft)"; e.currentTarget.style.color = "var(--ob-100)"; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>
            </svg>
            Google Calendar
          </button>
          <button
            onClick={() => {
              const ics = [
                "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Host Leigh//EN",
                "BEGIN:VEVENT", "DTSTART:20250712T100000Z", "DTEND:20250712T220000Z",
                "SUMMARY:Host Leigh — Empire Events", "DESCRIPTION:Sync your Host Leigh bookings with Apple Calendar.",
                "END:VEVENT", "END:VCALENDAR"
              ].join("\r\n");
              const blob = new Blob([ics], { type: "text/calendar" });
              const a = document.createElement("a");
              a.href = URL.createObjectURL(blob);
              a.download = "host-leigh-events.ics";
              a.click();
            }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 9, padding: "9px 18px", cursor: "pointer",
              borderRadius: "var(--r-sm)", border: "1px solid var(--border-soft)", background: "var(--surface-raised)",
              fontFamily: "var(--font-body)", fontSize: 13, color: "var(--ob-100)", transition: "var(--tr-all)",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gd-400)"; e.currentTarget.style.color = "var(--gd-300)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-soft)"; e.currentTarget.style.color = "var(--ob-100)"; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M12 6v6l4 2"/>
            </svg>
            Apple Calendar
          </button>
        </div>
      </div>
      {/* Box 2 — calendar only */}
      <div style={{ flex: 1, padding: 4, display: "flex", flexDirection: "column", minHeight: 0 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 6, marginBottom: 6 }}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="hl-sparkle-gold" style={{ fontSize: 24, letterSpacing: "1.5px", textTransform: "uppercase", textAlign: "center", padding: "6px 0", fontFamily: "var(--font-display)", fontWeight: 700 }}>{d}</div>
          ))}
        </div>
        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(7,1fr)", gridTemplateRows: "repeat(5,1fr)", gap: 6 }}>
          {cells.map((d, i) => {
            const ev = d && events[d];
            const g = ev && HL.gigById(ev);
            return (
              <div key={i} onClick={() => g && openGig(g.id)} style={{
                borderRadius: "var(--r-sm)", padding: 12, border: "1px solid var(--border-divider)",
                background: d ? "var(--surface-raised)" : "transparent", cursor: g ? "pointer" : "default",
                opacity: d ? 1 : 0, transition: "var(--tr-all)", minHeight: 0,
                ...(ev ? { borderColor: "var(--border-strong)" } : null),
              }} onMouseEnter={e => { if (g) e.currentTarget.style.borderColor = "var(--gd-400)"; }}
                onMouseLeave={e => { if (g) e.currentTarget.style.borderColor = "var(--border-strong)"; }}>
                {d && <div style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: ev ? "var(--gd-300)" : "var(--ob-300)" }}>{d}</div>}
                {g && (
                  <div style={{ marginTop: 10 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ob-50)", lineHeight: 1.3 }}>{g.client}</div>
                    <div style={{ fontSize: 12, color: "var(--gd-400)", marginTop: 5, fontFamily: "var(--font-mono)" }}>{g.time}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* Calendar connectors — moved to top */}
      <div style={{ display: "none" }}>
        <div style={{ flex: 1, minWidth: 160 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ob-100)", marginBottom: 3 }}>Sync with your calendar</div>
          <div style={{ fontSize: 11, color: "var(--ob-400)", lineHeight: 1.5 }}>Export your confirmed bookings to Apple or Google Calendar</div>
        </div>
        <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
          <button
            onClick={() => {
              const url = "https://calendar.google.com/calendar/r/eventedit?text=Host+Leigh+Events&dates=20250712T100000/20250712T220000&details=Sync+your+Host+Leigh+bookings+with+Google+Calendar.";
              window.open(url, "_blank");
            }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 9, padding: "9px 18px", cursor: "pointer",
              borderRadius: "var(--r-sm)", border: "1px solid var(--border-soft)", background: "var(--surface-raised)",
              fontFamily: "var(--font-body)", fontSize: 13, color: "var(--ob-100)", transition: "var(--tr-all)",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gd-400)"; e.currentTarget.style.color = "var(--gd-300)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-soft)"; e.currentTarget.style.color = "var(--ob-100)"; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>
            </svg>
            Google Calendar
          </button>
          <button
            onClick={() => {
              const ics = [
                "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Host Leigh//EN",
                "BEGIN:VEVENT", "DTSTART:20250712T100000Z", "DTEND:20250712T220000Z",
                "SUMMARY:Host Leigh — Empire Events", "DESCRIPTION:Sync your Host Leigh bookings with Apple Calendar.",
                "END:VEVENT", "END:VCALENDAR"
              ].join("\r\n");
              const blob = new Blob([ics], { type: "text/calendar" });
              const a = document.createElement("a");
              a.href = URL.createObjectURL(blob);
              a.download = "host-leigh-events.ics";
              a.click();
            }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 9, padding: "9px 18px", cursor: "pointer",
              borderRadius: "var(--r-sm)", border: "1px solid var(--border-soft)", background: "var(--surface-raised)",
              fontFamily: "var(--font-body)", fontSize: 13, color: "var(--ob-100)", transition: "var(--tr-all)",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gd-400)"; e.currentTarget.style.color = "var(--gd-300)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-soft)"; e.currentTarget.style.color = "var(--ob-100)"; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M12 6v6l4 2"/>
            </svg>
            Apple Calendar
          </button>
        </div>
      </div>
    </div>
  );
}

// ───────────────────────── PORTFOLIO (DomeGallery) ─────────────────────────
const PORTFOLIO_IMAGES = [
  { src: "assets/photos/leigh-office.jpeg", alt: "Corporate portrait" },
  { src: "assets/photos/leigh-veeam.jpeg", alt: "Veeam — Safe AI at Scale" },
  { src: "assets/photos/leigh-jollibee.jpeg", alt: "Jollibee Joy event" },
  { src: "assets/photos/leigh-gala.jpeg", alt: "Le French Gala" },
  { src: "assets/photos/leigh-speakerscon.jpeg", alt: "SpeakersCon PH" },
  { src: "assets/photos/leigh-pifpo.jpeg", alt: "PiFPO NCR Conference" },
  { src: "assets/photos/leigh-paris.jpeg", alt: "Editorial portrait" },
  { src: "assets/photos/leigh-portrait.jpeg", alt: "Beauty portrait" },
  { src: "assets/photos/leigh-event.jpeg", alt: "VIP party host" },
  { src: "assets/photos/leigh-working.jpeg", alt: "Behind the scenes" },
  { src: "assets/photos/leigh-selfie.jpeg", alt: "On-site selfie" },
];

function PortfolioView() {
  const HL = window.HL;
  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <PageHero eyebrow="Portfolio" title="Thirteen rooms she's owned." sub="Drag to rotate the dome · click any frame to enlarge. Real corporate stages across Metro Manila and beyond." />
        <div style={{ display: "flex", gap: 20, paddingBottom: 6 }}>
          {[["8.2K", "Followers"], ["14+", "Years"], ["100%", "Recommend"]].map(([n, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 20, color: "var(--gd-300)", lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: 9, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--ob-300)", marginTop: 5 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: "relative", height: "66vh", minHeight: 460, borderRadius: "var(--r-xl)", overflow: "hidden", border: "1px solid var(--border-soft)", background: "var(--ob-950)", boxShadow: "var(--shadow-card)" }}>
        <DomeGallery images={PORTFOLIO_IMAGES} fit={0.62} minRadius={420} grayscale={false} overlayBlurColor="#161221" imageBorderRadius="14px" openedImageBorderRadius="16px" openedImageWidth="340px" openedImageHeight="440px" />
      </div>
    </div>
  );
}

// ───────────────────────── MEET LEIGH (+ Portfolio dome) ─────────────────────────
function MeetLeigh() {
  return (
    <div>
      {/* ── Dome Gallery — Portfolio at top ── */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12, background: "rgba(10,10,20,0.32)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", borderRadius: "var(--r-lg)", padding: "16px 20px", border: "1px solid var(--border-hair)" }}>
          <PageHero eyebrow="Portfolio" title="Thirteen rooms she's owned." sub="Drag to rotate the dome · click any frame to enlarge. Real stages across Metro Manila and beyond." />
          <div style={{ display: "flex", gap: 20, paddingBottom: 6 }}>
            {[["8.2K", "Followers"], ["14+", "Years"], ["100%", "Recommend"]].map(([n, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 20, color: "var(--gd-300)", lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: 9, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--ob-300)", marginTop: 5 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: "relative", height: "66vh", minHeight: 460, borderRadius: "var(--r-xl)", overflow: "hidden", border: "1px solid var(--border-soft)", background: "var(--ob-950)", boxShadow: "var(--shadow-card)" }}>
          <DomeGallery images={PORTFOLIO_IMAGES} fit={0.62} minRadius={420} grayscale={false} overlayBlurColor="#161221" imageBorderRadius="14px" openedImageBorderRadius="16px" openedImageWidth="340px" openedImageHeight="440px" />
        </div>
      </div>
      {/* ── Bio & about ── */}
      <div style={{ background: "rgba(10,10,20,0.45)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", borderRadius: "var(--r-xl)", padding: "24px 20px", border: "1px solid var(--border-hair)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20, alignItems: "stretch" }}>
        <div style={{ background: "var(--surface-card)", border: "1px solid var(--border-hair)", borderRadius: "var(--r-lg)", padding: "32px 36px", boxShadow: "var(--shadow-card)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 10, letterSpacing: "3px", textTransform: "uppercase", color: "var(--gd-300)", marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 22, height: 1, background: "var(--grad-gold)" }} />Meet your host
          </div>
          <div style={{ fontFamily: "var(--font-display-alt)", fontWeight: 700, fontSize: 58, lineHeight: 0.96, color: "var(--ob-50)", marginBottom: 10 }}>Leigh.</div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 19, fontStyle: "italic", color: "var(--gd-300)", marginBottom: 20, lineHeight: 1.25 }}>The voice that holds the room.</div>
          <p style={{ fontSize: 13.5, lineHeight: 1.75, color: "var(--ob-200)", margin: "0 0 10px", maxWidth: "50ch" }}>Leighza Mir J. Estella — 14+ years on stage since 2012. BA Communications, ABS-CBN trained, and completing a HarvardX Rhetoric certification. Over 100 events hosted in 2025 alone across 14 sectors — from intimate brand activations to a 12,000-person music festival. In May 2026 she was appointed COO for Asia under Andre Norman (Ambassador of Hope).</p>
          <p style={{ fontSize: 13.5, lineHeight: 1.75, color: "var(--ob-300)", margin: "0 0 24px", maxWidth: "50ch" }}>She has hosted at Okada Manila's Grand Ballroom alongside Gov. Vilma Santos-Recto and Mayor Vico Sotto — and in March 2026, the First Lady of the Philippines was in her audience. Every client who has left a review would book again: 100% recommend rate across 7 verified reviews.</p>
          <div style={{ display: "flex", gap: 10 }}>
            <Btn variant="primary" onClick={() => window.hlToast("Opening booking form…")}>✦ Book Leigh</Btn>
            <Btn variant="secondary" onClick={() => window.hlToast("Scrolling to gallery…")}>See the portfolio</Btn>
          </div>
        </div>
        <div style={{ borderRadius: "var(--r-lg)", overflow: "hidden", border: "1px solid var(--border-soft)", minHeight: 380 }}>
          <div style={{ width: "100%", height: "100%", minHeight: 380, background: "center 22%/cover url('assets/photos/leigh-portrait.jpeg')" }} />
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 20 }}>
        <KPI label="Years Hosting" value="14+" sub={{ text: "Active since 2012", tone: "muted" }} />
        <KPI label="Events in 2025" value="100+" sub={{ text: "Self-confirmed · still counting", tone: "muted" }} />
        <KPI label="Largest Crowd" value="12,000" sub={{ text: "Neon Music Fest · SM City Fairview", tone: "muted" }} />
        <KPI label="Recommend Rate" value="100%" tone="success" sub={{ text: "↑ 7 verified client reviews", tone: "up" }} />
      </div>

      {/* Values */}
      <Card title="What She's About" icon="spark" style={{ marginBottom: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {[
            ["01", "Presence", "Calm, magnetic stage presence that anchors a program from the first cue to the last applause."],
            ["02", "Precision", "Run sheets, cues and timings handled to the second — the night never drifts and nobody waits."],
            ["03", "Warmth", "Every guest, sponsor and couple treated like the reason the room exists in the first place."],
          ].map(([num, title, desc]) => (
            <div key={num} style={{ padding: "20px 22px", background: "var(--surface-raised)", border: "1px solid var(--border-divider)", borderRadius: "var(--r-md)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 30, color: "var(--gd-300)", marginBottom: 10, lineHeight: 1 }}>{num}</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "var(--ob-50)", marginBottom: 7, fontFamily: "var(--font-display)" }}>{title}</div>
              <div style={{ fontSize: 12.5, color: "var(--ob-300)", lineHeight: 1.65 }}>{desc}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 18, padding: "14px 20px", background: "rgba(212,175,55,0.04)", border: "1px solid var(--border-soft)", borderRadius: "var(--r-md)", fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 15.5, color: "var(--ob-200)", lineHeight: 1.5 }}>
          "She didn't just run the program — she made it unforgettable."
        </div>
      </Card>

      {/* Gallery */}
      <Card title="On Stage & On the Carpet" icon="portfolio" style={{ marginBottom: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gridAutoRows: "200px", gap: 8 }}>
          {[
            "uploads/IMG_1305-6ff24187.JPG",
            "uploads/IMG_1306-bceef42a.JPG",
            "uploads/IMG_1307-b068fff7.JPG",
            "uploads/IMG_1308-78232945.JPG",
            "uploads/IMG_1309-f5edab79.JPG",
            "uploads/IMG_1310-e667480c.JPG",
            "uploads/IMG_1311-6beecea4.JPG",
            "uploads/IMG_1312-5d84b3f9.JPG",
            "uploads/IMG_1313-4f6023e0.JPG",
            "uploads/IMG_1314-d9f431fa.JPG",
            "uploads/IMG_1315-fd12fd1f.JPG",
            "uploads/IMG_1316-e59acebb.JPG",
            "uploads/IMG_1317-7f9ee48e.JPG",
            "uploads/IMG_1318-53c8fc46.JPG",
            "uploads/IMG_1319-2679714b.JPG",
            "uploads/IMG_1320-6d251b17.JPG",
            "uploads/IMG_1321-90fd8c45.JPG",
            "uploads/IMG_1322-60f94129.JPG",
            "uploads/IMG_1323-dda6d0b2.JPG",
            "uploads/IMG_1324-6ce3dcb9.JPG",
            "uploads/IMG_1325-cacb9d88.JPG",
            "uploads/IMG_1326-a9e5d340.JPG",
            "uploads/IMG_1327-86c630dc.JPG",
            "uploads/IMG_1328-67adcfa9.JPG",
            "uploads/IMG_1329-877f67c6.JPG",
            "uploads/IMG_1330-4f17fc1b.JPG",
            "uploads/IMG_1331-4289b06d.JPG",
            "uploads/IMG_1332-3fcc8f12.JPG",
            "uploads/IMG_1333-7288b39f.JPG",
            "uploads/IMG_1334-513cb657.JPG",
            "uploads/IMG_1335-d41270e6.JPG",
            "uploads/IMG_1336-bc6515e9.JPG",
            "uploads/IMG_1337-586d72f5.JPG",
            "uploads/IMG_1338-fbd1904c.JPG",
            "uploads/IMG_1339-0717a7a6.JPG",
            "uploads/IMG_1340-a8f3f2b6.JPG",
            "uploads/IMG_1341-bf09db4a.JPG",
            "uploads/IMG_1342-87efff6c.JPG",
            "uploads/IMG_1343-550b7565.JPG",
            "uploads/IMG_1344-0227615a.JPG",
            "uploads/IMG_1345-b2aeeadf.JPG",
            "uploads/IMG_1346-aba8a661.JPG",
            "uploads/IMG_1347-e24560bd.JPG",
            "uploads/IMG_1348-cece6270.JPG",
          ].map((src, i) => (
            <div key={i} style={{ borderRadius: "var(--r-md)", background: `center/cover url('${src}')`, border: "1px solid var(--border-soft)", backgroundSize: "cover" }} />
          ))}
        </div>
      </Card>

      {/* CTA */}
      <div style={{ textAlign: "center", padding: "40px 32px", background: "var(--surface-card)", border: "1px solid var(--border-soft)", borderRadius: "var(--r-lg)", boxShadow: "var(--shadow-card)" }}>
        <div style={{ fontFamily: "var(--font-display-alt)", fontWeight: 700, fontSize: 32, color: "var(--ob-50)", marginBottom: 10, lineHeight: 1.05 }}>Have a night that deserves a host?</div>
        <p style={{ margin: "0 auto 22px", fontSize: 14, color: "var(--ob-300)", maxWidth: "44ch", lineHeight: 1.6 }}>Tell Leigh the date, the room and the feeling you're after — she'll take it from there.</p>
        <Btn variant="primary" onClick={() => window.hlToast("Opening booking inquiry…")}>✦ Check her availability</Btn>
      </div>
      </div>
    </div>
  );
}

Object.assign(window, { Overview, Pipeline, Suppliers, Escrow, DiscountEngine, CalendarView, PortfolioView, MeetLeigh });
