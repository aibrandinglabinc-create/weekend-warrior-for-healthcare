import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import fullLogo from "@/assets/ww-logo-full.png";

const DEMO_EMAIL = "demo@pulsestaffing.com";
const DEMO_PASSWORD = "weekendwarrior";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Login · Weekend Warrior" },
      { name: "description", content: "Log in to your Weekend Warrior or facility command center account." },
    ],
    links: [{ rel: "canonical", href: "/login" }],
  }),
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setChecking(true);
    setError(null);
    window.setTimeout(() => {
      if (email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
        navigate({ to: "/dashboard" });
        return;
      }
      setChecking(false);
      setError("That email and password combination is not on file. Use the demo credentials below, or contact your Pulse Staffing rep for account access.");
    }, 400);
  }

  return (
    <>
      <Nav variant="facility" />
      <section className="band-dark" style={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
        <div className="wrap" style={{ maxWidth: 440 }}>
          <div className="reg-card">
            <img className="login-logo" src={fullLogo} alt="Weekend Warrior" />
            <span className="card-eyebrow">Account Access</span>
            <h2 className="card-h">Log In.</h2>
            <p className="card-sub">Facility command center or Weekend Warrior portal.</p>

            <form onSubmit={handleSubmit}>
              <div className="field">
                <span className="field-label">Email</span>
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
              </div>
              <div className="field">
                <span className="field-label">Password</span>
                <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="********" />
              </div>
              <button type="submit" className="btn btn-solid reg-submit" disabled={checking}>
                {checking ? "Checking…" : "Log In"}
              </button>
              {error && <div className="reg-error">{error}</div>}
            </form>

            <div className="login-demo-hint">
              <span className="field-label">Facility Demo Access</span>
              <p>Email <b>{DEMO_EMAIL}</b><br />Password <b>{DEMO_PASSWORD}</b></p>
            </div>

            <div style={{ marginTop: 22, paddingTop: 22, borderTop: "1px solid var(--white-20)", display: "flex", flexDirection: "column", gap: 10 }}>
              <a href="/join" style={{ fontSize: 12.5, color: "var(--teal-light)" }}>Not registered yet? Become a Weekend Warrior &rarr;</a>
              <a href="/#book" style={{ fontSize: 12.5, color: "var(--teal-light)" }}>Looking for weekend coverage for your facility? Book a demo &rarr;</a>
            </div>
          </div>
        </div>
      </section>
      <Footer
        bottomLine="© 2026 Pulse Staffing. Weekend Warrior is a Pulse Staffing program."
        columns={[
          {
            heading: "For Warriors",
            links: [
              { label: "Register", href: "/join" },
              { label: "How It Works", href: "/join#how" },
              { label: "Login", href: "/login" },
            ],
          },
          {
            heading: "For Facilities",
            links: [
              { label: "Weekend Warrior", href: "/" },
              { label: "Pricing", href: "/#pricing" },
              { label: "Book a Demo", href: "/#book" },
            ],
          },
        ]}
      />
    </>
  );
}
