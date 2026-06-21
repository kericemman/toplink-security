import { useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import FloatingWhatsApp from "./components/common/FloatingWA";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}

      <main className={!isAdminRoute && location.pathname !== "/" ? "pt-20 lg:pt-24" : ""}>
        <AppRoutes />
      </main>

      {!isAdminRoute && <Footer />}

      {!isAdminRoute && <FloatingWhatsApp />}
    </>
  );
};

export default App;
