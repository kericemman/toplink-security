import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import {
  sendContactMessage,
  sendConsultationRequest,
  sendTrainingRequest,
} from "../services/contactService";
import Button from "../components/common/Button";

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

const Contact = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  const [activeTab, setActiveTab] = useState("contact");
  const [formData, setFormData] = useState(initialForm);
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
    setFormData(initialForm);
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
    <section className="bg-white py-20">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-wide text-[#0B3D91]">
            Contact TopLink Security
          </p>

          <h1 className="text-2xl font-black text-[#020617] md:text-4xl">
            Speak With a 
            <br/>
            Security Specialist
          </h1>

          <p className="mt-5 leading-8 text-slate-600">
            Whether you need a vulnerability assessment, security awareness
            training, or guidance on strengthening physical controls, send your
            request and we’ll respond professionally.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm md:p-8">
            <div className="mb-8 flex flex-wrap gap-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
                    resetForm();
                  }}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold ${
                    activeTab === tab.id
                      ? "bg-[#0B3D91] text-white"
                      : "bg-blue-50 text-[#0B3D91] hover:bg-blue-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="grid gap-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Name *
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B3D91]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Email *
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B3D91]"
                  />
                </div>
              </div>

              {(activeTab === "consultation" || activeTab === "training") && (
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Phone
                    </label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+254 700 000 000"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B3D91]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Organization
                    </label>
                    <input
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      placeholder="Company / institution"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B3D91]"
                    />
                  </div>
                </div>
              )}

              {activeTab === "contact" && (
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B3D91]"
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Security Resources">Security Resources</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Partnership">Partnership</option>
                  </select>
                </div>
              )}

              {activeTab === "consultation" && (
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Service *
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B3D91]"
                  >
                    <option value="">Select service</option>
                    <option value="Risk Assessment">Risk Assessment</option>
                    <option value="Physical Security Planning">
                      Physical Security Planning
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
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Training Type *
                    </label>
                    <select
                      name="trainingType"
                      value={formData.trainingType}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B3D91]"
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
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Team Size
                    </label>
                    <select
                      name="teamSize"
                      value={formData.teamSize}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B3D91]"
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
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="How can we help you?"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B3D91]"
                />
              </div>

              <Button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          <aside className="rounded-3xl bg-[#EAF2FF] p-8">
            <h2 className="text-2xl font-black text-[#020617]">
              Contact Information
            </h2>

            <div className="mt-8 grid gap-6">
              <div className="flex gap-4">
                <div className="rounded-xl  p-3 text-[#0B3D91]">
                  <MapPin size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-[#020617]">Location</h3>
                  <p className="text-slate-600">Nairobi, Kenya</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="rounded-xl  p-3 text-[#0B3D91]">
                  <Mail size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-[#020617]">Email</h3>
                  <p className="text-slate-600">info@toplinksecurity.com</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="rounded-xl  p-3 text-[#0B3D91]">
                  <Phone size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-[#020617]">Phone</h3>
                  <p className="text-slate-600">+254 725 614 183</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="rounded-xl  p-3 text-[#0B3D91]">
                  <Clock size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-[#020617]">Business Hours</h3>
                  <p className="text-slate-600">Monday - Friday</p>
                  <p className="text-slate-600">9:00 AM - 5:00 PM EAT</p>
                  <p className="mt-2 text-sm text-slate-500">
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

export default Contact;