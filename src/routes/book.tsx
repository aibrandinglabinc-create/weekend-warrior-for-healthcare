import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

const DEMO_LINK = "https://api.aibrandinglabinc.com/widget/bookings/weekend-warrior-demo";

type PodTier = {
  value: string;
  label: string;
  price?: string;
  link?: string;
};

const RN_TIERS: PodTier[] = [
  { value: "None", label: "None" },
  { value: "1-2", label: "1-2", price: "$798", link: "https://link.clover.com/urlshortener/FLPQnH" },
  { value: "3-5", label: "3-5", price: "$998", link: "https://link.clover.com/urlshortener/wtnWQ7" },
  { value: "6-10", label: "6-10", price: "$1198", link: "https://link.clover.com/urlshortener/rRXyG8" },
  { value: "11 or more", label: "11 or more", price: "Custom" },
];

const CNA_TIERS: PodTier[] = [
  { value: "None", label: "None" },
  { value: "1-2", label: "1-2", price: "$498", link: "https://link.clover.com/urlshortener/pVzcCf" },
  { value: "3-5", label: "3-5", price: "$798", link: "https://link.clover.com/urlshortener/YVNLps" },
  { value: "6-10", label: "6-10", price: "$997", link: "https://link.clover.com/urlshortener/ZD7Qsw" },
  { value: "11 or more", label: "11 or more", price: "Custom" },
];

const FACILITY_TYPES = [
  "Skilled Nursing",
  "Assisted Living",
  "Memory Care",
  "LTACH",
  "Hospital",
  "Other",
];

const DAY_CHIPS = ["Friday", "Saturday", "Sunday"];
const SHIFT_CHIPS = ["Days", "Evenings", "Nights"];
const AUTHORITY = ["I sign", "I recommend", "Gathering information"];

const FACILITY_STEPS = [
  "Start with your building.",
  "Size your pods.",
  "Which days and shifts?",
  "When do you want to start?",
  "Who do we call?",
  "How close are you to deciding?",
];

const STEP_ERRORS = [
  "Please complete your facility name, type, bed count, city, and zip.",
  "Select at least one pod so we know what to build.",
  "Pick the days and shifts you need covered.",
  "Pick a desired start date.",
  "Please complete your name, title, email, and phone.",
  "Let us know where you are in the decision.",
];

export const Route = createFileRoute("/book")({
  component: BookPod,
  head: () => ({
    meta: [
      { title: "Book Your Pod \u00b7 Weekend Warrior" },
      {
        name: "description",
        content:
          "Answer a few questions about your weekend and we build the pod against it. Five minutes, no commitment.",
      },
      { property: "og:title", content: "Book Your Pod \u00b7 Weekend Warrior" },
      {
        property: "og:description",
        content:
          "Size your RN pod and your CNA pod, pick your days and shifts, and we assemble the team that comes back every weekend.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/book" }],
  }),
});

function BookPod() {
  const [step, setStep] = useState(0);
  const [facilityName, setFacilityName] = useState("");
  const [facilityType, setFacilityType] = useState<string | null>(null);
  const [bedCount, setBedCount] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [rnPod, setRnPod] = useState("None");
  const [cnaPod, setCnaPod] = useState("None");
  const [days, setDays] = useState<string[]>([]);
  const [shift, setShift] = useState<string[]>([]);
  const [startDate, setStartDate] = useState("");
  const [floorNotes, setFloorNotes] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [authority, setAuthority] = useState<string | null>(null);

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  function toggleArrayValue(list: string[], setList: (v: string[]) => void, value: string) {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  async function submitBooking() {
    setStatus("submitting");
    setErrorMsg(null);
    const payload = {
      facility_name: facilityName,
      facility_type: facilityType,
      bed_count: parseInt(bedCount, 10) || 0,
      city,
      zip,
      rn_pod_size: rnPod,
      cna_pod_size: cnaPod,
      days,
      shift,
      start_date: startDate,
      floor_notes: floorNotes,
      first_name: firstName,
      last_name: lastName,
      title,
      email,
      phone,
      decision_authority: authority,
      source: "facilities_page",
    };
    try {
      const endpoint = import.meta.env.VITE_FACILITY_WEBHOOK_URL as string | undefined;
      if (!endpoint) {
        console.info("Facility booking (no endpoint configured yet)", payload);
        setStatus("success");
        return;
      }
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Something went wrong. Please try again.");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  function stepValid(s: number): boolean {
    switch (s) {
      case 0:
        return (
          facilityName.trim() !== "" &&
          !!facilityType &&
          bedCount.trim() !== "" &&
          city.trim() !== "" &&
          zip.trim() !== ""
        );
      case 1:
        return rnPod !== "None" || cnaPod !== "None";
      case 2:
        return days.length > 0 && shift.length > 0;
      case 3:
        return startDate !== "";
      case 4:
        return (
          firstName.trim() !== "" &&
          lastName.trim() !== "" &&
          title.trim() !== "" &&
          email.trim() !== "" &&
          phone.trim() !== ""
        );
      case 5:
        return !!authority;
      default:
        return true;
    }
  }

  function goNext() {
    if (!stepValid(step)) {
      setErrorMsg(STEP_ERRORS[step] || "Please complete this step.");
      return;
    }
    setErrorMsg(null);
    setStep((s) => Math.min(s + 1, FACILITY_STEPS.length - 1));
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goBack() {
    setErrorMsg(null);
    setStep((s) => Math.max(s - 1, 0));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (step < FACILITY_STEPS.length - 1) {
      goNext();
      return;
    }
    if (!stepValid(step)) {
      setErrorMsg(STEP_ERRORS[step]);
      return;
    }
    submitBooking();
  }

  const selectedTiers = [
    RN_TIERS.find((t) => t.value === rnPod && t.link) && {
      label: `RN Pod ${rnPod}`,
      tier: RN_TIERS.find((t) => t.value === rnPod)!,
    },
    CNA_TIERS.find((t) => t.value === cnaPod && t.link) && {
      label: `CNA Pod ${cnaPod}`,
      tier: CNA_TIERS.find((t) => t.value === cnaPod)!,
    },
  ].filter(Boolean) as { label: string; tier: PodTier }[];

  function podRow(
    heading: string,
    tiers: PodTier[],
    selected: string,
    setSelected: (v: string) => void,
  ) {
    return (
      <div className="pod-row">
        <span className="field-label">{heading}</span>
        <div className="pod-grid">
          {tiers.map((t) => (
            <div
              key={t.value}
              className={`chip pod-chip${selected === t.value ? " selected" : ""}`}
              role="radio"
              aria-checked={selected === t.value}
              tabIndex={0}
              onClick={() => { setSelected(t.value); setErrorMsg(null); }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelected(t.value); setErrorMsg(null); }
              }}
            >
              <span className="pod-size">{t.label}</span>
              {t.price && <span className="pod-price">{t.price}</span>}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <Nav variant="facilities" />
      <ChatWidget />

      <section className="band-dark book-page" id="book">
        <div className="wrap">
          <div className="book-shell">
            {status === "success" ? (
              <div className="reg-card">
                <div className="reg-confirm">
                  <h3>We Are Building Your Pod.</h3>
                  <p>Check your email for a confirmation. We are matching your requirement against credentialed Warriors in your area now. Within two business days you will hear from us to schedule a fifteen minute call where you meet the pod we built and get your number.</p>
                </div>
                {selectedTiers.length > 0 && (
                  <div className="pay-block">
                    <span className="field-label">Ready to start now</span>
                    {selectedTiers.map((s) => (
                      <a key={s.label} className="btn btn-solid reg-submit" href={s.tier.link} target="_blank" rel="noopener">
                        Pay for {s.label} {s.tier.price}
                      </a>
                    ))}
                  </div>
                )}
                <div style={{ marginTop: 20, textAlign: "center" }}>
                  <a href={DEMO_LINK} target="_blank" rel="noopener" style={{ fontSize: 12.5, color: "var(--teal-light)" }}>
                    Want to skip the wait? Book the call now &rarr;
                  </a>
                </div>
              </div>
            ) : (
              <form className="reg-card" noValidate onSubmit={handleSubmit}>
                <span className="card-eyebrow">Pod Booking</span>
                <div className="reg-progress">
                  <span>Step {step + 1} of {FACILITY_STEPS.length}</span>
                  <div className="reg-progress-track"><div className="reg-progress-fill" style={{ width: `${((step + 1) / FACILITY_STEPS.length) * 100}%` }} /></div>
                </div>
                <h2 className="card-h">{FACILITY_STEPS[step]}</h2>
                {step === 0 && <p className="card-sub">Five minutes. No commitment on this form.</p>}

                {step === 0 && (
                  <>
                    <div className="field">
                      <span className="field-label">Facility Name</span>
                      <input autoFocus value={facilityName} onChange={(e) => setFacilityName(e.target.value)} placeholder="Cedar Ridge Care Center" />
                    </div>

                    <div className="field">
                      <span className="field-label">Facility Type</span>
                      <div className="chip-grid">
                        {FACILITY_TYPES.map((t) => (
                          <div
                            key={t}
                            className={`chip${facilityType === t ? " selected" : ""}`}
                            role="radio"
                            aria-checked={facilityType === t}
                            tabIndex={0}
                            onClick={() => setFacilityType(t)}
                            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setFacilityType(t); } }}
                          >
                            {t}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="field">
                      <span className="field-label">Bed Count</span>
                      <input inputMode="numeric" value={bedCount} onChange={(e) => setBedCount(e.target.value.replace(/[^0-9]/g, ""))} placeholder="120" />
                    </div>

                    <div className="field-row">
                      <div>
                        <span className="field-label">City</span>
                        <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Dallas" />
                      </div>
                      <div>
                        <span className="field-label">Zip Code</span>
                        <input inputMode="numeric" maxLength={5} value={zip} onChange={(e) => setZip(e.target.value.replace(/[^0-9]/g, ""))} placeholder="75201" />
                      </div>
                    </div>
                  </>
                )}

                {step === 1 && (
                  <div className="pod-block">
                    <p className="pod-helper">Most buildings need more CNAs than RNs. Size them separately.</p>
                    {podRow("RN Pod Size", RN_TIERS, rnPod, setRnPod)}
                    {podRow("CNA Pod Size", CNA_TIERS, cnaPod, setCnaPod)}
                  </div>
                )}

                {step === 2 && (
                  <>
                    <div className="field">
                      <span className="field-label">Days You Need Covered</span>
                      <div className="chip-row">
                        {DAY_CHIPS.map((d) => (
                          <div
                            key={d}
                            className={`chip${days.includes(d) ? " selected" : ""}`}
                            role="checkbox"
                            aria-checked={days.includes(d)}
                            tabIndex={0}
                            onClick={() => toggleArrayValue(days, setDays, d)}
                            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleArrayValue(days, setDays, d); } }}
                          >
                            {d.slice(0, 3)}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="field">
                      <span className="field-label">Shifts</span>
                      <div className="chip-row">
                        {SHIFT_CHIPS.map((s) => (
                          <div
                            key={s}
                            className={`chip${shift.includes(s) ? " selected" : ""}`}
                            role="checkbox"
                            aria-checked={shift.includes(s)}
                            tabIndex={0}
                            onClick={() => toggleArrayValue(shift, setShift, s)}
                            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleArrayValue(shift, setShift, s); } }}
                          >
                            {s}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <div className="field">
                      <span className="field-label">Desired Start Date</span>
                      <input autoFocus type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </div>

                    <div className="field">
                      <span className="field-label">Floor Notes</span>
                      <textarea
                        rows={3}
                        value={floorNotes}
                        onChange={(e) => setFloorNotes(e.target.value)}
                        placeholder="Acuity, required certifications, language needs, same gender care requirements, anything about the floor we should know."
                      />
                    </div>
                  </>
                )}

                {step === 4 && (
                  <>
                    <div className="field-row">
                      <div>
                        <span className="field-label">First Name</span>
                        <input autoFocus value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" />
                      </div>
                      <div>
                        <span className="field-label">Last Name</span>
                        <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" />
                      </div>
                    </div>

                    <div className="field">
                      <span className="field-label">Title</span>
                      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Director of Nursing" />
                    </div>

                    <div className="field">
                      <span className="field-label">Work Email</span>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@facility.com" />
                    </div>

                    <div className="field">
                      <span className="field-label">Direct Phone</span>
                      <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 555-5555" />
                    </div>
                  </>
                )}

                {step === 5 && (
                  <div className="field">
                    <span className="field-label">Decision Authority</span>
                    <div className="chip-grid">
                      {AUTHORITY.map((a) => (
                        <div
                          key={a}
                          className={`chip${authority === a ? " selected" : ""}`}
                          role="radio"
                          aria-checked={authority === a}
                          tabIndex={0}
                          onClick={() => { setAuthority(a); setErrorMsg(null); }}
                          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setAuthority(a); setErrorMsg(null); } }}
                        >
                          {a}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {step > 0 ? (
                  <div className="reg-nav">
                    <button type="button" className="reg-back" onClick={goBack}>&larr; Back</button>
                    {step < FACILITY_STEPS.length - 1 ? (
                      <button type="submit" className="btn btn-solid reg-submit">Continue</button>
                    ) : (
                      <button type="submit" className="btn btn-solid reg-submit" disabled={status === "submitting"}>
                        {status === "submitting" ? "Booking..." : "Book My Pod"}
                      </button>
                    )}
                  </div>
                ) : (
                  <button type="submit" className="btn btn-solid reg-submit">Continue</button>
                )}

                {status === "error" ? (
                  <div className="reg-error">
                    {errorMsg}{" "}
                    <a href="#book" onClick={(e) => { e.preventDefault(); submitBooking(); }} style={{ textDecoration: "underline" }}>Try again</a>
                  </div>
                ) : (
                  errorMsg && <p className="reg-inline-error">{errorMsg}</p>
                )}

                {step === FACILITY_STEPS.length - 1 && (
                  <p className="field-fine">
                    Booking your pod does not create an account and does not commit you to anything. Your pod is curated against the specifications you book here, and we confirm the details with you directly. Your account is created only after you decide to move forward.
                  </p>
                )}
              </form>
            )}

            <div style={{ marginTop: 18, textAlign: "center" }}>
              <Link to="/facilities" style={{ fontSize: 12.5, color: "var(--teal-light)" }}>
                &larr; Back to Book Your Pod
              </Link>
            </div>
          </div>
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
