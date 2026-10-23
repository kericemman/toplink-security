import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, isAdmin } = useAuth();

  const [formData, setFormData] = useState({
    email: "engagements@toplinksecurity.co.ke",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  if (isAuthenticated && isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await login(formData);
      toast.success("Login successful");
      navigate("/admin");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-[var(--site-paper)] px-4 py-16">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--site-navy)] text-white">
            <ShieldCheck />
          </div>

          <h1 className="text-2xl font-black text-[var(--site-ink)]">Admin Login</h1>
          <p className="mt-2 text-[var(--site-muted)]">
            Access the TopLink Security dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-5">
          <div>
            <label htmlFor="login-email" className="mb-2 block text-sm font-semibold text-[var(--site-muted)]">
              Email
            </label>
            <input
              id="login-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-[var(--site-line)] px-4 py-3 outline-none focus:border-[var(--site-navy)]"
            />
          </div>

          <div>
            <label htmlFor="login-password" className="mb-2 block text-sm font-semibold text-[var(--site-muted)]">
              Password
            </label>
            <input
              id="login-password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter password"
              className="w-full rounded-xl border border-[var(--site-line)] px-4 py-3 outline-none focus:border-[var(--site-navy)]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-[var(--site-navy)] px-5 py-3 font-semibold text-white hover:bg-[var(--site-navy-2)] disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
