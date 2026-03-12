// ServiceReply Landing Page v3 - Beta phase + contact options + umlaut fix
import { useState, useEffect, createContext, useContext } from "react";

const themes = {
  dark: {
    bg: "#08080d", bgLight: "#0e0e16", card: "#12121c",
    accent: "#e94560", accentLight: "#ff6b81", accentGlow: "rgba(233,69,96,0.12)",
    text: "#ede9e0", textMuted: "#7a756d", border: "#1e1e2a",
    navBg: "rgba(8,8,13,0.92)", inputBg: "#0e0e16",
  },
  light: {
    bg: "#f5f2ed", bgLight: "#ebe7e0", card: "#ffffff",
    accent: "#d63651", accentLight: "#e94560", accentGlow: "rgba(214,54,81,0.1)",
    text: "#1a1a1a", textMuted: "#6b6560", border: "#ddd8d0",
    navBg: "rgba(245,242,237,0.95)", inputBg: "#f0ece5",
  },
};

const ThemeContext = createContext();
const useTheme = () => useContext(ThemeContext);

function useIsMobile() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return w < 768;
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [v, setV] = useState(false);
  useEffect(() => { const t = setTimeout(() => setV(true), delay); return () => clearTimeout(t); }, [delay]);
  return (
    <div style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.7s ease, transform 0.7s ease", ...style }}>
      {children}
    </div>
  );
}

const DASHBOARD_URL = "https://app.servicereply.de";

function Nav() {
  const { C, toggle, isDark } = useTheme();
  const mob = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: mob ? "14px 20px" : "18px 48px",
        background: C.navBg, backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${C.border}`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div style={{ fontSize: mob ? 18 : 22, fontWeight: 700, color: C.accent, letterSpacing: "0.03em", fontFamily: "'Playfair Display', Georgia, serif" }}>
          ServiceReply
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: mob ? 12 : 32 }}>
          {!mob && ["Funktionen", "So gehts", "Preise", "FAQ"].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s/g, '')}`} style={{
              color: C.textMuted, textDecoration: "none", fontSize: 14, fontWeight: 500, fontFamily: "'DM Sans', sans-serif",
            }}>{item}</a>
          ))}
          <div onClick={toggle} style={{
            width: 40, height: 22, borderRadius: 11, cursor: "pointer",
            background: isDark ? C.border : C.accent, position: "relative", transition: "background 0.3s",
          }}>
            <div style={{
              width: 16, height: 16, borderRadius: "50%", background: isDark ? "#333" : "#fff",
              position: "absolute", top: 3, left: isDark ? 3 : 21, transition: "left 0.3s",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9,
            }}>{isDark ? "🌙" : "☀️"}</div>
          </div>
          {mob ? (
            <div onClick={() => setMenuOpen(!menuOpen)} style={{ fontSize: 24, cursor: "pointer", color: C.text, padding: "0 4px" }}>
              {menuOpen ? "✕" : "☰"}
            </div>
          ) : (
            <a href={DASHBOARD_URL} style={{
              padding: "10px 24px", borderRadius: 8,
              background: `linear-gradient(135deg, ${C.accent}, ${C.accentLight})`,
              color: "#fff", textDecoration: "none", fontSize: 13, fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
            }}>Jetzt starten</a>
          )}
        </div>
      </nav>
      {mob && menuOpen && (
        <div style={{
          position: "fixed", top: 52, left: 0, right: 0, zIndex: 99,
          background: C.navBg, backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${C.border}`, padding: "16px 20px",
          display: "flex", flexDirection: "column", gap: 16,
        }}>
          {["Funktionen", "So gehts", "Preise", "FAQ"].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s/g, '')}`}
              onClick={() => setMenuOpen(false)}
              style={{ color: C.textMuted, textDecoration: "none", fontSize: 16, fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>
              {item}
            </a>
          ))}
          <a href={DASHBOARD_URL} onClick={() => setMenuOpen(false)} style={{
            padding: "12px 0", borderRadius: 8, textAlign: "center",
            background: `linear-gradient(135deg, ${C.accent}, ${C.accentLight})`,
            color: "#fff", textDecoration: "none", fontSize: 14, fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
          }}>Jetzt starten</a>
        </div>
      )}
    </>
  );
}

function Hero() {
  const { C } = useTheme();
  const mob = useIsMobile();
  return (
    <section style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      textAlign: "center", padding: mob ? "100px 20px 60px" : "120px 24px 80px",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: "20%", left: "50%", transform: "translate(-50%,-50%)",
        width: mob ? 300 : 600, height: mob ? 300 : 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(233,69,96,0.08) 0%, transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none",
      }} />
      <div style={{ position: "relative", maxWidth: 720 }}>
        <FadeIn delay={200}>
          <div style={{
            display: "inline-block", padding: "6px 16px", borderRadius: 20,
            background: C.accentGlow, border: `1px solid ${C.accent}30`,
            fontSize: mob ? 11 : 13, color: C.accent, fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.05em", marginBottom: mob ? 20 : 28,
          }}>✨ Dein KI-Assistent für WhatsApp</div>
        </FadeIn>
        <FadeIn delay={300}>
          <div style={{
            display: "inline-block", padding: "3px 10px", borderRadius: 6,
            background: "rgba(233,69,96,0.2)", border: "1px solid rgba(233,69,96,0.4)",
            fontSize: 10, color: C.accent, fontWeight: 800, fontFamily: "'DM Sans', sans-serif",
            letterSpacing: "0.2em", marginBottom: mob ? 12 : 16,
          }}>BETA</div>
        </FadeIn>
        <FadeIn delay={400}>
          <h1 style={{
            fontSize: mob ? 34 : 62, fontWeight: 700, lineHeight: 1.1,
            color: C.text, marginBottom: mob ? 16 : 24, fontFamily: "'Playfair Display', Georgia, serif",
          }}>
            Deine Kunden schreiben.<br />
            <span style={{ color: C.accent }}>Dein Bot antwortet.</span>
          </h1>
        </FadeIn>
        <FadeIn delay={600}>
          <p style={{
            fontSize: mob ? 15 : 18, lineHeight: 1.7, color: C.textMuted,
            maxWidth: 540, margin: "0 auto", marginBottom: mob ? 28 : 40,
            fontFamily: "'DM Sans', sans-serif", padding: mob ? "0 8px" : 0,
          }}>
            ServiceReply übernimmt deine WhatsApp-Kommunikation — beantwortet Fragen, vereinbart Termine und informiert dich in Echtzeit. 24/7, professionell und diskret.
          </p>
        </FadeIn>
        <FadeIn delay={800}>
          <div style={{ display: "flex", gap: mob ? 10 : 16, justifyContent: "center", flexDirection: mob ? "column" : "row", padding: mob ? "0 20px" : 0 }}>
            <a href={DASHBOARD_URL} style={{
              padding: mob ? "14px 0" : "16px 40px", borderRadius: 10, textAlign: "center",
              background: `linear-gradient(135deg, ${C.accent}, ${C.accentLight})`,
              color: "#fff", textDecoration: "none", fontSize: mob ? 15 : 16, fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
            }}>Kostenlos testen</a>
            <a href="#sogehts" style={{
              padding: mob ? "14px 0" : "16px 40px", borderRadius: 10, textAlign: "center",
              background: "transparent", border: `1px solid ${C.border}`,
              color: C.textMuted, textDecoration: "none", fontSize: mob ? 15 : 16, fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
            }}>So funktioniert's →</a>
          </div>
        </FadeIn>
        <FadeIn delay={1000}>
          <div style={{ display: "flex", justifyContent: "center", gap: mob ? 28 : 40, marginTop: mob ? 40 : 60, fontFamily: "'DM Sans', sans-serif" }}>
            {[{ num: "24/7", label: "Erreichbar" }, { num: "✓", label: "Menschlich" }, { num: "100%", label: "Diskret" }].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: mob ? 22 : 28, fontWeight: 700, color: C.accent }}>{s.num}</div>
                <div style={{ fontSize: mob ? 10 : 12, color: C.textMuted, marginTop: 4, letterSpacing: "0.05em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Features() {
  const { C } = useTheme();
  const mob = useIsMobile();
  const features = [
    { icon: "💬", title: "Automatische Antworten", desc: "Dein Bot beantwortet Kundenanfragen sofort — Preise, Zeiten, Services." },
    { icon: "📅", title: "Termin-Management", desc: "Kunden buchen Termine direkt über WhatsApp. Du bestätigst mit einem Klick." },
    { icon: "🔔", title: "Sofort-Benachrichtigung", desc: "Bei jedem neuen Termin wirst du sofort informiert." },
    { icon: "📊", title: "Buchhaltung & Übersicht", desc: "Behalte den Überblick: Alle Termine, Kunden und Umsätze auf einen Blick in deinem Dashboard." },
    { icon: "🎨", title: "Dein Stil", desc: "Passe den Kommunikationsstil an — flirty, professionell oder zurückhaltend." },
    { icon: "🔒", title: "100% Diskret", desc: "Deine Daten bleiben bei dir. Keine Weitergabe an Dritte." },
  ];

  return (
    <section id="funktionen" style={{ padding: mob ? "60px 20px" : "100px 48px", maxWidth: 1100, margin: "0 auto" }}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: mob ? 36 : 60 }}>
          <div style={{ fontSize: 13, color: C.accent, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}>Funktionen</div>
          <h2 style={{ fontSize: mob ? 28 : 42, fontWeight: 700, color: C.text, fontFamily: "'Playfair Display', Georgia, serif" }}>Alles was du brauchst</h2>
        </div>
      </FadeIn>
      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr 1fr", gap: mob ? 14 : 20 }}>
        {features.map((f, i) => (
          <FadeIn key={i} delay={200 + i * 80}>
            <div style={{ padding: mob ? 24 : 32, borderRadius: 16, background: C.card, border: `1px solid ${C.border}`, height: "100%" }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: C.accentGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 16 }}>{f.icon}</div>
              <h3 style={{ fontSize: mob ? 16 : 18, fontWeight: 700, color: C.text, marginBottom: 8, fontFamily: "'Playfair Display', Georgia, serif" }}>{f.title}</h3>
              <p style={{ fontSize: mob ? 13 : 14, lineHeight: 1.7, color: C.textMuted, fontFamily: "'DM Sans', sans-serif" }}>{f.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const { C } = useTheme();
  const mob = useIsMobile();
  const steps = [
    { num: "01", title: "Registriere dich", desc: "Erstelle dein Konto in 2 Minuten. Gib deine Daten ein — Name, Preise, Zeiten, Services." },
    { num: "02", title: "Verbinde WhatsApp", desc: "Scanne einen QR-Code und dein Bot ist sofort aktiv." },
    { num: "03", title: "Lehne dich zurück", desc: "Dein Bot übernimmt. Du wirst bei Terminen benachrichtigt und bestätigst mit einem Klick." },
  ];

  return (
    <section id="sogehts" style={{
      padding: mob ? "60px 20px" : "100px 48px",
      background: `linear-gradient(180deg, transparent 0%, ${C.bgLight} 20%, ${C.bgLight} 80%, transparent 100%)`,
    }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: mob ? 36 : 60 }}>
            <div style={{ fontSize: 13, color: C.accent, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}>So gehts</div>
            <h2 style={{ fontSize: mob ? 28 : 42, fontWeight: 700, color: C.text, fontFamily: "'Playfair Display', Georgia, serif" }}>In 3 Schritten startklar</h2>
          </div>
        </FadeIn>
        <div style={{ display: "flex", flexDirection: "column", gap: mob ? 14 : 24 }}>
          {steps.map((s, i) => (
            <FadeIn key={i} delay={200 + i * 150}>
              <div style={{
                display: "flex", gap: mob ? 16 : 32, alignItems: mob ? "flex-start" : "center",
                padding: mob ? 20 : 36, borderRadius: 16, background: C.card, border: `1px solid ${C.border}`,
              }}>
                <div style={{ fontSize: mob ? 32 : 48, fontWeight: 800, color: C.accent + "25", fontFamily: "'Playfair Display', Georgia, serif", minWidth: mob ? 44 : 80, textAlign: "center" }}>{s.num}</div>
                <div>
                  <h3 style={{ fontSize: mob ? 17 : 22, fontWeight: 700, color: C.text, marginBottom: 6, fontFamily: "'Playfair Display', Georgia, serif" }}>{s.title}</h3>
                  <p style={{ fontSize: mob ? 13 : 15, lineHeight: 1.7, color: C.textMuted, fontFamily: "'DM Sans', sans-serif" }}>{s.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={700}>
          <div style={{ marginTop: mob ? 28 : 48, padding: mob ? 32 : 48, borderRadius: 16, textAlign: "center", background: C.card, border: `1px dashed ${C.border}` }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🎬</div>
            <div style={{ fontSize: mob ? 15 : 18, color: C.textMuted, fontFamily: "'DM Sans', sans-serif" }}>Demo-Video kommt bald</div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Pricing() {
  const { C } = useTheme();
  const mob = useIsMobile();
  const [annual, setAnnual] = useState(true);

  return (
    <section id="preise" style={{ padding: mob ? "60px 20px" : "100px 48px", maxWidth: 900, margin: "0 auto" }}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: mob ? 32 : 48 }}>
          <div style={{ fontSize: 13, color: C.accent, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}>Preise</div>
          <h2 style={{ fontSize: mob ? 28 : 42, fontWeight: 700, color: C.text, marginBottom: 8, fontFamily: "'Playfair Display', Georgia, serif" }}>Einfach & transparent</h2>
          <div style={{ display: "inline-block", padding: "6px 16px", borderRadius: 20, background: "rgba(233,69,96,0.15)", border: "1px solid rgba(233,69,96,0.3)", fontSize: 12, color: C.accent, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", marginBottom: 20 }}>BETA-PREISE — Limitiertes Angebot</div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ display: "inline-flex", borderRadius: 10, overflow: "hidden", border: `1px solid ${C.border}` }}>
              <button onClick={() => setAnnual(false)} style={{ padding: "8px 18px", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, background: !annual ? C.accent : "transparent", color: !annual ? "#fff" : C.textMuted, fontFamily: "'DM Sans', sans-serif" }}>Monatlich</button>
              <button onClick={() => setAnnual(true)} style={{ padding: "8px 18px", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, background: annual ? C.accent : "transparent", color: annual ? "#fff" : C.textMuted, fontFamily: "'DM Sans', sans-serif" }}>Jährlich (-20%)</button>
            </div>
          </div>
        </div>
      </FadeIn>
      <FadeIn delay={300}>
        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: mob ? 16 : 20 }}>
          <div style={{ padding: mob ? 28 : 40, borderRadius: 16, background: C.card, border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 13, color: C.textMuted, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>Starter</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 8 }}>
              <span style={{ fontSize: 40, fontWeight: 700, color: C.text, fontFamily: "'Playfair Display', Georgia, serif" }}>{annual ? "19" : "24"}</span>
              <span style={{ fontSize: 16, color: C.textMuted }}>€/Monat</span>
            </div>
            {annual && <div style={{ fontSize: 12, color: C.accent, marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>Spare 60€ pro Jahr</div>}
            <div style={{ width: "100%", height: 1, background: C.border, margin: "12px 0" }} />
            {["WhatsApp Bot 24/7", "Automatische Antworten", "Termin-Management", "Sofort-Benachrichtigungen", "Buchhaltung & Übersicht", "1 WhatsApp-Nummer"].map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", fontSize: 14, color: C.textMuted, fontFamily: "'DM Sans', sans-serif" }}>
                <span style={{ color: C.accent }}>✓</span> {f}
              </div>
            ))}
            <a href={DASHBOARD_URL} style={{ display: "block", width: "100%", marginTop: 20, padding: "13px 0", borderRadius: 10, background: "transparent", border: `1px solid ${C.accent}`, color: C.accent, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", textAlign: "center", textDecoration: "none", boxSizing: "border-box" }}>Jetzt starten</a>
          </div>
          <div style={{ padding: mob ? 28 : 40, borderRadius: 16, position: "relative", background: C.card, border: `2px solid ${C.accent}50`, boxShadow: `0 0 60px ${C.accent}10` }}>
            <div style={{ position: "absolute", top: -12, right: 24, padding: "4px 14px", borderRadius: 20, background: `linear-gradient(135deg, ${C.accent}, ${C.accentLight})`, color: "#fff", fontSize: 11, fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>EMPFOHLEN</div>
            <div style={{ fontSize: 13, color: C.accent, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>Pro</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 8 }}>
              <span style={{ fontSize: 40, fontWeight: 700, color: C.text, fontFamily: "'Playfair Display', Georgia, serif" }}>{annual ? "35" : "45"}</span>
              <span style={{ fontSize: 16, color: C.textMuted }}>€/Monat</span>
            </div>
            {annual && <div style={{ fontSize: 12, color: C.accent, marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>Spare 120€ pro Jahr</div>}
            <div style={{ width: "100%", height: 1, background: C.border, margin: "12px 0" }} />
            {["Alles aus Starter", "Prioritäts-Support", "Individuelle Bot-Persönlichkeit", "Statistiken & Auswertungen", "Mehrere WhatsApp-Nummern", "Foto-Versand"].map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", fontSize: 14, color: C.textMuted, fontFamily: "'DM Sans', sans-serif" }}>
                <span style={{ color: C.accent }}>✓</span> {f}
              </div>
            ))}
            <a href={DASHBOARD_URL} style={{ display: "block", width: "100%", marginTop: 20, padding: "13px 0", borderRadius: 10, background: `linear-gradient(135deg, ${C.accent}, ${C.accentLight})`, border: "none", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", textAlign: "center", textDecoration: "none", boxSizing: "border-box" }}>Jetzt starten</a>
          </div>
        </div>
      </FadeIn>
      <FadeIn delay={500}>
        <div style={{ textAlign: "center", marginTop: 24, fontSize: mob ? 12 : 14, color: C.textMuted, fontFamily: "'DM Sans', sans-serif" }}>
          Keine Kreditkarte nötig · Jederzeit kündbar · Aktuell in der Beta-Phase
        </div>
      </FadeIn>
    </section>
  );
}

function FAQ() {
  const { C } = useTheme();
  const mob = useIsMobile();
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: "Was genau macht ServiceReply?", a: "ServiceReply ist ein KI-Bot, der deine WhatsApp-Nachrichten automatisch beantwortet. Er informiert Kunden über deine Preise, Zeiten und Services und kann Termine vereinbaren." },
    { q: "Merken die Kunden, dass es ein Bot ist?", a: "Nein. Der Bot kommuniziert natürlich und persönlich, genau in deinem Stil." },
    { q: "Wie verbinde ich meine WhatsApp-Nummer?", a: "Du scannst einen QR-Code in deinem Dashboard. In weniger als einer Minute ist der Bot aktiv." },
    { q: "Kann ich den Bot jederzeit ausschalten?", a: "Ja! Du kannst den Bot jederzeit über das Dashboard oder per WhatsApp-Nachricht pausieren und wieder aktivieren." },
    { q: "Was passiert bei Terminanfragen?", a: "Der Bot schreibt dir eine Nachricht mit allen Details. Du bestätigst oder lehnst den Termin mit einem Klick im Dashboard ab." },
    { q: "Habe ich eine Übersicht über meine Termine?", a: "Ja! Im Dashboard siehst du alle Termine, Kunden, Umsätze und Statistiken auf einen Blick — deine persönliche Buchhaltung." },
    { q: "Ist meine Privatsphäre geschützt?", a: "Absolut. Deine Daten werden verschlüsselt und niemals an Dritte weitergegeben." },
    { q: "Kann ich den Bot kostenlos testen?", a: "Ja! Wir sind aktuell in der Beta-Phase. Schreib uns eine Nachricht und wir richten deinen Zugang ein." },
    { q: "In welchen Sprachen antwortet der Bot?", a: "Deutsch. Weitere Sprachen kommen bald." },
  ];

  return (
    <section id="faq" style={{
      padding: mob ? "60px 20px" : "100px 48px",
      background: `linear-gradient(180deg, transparent 0%, ${C.bgLight} 20%, ${C.bgLight} 80%, transparent 100%)`,
    }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: mob ? 32 : 48 }}>
            <div style={{ fontSize: 13, color: C.accent, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}>FAQ</div>
            <h2 style={{ fontSize: mob ? 28 : 42, fontWeight: 700, color: C.text, fontFamily: "'Playfair Display', Georgia, serif" }}>Häufige Fragen</h2>
          </div>
        </FadeIn>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {faqs.map((f, i) => (
            <div key={i} onClick={() => setOpen(open === i ? null : i)} style={{
              padding: mob ? "16px 18px" : "20px 24px", borderRadius: 12, cursor: "pointer",
              background: open === i ? C.card : "transparent",
              border: `1px solid ${open === i ? C.accent + "30" : C.border}`, transition: "all 0.3s",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: mob ? 14 : 15, fontWeight: 600, color: open === i ? C.text : C.textMuted, fontFamily: "'DM Sans', sans-serif", paddingRight: 12 }}>{f.q}</span>
                <span style={{ fontSize: 20, color: C.accent, transition: "transform 0.3s", transform: open === i ? "rotate(45deg)" : "none", flexShrink: 0 }}>+</span>
              </div>
              {open === i && <p style={{ fontSize: mob ? 13 : 14, lineHeight: 1.8, color: C.textMuted, marginTop: 12, fontFamily: "'DM Sans', sans-serif" }}>{f.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  const { C } = useTheme();
  const mob = useIsMobile();
  return (
    <section style={{ padding: mob ? "60px 20px" : "100px 48px" }}>
      <FadeIn>
        <div style={{
          maxWidth: 700, margin: "0 auto", textAlign: "center",
          padding: mob ? 32 : 64, borderRadius: mob ? 16 : 24,
          background: `linear-gradient(135deg, ${C.card} 0%, #1a1a28 100%)`,
          border: `1px solid ${C.accent}20`, position: "relative", overflow: "hidden",
        }}>
          <div style={{ display: "inline-block", padding: "4px 12px", borderRadius: 20, background: "rgba(233,69,96,0.15)", border: "1px solid rgba(233,69,96,0.3)", fontSize: 11, color: C.accent, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", marginBottom: 16, letterSpacing: "0.1em" }}>BETA</div>
          <h2 style={{ fontSize: mob ? 26 : 38, fontWeight: 700, color: C.text, marginBottom: 12, fontFamily: "'Playfair Display', Georgia, serif", position: "relative" }}>Bereit loszulegen?</h2>
          <p style={{ fontSize: mob ? 14 : 16, color: C.textMuted, marginBottom: mob ? 24 : 36, fontFamily: "'DM Sans', sans-serif", position: "relative" }}>Sichere dir jetzt deinen kostenlosen Beta-Zugang. Begrenzte Plätze!</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", position: "relative", flexDirection: mob ? "column" : "row", padding: mob ? "0 10px" : 0 }}>
            <a href="mailto:info@servicereply.de?subject=Beta-Zugang anfragen" style={{
              display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 10,
              background: `linear-gradient(135deg, ${C.accent}, ${C.accentLight})`,
              color: "#fff", textDecoration: "none", fontSize: 14, fontWeight: 700,
              fontFamily: "'DM Sans', sans-serif", justifyContent: "center",
            }}>✉️ info@servicereply.de</a>
            <a href="https://wa.me/491794169592?text=Hallo%2C%20ich%20interessiere%20mich%20f%C3%BCr%20ServiceReply" style={{
              display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 10,
              background: "transparent", border: `1px solid ${C.accent}`,
              color: C.accent, textDecoration: "none", fontSize: 14, fontWeight: 700,
              fontFamily: "'DM Sans', sans-serif", justifyContent: "center",
            }}>💬 WhatsApp</a>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

function Footer() {
  const { C } = useTheme();
  const mob = useIsMobile();
  return (
    <footer style={{
      padding: mob ? "24px 20px" : "40px 48px", borderTop: `1px solid ${C.border}`,
      display: "flex", flexDirection: mob ? "column" : "row",
      justifyContent: "space-between", alignItems: "center",
      gap: mob ? 12 : 0, textAlign: mob ? "center" : undefined,
    }}>
      <div style={{ fontSize: 16, fontWeight: 700, color: C.accent, fontFamily: "'Playfair Display', Georgia, serif" }}>ServiceReply</div>
      <div style={{ fontSize: mob ? 11 : 13, color: C.textMuted, fontFamily: "'DM Sans', sans-serif" }}>
        © 2026 ServiceReply · <a href="mailto:info@servicereply.de" style={{ color: C.textMuted, textDecoration: "none" }}>info@servicereply.de</a> · Datenschutz · Impressum
      </div>
    </footer>
  );
}

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const C = isDark ? themes.dark : themes.light;
  const toggle = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ C, toggle, isDark }}>
      <div style={{ minHeight: "100vh", background: C.bg, color: C.text, transition: "background 0.5s, color 0.5s" }}>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <Nav />
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <FAQ />
        <CTA />
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}
