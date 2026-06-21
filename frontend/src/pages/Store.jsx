import { useCallback, useEffect, useState } from "react";
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

  const fetchProducts = useCallback(async () => {
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
  }, [filters.category, filters.search, filters.sort]);

  useEffect(() => {
    const timer = setTimeout(fetchProducts, 400);
    return () => clearTimeout(timer);
  }, [fetchProducts]);

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
    <section className="resource-page bg-white py-20 lg:py-28">
      <div className="container-custom">
        <div className="grid gap-10 border-b border-slate-300 pb-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div><p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#0CA4B8]">Resource Library</p><h1 className="mt-5 text-4xl font-extrabold leading-[1.08] text-[#0B2F50] md:text-6xl">Professional tools for informed security decisions.</h1></div>
          <p className="border-l-2 border-[#B99753] pl-7 text-lg leading-8 text-slate-600">Access practical books, templates, and operational frameworks designed to move security leaders from theory into disciplined execution.</p>
        </div>

        <div className="mt-12"><ProductFilters filters={filters} setFilters={setFilters} /></div>

        {loading ? (
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-96 animate-pulse bg-[#F1F0EC]"
              />
            ))}
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
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
              icon={null}
              title="No books available yet"
              description="Our security experts are currently preparing valuable resources."
            />

          </div>
        )}
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-lg border-t-4 border-[#0CA4B8] bg-white p-8 shadow-2xl">
            <div className="mb-6">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#0CA4B8]">
                Complete Purchase
              </p>

              <h2 className="mt-3 text-2xl font-extrabold text-[#0B2F50]">
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
                  className="w-full border-0 border-b border-slate-300 px-0 py-3 outline-none focus:border-[#0CA4B8]"
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
                  className="w-full border-0 border-b border-slate-300 px-0 py-3 outline-none focus:border-[#0CA4B8]"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="flex-1 border border-slate-300 px-5 py-3 text-xs font-extrabold uppercase tracking-[0.08em] text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-[#0B2F50] px-5 py-3 text-xs font-extrabold uppercase tracking-[0.08em] text-white hover:bg-[#0CA4B8]"
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
