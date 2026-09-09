import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { format, nextFriday } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

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
  { question: "What is your facility's name?", error: "Please enter your facility name." },
  { question: "What type of facility is it?", error: "Please select a facility type." },
  { question: "How many beds?", error: "Please enter a bed count." },
  { question: "What city is it in?", error: "Please enter the city." },
  { question: "What is the zip code?", error: "Please enter the zip code." },
  { question: "Choose Your Pod Size", sub: "Select the RN pod and CNA pod you need. Either can be set to None.", error: "Select your pod sizes." },
  { question: "Which weekend days need coverage?", error: "Pick at least one day." },
  { question: "Which shifts?", error: "Pick at least one shift." },
  { question: "When do you want coverage to start?", error: "Pick a desired start date." },
  { question: "Anything else about the floor?", error: "Add floor notes or type N/A." },
  { question: "What is your first name?", error: "Please enter your first name." },
  { question: "What is your last name?", error: "Please enter your last name." },
  { question: "What is your title?", error: "Please enter your title." },
  { question: "What is your work email?", error: "Please enter your work email." },
  { question: "What is your direct phone number?", error: "Please enter your direct phone number." },
  { question: "How close are you to deciding?", error: "Please select your decision authority." },
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
  const [startDate, setStartDate] = useState(format(nextFriday(new Date()), "yyyy-MM-dd"));
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
        return facilityName.trim() !== "";
      case 1:
        return !!facilityType;
      case 2:
        return bedCount.trim() !== "";
      case 3:
        return city.trim() !== "";
      case 4:
        return zip.trim() !== "";
      case 5:
        return true;
      case 6:
        return days.length > 0;
      case 7:
        return shift.length > 0;
      case 8:
        return startDate !== "";
      case 9:
        return true;
      case 10:
        return firstName.trim() !== "";
      case 11:
        return lastName.trim() !== "";
      case 12:
        return title.trim() !== "";
      case 13:
        return email.trim() !== "";
      case 14:
        return phone.trim() !== "";
      case 15:
        return !!authority;
      default:
        return true;
    }
  }

  function goNext() {
    if (!stepValid(step)) {
      setErrorMsg(FACILITY_STEPS[step].error);
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
      setErrorMsg(FACILITY_STEPS[step].error);
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

  function podGrid(
    tiers: PodTier[],
    selected: string,
    setSelected: (v: string) => void,
  ) {
    return (
      <div className="pod-grid single-q-pod-grid">
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
                  <h3>We Are Curating Your Pod.</h3>
                  <p>Check your email for a confirmation. Your pod is being curated against the specifications you booked, from credentialed Warriors in your area. Within two business days you will hear from us with your number.</p>
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
              </div>
            ) : (
              <form className="reg-card" noValidate onSubmit={handleSubmit}>
                <span className="card-eyebrow">Pod Booking</span>
                <div className="reg-progress">
                  <span>Step {step + 1} of {FACILITY_STEPS.length}</span>
                  <div className="reg-progress-track"><div className="reg-progress-fill" style={{ width: `${((step + 1) / FACILITY_STEPS.length) * 100}%` }} /></div>
                </div>
                <h2 className="card-h">Start Building Your Pod.</h2>
                <p className="card-sub">{FACILITY_STEPS[step].question}</p>
                {FACILITY_STEPS[step].sub && <p className="card-sub-sub">{FACILITY_STEPS[step].sub}</p>}

                {step === 0 && (
                  <div className="field">
                    <input autoFocus value={facilityName} onChange={(e) => setFacilityName(e.target.value)} placeholder="Cedar Ridge Care Center" />
                  </div>
                )}

                {step === 1 && (
                  <div className="field">
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
                )}

                {step === 2 && (
                  <div className="field">
                    <input autoFocus inputMode="numeric" value={bedCount} onChange={(e) => setBedCount(e.target.value.replace(/[^0-9]/g, ""))} placeholder="120" />
                  </div>
                )}

                {step === 3 && (
                  <div className="field">
                    <input autoFocus value={city} onChange={(e) => setCity(e.target.value)} placeholder="Dallas" />
                  </div>
                )}

                {step === 4 && (
                  <div className="field">
                    <input autoFocus inputMode="numeric" maxLength={5} value={zip} onChange={(e) => setZip(e.target.value.replace(/[^0-9]/g, ""))} placeholder="75201" />
                  </div>
                )}

                {step === 5 && (
                  <div className="field combined-pod-field">
                    <div className="pod-choice-group">
                      <span className="pod-choice-title">RN Pod</span>
                      {podGrid(RN_TIERS, rnPod, setRnPod)}
                    </div>
                    <div className="pod-choice-group">
                      <span className="pod-choice-title">CNA Pod</span>
                      {podGrid(CNA_TIERS, cnaPod, setCnaPod)}
                    </div>
                  </div>
                )}

                {step === 6 && (
                  <div className="field">
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
                )}

                {step === 7 && (
                  <div className="field">
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
                )}

                {step === 8 && (
                  <div className="field">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal bg-transparent border-white/20 hover:bg-white/5 hover:text-white",
                            !startDate && "text-white/50"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(new Date(startDate), "PPP") : <span>Pick a weekend date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={startDate ? new Date(startDate) : undefined}
                          onSelect={(date) => {
                            if (date) setStartDate(format(date, "yyyy-MM-dd"));
                          }}
                          disabled={(date) => {
                            const day = date.getDay();
                            return day !== 5 && day !== 6 && day !== 0;
                          }}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                )}

                {step === 9 && (
                  <div className="field">
                    <textarea
                      autoFocus
                      rows={4}
                      value={floorNotes}
                      onChange={(e) => setFloorNotes(e.target.value)}
                      placeholder="Optional. Acuity, required certifications, language needs, same gender care requirements, anything about the floor we should know."
                    />
                  </div>
                )}

                {step === 10 && (
                  <div className="field">
                    <input autoFocus value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" />
                  </div>
                )}

                {step === 11 && (
                  <div className="field">
                    <input autoFocus value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" />
                  </div>
                )}

                {step === 12 && (
                  <div className="field">
                    <input autoFocus value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Director of Nursing" />
                  </div>
                )}

                {step === 13 && (
                  <div className="field">
                    <input autoFocus type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@facility.com" />
                  </div>
                )}

                {step === 14 && (
                  <div className="field">
                    <input autoFocus type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 555-5555" />
                  </div>
                )}

                {step === 15 && (
                  <div className="field">
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
              { label: "Book a Demo", href: "https://api.aibrandinglabinc.com/widget/bookings/weekend-warrior-demo" },
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
