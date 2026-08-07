import shieldLogo from "@/assets/ww-logo-shield.png";

type FootLink = { label: string; href: string };
type FootColumn = { heading: string; links: FootLink[] };

export default function Footer({
  columns,
  bottomLine,
}: {
  columns: FootColumn[];
  bottomLine: string;
}) {
  return (
    <footer>
      <div className="foot-grid">
        <div className="foot-brand">
          <img className="foot-mark" src={shieldLogo} alt="" aria-hidden="true" />
          <div className="bname">WEEKEND WARRIOR</div>
          <div className="tag">STRATEGY. NOT STAFFING.</div>
          <div className="co">A Pulse Staffing weekend pod program.</div>
        </div>
        <div className="foot-links" style={{ gridTemplateColumns: `repeat(${columns.length},minmax(130px,auto))` }}>
          {columns.map((col) => (
            <div className="foot-col" key={col.heading}>
              <div className="h">{col.heading}</div>
              {col.links.map((l) => (
                <a key={l.label} href={l.href}>{l.label}</a>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="foot-bottom">
        <span>{bottomLine}</span>
        <span className="mono">STRATEGY. NOT STAFFING.</span>
      </div>
    </footer>
  );
}
