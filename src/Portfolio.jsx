import { useState, useEffect, useRef, useCallback } from "react";

const ACCENT = "#FEEE00";
const BLUE = "#2E86AB";
const TEAL = "#1B998B";
const DARK_BG = "#0A1628";
const DARK_CARD = "#111F35";
const DARK_TEXT = "#E8ECF1";
const DARK_MUTED = "#8899AA";
const LIGHT_BG = "#F5F6FA";
const LIGHT_CARD = "#FFFFFF";
const LIGHT_TEXT = "#0F1B2D";
const LIGHT_MUTED = "#5A6677";
const METRIC_LIGHT = "#1A5276";
const ACCENT_LABEL_LIGHT = "#8B7500";

const metrics = [
  { value: "1.7M+", label: "Daily inventory transactions" },
  { value: "$3.5M", label: "Monthly seller charges" },
  { value: "3", label: "Markets (UAE, KSA, Egypt)" },
  { value: "38", label: "Team members led" },
  { value: "5+", label: "Years in fulfillment" },
  { value: "29", label: "Roadmap initiatives" },
];

const experience = [
  { role: "Lead Product Manager", period: "Feb 2025 – Present", tag: "CURRENT", highlights: ["Leading 38-member cross-functional team with 5 direct PM reports", "Built B2B externalization product with Salla — ~$27K USD/month new revenue", "AI-powered CCTV investigation — reduced investigation from 2 days to 2 hours", "Authored 29-initiative roadmap with ~47% AI-powered initiatives for CEO/GM", "Leading cross-border Chinese ERP integration for GMV growth"] },
  { role: "Senior Product Manager (PM3)", period: "Oct 2023 – Feb 2025", tag: "SCALE", highlights: ["Warehouse transfer system — 2.4M units/month, 10% manpower cost reduction", "Automated stock reconciliation — resolved 5-year seller pain point, NPS +2 points", "Tamper-proof serialization — 1M+ units captured, $200K/year fraud savings", "Platform unification — 1.7M daily transactions shared across 3 business lines"] },
  { role: "Product Manager 2", period: "Oct 2022 – Oct 2023", tag: "BUILD", highlights: ["Volumetric measurement — 98% coverage across 5–7M SKUs", "Seller finance infrastructure — $3.5M/month, 80% less manual effort", "Led Namshi acquisition integration onto FBN fulfillment stack", "Inbound app rollout — 30% efficiency gain, 20% cost per unit reduction"] },
  { role: "Associate Product Manager", period: "Jun 2021 – Oct 2022", tag: "START", highlights: ["Seller inventory dashboard — 7.9M+ units visible, 50% fewer support tickets", "Automated returns flow — ~900K units/month, 70% support load reduction", "Supported roadmapping, user interviews, and product discovery"] },
];

const projects = [
  { title: "B2B Warehouse Externalization", tag: "GROWTH", desc: "Opened FBN warehouses to external marketplace sellers via Salla integration. Built scalable infrastructure targeting Amazon/Shopify-level integrations.", metric: "~$27K/mo", metricLabel: "new revenue", stage: "SHIPPED → LIVE" },
  { title: "Fulfillment Platform Unification", tag: "PLATFORM", desc: "Unified inventory system shared by noon, noon Minutes, and Supermall — eliminating the need for each business to build its own layer.", metric: "1.7M", metricLabel: "daily transactions", stage: "SHIPPED → LIVE" },
  { title: "Tamper-Proof Serialization", tag: "FRAUD PREVENTION", desc: "End-to-end serialization flow with tamper-proof bags for electronics. Captures serial numbers at inbound, validates at return.", metric: "$200K/yr", metricLabel: "fraud savings", stage: "SHIPPED → LIVE" },
  { title: "AI-Powered CCTV Investigation", tag: "AI", desc: "Hikvision API integration with AI matching to auto-pull QC footage, compare shipped items against catalog, and tag return reasons.", metric: "48x", metricLabel: "faster investigation", stage: "SHIPPED → LIVE" },
  { title: "Seller Finance Infrastructure", tag: "FINANCE", desc: "Storage and outbound fee charging system with volumetric-based billing. Recovered previously lost revenue through accurate measurement.", metric: "$3.5M/mo", metricLabel: "processed", stage: "SHIPPED → LIVE" },
  { title: "Warehouse Transfer System", tag: "OPERATIONS", desc: "Warehouse-to-warehouse transfer system that became critical infrastructure for Supermall and noon Minutes hyperlocal launches.", metric: "2.4M", metricLabel: "units/month", stage: "SHIPPED → LIVE" },
];

const skillsData = {
  Product: ["Strategy & Roadmapping", "PRDs & Specs", "User Research", "Stakeholder Mgmt", "OKRs & KPIs", "A/B Testing", "Platform Thinking"],
  Technical: ["SQL / BigQuery", "Google Apps Script", "REST APIs", "Dashboarding", "Jira", "Confluence", "Figma", "Looker"],
  "AI & Automation": ["Claude", "Claude Code", "Gemini", "NotebookLM", "Prompt Engineering", "Bot Development"],
  Domain: ["E-Commerce Fulfillment", "Warehouse Ops", "Inventory Mgmt", "Seller Marketplace", "Supply Chain", "Finance Systems"],
};

function NetworkCanvas({ dark }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const dotsRef = useRef([]);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.setTransform(2, 0, 0, 2, 0, 0);
      const count = Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 5500);
      dotsRef.current = Array.from({ length: Math.min(count, 110) }, () => ({
        x: Math.random() * canvas.offsetWidth, y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 2.5 + 1, bright: Math.random() > 0.75,
      }));
    };
    resize();
    window.addEventListener("resize", resize);
    const draw = () => {
      const w = canvas.offsetWidth, h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      const dots = dotsRef.current;
      dots.forEach((d) => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0) { d.x = 0; d.vx *= -1; } if (d.x > w) { d.x = w; d.vx *= -1; }
        if (d.y < 0) { d.y = 0; d.vy *= -1; } if (d.y > h) { d.y = h; d.vy *= -1; }
        const mx = mouseRef.current.x, my = mouseRef.current.y;
        const mdist = Math.hypot(mx - d.x, my - d.y);
        if (mdist < 200 && mdist > 0) { d.vx -= ((mx - d.x) / mdist) * 0.03; d.vy -= ((my - d.y) / mdist) * 0.03; }
        const speed = Math.hypot(d.vx, d.vy);
        if (speed > 1) { d.vx *= 0.92; d.vy *= 0.92; }
      });
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dist = Math.hypot(dots[i].x - dots[j].x, dots[i].y - dots[j].y);
          if (dist < 150) {
            const alpha = 0.3 * (1 - dist / 150);
            ctx.beginPath(); ctx.moveTo(dots[i].x, dots[i].y); ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = dark ? `rgba(46,134,171,${alpha})` : `rgba(26,82,118,${alpha * 0.4})`;
            ctx.lineWidth = 0.8; ctx.stroke();
          }
        }
      }
      dots.forEach((d) => {
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = d.bright ? (dark ? "rgba(254,238,0,0.8)" : "rgba(26,82,118,0.6)") : (dark ? "rgba(46,134,171,0.5)" : "rgba(26,82,118,0.2)");
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    const onMove = (e) => { const r = canvas.getBoundingClientRect(); mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top }; };
    const onLeave = () => { mouseRef.current = { x: -1000, y: -1000 }; };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); canvas.removeEventListener("mousemove", onMove); canvas.removeEventListener("mouseleave", onLeave); };
  }, [dark]);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "auto" }} />;
}

function AnimatedCounter({ target }) {
  const [display, setDisplay] = useState("0");
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  useEffect(() => { const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.3 }); if (ref.current) obs.observe(ref.current); return () => obs.disconnect(); }, []);
  useEffect(() => {
    if (!started) return;
    const num = parseFloat(target.replace(/[^0-9.]/g, ""));
    if (isNaN(num)) { setDisplay(target); return; }
    let frame = 0;
    const timer = setInterval(() => {
      frame++;
      const eased = 1 - Math.pow(1 - frame / 35, 3);
      const cur = num * eased;
      if (frame >= 35) { clearInterval(timer); setDisplay(target); }
      else { const pre = target.startsWith("$") ? "$" : ""; const val = target.includes("M") ? cur.toFixed(1) + "M" : target.includes("x") ? Math.round(cur) + "x" : String(Math.round(cur)); setDisplay(pre + val + (target.includes("+") ? "+" : "")); }
    }, 30);
    return () => clearInterval(timer);
  }, [started, target]);
  return <span ref={ref}>{display}</span>;
}

function useReveal() {
  const ref = useRef(null); const [vis, setVis] = useState(false);
  useEffect(() => { const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.08 }); if (ref.current) obs.observe(ref.current); return () => obs.disconnect(); }, []);
  return [ref, vis];
}

function ConveyorBelt({ dark }) {
  return (
    <div style={{ overflow: "hidden", padding: "10px 0", opacity: 0.35 }}>
      <div style={{ display: "flex", gap: 40, whiteSpace: "nowrap", animation: "conveyor 25s linear infinite", fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: dark ? DARK_MUTED : LIGHT_MUTED, fontWeight: 700, fontFamily: "monospace" }}>
        {Array(4).fill(null).map((_, i) => (<span key={i}>INBOUND &nbsp;→&nbsp; PUTAWAY &nbsp;→&nbsp; INVENTORY &nbsp;→&nbsp; PICK &nbsp;→&nbsp; PACK &nbsp;→&nbsp; SHIP &nbsp;→&nbsp; DELIVER &nbsp;→&nbsp; RETURN &nbsp;→&nbsp; RECONCILE &nbsp;&nbsp;&nbsp;</span>))}
      </div>
      <style>{`@keyframes conveyor { 0% { transform: translateX(0); } 100% { transform: translateX(-25%); } }`}</style>
    </div>
  );
}

function ThemeToggle({ dark, setDark }) {
  return (
    <button onClick={() => setDark(!dark)} aria-label="Toggle theme" style={{ width: 56, height: 28, borderRadius: 14, border: `1px solid ${dark ? "rgba(46,134,171,0.2)" : "rgba(0,0,0,0.1)"}`, cursor: "pointer", background: dark ? "#111F35" : "#E8ECF1", position: "relative", transition: "all 0.4s", padding: 0 }}>
      <div style={{ position: "absolute", top: 3, left: dark ? 3 : 31, width: 22, height: 22, borderRadius: "50%", transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)", background: dark ? "#0A1628" : ACCENT, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        {dark ? <div style={{ position: "relative", width: "100%", height: "100%" }}><div style={{ position: "absolute", width: 14, height: 14, borderRadius: "50%", background: "transparent", boxShadow: `6px -2px 0 0 ${ACCENT}`, top: 4, left: 1 }} /></div> : (
          <>{[0, 60, 120, 180, 240, 300].map(a => <div key={a} style={{ position: "absolute", width: 2, height: 4, background: "#C4A000", borderRadius: 1, transform: `rotate(${a}deg) translateY(-8px)` }} />)}<div style={{ width: 8, height: 8, borderRadius: "50%", background: "#C4A000" }} /></>
        )}
      </div>
    </button>
  );
}

const SvgIcon = ({ d, size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>;

const contactItems = [
  { label: "Email", value: "ap5275@nyu.edu", href: "mailto:ap5275@nyu.edu", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg> },
  { label: "LinkedIn", value: "linkedin.com/in/amanpandey3322/", href: "https://linkedin.com/in/amanpandey3322/", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
  { label: "YouTube", value: "TL;DR Studio", href: "https://www.youtube.com/@TLDRStudio", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg> },
  { label: "GitHub", value: "github.com/amanpandey22", href: "https://github.com/amanpandey22", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg> },
  { label: "Phone", value: "+971 56 940 1493", href: "tel:+971569401493", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg> },
];

export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");
  const bg = dark ? DARK_BG : LIGHT_BG;
  const card = dark ? DARK_CARD : LIGHT_CARD;
  const text = dark ? DARK_TEXT : LIGHT_TEXT;
  const muted = dark ? DARK_MUTED : LIGHT_MUTED;
  const border = dark ? "rgba(46,134,171,0.12)" : "rgba(0,0,0,0.07)";
  const metricColor = dark ? ACCENT : METRIC_LIGHT;
  const accentText = dark ? ACCENT : "#7A6C00";
  const scrollTo = useCallback((id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }, []);

  useEffect(() => {
    const ids = ["hero", "about", "experience", "projects", "skills", "contact"];
    const obs = new IntersectionObserver((entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }); }, { threshold: 0.3 });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const navItems = [{ id: "about", label: "About" }, { id: "experience", label: "Experience" }, { id: "projects", label: "Projects" }, { id: "skills", label: "Skills" }, { id: "contact", label: "Contact" }];

  return (
    <div style={{ background: bg, color: text, minHeight: "100vh", fontFamily: "'Inter',system-ui,-apple-system,sans-serif", transition: "background 0.5s,color 0.5s", overflowX: "hidden" }}>

      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: dark ? "rgba(10,22,40,0.88)" : "rgba(245,246,250,0.88)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${border}`, padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
        <div onClick={() => scrollTo("hero")} style={{ cursor: "pointer" }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: DARK_BG }}>AP</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {navItems.map((n) => <button key={n.id} onClick={() => scrollTo(n.id)} style={{ fontSize: 13, color: activeSection === n.id ? (dark ? ACCENT : "#7A6C00") : muted, background: activeSection === n.id ? (dark ? "rgba(254,238,0,0.08)" : "rgba(122,108,0,0.06)") : "transparent", border: "none", cursor: "pointer", fontWeight: 500, padding: "6px 14px", borderRadius: 6, transition: "all 0.3s" }}>{n.label}</button>)}
          <div style={{ width: 1, height: 20, background: border, margin: "0 8px" }} />
          <ThemeToggle dark={dark} setDark={setDark} />
        </div>
      </nav>

      <div id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <NetworkCanvas dark={dark} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "120px 32px 60px", width: "100%" }}>
          <div style={{ display: "inline-block", fontSize: 10, fontWeight: 800, letterSpacing: 3, color: DARK_BG, background: ACCENT, padding: "5px 14px", borderRadius: 4, marginBottom: 24 }}>LEAD PRODUCT MANAGER</div>
          <h1 style={{ fontSize: "clamp(48px,8vw,80px)", fontWeight: 800, lineHeight: 1.0, margin: "0 0 24px", letterSpacing: -3 }}>Aman<br/>Pandey</h1>
          <p style={{ fontSize: 20, color: muted, maxWidth: 560, lineHeight: 1.65, margin: "0 0 12px" }}>Building e-commerce fulfillment systems that move <span style={{ color: metricColor, fontWeight: 700 }}>millions of units</span> across the Middle East.</p>
          <p style={{ fontSize: 14, color: dark ? BLUE : TEAL, marginBottom: 40, fontWeight: 500 }}>noon.com &nbsp;·&nbsp; UAE &nbsp;·&nbsp; KSA &nbsp;·&nbsp; Egypt</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("contact")} style={{ padding: "14px 32px", background: ACCENT, color: DARK_BG, borderRadius: 8, fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer", boxShadow: "0 4px 20px rgba(254,238,0,0.15)" }}>Get in touch</button>
            <button onClick={() => scrollTo("projects")} style={{ padding: "14px 32px", background: "transparent", color: text, borderRadius: 8, fontWeight: 600, fontSize: 14, border: `1.5px solid ${border}`, cursor: "pointer" }}>View my work</button>
          </div>
        </div>
      </div>

      <ConveyorBelt dark={dark} />

      <div style={{ background: dark ? "#0D1420" : "#EDF0F5", borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 32px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 20 }}>
          {metrics.map((m, i) => <div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 36, fontWeight: 800, color: metricColor, letterSpacing: -1, lineHeight: 1.1 }}><AnimatedCounter target={m.value} /></div><div style={{ fontSize: 12, color: muted, marginTop: 6 }}>{m.label}</div></div>)}
        </div>
      </div>

      {(() => { const [ref, vis] = useReveal(); return (
        <div id="about" ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(30px)", transition: "opacity 0.7s,transform 0.7s", maxWidth: 1100, margin: "0 auto", padding: "100px 32px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: accentText, marginBottom: 12 }}>ABOUT</div>
          <h3 style={{ fontSize: 30, fontWeight: 700, marginBottom: 24, lineHeight: 1.3 }}>5 years building the engine behind noon's fulfillment</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            <p style={{ fontSize: 15, color: muted, lineHeight: 1.85, margin: 0 }}>I'm a Lead Product Manager at noon.com — the Middle East's largest e-commerce platform. I own the product strategy for Fulfilled by Noon (FBN), the fulfillment engine that handles everything from the moment a seller ships inventory to the moment a customer receives their order.</p>
            <p style={{ fontSize: 15, color: muted, lineHeight: 1.85, margin: 0 }}>My work spans inbound processing, inventory management, warehouse transfers, outbound, returns, seller finance, and fraud prevention — across UAE, KSA, and Egypt. I'm technically hands-on (SQL/BigQuery daily, internal tooling with Apps Script, AI prototyping with Claude and Gemini) and deeply focused on AI-powered product innovation.</p>
          </div>
          <div style={{ marginTop: 32, padding: "18px 24px", background: card, borderRadius: 12, border: `1px solid ${border}`, display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 4, height: 44, background: ACCENT, borderRadius: 2, flexShrink: 0 }} />
            <div><div style={{ fontSize: 15, fontWeight: 700 }}>NYU Abu Dhabi '21</div><div style={{ fontSize: 13, color: muted }}>BA Economics, Minor in Computer Science · GPA 3.94/4.0</div></div>
          </div>
        </div>
      ); })()}

      <ConveyorBelt dark={dark} />

      {(() => { const [ref, vis] = useReveal(); return (
        <div id="experience" ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(30px)", transition: "opacity 0.7s,transform 0.7s", maxWidth: 1100, margin: "0 auto", padding: "100px 32px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: accentText, marginBottom: 12 }}>EXPERIENCE</div>
          <h3 style={{ fontSize: 30, fontWeight: 700, marginBottom: 8 }}>APM → Lead PM in under 4 years</h3>
          <p style={{ fontSize: 14, color: muted, marginBottom: 48 }}>noon.com · Fulfilled by Noon (FBN) · Jun 2021 – Present</p>
          <div style={{ position: "relative", paddingLeft: 40 }}>
            <div style={{ position: "absolute", left: 11, top: 12, bottom: 12, width: 2, background: dark ? "rgba(46,134,171,0.2)" : "rgba(0,0,0,0.08)" }} />
            {experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: 48, position: "relative" }}>
                <div style={{ position: "absolute", left: -40, top: 4, width: 24, height: 24, borderRadius: "50%", background: i === 0 ? ACCENT : (dark ? DARK_CARD : LIGHT_CARD), border: i === 0 ? `3px solid ${ACCENT}` : `2px solid ${BLUE}`, zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {i === 0 && <div style={{ width: 8, height: 8, borderRadius: "50%", background: DARK_BG }} />}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: 2, color: dark ? DARK_BG : "#fff", background: i === 0 ? ACCENT : BLUE, padding: "2px 8px", borderRadius: 3 }}>{exp.tag}</span>
                  <span style={{ fontSize: 12, color: muted }}>{exp.period}</span>
                </div>
                <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 14 }}>{exp.role}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {exp.highlights.map((h, j) => <div key={j} style={{ display: "flex", gap: 10, fontSize: 14, color: muted, lineHeight: 1.65 }}><span style={{ color: BLUE, flexShrink: 0, fontSize: 8, marginTop: 6 }}>●</span><span>{h}</span></div>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      ); })()}

      <div style={{ background: dark ? "#0D1420" : "#EDF0F5" }}>
        <ConveyorBelt dark={dark} />
        {(() => { const [ref, vis] = useReveal(); return (
          <div id="projects" ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(30px)", transition: "opacity 0.7s,transform 0.7s", maxWidth: 1100, margin: "0 auto", padding: "80px 32px 100px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: accentText, marginBottom: 12 }}>FEATURED WORK</div>
            <h3 style={{ fontSize: 30, fontWeight: 700, marginBottom: 40 }}>Products I've shipped</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 20 }}>
              {projects.map((p, i) => { const [cR, cV] = useReveal(); return (
                <div key={i} ref={cR} style={{ background: card, borderRadius: 12, overflow: "hidden", border: `1px solid ${border}`, opacity: cV ? 1 : 0, transform: cV ? "none" : "translateY(20px)", transition: `opacity 0.5s ease ${i * 0.08}s,transform 0.5s ease ${i * 0.08}s` }}>
                  <div style={{ padding: "8px 20px", fontSize: 9, fontWeight: 700, letterSpacing: 2, color: TEAL, background: dark ? "rgba(27,153,139,0.06)" : "rgba(27,153,139,0.04)", borderBottom: `1px solid ${border}`, fontFamily: "monospace" }}>● {p.stage}</div>
                  <div style={{ padding: "20px 24px" }}>
                    <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, color: accentText, background: dark ? "rgba(254,238,0,0.08)" : "rgba(126,108,0,0.08)", padding: "3px 8px", borderRadius: 3 }}>{p.tag}</span>
                    <div style={{ fontSize: 18, fontWeight: 700, margin: "12px 0 8px", lineHeight: 1.3 }}>{p.title}</div>
                    <div style={{ fontSize: 13, color: muted, lineHeight: 1.7 }}>{p.desc}</div>
                  </div>
                  <div style={{ padding: "16px 24px", borderTop: `1px solid ${border}`, display: "flex", alignItems: "baseline", gap: 8 }}>
                    <span style={{ fontSize: 26, fontWeight: 800, color: metricColor, letterSpacing: -1 }}>{p.metric}</span>
                    <span style={{ fontSize: 12, color: muted }}>{p.metricLabel}</span>
                  </div>
                </div>
              ); })}
            </div>
          </div>
        ); })()}
      </div>

      {(() => { const [ref, vis] = useReveal(); return (
        <div id="skills" ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(30px)", transition: "opacity 0.7s,transform 0.7s", maxWidth: 1100, margin: "0 auto", padding: "100px 32px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: accentText, marginBottom: 12 }}>SKILLS & TOOLS</div>
          <h3 style={{ fontSize: 30, fontWeight: 700, marginBottom: 40 }}>What I work with</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 20 }}>
            {Object.entries(skillsData).map(([cat, items]) => (
              <div key={cat} style={{ background: card, borderRadius: 12, padding: 24, border: `1px solid ${border}` }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: accentText, letterSpacing: 2, marginBottom: 16 }}>{cat.toUpperCase()}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {items.map((s) => <span key={s} style={{ fontSize: 12, padding: "5px 12px", borderRadius: 6, fontWeight: 500, background: dark ? "rgba(46,134,171,0.1)" : "rgba(26,82,118,0.05)", color: dark ? "rgba(200,220,240,0.8)" : "rgba(26,82,118,0.8)", border: `1px solid ${dark ? "rgba(46,134,171,0.1)" : "rgba(26,82,118,0.08)"}` }}>{s}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      ); })()}

      <div style={{ background: dark ? "#0D1420" : "#EDF0F5" }}>
        {(() => { const [ref, vis] = useReveal(); return (
          <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(30px)", transition: "opacity 0.7s,transform 0.7s", maxWidth: 1100, margin: "0 auto", padding: "80px 32px 100px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: accentText, marginBottom: 12 }}>SIDE PROJECTS</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div style={{ background: card, borderRadius: 12, padding: 28, border: `1px solid ${border}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(255,0,0,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF0000" strokeWidth="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: accentText, letterSpacing: 2 }}>YOUTUBE</div>
                </div>
                <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>TL;DR Studio</div>
                <p style={{ fontSize: 14, color: muted, lineHeight: 1.7, margin: "0 0 16px" }}>AI-generated video explainers of top PM, strategy, and tech articles. Built with Claude and Google NotebookLM.</p>
                <a href="#" style={{ fontSize: 13, color: accentText, fontWeight: 600, textDecoration: "none" }}>Watch on YouTube →</a>
              </div>
              <div style={{ background: card, borderRadius: 12, padding: 28, border: `1px solid ${border}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: dark ? "rgba(46,134,171,0.08)" : "rgba(26,82,118,0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: accentText, letterSpacing: 2 }}>COMMUNITY</div>
                </div>
                <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Playground PM</div>
                <p style={{ fontSize: 14, color: muted, lineHeight: 1.7, margin: "0 0 16px" }}>Internal PM community at FBN driving AI adoption. Built automated SOP generator (Claude Code) and AskFBN bot (Apps Script + Gemini) to bridge knowledge gaps.</p>
                <span style={{ fontSize: 13, color: BLUE, fontWeight: 600 }}>Internal initiative at FBN</span>
              </div>
            </div>
          </div>
        ); })()}
      </div>

      {(() => { const [ref, vis] = useReveal(); return (
        <div id="contact" ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(30px)", transition: "opacity 0.7s,transform 0.7s", maxWidth: 1100, margin: "0 auto", padding: "100px 32px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: accentText, marginBottom: 12 }}>CONTACT</div>
          <h3 style={{ fontSize: 30, fontWeight: 700, marginBottom: 12 }}>Let's connect</h3>
          <p style={{ fontSize: 15, color: muted, marginBottom: 40, maxWidth: 500 }}>I'm always open to conversations about e-commerce, fulfillment, AI in operations, or interesting product challenges. Feel free to reach out.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {contactItems.map((c) => (
              <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 20px", background: card, borderRadius: 10, border: `1px solid ${border}`, textDecoration: "none", color: text, flex: "0 0 auto" }}>
                <div style={{ color: BLUE, flexShrink: 0, display: "flex" }}>{c.icon}</div>
                <div><div style={{ fontSize: 11, color: muted, fontWeight: 500, letterSpacing: 0.5 }}>{c.label}</div><div style={{ fontSize: 13, fontWeight: 600 }}>{c.value}</div></div>
              </a>
            ))}
          </div>
        </div>
      ); })()}

      <div style={{ borderTop: `1px solid ${border}`, padding: "20px 32px", textAlign: "center" }}>
        <p style={{ fontSize: 12, color: muted, margin: 0 }}>Aman Pandey · Built with a lot of coffee and Claude</p>
      </div>
    </div>
  );
}
