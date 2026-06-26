import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks } from "../../data/navLinks";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition ${scrolled ? "border-slate-200 bg-white/95 shadow-sm backdrop-blur" : "border-slate-200 bg-white"}`}>
      <div className="container-custom flex h-20 items-center justify-between lg:h-24">
        <Link to="/" className="flex items-center gap-3" aria-label="TopLink Security home">
          <span className="flex h-14 w-14 items-center justify-center overflow-hidden">
            <img src="/assets/logo-transparent.png" alt="" className="h-full w-full object-contain" />
          </span>
          <span className="text-lg font-black uppercase leading-none tracking-[0.08em] text-[#0B2F50] sm:text-xl">
            TopLink Security
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <NavLink key={link.name} to={link.path} className={({ isActive }) => `border-b-2 py-2 text-xs font-bold uppercase tracking-[0.08em] transition ${isActive ? "border-[#0CA4B8] text-[#0B2F50]" : "border-transparent text-slate-600 hover:border-[#0CA4B8] hover:text-[#0B2F50]"}`}>
              {link.name}
            </NavLink>
          ))}
        </nav>

        <Link to="/contact" className="hidden border border-[#0B2F50] px-5 py-3 text-xs font-extrabold uppercase tracking-[0.08em] text-[#0B2F50] transition hover:bg-[#0B2F50] hover:text-white lg:inline-flex">
          Book a Discussion
        </Link>

        <button className="p-2 text-[#0B2F50] lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-5 py-6 lg:hidden">
          <nav className="container-custom grid gap-1">
            {navLinks.map((link) => (
              <NavLink key={link.name} to={link.path} onClick={() => setOpen(false)} className="border-b border-slate-200 px-1 py-4 text-sm font-bold uppercase tracking-[0.08em] text-[#0B2F50]">
                {link.name}
              </NavLink>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="mt-5 bg-[#0B2F50] px-5 py-4 text-center text-xs font-extrabold uppercase tracking-[0.08em] text-white">Book a Discussion</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
