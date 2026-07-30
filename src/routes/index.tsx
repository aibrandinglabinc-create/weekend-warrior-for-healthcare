import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import heroImg from "@/assets/hero-pod-corridor.jpg";
import podImg from "@/assets/pod-don-arrival.jpg";
import avatarNurseA from "@/assets/avatar-nurse-a.jpg";
import avatarNurseB from "@/assets/avatar-nurse-b.jpg";
import PulseCareDashboard from "@/components/PulseCareDashboard";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Weekend Warrior \u00b7 Strategy. Not Staffing." },
      {
        name: "description",
        content:
          "The same credentialed nursing pod in your facility every weekend, on one subscription. Coverage locked weeks ahead.",
      },
      { property: "og:title", content: "Weekend Warrior \u00b7 Strategy. Not Staffing." },
      {
        property: "og:description",
        content:
          "A dedicated weekend nursing pod, credentialed once and back every Friday. One predictable monthly subscription.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
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

function Index() {
  useEffect(() => {
    const nav = document.getElementById("nav");
    const onScroll = () => nav?.classList.toggle("scrolled", window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    const photos = [...document.querySelectorAll<HTMLElement>(".photo")];
    const onParallax = () => {
      const vh = window.innerHeight;
      photos.forEach((p) => {
        const r = p.getBoundingClientRect();
        if (r.bottom > 0 && r.top < vh) {
          const off = (r.top + r.height / 2 - vh / 2) / vh;
          p.style.backgroundPosition = "center " + (50 + off * 8) + "%";
        }
      });
    };
    window.addEventListener("scroll", onParallax, { passive: true });

    function tick(el: HTMLElement) {
      const t = parseFloat(el.dataset.count!);
      const dec = parseInt(el.dataset.dec || "0", 10);
      const pre = el.dataset.pre || "";
      const suf = el.dataset.suf || "";
      const dur = 2100;
      const t0 = performance.now();
      const fmt = (v: number) =>
        pre +
        v.toLocaleString("en-US", {
          minimumFractionDigits: dec,
          maximumFractionDigits: dec,
        }) +
        suf;
      const step = (now: number) => {
        const p = Math.min((now - t0) / dur, 1);
        const e = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(t * e);
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = fmt(t);
      };
      requestAnimationFrame(step);
    }
    const cObs = new IntersectionObserver(
      (es) => {
        es.forEach((x) => {
          if (x.isIntersecting) {
            tick(x.target as HTMLElement);
            cObs.unobserve(x.target);
          }
        });
      },
      { threshold: 0.4 },
    );
    document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => cObs.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onParallax);
      io.disconnect();
      cObs.disconnect();
    };
  }, []);

  return (
    <>


{/* ============ NAV ============ */}
<nav id="nav">
  <div className="brand">
    <span className="bname">WEEKEND WARRIOR</span>
    <span className="bsub">BY PULSE STAFFING</span>
  </div>
  <div className="nav-links">
    <a href="#how">How It Works</a>
    <a href="#pod">The Pod</a>
    <a href="#proof">Why It Works</a>
    <a href="#pricing">Pricing</a>
    <a href="#faq">FAQ</a>
  </div>
  <div className="nav-cta">
    <a href="#login" className="btn btn-ghost">Login</a>
    <a href="#book" className="btn btn-solid">Book a Demo</a>
  </div>
</nav>

{/* ============ HERO ============ */}
<section className="hero band-dark" id="top">
  <div className="hero-fallback"></div>
  <img className="hero-bg" src={heroImg} alt="A dedicated pod of credentialed nurses walking together into a facility at the start of a weekend shift" />
  <div className="hero-overlay"></div>
  <div className="hero-glow"></div>
  <div className="wrap">
    <div className="hero-inner">
      <div className="glow-tag reveal">Introducing Weekend Warrior</div>
      <h1 className="display reveal d1">The Friday scramble<br /><span className="ital-teal">ends here.</span></h1>
      <p className="lead reveal d2">The same credentialed nursing pod in your facility every weekend, on one subscription. Your weekday team keeps their weekends. You keep your Friday nights.</p>
      <p className="tagline-mono reveal d2">Strategy. Not Staffing.</p>
      <div className="hero-cta reveal d3">
        <a href="#book" className="btn btn-solid btn-lg">Book a Demo</a>
        <a href="#how" className="btn btn-ghost btn-lg">See How It Works</a>
      </div>
    </div>
    <div className="kpi-row reveal d4">
      <div className="kpi">
        <div className="num" data-count="61110" data-pre="$">$0</div>
        <div className="lbl">What one RN resignation costs you</div>
        <div className="src">NSI Retention Report</div>
      </div>
      <div className="kpi">
        <div className="num" data-count="83" data-suf=" days">0 days</div>
        <div className="lbl">To refill that seat</div>
        <div className="src">NSI Retention Report</div>
      </div>
      <div className="kpi">
        <div className="num" data-count="52" data-suf=" weekends">0 weekends</div>
        <div className="lbl">Locked in one agreement</div>
        <div className="src">The program</div>
      </div>
      <div className="kpi">
        <div className="num" data-count="1" data-suf=" pod">1 pod</div>
        <div className="lbl">The same faces, every weekend</div>
        <div className="src">The program</div>
      </div>
    </div>
  </div>
</section>

{/* ============ THE WEEKEND PROBLEM ============ */}
<section className="band-white" id="problem">
  <svg className="pulse-bg light" viewBox="0 0 1440 900" preserveAspectRatio="none">
    <polyline points="0,450 120,450 180,300 240,600 300,450 480,450 540,220 600,680 660,450 900,450 960,320 1020,580 1080,450 1440,450" fill="none" stroke="#007A7C" strokeWidth="2"/>
  </svg>
  <div className="wrap">
    <div className="section-label reveal">
      <span className="n">01</span><span className="rule"></span><span className="cat">The Weekend Problem</span>
    </div>
    <h2 className="big reveal">The weekend is where <span className="ital-teal">coverage breaks.</span></h2>
    <p className="sub reveal d1">By Friday afternoon the calls start. Someone dropped a shift. The agency sends a face nobody has met. Your charge nurse is orienting a stranger at the same time she is running the floor. The overtime line climbs, the regulars burn out, and Monday you start the search again. It is not a staffing shortage. It is a weekend that was never built to hold.</p>
    <div className="pill-row reveal d2">
      <div className="stat-pill">
        <div className="num" data-count="289" data-pre="$" data-suf="K">$0K</div>
        <div className="lbl">Cost of a single point of RN turnover, per year, for the average hospital</div>
        <div className="src">NSI 2025</div>
      </div>
      <div className="stat-pill">
        <div className="num" data-count="9.6" data-dec="1" data-suf="%">0%</div>
        <div className="lbl">National RN vacancy rate</div>
        <div className="src">NSI 2025</div>
      </div>
      <div className="stat-pill">
        <div className="num" data-count="36.53" data-dec="2" data-suf="%">0%</div>
        <div className="lbl">Annual RN turnover in nursing homes</div>
        <div className="src">HCS 2025 to 2026</div>
      </div>
      <div className="stat-pill">
        <div className="num" data-count="42.34" data-dec="2" data-suf="%">0%</div>
        <div className="lbl">Annual CNA turnover in nursing homes</div>
        <div className="src">HCS 2025 to 2026</div>
      </div>
    </div>
  </div>
</section>

{/* ============ HOW IT WORKS / THE POD ============ */}
<section className="band-dark" id="how">
  <svg className="pulse-bg" viewBox="0 0 1440 900" preserveAspectRatio="none">
    <polyline points="0,450 200,450 260,220 320,680 380,450 700,450 760,160 820,740 880,450 1200,450 1260,280 1320,620 1440,450" fill="none" stroke="#00B5B8" strokeWidth="2"/>
  </svg>
  <div className="wrap">
    <div className="section-label reveal">
      <span className="n">02</span><span className="rule"></span><span className="cat">How It Works</span>
    </div>
    <h2 className="big reveal">A weekend pod, <span className="ital-teal">built once</span>, back every Friday.</h2>
    <p className="sub reveal d1">Weekend Warrior is not a shift you fill. It is a team you keep. Three moves get you there.</p>
    <div className="steps">
      <div className="step reveal d1">
        <div className="sn">01</div>
        <h3>We match your pod</h3>
        <p>A short consultation reads your facility type, census, weekend shift volume, and coverage gap. From that, we assemble a pod sized to your floor.</p>
      </div>
      <div className="step reveal d2">
        <div className="sn">02</div>
        <h3>Credentialed once</h3>
        <p>The pod is credentialed and oriented to your facility a single time. They learn your floor, your charting, your people. Then they return, the same clinicians, every weekend.</p>
      </div>
      <div className="step reveal d3">
        <div className="sn">03</div>
        <h3>Ran on subscription</h3>
        <p>Coverage is locked in weeks ahead on one monthly subscription. You watch it from a single dashboard. No re-booking, no scramble, no surprise invoices.</p>
      </div>
    </div>

    <div className="split" style={{ marginTop: 70 }} id="pod">
      <div className="split-media reveal">
        <div className="photo plain">
          <img className="photo-img" src={podImg} alt="A director of nursing smiling as her weekend pod of credentialed nurses arrives at the facility" />
        </div>
      </div>
      <div className="reveal d1">
        <div className="section-label"><span className="n">03</span><span className="rule"></span><span className="cat">The Pod Model</span></div>
        <h2 className="big" style={{ fontSize: "clamp(28px,3.6vw,44px)" }}>The old way, and <span className="ital-teal">the Warrior way.</span></h2>
        <table className="compare">
          <thead>
            <tr><th className="old">Agency Staffing</th><th>Weekend Warrior</th></tr>
          </thead>
          <tbody>
            <tr><td className="old">A different traveler every weekend</td><td className="good">The same pod, week after week</td></tr>
            <tr><td className="old">Re-orient a stranger every Friday night</td><td className="good">Credentialed to your floor once</td></tr>
            <tr><td className="old">Friday call-off roulette</td><td className="good">Coverage locked weeks ahead</td></tr>
            <tr><td className="old">Hourly bill rates that spike</td><td className="good">One predictable monthly subscription</td></tr>
            <tr><td className="old">Burn out your core nurses to fill weekend gaps</td><td className="good">Your weekday team keeps their weekends</td></tr>
            <tr><td className="old">Your charge nurse manages the gap</td><td className="good">You watch coverage from one dashboard</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</section>

{/* ============ PROOF ============ */}
<section className="band-white" id="proof">
  <div className="wrap">
    <div className="section-label reveal">
      <span className="n">04</span><span className="rule"></span><span className="cat">Why Consistency Wins</span>
    </div>
    <h2 className="big reveal">The same team is not just comfort.<br /><span className="ital-teal">It is clinical strategy.</span></h2>
    <p className="sub reveal d1">When the weekend team knows your patients, your protocols, and each other, the floor runs differently. Fewer handoff gaps. Fewer callouts to cover. A weekend that holds its own shape instead of being rebuilt from scratch every seven days. Continuity of care is one of the most studied levers in patient safety, and the weekend is exactly where most facilities lose it.</p>
    <div className="why-points reveal d2">
      <div className="why-point"><div className="wp-k">Same team, same protocols</div><div className="wp-v">A pod that returns every weekend learns your unit. No re-orientation, no guesswork, no relearning your charting at Friday handoff.</div></div>
      <div className="why-point"><div className="wp-k">Your core staff stops burning out</div><div className="wp-v">Weekend gaps stop landing on your weekday nurses. No more mandated Saturdays, no more guilt texts, no more charge nurses covering the floor on their day off.</div></div>
      <div className="why-point"><div className="wp-k">Retention is the real return</div><div className="wp-v">Every point of RN turnover costs a hospital roughly $289,000 a year. Protecting your core team's weekends is a retention strategy, not a scheduling patch.</div></div>
      <div className="why-point"><div className="wp-k">Coverage locked weeks ahead</div><div className="wp-v">Your weekend is confirmed before the week even starts, so your DON is not building a schedule from open shifts every Friday afternoon.</div></div>
      <div className="why-point"><div className="wp-k">Say yes to weekend admissions</div><div className="wp-v">Referrals stop being a staffing question. Take the Friday afternoon admission knowing Saturday is already covered.</div></div>
      <div className="why-point"><div className="wp-k">One accountable partner</div><div className="wp-v">One subscription, one point of contact, one team that owns your weekend coverage instead of a rotating cast of agency names.</div></div>
    </div>
  </div>
</section>

{/* ============ COMMAND CENTER PREVIEW ============ */}
<section className="band-white" id="preview">
  <div className="wrap">
    <div className="app-split">
      <div>
        <div className="section-label reveal">
          <span className="n">05</span><span className="rule"></span><span className="cat">The Command Center</span>
        </div>
        <h2 className="big reveal">Your whole weekend, <span className="ital-teal">on one screen.</span></h2>
        <p className="sub reveal d1">Every Weekend Warrior facility runs on a live command center. Fill rate, the pod roster, and every upcoming shift, updated in real time on your desk and in your pocket. This is what it means to run staffing as a system instead of a phone tree.</p>
        <div className="af-list reveal d2">
          <div className="af-row"><div className="af-k">Live fill rate</div><div className="af-v">See the whole weekend's coverage in one number, before Friday ever arrives.</div></div>
          <div className="af-row"><div className="af-k">Pod roster, confirmed</div><div className="af-v">Every clinician on this weekend's pod, with shift status at a glance.</div></div>
          <div className="af-row"><div className="af-k">Upcoming shifts</div><div className="af-v">Friday through Sunday, laid out and locked, with alerts before a gap becomes a problem.</div></div>
        </div>
        <p className="sub reveal d2" style={{ marginTop: 26, fontSize: "12.5px", color: "var(--ink-45)" }}>Dashboard shown for illustration. Live facility data populates on activation.</p>
      </div>
      <div className="app-phone reveal d2">
        <PulseCareDashboard
          shifts={[
            { day: "Today, May 24", time: "7:00 AM – 3:00 PM", status: "Filled", avatar: "a", photo: avatarNurseA },
            { day: "Tomorrow, May 25", time: "3:00 PM – 11:00 PM", status: "Filled", avatar: "b", photo: avatarNurseB },
          ]}
        />
      </div>
    </div>
  </div>
</section>

{/* ============ PRICING ============ */}
<section className="band-white" id="pricing">
  <div className="wrap">
    <div className="section-label reveal">
      <span className="n">06</span><span className="rule"></span><span className="cat">Pricing</span>
    </div>
    <h2 className="big reveal">Your weekend <span className="ital-teal">already has a price.</span></h2>
    <p className="sub reveal d1">You are paying for the weekend right now, in overtime, in agency premiums, in the cost of replacing the nurses who leave. One point of RN turnover runs the average hospital $289,000 a year. Weekend Warrior turns that scattered spend into one predictable line, sized to your facility.</p>
    <div className="price-card reveal d2">
      <div className="price-top">
        <div className="plabel">Weekend Warrior Subscription</div>
        <div className="ph">One pod. One monthly rate. Priced to your census.</div>
      </div>
      <div className="price-body">
        <div className="prow"><span className="ck">■</span><span>A dedicated weekend pod, sized to your facility type, bed count, and weekend shift volume</span></div>
        <div className="prow"><span className="ck">■</span><span>The same credentialed clinicians every weekend, credentialed to your floor once</span></div>
        <div className="prow"><span className="ck">■</span><span>Coverage locked weeks ahead, with the command center dashboard included</span></div>
        <div className="prow"><span className="ck">■</span><span>One monthly invoice. No hourly spikes, no re-booking, no agency markup</span></div>
        <p className="price-note">Every facility is sized differently, so your exact monthly rate is built from your six-gate profile on the demo call. Book a 15-minute demo and we will show you the number against what your weekend costs today.</p>
        <div style={{ marginTop: 24 }}><a href="#book" className="btn btn-solid btn-lg" style={{ borderColor: "var(--teal-dark)", color: "var(--dark)" }}>Book a 15-Minute Demo</a></div>
      </div>
    </div>
  </div>
</section>

{/* ============ FAQ ============ */}
<section className="band-dark" id="faq">
  <div className="wrap">
    <div className="section-label reveal">
      <span className="n">07</span><span className="rule"></span><span className="cat">Questions, Answered</span>
    </div>
    <h2 className="big reveal">Before you <span className="ital-teal">book the call.</span></h2>
    <div className="faq">
      <div className="faq-item">
        <button className="faq-q" onClick={toggleFaq}>How is the pod credentialed to our facility?</button>
        <div className="faq-a"><p>The pod is credentialed and oriented to your facility one time, before their first weekend. They complete your onboarding, learn your charting and protocols, and return as the same team. You are not re-orienting a stranger every Friday.</p></div>
      </div>
      <div className="faq-item">
        <button className="faq-q" onClick={toggleFaq}>What happens if a pod member is out?</button>
        <div className="faq-a"><p>Coverage is our responsibility, not yours. If a clinician cannot make a weekend, Weekend Warrior fills the seat from within the pod model and you see the status live in the command center. Your charge nurse is not the one making the calls.</p></div>
      </div>
      <div className="faq-item">
        <button className="faq-q" onClick={toggleFaq}>How fast can a pod start?</button>
        <div className="faq-a"><p>Once your pod is matched and credentialing is complete, coverage begins on the agreed start weekend. Your desired start date is one of the first things we capture, so the timeline is set to your calendar, not ours.</p></div>
      </div>
      <div className="faq-item">
        <button className="faq-q" onClick={toggleFaq}>Do we re-book every weekend?</button>
        <div className="faq-a"><p>No. The subscription is the booking. Coverage recurs automatically, weeks ahead. The portal is for visibility and for change or extra-coverage requests, not for filling shifts one at a time.</p></div>
      </div>
      <div className="faq-item">
        <button className="faq-q" onClick={toggleFaq}>How is the pod matched to us?</button>
        <div className="faq-a"><p>We use proprietary technology to diagnose your facility's coverage needs and match you with the recommended pod. On the demo call we capture your facility profile, and our matching engine reads it against clinician mix, credentials, and weekend shift volume to recommend the pod built for your floor from the first weekend.</p></div>
      </div>
      <div className="faq-item">
        <button className="faq-q" onClick={toggleFaq}>What does it cost, and how is it billed?</button>
        <div className="faq-a"><p>One subscription price built to your facility's needs, billed on a recurring monthly schedule. No hourly bill rates, no overtime premiums, no agency markup. Your exact rate is set on the demo call from your facility profile.</p></div>
      </div>
    </div>
  </div>
</section>

{/* ============ FINAL CTA ============ */}
<section className="final" id="book">
  <svg className="pulse-bg" viewBox="0 0 1440 900" preserveAspectRatio="none" style={{ opacity: 0.1 }}>
    <polyline className="ekg-anim" pathLength={1} points="0,450 200,450 260,180 320,720 380,450 720,450 780,120 840,780 900,450 1240,450 1300,220 1360,680 1440,450" fill="none" stroke="#FFFFFF" strokeWidth="2"/>
  </svg>
  <div className="wrap">
    <div className="tag reveal">Strategy. Not Staffing.</div>
    <h2 className="reveal d1">Give your weekend a team it can keep.</h2>
    <p className="sub reveal d2">Fifteen minutes. We read your weekend, size your pod, and show you the number against what coverage costs you today. No obligation, no pressure.</p>
    <div className="reveal d3"><a href="#book" className="btn btn-white btn-lg">Book a 15-Minute Demo</a></div>
  </div>
</section>

{/* ============ FOOTER ============ */}
<footer>
  <svg className="pulse-bg" viewBox="0 0 1440 200" preserveAspectRatio="none" style={{ height: "100%", opacity: 0.06 }}>
    <polyline points="0,100 300,100 360,40 420,160 480,100 900,100 960,30 1020,170 1080,100 1440,100" fill="none" stroke="#00B5B8" strokeWidth="2"/>
  </svg>
  <div className="foot-grid">
    <div className="foot-brand">
      <div className="bname">WEEKEND WARRIOR</div>
      <div className="tag">STRATEGY. NOT STAFFING.</div>
      <div className="co">A Pulse Staffing weekend pod program.</div>
    </div>
    <div className="foot-links">
      <div className="foot-col">
        <div className="h">Explore</div>
        <a href="#how">How It Works</a>
        <a href="#pod">The Pod</a>
        <a href="#proof">Why It Works</a>
        <a href="#pricing">Pricing</a>
        <a href="#faq">FAQ</a>
      </div>
      <div className="foot-col">
        <div className="h">Get Started</div>
        <a href="#book">Book a Demo</a>
        <a href="#login">Client Login</a>
      </div>
      <div className="foot-col">
        <div className="h">Contact</div>
        <a href="#book">Talk to Pulse Staffing</a>
      </div>
    </div>
  </div>
  <div className="foot-bottom">
    <span>© 2026 Pulse Staffing. Weekend Warrior is a Pulse Staffing program.</span>
    <span className="mono">STRATEGY. NOT STAFFING.</span>
  </div>
</footer>
    </>
  );
}
