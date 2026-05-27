import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  BarChart3,
  BookOpen,
  FileText,
  Home,
  Inbox,
  LogOut,
  Menu,
  Users,
  MessageSquare,
  Package,
  ShieldCheck,
  X,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";

const adminLinks = [
  { name: "Dashboard", path: "/admin", icon: BarChart3 },
  { name: "Articles", path: "/admin/articles", icon: FileText },
  { name: "Products", path: "/admin/products", icon: BookOpen },
  { name: "Orders", path: "/admin/orders", icon: Package },
  { name: "Messages", path: "/admin/messages", icon: MessageSquare },
  { name: "Consultations", path: "/admin/consultations", icon: Inbox },
  { name: "Subscribers", path: "/admin/subscribers", icon: Users },
];

const AdminLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b border-slate-100 pb-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-slate-900 to-slate-700 text-white">
            <ShieldCheck size={16} />
          </div>
          <h2 className="text-base font-semibold text-slate-900">TopLink Security</h2>
        </div>
        <p className="mt-2 text-xs text-slate-500">{user?.email}</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 py-6">
        {adminLinks.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.path === "/admin"}
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              <Icon 
                size={18} 
                className="transition-transform duration-200 group-hover:scale-105" 
              />
              <span>{link.name}</span>
              {({ isActive }) => isActive && (
                <span className="ml-auto h-1 w-1 rounded-full bg-slate-900" />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer Links */}
      <div className="border-t border-slate-100 pt-4 space-y-1">
        <NavLink
          to="/"
          onClick={closeMobileMenu}
          className="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-50 hover:text-slate-900"
        >
          <Home size={18} className="transition-transform duration-200 group-hover:scale-105" />
          <span>Back to Website</span>
        </NavLink>

        <button
          onClick={handleLogout}
          className="group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-all duration-200 hover:bg-red-50"
        >
          <LogOut size={18} className="transition-transform duration-200 group-hover:scale-105" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Header */}
      <div className="sticky top-0 z-30 border-b border-slate-100 bg-white/80 backdrop-blur-md lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-slate-900 to-slate-700 text-white">
              <ShieldCheck size={16} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-900">TopLink Security</h2>
              <p className="text-xs text-slate-500">{user?.email?.split('@')[0]}</p>
            </div>
          </div>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div className="flex lg:grid lg:grid-cols-[260px_1fr]">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
          <div className="flex h-full flex-col bg-white p-6">
            <SidebarContent />
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {mobileMenuOpen && isMobile && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
              onClick={closeMobileMenu}
            />
            <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl lg:hidden">
              <div className="flex h-full flex-col overflow-y-auto p-6">
                <div className="mb-4 flex justify-end">
                  <button
                    onClick={closeMobileMenu}
                    className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
                  >
                    <X size={20} />
                  </button>
                </div>
                <SidebarContent />
              </div>
            </aside>
          </>
        )}

        {/* Main Content */}
        <main className="min-h-screen flex-1 overflow-x-hidden">
          <div className="mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;