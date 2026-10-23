import { useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import FloatingWhatsApp from "./components/common/FloatingWA";
import AppRoutes from "./routes/AppRoutes";
import "./pages/Home.css";
import "./styles/PublicTheme.css";

const App = () => {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");
  const isHome = location.pathname === "/";
  const isReferenceDocument = location.pathname === "/diagnostic" || location.pathname.startsWith("/diagnostic/complete/") || location.pathname.startsWith("/diagnostic/guide/") || location.pathname === "/decision-room" || location.pathname.startsWith("/decision-room/context/") || location.pathname === "/diagnostic/checkout" || location.pathname === "/decision-room/checkout";

  return (
    <div className={isAdminRoute ? "admin-site" : "public-site"}>
      {!isAdminRoute && <Navbar />}

      {isHome || isReferenceDocument ? <AppRoutes /> : (
        <main className={isAdminRoute ? "" : "public-main"}>
          <AppRoutes />
        </main>
      )}

      {!isAdminRoute && <Footer />}

      {!isAdminRoute && !isHome && !isReferenceDocument && <FloatingWhatsApp />}
    </div>
  );
};

export default App;
