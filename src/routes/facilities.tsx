import { createFileRoute, Link } from "@tanstack/react-router";

import facilitiesHero from "@/assets/facilities-hero-arrival.jpg";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { useReveal } from "@/hooks/useReveal";

const DEMO_LINK = "https://api.aibrandinglabinc.com/widget/bookings/weekend-warrior-demo";


export const Route = createFileRoute("/facilities")({
  component: Facilities,
  head: () => ({
    meta: [
      { title: "Book Your Pod \u00b7 Weekend Warrior for Facilities" },
      {
        name: "description",
        content:
          "Tell us the shape of the weekend you need covered and we build the pod against it. Five minutes to book, no commitment.",
      },
      { property: "og:title", content: "Book Your Pod \u00b7 Weekend Warrior" },
      {
        property: "og:description",
        content:
          "Size your RN pod and your CNA pod, pick your days and shifts, and we assemble the team that comes back every weekend.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/facilities" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/facilities" }],
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

function Facilities() {
  useReveal();


  return (
    <>
      <Nav variant="facilities" />
      <ChatWidget />

      {/* ============ HERO ============ */}
      <section className="hero band-dark" id="top">
        <div className="hero-fallback"></div>
        <img
          className="hero-bg"
          src={facilitiesHero}
          alt="A Director of Nursing greeting a weekend pod of clinicians arriving at her building"
        />
        <div className="hero-overlay"></div>
        <div className="hero-glow"></div>
        <div className="wrap">
          <div className="hero-grid">
            <div className="hg-intro">
              <div className="glow-tag reveal">For Facilities</div>
              <h1 className="display reveal d1">Book your<br /><span className="ital-teal">pod.</span></h1>
              <div className="role-strip lg reveal d1">
                <span>RN Pod</span><span className="rdot">&middot;</span><span>CNA Pod</span>
              </div>
              <div className="role-rule reveal d1"></div>
              <p className="lead reveal d2">Five minutes. Tell us the shape of the weekend you need covered and we build the pod against it. How many, which days, which shifts, which floor. You are not choosing people off a list. You are telling us what the weekend requires, and we assemble the team that comes back to you every weekend.</p>
            </div>

            <div className="hg-form reveal d2" id="book">
              <div className="reg-card">
                <span className="card-eyebrow">Pod Booking</span>
                <h2 className="card-h">Start here.</h2>
                <p className="card-sub">Six short questions about your building, your pods, and your weekend. About five minutes, and no commitment.</p>
                <Link to="/book" className="btn btn-solid reg-submit">Start Here</Link>
                <p className="field-fine">
                  Booking your pod does not create an account and does not commit you to anything. We build a pod against what you book, then walk you through it on a fifteen minute call with your number.
                </p>
              </div>
            </div>


            <div className="hg-pills">
              <div className="kpi-row reveal d4">
                <div className="kpi">
                  <div className="num">5 min</div>
                  <div className="lbl">To book</div>
                </div>
                <div className="kpi">
                  <div className="num">1</div>
                  <div className="lbl">Pod, the same faces</div>
                </div>
                <div className="kpi">
                  <div className="num">0</div>
                  <div className="lbl">Weekends spent re-booking</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 01 WHAT HAPPENS NEXT ============ */}
      <section className="band-dark" id="next">
        <div className="wrap">
          <div className="section-label reveal">
            <span className="n">01</span><span className="rule"></span><span className="cat">What Happens Next</span>
          </div>
          <h2 className="big reveal">You book it. <span className="ital-teal">We curate it.</span></h2>
          <p className="sub reveal d1">Most staffing calls start with a stranger asking you to describe your building. This one does not. Your pod is curated against the specifications you book.</p>
          <div className="steps reveal d2">
            <div className="step">
              <div className="sn">01</div>
              <h3>You book your pod</h3>
              <p>Five minutes on this form. The size of each pod, the days, the shifts, and anything specific about your floor.</p>
            </div>
            <div className="step">
              <div className="sn">02</div>
              <h3>We curate your pod</h3>
              <p>Your pod is curated against your specifications from Warriors who are already credentialed and cleared, in your area, available on those weekends.</p>
            </div>
            <div className="step">
              <div className="sn">03</div>
              <h3>You get your number</h3>
              <p>One subscription price built to your facility. You decide. No obligation on either side.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 02 THE MODEL ============ */}
      <section className="band-white" id="model">
        <div className="wrap">
          <div className="section-label reveal">
            <span className="n">02</span><span className="rule"></span><span className="cat">The Model</span>
          </div>
          <h2 className="big reveal">A team, <span className="ital-teal">not a list of names.</span></h2>
          <div className="compare-wrap reveal d1">
            <table className="compare">
              <thead>
                <tr><th className="old">Agency and Shift Apps</th><th>Weekend Warrior</th></tr>
              </thead>
              <tbody>
                <tr><td className="old">Whoever accepted the shift</td><td className="good">The same pod, every weekend</td></tr>
                <tr><td className="old">Re-posted every single weekend</td><td className="good">One subscription, coverage recurs</td></tr>
                <tr><td className="old">Every new face, every time</td><td className="good">Once, then they know your floor</td></tr>
                <tr><td className="old">Your problem to verify</td><td className="good">Verified and cleared before placement</td></tr>
                <tr><td className="old">Your charge nurse works the phone</td><td className="good">Filled from inside the pod model</td></tr>
                <tr><td className="old">A rotating cast of vendors</td><td className="good">Pulse Staffing, one partner</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============ 03 FAQ ============ */}
      <section className="band-dark-2" id="facility-faq">
        <div className="wrap">
          <div className="section-label reveal">
            <span className="n">03</span><span className="rule"></span><span className="cat">Questions</span>
          </div>
          <h2 className="big reveal">Straight <span className="ital-teal">answers.</span></h2>
          <div className="faq">
            <div className="faq-item">
              <button className="faq-q" onClick={toggleFaq}>Do I pick the individual clinicians?</button>
              <div className="faq-a"><p>No, and that is deliberate. You tell us the composition your weekend needs and we assemble the team. Choosing a shape rather than choosing people is what lets the same pod come back to you every weekend instead of turning into a marketplace you have to re-shop.</p></div>
            </div>
            <div className="faq-item">
              <button className="faq-q" onClick={toggleFaq}>What if I only need CNAs?</button>
              <div className="faq-a"><p>That is common. Set the RN pod to none and size the CNA pod. Plenty of buildings have a CNA gap and no RN gap, or the reverse.</p></div>
            </div>
            <div className="faq-item">
              <button className="faq-q" onClick={toggleFaq}>What does 11 or more mean?</button>
              <div className="faq-a"><p>Anything above ten is sized to your building specifically. Book the requirement and we scope it on the call.</p></div>
            </div>
            <div className="faq-item">
              <button className="faq-q" onClick={toggleFaq}>How is it priced?</button>
              <div className="faq-a"><p>One monthly subscription built from your facility profile. No hourly bill rates, no overtime premiums, no agency markup. The pod sizes you select on this form carry their subscription price, and the total is confirmed with you on the call.</p></div>
            </div>
            <div className="faq-item">
              <button className="faq-q" onClick={toggleFaq}>What if my needs change?</button>
              <div className="faq-a"><p>Change requests run through your portal once you are live. The pod composition can be adjusted, and coverage stays scheduled ahead either way.</p></div>
            </div>
            <div className="faq-item">
              <button className="faq-q" onClick={toggleFaq}>Am I committing to anything by booking?</button>
              <div className="faq-a"><p>No. Booking tells us what to build. You see the pod and the number before anything is signed.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="final" id="final-cta">
        <svg className="pulse-bg" viewBox="0 0 1440 220" preserveAspectRatio="none" aria-hidden="true">
          <polyline className="ekg-anim" pathLength={1} points="0,112 250,112 302,72 354,154 406,112 690,112 742,54 794,170 846,112 1128,112 1180,78 1232,146 1284,112 1440,112" fill="none" stroke="#FFFFFF" strokeWidth="2" />
        </svg>
        <div className="wrap">
          <div className="tag reveal">Strategy. Not Staffing.</div>
          <h2 className="reveal d1">Give your weekend a team it can keep.</h2>
          <p className="sub reveal d2">Five minutes to book. We build the pod, you meet it, and you decide.</p>
          <div className="reveal d3"><Link to="/book" className="btn btn-white btn-lg">Book Your Pod</Link></div>
        </div>
      </section>

      <Footer
        bottomLine="Weekend Warrior by Pulse Staffing. Weekend pods for facilities."
        columns={[
          {
            heading: "For Facilities",
            links: [
              { label: "Book Your Pod", href: "/facilities" },
              { label: "Weekend Warrior", href: "/" },
              { label: "Book a Demo", href: DEMO_LINK },
            ],
          },
          {
            heading: "For Warriors",
            links: [
              { label: "Register", href: "/join" },
              { label: "How It Works", href: "/join#steps" },
              { label: "Login", href: "/login" },
            ],
          },
        ]}
      />
    </>
  );
}
