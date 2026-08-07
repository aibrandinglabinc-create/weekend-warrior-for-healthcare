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
    { time: "6:00 PM – 6:00 AM", name: "Weekend Warrior Float", role: "Phlebotomist", float: true },
  ]},
];

const MESSAGES = [
  { from: "Pulse Staffing", time: "9:14 AM", preview: "Your weekend pod is fully confirmed for May 24 through 26. No action needed." },
  { from: "Weekend Warrior System", time: "Yesterday", preview: "Priya Nair's LPN license renewal was verified and is on file." },
  { from: "Pulse Staffing", time: "Monday", preview: "Trevor Boone has been added to your pod starting this weekend." },
  { from: "Weekend Warrior System", time: "Last week", preview: "Your 90 day retention report is ready to view." },
];

type MoreView = "menu" | "profile" | "billing" | "reports" | "notifications" | "support"
  | "report-coverage" | "report-retention" | "report-history";

const INVOICES = [
  { month: "May 2026", amount: "$27,550", status: "Paid" },
  { month: "April 2026", amount: "$27,550", status: "Paid" },
  { month: "March 2026", amount: "$27,550", status: "Paid" },
];

const REPORTS: { name: string; desc: string; view: MoreView }[] = [
  { name: "Weekend Coverage Summary", desc: "Fill rate and shift history, month by month", view: "report-coverage" },
  { name: "90 Day Retention Report", desc: "Pod continuity and clinician retention", view: "report-retention" },
  { name: "Shift History Export", desc: "Every shift, clinician, and status as a CSV", view: "report-history" },
];

const COVERAGE_MONTHS = [
  { month: "May 2026", pct: 100, filled: 12, total: 12 },
  { month: "April 2026", pct: 100, filled: 24, total: 24 },
  { month: "March 2026", pct: 96, filled: 25, total: 26 },
  { month: "February 2026", pct: 100, filled: 24, total: 24 },
  { month: "January 2026", pct: 92, filled: 24, total: 26 },
];

const RETENTION_ROWS = [
  { name: "Maria Alvarez", role: "RN", tenure: "9 months", weekends: 38 },
  { name: "James Okafor", role: "RN", tenure: "7 months", weekends: 30 },
  { name: "Priya Nair", role: "LPN", tenure: "6 months", weekends: 26 },
  { name: "Dana Wicklund", role: "CNA", tenure: "5 months", weekends: 21 },
  { name: "Trevor Boone", role: "CNA", tenure: "2 weeks", weekends: 2 },
  { name: "Sofia Reyes", role: "Phlebotomist", tenure: "4 months", weekends: 17 },
];

const WEEKS = [
  { label: "This Week", pct: 100, note: "Every shift is covered for this weekend." },
  { label: "Next Week", pct: 100, note: "Every shift is covered for next weekend." },
  { label: "In 2 Weeks", pct: 92, note: "Weekend Warrior is filling 1 open seat. No action needed on your end." },
];

const WEEKENDS = [
  { range: "May 24 to 26", detail: "6 Warriors, 12 shifts", status: "Filled", filling: false },
  { range: "May 31 to June 2", detail: "6 Warriors, 12 shifts", status: "Filled", filling: false },
  { range: "June 7 to 9", detail: "5 Warriors confirmed, 1 seat in progress", status: "Filling", filling: true },
  { range: "June 14 to 16", detail: "6 Warriors, 12 shifts", status: "Filled", filling: false },
];

const HISTORY_ROWS = [
  { date: "May 17", name: "Maria Alvarez", role: "RN", shift: "6:00 AM – 6:00 PM", status: "Completed" },
  { date: "May 17", name: "James Okafor", role: "RN", shift: "6:00 PM – 6:00 AM", status: "Completed" },
  { date: "May 17", name: "Priya Nair", role: "LPN", shift: "6:00 AM – 6:00 PM", status: "Completed" },
  { date: "May 18", name: "Dana Wicklund", role: "CNA", shift: "6:00 AM – 6:00 PM", status: "Completed" },
  { date: "May 18", name: "Sofia Reyes", role: "Phlebotomist", shift: "6:00 AM – 6:00 PM", status: "Completed" },
  { date: "May 19", name: "Trevor Boone", role: "CNA", shift: "6:00 PM – 6:00 AM", status: "Completed" },
];

function Dashboard() {
  const ARC = 307.9;
  const pct = 100;
  const offset = ARC - (ARC * pct) / 100;
  const [tab, setTabRaw] = useState<"dashboard" | "shifts" | "team" | "messages" | "more">("dashboard");
  const [moreView, setMoreView] = useState<MoreView>("menu");
  const setTab = (t: typeof tab) => { setTabRaw(t); setMoreView("menu"); };

  const [editingProfile, setEditingProfile] = useState(false);
  const [profile, setProfile] = useState({
    name: "Chrissy Morgan",
    title: "Director of Nursing",
    email: "c.morgan@sunrisemanor.com",
    phone: "(555) 204-8831",
  });
  const [profileDraft, setProfileDraft] = useState(profile);

  const [notifs, setNotifs] = useState({
    fill: true,
    confirmations: true,
    podChanges: true,
    weekly: false,
  });

  const [weekIdx, setWeekIdx] = useState(0);
  const [weekMenuOpen, setWeekMenuOpen] = useState(false);
  const week = WEEKS[weekIdx];
  const weekOffset = ARC - (ARC * week.pct) / 100;

  return (
    <>
      <div className="dash-utility">
        <span>Facility Demo &middot; Sunrise Manor Care Center</span>
        <Link to="/">Log Out</Link>
      </div>

      <div className="dash-page">
        <div className="dash-appbar">
          <span className="dash-hamb"><span /><span /><span /></span>
          <span className="dash-bell" onClick={() => setTab("messages")} role="button" aria-label="Notifications" style={{ cursor: "pointer" }}>
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
            <div className="dash-grid">
              <div className="dash-fill">
                <div className="dash-fill-top">
                  <span className="dash-fill-lbl">Fill Rate</span>
                  <span style={{ position: "relative" }}>
                    <span className="dash-chip" onClick={() => setWeekMenuOpen(!weekMenuOpen)} role="button" aria-expanded={weekMenuOpen} style={{ cursor: "pointer" }}>
                      {week.label}
                      <svg width="11" height="7" viewBox="0 0 11 7" fill="none" aria-hidden="true">
                        <path d="M1 1.2 5.5 5.6 10 1.2" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {weekMenuOpen && (
                      <span className="dash-week-menu">
                        {WEEKS.map((w, i) => (
                          <span
                            key={w.label}
                            className={`dash-week-opt${i === weekIdx ? " on" : ""}`}
                            onClick={() => { setWeekIdx(i); setWeekMenuOpen(false); }}
                          >
                            {w.label}
                          </span>
                        ))}
                      </span>
                    )}
                  </span>
                </div>
                <div className="dash-gauge">
                  <svg viewBox="0 0 240 128" role="img" aria-label={`Fill rate ${week.pct} percent`}>
                    <path d="M22 116 A 98 98 0 0 1 218 116" fill="none" stroke="rgba(255,255,255,.20)" strokeWidth="17" strokeLinecap="round" />
                    <path d="M22 116 A 98 98 0 0 1 218 116" fill="none" stroke="#4FE3E5" strokeWidth="17" strokeLinecap="round" strokeDasharray={ARC} strokeDashoffset={weekOffset} />
                  </svg>
                  <div className="dash-gauge-val"><b>{week.pct}</b><i>%</i></div>
                  <div className="dash-gauge-sub">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="12" r="9" stroke="#BFF3F4" strokeWidth="1.9" />
                      <path d="M8.2 12.3l2.5 2.5 5-5.2" stroke="#BFF3F4" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {week.pct >= 95 ? "Excellent" : "Filling"}
                  </div>
                </div>
                <div className="dash-ends"><span>0%</span><span>100%</span></div>
                <p className="dash-fill-note">{week.note}</p>
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
            </div>
          )}

          {tab === "shifts" && (
            <>
            <div className="dash-panel" style={{ paddingBottom: 20 }}>
              <div className="dash-rowh">
                <h4>Upcoming Weekends</h4>
                <span>Next 4</span>
              </div>
              {WEEKENDS.map((w) => (
                <div className="dash-shift" key={w.range}>
                  <span className="dash-meta">
                    <span className="dash-d">{w.range}</span>
                    <span className="dash-t">{w.detail}</span>
                  </span>
                  <span className="dash-pill" style={w.filling ? { background: "rgba(0,181,184,0.14)", color: "var(--teal-dark)", border: "1.5px solid rgba(0,181,184,0.4)" } : undefined}>
                    {w.status}
                  </span>
                </div>
              ))}
              <p style={{ fontSize: 12, color: "#8A97A6", lineHeight: 1.6, marginTop: 4 }}>
                Seats marked Filling are being covered by Weekend Warrior. Nothing is required from your facility.
              </p>
            </div>
            <div className="dash-panel" style={{ paddingBottom: 20 }}>
              <div className="dash-rowh">
                <h4>This Weekend's Schedule</h4>
                <span>Fri &ndash; Sun</span>
              </div>
              <div className="dash-grid-cols">
                {SCHEDULE.map((d) => (
                  <div key={d.day}>
                    <div className="dash-day-label">{d.day}</div>
                    {d.shifts.map((s) => (
                      <div className="dash-shift" key={s.time}>
                        {"float" in s && s.float ? (
                          <span className="dash-av dash-av-fallback" aria-hidden="true">WW</span>
                        ) : (
                          <span className="dash-av"><img src={PHOTO_BY_NAME[s.name]} alt="" /></span>
                        )}
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
            </div>
            </>
          )}

          {tab === "team" && (
            <div className="dash-panel" style={{ paddingBottom: 20 }}>
              <div className="dash-rowh">
                <h4>Your Weekend Warriors</h4>
                <span>6 Members</span>
              </div>
              <div className="dash-grid-cols">
                {ROSTER.map((r) => (
                  <div className="dash-shift" key={r.name}>
                    <span className="dash-av"><img src={r.photo} alt="" /></span>
                    <span className="dash-meta">
                      <span className="dash-d">{r.name}</span>
                      <span className="dash-t">{r.on ? r.role : `${r.role} · Weekend Warrior is filling this seat`}</span>
                    </span>
                    <span className="dash-pill" style={!r.on ? { background: "rgba(0,181,184,0.14)", color: "var(--teal-dark)", border: "1.5px solid rgba(0,181,184,0.4)" } : undefined}>
                      {r.on ? "This Weekend" : "Covered"}
                    </span>
                  </div>
                ))}
              </div>
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

          {tab === "more" && moreView === "menu" && (
            <div className="dash-panel" style={{ paddingBottom: 8 }}>
              <div className="dash-rowh">
                <h4>More</h4>
              </div>
              <div className="dash-menu-row" onClick={() => setMoreView("profile")}><span>Facility Profile</span><span className="chev"><IconChevron /></span></div>
              <div className="dash-menu-row" onClick={() => setMoreView("billing")}><span>Billing &amp; Invoices</span><span className="chev"><IconChevron /></span></div>
              <div className="dash-menu-row" onClick={() => setMoreView("reports")}><span>Reports</span><span className="chev"><IconChevron /></span></div>
              <div className="dash-menu-row" onClick={() => setMoreView("notifications")}><span>Notification Settings</span><span className="chev"><IconChevron /></span></div>
              <div className="dash-menu-row" onClick={() => setMoreView("support")}><span>Support</span><span className="chev"><IconChevron /></span></div>
              <Link to="/" className="dash-menu-row" style={{ color: "#C0392B" }}><span>Log Out</span><span className="chev"><IconChevron /></span></Link>
            </div>
          )}

          {tab === "more" && moreView === "profile" && (
            <div className="dash-panel" style={{ paddingBottom: 22 }}>
              <button className="dash-back" onClick={() => { setMoreView("menu"); setEditingProfile(false); }}>&larr; More</button>
              <div className="dash-rowh">
                <h4>Facility Profile</h4>
                {!editingProfile && (
                  <span onClick={() => { setProfileDraft(profile); setEditingProfile(true); }} style={{ cursor: "pointer" }}>Edit</span>
                )}
              </div>

              <div className="dash-day-label">Facility</div>
              <div className="dash-info-row"><span>Name</span><b>Sunrise Manor Care Center</b></div>
              <div className="dash-info-row"><span>Type</span><b>Skilled Nursing Facility</b></div>
              <div className="dash-info-row"><span>Beds</span><b>120</b></div>
              <div className="dash-info-row"><span>Location</span><b>Dallas, TX 75201</b></div>

              <div className="dash-day-label" style={{ marginTop: 22 }}>Administrator</div>
              {editingProfile ? (
                <>
                  <div className="dash-edit-field"><span>Name</span><input value={profileDraft.name} onChange={(e) => setProfileDraft({ ...profileDraft, name: e.target.value })} /></div>
                  <div className="dash-edit-field"><span>Title</span><input value={profileDraft.title} onChange={(e) => setProfileDraft({ ...profileDraft, title: e.target.value })} /></div>
                  <div className="dash-edit-field"><span>Email</span><input type="email" value={profileDraft.email} onChange={(e) => setProfileDraft({ ...profileDraft, email: e.target.value })} /></div>
                  <div className="dash-edit-field"><span>Phone</span><input type="tel" value={profileDraft.phone} onChange={(e) => setProfileDraft({ ...profileDraft, phone: e.target.value })} /></div>
                  <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                    <button className="btn btn-solid" style={{ flex: 1, justifyContent: "center" }} onClick={() => { setProfile(profileDraft); setEditingProfile(false); }}>Save</button>
                    <button className="dash-back" style={{ margin: 0 }} onClick={() => setEditingProfile(false)}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="dash-info-row"><span>Name</span><b>{profile.name}</b></div>
                  <div className="dash-info-row"><span>Title</span><b>{profile.title}</b></div>
                  <div className="dash-info-row"><span>Email</span><b>{profile.email}</b></div>
                  <div className="dash-info-row"><span>Phone</span><b>{profile.phone}</b></div>
                </>
              )}
            </div>
          )}

          {tab === "more" && moreView === "billing" && (
            <div className="dash-panel" style={{ paddingBottom: 22 }}>
              <button className="dash-back" onClick={() => setMoreView("menu")}>&larr; More</button>
              <div className="dash-rowh">
                <h4>Billing &amp; Invoices</h4>
              </div>
              <div className="dash-info-row"><span>Plan</span><b>Weekend Warrior Subscription</b></div>
              <div className="dash-info-row"><span>Billing Cycle</span><b>Monthly, on the 1st</b></div>
              <div className="dash-info-row"><span>Payment Method</span><b>ACH &middot; Account ending 4471</b></div>

              <div className="dash-day-label" style={{ marginTop: 22 }}>Recent Invoices</div>
              {INVOICES.map((inv) => (
                <div className="dash-shift" key={inv.month}>
                  <span className="dash-meta">
                    <span className="dash-d">{inv.month}</span>
                    <span className="dash-t">{inv.amount}</span>
                  </span>
                  <span className="dash-pill">{inv.status}</span>
                </div>
              ))}
            </div>
          )}

          {tab === "more" && moreView === "reports" && (
            <div className="dash-panel" style={{ paddingBottom: 22 }}>
              <button className="dash-back" onClick={() => setMoreView("menu")}>&larr; More</button>
              <div className="dash-rowh">
                <h4>Reports</h4>
              </div>
              {REPORTS.map((r) => (
                <div className="dash-shift" key={r.name} onClick={() => setMoreView(r.view)} style={{ cursor: "pointer" }}>
                  <span className="dash-meta">
                    <span className="dash-d">{r.name}</span>
                    <span className="dash-t">{r.desc}</span>
                  </span>
                  <span className="dash-pill">View</span>
                </div>
              ))}
            </div>
          )}

          {tab === "more" && moreView === "report-coverage" && (
            <div className="dash-panel" style={{ paddingBottom: 22 }}>
              <button className="dash-back" onClick={() => setMoreView("reports")}>&larr; Reports</button>
              <div className="dash-rowh">
                <h4>Weekend Coverage Summary</h4>
                <span>2026</span>
              </div>
              <div className="dash-tiles" style={{ marginBottom: 20 }}>
                <div className="dash-tile">
                  <div className="dash-tile-n">98%</div>
                  <div className="dash-tile-l">Average Fill Rate</div>
                </div>
                <div className="dash-tile">
                  <div className="dash-tile-n">109</div>
                  <div className="dash-tile-l">Shifts Filled</div>
                </div>
                <div className="dash-tile">
                  <div className="dash-tile-n">3</div>
                  <div className="dash-tile-l">Open, Backfilled</div>
                </div>
              </div>
              {COVERAGE_MONTHS.map((m) => (
                <div className="dash-report-bar" key={m.month}>
                  <div className="dash-report-bar-top">
                    <span>{m.month}</span>
                    <b>{m.pct}% &middot; {m.filled} of {m.total} shifts</b>
                  </div>
                  <div className="dash-report-track"><div className="dash-report-fill" style={{ width: `${m.pct}%` }} /></div>
                </div>
              ))}
            </div>
          )}

          {tab === "more" && moreView === "report-retention" && (
            <div className="dash-panel" style={{ paddingBottom: 22 }}>
              <button className="dash-back" onClick={() => setMoreView("reports")}>&larr; Reports</button>
              <div className="dash-rowh">
                <h4>90 Day Retention Report</h4>
              </div>
              <div className="dash-tiles" style={{ marginBottom: 20 }}>
                <div className="dash-tile">
                  <div className="dash-tile-n">98%</div>
                  <div className="dash-tile-l">90-Day Retention</div>
                </div>
                <div className="dash-tile">
                  <div className="dash-tile-n">6</div>
                  <div className="dash-tile-l">Active Warriors</div>
                </div>
                <div className="dash-tile">
                  <div className="dash-tile-n">5.5</div>
                  <div className="dash-tile-l">Avg Months on Pod</div>
                </div>
              </div>
              {RETENTION_ROWS.map((r) => (
                <div className="dash-shift" key={r.name}>
                  <span className="dash-av"><img src={PHOTO_BY_NAME[r.name]} alt="" /></span>
                  <span className="dash-meta">
                    <span className="dash-d">{r.name}</span>
                    <span className="dash-t">{r.role} &middot; {r.tenure} on this pod</span>
                  </span>
                  <span className="dash-t" style={{ flex: "none" }}>{r.weekends} weekends</span>
                </div>
              ))}
            </div>
          )}

          {tab === "more" && moreView === "report-history" && (
            <div className="dash-panel" style={{ paddingBottom: 22 }}>
              <button className="dash-back" onClick={() => setMoreView("reports")}>&larr; Reports</button>
              <div className="dash-rowh">
                <h4>Shift History</h4>
                <span>Last 2 Weekends</span>
              </div>
              {HISTORY_ROWS.map((h, i) => (
                <div className="dash-shift" key={i}>
                  <span className="dash-av"><img src={PHOTO_BY_NAME[h.name]} alt="" /></span>
                  <span className="dash-meta">
                    <span className="dash-d">{h.name}</span>
                    <span className="dash-t">{h.date} &middot; {h.shift} &middot; {h.role}</span>
                  </span>
                  <span className="dash-pill">{h.status}</span>
                </div>
              ))}
              <button className="btn btn-solid" style={{ width: "100%", justifyContent: "center", marginTop: 14 }}>Download CSV</button>
            </div>
          )}

          {tab === "more" && moreView === "notifications" && (
            <div className="dash-panel" style={{ paddingBottom: 22 }}>
              <button className="dash-back" onClick={() => setMoreView("menu")}>&larr; More</button>
              <div className="dash-rowh">
                <h4>Notification Settings</h4>
              </div>
              {([
                { key: "fill", label: "Fill rate alerts", desc: "Alert me if a weekend drops below full coverage" },
                { key: "confirmations", label: "Shift confirmations", desc: "Notify me as each shift is confirmed" },
                { key: "podChanges", label: "Pod changes", desc: "Notify me when a Weekend Warrior joins or leaves my pod" },
                { key: "weekly", label: "Weekly summary", desc: "Email me a coverage recap every Monday" },
              ] as const).map((n) => (
                <div className="dash-toggle-row" key={n.key}>
                  <div>
                    <div className="dash-d">{n.label}</div>
                    <div className="dash-t">{n.desc}</div>
                  </div>
                  <button
                    className={`dash-toggle${notifs[n.key] ? " on" : ""}`}
                    role="switch"
                    aria-checked={notifs[n.key]}
                    onClick={() => setNotifs({ ...notifs, [n.key]: !notifs[n.key] })}
                  ><span /></button>
                </div>
              ))}
            </div>
          )}

          {tab === "more" && moreView === "support" && (
            <div className="dash-panel" style={{ paddingBottom: 22 }}>
              <button className="dash-back" onClick={() => setMoreView("menu")}>&larr; More</button>
              <div className="dash-rowh">
                <h4>Support</h4>
              </div>
              <p style={{ fontSize: 13.5, color: "#6A7A8C", lineHeight: 1.65, marginBottom: 18 }}>
                Your facility has a dedicated Pulse Staffing partner. Coverage questions, pod changes, and billing all go to one person, not a queue.
              </p>
              <div className="dash-info-row"><span>Phone</span><b>(346) 251-0261</b></div>
              <div className="dash-info-row"><span>Email</span><b>support@pulsestaffing.com</b></div>
              <div className="dash-info-row"><span>Hours</span><b>7 days a week, 6:00 AM to 10:00 PM CT</b></div>
              <a href="mailto:support@pulsestaffing.com" className="btn btn-solid" style={{ display: "flex", justifyContent: "center", marginTop: 18 }}>Email Support</a>
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
