/* ============================================================
   HOST LEIGH — HOST VIEWS
   Overview · Pipeline · Suppliers(firewall) · Escrow ·
   Discount Engine · Calendar. Exported to window.
   ============================================================ */

// ───────────────────────── OVERVIEW ─────────────────────────
function Overview({ go }) {
  const HL = window.HL;
  const active = HL.activeGigs;
  const fin = HL.financeGigs;
  const contracted = fin.reduce((s, g) => s + HL.contractValue(g), 0);
  const collected = fin.reduce((s, g) => s + HL.contractValue(g) * (g.clientPaidPct / 100), 0);
  const outstanding = contracted - collected;
  const next = HL.gigById("kia");

  const alerts = [
    { tone: "danger", title: "Catering confirmation overdue — KIA Launch", meta: "Event in 6 days · Red Ribbon Catering · expected yesterday", cta: "Call now", act: () => window.hlToast("Calling Red Ribbon Catering…") },
    { tone: "warning", title: "50% balance uncollected — PIEPCO Convention", meta: "Due Jul 5 · ₱57,000 · PIEPCO Foundation", cta: "Send reminder", act: () => window.hlToast("Payment reminder sent to PIEPCO ✓") },
    { tone: "success", title: "AV testing scheduled — KIA Makati", meta: "Today 3:00 PM · Makati Shangri-La · all suppliers briefed", cta: null },
  ];
  const toneBg = { danger: "rgba(239,68,68,0.06)", warning: "rgba(245,158,11,0.06)", success: "rgba(34,197,94,0.06)" };
  const toneBd = { danger: "rgba(239,68,68,0.18)", warning: "rgba(245,158,11,0.18)", success: "rgba(34,197,94,0.15)" };
  const toneDot = { danger: "var(--danger)", warning: "var(--warning)", success: "var(--success)" };

  return (
    <div>
      {/* Lightfall (React Bits) animated hero banner */}
      <div style={{ position: "relative", height: 196, borderRadius: "var(--r-lg)", overflow: "hidden", marginBottom: 24, border: "1px solid var(--border-soft)", boxShadow: "var(--shadow-card)" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <Lightfall store={window.HL_BG} colors={(window.HL_BG && window.HL_BG.colors) || ["#d4af37", "#e8ca6a", "#c94560", "#d96275"]} backgroundColor={(window.HL_BG && window.HL_BG.backgroundColor) || "#1a1a2e"} speed={0.6} streakCount={8} streakWidth={1} streakLength={1.3} glow={1} density={1} twinkle={1} zoom={2} backgroundGlow={0.85} opacity={1} mouseInteraction={true} mouseStrength={1} mouseRadius={0.6} />
        </div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(95deg, rgba(22,18,33,0.88) 0%, rgba(22,18,33,0.5) 48%, rgba(22,18,33,0.1) 100%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", height: "100%", padding: "0 36px", display: "flex", flexDirection: "column", justifyContent: "center", pointerEvents: "none" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", color: "var(--gd-300)", marginBottom: 8 }}>Welcome back, Boss ✦</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 700, color: "var(--ob-50)", lineHeight: 1.05 }}>The empire, at a glance.</div>
          <div style={{ fontSize: 12.5, color: "var(--ob-200)", marginTop: 8 }}>{active.length} active gigs · {fin.length} confirmed · next up {next.client}, {next.date}</div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
        <KPI label="Active Gigs" value={active.length} sub={{ text: "↑ +2 this month", tone: "up" }} />
        <KPI label="Contracted" value={HL.pesoK(contracted)} sub={{ text: "across active events", tone: "muted" }} />
        <KPI label="Collected" value={HL.pesoK(collected)} tone="success" sub={{ text: Math.round(collected / contracted * 100) + "% of contracted", tone: "up" }} />
        <KPI label="Outstanding" value={HL.pesoK(outstanding)} tone="warning" sub={{ text: "1 overdue invoice", tone: "warn" }} />
      </div>

      <Card title="Today's Alerts" icon="bolt" style={{ marginBottom: 20 }}>
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
              <button key={pg} onClick={() => go(pg)} style={{
                display: "flex", alignItems: "center", gap: 12, textAlign: "left", padding: "12px 14px",
                background: "var(--surface-raised)", border: "1px solid var(--border-hair)", borderRadius: "var(--r-md)",
                color: "var(--ob-100)", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: 13, transition: "var(--tr-all)",
              }} onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--border-strong)"; e.currentTarget.style.color = "var(--gd-300)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-hair)"; e.currentTarget.style.color = "var(--ob-100)"; }}>
                <span style={{ color: "var(--gd-400)", display: "inline-flex" }}><Icon name={ic} size={16} /></span>
                {lbl}
                <span style={{ marginLeft: "auto", color: "var(--ob-300)", display: "inline-flex" }}><Icon name="arrow" size={15} /></span>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ───────────────────────── PIPELINE ─────────────────────────
function Pipeline({ openGig }) {
  const HL = window.HL;
  return (
    <div>
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
    <div>
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
                    onClick={(e) => { e.stopPropagation(); window.hlToast(`Calling ${s.name}…`); }}>
                    {s.status === "late" ? "Call now" : "Call"}
                  </Btn>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
const tdS = { padding: "13px 12px", borderBottom: "1px solid var(--border-divider)", fontSize: 13, color: "var(--ob-100)", verticalAlign: "middle" };

// ───────────────────────── ESCROW ─────────────────────────
function Escrow() {
  const HL = window.HL;
  const gigs = HL.financeGigs;
  const totals = gigs.reduce((a, g) => {
    const cv = HL.contractValue(g);
    const paid = cv * (g.clientPaidPct / 100);
    const supCost = HL.supplierTotal(g, false);
    const released = g.suppliers.reduce((s, x) => s + x.quote * (x.paidPct / 100), 0);
    a.contracted += cv; a.collected += paid; a.supCost += supCost; a.released += released;
    if (g.clientPaidPct === 0) a.overdue += cv;
    return a;
  }, { contracted: 0, collected: 0, supCost: 0, released: 0, overdue: 0 });

  return (
    <div>
      <PageHero eyebrow="Escrow Tracker" title="Client pays you. You release suppliers." sub="Money sits with you between collection and event sign-off — your leverage, your float, your protection." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 20 }}>
        <KPI label="Contracted" value={HL.pesoK(totals.contracted)} />
        <KPI label="Collected" value={HL.pesoK(totals.collected)} tone="success" />
        <KPI label="Held in escrow" value={HL.pesoK(totals.collected - totals.released)} tone="default" sub={{ text: "not yet released", tone: "muted" }} />
        <KPI label="Overdue" value={HL.pesoK(totals.overdue)} tone="danger" sub={{ text: "1 client", tone: "down" }} />
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
    <div>
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
    <div>
      <PageHero eyebrow="Event Calendar" title="July 2025" sub="The booked month. Gold marks a confirmed event — click to open it." />
      <Card pad={16}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 6 }}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} style={{ fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--ob-300)", textAlign: "center", padding: "4px 0" }}>{d}</div>
          ))}
          {cells.map((d, i) => {
            const ev = d && events[d];
            const g = ev && HL.gigById(ev);
            return (
              <div key={i} onClick={() => g && openGig(g.id)} style={{
                minHeight: 78, borderRadius: "var(--r-sm)", padding: 8, border: "1px solid var(--border-divider)",
                background: d ? "var(--surface-raised)" : "transparent", cursor: g ? "pointer" : "default",
                opacity: d ? 1 : 0, transition: "var(--tr-all)",
                ...(ev ? { borderColor: "var(--border-strong)" } : null),
              }} onMouseEnter={e => { if (g) e.currentTarget.style.borderColor = "var(--gd-400)"; }}
                onMouseLeave={e => { if (g) e.currentTarget.style.borderColor = "var(--border-strong)"; }}>
                {d && <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: ev ? "var(--gd-300)" : "var(--ob-300)" }}>{d}</div>}
                {g && (
                  <div style={{ marginTop: 6 }}>
                    <div style={{ fontSize: 10.5, fontWeight: 600, color: "var(--ob-50)", lineHeight: 1.2 }}>{g.client}</div>
                    <div style={{ fontSize: 9, color: "var(--gd-400)", marginTop: 3, fontFamily: "var(--font-mono)" }}>{g.time}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

// ───────────────────────── PORTFOLIO (DomeGallery) ─────────────────────────
const PORTFOLIO_IMAGES = [
  { src: ((window.__resources && window.__resources.imgOffice) || "assets/photos/leigh-office.jpeg"), alt: "Corporate portrait" },
  { src: ((window.__resources && window.__resources.imgVeeam) || "assets/photos/leigh-veeam.jpeg"), alt: "Veeam — Safe AI at Scale" },
  { src: ((window.__resources && window.__resources.imgJollibee) || "assets/photos/leigh-jollibee.jpeg"), alt: "Jollibee Joy event" },
  { src: ((window.__resources && window.__resources.imgGala) || "assets/photos/leigh-gala.jpeg"), alt: "Le French Gala" },
  { src: ((window.__resources && window.__resources.imgSpeakers) || "assets/photos/leigh-speakerscon.jpeg"), alt: "SpeakersCon PH" },
  { src: ((window.__resources && window.__resources.imgPifpo) || "assets/photos/leigh-pifpo.jpeg"), alt: "PiFPO NCR Conference" },
  { src: ((window.__resources && window.__resources.imgParis) || "assets/photos/leigh-paris.jpeg"), alt: "Editorial portrait" },
  { src: ((window.__resources && window.__resources.imgPortrait) || "assets/photos/leigh-portrait.jpeg"), alt: "Beauty portrait" },
  { src: ((window.__resources && window.__resources.imgEvent) || "assets/photos/leigh-event.jpeg"), alt: "VIP party host" },
  { src: ((window.__resources && window.__resources.imgWorking) || "assets/photos/leigh-working.jpeg"), alt: "Behind the scenes" },
  { src: ((window.__resources && window.__resources.imgSelfie) || "assets/photos/leigh-selfie.jpeg"), alt: "On-site selfie" },
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

// ───────────────────────── MEET LEIGH ─────────────────────────
function MeetLeigh() {
  return (
    <div>
      {/* Hero */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20, alignItems: "stretch" }}>
        <div style={{ background: "var(--surface-card)", border: "1px solid var(--border-hair)", borderRadius: "var(--r-lg)", padding: "32px 36px", boxShadow: "var(--shadow-card)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 10, letterSpacing: "3px", textTransform: "uppercase", color: "var(--gd-300)", marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 22, height: 1, background: "var(--grad-gold)" }} />Meet your host
          </div>
          <div style={{ fontFamily: "var(--font-display-alt)", fontWeight: 700, fontSize: 58, lineHeight: 0.96, color: "var(--ob-50)", marginBottom: 10 }}>Leigh.</div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 19, fontStyle: "italic", color: "var(--gd-300)", marginBottom: 20, lineHeight: 1.25 }}>The voice that holds the room.</div>
          <p style={{ fontSize: 13.5, lineHeight: 1.75, color: "var(--ob-200)", margin: "0 0 10px", maxWidth: "50ch" }}>Leigh is a professional event host and emcee who turns programs into experiences — galas, product launches, conferences and weddings. She reads a room in seconds and keeps a run sheet on rails.</p>
          <p style={{ fontSize: 13.5, lineHeight: 1.75, color: "var(--ob-300)", margin: "0 0 24px", maxWidth: "50ch" }}>From the first inquiry to the final encore, she hosts the whole arc: warm, precise, and impossible to look away from.</p>
          <div style={{ display: "flex", gap: 10 }}>
            <Btn variant="primary" onClick={() => window.hlToast("Opening booking form…")}>✦ Book Leigh</Btn>
            <Btn variant="secondary" onClick={() => window.hlToast("Scrolling to gallery…")}>See the portfolio</Btn>
          </div>
        </div>
        <div style={{ borderRadius: "var(--r-lg)", overflow: "hidden", border: "1px solid var(--border-soft)", minHeight: 380 }}>
          <div style={{ width: "100%", height: "100%", minHeight: 380, background: "center 22%/cover url('" + ((window.__resources && window.__resources.imgPortrait) || 'assets/photos/leigh-portrait.jpeg') + "')" }} />
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 20 }}>
        <KPI label="Years Hosting" value="8+" sub={{ text: "Since 2016", tone: "muted" }} />
        <KPI label="Events Hosted" value="200+" sub={{ text: "Galas · launches · weddings", tone: "muted" }} />
        <KPI label="Cities on Call" value="4" sub={{ text: "Metro Manila + beyond", tone: "muted" }} />
        <KPI label="Client Satisfaction" value="100%" tone="success" sub={{ text: "↑ all reviews", tone: "up" }} />
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridAutoRows: "150px", gap: 10 }}>
          <div style={{ gridRow: "span 2", borderRadius: "var(--r-md)", background: "center/cover url('" + ((window.__resources && window.__resources.imgGala) || 'assets/photos/leigh-gala.jpeg') + "')", border: "1px solid var(--border-soft)" }} />
          <div style={{ gridColumn: "span 2", borderRadius: "var(--r-md)", background: "center 30%/cover url('" + ((window.__resources && window.__resources.imgVeeam) || 'assets/photos/leigh-veeam.jpeg') + "')", border: "1px solid var(--border-soft)" }} />
          <div style={{ borderRadius: "var(--r-md)", background: "center/cover url('" + ((window.__resources && window.__resources.imgSpeakers) || 'assets/photos/leigh-speakerscon.jpeg') + "')", border: "1px solid var(--border-soft)" }} />
          <div style={{ borderRadius: "var(--r-md)", background: "center/cover url('" + ((window.__resources && window.__resources.imgPifpo) || 'assets/photos/leigh-pifpo.jpeg') + "')", border: "1px solid var(--border-soft)" }} />
          <div style={{ borderRadius: "var(--r-md)", background: "center/cover url('" + ((window.__resources && window.__resources.imgJollibee) || 'assets/photos/leigh-jollibee.jpeg') + "')", border: "1px solid var(--border-soft)" }} />
          <div style={{ borderRadius: "var(--r-md)", background: "center/cover url('" + ((window.__resources && window.__resources.imgParis) || 'assets/photos/leigh-paris.jpeg') + "')", border: "1px solid var(--border-soft)" }} />
        </div>
      </Card>

      {/* CTA */}
      <div style={{ textAlign: "center", padding: "40px 32px", background: "var(--surface-card)", border: "1px solid var(--border-soft)", borderRadius: "var(--r-lg)", boxShadow: "var(--shadow-card)" }}>
        <div style={{ fontFamily: "var(--font-display-alt)", fontWeight: 700, fontSize: 32, color: "var(--ob-50)", marginBottom: 10, lineHeight: 1.05 }}>Have a night that deserves a host?</div>
        <p style={{ margin: "0 auto 22px", fontSize: 14, color: "var(--ob-300)", maxWidth: "44ch", lineHeight: 1.6 }}>Tell Leigh the date, the room and the feeling you're after — she'll take it from there.</p>
        <Btn variant="primary" onClick={() => window.hlToast("Opening booking inquiry…")}>✦ Check her availability</Btn>
      </div>
    </div>
  );
}

Object.assign(window, { Overview, Pipeline, Suppliers, Escrow, DiscountEngine, CalendarView, PortfolioView, MeetLeigh });
