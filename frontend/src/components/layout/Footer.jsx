import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, ShieldCheck, ChevronRight } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa6";
import { useState } from "react";
import toast from "react-hot-toast";
import { subscribeToNewsletter } from "../../services/subscriberService";

const Footer = () => {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async (e) => {
    e.preventDefault();

    try {
        setLoading(true);

        await subscribeToNewsletter({ email });

        toast.success("Subscribed successfully");
        setEmail("");
    } catch (error) {
        toast.error(error?.response?.data?.message || "Subscription failed");
    } finally {
        setLoading(false);
    }
    };
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { name: "About Us", path: "/about" },
    { name: "Security Library", path: "/store" },
    { name: "Insights", path: "/blog" },
    { name: "Contact", path: "/contact" }
  ];

  const services = [
  
    { name: "Risk Assessment", path: "/services/risk-assessment" },
    { name: "Security Training", path: "/services/security-training" },
    { name: "Safety Planning", path: "/services/safety-planning" },
    { name: "Consultation", path: "/contact" },
  ];

  const socialLinks = [
    { icon: FaFacebook, href: "https://facebook.com", label: "Facebook" },
    { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
    { icon: FaLinkedinIn, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500"></div>
      
      {/* Main Footer Content */}
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="group mb-6 inline-flex items-center gap-3">
              {/* <div className="relative">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 opacity-75 blur-lg transition-all group-hover:opacity-100"></div>
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg transition-transform group-hover:scale-105">
                  <ShieldCheck size={22} className="text-white" />
                </div>
              </div> */}
              <h2 className="text-xl font-bold tracking-tight text-white">
                TopLink Security
              </h2>
            </Link>
            
            <p className="mb-6 text-sm leading-relaxed text-slate-300">
              Intelligence-led physical security assessments, awareness training,
              and preparedness solutions designed to help organizations reduce
              exposure and strengthen operational security.
            </p>
            
            {/* Social Links */}
            {/* <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-slate-800 p-2 text-slate-300 transition-all hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-white hover:shadow-lg"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div> */}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="relative mb-6 inline-block text-base font-semibold text-white">
              Quick Links
              <span className="absolute -bottom-2 left-0 h-0.5 w-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"></span>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="group flex items-center text-sm text-slate-300 transition-all hover:text-white"
                  >
                    <ChevronRight size={14} className="mr-2 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="relative mb-6 inline-block text-base font-semibold text-white">
              Services
              <span className="absolute -bottom-2 left-0 h-0.5 w-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"></span>
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.path}
                    className="group flex items-center text-sm text-slate-300 transition-all hover:text-white"
                  >
                    <ChevronRight size={14} className="mr-2 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {service.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="relative mb-6 inline-block text-base font-semibold text-white">
              Get in Touch
              <span className="absolute -bottom-2 left-0 h-0.5 w-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"></span>
            </h3>
            <ul className="space-y-4">
              <li className="group flex items-start gap-3 text-sm text-slate-300 transition-all hover:text-white">
                <Mail size={18} className="mt-0.5 flex-shrink-0 text-blue-400 transition-all group-hover:scale-110" />
                <span>info@toplinksecurity.com</span>
              </li>
              <li className="group flex items-start gap-3 text-sm text-slate-300 transition-all hover:text-white">
                <Phone size={18} className="mt-0.5 flex-shrink-0 text-blue-400 transition-all group-hover:scale-110" />
                <span>+254 725 614 183</span>
              </li>
              <li className="group flex items-start gap-3 text-sm text-slate-300 transition-all hover:text-white">
                <MapPin size={18} className="mt-0.5 flex-shrink-0 text-blue-400 transition-all group-hover:scale-110" />
                <span>Nairobi, Kenya</span>
              </li>
            </ul>
            
            {/* Newsletter CTA */}
            <div className="mt-8 rounded-xl bg-slate-800 p-6">
                <h3 className="mb-4 font-semibold text-white">Security Updates</h3>
                <p className="mb-4 text-sm leading-6 text-slate-300">
                    Subscribe to receive new security articles and professional insights.
                </p>

                <form onSubmit={handleSubscribe} className="grid gap-3">
                    <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400 focus:border-sky-300"
                    />

                    <button
                    type="submit"
                    disabled={loading}
                    className="rounded-xl bg-[#0B3D91] px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                    >
                    {loading ? "Subscribing..." : "Subscribe"}
                    </button>
                </form>
                </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-xs text-slate-400">
              © {currentYear} TopLink Security. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-slate-400">
              <Link to="/privacy" className="transition-colors hover:text-white">
                Privacy Policy
              </Link>
              <Link to="/terms" className="transition-colors hover:text-white">
                Terms of Service
              </Link>
              <Link to="/cookies" className="transition-colors hover:text-white">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;