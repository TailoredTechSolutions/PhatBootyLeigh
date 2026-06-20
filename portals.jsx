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
    <div style={{ maxWidth: 880, margin: "0 auto" }}>
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
    </div>
  );
}

// ════════════════════ SUPPLIER PORTAL ════════════════════
// Supplier sees ONLY: event date/venue, their scope, their pay
// status, cue time, thread with host. Client masked. No peers.
function SupplierPortal({ supplierId, setSupplierId }) {
  const HL = window.HL;
  const all = [];
  HL.GIGS.forEach((g) => g.suppliers.forEach((s) => all.push({ ...s, gig: g })));
  const cur = all.find((x) => x.id === supplierId) || all[0];
  const g = cur.gig;
  const down = cur.quote * 0.5;
  const paidAmt = cur.quote * cur.paidPct / 100;

  return (
    <div style={{ maxWidth: 820, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18, flexWrap: "wrap", gap: 12 }}>
        <PageHero eyebrow={`Supplier Portal · ${cur.name}`} title="Your engagement." />
        <select value={cur.id} onChange={(e) => setSupplierId(e.target.value)} style={{
          background: "var(--surface-raised)", border: "1px solid var(--border-soft)", color: "var(--ob-100)",
          borderRadius: "var(--r-sm)", padding: "8px 12px", fontFamily: "var(--font-body)", fontSize: 12.5, cursor: "pointer",
        }}>
          {all.map((s) => <option key={s.id} value={s.id} style={{ background: "var(--ob-900)" }}>{s.name} — {s.cat}</option>)}
        </select>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, padding: "11px 16px", background: "rgba(212,175,55,0.05)", border: "1px solid var(--border-hair)", borderRadius: "var(--r-md)" }}>
        <span style={{ color: "var(--gd-400)", display: "inline-flex" }}><Icon name="lock" size={17} /></span>
        <span style={{ fontSize: 12, color: "var(--ob-200)" }}>You're booked by <b style={{ color: "var(--gd-300)" }}>Host Leigh Productions</b>. The end client and other suppliers are confidential — all coordination runs through Leigh.</span>
      </div>

      <Card style={{ marginBottom: 16 }}>
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
    </div>
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
