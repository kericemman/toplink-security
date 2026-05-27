import { FaWhatsapp } from "react-icons/fa";

const FloatingWhatsApp = () => {
  const phone = "254725614183";

  const message = encodeURIComponent(
    "Hello TopLink Security, I would like to inquire about your security services."
  );

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-6 right-6 z-[90] flex items-center gap-3"
    >
      <div className="hidden rounded-full bg-[#020617] px-4 py-2 text-sm font-semibold text-white shadow-lg transition group-hover:block">
        Chat on WhatsApp
      </div>

      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition duration-300 hover:scale-110 hover:bg-[#1ebe5d]">
        <FaWhatsapp size={34} />
      </div>
    </a>
  );
};

export default FloatingWhatsApp;