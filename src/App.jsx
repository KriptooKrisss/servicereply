import { useState, useEffect, createContext, useContext } from "react";

const themes = {
  dark: {
    bg: "#08080d",
    bgLight: "#0e0e16",
    card: "#12121c",
    accent: "#c9a24e",
    accentLight: "#dbb96a",
    accentGlow: "rgba(201,162,78,0.12)",
    text: "#ede9e0",
    textMuted: "#7a756d",
    border: "#1e1e2a",
    white: "#ffffff",
    navBg: "rgba(8,8,13,0.85)",
    inputBg: "#0e0e16",
  },
  light: {
    bg: "#f5f2ed",
    bgLight: "#ebe7e0",
    card: "#ffffff",
    accent: "#b8892e",
    accentLight: "#c99a3f",
    accentGlow: "rgba(184,137,46,0.1)",
    text: "#1a1a1a",
    textMuted: "#6b6560",
    border: "#ddd8d0",
    white: "#ffffff",
    navBg: "rgba(245,242,237,0.9)",
    inputBg: "#f0ece5",
  },
};

const ThemeContext = createContext();
const useTheme = () => useContext(ThemeContext);

function FadeIn({ children, delay = 0, style = {} }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(30px)",
      transition: "opacity 0.8s ease, transform 0.8s ease",
      ...style,
    }}>
      {children}
    </div>
  );
}

function Nav() {
  const { C, toggle, isDark } = useTheme();
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "18px 48px",
      background: C.navBg,
      backdropFilter: "blur(20px)",
      borderBottom: `1px solid ${C.border}`,
      display: "flex", justifyContent: "space-between", alignItems: "center",
    }}>
      <div style={{
        fontSize: 22, fontWeight: 700, color: C.accent,
        letterSpacing: "0.03em",
        fontFamily: "'Playfair Display', Georgia, serif",
      }}>
        ServiceReply
      </div>
      <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
        {["Funktionen", "So gehts", "Preise", "FAQ"].map(item => (
          <a key={item} href={`#${item.toLowerCase().replace(/\s/g,'')}`} style={{
            color: C.textMuted, textDecoration: "none", fontSize: 14,
            fontWeight: 500, transition: "color 0.3s",
            fontFamily: "'DM Sans', sans-serif",
          }}
          onMouseOver={e => e.target.style.color = C.accent}
          onMouseOut={e => e.target.style.color = C.textMuted}
          >{item}</a>
        ))}
        <div
          onClick={toggle}
          style={{
            width: 44, height: 24, borderRadius: 12, cursor: "pointer",
            background: isDark ? C.border : C.accent,
            position: "relative", transition: "background 0.3s",
            display: "flex", alignItems: "center",
          }}
          title={isDark ? "Light Mode" : "Dark Mode"}
        >
          <div style={{
            width: 18, height: 18, borderRadius: "50%",
            background: isDark ? "#333" : "#fff",
            position: "absolute",
            left: isDark ? 3 : 23,
            transition: "left 0.3s",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 10,
          }}>
            {isDark ? "🌙" : "☀️"}
          </div>
        </div>
        <a href="#start" style={{
          padding: "10px 24px", borderRadius: 8,
          background: `linear-gradient(135deg, ${C.accent}, ${C.accentLight})`,
          color: "#0a0a0f", textDecoration: "none", fontSize: 13,
          fontWeight: 700, letterSpacing: "0.03em",
          fontFamily: "'DM Sans', sans-serif",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseOver={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 30px rgba(201,162,78,0.25)"; }}
        onMouseOut={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "none"; }}
        >Jetzt starten</a>
      </div>
    </nav>
  );
}

function Hero() {
  const { C } = useTheme();
  return (
    <section style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      textAlign: "center", padding: "120px 24px 80px",
      position: "relative", overflow: "hidden",
    }}>
      {/* Background glow */}
      <div style={{
        position: "absolute", top: "20%", left: "50%", transform: "translate(-50%, -50%)",
        width: 600, height: 600, borderRadius: "50%",
        background: `radial-gradient(circle, rgba(201,162,78,0.08) 0%, transparent 70%)`,
        filter: "blur(60px)", pointerEvents: "none",
      }} />
      
      <div style={{ position: "relative", maxWidth: 720 }}>
        <FadeIn delay={200}>
          <div style={{
            display: "inline-block", padding: "6px 18px", borderRadius: 20,
            background: C.accentGlow, border: `1px solid ${C.accent}30`,
            fontSize: 13, color: C.accent, fontWeight: 600, marginBottom: 28,
            fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.05em",
          }}>
            ✨ Dein KI-Assistent für WhatsApp
          </div>
        </FadeIn>

        <FadeIn delay={400}>
          <h1 style={{
            fontSize: 62, fontWeight: 700, lineHeight: 1.1,
            color: C.text, marginBottom: 24,
            fontFamily: "'Playfair Display', Georgia, serif",
          }}>
            Deine Kunden schreiben.
            <br />
            <span style={{ color: C.accent }}>Dein Bot antwortet.</span>
          </h1>
        </FadeIn>

        <FadeIn delay={600}>
          <p style={{
            fontSize: 18, lineHeight: 1.7, color: C.textMuted,
            maxWidth: 540, margin: "0 auto 40px",
            fontFamily: "'DM Sans', sans-serif",
          }}>
            ServiceReply übernimmt deine WhatsApp-Kommunikation — 
            beantwortet Fragen, vereinbart Termine und informiert dich 
            in Echtzeit. 24/7, professionell und diskret.
          </p>
        </FadeIn>

        <FadeIn delay={800}>
          <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
            <a href="#start" style={{
              padding: "16px 40px", borderRadius: 10,
              background: `linear-gradient(135deg, ${C.accent}, ${C.accentLight})`,
              color: "#0a0a0f", textDecoration: "none", fontSize: 16,
              fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseOver={e => { e.target.style.transform = "translateY(-3px)"; e.target.style.boxShadow = "0 12px 40px rgba(201,162,78,0.3)"; }}
            onMouseOut={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "none"; }}
            >
              Kostenlos testen
            </a>
            <a href="#sogehts" style={{
              padding: "16px 40px", borderRadius: 10,
              background: "transparent",
              border: `1px solid ${C.border}`,
              color: C.textMuted, textDecoration: "none", fontSize: 16,
              fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
              transition: "all 0.3s",
            }}
            onMouseOver={e => { e.target.style.borderColor = C.accent; e.target.style.color = C.accent; }}
            onMouseOut={e => { e.target.style.borderColor = C.border; e.target.style.color = C.textMuted; }}
            >
              So funktioniert's →
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={1000}>
          <div style={{
            display: "flex", justifyContent: "center", gap: 40, marginTop: 60,
            fontFamily: "'DM Sans', sans-serif",
          }}>
            {[
              { num: "24/7", label: "Erreichbar" },
              { num: "<3s", label: "Antwortzeit" },
              { num: "100%", label: "Diskret" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: C.accent }}>{s.num}</div>
                <div style={{ fontSize: 12, color: C.textMuted, marginTop: 4, letterSpacing: "0.05em" }}>{s.label}</div>
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
  const features = [
    {
      icon: "💬",
      title: "Automatische Antworten",
      desc: "Dein Bot beantwortet Kundenanfragen sofort — Preise, Zeiten, Services. Alles automatisch, natürlich und freundlich.",
    },
    {
      icon: "📅",
      title: "Termin-Management",
      desc: "Kunden buchen Termine direkt über WhatsApp. Du bestätigst mit einem Klick. Kein Chaos, kein Vergessen.",
    },
    {
      icon: "🔔",
      title: "Sofort-Benachrichtigung",
      desc: "Bei jedem neuen Termin wirst du sofort informiert. Bestätige oder lehne ab — alles über WhatsApp.",
    },
    {
      icon: "⏸️",
      title: "Volle Kontrolle",
      desc: "Pausiere den Bot jederzeit und übernimm selbst. Aktiviere ihn wieder, wenn du möchtest.",
    },
    {
      icon: "🎨",
      title: "Dein Stil",
      desc: "Passe den Kommunikationsstil an — flirty, professionell oder zurückhaltend. Dein Bot, deine Regeln.",
    },
    {
      icon: "🔒",
      title: "100% Diskret",
      desc: "Deine Daten bleiben bei dir. Keine Weitergabe, keine Werbung. Maximale Privatsphäre garantiert.",
    },
  ];

  return (
    <section id="funktionen" style={{ padding: "100px 48px", maxWidth: 1100, margin: "0 auto" }}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{
            fontSize: 13, color: C.accent, fontWeight: 600, letterSpacing: "0.15em",
            textTransform: "uppercase", marginBottom: 12,
            fontFamily: "'DM Sans', sans-serif",
          }}>Funktionen</div>
          <h2 style={{
            fontSize: 42, fontWeight: 700, color: C.text,
            fontFamily: "'Playfair Display', Georgia, serif",
          }}>
            Alles was du brauchst
          </h2>
        </div>
      </FadeIn>

      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20,
      }}>
        {features.map((f, i) => (
          <FadeIn key={i} delay={200 + i * 100}>
            <div style={{
              padding: 32, borderRadius: 16,
              background: C.card, border: `1px solid ${C.border}`,
              transition: "all 0.3s", cursor: "default", height: "100%",
            }}
            onMouseOver={e => {
              e.currentTarget.style.borderColor = C.accent + "40";
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.3)";
            }}
            onMouseOut={e => {
              e.currentTarget.style.borderColor = C.border;
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "none";
            }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: C.accentGlow, display: "flex",
                alignItems: "center", justifyContent: "center",
                fontSize: 24, marginBottom: 20,
              }}>
                {f.icon}
              </div>
              <h3 style={{
                fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 10,
                fontFamily: "'Playfair Display', Georgia, serif",
              }}>{f.title}</h3>
              <p style={{
                fontSize: 14, lineHeight: 1.7, color: C.textMuted,
                fontFamily: "'DM Sans', sans-serif",
              }}>{f.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const { C } = useTheme();
  const steps = [
    {
      num: "01",
      title: "Registriere dich",
      desc: "Erstelle dein Konto in 2 Minuten. Gib deine Daten ein — Name, Preise, Zeiten, Services.",
    },
    {
      num: "02",
      title: "Verbinde WhatsApp",
      desc: "Scanne einen QR-Code und dein Bot ist sofort aktiv. Keine App-Installation nötig.",
    },
    {
      num: "03",
      title: "Lehne dich zurück",
      desc: "Dein Bot übernimmt die Kommunikation. Du wirst bei Terminen benachrichtigt und bestätigst mit #da oder #ne.",
    },
  ];

  return (
    <section id="sogehts" style={{
      padding: "100px 48px",
      background: `linear-gradient(180deg, transparent 0%, ${C.bgLight} 20%, ${C.bgLight} 80%, transparent 100%)`,
    }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{
              fontSize: 13, color: C.accent, fontWeight: 600, letterSpacing: "0.15em",
              textTransform: "uppercase", marginBottom: 12,
              fontFamily: "'DM Sans', sans-serif",
            }}>So gehts</div>
            <h2 style={{
              fontSize: 42, fontWeight: 700, color: C.text,
              fontFamily: "'Playfair Display', Georgia, serif",
            }}>
              In 3 Schritten startklar
            </h2>
          </div>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {steps.map((s, i) => (
            <FadeIn key={i} delay={200 + i * 150}>
              <div style={{
                display: "flex", gap: 32, alignItems: "center",
                padding: 36, borderRadius: 16,
                background: C.card, border: `1px solid ${C.border}`,
                transition: "border-color 0.3s",
              }}
              onMouseOver={e => e.currentTarget.style.borderColor = C.accent + "40"}
              onMouseOut={e => e.currentTarget.style.borderColor = C.border}
              >
                <div style={{
                  fontSize: 48, fontWeight: 800, color: C.accent + "25",
                  fontFamily: "'Playfair Display', Georgia, serif",
                  minWidth: 80, textAlign: "center",
                }}>
                  {s.num}
                </div>
                <div>
                  <h3 style={{
                    fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 8,
                    fontFamily: "'Playfair Display', Georgia, serif",
                  }}>{s.title}</h3>
                  <p style={{
                    fontSize: 15, lineHeight: 1.7, color: C.textMuted,
                    fontFamily: "'DM Sans', sans-serif",
                  }}>{s.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Video placeholder */}
        <FadeIn delay={700}>
          <div style={{
            marginTop: 48, padding: 48, borderRadius: 16, textAlign: "center",
            background: C.card, border: `1px dashed ${C.border}`,
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🎬</div>
            <div style={{
              fontSize: 18, color: C.textMuted, fontFamily: "'DM Sans', sans-serif",
            }}>
              Demo-Video kommt bald
            </div>
            <div style={{
              fontSize: 13, color: C.textMuted + "80", marginTop: 8,
              fontFamily: "'DM Sans', sans-serif",
            }}>
              Hier siehst du bald, wie ServiceReply in Aktion funktioniert
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Pricing() {
  const { C } = useTheme();
  const [annual, setAnnual] = useState(true);

  return (
    <section id="preise" style={{ padding: "100px 48px", maxWidth: 900, margin: "0 auto" }}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{
            fontSize: 13, color: C.accent, fontWeight: 600, letterSpacing: "0.15em",
            textTransform: "uppercase", marginBottom: 12,
            fontFamily: "'DM Sans', sans-serif",
          }}>Preise</div>
          <h2 style={{
            fontSize: 42, fontWeight: 700, color: C.text, marginBottom: 16,
            fontFamily: "'Playfair Display', Georgia, serif",
          }}>
            Einfach & transparent
          </h2>

          <div style={{
            display: "inline-flex", borderRadius: 10, overflow: "hidden",
            border: `1px solid ${C.border}`, marginTop: 8,
          }}>
            <button onClick={() => setAnnual(false)} style={{
              padding: "10px 24px", border: "none", cursor: "pointer",
              fontSize: 13, fontWeight: 600,
              background: !annual ? C.accent : "transparent",
              color: !annual ? "#0a0a0f" : C.textMuted,
              fontFamily: "'DM Sans', sans-serif",
            }}>Monatlich</button>
            <button onClick={() => setAnnual(true)} style={{
              padding: "10px 24px", border: "none", cursor: "pointer",
              fontSize: 13, fontWeight: 600,
              background: annual ? C.accent : "transparent",
              color: annual ? "#0a0a0f" : C.textMuted,
              fontFamily: "'DM Sans', sans-serif",
            }}>Jährlich (-20%)</button>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={300}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20,
        }}>
          {/* Starter */}
          <div style={{
            padding: 40, borderRadius: 16,
            background: C.card, border: `1px solid ${C.border}`,
          }}>
            <div style={{
              fontSize: 13, color: C.textMuted, fontWeight: 600,
              letterSpacing: "0.1em", textTransform: "uppercase",
              marginBottom: 16, fontFamily: "'DM Sans', sans-serif",
            }}>Starter</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 8 }}>
              <span style={{
                fontSize: 48, fontWeight: 700, color: C.text,
                fontFamily: "'Playfair Display', Georgia, serif",
              }}>{annual ? "39" : "49"}</span>
              <span style={{ fontSize: 18, color: C.textMuted }}>€/Monat</span>
            </div>
            {annual && (
              <div style={{ fontSize: 12, color: C.accent, marginBottom: 20, fontFamily: "'DM Sans', sans-serif" }}>
                Spare 120€ pro Jahr
              </div>
            )}
            <div style={{
              width: "100%", height: 1, background: C.border, margin: "20px 0",
            }} />
            {["WhatsApp Bot", "Automatische Antworten", "Termin-Management", "Benachrichtigungen", "1 WhatsApp-Nummer"].map((f, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "8px 0", fontSize: 14, color: C.textMuted,
                fontFamily: "'DM Sans', sans-serif",
              }}>
                <span style={{ color: C.accent }}>✓</span> {f}
              </div>
            ))}
            <button style={{
              width: "100%", marginTop: 24, padding: "14px 0", borderRadius: 10,
              background: "transparent", border: `1px solid ${C.accent}`,
              color: C.accent, fontSize: 14, fontWeight: 700, cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", transition: "all 0.3s",
            }}
            onMouseOver={e => { e.target.style.background = C.accentGlow; }}
            onMouseOut={e => { e.target.style.background = "transparent"; }}
            >
              Jetzt starten
            </button>
          </div>

          {/* Pro */}
          <div style={{
            padding: 40, borderRadius: 16, position: "relative",
            background: C.card,
            border: `2px solid ${C.accent}50`,
            boxShadow: `0 0 60px ${C.accent}10`,
          }}>
            <div style={{
              position: "absolute", top: -12, right: 24,
              padding: "4px 14px", borderRadius: 20,
              background: `linear-gradient(135deg, ${C.accent}, ${C.accentLight})`,
              color: "#0a0a0f", fontSize: 11, fontWeight: 700,
              fontFamily: "'DM Sans', sans-serif",
            }}>EMPFOHLEN</div>

            <div style={{
              fontSize: 13, color: C.accent, fontWeight: 600,
              letterSpacing: "0.1em", textTransform: "uppercase",
              marginBottom: 16, fontFamily: "'DM Sans', sans-serif",
            }}>Pro</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 8 }}>
              <span style={{
                fontSize: 48, fontWeight: 700, color: C.text,
                fontFamily: "'Playfair Display', Georgia, serif",
              }}>{annual ? "69" : "89"}</span>
              <span style={{ fontSize: 18, color: C.textMuted }}>€/Monat</span>
            </div>
            {annual && (
              <div style={{ fontSize: 12, color: C.accent, marginBottom: 20, fontFamily: "'DM Sans', sans-serif" }}>
                Spare 240€ pro Jahr
              </div>
            )}
            <div style={{
              width: "100%", height: 1, background: C.border, margin: "20px 0",
            }} />
            {[
              "Alles aus Starter",
              "Prioritäts-Support",
              "Individuelle Bot-Persönlichkeit",
              "Statistiken & Auswertungen",
              "Mehrere WhatsApp-Nummern",
              "Foto-Versand",
            ].map((f, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "8px 0", fontSize: 14, color: C.textMuted,
                fontFamily: "'DM Sans', sans-serif",
              }}>
                <span style={{ color: C.accent }}>✓</span> {f}
              </div>
            ))}
            <button style={{
              width: "100%", marginTop: 24, padding: "14px 0", borderRadius: 10,
              background: `linear-gradient(135deg, ${C.accent}, ${C.accentLight})`,
              border: "none",
              color: "#0a0a0f", fontSize: 14, fontWeight: 700, cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", transition: "all 0.3s",
            }}
            onMouseOver={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = `0 8px 30px rgba(201,162,78,0.3)`; }}
            onMouseOut={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "none"; }}
            >
              Jetzt starten
            </button>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={500}>
        <div style={{
          textAlign: "center", marginTop: 32, fontSize: 14, color: C.textMuted,
          fontFamily: "'DM Sans', sans-serif",
        }}>
          💳 Keine Kreditkarte nötig · Jederzeit kündbar · 7 Tage kostenlos testen
        </div>
      </FadeIn>
    </section>
  );
}

function FAQ() {
  const { C } = useTheme();
  const [open, setOpen] = useState(null);

  const faqs = [
    {
      q: "Was genau macht ServiceReply?",
      a: "ServiceReply ist ein KI-Bot, der deine WhatsApp-Nachrichten automatisch beantwortet. Er informiert Kunden über deine Preise, Zeiten und Services und kann Termine vereinbaren — alles auf natürliche, freundliche Weise.",
    },
    {
      q: "Merken die Kunden, dass es ein Bot ist?",
      a: "Nein. Der Bot kommuniziert natürlich und persönlich, genau in deinem Stil. Die Antworten klingen wie von dir geschrieben — mit Emojis, deinem Tonfall und deiner Persönlichkeit.",
    },
    {
      q: "Wie verbinde ich meine WhatsApp-Nummer?",
      a: "Ganz einfach: Du scannst einen QR-Code in deinem Dashboard. In weniger als einer Minute ist der Bot aktiv und bereit.",
    },
    {
      q: "Kann ich den Bot jederzeit ausschalten?",
      a: "Ja! Schreibe einfach #pauza und der Bot pausiert sofort. Du übernimmst selbst. Mit #aktivno startet er wieder. Du hast immer die volle Kontrolle.",
    },
    {
      q: "Was passiert bei Terminanfragen?",
      a: "Wenn ein Kunde einen Termin möchte, schreibt der Bot dir eine Nachricht mit allen Details. Du antwortest mit #da (bestätigen) oder #ne (ablehnen). Der Kunde wird automatisch informiert.",
    },
    {
      q: "Ist meine Privatsphäre geschützt?",
      a: "Absolut. Deine Daten und Gespräche werden verschlüsselt gespeichert und niemals an Dritte weitergegeben. Datenschutz hat bei uns höchste Priorität.",
    },
    {
      q: "Kann ich den Bot kostenlos testen?",
      a: "Ja! Du bekommst 7 Tage kostenlos zum Testen. Keine Kreditkarte nötig. Wenn du zufrieden bist, wähle einfach einen Plan.",
    },
    {
      q: "In welchen Sprachen antwortet der Bot?",
      a: "Der Bot antwortet auf Deutsch. Weitere Sprachen (Englisch, Spanisch, Rumänisch etc.) werden bald verfügbar sein.",
    },
  ];

  return (
    <section id="faq" style={{
      padding: "100px 48px",
      background: `linear-gradient(180deg, transparent 0%, ${C.bgLight} 20%, ${C.bgLight} 80%, transparent 100%)`,
    }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{
              fontSize: 13, color: C.accent, fontWeight: 600, letterSpacing: "0.15em",
              textTransform: "uppercase", marginBottom: 12,
              fontFamily: "'DM Sans', sans-serif",
            }}>FAQ</div>
            <h2 style={{
              fontSize: 42, fontWeight: 700, color: C.text,
              fontFamily: "'Playfair Display', Georgia, serif",
            }}>
              Häufige Fragen
            </h2>
          </div>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {faqs.map((f, i) => (
            <FadeIn key={i} delay={100 + i * 50}>
              <div
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  padding: "20px 24px", borderRadius: 12, cursor: "pointer",
                  background: open === i ? C.card : "transparent",
                  border: `1px solid ${open === i ? C.accent + "30" : C.border}`,
                  transition: "all 0.3s",
                }}
              >
                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <span style={{
                    fontSize: 15, fontWeight: 600, color: open === i ? C.text : C.textMuted,
                    fontFamily: "'DM Sans', sans-serif", transition: "color 0.3s",
                  }}>{f.q}</span>
                  <span style={{
                    fontSize: 20, color: C.accent, transition: "transform 0.3s",
                    transform: open === i ? "rotate(45deg)" : "none",
                  }}>+</span>
                </div>
                {open === i && (
                  <p style={{
                    fontSize: 14, lineHeight: 1.8, color: C.textMuted,
                    marginTop: 12, fontFamily: "'DM Sans', sans-serif",
                  }}>{f.a}</p>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  const { C } = useTheme();
  return (
    <section id="start" style={{ padding: "100px 48px" }}>
      <FadeIn>
        <div style={{
          maxWidth: 700, margin: "0 auto", textAlign: "center",
          padding: 64, borderRadius: 24,
          background: `linear-gradient(135deg, ${C.card} 0%, #1a1a28 100%)`,
          border: `1px solid ${C.accent}20`,
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: -40, right: -40,
            width: 200, height: 200, borderRadius: "50%",
            background: `radial-gradient(circle, ${C.accent}10 0%, transparent 70%)`,
            filter: "blur(40px)", pointerEvents: "none",
          }} />

          <h2 style={{
            fontSize: 38, fontWeight: 700, color: C.text, marginBottom: 16,
            fontFamily: "'Playfair Display', Georgia, serif",
            position: "relative",
          }}>
            Bereit loszulegen?
          </h2>
          <p style={{
            fontSize: 16, color: C.textMuted, marginBottom: 36,
            fontFamily: "'DM Sans', sans-serif",
            position: "relative",
          }}>
            Teste ServiceReply 7 Tage kostenlos. Keine Kreditkarte nötig.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", position: "relative" }}>
            <input
              placeholder="Deine E-Mail-Adresse"
              style={{
                padding: "14px 20px", borderRadius: 10, width: 280,
                background: C.bgLight, border: `1px solid ${C.border}`,
                color: C.text, fontSize: 14, outline: "none",
                fontFamily: "'DM Sans', sans-serif",
              }}
            />
            <button style={{
              padding: "14px 32px", borderRadius: 10,
              background: `linear-gradient(135deg, ${C.accent}, ${C.accentLight})`,
              border: "none", color: "#0a0a0f", fontSize: 14,
              fontWeight: 700, cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseOver={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = `0 8px 30px rgba(201,162,78,0.3)`; }}
            onMouseOut={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "none"; }}
            >
              Kostenlos starten →
            </button>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

function Footer() {
  const { C } = useTheme();
  return (
    <footer style={{
      padding: "40px 48px", borderTop: `1px solid ${C.border}`,
      display: "flex", justifyContent: "space-between", alignItems: "center",
    }}>
      <div style={{
        fontSize: 16, fontWeight: 700, color: C.accent,
        fontFamily: "'Playfair Display', Georgia, serif",
      }}>
        ServiceReply
      </div>
      <div style={{
        fontSize: 13, color: C.textMuted,
        fontFamily: "'DM Sans', sans-serif",
      }}>
        © 2026 ServiceReply · Datenschutz · Impressum · Kontakt
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
      <div style={{
        minHeight: "100vh",
        background: C.bg,
        color: C.text,
        transition: "background 0.5s, color 0.5s",
      }}>
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
