import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const headerRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const closeOutside = (event) => {
      if (!headerRef.current?.contains(event.target)) setMenuOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, []);

  return <div ref={headerRef} className="reference-home reference-header-host" onKeyDown={(event) => {
    if (event.key === "Escape" && menuOpen) {
      setMenuOpen(false);
      menuRef.current?.focus();
    }
  }}>
    <header className="site-header">
      <div className="wrap nav">
        <Link className="brand" to="/" aria-label="TopLink Security homepage" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark" aria-hidden="true"><img src="/assets/logo-transparent.png" alt="" /></span>
          <span><span className="brand-name">TOPLINK</span><span className="brand-sub">Security &amp; Risk Advisory</span></span>
        </Link>
        <button ref={menuRef} type="button" className="menu-toggle" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "×" : "☰"}</button>
        <nav className={"nav-links" + (menuOpen ? " open" : "")} id="primary-navigation" aria-label="Main navigation" onClick={() => setMenuOpen(false)}>
          <a href={pathname === "/" ? "#decision-support" : "/#decision-support"}>Decision Support</a>
          <Link to="/services">Advisory Services</Link>
          <Link to="/about">About</Link>
          <Link to="/blog">Insights</Link>
          <Link className="btn btn-dark" to="/diagnostic">Take the Diagnostic <span className="arrow">↗</span></Link>
        </nav>
      </div>
    </header>
  </div>;
}
