import React from "react";

/**
 * Host Leigh — BorderGlow
 * A directional gold edge-glow that tracks the pointer. Wrap any
 * clickable box that opens or expands. Relies on the global
 * `border-glow-card` CSS (shipped in styles.css), brand-tuned to gold;
 * override the look per-instance via props.
 *
 * Adapted from React Bits "BorderGlow" (JS + CSS variant).
 */
export function BorderGlow({
  children,
  className = "",
  edgeSensitivity = 30,
  glowColor,            // "H S L" e.g. "46 65 62"; omit to keep brand gold
  backgroundColor,      // omit to inherit --surface-card
  borderRadius,         // px; omit to inherit --r-lg
  glowRadius = 40,
  glowIntensity = 1.0,
  coneSpread = 28,
  fillOpacity = 0.5,
  animated = false,
  colors,               // [c1,c2,c3] hex mesh-gradient override
  style,
  ...rest
}) {
  const ref = React.useRef(null);

  const handleMove = React.useCallback((e) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = x - cx;
    const dy = y - cy;
    let kx = Infinity, ky = Infinity;
    if (dx !== 0) kx = cx / Math.abs(dx);
    if (dy !== 0) ky = cy / Math.abs(dy);
    const edge = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
    let deg = 0;
    if (!(dx === 0 && dy === 0)) {
      deg = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      if (deg < 0) deg += 360;
    }
    card.style.setProperty("--edge-proximity", (edge * 100).toFixed(3));
    card.style.setProperty("--cursor-angle", deg.toFixed(3) + "deg");
  }, []);

  React.useEffect(() => {
    if (!animated || !ref.current) return;
    const card = ref.current;
    const a0 = 110, a1 = 465;
    const easeOut = (x) => 1 - Math.pow(1 - x, 3);
    const easeIn = (x) => x * x * x;
    const run = (o) => {
      const s = o.start || 0, e = o.end == null ? 100 : o.end;
      const d = o.duration || 1000, ease = o.ease || easeOut;
      setTimeout(() => {
        const t0 = performance.now();
        const tick = () => {
          const t = Math.min((performance.now() - t0) / d, 1);
          o.onUpdate(s + (e - s) * ease(t));
          if (t < 1) requestAnimationFrame(tick);
          else if (o.onEnd) o.onEnd();
        };
        tick();
      }, o.delay || 0);
    };
    const ang = (v) => card.style.setProperty("--cursor-angle", ((a1 - a0) * (v / 100) + a0) + "deg");
    card.classList.add("sweep-active");
    card.style.setProperty("--cursor-angle", a0 + "deg");
    run({ duration: 500, onUpdate: (v) => card.style.setProperty("--edge-proximity", v) });
    run({ ease: easeIn, duration: 1500, end: 50, onUpdate: ang });
    run({ ease: easeOut, delay: 1500, duration: 2250, start: 50, end: 100, onUpdate: ang });
    run({ ease: easeIn, delay: 2500, duration: 1500, start: 100, end: 0,
      onUpdate: (v) => card.style.setProperty("--edge-proximity", v),
      onEnd: () => card.classList.remove("sweep-active") });
  }, [animated]);

  // build per-instance overrides only for props that were supplied
  const vars = {
    "--edge-sensitivity": edgeSensitivity,
    "--glow-padding": `${glowRadius}px`,
    "--cone-spread": coneSpread,
    "--fill-opacity": fillOpacity,
  };
  if (backgroundColor) vars["--card-bg"] = backgroundColor;
  if (borderRadius != null) vars["--border-radius"] = `${borderRadius}px`;
  if (glowColor) {
    const m = glowColor.match(/([\d.]+)\s+([\d.]+)%?\s+([\d.]+)%?/);
    if (m) {
      const base = `${m[1]}deg ${m[2]}% ${m[3]}%`;
      const ops = [100, 60, 50, 40, 30, 20, 10];
      const keys = ["", "-60", "-50", "-40", "-30", "-20", "-10"];
      ops.forEach((o, i) => {
        vars[`--glow-color${keys[i]}`] = `hsl(${base} / ${Math.min(o * glowIntensity, 100)}%)`;
      });
    }
  }
  if (colors && colors.length) {
    const POS = ["80% 55%", "69% 34%", "8% 6%", "41% 38%", "86% 85%", "82% 18%", "51% 4%"];
    const KEYS = ["one", "two", "three", "four", "five", "six", "seven"];
    const MAP = [0, 1, 2, 0, 1, 2, 1];
    KEYS.forEach((k, i) => {
      const c = colors[Math.min(MAP[i], colors.length - 1)];
      vars[`--gradient-${k}`] = `radial-gradient(at ${POS[i]}, ${c} 0px, transparent 50%)`;
    });
    vars["--gradient-base"] = `linear-gradient(${colors[0]} 0 100%)`;
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      className={`border-glow-card ${className}`.trim()}
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--border-hair)",
        boxShadow: "var(--shadow-card)",
        ...vars,
        ...style,
      }}
      {...rest}
    >
      <span className="edge-light" />
      <div className="border-glow-inner">{children}</div>
    </div>
  );
}
