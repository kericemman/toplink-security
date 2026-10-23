import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import {
  sendContactMessage,
  sendConsultationRequest,
  sendTrainingRequest,
} from "../services/contactService";
import Button from "../components/common/Button";
import { contactServiceTopics } from "../data/contactServiceTopics";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  organization: "",
  subject: "",
  service: "",
  trainingType: "",
  teamSize: "",
  message: "",
};

const ContactForm = ({ selectedService = "" }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  const [activeTab, setActiveTab] = useState(selectedService ? "consultation" : "contact");
  const [formData, setFormData] = useState(() => ({ ...initialForm, service: selectedService }));
  const [loading, setLoading] = useState(false);

  const tabs = [
    { id: "contact", label: "General Message" },
    { id: "consultation", label: "Consultation" },
    { id: "training", label: "Training" },
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setFormData({ ...initialForm, service: selectedService });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (activeTab === "contact") {
        await sendContactMessage({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        });
      }

      if (activeTab === "consultation") {
        await sendConsultationRequest({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          organization: formData.organization,
          service: formData.service,
          message: formData.message,
        });
      }

      if (activeTab === "training") {
        await sendTrainingRequest({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          organization: formData.organization,
          trainingType: formData.trainingType,
          teamSize: formData.teamSize,
          message: formData.message,
        });
      }

      toast.success("Message sent successfully");
      resetForm();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-page site-section bg-[var(--site-paper)]">
      <div className="container-custom">
        <div className="site-heading-grid">
          <div><p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--site-teal)]">Contact TopLink Security</p><h1 className="mt-5 text-4xl font-extrabold leading-[1.08] text-[var(--site-navy)] md:text-6xl">Start the conversation that leads to better security decisions.</h1></div>
          <p className="site-lead">Whether you're protecting people, assets, operations, or preparing for a critical decision, we're here to help you understand your risks, evaluate your options, and identify the right next step.</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:gap-8">
          <div className="site-panel">
            <div className="contact-tabs" aria-label="Inquiry type">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  aria-pressed={activeTab === tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    resetForm();
                  }}
                  className="uppercase tracking-[0.05em] transition"
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="grid gap-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-2 block text-sm font-semibold text-[var(--site-muted)]">
                    Name *
                  </label>
                  <input
                    id="contact-name"
              name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full rounded-xl border border-[var(--site-line)] px-4 py-3 outline-none focus:border-[var(--site-navy)]"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="mb-2 block text-sm font-semibold text-[var(--site-muted)]">
                    Email *
                  </label>
                  <input
                    id="contact-email"
              name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-[var(--site-line)] px-4 py-3 outline-none focus:border-[var(--site-navy)]"
                  />
                </div>
              </div>

              {(activeTab === "consultation" || activeTab === "training") && (
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="contact-phone" className="mb-2 block text-sm font-semibold text-[var(--site-muted)]">
                      Phone
                    </label>
                    <input
                      id="contact-phone"
              name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+254 700 000 000"
                      className="w-full rounded-xl border border-[var(--site-line)] px-4 py-3 outline-none focus:border-[var(--site-navy)]"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-organization" className="mb-2 block text-sm font-semibold text-[var(--site-muted)]">
                      Organization
                    </label>
                    <input
                      id="contact-organization"
              name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      placeholder="Company / institution"
                      className="w-full rounded-xl border border-[var(--site-line)] px-4 py-3 outline-none focus:border-[var(--site-navy)]"
                    />
                  </div>
                </div>
              )}

              {activeTab === "contact" && (
                <div>
                  <label htmlFor="contact-subject" className="mb-2 block text-sm font-semibold text-[var(--site-muted)]">
                    Subject *
                  </label>
                  <select
                    id="contact-subject"
              name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-[var(--site-line)] px-4 py-3 outline-none focus:border-[var(--site-navy)]"
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Partnership">Partnership</option>
                  </select>
                </div>
              )}

              {activeTab === "consultation" && (
                <div>
                  <label htmlFor="contact-service" className="mb-2 block text-sm font-semibold text-[var(--site-muted)]">
                    Service *
                  </label>
                  <select
                    id="contact-service"
              name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-[var(--site-line)] px-4 py-3 outline-none focus:border-[var(--site-navy)]"
                  >
                    <option value="">Select service</option>
                    {Object.values(contactServiceTopics).map((service) => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                    <option value="Risk Assessment">Risk Assessment</option>
                    <option value="Physical Security Planning">
                      Physical Security Strategy &amp; Planning
                    </option>
                    <option value="Executive Protection and Travel Risk">
                      Executive Protection &amp; Travel Risk Management
                    </option>
                    <option value="Safety Planning">Safety Planning</option>
                    <option value="General Security Consultation">
                      General Security Consultation
                    </option>
                  </select>
                </div>
              )}

              {activeTab === "training" && (
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="contact-trainingType" className="mb-2 block text-sm font-semibold text-[var(--site-muted)]">
                      Training Type *
                    </label>
                    <select
                      id="contact-trainingType"
              name="trainingType"
                      value={formData.trainingType}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-[var(--site-line)] px-4 py-3 outline-none focus:border-[var(--site-navy)]"
                    >
                      <option value="">Select training</option>
                      <option value="Security Awareness Training">
                        Security Awareness Training
                      </option>
                      <option value="Physical Security Awareness">
                        Physical Security Awareness
                      </option>
                      <option value="Emergency Response Procedures">
                        Emergency Response Procedures
                      </option>
                      <option value="Social Engineering Awareness">
                        Social Engineering Awareness
                      </option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-teamSize" className="mb-2 block text-sm font-semibold text-[var(--site-muted)]">
                      Team Size
                    </label>
                    <select
                      id="contact-teamSize"
              name="teamSize"
                      value={formData.teamSize}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-[var(--site-line)] px-4 py-3 outline-none focus:border-[var(--site-navy)]"
                    >
                      <option value="">Select team size</option>
                      <option value="1-10">1-10</option>
                      <option value="11-25">11-25</option>
                      <option value="26-50">26-50</option>
                      <option value="51-100">51-100</option>
                      <option value="100+">100+</option>
                    </select>
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="contact-message" className="mb-2 block text-sm font-semibold text-[var(--site-muted)]">
                  Message *
                </label>
                <textarea
                  id="contact-message"
              name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="How can we help you?"
                  className="w-full rounded-xl border border-[var(--site-line)] px-4 py-3 outline-none focus:border-[var(--site-navy)]"
                />
              </div>

              <Button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          <aside className="site-panel site-panel-dark contact-details lg:sticky lg:top-28">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--site-sage)]">Direct Contact</p>
            <h2 className="mt-4 text-2xl font-extrabold text-white">
              Contact Information
            </h2>

            <div className="mt-8 grid gap-6">
              <div className="flex gap-4">
                <div className="p-3 text-[var(--site-teal)]">
                  <MapPin size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-white">Location</h3>
                  <p className="text-slate-300">Nairobi, Kenya</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-3 text-[var(--site-teal)]">
                  <Mail size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-white">Email</h3>
                  <p className="text-slate-300">engagements@toplinksecurity.co.ke</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-3 text-[var(--site-teal)]">
                  <Phone size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-white">Phone</h3>
                  <p className="text-slate-300">+254 725 614 183</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-3 text-[var(--site-teal)]">
                  <Clock size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-white">Business Hours</h3>
                  <p className="text-slate-300">Monday - Friday</p>
                  <p className="text-slate-300">9:00 AM - 5:00 PM EAT</p>
                  <p className="mt-2 text-sm text-slate-400">
                    Typical response time: 24 hours for general inquiries.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [searchParams] = useSearchParams();
  const serviceKey = searchParams.get("service");
  const selectedService = Object.hasOwn(contactServiceTopics, serviceKey)
    ? contactServiceTopics[serviceKey]
    : "";

  return <ContactForm key={selectedService} selectedService={selectedService} />;
};

export default Contact;
