/* ============================================================
   HOST LEIGH — PORTALS & DRAWERS
   ClientPortal · SupplierPortal (firewall demo) · GigDrawer.
   Exported to window.
   ============================================================ */

// ── shared message thread ──
function Thread({ messages, meSide }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {messages.map((m, i) => {
        const mine = m.from === meSide;
        return (
          <div key={i} style={{ display: "flex", justifyContent: mine ? "flex-end" : "flex-start" }}>
            <div style={{ maxWidth: "78%" }}>
              <div style={{
                padding: "9px 13px", borderRadius: 12, fontSize: 12.5, lineHeight: 1.45,
                background: mine ? "var(--gd-400)" : "var(--surface-raised)",
                color: mine ? "var(--ob-950)" : "var(--ob-100)",
                border: mine ? "none" : "1px solid var(--border-hair)",
                borderBottomRightRadius: mine ? 3 : 12, borderBottomLeftRadius: mine ? 12 : 3,
              }}>{m.t}</div>
              <div style={{ fontSize: 9.5, color: "var(--ob-300)", marginTop: 3, textAlign: mine ? "right" : "left", fontFamily: "var(--font-mono)" }}>{m.at}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function FakeComposer({ placeholder }) {
  return (
    <div style={{ display: "flex", gap: 8, marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--border-divider)" }}>
      <div style={{ flex: 1, padding: "9px 13px", background: "var(--surface-raised)", border: "1px solid var(--border-hair)", borderRadius: "var(--r-sm)", fontSize: 12.5, color: "var(--ob-300)" }}>{placeholder}</div>
      <Btn size="md" variant="primary" icon="message" onClick={() => window.hlToast("Message sent")}>Send</Btn>
    </div>
  );
}

// ════════════════════ CLIENT PORTAL ════════════════════
// ─── Run-of-Show data per gig ───
const ROS_DATA = {
  kia: [
    { time: "17:00", activity: "Pre-event phase — AV & lighting final check", type: "phase" },
    { time: "17:30", activity: "Supplier arrival window closes", note: "All caterers, AV, and florist confirmed on-site", type: "critical" },
    { time: "18:00", activity: "Guest registration opens · cocktail hour begins", type: "normal" },
    { time: "18:30", activity: "VIP guests arrive — dedicated reception lane", type: "vip" },
    { time: "18:50", activity: "90-min Metro Manila buffer (EDSA / CBD routes)", note: "Auto-applied for all VIP transport", type: "buffer" },
    { time: "19:00", activity: "Host Leigh opens the program", type: "normal" },
    { time: "19:10", activity: "KIA brand film screening", type: "normal" },
    { time: "19:30", activity: "Keynote address — KIA Philippines General Manager", type: "vip" },
    { time: "20:00", activity: "Main program phase — dinner service begins", type: "phase" },
    { time: "20:30", activity: "Live entertainment — band set 1", type: "normal" },
    { time: "21:00", activity: "Main product reveal · KIA EV9", type: "vip" },
    { time: "21:30", activity: "Photo opportunities · VIP table", type: "normal" },
    { time: "21:45", activity: "Closing remarks by Host Leigh", type: "normal" },
    { time: "22:00", activity: "Program ends · guests may continue networking", type: "buffer" },
  ],
  piepco: [
    { time: "08:00", activity: "Pre-event phase — registration setup", type: "phase" },
    { time: "08:30", activity: "Delegate registration opens", type: "normal" },
    { time: "09:00", activity: "Opening ceremony — Host Leigh welcomes delegates", type: "normal" },
    { time: "09:15", activity: "Keynote address — PIEPCO Board Chair", type: "vip" },
    { time: "10:00", activity: "Morning sessions begin", type: "phase" },
    { time: "12:00", activity: "Lunch break · networking", type: "buffer" },
    { time: "13:00", activity: "Afternoon sessions resume", type: "phase" },
    { time: "15:30", activity: "Panel discussion — industry leaders", type: "vip" },
    { time: "16:30", activity: "Closing plenary — Host Leigh", type: "normal" },
    { time: "17:00", activity: "Convention ends · certificate distribution", type: "buffer" },
  ],
};
const DEFAULT_ROS = [
  { time: "17:30", activity: "Venue doors open — supplier final check", type: "phase" },
  { time: "18:00", activity: "Guest registration · cocktail hour", type: "normal" },
  { time: "18:45", activity: "VIP arrivals — dedicated lane", type: "vip" },
  { time: "19:00", activity: "Host Leigh opens the program", type: "normal" },
  { time: "19:30", activity: "Main program begins", type: "phase" },
  { time: "20:00", activity: "Dinner service", type: "normal" },
  { time: "21:00", activity: "Entertainment / awards segment", type: "vip" },
  { time: "21:45", activity: "Closing remarks", type: "normal" },
  { time: "22:00", activity: "Program ends", type: "buffer" },
];
function fmtTime(t) {
  if (!t) return "—";
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return h12 + ":" + String(m).padStart(2, "0") + " " + ampm;
}

// Client sees: their event, ONE package price (never itemized),
// payment milestones, contract status, thread with host. No suppliers.
function ClientPortal({ gigId, setGigId }) {
  const HL = window.HL;
  const clientGigs = HL.financeGigs;
  const gig = HL.gigById(gigId) || clientGigs[0];
  const cv = HL.contractValue(gig);

  const milestones = [
    { label: "Booking downpayment", pct: 50, when: "On signing", done: gig.clientPaidPct >= 50 },
    { label: "Pre-event balance", pct: 40, when: "14 days before", done: gig.clientPaidPct >= 90 },
    { label: "Event-day release", pct: 10, when: "After sign-off", done: gig.clientPaidPct >= 100 },
  ];
  const paid = cv * gig.clientPaidPct / 100;

  return (
    <React.Fragment>
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <Lightfall colors={["#d4af37", "#e8ca6a", "#c94560", "#d96275"]} backgroundColor="#0d0b14" speed={0.35} streakCount={5} streakWidth={0.8} streakLength={1.1} glow={0.9} density={0.7} twinkle={1} zoom={2.5} backgroundGlow={0.55} opacity={0.5} mouseInteraction={false} />
      </div>
      <div style={{ maxWidth: 880, margin: "0 auto", position: "relative", zIndex: 1 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <PageHero eyebrow={`Client Portal · ${gig.client}`} title="Your event with Host Leigh." />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {clientGigs.map((g) => (
            <button key={g.id} onClick={() => setGigId(g.id)} style={pillBtn(g.id === gig.id)}>{g.client}</button>
          ))}
        </div>
      </div>

      <Card style={{ marginBottom: 16 }} pad={0}>
        <div style={{ padding: 24, borderBottom: "1px solid var(--border-divider)" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--gd-400)", letterSpacing: "1px", marginBottom: 8 }}>{gig.date.toUpperCase()} · {gig.time}</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 600, color: "var(--ob-50)", marginBottom: 6 }}>{gig.event}</div>
          <div style={{ fontSize: 13, color: "var(--ob-200)" }}>{gig.venue} · ~{gig.pax} guests · Hosted by Leigh Estella</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 0 }}>
          <div style={{ padding: 24, borderRight: "1px solid var(--border-divider)" }}>
            <div style={{ fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: "var(--ob-300)", marginBottom: 10 }}>All-in package</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 34, fontWeight: 500, color: "var(--gd-300)", lineHeight: 1, marginBottom: 8 }}>{HL.peso(cv)}</div>
            <div style={{ fontSize: 12, color: "var(--ob-300)", lineHeight: 1.5 }}>Hosting, full supplier coordination, venue liaison, run-of-show and day-of production — one number, one point of contact.</div>
            <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Tag tone="gold">{gig.type}</Tag><Tag tone="green">Contract signed</Tag>
            </div>
          </div>
          <div style={{ padding: 24 }}>
            <div style={{ fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: "var(--ob-300)", marginBottom: 10 }}>Paid to date</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 22, color: "var(--success-text)", marginBottom: 8 }}>{HL.peso(paid)}</div>
            <Bar pct={gig.clientPaidPct} color="var(--success)" />
            <div style={{ fontSize: 11, color: "var(--ob-300)", marginTop: 8 }}>{gig.clientPaidPct}% of {HL.peso(cv)}</div>
          </div>
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 16 }}>
        <Card title="Payment Schedule" icon="card">
          <div style={{ display: "flex", flexDirection: "column" }}>
            {milestones.map((m, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 0", borderBottom: i < 2 ? "1px solid var(--border-divider)" : "none" }}>
                <span style={{ width: 22, height: 22, borderRadius: "50%", flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center",
                  background: m.done ? "var(--success)" : "transparent", border: m.done ? "none" : "1.5px solid var(--ob-400)", color: "var(--ob-950)" }}>
                  {m.done && <Icon name="check" size={13} stroke="var(--ob-950)" />}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ob-50)" }}>{m.label}</div>
                  <div style={{ fontSize: 11, color: "var(--ob-300)" }}>{m.when} · {m.pct}% · {HL.peso(cv * m.pct / 100)}</div>
                </div>
                {m.done ? <Tag tone="green">Paid ✓</Tag>
                  : <Btn size="sm" variant="primary" icon="card" onClick={() => window.hlToast(`Opening GCash / Maya payment link for ${HL.peso(cv * m.pct / 100)}…`)}>Pay now</Btn>}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, padding: 12, background: "rgba(212,175,55,0.05)", border: "1px solid var(--border-hair)", borderRadius: "var(--r-md)", display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{ color: "var(--gd-400)", display: "inline-flex" }}><Icon name="lock" size={16} /></span>
            <span style={{ fontSize: 11.5, color: "var(--ob-200)" }}>Secured via GCash Business · Maya · BDO. Official receipt issued on every payment.</span>
          </div>
        </Card>
        <Card title="Messages with Leigh" icon="message">
          <Thread messages={HL.THREADS["client:" + gig.id] || HL.THREADS["client:kia"]} meSide="client" />
          <FakeComposer placeholder="Message your host…" />
        </Card>
      </div>

      {/* ── Run of Show ── */}
      {(() => {
        const rosItems = ROS_DATA[gig.id] || DEFAULT_ROS;
        const badgeMap = {
          vip:      { bg: "rgba(212,175,55,0.12)",   color: "var(--gd-300)",          border: "rgba(212,175,55,0.3)",    text: "VIP" },
          critical: { bg: "rgba(220,60,60,0.10)",    color: "#ff8070",                border: "rgba(220,60,60,0.28)",    text: "⚠ Critical" },
          buffer:   { bg: "rgba(78,205,196,0.08)",   color: "#4ECDC4",                border: "rgba(78,205,196,0.25)",   text: "Buffer" },
        };
        const accentBorder = { vip: "rgba(212,175,55,0.55)", critical: "#ff6b6b", buffer: "rgba(78,205,196,0.4)", phase: "var(--gd-400)", normal: "var(--border-soft)" };
        return (
          <Card title="Event Run of Show" icon="calendar" style={{ marginTop: 16 }}>
            {/* Traffic advisory */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 16px", background: "rgba(255,107,107,0.05)", border: "1px solid rgba(255,107,107,0.18)", borderRadius: "var(--r-md)", marginBottom: 28 }}>
              <span style={{ fontSize: 18, flexShrink: 0, lineHeight: 1 }}>🚦</span>
              <div style={{ fontSize: 12, color: "rgba(255,170,140,0.9)", lineHeight: 1.65 }}>
                <strong style={{ color: "#ff9a7a" }}>Metro Manila Traffic Advisory (Auto-Applied):</strong> All supplier arrivals include a 45-min buffer. VIP transport includes a 90-min EDSA / CBD buffer. Evening events (5–8 PM) add 30-min contingency.
              </div>
            </div>

            {/* Timeline track */}
            <div style={{ position: "relative", paddingLeft: 52 }}>
              {/* Vertical gold line */}
              <div style={{ position: "absolute", left: 20, top: 8, bottom: 8, width: 2, background: "linear-gradient(to bottom, var(--gd-400) 0%, rgba(212,175,55,0.06) 100%)", borderRadius: 2 }} />

              {rosItems.map((item, i) => {
                const isPhase = item.type === "phase";
                const badge = badgeMap[item.type];
                const dotFilled = isPhase || item.type === "vip";
                return (
                  <div key={i} style={{
                    position: "relative",
                    marginBottom: i < rosItems.length - 1 ? (isPhase ? 20 : 8) : 0,
                    marginTop: isPhase && i > 0 ? 20 : 0,
                    padding: isPhase ? "9px 14px" : "12px 16px",
                    background: isPhase ? "rgba(212,175,55,0.05)" : "var(--surface-raised)",
                    border: "1px solid " + (isPhase ? "rgba(212,175,55,0.15)" : "rgba(255,255,255,0.04)"),
                    borderLeft: "3px solid " + (accentBorder[item.type] || "var(--border-soft)"),
                    borderRadius: "0 var(--r-sm) var(--r-sm) 0",
                  }}>
                    {/* Dot on line */}
                    <div style={{
                      position: "absolute", left: -43, top: "50%", transform: "translateY(-50%)",
                      width: 10, height: 10, borderRadius: "50%",
                      background: dotFilled ? "var(--gd-400)" : "var(--surface-card)",
                      border: "2px solid " + (item.type === "critical" ? "#ff6b6b" : item.type === "buffer" ? "#4ECDC4" : "var(--gd-400)"),
                      boxShadow: dotFilled ? "0 0 8px rgba(212,175,55,0.45)" : "none",
                    }} />

                    <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 700, color: "var(--gd-300)", minWidth: 74, letterSpacing: "0.3px", paddingTop: 1, flexShrink: 0 }}>
                        {fmtTime(item.time)}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: isPhase ? 11 : 13.5, fontWeight: isPhase ? 700 : 600, color: isPhase ? "var(--gd-400)" : "var(--ob-50)", letterSpacing: isPhase ? "0.9px" : 0, textTransform: isPhase ? "uppercase" : "none", lineHeight: 1.3 }}>
                          {item.activity}
                        </div>
                        {item.note && (
                          <div style={{ fontSize: 12, color: "var(--ob-300)", marginTop: 4, lineHeight: 1.55 }}>{item.note}</div>
                        )}
                      </div>
                      {badge && (
                        <span style={{ padding: "2px 9px", borderRadius: "var(--r-pill)", fontSize: 10, fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase", flexShrink: 0, marginTop: 2, background: badge.bg, color: badge.color, border: "1px solid " + badge.border }}>
                          {badge.text}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 10, marginTop: 28, paddingTop: 20, borderTop: "1px solid var(--border-divider)", flexWrap: "wrap" }}>
              <Btn icon="calendar" onClick={() => window.print()}>Print / Save PDF</Btn>
              <Btn icon="message" onClick={() => {
                const text = encodeURIComponent("Hi Leigh! Quick question about the run of show for " + gig.event + " on " + gig.date + "...");
                window.open("https://api.whatsapp.com/send?text=" + text, "_blank");
              }}>WhatsApp Leigh</Btn>
              <Btn variant="primary" icon="card" onClick={() => window.hlToast("Opening change request thread with Leigh…")}>Request a Change</Btn>
            </div>
          </Card>
        );
      })()}
    </div>
    </React.Fragment>
  );
}

// ════════════════════ SUPPLIER PORTAL ════════════════════
// Supplier sees ONLY: event date/venue, their scope, their pay
// status, cue time, thread with host. Client masked. No peers.
function SupplierPortal({ supplierId, setSupplierId, onBack }) {
  const HL = window.HL;
  const all = [];
  HL.GIGS.forEach((g) => g.suppliers.forEach((s) => all.push({ ...s, gig: g })));
  const cur = all.find((x) => x.id === supplierId) || all[0];
  const g = cur.gig;
  const down = cur.quote * 0.5;
  const paidAmt = cur.quote * cur.paidPct / 100;

  return (
    <React.Fragment>
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <Lightfall colors={["#d4af37", "#e8ca6a", "#c94560", "#d96275"]} backgroundColor="#0d0b14" speed={0.3} streakCount={6} streakWidth={0.7} streakLength={1.1} glow={0.8} density={0.6} twinkle={0.9} zoom={2.8} backgroundGlow={0.5} opacity={0.45} mouseInteraction={false} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 118px)", position: "relative", zIndex: 1 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {onBack && (
            <button onClick={onBack} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "7px 12px", background: "none", border: "1px solid var(--border-soft)", borderRadius: "var(--r-pill)", color: "var(--ob-200)", fontSize: 12, fontFamily: "var(--font-body)", cursor: "pointer", transition: "var(--tr-all)" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gd-400)"; e.currentTarget.style.color = "var(--gd-300)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-soft)"; e.currentTarget.style.color = "var(--ob-200)"; }}>
              <Icon name="arrow" size={13} style={{ transform: "rotate(180deg)" }} />
              Back
            </button>
          )}
          <div>
            <div style={{ fontFamily: "var(--font-mono-alt)", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: "var(--gd-400)", marginBottom: 6 }}>{`Supplier Portal · ${cur.name}`}</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: "var(--ob-50)", lineHeight: 1.1 }}>Your engagement.</div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, padding: "11px 16px", background: "rgba(212,175,55,0.05)", border: "1px solid var(--border-hair)", borderRadius: "var(--r-md)" }}>
        <span style={{ color: "var(--gd-400)", display: "inline-flex" }}><Icon name="lock" size={17} /></span>
        <span style={{ fontSize: 12, color: "var(--ob-200)" }}>You're booked by <b style={{ color: "var(--gd-300)" }}>Host Leigh Productions</b>. The end client and other suppliers are confidential — all coordination runs through Leigh.</span>
      </div>

        <Card title={`${cur.name} — ${cur.cat}`} style={{ marginBottom: 14 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
          <Field label="Event date" value={`${g.date} · ${g.time}`} />
          <Field label="Venue" value={g.venue} />
          <Field label="Your call / cue" value={cur.cue} />
          </div>
          <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--border-divider)" }}>
            <Field label="Your scope of work" value={cur.scope} />
          </div>
          <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 11, color: "var(--ob-300)", letterSpacing: "1px", textTransform: "uppercase" }}>Booking status</span>
            <StatusPill status={cur.status} />
          </div>
        </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card title="Your Payment" icon="escrow">
          <div style={{ textAlign: "center", padding: "8px 0 16px" }}>
            <div style={{ fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: "var(--ob-300)", marginBottom: 6 }}>Agreed fee</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 28, color: "var(--gd-300)", lineHeight: 1 }}>{HL.peso(cur.quote)}</div>
          </div>
          <PayLine label="50% downpayment" amt={HL.peso(down)} done={cur.paidPct >= 50} note="On booking lock" />
          <PayLine label="50% balance" amt={HL.peso(cur.quote - down)} done={cur.paidPct >= 100} note="NET 5 days post-event" />
          <div style={{ marginTop: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 6 }}>
              <span style={{ color: "var(--ob-300)" }}>Released to you</span>
              <span style={{ fontFamily: "var(--font-mono)", color: "var(--success-text)" }}>{HL.peso(paidAmt)}</span>
            </div>
            <Bar pct={cur.paidPct} color="var(--success)" />
          </div>
        </Card>
        <Card title="Messages with Host Leigh" icon="message">
          <Thread messages={HL.THREADS["supplier:" + cur.id] || [{ from: "host", t: `Hi ${cur.name}, confirming your booking for ${g.date}. Cue: ${cur.cue}.`, at: g.date }]} meSide="supplier" />
          <FakeComposer placeholder="Reply to Host Leigh…" />
        </Card>
      </div>

      {/* Supplier picker — bottom card grid */}
      <div style={{ borderTop: "1px solid var(--border-soft)", paddingTop: 16, marginTop: 16 }}>
        <div style={{ fontSize: 9, color: "var(--ob-300)", letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 10 }}>Switch supplier</div>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(all.length, 6)}, 1fr)`, gap: 8 }}>
          {all.map((s) => {
            const active = s.id === cur.id;
            const statusColors = { confirmed: "var(--success)", pending: "var(--warning)", late: "var(--danger)", tbd: "var(--ob-400)" };
            return (
              <button key={s.id} onClick={() => setSupplierId(s.id)} style={{
                padding: "12px 10px", borderRadius: "var(--r-md)", cursor: "pointer", textAlign: "left",
                background: active ? "rgba(212,175,55,0.10)" : "var(--surface-raised)",
                border: `1px solid ${active ? "var(--gd-400)" : "var(--border-hair)"}`,
                transition: "var(--tr-all)", fontFamily: "var(--font-body)",
              }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = "var(--border-strong)"; e.currentTarget.style.background = "rgba(212,175,55,0.04)"; } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = "var(--border-hair)"; e.currentTarget.style.background = "var(--surface-raised)"; } }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: statusColors[s.status] || "var(--ob-400)", flexShrink: 0 }} />
                  <span style={{ fontSize: 9, color: active ? "var(--gd-300)" : "var(--ob-300)", letterSpacing: "1px", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>{s.cat}</span>
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: active ? "var(--gd-300)" : "var(--ob-50)", lineHeight: 1.3, marginBottom: 3 }}>{s.name}</div>
                <div style={{ fontSize: 10, color: "var(--ob-300)", lineHeight: 1.3 }}>{s.cue}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
    </React.Fragment>
  );
}
function Field({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--ob-300)", marginBottom: 5 }}>{label}</div>
      <div style={{ fontSize: 13.5, color: "var(--ob-50)", fontWeight: 500 }}>{value}</div>
    </div>
  );
}
function PayLine({ label, amt, done, note }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid var(--border-divider)" }}>
      <span style={{ width: 18, height: 18, borderRadius: "50%", flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center",
        background: done ? "var(--success)" : "transparent", border: done ? "none" : "1.5px solid var(--ob-400)" }}>
        {done && <Icon name="check" size={11} stroke="var(--ob-950)" />}
      </span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12.5, color: "var(--ob-50)", fontWeight: 500 }}>{label}</div>
        <div style={{ fontSize: 10, color: "var(--ob-300)" }}>{note}</div>
      </div>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: done ? "var(--success-text)" : "var(--ob-200)" }}>{amt}</span>
    </div>
  );
}

// ════════════════════ GIG DRAWER (host) ════════════════════
function GigDrawer({ gigId, onClose, go }) {
  const HL = window.HL;
  const gig = gigId && HL.gigById(gigId);
  React.useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  if (!gig) return null;
  const cv = HL.contractValue(gig);
  const ros = [
    { t: "6:00 PM", a: "Doors open · registration · cocktails" },
    { t: "6:45 PM", a: "Opening AVP · host welcome (Leigh)" },
    { t: "7:00 PM", a: "Client message · keynote" },
    { t: "7:40 PM", a: "Dinner service · band set" },
    { t: "8:30 PM", a: "Main program · product reveal" },
    { t: "9:15 PM", a: "Photo ops · closing remarks" },
  ];
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(2px)", zIndex: 300, display: "flex", justifyContent: "flex-end" }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        width: 480, maxWidth: "92vw", height: "100%", overflowY: "auto", background: "var(--surface-card)",
        borderLeft: "1px solid var(--border-soft)", boxShadow: "var(--shadow-deep)", animation: "hlSlideIn 0.3s var(--ease-standard)",
      }}>
        <div style={{ position: "sticky", top: 0, background: "var(--glass-bg)", backdropFilter: "var(--blur-glass)", padding: "18px 24px", borderBottom: "1px solid var(--border-hair)", display: "flex", alignItems: "flex-start", justifyContent: "space-between", zIndex: 2 }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--gd-400)", letterSpacing: "1px", marginBottom: 5 }}>{gig.date.toUpperCase()} · {gig.time}</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 21, fontWeight: 600, color: "var(--ob-50)", lineHeight: 1.1 }}>{gig.client}</div>
            <div style={{ fontSize: 12, color: "var(--ob-300)", marginTop: 2 }}>{gig.event}</div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "1px solid var(--border-soft)", color: "var(--ob-200)", borderRadius: "var(--r-sm)", width: 30, height: 30, cursor: "pointer", fontSize: 16, lineHeight: 1 }}>×</button>
        </div>
        <div style={{ padding: 24 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
            <Mini label="Contract" value={HL.pesoK(cv)} pct={`${gig.clientPaidPct}% paid`} tone="default" />
            <Mini label="Suppliers" value={gig.suppliers.length} pct={gig.venue.split("·")[0]} tone="default" />
            <Mini label="Guests" value={gig.pax} pct={gig.type} tone="default" />
          </div>

          <SectionLabel>Run of show</SectionLabel>
          <div style={{ position: "relative", paddingLeft: 18, marginBottom: 22 }}>
            <div style={{ position: "absolute", left: 4, top: 4, bottom: 4, width: 1.5, background: "var(--grad-rail)" }} />
            {ros.map((r, i) => (
              <div key={i} style={{ position: "relative", paddingBottom: 12 }}>
                <span style={{ position: "absolute", left: -18, top: 4, width: 7, height: 7, borderRadius: "50%", background: "var(--gd-400)", boxShadow: "var(--glow-gold)" }} />
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--gd-300)" }}>{r.t}</div>
                <div style={{ fontSize: 12.5, color: "var(--ob-100)", marginTop: 1 }}>{r.a}</div>
              </div>
            ))}
          </div>

          <SectionLabel>Suppliers on this gig</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
            {gig.suppliers.map((s) => (
              <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "var(--surface-raised)", border: "1px solid var(--border-hair)", borderRadius: "var(--r-md)" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ob-50)" }}>{s.name}</div>
                  <div style={{ fontSize: 10.5, color: "var(--ob-300)" }}>{s.cat} · {s.scope}</div>
                </div>
                <StatusPill status={s.status} />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Btn fullWidth icon="suppliers" onClick={() => { onClose(); go("suppliers", gig.id); }}>Open firewall</Btn>
            <Btn fullWidth icon="discount" onClick={() => { onClose(); go("discount", gig.id); }}>Margin engine</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}
function SectionLabel({ children }) {
  return <div style={{ fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: "var(--ob-300)", marginBottom: 12, fontWeight: 600 }}>{children}</div>;
}
function pillBtn(active) {
  return {
    padding: "7px 14px", borderRadius: "var(--r-pill)", fontFamily: "var(--font-body)", fontSize: 12, cursor: "pointer", border: "1px solid", transition: "var(--tr-all)",
    ...(active ? { background: "var(--gd-400)", borderColor: "var(--gd-400)", color: "var(--ob-950)", fontWeight: 600 } : { background: "none", borderColor: "var(--border-soft)", color: "var(--ob-200)" }),
  };
}

Object.assign(window, { ClientPortal, SupplierPortal, GigDrawer });
