import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

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
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <Nav variant="facility" />
      <section className="band-dark" style={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
        <div className="wrap" style={{ maxWidth: 440 }}>
          <div className="reg-card">
            <span className="card-eyebrow">Account Access</span>
            <h2 className="card-h">Log In.</h2>
            <p className="card-sub">Facility command center or Weekend Warrior portal.</p>

            {submitted ? (
              <p style={{ fontSize: 13.5, color: "var(--white-80)", lineHeight: 1.7 }}>
                Login is not active for this account yet. If you are a Weekend Warrior awaiting placement, watch your email and texts for your setup link. If you manage a facility, your Pulse Staffing contact can get you set up.
              </p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
              >
                <div className="field">
                  <span className="field-label">Email</span>
                  <input required type="email" placeholder="you@email.com" />
                </div>
                <div className="field">
                  <span className="field-label">Password</span>
                  <input required type="password" placeholder="********" />
                </div>
                <button type="submit" className="btn btn-solid reg-submit">Log In</button>
              </form>
            )}

            <div style={{ marginTop: 26, paddingTop: 22, borderTop: "1px solid var(--white-20)", display: "flex", flexDirection: "column", gap: 10 }}>
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
