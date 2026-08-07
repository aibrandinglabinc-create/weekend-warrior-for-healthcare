import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import joinHeroImg from "@/assets/join-hero-pod.jpg";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useReveal } from "@/hooks/useReveal";

type ClinicianType = "RN" | "LPN" | "CNA" | "Phlebotomist";

const ROLE_CHIPS: { value: ClinicianType; label: string }[] = [
  { value: "RN", label: "RN" },
  { value: "LPN", label: "LPN" },
  { value: "CNA", label: "CNA" },
  { value: "Phlebotomist", label: "Phlebotomist" },
];

const DAY_CHIPS = [
  { value: "Friday", label: "Fri" },
  { value: "Saturday", label: "Sat" },
  { value: "Sunday", label: "Sun" },
];

const SHIFT_CHIPS = [
  { value: "Days", label: "Days" },
  { value: "Evenings", label: "Evenings" },
  { value: "Nights", label: "Nights" },
];

function roleParamToChip(raw: string | undefined): ClinicianType | null {
  if (!raw) return null;
  const v = raw.toLowerCase();
  if (v === "rn") return "RN";
  if (v === "lpn") return "LPN";
  if (v === "cna") return "CNA";
  if (v === "phlebotomist" || v === "phleb") return "Phlebotomist";
  return null;
}

export const Route = createFileRoute("/join")({
  component: Join,
  validateSearch: (search: Record<string, unknown>): { role?: string } => ({
    role: typeof search.role === "string" ? search.role : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Register · Weekend Warrior" },
      {
        name: "description",
        content:
          "Register as an RN, LPN, CNA, or phlebotomist and join a Weekend Warrior pod. Same facility, same team, every weekend. Two minutes to register.",
      },
      { property: "og:title", content: "Become a Weekend Warrior" },
      {
        property: "og:description",
        content: "Same facility. Same team. Every weekend. Two minutes to register.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/join" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/join" }],
  }),
});

function toggleFaq(e: React.MouseEvent<HTMLButtonElement>) {
  const q = e.currentTarget;
  const item = q.parentElement as HTMLElement;
  const a = item.querySelector(".faq-a") as HTMLElement;
  const open = item.classList.contains("open");
  document.querySelectorAll(".faq-item").forEach((i) => {
    i.classList.remove("open");
    (i.querySelector(".faq-a") as HTMLElement).style.maxHeight = "";
  });
  if (!open) {
    item.classList.add("open");
    a.style.maxHeight = a.scrollHeight + "px";
  }
}

function Join() {
  useReveal();
  const { role } = Route.useSearch();
  const initialRole = useMemo(() => roleParamToChip(role), [role]);

  const [clinicianType, setClinicianType] = useState<ClinicianType | null>(initialRole);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [licenseState, setLicenseState] = useState("");
  const [zip, setZip] = useState("");
  const [days, setDays] = useState<string[]>([]);
  const [shift, setShift] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [roleTouched, setRoleTouched] = useState(false);

  useEffect(() => {
    if (initialRole) {
      const el = document.getElementById("register");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [initialRole]);

  function toggleArrayValue(list: string[], setList: (v: string[]) => void, value: string) {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!clinicianType) {
      setRoleTouched(true);
      document.getElementById("register")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    setStatus("submitting");
    setErrorMsg(null);
    try {
      const endpoint = import.meta.env.VITE_JOIN_WEBHOOK_URL as string | undefined;
      if (!endpoint) throw new Error("Registration is not configured yet. Please try again shortly.");
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clinician_type: clinicianType,
          first_name: firstName,
          last_name: lastName,
          phone,
          email,
          license_state: licenseState,
          zip,
          days,
          shift,
          source: "join_page",
          role_param: role ?? null,
        }),
      });
      if (!res.ok) throw new Error("Something went wrong. Please try again.");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <>
      <Nav variant="worker" />

      {/* ============ HERO ============ */}
      <section className="hero band-dark join" id="top">
        <div className="hero-fallback"></div>
        <img className="hero-bg" src={joinHeroImg} alt="A pod of RNs, LPNs, CNAs, and phlebotomists checking in together for a weekend shift" />
        <div className="hero-overlay"></div>
        <div className="hero-glow"></div>
        <div className="wrap">
          <div className="hero-grid">
            <div className="hg-intro">
              <div className="glow-tag reveal">Now Building Weekend Pods</div>
              <h1 className="display reveal d1">Become a<br /><span className="ital-teal">Weekend Warrior.</span></h1>
              <div className="role-strip lg reveal d1">
                <span>RN</span><span className="rdot">&middot;</span><span>LPN</span><span className="rdot">&middot;</span><span>CNA</span><span className="rdot">&middot;</span><span>Phlebotomist</span>
              </div>
              <div className="role-rule reveal d1"></div>
              <p className="lead reveal d2">Same facility. Same team. Every weekend. You are not a body filling a hole on an app. You are part of a pod that goes back to the same floor, works beside the same people, and gets to know the same residents. Credential once, not at every agency.</p>
              <div className="hg-pills reveal d3">
                <div className="pill-row" style={{ marginTop: 30 }}>
                  <div className="stat-pill">
                    <div className="num">1</div>
                    <div className="lbl">Facility, not five</div>
                  </div>
                  <div className="stat-pill">
                    <div className="num">1x</div>
                    <div className="lbl">Credentialing, done once</div>
                  </div>
                  <div className="stat-pill">
                    <div className="num">2 MIN</div>
                    <div className="lbl">To register</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hg-form reveal d2" id="register">
              {status === "success" ? (
                <div className="reg-card">
                  <div className="reg-confirm">
                    <h3>You Are On The List.</h3>
                    <p>Check your text messages and email for a confirmation. We review registrations against the pods we are building right now. If there is an open seat for your role near you, we will email you a link to set up your login and upload your documents.</p>
                  </div>
                </div>
              ) : (
                <form className="reg-card" onSubmit={handleSubmit}>
                  <span className="card-eyebrow">Registration</span>
                  <h2 className="card-h">Start With Your Role.</h2>
                  <p className="card-sub">Two minutes. No resume required.</p>

                  <div className="field">
                    <span className="field-label">I Am A</span>
                    <div className="chip-grid">
                      {ROLE_CHIPS.slice(0, 3).map((c) => (
                        <div
                          key={c.value}
                          className={`chip${clinicianType === c.value ? " selected" : ""}`}
                          role="radio"
                          aria-checked={clinicianType === c.value}
                          tabIndex={0}
                          onClick={() => { setClinicianType(c.value); setRoleTouched(true); }}
                          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setClinicianType(c.value); setRoleTouched(true); } }}
                        >
                          {c.label}
                        </div>
                      ))}
                      <div
                        className={`chip wide${clinicianType === "Phlebotomist" ? " selected" : ""}`}
                        role="radio"
                        aria-checked={clinicianType === "Phlebotomist"}
                        tabIndex={0}
                        onClick={() => { setClinicianType("Phlebotomist"); setRoleTouched(true); }}
                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setClinicianType("Phlebotomist"); setRoleTouched(true); } }}
                      >
                        Phlebotomist
                      </div>
                    </div>
                    {roleTouched && !clinicianType && (
                      <p style={{ color: "#ffb8b8", fontSize: 11.5, marginTop: 8 }}>Please select your role.</p>
                    )}
                  </div>

                  <div className="field-row">
                    <div>
                      <span className="field-label">First Name</span>
                      <input required value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" />
                    </div>
                    <div>
                      <span className="field-label">Last Name</span>
                      <input required value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" />
                    </div>
                  </div>

                  <div className="field">
                    <span className="field-label">Mobile</span>
                    <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 555-5555" />
                  </div>

                  <div className="field">
                    <span className="field-label">Email</span>
                    <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
                  </div>

                  <div className="field-row">
                    <div>
                      <span className="field-label">License State</span>
                      <input required maxLength={2} value={licenseState} onChange={(e) => setLicenseState(e.target.value.toUpperCase())} placeholder="TX" style={{ textTransform: "uppercase" }} />
                    </div>
                    <div>
                      <span className="field-label">Zip Code</span>
                      <input required inputMode="numeric" maxLength={5} value={zip} onChange={(e) => setZip(e.target.value)} placeholder="75201" />
                    </div>
                  </div>

                  <div className="field">
                    <span className="field-label">Weekends I Can Work</span>
                    <div className="chip-row">
                      {DAY_CHIPS.map((c) => (
                        <div
                          key={c.value}
                          className={`chip${days.includes(c.value) ? " selected" : ""}`}
                          role="checkbox"
                          aria-checked={days.includes(c.value)}
                          tabIndex={0}
                          onClick={() => toggleArrayValue(days, setDays, c.value)}
                          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleArrayValue(days, setDays, c.value); } }}
                        >
                          {c.label}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="field">
                    <span className="field-label">Shift</span>
                    <div className="chip-row">
                      {SHIFT_CHIPS.map((c) => (
                        <div
                          key={c.value}
                          className={`chip${shift.includes(c.value) ? " selected" : ""}`}
                          role="checkbox"
                          aria-checked={shift.includes(c.value)}
                          tabIndex={0}
                          onClick={() => toggleArrayValue(shift, setShift, c.value)}
                          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleArrayValue(shift, setShift, c.value); } }}
                        >
                          {c.label}
                        </div>
                      ))}
                    </div>
                  </div>

                  <button type="submit" className="btn btn-solid reg-submit" disabled={status === "submitting"}>
                    {status === "submitting" ? "Registering…" : "Register"}
                  </button>

                  {status === "error" && (
                    <div className="reg-error">
                      {errorMsg} <a href="#register" onClick={(e) => { e.preventDefault(); handleSubmit(e as unknown as React.FormEvent); }} style={{ textDecoration: "underline" }}>Try again</a>
                    </div>
                  )}

                  <p className="field-fine">
                    Registering does not create an account. We review every registration, and if you match an open pod we email you a link to set up your login and upload your documents. By registering you agree to receive email and text from Weekend Warrior. Reply STOP to opt out.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============ 01 WHY THE POD ============ */}
      <section className="band-dark" id="why">
        <div className="wrap">
          <div className="section-label reveal">
            <span className="n">01</span><span className="rule"></span><span className="cat">Why The Pod</span>
          </div>
          <h2 className="big reveal">Three things a shift app <span className="ital-teal">will never give you.</span></h2>
          <p className="sub reveal d1">Weekend Warrior is not a marketplace. You do not bid on shifts, you do not race a notification, and you do not walk into a building you have never seen. You are placed on a pod, and that pod goes back.</p>
          <div className="steps reveal d2">
            <div className="step">
              <div className="sn">01</div>
              <h3>One floor you actually know</h3>
              <p>The same facility every weekend. You learn the residents, the charting, the med cart, and where the supplies are. By week three you are not orienting, you are working.</p>
            </div>
            <div className="step">
              <div className="sn">02</div>
              <h3>A team, not strangers</h3>
              <p>RNs, LPNs, CNAs, and phlebotomists placed together on purpose. The same people beside you every weekend, so the load is shared by someone who already knows how you work.</p>
            </div>
            <div className="step">
              <div className="sn">03</div>
              <h3>Credential once</h3>
              <p>Upload your license, certifications, ID, and background authorization one time, in one place. The system tracks expirations and tells you before anything lapses. No re-packeting for every agency.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 02 HOW IT WORKS ============ */}
      <section className="band-white" id="how">
        <div className="wrap">
          <div className="section-label reveal">
            <span className="n">02</span><span className="rule"></span><span className="cat">How It Works</span>
          </div>
          <h2 className="big reveal">Register to placed, <span className="ital-teal">in four steps.</span></h2>
          <p className="sub reveal d1">No phone tag, no office visit, no paper packet in the mail.</p>
          <div className="steps four reveal d2">
            <div className="step">
              <div className="sn">01</div>
              <h3>Register</h3>
              <p>The form on this page. Two minutes on your phone. Role, contact, license state, and the weekends you can work.</p>
            </div>
            <div className="step">
              <div className="sn">02</div>
              <h3>We review</h3>
              <p>We check your registration against the pods we are building. If it matches, you get an email with a link to set up your login.</p>
            </div>
            <div className="step">
              <div className="sn">03</div>
              <h3>Upload once</h3>
              <p>License, certifications, ID, background authorization. You upload them yourself, the system checks them, and you see exactly what is cleared.</p>
            </div>
            <div className="step">
              <div className="sn">04</div>
              <h3>Get your pod</h3>
              <p>You are placed with your team at one facility, with your weekend schedule set ahead. Then you show up, to the same place, with the same people.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 03 THE DIFFERENCE ============ */}
      <section className="band-dark" id="difference">
        <div className="wrap">
          <div className="section-label reveal">
            <span className="n">03</span><span className="rule"></span><span className="cat">The Difference</span>
          </div>
          <h2 className="big reveal">Chasing shifts, <span className="ital-teal">or holding a seat.</span></h2>
          <div className="compare-wrap reveal d1">
            <table className="compare">
              <thead>
                <tr><th className="old">Shift Apps and Float Pools</th><th>Weekend Warrior</th></tr>
              </thead>
              <tbody>
                <tr><td className="old">A different building most weekends</td><td className="good">The same one, every weekend</td></tr>
                <tr><td className="old">Strangers on every shift</td><td className="good">Your pod, placed with you on purpose</td></tr>
                <tr><td className="old">Refresh, bid, hope</td><td className="good">Scheduled ahead, no racing an app</td></tr>
                <tr><td className="old">A new packet for every agency</td><td className="good">Uploaded once, tracked for you</td></tr>
                <tr><td className="old">Every single time</td><td className="good">Once, then you know the floor</td></tr>
                <tr><td className="old">A support queue</td><td className="good">Pulse Staffing, one accountable partner</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============ 04 FAQ ============ */}
      <section className="band-dark-2" id="faq">
        <div className="wrap">
          <div className="section-label reveal">
            <span className="n">04</span><span className="rule"></span><span className="cat">Questions</span>
          </div>
          <h2 className="big reveal">Straight <span className="ital-teal">answers.</span></h2>
          <div className="faq">
            <div className="faq-item">
              <button className="faq-q" onClick={toggleFaq}>Do I have to be an RN?</button>
              <div className="faq-a"><p>No. Pods are built from RNs, LPNs, CNAs, and phlebotomists together, because a weekend floor needs all four. Pick your role at the top of the form and you are in the right place.</p></div>
            </div>
            <div className="faq-item">
              <button className="faq-q" onClick={toggleFaq}>Is this full time?</button>
              <div className="faq-a"><p>It is weekend work, built to be weekend work. Fridays, Saturdays, and Sundays, days, evenings, or nights, depending on what your facility needs and what you tell us you can cover. Many Weekend Warriors hold a weekday job and this is the second half of their week.</p></div>
            </div>
            <div className="faq-item">
              <button className="faq-q" onClick={toggleFaq}>What documents will I need?</button>
              <div className="faq-a"><p>Your active license or certification, any required certifications for your role, a photo ID, and authorization to run a background check. You upload them yourself once your login is created, and the system tells you what is still missing and what is close to expiring.</p></div>
            </div>
            <div className="faq-item">
              <button className="faq-q" onClick={toggleFaq}>How fast will I hear back?</button>
              <div className="faq-a"><p>You get a confirmation immediately. We review registrations against the pods we are actively building, so how quickly you are placed depends on whether there is an open seat for your role near your zip code. We keep you on the list either way.</p></div>
            </div>
            <div className="faq-item">
              <button className="faq-q" onClick={toggleFaq}>Do I get to pick my facility?</button>
              <div className="faq-a"><p>You tell us your role, your zip code, and the weekends and shifts you can cover. We build the pod around that. You are placed at one facility rather than rotating, which is the entire point of the model.</p></div>
            </div>
            <div className="faq-item">
              <button className="faq-q" onClick={toggleFaq}>Does registering create an account?</button>
              <div className="faq-a"><p>No. Registering puts you on the list. If you match an open pod, we email you a secure link to set your own password and upload your documents. That is when your login exists.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="final" id="final-cta">
        <svg className="pulse-bg" viewBox="0 0 1440 220" preserveAspectRatio="none" aria-hidden="true">
          <polyline className="ekg-anim" pathLength={1} points="0,112 250,112 302,72 354,154 406,112 690,112 742,54 794,170 846,112 1128,112 1180,78 1232,146 1284,112 1440,112" fill="none" stroke="#FFFFFF" strokeWidth="2"/>
        </svg>
        <div className="wrap">
          <div className="tag reveal">Strategy. Not Staffing.</div>
          <h2 className="reveal d1">Same floor. Same team. Every weekend.</h2>
          <p className="sub reveal d2">RN, LPN, CNA, or phlebotomist. Two minutes to register, and you are on the list for the next pod we build near you.</p>
          <div className="reveal d3"><a href="#register" className="btn btn-white btn-lg">Register</a></div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <Footer
        bottomLine="Weekend Warrior by Pulse Staffing. Equal opportunity. RN, LPN, CNA, and phlebotomist roles."
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
