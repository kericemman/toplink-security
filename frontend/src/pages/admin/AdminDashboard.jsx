import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FileText,
  BookOpen,
  MessageSquare,
  Users,
  TrendingUp,
  ShoppingBag,
  Newspaper,
  Mail,
  Briefcase,
  GraduationCap,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

import { getAdminArticles } from "../../services/articleService";
import { getAdminProducts } from "../../services/productService";
import { getAdminOrders } from "../../services/orderService";
import {
  getContactMessages,
  getConsultations,
  getTrainingRequests,
  getReviewQualifications,
  getDiagnosticSubmissions,
} from "../../services/contactService";
import { getSubscribers } from "../../services/subscriberService";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    articles: 0,
    products: 0,
    orders: 0,
    messages: 0,
    consultations: 0,
    training: 0,
    reviewQualifications: 0,
    diagnostics: 0,
    subscribers: 0,
  });

  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);

      const [
        articles,
        products,
        orders,
        messages,
        consultations,
        training,
        reviewQualifications,
        diagnostics,
        subscribers,
      ] = await Promise.all([
        getAdminArticles(),
        getAdminProducts(),
        getAdminOrders(),
        getContactMessages(),
        getConsultations(),
        getTrainingRequests(),
        getReviewQualifications(),
        getDiagnosticSubmissions(),
        getSubscribers(),
      ]);

      setStats({
        articles: articles?.length || 0,
        products: products?.length || 0,
        orders: orders?.length || 0,
        messages: messages?.length || 0,
        consultations: consultations?.length || 0,
        training: training?.length || 0,
        reviewQualifications: reviewQualifications?.length || 0,
        diagnostics: diagnostics?.length || 0,
        subscribers: subscribers?.filter((sub) => sub.isActive)?.length || 0,
      });
      setLastUpdated(new Date());
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to load dashboard stats"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const mainCards = [
    {
      label: "Successful Test Payments",
      value: stats.orders,
      icon: ShoppingBag,
      trend: "Paystack test transactions",
      trendUp: null,
      to: "/admin/orders",
      color: "from-blue-500 to-indigo-500",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Active Subscribers",
      value: stats.subscribers,
      icon: Users,
      trend: "+8%",
      trendUp: true,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      label: "Content Items",
      value: stats.articles + stats.products,
      icon: Newspaper,
      trend: `${stats.articles} articles, ${stats.products} products`,
      trendUp: null,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
  ];

  const detailCards = [
    {
      label: "Articles",
      to: "/admin/articles",
      value: stats.articles,
      icon: FileText,
      subtitle: "Published content",
      bgColor: "bg-slate-50",
      hoverColor: "hover:bg-slate-100",
      iconColor: "text-slate-600",
    },
    {
      label: "Products",
      to: "/admin/products",
      value: stats.products,
      icon: BookOpen,
      subtitle: "Available items",
      bgColor: "bg-slate-50",
      hoverColor: "hover:bg-slate-100",
      iconColor: "text-slate-600",
    },
    {
      label: "Messages",
      to: "/admin/messages",
      value: stats.messages,
      icon: MessageSquare,
      subtitle: "Contact form",
      bgColor: "bg-slate-50",
      hoverColor: "hover:bg-slate-100",
      iconColor: "text-slate-600",
    },
    {
      label: "Consultations",
      to: "/admin/consultations",
      value: stats.consultations,
      icon: Briefcase,
      subtitle: "Service requests",
      bgColor: "bg-slate-50",
      hoverColor: "hover:bg-slate-100",
      iconColor: "text-slate-600",
    },
    {
      label: "Training Requests",
      to: "/admin/consultations",
      value: stats.training,
      icon: GraduationCap,
      subtitle: "Team training",
      bgColor: "bg-slate-50",
      hoverColor: "hover:bg-slate-100",
      iconColor: "text-slate-600",
    },
    {
      label: "Decision Reviews",
      to: "/admin/consultations",
      value: stats.reviewQualifications,
      icon: Briefcase,
      subtitle: "Qualification briefs",
      bgColor: "bg-slate-50",
      hoverColor: "hover:bg-slate-100",
      iconColor: "text-slate-600",
    },
    {
      label: "Diagnostics",
      to: "/admin/consultations",
      value: stats.diagnostics,
      icon: ShieldCheck,
      subtitle: "Governance checks",
      bgColor: "bg-slate-50",
      hoverColor: "hover:bg-slate-100",
      iconColor: "text-slate-600",
    },
    {
      label: "Email Subscribers",
      to: "/admin/subscribers",
      value: stats.subscribers,
      icon: Mail,
      subtitle: "Newsletter list",
      bgColor: "bg-slate-50",
      hoverColor: "hover:bg-slate-100",
      iconColor: "text-slate-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Overview of your security platform performance
            </p>
          </div>
          <div className="flex items-center gap-3">
            {lastUpdated && <span className="hidden rounded-lg bg-slate-100 px-3 py-1.5 text-xs text-slate-600 md:inline">Updated {lastUpdated.toLocaleTimeString()}</span>}
            <button type="button" onClick={fetchDashboardStats} disabled={loading} className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50" aria-label="Refresh dashboard">
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} /> Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-xl bg-white p-6 shadow-sm">
              <div className="mb-4 h-12 w-12 animate-pulse rounded-lg bg-slate-200" />
              <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
              <div className="mt-2 h-8 w-32 animate-pulse rounded bg-slate-200" />
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Main Stats Cards */}
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {mainCards.map((card) => {
              const Icon = card.icon;

              return (
                <Link to={card.to || "/admin/orders"}
                  key={card.label}
                  className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                >
                  <div className="absolute top-0 right-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-gradient-to-br opacity-5 blur-2xl transition-all group-hover:scale-150"
                    style={{ backgroundImage: `linear-gradient(to bottom right, ${card.color})` }}
                  />
                  
                  <div className="relative">
                    <div className={`mb-4 inline-flex rounded-lg ${card.bgColor} p-3`}>
                      <Icon size={22} className={card.iconColor} />
                    </div>
                    
                    <div className="flex items-baseline justify-between">
                      <p className="text-sm font-medium text-slate-500">
                        {card.label}
                      </p>
                      {card.trend && (
                        <div className={`flex items-center gap-1 text-xs font-medium ${
                          card.trendUp === true ? "text-emerald-600" : 
                          card.trendUp === false ? "text-red-600" : "text-slate-400"
                        }`}>
                          {card.trendUp === true && <TrendingUp size={12} />}
                          <span>{card.trend}</span>
                        </div>
                      )}
                    </div>
                    
                    <h2 className="mt-2 text-2xl font-bold text-slate-900">
                      {card.value}
                    </h2>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Detailed Stats Grid */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
              Detailed Metrics
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {detailCards.map((card) => {
                const Icon = card.icon;

                return (
                  <Link to={card.to}
                    key={card.label}
                    className={`group rounded-lg ${card.bgColor} p-4 transition-all duration-200 ${card.hoverColor} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs font-medium text-slate-500">
                          {card.label}
                        </p>
                        <p className="mt-1 text-xl font-bold text-slate-900">
                          {card.value}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {card.subtitle}
                        </p>
                      </div>
                      <Icon size={16} className={card.iconColor} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-lg border border-slate-200 bg-white p-6">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
              Quick Actions
            </h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Link to="/admin/articles/create" className="rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-700 transition-all hover:bg-slate-100">Create New Article</Link>
              <Link to="/admin/products/create" className="rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-700 transition-all hover:bg-slate-100">Add New Product</Link>
              <Link to="/admin/messages" className="rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-700 transition-all hover:bg-slate-100">View Messages</Link>
              <Link to="/admin/subscribers" className="rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-700 transition-all hover:bg-slate-100">Manage Subscribers</Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
