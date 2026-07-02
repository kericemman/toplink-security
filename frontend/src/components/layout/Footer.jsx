import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const services = [
    ["Risk Assessments", "/services/risk-assessment"],
    ["Physical Security Strategy", "/services/physical-security-strategy"],
    ["Capability Development", "/services/security-training"],
    ["Executive Protection", "/services/executive-protection"],
  ];

  return (
    <footer className="bg-[#071F35] text-white">
      <div className="container-custom grid gap-12 border-b border-white/15 py-16 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr_1fr]">
        <div>
          <Link to="/" className="flex items-center gap-3">
            <span className="h-14 w-14 overflow-hidden"><img src="/assets/logo-transparent.png" alt="" className="h-full w-full object-contain" /></span>
            <span><strong className="block text-lg tracking-[0.06em]">TopLink Security</strong><small className="font-bold tracking-[0.24em] text-[#0CA4B8]">Risk Advisory</small></span>
          </Link>
          <p className="mt-6 max-w-sm text-sm leading-7 text-slate-300">Risk and security advisory for organizations protecting people, assets, and business continuity.</p>
          <div className="mt-6 flex gap-3">
            <a href="https://www.linkedin.com/in/cyprian-musanya-a5776812b" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="border border-white/20 p-2.5 hover:border-[#0CA4B8] hover:text-[#0CA4B8]"><FaLinkedinIn /></a>
            <a href="https://wa.me/254725614183" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="border border-white/20 p-2.5 hover:border-[#0CA4B8] hover:text-[#0CA4B8]"><FaWhatsapp /></a>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#D4B66E]">Company</h3>
          <div className="mt-6 grid gap-3 text-sm text-slate-300">
            <Link to="/about" className="hover:text-white">About</Link><Link to="/store" className="hover:text-white">Resources</Link><Link to="/blog" className="hover:text-white">Insights</Link><Link to="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#D4B66E]">Services</h3>
          <div className="mt-6 grid gap-3 text-sm text-slate-300">{services.map(([name, path]) => <Link key={name} to={path} className="hover:text-white">{name}</Link>)}</div>
        </div>

        <div>
          <h3 className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#D4B66E]">Connect</h3>
          <div className="mt-6 grid gap-4 text-sm text-slate-300">
            <a href="mailto:info@toplinksecurity.com" className="flex items-center gap-3 hover:text-white"><Mail size={17} className="text-[#0CA4B8]" /> info@toplinksecurity.com</a>
            <a href="tel:+254725614183" className="flex items-center gap-3 hover:text-white"><Phone size={17} className="text-[#0CA4B8]" /> +254 725 614 183</a>
            <p className="flex items-center gap-3"><MapPin size={17} className="text-[#0CA4B8]" /> Nairobi, Kenya</p>
          </div>
        </div>
      </div>
      <div className="container-custom flex flex-col justify-between gap-4 py-6 text-xs text-slate-400 sm:flex-row">
        <p>© {currentYear} TopLink Security. All rights reserved.</p>
        <div className="flex gap-5"><span>Privacy Policy</span><span>Terms of Use</span></div>
      </div>
    </footer>
  );
};

export default Footer;
