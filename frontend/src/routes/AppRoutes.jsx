import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";
import Store from "../pages/Store";
import Blog from "../pages/Blog";
import ArticleDetails from "../pages/ArticleDetails";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import PaymentSuccess from "../pages/PaymentSuccess";
import PaymentFailed from "../pages/PaymentFailed";

import AdminLayout from "../components/layout/AdminLayout";
import ProtectedRoute from "../components/common/ProtectedRoute";

import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminArticles from "../pages/admin/AdminArticles";
import CreateArticle from "../pages/admin/CreateArticle";
import EditArticle from "../pages/admin/EditArticle";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminOrders from "../pages/admin/AdminOrders";
import AdminMessages from "../pages/admin/AdminMessages";
import AdminConsultations from "../pages/admin/AdminConsultations";
import CreateProduct from "../pages/admin/CreateProduct";
import EditProduct from "../pages/admin/EditProduct";


import NotFound from "../pages/NotFound";
import AdminSubscribers from "../pages/admin/AdminSubscriber";
import Unsubscribe from "../pages/Unsubscribe";
import SafetyPlanning from "../pages/services/SafetyPlanning";
import RiskAssessment from "../pages/services/RiskAssessment";
import SecurityTraining from "../pages/services/SecurityTraining";
import ProductDetails from "../pages/ProductDetails";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/store" element={<Store />} />
      <Route path="/store/:slug" element={<ProductDetails />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<ArticleDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
        <Route path="/unsubscribe/:token" element={<Unsubscribe />} />
      <Route path="/payment/success" element={<PaymentSuccess />} />
      <Route path="/payment/failed" element={<PaymentFailed />} />
      <Route path="/services/safety-planning" element={<SafetyPlanning />} />
      <Route path="/services/risk-assessment" element={<RiskAssessment />} />
    <Route path="/services/security-training" element={<SecurityTraining />} />

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
        <Route path="orders" element={<AdminOrders />} />
        <Route path="messages" element={<AdminMessages />} />
        <Route path="subscribers" element={<AdminSubscribers />} />
        <Route path="consultations" element={<AdminConsultations />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="products/create" element={<CreateProduct />} />
        <Route path="products/edit/:id" element={<EditProduct />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;