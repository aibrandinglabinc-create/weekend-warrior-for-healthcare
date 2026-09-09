import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import shieldLogo from "@/assets/ww-logo-shield.png";

type NavLink = { label: string; href: string };

const FACILITY_LINKS: NavLink[] = [
  { label: "How It Works", href: "#how" },
  { label: "The Pod", href: "#pod" },
  { label: "Why It Works", href: "#proof" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const WORKER_LINKS: NavLink[] = [
  { label: "Why The Pod", href: "#why" },
  { label: "How It Works", href: "#steps" },
  { label: "The Difference", href: "#difference" },
  { label: "FAQ", href: "#join-faq" },
];

const FACILITIES_LINKS: NavLink[] = [
  { label: "What Happens Next", href: "#next" },
  { label: "The Model", href: "#model" },
  { label: "FAQ", href: "#facility-faq" },
];

export default function Nav({ variant }: { variant: "facility" | "worker" | "facilities" }) {
  useEffect(() => {
    const nav = document.getElementById("nav");
    const onScroll = () => nav?.classList.toggle("scrolled", window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links =
    variant === "facility" ? FACILITY_LINKS : variant === "worker" ? WORKER_LINKS : FACILITIES_LINKS;

  return (
    <nav id="nav">
      <Link to="/" className="brand">
        <img className="brand-mark" src={shieldLogo} alt="" aria-hidden="true" />
        <span className="brand-text">
          <span className="bname">WEEKEND WARRIOR</span>
          <span className="bsub">BY PULSE STAFFING</span>
        </span>
      </Link>
      <div className="nav-links">
        {links.map((l) => (
          <a key={l.href} href={l.href}>{l.label}</a>
        ))}
      </div>
      <div className="nav-cta">
        {variant === "facility" && (
          <>
            <Link to="/join" className="btn">Warrior Registration</Link>
            <Link to="/login" className="btn btn-ghost">Login</Link>
            <Link to="/facilities" className="btn btn-solid">Book Your Pod</Link>
          </>
        )}
        {variant === "worker" && (
          <>
            <a href="#register" className="btn btn-solid">Register</a>
            <Link to="/login" className="btn btn-ghost">Login</Link>
            <Link to="/facilities" className="btn btn-ghost">Book Your Pod</Link>
          </>
        )}
        {variant === "facilities" && (
          <>
            <Link to="/book" className="btn btn-solid">Book Your Pod</Link>
            <Link to="/login" className="btn btn-ghost">Login</Link>
            <Link to="/join" className="btn btn-ghost">For Warriors</Link>
          </>
        )}
      </div>
    </nav>
  );
}
