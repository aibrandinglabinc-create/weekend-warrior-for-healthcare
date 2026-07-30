const css = `
.pc-wrap{--pc-teal:#00B5B8;--pc-teal-light:#2DD4D7;--pc-teal-dark:#007A7C;--pc-navy:#0A1F3C;--pc-navy2:#0D2847;--pc-navy-deep:#071730;--pc-ink:#0D2340;--pc-slate:#6A7A8C;--pc-slate2:#8A97A6;
  position:relative;display:flex;flex-direction:column;align-items:center;gap:34px;font-family:'Montserrat',system-ui,sans-serif;font-weight:300;padding:24px 16px;}
.pc-wrap *{margin:0;padding:0;box-sizing:border-box;}
.pc-eyebrow{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:4px;text-transform:uppercase;color:var(--pc-teal-dark);text-align:center;}
.pc-phone{position:relative;width:392px;max-width:100%;padding:11px;border-radius:58px;
  background:linear-gradient(150deg,#E8ECEE 0%,#B9C2C8 18%,#8E999F 40%,#D5DBDF 62%,#9AA5AB 84%,#E4E8EA 100%);
  box-shadow:0 2px 3px rgba(255,255,255,.9) inset,0 40px 90px -30px rgba(10,31,60,.45),0 12px 34px -12px rgba(10,31,60,.28);}
.pc-phone::before{content:'';position:absolute;inset:6px;border-radius:53px;border:1px solid rgba(255,255,255,.35);pointer-events:none;z-index:5;}
.pc-btn{position:absolute;background:linear-gradient(180deg,#AAB4BA,#7F8A91);border-radius:2px;}
.pc-btn.silent{left:-2px;top:132px;width:3px;height:30px;}
.pc-btn.up{left:-2px;top:184px;width:3px;height:58px;}
.pc-btn.down{left:-2px;top:254px;width:3px;height:58px;}
.pc-btn.power{right:-2px;top:200px;width:3px;height:86px;}
.pc-screen{position:relative;width:370px;max-width:100%;height:800px;border-radius:48px;overflow:hidden;
  background:linear-gradient(178deg,var(--pc-navy) 0%,var(--pc-navy2) 46%,var(--pc-navy-deep) 100%);display:flex;flex-direction:column;}
.pc-island{position:absolute;top:11px;left:50%;transform:translateX(-50%);width:106px;height:31px;border-radius:18px;background:#000;z-index:4;display:flex;align-items:center;justify-content:flex-end;padding-right:10px;}
.pc-cam{width:9px;height:9px;border-radius:50%;background:#101B26;box-shadow:0 0 0 1px rgba(255,255,255,.06);}
.pc-status{display:flex;justify-content:space-between;align-items:center;padding:15px 26px 0;height:46px;flex:none;position:relative;z-index:3;}
.pc-time{font-size:14px;font-weight:600;color:#fff;letter-spacing:.2px;}
.pc-icons{display:flex;align-items:center;gap:6px;}
.pc-bars{display:flex;align-items:flex-end;gap:2px;}
.pc-bars i{display:block;width:3px;background:#fff;border-radius:1px;}
.pc-bars i:nth-child(1){height:4px;}.pc-bars i:nth-child(2){height:6px;}
.pc-bars i:nth-child(3){height:8px;}.pc-bars i:nth-child(4){height:10px;}
.pc-batt{width:24px;height:12px;border:1.4px solid #fff;border-radius:3px;padding:1.6px;position:relative;}
.pc-batt::after{content:'';position:absolute;right:-3.4px;top:3.4px;width:2px;height:4px;background:#fff;border-radius:0 1px 1px 0;}
.pc-batt span{display:block;height:100%;width:84%;background:#fff;border-radius:1px;}
.pc-appbar{display:flex;justify-content:space-between;align-items:center;padding:6px 24px 0;flex:none;}
.pc-hamb{display:flex;flex-direction:column;gap:4.5px;}
.pc-hamb span{display:block;width:21px;height:2px;background:#fff;border-radius:2px;}
.pc-hamb span:last-child{width:15px;}
.pc-bell{position:relative;width:26px;height:26px;}
.pc-badge{position:absolute;top:-4px;right:-5px;min-width:16px;height:16px;border-radius:50%;background:var(--pc-teal);color:#04262B;font-family:'Space Mono',monospace;font-size:9px;font-weight:700;display:grid;place-items:center;border:2px solid var(--pc-navy);}
.pc-greet{padding:16px 24px 14px;flex:none;}
.pc-hi{font-size:14px;color:var(--pc-teal-light);font-weight:400;letter-spacing:.2px;}
.pc-nm{font-size:27px;font-weight:700;color:#fff;line-height:1.18;letter-spacing:-.3px;margin-top:1px;}
.pc-role{font-size:12.5px;color:var(--pc-teal);font-weight:400;letter-spacing:.2px;margin-top:2px;}
.pc-body{flex:1;padding:0 16px;display:flex;flex-direction:column;gap:13px;overflow:hidden;}
.pc-fill{border-radius:20px;padding:17px 19px 16px;flex:none;position:relative;overflow:hidden;
  background:linear-gradient(152deg,#0F8E90 0%,#0B7A7C 48%,#07686B 100%);box-shadow:0 14px 30px -14px rgba(0,120,124,.55);}
.pc-fill-pl{position:absolute;left:0;bottom:0;width:100%;opacity:.13;pointer-events:none;}
.pc-fill-top{display:flex;justify-content:space-between;align-items:center;position:relative;z-index:2;}
.pc-fill-lbl{font-size:15.5px;font-weight:600;color:#fff;letter-spacing:.1px;}
.pc-chip{display:flex;align-items:center;gap:6px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.28);border-radius:9px;padding:6px 11px;font-size:11.5px;color:#fff;font-weight:400;}
.pc-gauge{position:relative;margin:1px auto 0;width:238px;height:126px;z-index:2;}
.pc-gauge svg{display:block;width:100%;height:100%;overflow:visible;}
.pc-gauge-val{position:absolute;left:0;right:0;top:47px;text-align:center;display:flex;align-items:baseline;justify-content:center;gap:1px;}
.pc-gauge-val b{font-size:45px;font-weight:700;color:#fff;letter-spacing:-1.5px;line-height:1;}
.pc-gauge-val i{font-size:20px;font-weight:600;color:#fff;font-style:normal;}
.pc-gauge-sub{position:absolute;left:0;right:0;top:99px;text-align:center;font-size:12px;color:#BFF3F4;display:flex;align-items:center;justify-content:center;gap:5px;}
.pc-ends{display:flex;justify-content:space-between;margin:-13px 6px 0;position:relative;z-index:2;}
.pc-ends span{font-size:11.5px;color:rgba(255,255,255,.82);font-weight:400;}
.pc-fill-note{text-align:center;font-size:11.5px;color:rgba(255,255,255,.9);margin-top:11px;position:relative;z-index:2;font-weight:400;}
.pc-panel{background:#fff;border-radius:20px 20px 0 0;padding:17px 17px 0;flex:1;display:flex;flex-direction:column;gap:11px;box-shadow:0 -6px 26px -12px rgba(10,31,60,.16);}
.pc-rowh{display:flex;justify-content:space-between;align-items:baseline;}
.pc-rowh h4{font-size:15.5px;font-weight:600;color:var(--pc-ink);letter-spacing:.1px;}
.pc-rowh span{font-size:12.5px;color:var(--pc-teal-dark);font-weight:500;}
.pc-tiles{display:grid;grid-template-columns:repeat(3,1fr);gap:9px;}
.pc-tile{background:#F5F9FA;border:1px solid #E4EDEF;border-radius:13px;padding:12px 9px 11px;display:flex;flex-direction:column;gap:6px;}
.pc-tile-ic{color:var(--pc-teal);height:21px;display:flex;align-items:center;}
.pc-tile-n{font-size:25px;font-weight:700;color:var(--pc-ink);line-height:1;letter-spacing:-.5px;}
.pc-tile-l{font-size:11px;color:var(--pc-slate);font-weight:400;line-height:1.25;}
.pc-shift{display:flex;align-items:center;gap:11px;border:1px solid #E9EFF1;border-radius:13px;padding:9px 11px;background:#fff;}
.pc-av{width:37px;height:37px;border-radius:50%;flex:none;overflow:hidden;}
.pc-av svg{display:block;width:100%;height:100%;}
.pc-meta{flex:1;min-width:0;}
.pc-d{font-size:13px;font-weight:600;color:var(--pc-ink);letter-spacing:.1px;display:block;}
.pc-t{font-size:11.5px;color:var(--pc-slate2);font-weight:400;margin-top:1px;display:block;}
.pc-pill{background:var(--pc-teal);color:#04262B;border-radius:20px;padding:5px 13px;font-size:11px;font-weight:600;flex:none;letter-spacing:.2px;}
.pc-tabs{margin-top:auto;display:grid;grid-template-columns:repeat(5,1fr);padding:9px 2px 6px;border-top:1px solid #EDF2F3;}
.pc-tab{display:flex;flex-direction:column;align-items:center;gap:4px;color:#9AAAB8;}
.pc-tab.on{color:var(--pc-teal);}
.pc-tab span{font-size:9.8px;font-weight:500;letter-spacing:.1px;}
.pc-homebar{width:118px;height:4.5px;border-radius:4px;background:#C6D0D6;margin:3px auto 8px;}
.pc-caption{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:var(--pc-slate);text-align:center;}
.pc-caption b{color:var(--pc-teal-dark);font-weight:700;}
@media (max-width:430px){.pc-phone{width:100%;padding:8px;border-radius:44px;}.pc-screen{width:100%;height:720px;border-radius:38px;}}
`;

const IconTeam = () => (
  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="9" cy="8" r="3.1" stroke="currentColor" strokeWidth="1.8" />
    <path d="M3.4 18.4c0-2.9 2.5-4.6 5.6-4.6s5.6 1.7 5.6 4.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M16.2 6.2a2.9 2.9 0 0 1 0 5.5M17.6 14.3c2 .5 3.4 1.9 3.4 4.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const IconCheck = () => (
  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="8.6" stroke="currentColor" strokeWidth="1.8" />
    <path d="M8.3 12.4l2.6 2.6 5-5.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconCal = () => (
  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3.6" y="5.4" width="16.8" height="15" rx="2.6" stroke="currentColor" strokeWidth="1.8" />
    <path d="M3.6 10.1h16.8M8.4 3.4v3.6M15.6 3.4v3.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

type Shift = { day: string; time: string; status: string; avatar: "a" | "b"; photo?: string };

const AvatarA = () => (
  <svg viewBox="0 0 40 40" aria-hidden="true">
    <rect width="40" height="40" fill="#0F8E90" />
    <circle cx="20" cy="15.4" r="6.4" fill="#F6D9C4" />
    <path d="M20 6.4c4 0 6.6 2.4 6.6 6 0 1.3-.5 2.4-.5 2.4s-1-3.5-6.1-3.5-6.1 3.5-6.1 3.5-.5-1.1-.5-2.4c0-3.6 2.6-6 6.6-6Z" fill="#2E1F16" />
    <path d="M20 23.6c7 0 12.4 4 12.4 9.4v7H7.6v-7c0-5.4 5.4-9.4 12.4-9.4Z" fill="#FFFFFF" />
  </svg>
);

const AvatarB = () => (
  <svg viewBox="0 0 40 40" aria-hidden="true">
    <rect width="40" height="40" fill="#0B5F7A" />
    <circle cx="20" cy="15.4" r="6.4" fill="#EFC9A8" />
    <path d="M13.6 13.2c0-3.8 2.8-6.2 6.4-6.2s6.4 2.4 6.4 6.2c0 0-2-2.2-6.4-2.2s-6.4 2.2-6.4 2.2Z" fill="#2B2118" />
    <path d="M20 23.6c7 0 12.4 4 12.4 9.4v7H7.6v-7c0-5.4 5.4-9.4 12.4-9.4Z" fill="#FFFFFF" />
  </svg>
);

export type PulseCareDashboardProps = {
  name?: string;
  role?: string;
  fillRate?: number;
  totalShifts?: number;
  filledShifts?: number;
  openShifts?: number;
  shifts?: Shift[];
  showFrameCaption?: boolean;
};

export default function PulseCareDashboard({
  name = "Alex Morgan",
  role = "Operations Manager",
  fillRate = 100,
  totalShifts = 52,
  filledShifts = 52,
  openShifts = 0,
  shifts = [
    { day: "Today, May 24", time: "7:00 AM – 3:00 PM", status: "Filled", avatar: "a" },
    { day: "Tomorrow, May 25", time: "3:00 PM – 11:00 PM", status: "Filled", avatar: "b" },
  ],
  showFrameCaption = true,
}: PulseCareDashboardProps) {
  const ARC = 307.9;
  const pct = Math.max(0, Math.min(100, fillRate));
  const offset = ARC - (ARC * pct) / 100;
  const grade = pct >= 95 ? "Excellent" : pct >= 80 ? "On track" : "Needs coverage";
  const note = openShifts === 0 ? "All shifts are filled. Great work." : `${openShifts} open ${openShifts === 1 ? "shift" : "shifts"} left to cover.`;

  return (
    <div className="pc-wrap">
      <style>{css}</style>

      <p className="pc-eyebrow">PulseCare OS &nbsp;/&nbsp; Weekend Coverage Dashboard</p>

      <div className="pc-phone">
        <span className="pc-btn silent" />
        <span className="pc-btn up" />
        <span className="pc-btn down" />
        <span className="pc-btn power" />

        <div className="pc-screen">
          <div className="pc-island"><span className="pc-cam" /></div>

          <div className="pc-status">
            <span className="pc-time">9:41</span>
            <span className="pc-icons">
              <span className="pc-bars"><i /><i /><i /><i /></span>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
                <path d="M8 10.2 9.6 8.5a2.3 2.3 0 0 0-3.2 0L8 10.2Z" fill="#fff" />
                <path d="M4.5 6.6a5 5 0 0 1 7 0" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M2.2 4.1a8.4 8.4 0 0 1 11.6 0" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="pc-batt"><span /></span>
            </span>
          </div>

          <div className="pc-appbar">
            <span className="pc-hamb"><span /><span /><span /></span>
            <span className="pc-bell">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 4a5.4 5.4 0 0 0-5.4 5.4v3.1L5.2 15.4h13.6l-1.4-2.9V9.4A5.4 5.4 0 0 0 12 4Z" stroke="#fff" strokeWidth="1.7" strokeLinejoin="round" />
                <path d="M10.1 18.1a2 2 0 0 0 3.8 0" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
              <span className="pc-badge">3</span>
            </span>
          </div>

          <div className="pc-greet">
            <p className="pc-hi">Welcome back,</p>
            <p className="pc-nm">{name}</p>
            <p className="pc-role">{role}</p>
          </div>

          <div className="pc-body">
            <div className="pc-fill">
              <svg className="pc-fill-pl" viewBox="0 0 340 46" preserveAspectRatio="none" aria-hidden="true">
                <polyline points="0,23 46,23 60,7 74,39 88,23 140,23 156,3 172,43 188,23 240,23 254,11 268,35 282,23 340,23" fill="none" stroke="#fff" strokeWidth="2" />
              </svg>

              <div className="pc-fill-top">
                <span className="pc-fill-lbl">Fill Rate</span>
                <span className="pc-chip">
                  This Week
                  <svg width="11" height="7" viewBox="0 0 11 7" fill="none" aria-hidden="true">
                    <path d="M1 1.2 5.5 5.6 10 1.2" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>

              <div className="pc-gauge">
                <svg viewBox="0 0 240 128" role="img" aria-label={`Fill rate ${pct} percent`}>
                  <path d="M22 116 A 98 98 0 0 1 218 116" fill="none" stroke="rgba(255,255,255,.20)" strokeWidth="17" strokeLinecap="round" />
                  <path d="M22 116 A 98 98 0 0 1 218 116" fill="none" stroke="#4FE3E5" strokeWidth="17" strokeLinecap="round" strokeDasharray={ARC} strokeDashoffset={offset} />
                </svg>
                <div className="pc-gauge-val"><b>{pct}</b><i>%</i></div>
                <div className="pc-gauge-sub">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" stroke="#BFF3F4" strokeWidth="1.9" />
                    <path d="M8.2 12.3l2.5 2.5 5-5.2" stroke="#BFF3F4" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {grade}
                </div>
              </div>

              <div className="pc-ends"><span>0%</span><span>100%</span></div>
              <p className="pc-fill-note">{note}</p>
            </div>

            <div className="pc-panel">
              <div className="pc-rowh">
                <h4>Overview</h4>
                <span>View All</span>
              </div>

              <div className="pc-tiles">
                <div className="pc-tile">
                  <span className="pc-tile-ic"><IconTeam /></span>
                  <span className="pc-tile-n">{totalShifts}</span>
                  <span className="pc-tile-l">Total Shifts</span>
                </div>
                <div className="pc-tile">
                  <span className="pc-tile-ic"><IconCheck /></span>
                  <span className="pc-tile-n">{filledShifts}</span>
                  <span className="pc-tile-l">Filled Shifts</span>
                </div>
                <div className="pc-tile">
                  <span className="pc-tile-ic"><IconCal /></span>
                  <span className="pc-tile-n">{openShifts}</span>
                  <span className="pc-tile-l">Open Shifts</span>
                </div>
              </div>

              <div className="pc-rowh" style={{ marginTop: 3 }}>
                <h4>Upcoming Shifts</h4>
                <span>View Schedule</span>
              </div>

              {shifts.map((s, i) => (
                <div className="pc-shift" key={i}>
                  <span className="pc-av">{s.photo ? <img src={s.photo} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}} /> : s.avatar === "a" ? <AvatarA /> : <AvatarB />}</span>
                  <span className="pc-meta">
                    <span className="pc-d">{s.day}</span>
                    <span className="pc-t">{s.time}</span>
                  </span>
                  <span className="pc-pill">{s.status}</span>
                </div>
              ))}

              <div className="pc-tabs">
                <span className="pc-tab on">
                  <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <rect x="3.2" y="3.2" width="7.6" height="7.6" rx="2" />
                    <rect x="13.2" y="3.2" width="7.6" height="7.6" rx="2" />
                    <rect x="3.2" y="13.2" width="7.6" height="7.6" rx="2" />
                    <rect x="13.2" y="13.2" width="7.6" height="7.6" rx="2" />
                  </svg>
                  <span>Dashboard</span>
                </span>
                <span className="pc-tab"><IconCal /><span>Shifts</span></span>
                <span className="pc-tab"><IconTeam /><span>Team</span></span>
                <span className="pc-tab">
                  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M20.4 11.4c0 4.1-3.8 7.4-8.4 7.4-1 0-2-.2-2.9-.5l-4.6 1.6 1.4-3.9a7 7 0 0 1-2.3-5c0-4.1 3.8-7.4 8.4-7.4s8.4 3.3 8.4 7.4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  </svg>
                  <span>Messages</span>
                </span>
                <span className="pc-tab">
                  <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <circle cx="5.4" cy="12" r="1.9" /><circle cx="12" cy="12" r="1.9" /><circle cx="18.6" cy="12" r="1.9" />
                  </svg>
                  <span>More</span>
                </span>
              </div>

              <div className="pc-homebar" />
            </div>
          </div>
        </div>
      </div>

      {showFrameCaption && (
        <p className="pc-caption">Strategy. <b>Not Staffing.</b></p>
      )}
    </div>
  );
}
