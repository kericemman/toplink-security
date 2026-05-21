import { Link } from "react-router-dom";

const Button = ({ children, to, variant = "primary", type = "button", ...props }) => {
  const base =
    "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold shadow-sm";

  const variants = {
    primary: "bg-[#0B3D91] text-white hover:bg-[#061A40]",
    secondary: "bg-white text-[#0B3D91] hover:bg-blue-50",
    dark: "bg-[#020617] text-white hover:bg-[#061A40]",
    outline:
      "border border-white/30 bg-white/10 text-white hover:bg-white hover:text-[#0B3D91]",
    lightOutline:
      "border border-blue-200 bg-white text-[#0B3D91] hover:bg-blue-50",
  };

  if (to) {
    return (
      <Link to={to} className={`${base} ${variants[variant]}`}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={`${base} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
};

export default Button;