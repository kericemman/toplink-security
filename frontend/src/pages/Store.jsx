import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import EmptyState from "../components/common/EmptyState";
import ProductCard from "../components/store/ProductCard";
import ProductFilters from "../components/store/ProductFilters";
import { getProducts } from "../services/productService";
import { initializePayment } from "../services/paymentService";

const Store = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buyer, setBuyer] = useState({
    customerName: "",
    customerEmail: "",
  });
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    sort: "newest",
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const result = await getProducts({
        search: filters.search || undefined,
        category: filters.category || undefined,
        sort: filters.sort,
      });

      setProducts(result.products || []);
      setPagination(result.pagination || null);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to load security resources"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchProducts, 400);
    return () => clearTimeout(timer);
  }, [filters]);

  const handleBuyClick = (product) => {
    setSelectedProduct(product);
  };

  const handleBuyerChange = (e) => {
    setBuyer((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!selectedProduct) return;

    try {
      const payment = await initializePayment({
        productId: selectedProduct._id,
        customerName: buyer.customerName,
        customerEmail: buyer.customerEmail,
      });

      window.location.href = payment.authorizationUrl;
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Payment initialization failed"
      );
    }
  };

  return (
    <section className="bg-white py-20">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-wide text-[#0B3D91]">
            Security Library
          </p>

          

          
        </div>

        <div className="mt-12">
          <ProductFilters filters={filters} setFilters={setFilters} />
        </div>

        {loading ? (
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-96 animate-pulse rounded-3xl bg-blue-50"
              />
            ))}
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onBuy={handleBuyClick}
                />
              ))}
            </div>

            {pagination && (
              <p className="mt-8 text-center text-sm text-slate-500">
                Showing {products.length} of {pagination.total} resources
              </p>
            )}
          </>
        ) : (
          <div className="mt-12">
            <EmptyState
              icon="📚"
              title="No books available yet"
              description="Our security experts are currently preparing valuable resources."
            />
          </div>
        )}
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-7 shadow-2xl">
            <div className="mb-6">
              <p className="text-sm font-bold uppercase tracking-wide text-[#0B3D91]">
                Complete Purchase
              </p>
              <h2 className="mt-2 text-2xl font-black text-[#020617]">
                {selectedProduct.title}
              </h2>
              <p className="mt-2 text-slate-600">
                Enter your details to continue to secure checkout.
              </p>
            </div>

            <form onSubmit={handleCheckout} className="grid gap-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Full Name *
                </label>
                <input
                  name="customerName"
                  value={buyer.customerName}
                  onChange={handleBuyerChange}
                  required
                  placeholder="Your full name"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B3D91]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Email Address *
                </label>
                <input
                  name="customerEmail"
                  type="email"
                  value={buyer.customerEmail}
                  onChange={handleBuyerChange}
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0B3D91]"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="flex-1 rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-[#0B3D91] px-5 py-3 font-semibold text-white hover:bg-[#061A40]"
                >
                  Pay Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Store;