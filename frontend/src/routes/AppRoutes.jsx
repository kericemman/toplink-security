import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";

const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Services = lazy(() => import("../pages/Services"));
const Store = lazy(() => import("../pages/Store"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));
const Blog = lazy(() => import("../pages/Blog"));
const ArticleDetails = lazy(() => import("../pages/ArticleDetails"));
const Contact = lazy(() => import("../pages/Contact"));
const Login = lazy(() => import("../pages/Login"));
const Unsubscribe = lazy(() => import("../pages/Unsubscribe"));
const PaymentSuccess = lazy(() => import("../pages/PaymentSuccess"));
const PaymentFailed = lazy(() => import("../pages/PaymentFailed"));
const RiskAssessment = lazy(
  () => import("../pages/services/RiskAssessment")
);
const SecurityTraining = lazy(
  () => import("../pages/services/SecurityTraining")
);
const PhysicalSecurityStrategy = lazy(
  () => import("../pages/services/PhysicalSecurityStrategy")
);
const ExecutiveProtection = lazy(
  () => import("../pages/services/ExecutiveProtection")
);
const AdminLayout = lazy(() => import("../components/layout/AdminLayout"));
const AdminDashboard = lazy(() => import("../pages/admin/AdminDashboard"));
const AdminArticles = lazy(() => import("../pages/admin/AdminArticles"));
const CreateArticle = lazy(() => import("../pages/admin/CreateArticle"));
const EditArticle = lazy(() => import("../pages/admin/EditArticle"));
const AdminProducts = lazy(() => import("../pages/admin/AdminProducts"));
const AdminOrders = lazy(() => import("../pages/admin/AdminOrders"));
const AdminMessages = lazy(() => import("../pages/admin/AdminMessages"));
const AdminConsultations = lazy(
  () => import("../pages/admin/AdminConsultations")
);
const AdminSubscribers = lazy(
  () => import("../pages/admin/AdminSubscriber")
);
const CreateProduct = lazy(() => import("../pages/admin/CreateProduct"));
const EditProduct = lazy(() => import("../pages/admin/EditProduct"));
const NotFound = lazy(() => import("../pages/NotFound"));

const PageLoader = () => (
  <div className="flex min-h-[50vh] items-center justify-center bg-[#F8F7F3]">
    <div
      className="h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-[#0CA4B8]"
      role="status"
      aria-label="Loading page"
    />
  </div>
);

const AppRoutes = () => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/store" element={<Store />} />
      <Route path="/store/:slug" element={<ProductDetails />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<ArticleDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/unsubscribe/:token" element={<Unsubscribe />} />
      <Route path="/payment/success" element={<PaymentSuccess />} />
      <Route path="/payment/failed" element={<PaymentFailed />} />
      <Route
        path="/services/safety-planning"
        element={<Navigate to="/services/physical-security-strategy" replace />}
      />
      <Route path="/services/risk-assessment" element={<RiskAssessment />} />
      <Route
        path="/services/security-training"
        element={<SecurityTraining />}
      />
      <Route
        path="/services/physical-security-strategy"
        element={<PhysicalSecurityStrategy />}
      />
      <Route
        path="/services/executive-protection"
        element={<ExecutiveProtection />}
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="articles" element={<AdminArticles />} />
        <Route path="articles/create" element={<CreateArticle />} />
        <Route path="articles/edit/:id" element={<EditArticle />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="products/create" element={<CreateProduct />} />
        <Route path="products/edit/:id" element={<EditProduct />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="messages" element={<AdminMessages />} />
        <Route path="subscribers" element={<AdminSubscribers />} />
        <Route path="consultations" element={<AdminConsultations />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
