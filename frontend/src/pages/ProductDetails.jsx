import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle, Download, Loader2, ShoppingCart, Shield, Lock, FileText as FileIcon } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getProductBySlug } from "../services/productService";
import { initializePayment } from "../services/paymentService";
import { formatCurrency } from "../utils/formatCurrency";

const ProductDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [buyer, setBuyer] = useState({
    customerName: "",
    customerEmail: "",
  });
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const result = await getProductBySlug(slug);
        setProduct(result);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const handleBuyerChange = (e) => {
    setBuyer((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    try {
      setPaying(true);

      const payment = await initializePayment({
        productId: product._id,
        customerName: buyer.customerName,
        customerEmail: buyer.customerEmail,
      });

      window.location.href = payment.authorizationUrl;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Payment failed to start");
    } finally {
      setPaying(false);
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-24">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <Loader2 className="mx-auto animate-spin text-blue-600" size={44} />
          <h1 className="mt-6 text-2xl font-semibold text-slate-900">
            Loading Resource
          </h1>
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-24">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-2xl font-semibold text-slate-900">
            Product not found
          </h1>
          <div className="mt-6">
            <Link
              to="/store"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-blue-700"
            >
              <ArrowLeft size={16} />
              Back to Store
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8 md:py-12 lg:py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link
            to="/store"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-blue-600 md:mb-8"
          >
            <ArrowLeft size={16} />
            Back to Security Library
          </Link>

          {/* Product Grid */}
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Image Section - Improved for all screen sizes */}
            <div className="relative">
              <div className="sticky top-24 overflow-hidden rounded-2xl bg-white shadow-lg">
                {product.coverImage?.url ? (
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 md:aspect-square">
                    <img
                      src={product.coverImage.url}
                      alt={product.title}
                      className="h-full w-full object-contain transition-transform duration-300 hover:scale-105 md:object-cover"
                    />
                    {/* Optional: Badge overlay */}
                    <div className="absolute top-4 right-4 rounded-full bg-black/50 backdrop-blur-sm px-3 py-1">
                      <span className="text-xs font-medium text-white">
                        Digital Product
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex aspect-[4/3] w-full flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 md:aspect-square">
                    <FileIcon size={64} className="text-blue-400" />
                    <p className="mt-4 text-sm text-slate-500">No preview available</p>
                  </div>
                )}
              </div>
            </div>

            {/* Product Info Section */}
            <div>
              {/* Category Badge */}
              <div className="mb-4 inline-flex rounded-full bg-blue-50 px-3 py-1">
                <span className="text-xs font-medium uppercase tracking-wide text-blue-600">
                  {product.category || "Security Resource"}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
                {product.title}
              </h1>

              {/* Short Description */}
              <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
                {product.shortDescription}
              </p>

              {/* Price Card */}
              <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-baseline justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Price</p>
                    <p className="text-3xl font-bold text-slate-900 md:text-4xl">
                      {formatCurrency(product.price, product.currency)}
                    </p>
                  </div>
                  {product.compareAtPrice && (
                    <div className="text-right">
                      <p className="text-sm text-slate-500">Original price</p>
                      <p className="text-lg text-slate-400 line-through">
                        {formatCurrency(product.compareAtPrice, product.currency)}
                      </p>
                    </div>
                  )}
                </div>

                {/* Buy Button */}
                <button
                  onClick={() => setCheckoutOpen(true)}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <ShoppingCart size={18} />
                  Buy Now
                </button>

                {/* Features List */}
                <div className="mt-6 space-y-2 border-t border-slate-100 pt-6">
                  <div className="flex items-start gap-3 text-sm text-slate-600">
                    <CheckCircle size={16} className="mt-0.5 flex-shrink-0 text-emerald-500" />
                    <span>Instant digital delivery after successful payment</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-slate-600">
                    <Lock size={16} className="mt-0.5 flex-shrink-0 text-emerald-500" />
                    <span>Secure checkout powered by Paystack</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-slate-600">
                    <Download size={16} className="mt-0.5 flex-shrink-0 text-emerald-500" />
                    <span>Lifetime access with download link</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {product.tags?.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="border-t border-slate-200 bg-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 text-center md:mb-8">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
                Resource Details
              </p>
              <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
                What this resource covers
              </h2>
            </div>

            <div className="prose prose-slate prose-headings:font-semibold prose-a:text-blue-600 prose-img:rounded-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
          </div>
        </div>
      </section>

      {/* Checkout Modal */}
      {checkoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl">
            <div className="p-6">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-slate-900">
                  Complete Purchase
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Enter your details to continue to secure checkout.
                </p>
              </div>

              <div className="mb-4 rounded-lg bg-blue-50 p-3">
                <p className="text-sm font-medium text-blue-900">
                  {product.title}
                </p>
                <p className="text-xs text-blue-700">
                  {formatCurrency(product.price, product.currency)}
                </p>
              </div>

              <form onSubmit={handleCheckout} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Full Name *
                  </label>
                  <input
                    name="customerName"
                    value={buyer.customerName}
                    onChange={handleBuyerChange}
                    required
                    placeholder="Your full name"
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Email Address *
                  </label>
                  <input
                    name="customerEmail"
                    type="email"
                    value={buyer.customerEmail}
                    onChange={handleBuyerChange}
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setCheckoutOpen(false)}
                    className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={paying}
                    className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {paying ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 size={16} className="animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
                <Shield size={12} />
                <span>Secured by Paystack</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;