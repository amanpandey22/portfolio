import { useState, useEffect, useRef, useCallback } from "react";

// ─── Design tokens ─────────────────────────────────────────────────────────────
const ACCENT      = "#00d4aa";
const ACCENT_DIM  = "rgba(0,212,170,0.08)";
const ACCENT_BDR  = "rgba(0,212,170,0.2)";
const BG          = "#0a0f1e";
const BG_CARD     = "#0d1526";
const BG_RAISED   = "#111c32";
const TEXT        = "#e2e8f0";
const MUTED       = "#94a3b8";
const BORDER      = "rgba(255,255,255,0.07)";
const ACCENT2     = "#818cf8";
const ACCENT2_DIM = "rgba(129,140,248,0.07)";
const ACCENT2_BDR = "rgba(129,140,248,0.18)";

// ─── Data ──────────────────────────────────────────────────────────────────────
const metrics = [
  { value: "1.7M+",  label: "Daily inventory transactions" },
  { value: "$3.5M+", label: "Monthly seller charges" },
  { value: "2.4M",   label: "Units transferred / month" },
  { value: "$200K",  label: "Annual fraud savings" },
  { value: "41",     label: "Team members led" },
  { value: "5+",     label: "Years · 4 promotions" },
];

const experience = [
  {
    role: "Lead Product Manager",
    period: "Feb 2025 – Present",
    tag: "LEAD",
    current: true,
    highlights: [
      "Leading 41-member cross-functional team with 5 direct PM reports",
      "B2B Externalization via Salla → ~$27K/month new revenue; built to Amazon/Shopify scale",
      "AI Image Validation on After Sale Returns — <3% false positive rate on high-value items",
      "AI Seller Chatbot — first full-action AI assistant in seller portal; est. NPS +3–5 points",
      "VMS Automation & Outlier Detection — 30% fewer daily scans; projected 50% manpower savings",
      "Batch Tracking for OTC Drugs — 450K units tracked, unlocking new product category for noon",
      "AI-Powered CCTV Investigation — Hikvision API + AI; investigation time 2 days → 2 hours",
      "Cross-border Chinese ERP integration in progress",
    ],
  },
  {
    role: "Senior Product Manager (PM3)",
    period: "Oct 2023 – Feb 2025",
    tag: "SENIOR",
    highlights: [
      "Warehouse transfer system → 2.4M units/month, 10% manpower cost reduction",
      "Stock reconciliation automation → NPS +2 points, payout TAT from years to monthly",
      "Tamper-proof serialization → 1M+ units, 52K/month, $200K/year fraud savings",
      "Fulfillment platform unification → 1.7M daily transactions, 3.2M units across noon, Minutes, Supermall",
    ],
  },
  {
    role: "Product Manager 2",
    period: "Oct 2022 – Oct 2023",
    tag: "PM2",
    highlights: [
      "Volumetric measurement system → 98% coverage across 5–7M SKUs",
      "Seller finance infrastructure → $3.5M USD/month, 80% less manual effort, 20% recovered revenue",
      "Namshi acquisition fulfillment integration",
      "Inbound app rollout → 30% efficiency gain, 20% cost per unit reduction",
    ],
  },
  {
    role: "Associate Product Manager",
    period: "Jun 2021 – Oct 2022",
    tag: "APM",
    highlights: [
      "Seller inventory dashboard → 7.9M+ units visible, 50% fewer support tickets",
      "Automated returns flow → ~900K units/month, 70% support load reduction",
      "Supported roadmapping, user interviews, and product discovery",
    ],
  },
];

const products = [
  {
    title: "Fulfillment Platform Unification",
    tag: "PLATFORM",
    tagColor: "#4f8ef7",
    desc: "Single inventory system shared by noon, noon Minutes, and Supermall — one platform serving three distinct business lines.",
    metric: "1.7M", metricLabel: "daily transactions",
    bullets: [
      "Eliminated per-business-line infrastructure duplication",
      "Enabled hyperlocal launches for Supermall and Minutes",
      "Running live across UAE, KSA, and Egypt",
    ],
    skills: ["Platform Thinking", "SQL/BigQuery", "Multi-market", "Stakeholder Mgmt"],
  },
  {
    title: "B2B Externalization · Salla",
    tag: "GROWTH",
    tagColor: "#10b981",
    desc: "Opened FBN warehouses to external marketplace sellers. Infrastructure designed to scale to Amazon and Shopify-level integrations.",
    metric: "~$27K", metricLabel: "/ month new revenue",
    bullets: [
      "Built API-based seller onboarding from scratch",
      "Designed for future Amazon, Shopify expansion",
      "New external revenue stream for noon FBN",
    ],
    skills: ["B2B", "API Integration", "Growth", "Revenue"],
  },
  {
    title: "Seller Finance Infrastructure",
    tag: "FINANCE",
    tagColor: "#f59e0b",
    desc: "End-to-end storage and outbound fee charging system with volumetric-based billing at $3.5M/month scale.",
    metric: "$3.5M", metricLabel: "/ month processed",
    bullets: [
      "80% reduction in manual billing effort",
      "20% previously lost revenue recovered",
      "Automated volumetric-based charge calculation",
    ],
    skills: ["Finance Systems", "SQL/BigQuery", "API", "Billing"],
  },
  {
    title: "Tamper-Proof Serialization",
    tag: "FRAUD PREVENTION",
    tagColor: "#ef4444",
    desc: "End-to-end electronics serialization capturing serial numbers at inbound and validating at every return scan.",
    metric: "$200K", metricLabel: "/ year fraud savings",
    bullets: [
      "1M+ units protected, 52K serialized per month",
      "Tamper-evident bags with photo verification",
      "Integrated into full returns investigation flow",
    ],
    skills: ["Fraud Prevention", "Serialization", "Operations", "Figma"],
  },
  {
    title: "AI-Powered CCTV Investigation",
    tag: "AI",
    tagColor: ACCENT,
    desc: "Hikvision API + AI image matching to auto-pull QC footage and compare against product catalog for return root cause analysis.",
    metric: "48×", metricLabel: "faster investigation",
    bullets: [
      "Investigation time: 2 days → 2 hours",
      "AI matching against product catalog images",
      "Automated return reason tagging at scale",
    ],
    skills: ["AI", "Computer Vision", "API Integration", "Operations"],
  },
];

const skillsData = {
  Product: [
    "Strategy & Roadmapping", "PRDs & Specs", "User Research",
    "Stakeholder Mgmt", "OKRs & KPIs", "A/B Testing", "Platform Thinking",
  ],
  Technical: [
    "SQL / BigQuery", "Google Apps Script", "REST APIs",
    "Figma", "Miro", "Jira", "Confluence", "Looker",
  ],
  "AI & Automation": [
    "Claude", "Claude Code", "Gemini", "NotebookLM",
    "Prompt Engineering", "AI Workflow Automation", "Internal Bot Development",
  ],
  Domain: [
    "E-Commerce Fulfillment", "Warehouse Ops", "Inventory Mgmt",
    "Seller Marketplace", "Supply Chain", "Finance / Billing Systems",
  ],
};

const contactLinks = [
  { label: "Email", value: "ap5275@nyu.edu", href: "mailto:ap5275@nyu.edu",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg> },
  { label: "LinkedIn", value: "amanpandey3322", href: "https://linkedin.com/in/amanpandey3322/",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
  { label: "GitHub", value: "amanpandey22", href: "https://github.com/amanpandey22",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg> },
  { label: "YouTube", value: "TL;DR Studio", href: "https://www.youtube.com/@TLDRStudio",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg> },
  { label: "Hamro Katha", value: "hamrokatha.com", href: "https://hamrokatha.com",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg> },
];

// ─── Hooks ─────────────────────────────────────────────────────────────────────
function useReveal(threshold = 0.1) {
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

// ─── Animated Counter ──────────────────────────────────────────────────────────
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
        : value.includes("×") || value.includes("x")
        ? Math.round(cur) + "×"
        : String(Math.round(cur));
      setDisplay(pre + body + suf);
    }, 22);
    return () => clearInterval(timer);
  }, [started, value]);

  return <span ref={ref}>{display}</span>;
}

// ─── Hero background ───────────────────────────────────────────────────────────
function HeroBackground() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}>
      {/* Radial teal glow at top */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 90% 55% at 50% -5%, rgba(0,212,170,0.09) 0%, transparent 65%)",
      }} />
      {/* Soft indigo glow right */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 55% 50% at 90% 50%, rgba(129,140,248,0.07) 0%, transparent 60%)",
      }} />
      {/* Subtle dot grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `radial-gradient(circle, rgba(0,212,170,0.12) 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
        maskImage: "radial-gradient(ellipse 80% 70% at 50% 0%, black 0%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 0%, black 0%, transparent 100%)",
      }} />
      {/* Bottom fade into BG */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "50%",
        background: `linear-gradient(to bottom, transparent, ${BG})`,
      }} />
    </div>
  );
}

// ─── Nav ───────────────────────────────────────────────────────────────────────
function Nav({ active, scrollTo }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "work", label: "Work" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  const handleNav = (id) => { scrollTo(id); setMobileOpen(false); };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        height: 60, padding: "0 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(10,15,30,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${BORDER}` : "1px solid transparent",
        transition: "background 0.3s, border-color 0.3s, backdrop-filter 0.3s",
      }}>
        {/* Logo */}
        <div onClick={() => scrollTo("hero")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 7, background: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: BG, letterSpacing: 0 }}>AP</div>
          <span style={{ fontSize: 14, fontWeight: 600, color: TEXT }}>Aman Pandey</span>
        </div>

        {/* Desktop links */}
        <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {navItems.map(n => (
            <button key={n.id} onClick={() => scrollTo(n.id)} style={{
              fontSize: 13, background: "none", border: "none", cursor: "pointer", fontWeight: 500, padding: 0,
              color: active === n.id ? ACCENT : MUTED,
              borderBottom: active === n.id ? `1px solid ${ACCENT}` : "1px solid transparent",
              paddingBottom: 2,
              transition: "color 0.2s",
            }}>{n.label}</button>
          ))}
          <button onClick={() => scrollTo("contact")} style={{
            padding: "8px 20px", background: ACCENT, color: BG, border: "none", borderRadius: 6,
            fontSize: 13, fontWeight: 700, cursor: "pointer",
          }}>Let's Talk</button>
        </div>

        {/* Hamburger */}
        <button className="hamburger" onClick={() => setMobileOpen(o => !o)} style={{
          background: "none", border: "none", cursor: "pointer", color: TEXT,
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
          position: "fixed", inset: 0, zIndex: 199, background: BG,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 36,
        }}>
          {navItems.map(n => (
            <button key={n.id} onClick={() => handleNav(n.id)} style={{
              fontSize: 32, fontWeight: 700, color: TEXT, background: "none", border: "none",
              cursor: "pointer",
            }}>{n.label}</button>
          ))}
          <button onClick={() => handleNav("contact")} style={{
            marginTop: 12, padding: "16px 48px", background: ACCENT, color: BG,
            border: "none", borderRadius: 10, fontSize: 18, fontWeight: 700, cursor: "pointer",
          }}>Let's Talk</button>
        </div>
      )}
    </>
  );
}

// ─── Section label ─────────────────────────────────────────────────────────────
function Label({ children }) {
  return (
    <p style={{ fontSize: 11, letterSpacing: 3, fontWeight: 700, color: ACCENT, marginBottom: 16, textTransform: "uppercase" }}>
      {children}
    </p>
  );
}

// ─── Section heading ───────────────────────────────────────────────────────────
function Heading({ children, style = {} }) {
  return (
    <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, color: TEXT, lineHeight: 1.15, letterSpacing: -0.5, ...style }}>
      {children}
    </h2>
  );
}

// ─── Bullet row ────────────────────────────────────────────────────────────────
function Bullet({ children }) {
  return (
    <div style={{ display: "flex", gap: 10, fontSize: 14, color: MUTED, lineHeight: 1.65 }}>
      <span style={{ color: ACCENT, flexShrink: 0, fontSize: 7, marginTop: 6 }}>◆</span>
      <span>{children}</span>
    </div>
  );
}

// ─── External link icon ────────────────────────────────────────────────────────
function ExternalIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  );
}

// ─── Portfolio ─────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [active, setActive] = useState("hero");
  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const ids = ["hero", "about", "experience", "work", "skills", "contact"];
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.3 }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  // Reveal refs — called at top level of component, never conditionally
  const [aboutRef, aboutVis]   = useReveal();
  const [expRef, expVis]       = useReveal();
  const [workRef, workVis]     = useReveal();
  const [skillsRef, skillsVis] = useReveal();
  const [projRef, projVis]     = useReveal();
  const [ctaRef, ctaVis]       = useReveal();

  return (
    <div style={{ background: BG, color: TEXT, minHeight: "100vh", fontFamily: "'Inter',system-ui,-apple-system,sans-serif", overflowX: "hidden" }}>
      <Nav active={active} scrollTo={scrollTo} />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <HeroBackground />
        <div className="section-max" style={{ position: "relative", zIndex: 1, paddingTop: 100, paddingBottom: 80 }}>
          {/* Status pill */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 100, border: `1px solid ${ACCENT_BDR}`, background: ACCENT_DIM, marginBottom: 40 }}>
            <span className="pulse-dot" style={{ display: "block", width: 7, height: 7, borderRadius: "50%", background: ACCENT }} />
            <span style={{ fontSize: 12, color: ACCENT, fontWeight: 500, letterSpacing: 0.3 }}>Lead Product Manager · noon.com · Dubai</span>
          </div>

          {/* Name */}
          <h1 style={{ fontSize: "clamp(56px,9vw,100px)", fontWeight: 800, lineHeight: 0.95, letterSpacing: "-3px", background: `linear-gradient(135deg, ${ACCENT} 25%, ${ACCENT2} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: 24 }}>
            Aman<br />Pandey.
          </h1>

          {/* Sub-role */}
          <p style={{ fontSize: "clamp(14px,1.8vw,17px)", color: MUTED, marginBottom: 20, letterSpacing: 0.2 }}>
            E-Commerce Fulfillment &nbsp;·&nbsp; AI-Powered Operations &nbsp;·&nbsp; Scale Systems
          </p>

          {/* Tagline */}
          <p style={{ fontSize: "clamp(19px,2.6vw,28px)", color: TEXT, maxWidth: 520, lineHeight: 1.45, marginBottom: 52, fontWeight: 500 }}>
            I build the systems that move millions of packages.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("work")} style={{
              padding: "14px 32px", background: ACCENT, color: BG, border: "none", borderRadius: 8,
              fontWeight: 700, fontSize: 15, cursor: "pointer",
              boxShadow: "0 0 40px rgba(0,212,170,0.18)",
              transition: "box-shadow 0.2s, transform 0.2s",
            }}>View My Work</button>
            <a href="/cv.pdf" download style={{
              padding: "14px 32px", background: "transparent", color: TEXT,
              border: `1px solid ${BORDER}`, borderRadius: 8,
              fontWeight: 600, fontSize: 15, textDecoration: "none",
              display: "inline-flex", alignItems: "center", gap: 8,
              transition: "border-color 0.2s",
            }}>
              Download CV
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{
          position: "absolute", bottom: 36, left: "50%",
          animation: "bounce-arrow 1.8s ease-in-out infinite",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
        }}>
          <span style={{ fontSize: 10, color: MUTED, letterSpacing: 3, textTransform: "uppercase" }}>Scroll</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
      </section>

      {/* ── METRICS ──────────────────────────────────────────────────────────── */}
      <div style={{ background: BG_CARD, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="metrics-grid">
            {metrics.map((m, i) => (
              <div key={i} className="metrics-cell">
                <div style={{ fontSize: "clamp(30px,4vw,48px)", fontWeight: 800, color: ACCENT, letterSpacing: -1, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
                  <AnimatedCounter value={m.value} />
                </div>
                <div style={{ fontSize: 12, color: MUTED, marginTop: 10, lineHeight: 1.4 }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ABOUT ────────────────────────────────────────────────────────────── */}
      <section
        id="about"
        ref={aboutRef}
        className={`reveal ${aboutVis ? "reveal-visible" : "reveal-hidden"}`}
        style={{ maxWidth: 1100, margin: "0 auto", padding: "100px 24px", position: "relative" }}
      >
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 45% 55% at 88% 20%, ${ACCENT_DIM} 0%, transparent 55%)`, pointerEvents: "none" }} />
        <div className="about-grid">
          <div>
            <Label>About</Label>
            <Heading>5 years shipping infrastructure at scale.</Heading>
          </div>
          <div>
            <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 18 }}>
              I'm a Lead Product Manager at noon.com — the Middle East's largest e-commerce platform. I progressed from APM to Lead PM in under 4 years, and currently lead a 41-member cross-functional team with 5 direct PM reports. The systems I own process 1.7M+ daily inventory transactions across UAE, KSA, and Egypt.
            </p>
            <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.9, marginBottom: 32 }}>
              My work sits at the intersection of warehouse operations, seller infrastructure, and AI-powered automation. I'm hands-on daily — SQL and BigQuery, internal tooling with Apps Script, and AI prototyping with Claude and Gemini. I hold a BA in Economics with a CS minor from NYU Abu Dhabi (GPA 3.94).
            </p>
            <div style={{ display: "flex", gap: 16, padding: "18px 22px", background: BG_CARD, borderRadius: 10, border: `1px solid ${ACCENT_BDR}`, alignItems: "center" }}>
              <div style={{ width: 3, height: 42, background: ACCENT, borderRadius: 2, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: TEXT }}>NYU Abu Dhabi '21</div>
                <div style={{ fontSize: 12, color: MUTED, marginTop: 4 }}>BA Economics · Minor Computer Science · GPA 3.94 / 4.0</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ───────────────────────────────────────────────────────── */}
      <div style={{ background: BG_CARD, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <section
          id="experience"
          ref={expRef}
          className={`reveal ${expVis ? "reveal-visible" : "reveal-hidden"}`}
          style={{ maxWidth: 1100, margin: "0 auto", padding: "100px 24px", position: "relative" }}
        >
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 55% 55% at 10% 40%, ${ACCENT2_DIM} 0%, transparent 55%), radial-gradient(ellipse 40% 40% at 90% 70%, ${ACCENT_DIM} 0%, transparent 50%)`, pointerEvents: "none" }} />
          <Label>Experience</Label>
          <Heading style={{ marginBottom: 8 }}>APM → Lead PM in 4 years.</Heading>
          <p style={{ fontSize: 14, color: MUTED, marginBottom: 56 }}>noon.com · Fulfilled by Noon · Jun 2021 – Present</p>

          <div className="timeline">
            {experience.map((exp, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-dot" style={{ background: exp.current ? ACCENT : BG_CARD, borderColor: exp.current ? ACCENT : "rgba(255,255,255,0.15)" }} />
                <div className="timeline-card" style={{ background: "rgba(10,15,30,0.6)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", border: `1px solid ${exp.current ? ACCENT_BDR : BORDER}` }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
                    <div>
                      <span style={{
                        display: "inline-block", fontSize: 10, fontWeight: 700, letterSpacing: 1.5,
                        padding: "3px 10px", borderRadius: 4, marginBottom: 10,
                        background: exp.current ? ACCENT : BG_RAISED,
                        color: exp.current ? BG : MUTED,
                      }}>{exp.tag}</span>
                      <div style={{ fontSize: 20, fontWeight: 700, color: TEXT }}>{exp.role}</div>
                    </div>
                    <span style={{ fontSize: 13, color: MUTED, fontWeight: 500, flexShrink: 0 }}>{exp.period}</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {exp.highlights.map((h, j) => <Bullet key={j}>{h}</Bullet>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── FEATURED WORK ────────────────────────────────────────────────────── */}
      <section
        id="work"
        ref={workRef}
        className={`reveal ${workVis ? "reveal-visible" : "reveal-hidden"}`}
        style={{ maxWidth: 1100, margin: "0 auto", padding: "100px 24px", position: "relative" }}
      >
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 50% 45% at 85% 15%, ${ACCENT_DIM} 0%, transparent 55%), radial-gradient(ellipse 40% 40% at 15% 80%, ${ACCENT2_DIM} 0%, transparent 55%)`, pointerEvents: "none" }} />
        <Label>Featured Work</Label>
        <Heading style={{ marginBottom: 48 }}>Products I've shipped.</Heading>
        <div className="products-grid">
          {products.map((p, i) => (
            <div key={i} className="product-card" style={{ background: "rgba(13,21,38,0.55)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", border: `1px solid ${BORDER}` }}>
              {/* Top accent bar */}
              <div style={{ height: 3, background: p.tagColor }} />
              <div style={{ padding: 28 }}>
                {/* Tag + metric */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18, gap: 12 }}>
                  <span style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: 1.5,
                    padding: "3px 10px", borderRadius: 4,
                    background: `${p.tagColor}18`, color: p.tagColor,
                  }}>{p.tag}</span>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: ACCENT, letterSpacing: -0.5, lineHeight: 1 }}>{p.metric}</div>
                    <div style={{ fontSize: 10, color: MUTED, marginTop: 2 }}>{p.metricLabel}</div>
                  </div>
                </div>
                {/* Title + desc */}
                <h3 style={{ fontSize: 18, fontWeight: 700, color: TEXT, lineHeight: 1.3, marginBottom: 10 }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.7, marginBottom: 18 }}>{p.desc}</p>
                {/* Bullets */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 22 }}>
                  {p.bullets.map((b, j) => <Bullet key={j}>{b}</Bullet>)}
                </div>
                {/* Skill tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {p.skills.map(s => (
                    <span key={s} style={{
                      fontSize: 11, padding: "4px 10px", borderRadius: 4,
                      background: BG_RAISED, color: MUTED, border: `1px solid ${BORDER}`, fontWeight: 500,
                    }}>{s}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SKILLS ───────────────────────────────────────────────────────────── */}
      <div style={{ background: BG_CARD, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <section
          id="skills"
          ref={skillsRef}
          className={`reveal ${skillsVis ? "reveal-visible" : "reveal-hidden"}`}
          style={{ maxWidth: 1100, margin: "0 auto", padding: "100px 24px", position: "relative" }}
        >
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 50% 50% at 80% 30%, ${ACCENT2_DIM} 0%, transparent 55%), radial-gradient(ellipse 35% 40% at 20% 70%, ${ACCENT_DIM} 0%, transparent 50%)`, pointerEvents: "none" }} />
          <Label>Skills & Tools</Label>
          <Heading style={{ marginBottom: 48 }}>What I work with.</Heading>
          <div className="skills-grid">
            {Object.entries(skillsData).map(([cat, items]) => {
              const isAI = cat === "AI & Automation";
              const isDomain = cat === "Domain";
              const cardBdr = isAI ? ACCENT_BDR : isDomain ? ACCENT2_BDR : BORDER;
              const chipBg  = isAI ? ACCENT_DIM  : isDomain ? ACCENT2_DIM  : BG_RAISED;
              const chipClr = isAI ? ACCENT       : isDomain ? ACCENT2       : MUTED;
              const chipBdr = isAI ? ACCENT_BDR   : isDomain ? ACCENT2_BDR   : BORDER;
              return (
                <div key={cat} style={{ background: "rgba(10,15,30,0.5)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderRadius: 12, padding: 24, border: `1px solid ${cardBdr}` }}>
                  <Label>{cat}</Label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {items.map(s => (
                      <span key={s} style={{
                        fontSize: 12, padding: "5px 12px", borderRadius: 6, fontWeight: 500,
                        background: chipBg, color: chipClr, border: `1px solid ${chipBdr}`,
                      }}>{s}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* ── SIDE PROJECTS ────────────────────────────────────────────────────── */}
      <div
        ref={projRef}
        className={`reveal ${projVis ? "reveal-visible" : "reveal-hidden"}`}
        style={{ maxWidth: 1100, margin: "0 auto", padding: "100px 24px", position: "relative" }}
      >
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 55% 45% at 15% 25%, ${ACCENT2_DIM} 0%, transparent 55%)`, pointerEvents: "none" }} />
        <Label>Side Projects</Label>
        <Heading style={{ marginBottom: 48 }}>Beyond the day job.</Heading>
        <div className="projects-grid">
          {/* TL;DR Studio */}
          <div className="project-card" style={{ background: "rgba(13,21,38,0.55)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", border: `1px solid ${BORDER}`, padding: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(255,68,68,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FF4444" strokeWidth="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>
              <span style={{ fontSize: 10, letterSpacing: 2, fontWeight: 700, color: MUTED }}>YOUTUBE</span>
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: TEXT, marginBottom: 10 }}>TL;DR Studio</h3>
            <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.75, marginBottom: 22 }}>AI-generated video explainers of top PM, strategy, and tech articles. Built with Claude and Google NotebookLM.</p>
            <a href="https://www.youtube.com/@TLDRStudio" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: ACCENT, fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
              Watch on YouTube <ExternalIcon />
            </a>
          </div>

          {/* Playground PM */}
          <div className="project-card" style={{ background: "rgba(13,21,38,0.55)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", border: `1px solid ${BORDER}`, padding: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(79,142,247,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4f8ef7" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <span style={{ fontSize: 10, letterSpacing: 2, fontWeight: 700, color: MUTED }}>COMMUNITY</span>
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: TEXT, marginBottom: 10 }}>Playground PM</h3>
            <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.75, marginBottom: 22 }}>Internal PM community at noon.com driving AI adoption. Built automated SOP generator (Claude Code) and AskFBN bot (Google Apps Script + Gemini) to bridge knowledge gaps.</p>
            <span style={{ fontSize: 13, color: MUTED, fontWeight: 500 }}>Internal initiative · FBN</span>
          </div>

          {/* Hamro Katha */}
          <div className="project-card" style={{ background: "rgba(13,21,38,0.55)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", border: `1px solid ${BORDER}`, padding: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(220,38,38,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              </div>
              <span style={{ fontSize: 10, letterSpacing: 2, fontWeight: 700, color: MUTED }}>PERSONAL</span>
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: TEXT, marginBottom: 10 }}>Hamro Katha</h3>
            <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.75, marginBottom: 22 }}>Subscription platform delivering bilingual (English/Nepali) illustrated stories to children of Nepali expat families. Inspired by my Australian-born Nepali nephew. Targets parents of 2–5 year olds across the 5M+ strong Nepali diaspora. Vibe-coded solo.</p>
            <a href="https://hamrokatha.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: ACCENT, fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
              Visit hamrokatha.com <ExternalIcon />
            </a>
          </div>
        </div>
      </div>

      {/* ── CONTACT ──────────────────────────────────────────────────────────── */}
      <div style={{ background: BG_CARD, borderTop: `1px solid ${BORDER}` }}>
        <section
          id="contact"
          ref={ctaRef}
          className={`reveal ${ctaVis ? "reveal-visible" : "reveal-hidden"}`}
          style={{ maxWidth: 760, margin: "0 auto", padding: "100px 24px", textAlign: "center" }}
        >
          <Label>Contact</Label>
          <Heading style={{ marginBottom: 20 }}>Let's work together.</Heading>

          {/* Availability badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "10px 22px", background: ACCENT_DIM, border: `1px solid ${ACCENT_BDR}`, borderRadius: 8, marginBottom: 40 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: ACCENT, display: "block", flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: ACCENT, fontWeight: 500 }}>Open to senior PM roles in Australia &nbsp;·&nbsp; Subclass 482 sponsorship</span>
          </div>

          <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.75, maxWidth: 460, margin: "0 auto 52px" }}>
            5+ years building high-scale fulfillment systems. Ready to bring that to a world-class product team in Australia.
          </p>

          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 10 }}>
            {contactLinks.map(c => (
              <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" className="contact-link" style={{ background: BG, border: `1px solid ${BORDER}`, color: TEXT }}>
                <span style={{ color: ACCENT, display: "flex" }}>{c.icon}</span>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: 10, color: MUTED, fontWeight: 500, letterSpacing: 0.5 }}>{c.label}</div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{c.value}</div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <div style={{ borderTop: `1px solid ${BORDER}`, padding: "20px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 12, color: MUTED }}>Aman Pandey · Built with React & Claude</p>
      </div>
    </div>
  );
}
