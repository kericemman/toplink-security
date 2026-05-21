import { useEffect, useState } from "react";
import { CheckCircle, Download, Loader2 } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import Button from "../components/common/Button";
import {
  verifyPayment,
  downloadOrderProduct,
} from "../services/paymentService";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");

  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [order, setOrder] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState("");

  useEffect(() => {
    const confirmPayment = async () => {
      if (!reference) {
        toast.error("Payment reference missing");
        setLoading(false);
        return;
      }

      try {
        const result = await verifyPayment(reference);

        setOrder(result.order);
        setDownloadUrl(result.downloadUrl || "");
        toast.success("Payment verified successfully");
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Payment verification failed"
        );
      } finally {
        setLoading(false);
      }
    };

    confirmPayment();
  }, [reference]);

  const handleDownload = async () => {
    try {
      setDownloading(true);

      const result = await downloadOrderProduct(reference);

      if (result.downloadUrl) {
        window.open(result.downloadUrl, "_blank");
      } else {
        toast.error("Download link not available");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Download failed");
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <section className="bg-white py-24">
        <div className="container-custom flex flex-col items-center text-center">
          <Loader2 className="animate-spin text-[#0B3D91]" size={44} />
          <h1 className="mt-6 text-3xl font-black text-[#020617]">
            Verifying Your Payment
          </h1>
          <p className="mt-3 max-w-xl text-slate-600">
            Please wait while we confirm your transaction.
          </p>
        </div>
      </section>
    );
  }

  if (!order) {
    return (
      <section className="bg-white py-24">
        <div className="container-custom text-center">
          <h1 className="text-3xl font-black text-[#020617]">
            Payment Could Not Be Verified
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            We could not verify this transaction. Please contact support if money
            was deducted.
          </p>

          <div className="mt-8">
            <Button to="/contact">Contact Support</Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#EAF2FF] py-24">
      <div className="container-custom">
        <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-[#0B3D91]">
            <CheckCircle size={44} />
          </div>

          <h1 className="mt-6 text-3xl font-black text-[#020617]">
            Payment Successful
          </h1>

          <p className="mt-3 text-slate-600">
            Your TopLink Security resource is ready for download.
          </p>

          <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5 text-left">
            <p className="text-sm text-slate-500">Product</p>
            <h2 className="mt-1 font-bold text-[#020617]">
              {order.product?.title || "Security Resource"}
            </h2>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-slate-500">Reference</p>
                <p className="break-all font-semibold text-[#020617]">
                  {order.reference}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Status</p>
                <p className="font-semibold capitalize text-[#0B3D91]">
                  {order.paymentStatus}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              onClick={handleDownload}
              disabled={downloading || !downloadUrl}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B3D91] px-5 py-3 text-sm font-semibold text-white hover:bg-[#061A40] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Download size={18} />
              {downloading ? "Preparing..." : "Download Resource"}
            </button>

            <Button to="/store" variant="lightOutline">
              Back to Store
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentSuccess;