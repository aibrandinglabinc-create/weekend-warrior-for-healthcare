import { useEffect } from "react";
import { Link } from "@tanstack/react-router";

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

export default function Nav({ variant }: { variant: "facility" | "worker" }) {
  useEffect(() => {
    const nav = document.getElementById("nav");
    const onScroll = () => nav?.classList.toggle("scrolled", window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = variant === "facility" ? FACILITY_LINKS : WORKER_LINKS;

  return (
    <nav id="nav">
      <Link to="/" className="brand">
        <span className="bname">WEEKEND WARRIOR</span>
        <span className="bsub">BY PULSE STAFFING</span>
      </Link>
      <div className="nav-links">
        {links.map((l) => (
          <a key={l.href} href={l.href}>{l.label}</a>
        ))}
      </div>
      <div className="nav-cta">
        {variant === "facility" ? (
          <>
            <Link to="/join" className="btn">Register</Link>
            <Link to="/login" className="btn btn-ghost">Login</Link>
            <a href="#book" className="btn btn-solid">Book a Demo</a>
          </>
        ) : (
          <>
            <a href="#register" className="btn btn-solid">Register</a>
            <Link to="/login" className="btn btn-ghost">Login</Link>
            <Link to="/" className="btn btn-ghost">For Facilities</Link>
          </>
        )}
      </div>
    </nav>
  );
}
