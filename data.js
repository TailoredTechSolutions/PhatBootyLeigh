/* ============================================================
   HOST LEIGH — DASHBOARD DATA
   Single source of truth. Gigs own suppliers + escrow + client.
   The firewall, escrow tracker and discount engine all derive
   from this object — nothing is duplicated.
   ============================================================ */
(function () {
  const peso = (n) =>
    "₱" + Math.round(n).toLocaleString("en-PH");
  const pesoK = (n) =>
    n >= 1000 ? "₱" + (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1) + "K" : peso(n);

  // ── HOST IDENTITY ──
  const HOST = {
    name: "Leigh Estella",
    handle: "@yourhostleigh",
    monogram: "LE",
    role: "Corporate Event Host",
    years: 14,
    email: "work.leighestella@gmail.com",
    followers: "8.2K",
  };

  // Helper to build a supplier record
  const sup = (o) => ({
    eta: "T-3h",
    paidPct: 0,            // % of supplier cost already released
    ...o,
  });

  // ── GIGS ──  (each owns its suppliers + client + escrow)
  const GIGS = [
    {
      id: "kia",
      stage: "confirmed",
      client: "KIA Philippines",
      clientContact: "Marketing Office · Ms. Reyes",
      event: "Year-End Product Launch",
      type: "Product Launch",
      date: "Jul 12, 2025",
      time: "6:00 PM",
      venue: "Makati Shangri-La · Grand Ballroom",
      pax: 300,
      hostingFee: 45000,
      markupPct: 32,
      clientPaidPct: 50,      // client has paid 50% of contract
      suppliers: [
        sup({ id: "kia-av", name: "Makati Shangri-La AV", cat: "AV", scope: "Lights · Sound · LED Wall", contact: "0917 123 4567", floor: 28000, quote: 34000, status: "confirmed", eta: "T-3h", cue: "Load-in 2:00 PM", paidPct: 50 }),
        sup({ id: "kia-cat", name: "Red Ribbon Catering", cat: "Catering", scope: "Cocktails + Plated Dinner · 300pax", contact: "0918 987 6543", floor: 52000, quote: 60000, status: "late", eta: "T-3h", cue: "Setup 2:30 PM", paidPct: 30 }),
        sup({ id: "kia-dec", name: "Ace Flores Events", cat: "Décor", scope: "Floral + Stage Styling", contact: "0920 112 2334", floor: 18000, quote: 22000, status: "confirmed", eta: "T-4h", cue: "Setup 1:00 PM", paidPct: 50 }),
        sup({ id: "kia-med", name: "Pixel Perfect PH", cat: "Media", scope: "Photo + Video Coverage", contact: "0915 566 7788", floor: 14000, quote: 17000, status: "pending", eta: "T-2h", cue: "Call-time 4:00 PM", paidPct: 0 }),
        sup({ id: "kia-log", name: "Metro Parking Solutions", cat: "Logistics", scope: "VIP Valet + Guest Parking", contact: "0933 344 5566", floor: 6000, quote: 8000, status: "tbd", eta: "T-2h", cue: "On-site 4:30 PM", paidPct: 0 }),
      ],
    },
    {
      id: "piepco",
      stage: "confirmed",
      client: "PIEPCO Foundation",
      clientContact: "HR · Mr. Santos",
      event: "2nd Regional Convention",
      type: "Convention",
      date: "Jul 19, 2025",
      time: "9:00 AM",
      venue: "SMX Convention Center · Hall 3",
      pax: 450,
      hostingFee: 38000,
      markupPct: 30,
      clientPaidPct: 0,       // OVERDUE
      suppliers: [
        sup({ id: "pp-av", name: "Strong Media Corp", cat: "AV", scope: "Full Stage + Sound", contact: "0917 444 1212", floor: 60000, quote: 72000, status: "confirmed", cue: "Load-in 6:00 AM", paidPct: 30 }),
        sup({ id: "pp-cat", name: "Hizon's Catering", cat: "Catering", scope: "AM Snack + Buffet Lunch", contact: "0918 222 3344", floor: 80000, quote: 92000, status: "confirmed", cue: "Setup 6:30 AM", paidPct: 30 }),
        sup({ id: "pp-dec", name: "Glisten Concepts", cat: "Décor", scope: "Stage + Registration Styling", contact: "0920 555 6677", floor: 22000, quote: 27000, status: "pending", cue: "Setup 5:30 AM", paidPct: 0 }),
      ],
    },
    {
      id: "jollibee",
      stage: "confirmed",
      client: "Jollibee Foods Corp",
      clientContact: "Brand Activation Team",
      event: "YEP II Brand Activation",
      type: "Brand Activation",
      date: "Jul 18, 2025",
      time: "2:00 PM",
      venue: "SM Megamall · Event Center",
      pax: 200,
      hostingFee: 28000,
      markupPct: 28,
      clientPaidPct: 100,     // paid in full
      suppliers: [
        sup({ id: "jb-av", name: "XSTATIC Productions", cat: "AV", scope: "Truss + Sound + Lights", contact: "0917 808 9090", floor: 34000, quote: 40000, status: "confirmed", cue: "Load-in 10:00 AM", paidPct: 100 }),
        sup({ id: "jb-dec", name: "Fleur de Lis Events", cat: "Décor", scope: "Mall Activation Setup", contact: "0920 313 4141", floor: 16000, quote: 20000, status: "confirmed", cue: "Setup 9:00 AM", paidPct: 100 }),
        sup({ id: "jb-med", name: "Rockbird Media", cat: "Media", scope: "Coverage + Reels", contact: "0915 717 8181", floor: 12000, quote: 15000, status: "confirmed", cue: "Call-time 12:00 PM", paidPct: 100 }),
      ],
    },
    {
      id: "commonwealth",
      stage: "confirmed",
      client: "Commonwealth Healthcare",
      clientContact: "Admin · Ms. Dela Cruz",
      event: "CORE Doctors Recognition II",
      type: "Awards Night",
      date: "Aug 2, 2025",
      time: "6:30 PM",
      venue: "Dusit Thani Manila · Mayuree Ballroom",
      pax: 250,
      hostingFee: 35000,
      markupPct: 35,
      clientPaidPct: 50,
      suppliers: [
        sup({ id: "cw-av", name: "Exile Inc.", cat: "AV", scope: "Awards Stage + LED", contact: "0917 626 3030", floor: 46000, quote: 55000, status: "confirmed", cue: "Load-in 1:00 PM", paidPct: 50 }),
        sup({ id: "cw-cat", name: "Bizu Catering", cat: "Catering", scope: "Gala Plated Dinner", contact: "0918 191 2020", floor: 70000, quote: 82000, status: "pending", cue: "Setup 2:00 PM", paidPct: 0 }),
        sup({ id: "cw-dec", name: "Narcissus Events", cat: "Décor", scope: "Gala Styling + Awards Wall", contact: "0920 717 1818", floor: 30000, quote: 38000, status: "confirmed", cue: "Setup 12:00 PM", paidPct: 50 }),
        sup({ id: "cw-ent", name: "Suki Band Collective", cat: "Entertainment", scope: "6-piece Band + DJ", contact: "0915 404 5050", floor: 24000, quote: 30000, status: "confirmed", cue: "Soundcheck 4:00 PM", paidPct: 50 }),
      ],
    },
    // pipeline-only (no full supplier rosters yet)
    { id: "veeam", stage: "lead", client: "Veeam Philippines", event: "Q3 Tech Summit 2025", type: "Convention", date: "Aug 2025", venue: "TBD", suppliers: [] },
    { id: "andre", stage: "lead", client: "Andre Norman Global", event: "Asia Leadership Forum", type: "Forum", date: "Sep 2025", venue: "TBD", suppliers: [] },
    { id: "elegance", stage: "prep", client: "Manila Elegance Society", event: "Annual Gala 2025", type: "Gala", date: "Aug 30", venue: "EDSA Shangri-La", note: "Script WIP", suppliers: [] },
    { id: "lifefitness", stage: "prep", client: "Life Fitness PH", event: "Brand Wellness Summit", type: "Summit", date: "Sep 5", venue: "TBD", note: "Suppliers TBD", suppliers: [] },
    { id: "veeam-done", stage: "done", client: "Veeam", event: "Data Platform v13 Launch · Feb 12", type: "Launch", date: "Feb 12", venue: "—", paid: true, suppliers: [] },
    { id: "speakers-done", stage: "done", client: "SpeakersCon PH", event: "Mark Schaefer Forum · Feb 16", type: "Forum", date: "Feb 16", venue: "—", paid: true, suppliers: [] },
    { id: "airsupply-done", stage: "done", client: "Air Supply", event: "50th Anniversary · Jan 2025", type: "Concert", date: "Jan 2025", venue: "—", paid: true, suppliers: [] },
    { id: "pifpo-done", stage: "done", client: "PiFPO NCR", event: "1st Regional Conference · May 6", type: "Conference", date: "May 6", venue: "—", paid: true, suppliers: [] },
  ];

  // ── DERIVED HELPERS ──
  const supplierTotal = (g, useFloor) =>
    (g.suppliers || []).reduce((s, x) => s + (useFloor ? x.floor : x.quote), 0);

  // Contract value the client pays = marked-up supplier quotes + hosting fee
  const contractValue = (g) =>
    Math.round(supplierTotal(g, false) * (1 + (g.markupPct || 0) / 100) + (g.hostingFee || 0));

  const STAGES = [
    { key: "lead", label: "Lead", glyph: "●", color: "var(--ob-200)" },
    { key: "confirmed", label: "Confirmed", glyph: "◆", color: "var(--gd-400)" },
    { key: "prep", label: "In Prep", glyph: "◐", color: "var(--warning)" },
    { key: "done", label: "Done", glyph: "✓", color: "var(--success)" },
  ];

  const STATUS = {
    confirmed: { label: "Confirmed", glyph: "●", cls: "confirmed" },
    pending:   { label: "Pending",   glyph: "◐", cls: "pending" },
    late:      { label: "Overdue",   glyph: "⚠", cls: "late" },
    tbd:       { label: "TBD",       glyph: "○", cls: "tbd" },
  };

  // Message threads — host<->client and host<->supplier (firewall: never crossed)
  const THREADS = {
    "client:kia": [
      { from: "client", t: "Hi Leigh! Excited for the launch. Is the package final?", at: "Jun 28" },
      { from: "host", t: "Yes po — all-in package locked. Sending the proposal + payment link now.", at: "Jun 28" },
      { from: "client", t: "Received. Processing the 50% downpayment today.", at: "Jun 29" },
    ],
    "supplier:kia-av": [
      { from: "host", t: "Confirming load-in 2:00 PM, Grand Ballroom. Genset backup ready?", at: "Jul 8" },
      { from: "supplier", t: "Confirmed po, genset on standby. LED wall 6x3m as agreed.", at: "Jul 8" },
    ],
    "supplier:kia-cat": [
      { from: "host", t: "Pakiconfirm final pax — 300, plated dinner. Setup by 2:30 PM.", at: "Jul 9" },
      { from: "host", t: "Following up po, need written confirmation by today.", at: "Jul 10" },
    ],
  };

  window.HL = {
    HOST, GIGS, STAGES, STATUS, THREADS,
    peso, pesoK,
    supplierTotal, contractValue,
    activeGigs: GIGS.filter((g) => ["confirmed", "prep"].includes(g.stage)),
    financeGigs: GIGS.filter((g) => g.stage === "confirmed"),
    gigById: (id) => GIGS.find((g) => g.id === id),
  };
})();
