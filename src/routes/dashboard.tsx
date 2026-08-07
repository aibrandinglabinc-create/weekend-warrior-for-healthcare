import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import avatarMaria from "@/assets/avatar-maria.jpg";
import avatarJames from "@/assets/avatar-james.jpg";
import avatarPriya from "@/assets/avatar-priya.jpg";
import avatarDana from "@/assets/avatar-dana.jpg";
import avatarTrevor from "@/assets/avatar-trevor.jpg";
import avatarSofia from "@/assets/avatar-sofia.jpg";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  head: () => ({
    meta: [{ title: "Command Center · Weekend Warrior" }],
  }),
});

const IconTeam = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="9" cy="8" r="3.1" stroke="currentColor" strokeWidth="1.8" />
    <path d="M3.4 18.4c0-2.9 2.5-4.6 5.6-4.6s5.6 1.7 5.6 4.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M16.2 6.2a2.9 2.9 0 0 1 0 5.5M17.6 14.3c2 .5 3.4 1.9 3.4 4.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
const IconCheck = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="8.6" stroke="currentColor" strokeWidth="1.8" />
    <path d="M8.3 12.4l2.6 2.6 5-5.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconCal = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3.6" y="5.4" width="16.8" height="15" rx="2.6" stroke="currentColor" strokeWidth="1.8" />
    <path d="M3.6 10.1h16.8M8.4 3.4v3.6M15.6 3.4v3.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
const IconMsg = () => (
  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M20.4 11.4c0 4.1-3.8 7.4-8.4 7.4-1 0-2-.2-2.9-.5l-4.6 1.6 1.4-3.9a7 7 0 0 1-2.3-5c0-4.1 3.8-7.4 8.4-7.4s8.4 3.3 8.4 7.4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);
const IconMore = () => (
  <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <circle cx="5.4" cy="12" r="1.9" /><circle cx="12" cy="12" r="1.9" /><circle cx="18.6" cy="12" r="1.9" />
  </svg>
);
const IconChevron = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UPCOMING = [
  { day: "Friday, May 24", time: "6:00 AM – 6:00 PM", status: "Filled", photo: avatarMaria },
  { day: "Friday, May 24", time: "6:00 PM – 6:00 AM", status: "Filled", photo: avatarJames },
];

const ROSTER = [
  { name: "Maria Alvarez", role: "RN", on: true, photo: avatarMaria },
  { name: "James Okafor", role: "RN", on: true, photo: avatarJames },
  { name: "Priya Nair", role: "LPN", on: true, photo: avatarPriya },
  { name: "Dana Wicklund", role: "CNA", on: true, photo: avatarDana },
  { name: "Trevor Boone", role: "CNA", on: true, photo: avatarTrevor },
  { name: "Sofia Reyes", role: "Phlebotomist", on: false, photo: avatarSofia },
];

const PHOTO_BY_NAME: Record<string, string> = Object.fromEntries(ROSTER.map((r) => [r.name, r.photo]));

const SCHEDULE = [
  { day: "Friday", shifts: [
    { time: "6:00 AM – 6:00 PM", name: "Maria Alvarez", role: "RN" },
    { time: "6:00 PM – 6:00 AM", name: "James Okafor", role: "RN" },
  ]},
  { day: "Saturday", shifts: [
    { time: "6:00 AM – 6:00 PM", name: "Priya Nair", role: "LPN" },
    { time: "6:00 PM – 6:00 AM", name: "Dana Wicklund", role: "CNA" },
  ]},
  { day: "Sunday", shifts: [
    { time: "6:00 AM – 6:00 PM", name: "Trevor Boone", role: "CNA" },
    { time: "6:00 PM – 6:00 AM", name: "Sofia Reyes", role: "Phlebotomist" },
  ]},
];

const MESSAGES = [
  { from: "Pulse Staffing", time: "9:14 AM", preview: "Your weekend pod is fully confirmed for May 24 through 26. No action needed." },
  { from: "Weekend Warrior System", time: "Yesterday", preview: "Priya Nair's LPN license renewal was verified and is on file." },
  { from: "Pulse Staffing", time: "Monday", preview: "Trevor Boone has been added to your pod starting this weekend." },
  { from: "Weekend Warrior System", time: "Last week", preview: "Your 90 day retention report is ready to view." },
];

function Dashboard() {
  const ARC = 307.9;
  const pct = 100;
  const offset = ARC - (ARC * pct) / 100;
  const [tab, setTab] = useState<"dashboard" | "shifts" | "team" | "messages" | "more">("dashboard");

  return (
    <>
      <div className="dash-utility">
        <span>Facility Demo &middot; Sunrise Manor Care Center</span>
        <Link to="/">Log Out</Link>
      </div>

      {/* ============ DESKTOP: COMMAND CENTER PANEL ============ */}
      <section className="band-dark dash-desktop-view" style={{ minHeight: "100vh", paddingTop: 70 }}>
        <div className="wrap">
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 20, marginBottom: 36 }}>
            <div>
              <span className="eyebrow">Facility Demo &middot; Sunrise Manor Care Center</span>
              <h2 className="big" style={{ marginTop: 10, fontSize: "clamp(26px,3.4vw,38px)" }}>Welcome back.</h2>
            </div>
          </div>

          <div className="cc">
            <div className="cc-bar">
              <span className="cc-dot" style={{ background: "#E5484D" }} />
              <span className="cc-dot" style={{ background: "#F5A524" }} />
              <span className="cc-dot" style={{ background: "#00B5B8" }} />
              <span className="cc-title">Weekend Coverage &middot; This Weekend</span>
            </div>
            <div className="cc-body">
              <div className="cc-panel">
                <div className="plabel">Fill Rate</div>
                <div className="ring-wrap">
                  <div className="ring" style={{ ["--pct" as string]: 100 }}>
                    <span className="rv">100%</span>
                  </div>
                  <div className="ring-meta">
                    <div className="rt">All shifts filled</div>
                    <div className="rs">Friday through Sunday, this weekend</div>
                  </div>
                </div>
              </div>

              <div className="cc-panel">
                <div className="plabel">Weekend Calendar</div>
                <div className="wk">
                  <div className="wk-day">
                    <div className="d">Fri</div>
                    <div className="b"></div>
                  </div>
                  <div className="wk-day">
                    <div className="d">Sat</div>
                    <div className="b"></div>
                  </div>
                  <div className="wk-day partial">
                    <div className="d">Sun</div>
                    <div className="b"></div>
                  </div>
                </div>
              </div>

              <div className="cc-panel">
                <div className="plabel">Pod Roster</div>
                <div className="roster">
                  {ROSTER.map((r) => (
                    <div className="r-row" key={r.name}>
                      <span className={`r-dot ${r.on ? "on" : "off"}`} />
                      <span className="r-name">{r.name}</span>
                      <span className="r-role">{r.role}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="cc-panel">
                <div className="plabel">This Month</div>
                <div className="cc-tiles">
                  <div className="cc-tile">
                    <div className="tn">6</div>
                    <div className="tl">Pod Size</div>
                  </div>
                  <div className="cc-tile">
                    <div className="tn">0</div>
                    <div className="tl">Call-Outs</div>
                  </div>
                  <div className="cc-tile">
                    <div className="tn">98%</div>
                    <div className="tl">90-Day Retention</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="sub" style={{ marginTop: 30, fontSize: 12.5, color: "var(--white-50)" }}>
            Demo data shown for illustration. Your live facility command center populates on activation.
          </p>
        </div>
      </section>

      {/* ============ MOBILE: APP-STYLE PAGE ============ */}
      <div className="dash-page dash-mobile-view">
        <div className="dash-appbar">
          <span className="dash-hamb"><span /><span /><span /></span>
          <span className="dash-bell">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 4a5.4 5.4 0 0 0-5.4 5.4v3.1L5.2 15.4h13.6l-1.4-2.9V9.4A5.4 5.4 0 0 0 12 4Z" stroke="#fff" strokeWidth="1.7" strokeLinejoin="round" />
              <path d="M10.1 18.1a2 2 0 0 0 3.8 0" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
            <span className="dash-badge">3</span>
          </span>
        </div>

        <div className="dash-greet">
          <p className="dash-hi">Welcome back,</p>
          <p className="dash-nm">Chrissy Morgan</p>
          <p className="dash-role">Director of Nursing</p>
        </div>

        <div className="dash-body">
          {tab === "dashboard" && (
            <>
              <div className="dash-fill">
                <div className="dash-fill-top">
                  <span className="dash-fill-lbl">Fill Rate</span>
                  <span className="dash-chip">
                    This Week
                    <svg width="11" height="7" viewBox="0 0 11 7" fill="none" aria-hidden="true">
                      <path d="M1 1.2 5.5 5.6 10 1.2" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
                <div className="dash-gauge">
                  <svg viewBox="0 0 240 128" role="img" aria-label={`Fill rate ${pct} percent`}>
                    <path d="M22 116 A 98 98 0 0 1 218 116" fill="none" stroke="rgba(255,255,255,.20)" strokeWidth="17" strokeLinecap="round" />
                    <path d="M22 116 A 98 98 0 0 1 218 116" fill="none" stroke="#4FE3E5" strokeWidth="17" strokeLinecap="round" strokeDasharray={ARC} strokeDashoffset={offset} />
                  </svg>
                  <div className="dash-gauge-val"><b>{pct}</b><i>%</i></div>
                  <div className="dash-gauge-sub">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="12" r="9" stroke="#BFF3F4" strokeWidth="1.9" />
                      <path d="M8.2 12.3l2.5 2.5 5-5.2" stroke="#BFF3F4" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Excellent
                  </div>
                </div>
                <div className="dash-ends"><span>0%</span><span>100%</span></div>
                <p className="dash-fill-note">Every shift is covered for this weekend.</p>
              </div>

              <div className="dash-panel">
                <div className="dash-rowh">
                  <h4>Overview</h4>
                  <span onClick={() => setTab("shifts")} style={{ cursor: "pointer" }}>View All</span>
                </div>
                <div className="dash-tiles">
                  <div className="dash-tile">
                    <span className="dash-tile-ic"><IconTeam /></span>
                    <div className="dash-tile-n">52</div>
                    <div className="dash-tile-l">Total Shifts</div>
                  </div>
                  <div className="dash-tile">
                    <span className="dash-tile-ic"><IconCheck /></span>
                    <div className="dash-tile-n">52</div>
                    <div className="dash-tile-l">Filled Shifts</div>
                  </div>
                  <div className="dash-tile">
                    <span className="dash-tile-ic"><IconCal /></span>
                    <div className="dash-tile-n">0</div>
                    <div className="dash-tile-l">Open Shifts</div>
                  </div>
                </div>

                <div className="dash-rowh">
                  <h4>Upcoming Shifts</h4>
                  <span onClick={() => setTab("shifts")} style={{ cursor: "pointer" }}>View Schedule</span>
                </div>
                {UPCOMING.map((s) => (
                  <div className="dash-shift" key={`${s.day}-${s.time}`}>
                    <span className="dash-av"><img src={s.photo} alt="" /></span>
                    <span className="dash-meta">
                      <span className="dash-d">{s.day}</span>
                      <span className="dash-t">{s.time}</span>
                    </span>
                    <span className="dash-pill">{s.status}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === "shifts" && (
            <div className="dash-panel" style={{ paddingBottom: 20 }}>
              <div className="dash-rowh">
                <h4>This Weekend's Schedule</h4>
                <span>Fri &ndash; Sun</span>
              </div>
              {SCHEDULE.map((d) => (
                <div key={d.day}>
                  <div className="dash-day-label">{d.day}</div>
                  {d.shifts.map((s) => (
                    <div className="dash-shift" key={s.time}>
                      <span className="dash-av"><img src={PHOTO_BY_NAME[s.name]} alt="" /></span>
                      <span className="dash-meta">
                        <span className="dash-d">{s.name}</span>
                        <span className="dash-t">{s.time} &middot; {s.role}</span>
                      </span>
                      <span className="dash-pill">Filled</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {tab === "team" && (
            <div className="dash-panel" style={{ paddingBottom: 20 }}>
              <div className="dash-rowh">
                <h4>Your Pod</h4>
                <span>6 Members</span>
              </div>
              {ROSTER.map((r) => (
                <div className="dash-shift" key={r.name}>
                  <span className="dash-av"><img src={r.photo} alt="" /></span>
                  <span className="dash-meta">
                    <span className="dash-d">{r.name}</span>
                    <span className="dash-t">{r.role}</span>
                  </span>
                  <span className="dash-pill" style={!r.on ? { background: "#E4EDEF", color: "#6A7A8C" } : undefined}>
                    {r.on ? "This Weekend" : "Off"}
                  </span>
                </div>
              ))}
            </div>
          )}

          {tab === "messages" && (
            <div className="dash-panel" style={{ paddingBottom: 8 }}>
              <div className="dash-rowh">
                <h4>Messages</h4>
                <span>Mark All Read</span>
              </div>
              {MESSAGES.map((m, i) => (
                <div className="dash-msg" key={i}>
                  <span className="dash-msg-dot" />
                  <div className="dash-msg-body">
                    <span className="dash-msg-time">{m.time}</span>
                    <div className="dash-msg-from">{m.from}</div>
                    <p className="dash-msg-preview">{m.preview}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "more" && (
            <div className="dash-panel" style={{ paddingBottom: 8 }}>
              <div className="dash-rowh">
                <h4>More</h4>
              </div>
              <div className="dash-menu-row"><span>Facility Profile</span><span className="chev"><IconChevron /></span></div>
              <div className="dash-menu-row"><span>Billing &amp; Invoices</span><span className="chev"><IconChevron /></span></div>
              <div className="dash-menu-row"><span>Reports</span><span className="chev"><IconChevron /></span></div>
              <div className="dash-menu-row"><span>Notification Settings</span><span className="chev"><IconChevron /></span></div>
              <div className="dash-menu-row"><span>Support</span><span className="chev"><IconChevron /></span></div>
              <Link to="/" className="dash-menu-row" style={{ color: "#C0392B" }}><span>Log Out</span><span className="chev"><IconChevron /></span></Link>
            </div>
          )}
        </div>

        <div className="dash-tabs">
          <span className={`dash-tab${tab === "dashboard" ? " on" : ""}`} onClick={() => setTab("dashboard")}>
            <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <rect x="3.2" y="3.2" width="7.6" height="7.6" rx="2" />
              <rect x="13.2" y="3.2" width="7.6" height="7.6" rx="2" />
              <rect x="3.2" y="13.2" width="7.6" height="7.6" rx="2" />
              <rect x="13.2" y="13.2" width="7.6" height="7.6" rx="2" />
            </svg>
            <span>Dashboard</span>
          </span>
          <span className={`dash-tab${tab === "shifts" ? " on" : ""}`} onClick={() => setTab("shifts")}><IconCal /><span>Shifts</span></span>
          <span className={`dash-tab${tab === "team" ? " on" : ""}`} onClick={() => setTab("team")}><IconTeam /><span>Team</span></span>
          <span className={`dash-tab${tab === "messages" ? " on" : ""}`} onClick={() => setTab("messages")}><IconMsg /><span>Messages</span></span>
          <span className={`dash-tab${tab === "more" ? " on" : ""}`} onClick={() => setTab("more")}><IconMore /><span>More</span></span>
        </div>
      </div>
    </>
  );
}
