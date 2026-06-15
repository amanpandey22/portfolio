import { useState, useEffect, useRef, useCallback } from "react";

// ─── Design tokens ─────────────────────────────────────────────────────────────
const NAVY      = "#0a0f1e";
const TEAL      = "#00c9a7";
const TEAL_DIM  = "rgba(0,201,167,0.12)";
const TEAL_BDR  = "rgba(0,201,167,0.3)";
const AMBER     = "#f59e0b";
const AMBER_DIM = "rgba(245,158,11,0.12)";
const AMBER_BDR = "rgba(245,158,11,0.35)";
const LIGHT     = "#f8f9fa";
const WHITE     = "#ffffff";
const INK       = "#1a1a2e";
const MUTED     = "#6b7280";
const BORDER    = "#e2e8f0";
const PILL_BG   = "#f1f5f9";

// Hero (dark) text colors
const HERO_TEXT  = "#f1f5f9";
const HERO_MUTED = "#94a3b8";

// Fonts
const HEAD = "'DM Sans', system-ui, sans-serif";
const MONO = "'JetBrains Mono', ui-monospace, monospace";

// ─── Data ──────────────────────────────────────────────────────────────────────
const metrics = [
  { value: "1.7M+", label: "Daily transactions" },
  { value: "$3.5M+", label: "Monthly seller charges" },
  { value: "2.4M",  label: "Units transferred / month" },
  { value: "$200K", label: "Annual fraud savings" },
  { value: "41",    label: "Team members led" },
  { value: "4",     label: "Promotions in 5 years" },
];

const products = [
  {
    title: "Fulfillment Platform Unification",
    tag: "Operations",
    impact: "1.7M daily transactions across noon, noon Minutes, Supermall",
    bullets: [
      "Unified noon, Minutes, and Supermall onto a single fulfillment stack",
      "Eliminated the need for each business to build its own inventory layer",
      "System processes 3.2M units across three business lines",
    ],
    skills: ["Platform Architecture", "SQL", "API Integration"],
  },
  {
    title: "Seller Finance Infrastructure",
    tag: "Finance",
    impact: "$3.5M/month in automated seller charges",
    bullets: [
      "Built storage and outbound fee charging from scratch",
      "Reduced manual effort by 80%, recovered 20% in previously lost revenue",
      "Used volumetric data as billing foundation across 5–7M SKUs",
    ],
    skills: ["Billing Systems", "BigQuery", "Seller Marketplace"],
  },
  {
    title: "AI Image Validation on After-Sale Returns",
    tag: "AI",
    impact: "<3% false positive rate on high-value return fraud detection",
    bullets: [
      "Built configurable AI validation infrastructure comparing physical items against catalog",
      "Prompt-driven architecture — scalable to any new fulfillment validation use case",
      "Currently applied to 5% of high-value returns; roadmap to full coverage",
    ],
    skills: ["AI/ML", "Prompt Engineering", "Fraud Prevention"],
  },
  {
    title: "Fraud Prevention Serialization",
    tag: "Fraud Prevention",
    impact: "$200K/year in return fraud savings",
    bullets: [
      "Tamper-proof serialization flow capturing 1M+ units; 52K/month ongoing",
      "Reduced customer return fraud rate by 5%",
      "Eliminated barcode reprinting dependency, saving ~$55K/year separately",
    ],
    skills: ["Inventory Management", "Operations"],
  },
  {
    title: "B2B Externalization — Salla Integration",
    tag: "Growth",
    impact: "~$27K USD/month in new revenue from external sellers",
    bullets: [
      "Enabled FBN warehouses to serve external (non-noon) sellers for the first time",
      "Integrated with Salla, KSA's leading e-commerce platform",
      "Infrastructure built to scale to Amazon/Shopify-level integrations",
    ],
    skills: ["B2B", "API Integration", "Marketplace"],
  },
];

const experience = [
  {
    role: "Lead Product Manager",
    period: "Feb 2025 – Present",
    current: true,
    promoted: true,
    bullets: [
      "Lead a 41-person cross-functional team with 5 direct PM reports",
      "Own the AI roadmap across fulfillment — image validation, seller chatbot, CCTV investigation",
      "Drove B2B externalization, opening FBN warehouses to external sellers for the first time",
    ],
  },
  {
    role: "Senior Product Manager",
    period: "Oct 2023 – Feb 2025",
    promoted: true,
    bullets: [
      "Shipped tamper-proof serialization, saving $200K/year in return fraud",
      "Built the warehouse transfer system moving 2.4M units/month",
      "Unified noon, Minutes, and Supermall onto one fulfillment stack",
    ],
  },
  {
    role: "Product Manager 2",
    period: "Oct 2022 – Oct 2023",
    promoted: true,
    bullets: [
      "Built seller finance infrastructure charging $3.5M/month automatically",
      "Launched volumetric measurement across 5–7M SKUs at 98% coverage",
      "Led fulfillment integration for the Namshi acquisition",
    ],
  },
  {
    role: "Associate Product Manager",
    period: "Jun 2021 – Oct 2022",
    promoted: false,
    bullets: [
      "Shipped a seller inventory dashboard surfacing 7.9M+ units",
      "Automated the returns flow handling ~900K units/month",
      "Supported roadmapping, user research, and product discovery",
    ],
  },
];

const skillsData = {
  "Product craft": [
    "Strategy", "Roadmapping", "PRDs", "OKRs", "A/B Testing", "Platform Thinking",
  ],
  "Technical": [
    "SQL / BigQuery", "REST APIs", "Google Apps Script", "Figma", "Miro", "Looker",
  ],
  "AI & Automation": [
    "Claude", "Claude Code", "Gemini", "NotebookLM", "Prompt Engineering", "Bot Development",
  ],
  "Domain": [
    "E-Commerce Fulfillment", "Warehouse Ops", "Inventory Management",
    "Seller Marketplace", "Supply Chain", "Billing Systems",
  ],
};

const sideProjects = [
  {
    name: "TL;DR Studio",
    icon: "play",
    desc: "AI-generated video explainers of PM and tech articles. Built with Claude + NotebookLM.",
    href: "https://www.youtube.com/@TLDRStudio",
    linkLabel: "youtube.com/@TLDRStudio",
    tags: ["Content", "AI"],
  },
  {
    name: "Playground PM",
    icon: "rocket",
    desc: "Internal PM community at noon.com driving AI adoption. Built an automated SOP generator and AskFBN bot using Claude Code and Gemini.",
    href: null,
    linkLabel: null,
    tags: ["AI Tools", "Community"],
  },
  {
    name: "Hamro Katha",
    icon: "book",
    desc: "Subscription platform for bilingual Nepali illustrated stories for expat families. Built for my nephew — an Australian-born Nepali. Vibe-coded solo.",
    href: "https://hamrokatha.com",
    linkLabel: "hamrokatha.com",
    tags: ["Founder", "EdTech"],
  },
];

const contactLinks = [
  {
    label: "Email", value: "ap5275@nyu.edu", href: "mailto:ap5275@nyu.edu",
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  },
  {
    label: "LinkedIn", value: "linkedin.com/in/amanpandey3322", href: "https://linkedin.com/in/amanpandey3322/",
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
  },
  {
    label: "GitHub", value: "github.com/amanpandey22", href: "https://github.com/amanpandey22",
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>,
  },
];

// ─── Side-project icons ──────────────────────────────────────────────────────────
function ProjectIcon({ name }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: TEAL, strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
  if (name === "play")   return <svg {...common}><polygon points="5 3 19 12 5 21 5 3"/></svg>;
  if (name === "rocket") return <svg {...common}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>;
  return <svg {...common}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>;
}

// ─── Hooks ─────────────────────────────────────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ─── Animated Counter (count-up on scroll into view) ─────────────────────────────
function AnimatedCounter({ value }) {
  const [display, setDisplay] = useState("0");
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStarted(true); },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const num = parseFloat(value.replace(/[^0-9.]/g, ""));
    if (isNaN(num)) { setDisplay(value); return; }
    let frame = 0;
    const FRAMES = 45;
    const timer = setInterval(() => {
      frame++;
      const eased = 1 - Math.pow(1 - frame / FRAMES, 3);
      const cur = num * eased;
      if (frame >= FRAMES) { clearInterval(timer); setDisplay(value); return; }
      const pre = value.startsWith("$") ? "$" : "";
      const suf = value.includes("+") ? "+" : "";
      const body = value.includes("M")
        ? cur.toFixed(1) + "M"
        : value.includes("K")
        ? Math.round(cur) + "K"
        : String(Math.round(cur));
      setDisplay(pre + body + suf);
    }, 22);
    return () => clearInterval(timer);
  }, [started, value]);

  return <span ref={ref}>{display}</span>;
}

// ─── Hero flow diagram (Inbound → Warehouse → Outbound, with scan-line) ──────────
function FlowDiagram() {
  const stages = [
    { y: 36,  label: "INBOUND",   sub: "receive · scan" },
    { y: 176, label: "WAREHOUSE", sub: "store · pick" },
    { y: 316, label: "OUTBOUND",  sub: "pack · ship" },
  ];
  return (
    <div style={{ width: "100%", maxWidth: 380, margin: "0 auto" }}>
      <svg viewBox="0 0 320 420" width="100%" style={{ display: "block" }} role="img" aria-label="Simplified FBN fulfillment stack">
        {/* connectors */}
        <line className="flow-line" x1="160" y1="116" x2="160" y2="176" stroke={TEAL} strokeWidth="2" />
        <line className="flow-line" x1="160" y1="256" x2="160" y2="316" stroke={TEAL} strokeWidth="2" />

        {/* stage boxes */}
        {stages.map((s) => (
          <g key={s.label}>
            <rect x="60" y={s.y} width="200" height="80" rx="10"
              fill="rgba(0,201,167,0.04)" stroke={TEAL} strokeWidth="1.4" strokeOpacity="0.7" />
            <text x="160" y={s.y + 38} textAnchor="middle" fill={TEAL}
              fontFamily="'JetBrains Mono', monospace" fontSize="15" fontWeight="500" letterSpacing="1.5">{s.label}</text>
            <text x="160" y={s.y + 58} textAnchor="middle" fill="#5f6b7a"
              fontFamily="'JetBrains Mono', monospace" fontSize="9.5" letterSpacing="1">{s.sub}</text>
          </g>
        ))}

        {/* corner ticks for a technical "node" feel */}
        {stages.map((s) => (
          <g key={s.label + "-c"} stroke={TEAL} strokeWidth="1.4" strokeOpacity="0.55">
            <path d={`M68 ${s.y + 8} L68 ${s.y} L76 ${s.y}`} fill="none" />
            <path d={`M252 ${s.y + 80} L260 ${s.y + 80} L260 ${s.y + 72}`} fill="none" />
          </g>
        ))}

        {/* scan-line sweep */}
        <g className="scan-line">
          <line x1="40" y1="0" x2="280" y2="0" stroke={TEAL} strokeWidth="1.5" strokeOpacity="0.9" />
          <rect x="40" y="0" width="240" height="22" fill="url(#scanGrad)" transform="translate(0,-22)" />
        </g>

        <defs>
          <linearGradient id="scanGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={TEAL} stopOpacity="0" />
            <stop offset="100%" stopColor={TEAL} stopOpacity="0.18" />
          </linearGradient>
        </defs>
      </svg>
      <p style={{ textAlign: "center", fontSize: 11, color: HERO_MUTED, fontFamily: MONO, marginTop: 14, letterSpacing: 0.5 }}>
        Simplified FBN fulfillment stack
      </p>
    </div>
  );
}

// ─── Nav ───────────────────────────────────────────────────────────────────────
function Nav({ active, scrollTo }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { id: "about", label: "About" },
    { id: "products", label: "Products" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  const handleNav = (id) => { scrollTo(id); setMobileOpen(false); };
  const onDark = !scrolled; // transparent over dark hero, white once scrolled
  const linkColor = onDark ? HERO_MUTED : MUTED;
  const logoText = onDark ? HERO_TEXT : INK;

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        height: 60, padding: "0 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(255,255,255,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${BORDER}` : "1px solid transparent",
        transition: "background 0.3s, border-color 0.3s, backdrop-filter 0.3s",
      }}>
        {/* Logo */}
        <div onClick={() => scrollTo("hero")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 7, background: TEAL, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: NAVY, fontFamily: HEAD }}>AP</div>
          <span style={{ fontSize: 14, fontWeight: 700, color: logoText, fontFamily: HEAD, transition: "color 0.3s" }}>Aman Pandey</span>
        </div>

        {/* Desktop links */}
        <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {navItems.map(n => (
            <button key={n.id} onClick={() => scrollTo(n.id)} style={{
              fontSize: 13, background: "none", border: "none", cursor: "pointer", fontWeight: 500, padding: 0,
              color: active === n.id ? TEAL : linkColor,
              borderBottom: active === n.id ? `1px solid ${TEAL}` : "1px solid transparent",
              paddingBottom: 2, transition: "color 0.2s",
            }}>{n.label}</button>
          ))}
          <a href="/cv.pdf" download style={{
            padding: "8px 20px", background: TEAL, color: NAVY, border: "none", borderRadius: 6,
            fontSize: 13, fontWeight: 700, cursor: "pointer", textDecoration: "none", fontFamily: HEAD,
          }}>Download CV</a>
        </div>

        {/* Hamburger */}
        <button className="hamburger" onClick={() => setMobileOpen(o => !o)} style={{
          background: "none", border: "none", cursor: "pointer", color: logoText,
          display: "none", padding: 4, alignItems: "center", justifyContent: "center",
        }}>
          {mobileOpen
            ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="8" x2="21" y2="8"/><line x1="3" y1="16" x2="21" y2="16"/></svg>
          }
        </button>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 199, background: NAVY,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 34,
        }}>
          {navItems.map(n => (
            <button key={n.id} onClick={() => handleNav(n.id)} style={{
              fontSize: 30, fontWeight: 700, color: HERO_TEXT, background: "none", border: "none",
              cursor: "pointer", fontFamily: HEAD,
            }}>{n.label}</button>
          ))}
          <a href="/cv.pdf" download onClick={() => setMobileOpen(false)} style={{
            marginTop: 12, padding: "16px 48px", background: TEAL, color: NAVY,
            border: "none", borderRadius: 10, fontSize: 18, fontWeight: 700, cursor: "pointer",
            textDecoration: "none", fontFamily: HEAD,
          }}>Download CV</a>
        </div>
      )}
    </>
  );
}

// ─── Shared bits ─────────────────────────────────────────────────────────────────
function Label({ children, color = TEAL }) {
  return (
    <p style={{ fontSize: 11, letterSpacing: 2.5, fontWeight: 500, color, marginBottom: 14, textTransform: "uppercase", fontFamily: MONO }}>
      {children}
    </p>
  );
}

function Heading({ children, style = {} }) {
  return (
    <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 700, color: INK, lineHeight: 1.12, letterSpacing: -0.8, fontFamily: HEAD, ...style }}>
      {children}
    </h2>
  );
}

function Bullet({ children, color = TEAL }) {
  return (
    <div style={{ display: "flex", gap: 11, fontSize: 14, color: "#475569", lineHeight: 1.6 }}>
      <span style={{ color, flexShrink: 0, fontSize: 7, marginTop: 7 }}>●</span>
      <span>{children}</span>
    </div>
  );
}

function ExternalIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  );
}

// Barcode-style separator
function Barcode({ color = TEAL, opacity = 0.5 }) {
  const widths = [2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 4, 1, 2, 3, 1, 2, 1, 3, 2, 4, 1, 2, 1, 3, 1, 2];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2, height: 16, opacity }} aria-hidden="true">
      {widths.map((w, i) => (
        <span key={i} style={{ width: w, height: "100%", background: i % 2 === 0 ? color : "transparent", display: "block" }} />
      ))}
    </div>
  );
}

// ─── Portfolio ─────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [active, setActive] = useState("hero");
  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const ids = ["hero", "about", "products", "experience", "skills", "contact"];
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.3 }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const [aboutRef, aboutVis]   = useReveal();
  const [prodRef, prodVis]     = useReveal();
  const [expRef, expVis]       = useReveal();
  const [skillsRef, skillsVis] = useReveal();
  const [projRef, projVis]     = useReveal();

  return (
    <div style={{ background: LIGHT, color: INK, minHeight: "100vh", fontFamily: "'Inter',system-ui,-apple-system,sans-serif", overflowX: "hidden" }}>
      <Nav active={active} scrollTo={scrollTo} />

      {/* ── 1. HERO (dark) ───────────────────────────────────────────────────── */}
      <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", background: NAVY, overflow: "hidden" }}>
        {/* ambient glows */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 75% 30%, rgba(0,201,167,0.12) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(0,201,167,0.06) 1px, transparent 1px)", backgroundSize: "52px 52px", maskImage: "radial-gradient(ellipse 60% 70% at 50% 50%, black 0%, transparent 80%)", WebkitMaskImage: "radial-gradient(ellipse 60% 70% at 50% 50%, black 0%, transparent 80%)", pointerEvents: "none" }} />

        <div className="section-max" style={{ position: "relative", zIndex: 1, paddingTop: 110, paddingBottom: 80 }}>
          <div className="hero-grid">
            {/* Left */}
            <div>
              <p style={{ fontSize: 13, color: TEAL, fontFamily: MONO, letterSpacing: 1, marginBottom: 24 }}>
                Lead Product Manager
              </p>
              <h1 style={{ fontSize: "clamp(2.4rem,5.5vw,3.6rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: -1.5, color: HERO_TEXT, fontFamily: HEAD, marginBottom: 24 }}>
                I build the systems<br />that move millions<br />of <span style={{ color: TEAL }}>packages.</span>
              </h1>
              <p style={{ fontSize: "1.1rem", color: HERO_MUTED, lineHeight: 1.6, marginBottom: 36, maxWidth: 480 }}>
                5 years at noon.com. Middle East's largest e-commerce platform.
              </p>

              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 30 }}>
                <button onClick={() => scrollTo("products")} style={{
                  padding: "14px 30px", background: TEAL, color: NAVY, border: "none", borderRadius: 8,
                  fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: HEAD,
                  boxShadow: "0 0 40px rgba(0,201,167,0.25)",
                }}>See My Work</button>
                <a href="/cv.pdf" download style={{
                  padding: "14px 30px", background: "transparent", color: HERO_TEXT,
                  border: `1px solid rgba(255,255,255,0.2)`, borderRadius: 8,
                  fontWeight: 600, fontSize: 15, textDecoration: "none",
                  display: "inline-flex", alignItems: "center", gap: 8, fontFamily: HEAD,
                }}>
                  Download CV
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                </a>
              </div>

              {/* terminal status line */}
              <p className="hide-mobile" style={{ fontSize: 12.5, color: TEAL, fontFamily: MONO, letterSpacing: 0.3, opacity: 0.85 }}>
                {"> "}1.7M transactions/day · 41-person team · 47% AI roadmap
              </p>
            </div>

            {/* Right — flow diagram */}
            <div>
              <FlowDiagram />
            </div>
          </div>
        </div>

        {/* scroll hint */}
        <div style={{ position: "absolute", bottom: 30, left: "50%", animation: "bounce-arrow 1.8s ease-in-out infinite", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 10, color: HERO_MUTED, letterSpacing: 3, textTransform: "uppercase", fontFamily: MONO }}>Scroll</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={HERO_MUTED} strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
      </section>

      {/* ── 2. METRICS (white, dashboard) ────────────────────────────────────── */}
      <section style={{ background: LIGHT, position: "relative" }}>
        <div className="section-max" style={{ padding: "64px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Barcode />
              <span style={{ fontSize: 12, color: MUTED, fontFamily: MONO, letterSpacing: 1 }}>41 people · 1.7M transactions · one stack</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="pulse-dot" style={{ display: "block", width: 7, height: 7, borderRadius: "50%", background: "#16a34a", animation: "pulse-dot 1.8s ease-in-out infinite" }} />
              <span style={{ fontSize: 11, color: "#16a34a", fontWeight: 700, letterSpacing: 2, fontFamily: MONO }}>LIVE OPS</span>
            </div>
          </div>
          <div className="metrics-grid">
            {metrics.map((m, i) => (
              <div key={i} className="metric-card">
                <div style={{ fontSize: "2.2rem", fontWeight: 500, color: INK, lineHeight: 1, fontFamily: MONO, letterSpacing: -1, fontVariantNumeric: "tabular-nums" }}>
                  <AnimatedCounter value={m.value} />
                </div>
                <div style={{ fontSize: 12, color: MUTED, marginTop: 12, lineHeight: 1.4 }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. ABOUT (white) ─────────────────────────────────────────────────── */}
      <section
        id="about"
        ref={aboutRef}
        className={`reveal ${aboutVis ? "reveal-visible" : "reveal-hidden"}`}
        style={{ background: WHITE, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}
      >
        <div className="section-max" style={{ padding: "96px 24px" }}>
          <Label>About</Label>
          <div className="about-grid">
            <div>
              <p style={{ fontSize: 16, color: "#334155", lineHeight: 1.8, marginBottom: 20 }}>
                I'm a Lead Product Manager at <strong style={{ color: INK }}>noon.com</strong>, the Middle East's largest e-commerce platform, where I own the fulfillment infrastructure that processes <strong style={{ color: INK }}>1.7M+ daily transactions</strong> across UAE, KSA, and Egypt — and the AI layer increasingly running on top of it.
              </p>
              <p style={{ fontSize: 16, color: "#334155", lineHeight: 1.8, marginBottom: 20 }}>
                My craft is product at the platform level: roadmapping, PRDs, and cross-functional leadership across engineering, ops, and finance. I build systems meant to last — billing engines, serialization flows, and unified stacks that three businesses share instead of rebuilding.
              </p>
              <p style={{ fontSize: 16, color: "#334155", lineHeight: 1.8 }}>
                I'm Nepali, an NYU Abu Dhabi grad, and based in Dubai. On the side I'm building <strong style={{ color: INK }}>Hamro Katha</strong> — bilingual illustrated stories for my Australian-born Nepali nephew and families like ours.
              </p>
            </div>

            {/* Currently card */}
            <div style={{ background: LIGHT, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 26 }}>
              <Label>Currently</Label>
              {[
                { k: "Role", v: "Lead PM, noon.com — Fulfilled by Noon (FBN)" },
                { k: "Location", v: "Dubai, UAE" },
                { k: "Building", v: "Hamro Katha (hamrokatha.com)" },
              ].map((row, i, arr) => (
                <div key={row.k} style={{ display: "flex", gap: 12, padding: "16px 0", borderBottom: i < arr.length - 1 ? `1px solid ${BORDER}` : "none", alignItems: "flex-start" }}>
                  <span style={{ color: TEAL, fontSize: 8, marginTop: 6, flexShrink: 0 }}>●</span>
                  <div>
                    <div style={{ fontSize: 11, color: MUTED, textTransform: "uppercase", letterSpacing: 1, fontFamily: MONO, marginBottom: 4 }}>{row.k}</div>
                    <div style={{ fontSize: 14, color: INK, fontWeight: 500, lineHeight: 1.5 }}>{row.v}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. FEATURED PRODUCTS (white) ─────────────────────────────────────── */}
      <section
        id="products"
        ref={prodRef}
        className={`reveal ${prodVis ? "reveal-visible" : "reveal-hidden"}`}
        style={{ background: LIGHT }}
      >
        <div className="section-max" style={{ padding: "96px 24px" }}>
          <Label>Featured Work</Label>
          <Heading>Products I've shipped</Heading>
          <p style={{ fontSize: 15, color: MUTED, marginTop: 12, marginBottom: 44 }}>Real systems, real numbers.</p>
          <div className="products-grid">
            {products.map((p, i) => (
              <div key={i} className="product-card">
                <span style={{
                  display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: 1,
                  padding: "4px 11px", borderRadius: 5, marginBottom: 16,
                  background: TEAL_DIM, color: "#0a8f78", fontFamily: MONO, textTransform: "uppercase",
                }}>{p.tag}</span>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: INK, lineHeight: 1.35, marginBottom: 8, fontFamily: HEAD }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: "#0a8f78", fontWeight: 600, lineHeight: 1.5, marginBottom: 18 }}>{p.impact}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 20 }}>
                  {p.bullets.map((b, j) => <Bullet key={j}>{b}</Bullet>)}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {p.skills.map(s => (
                    <span key={s} style={{
                      fontSize: 11.5, padding: "5px 10px", borderRadius: 6,
                      background: PILL_BG, color: "#475569", fontWeight: 500,
                    }}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. EXPERIENCE TIMELINE (white) ───────────────────────────────────── */}
      <section
        id="experience"
        ref={expRef}
        className={`reveal ${expVis ? "reveal-visible" : "reveal-hidden"}`}
        style={{ background: WHITE, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}
      >
        <div className="section-max" style={{ padding: "96px 24px" }}>
          <Label>Experience</Label>
          <Heading>Career at noon.com</Heading>
          <p style={{ fontSize: 15, color: MUTED, marginTop: 12, marginBottom: 56 }}>APM → Lead PM in under 4 years.</p>

          <div className="timeline">
            {experience.map((exp, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-dot" style={{ background: exp.current ? TEAL : WHITE, boxShadow: `0 0 0 1px ${TEAL}` }} />
                <div className="timeline-date">{exp.period}</div>
                <div className="timeline-card" style={{ borderColor: exp.current ? TEAL_BDR : BORDER }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
                    <h3 style={{ fontSize: 19, fontWeight: 700, color: INK, fontFamily: HEAD }}>{exp.role}</h3>
                    {exp.promoted && (
                      <span style={{ fontSize: 11, fontWeight: 700, color: TEAL, background: TEAL_DIM, padding: "3px 10px", borderRadius: 100, fontFamily: MONO }}>↑ Promoted</span>
                    )}
                    {exp.current && (
                      <span style={{ fontSize: 11, fontWeight: 700, color: AMBER, background: AMBER_DIM, border: `1px solid ${AMBER_BDR}`, padding: "3px 10px", borderRadius: 100, fontFamily: MONO }}>Current</span>
                    )}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                    {exp.bullets.map((b, j) => <Bullet key={j}>{b}</Bullet>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. SKILLS (white) ────────────────────────────────────────────────── */}
      <section
        id="skills"
        ref={skillsRef}
        className={`reveal ${skillsVis ? "reveal-visible" : "reveal-hidden"}`}
        style={{ background: LIGHT }}
      >
        <div className="section-max" style={{ padding: "96px 24px" }}>
          <Label>Skills & Tools</Label>
          <Heading style={{ marginBottom: 44 }}>What I work with</Heading>
          <div className="skills-grid">
            {Object.entries(skillsData).map(([cat, items]) => {
              const isAI = cat === "AI & Automation";
              return (
                <div key={cat} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 26 }}>
                  <p style={{ fontSize: 11, letterSpacing: 1.5, fontWeight: 700, color: MUTED, marginBottom: 16, textTransform: "uppercase" }}>{cat}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {items.map(s => (
                      <span key={s} style={{
                        fontSize: 13, padding: "6px 12px", borderRadius: 6, fontWeight: 500,
                        background: isAI ? TEAL_DIM : PILL_BG,
                        color: isAI ? "#0a8f78" : INK,
                      }}>{s}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 7. SIDE PROJECTS (white) ─────────────────────────────────────────── */}
      <section
        ref={projRef}
        className={`reveal ${projVis ? "reveal-visible" : "reveal-hidden"}`}
        style={{ background: WHITE, borderTop: `1px solid ${BORDER}` }}
      >
        <div className="section-max" style={{ padding: "96px 24px" }}>
          <Label>Side Projects</Label>
          <Heading style={{ marginBottom: 44 }}>Beyond the day job</Heading>
          <div className="projects-grid">
            {sideProjects.map((p) => (
              <div key={p.name} className="project-card">
                <div style={{ width: 40, height: 40, borderRadius: 9, background: TEAL_DIM, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                  <ProjectIcon name={p.icon} />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: INK, marginBottom: 10, fontFamily: HEAD }}>{p.name}</h3>
                <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.7, marginBottom: 18 }}>{p.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: p.href ? 18 : 0 }}>
                  {p.tags.map(t => (
                    <span key={t} style={{ fontSize: 11.5, padding: "5px 10px", borderRadius: 6, background: PILL_BG, color: "#475569", fontWeight: 500 }}>{t}</span>
                  ))}
                </div>
                {p.href && (
                  <a href={p.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: TEAL, fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
                    {p.linkLabel} <ExternalIcon />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. CONTACT (dark) ────────────────────────────────────────────────── */}
      <section id="contact" style={{ background: NAVY, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 60% at 50% 100%, rgba(0,201,167,0.12) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div className="section-max" style={{ padding: "104px 24px", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
            <Barcode opacity={0.4} />
          </div>
          <h2 style={{ fontSize: "clamp(32px,5vw,48px)", fontWeight: 700, color: HERO_TEXT, fontFamily: HEAD, letterSpacing: -1, marginBottom: 16 }}>
            Let's work together
          </h2>
          <p style={{ fontSize: 16, color: HERO_MUTED, lineHeight: 1.7, maxWidth: 440, margin: "0 auto 40px" }}>
            Open to new opportunities and collaborations.
          </p>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 14 }}>
            {contactLinks.map(c => (
              <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" className="contact-link">
                <span style={{ display: "flex", color: TEAL }}>{c.icon}</span>
                {c.label}
              </a>
            ))}
          </div>
        </div>

        {/* footer */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "22px 24px", textAlign: "center", position: "relative", zIndex: 1 }}>
          <p style={{ fontSize: 12, color: HERO_MUTED, fontFamily: MONO, letterSpacing: 0.3 }}>
            Aman Pandey · 2026 · Built with caffeine and Claude
          </p>
        </div>
      </section>
    </div>
  );
}
