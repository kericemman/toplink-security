import { Link } from "react-router-dom";

const Button = ({
  children,
  to,
  variant = "primary",
  type = "button",
  className = "",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3.5 text-xs font-extrabold uppercase tracking-[0.08em]";

  const variants = {
    primary: "bg-[#0B2F50] text-white hover:bg-[#0CA4B8]",
    secondary: "bg-white text-[#0B2F50] hover:bg-[#E9F7F8]",
    dark: "bg-[#0B2F50] text-white hover:bg-[#0CA4B8]",
    outline:
      "border border-white/50 bg-transparent text-white hover:bg-white hover:text-[#0B2F50]",
    lightOutline:
      "border border-[#0B2F50] bg-transparent text-[#0B2F50] hover:bg-[#0B2F50] hover:text-white",
  };

  if (to) {
    return (
      <Link to={to} className={`${base} ${variants[variant]} ${className}`} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
