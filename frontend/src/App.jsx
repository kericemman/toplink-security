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

      <main>
        <AppRoutes />
      </main>

      {!isAdminRoute && <Footer />}

      {!isAdminRoute && <FloatingWhatsApp />}
    </>
  );
};

export default App;