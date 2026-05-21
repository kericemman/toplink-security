import { use, useEffect, useState } from "react";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import Button from "../components/common/Button";
import { unsubscribeFromNewsletter } from "../services/subscriberService";

const Unsubscribe = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  const { token } = useParams();

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const unsubscribe = async () => {
      try {
        const result = await unsubscribeFromNewsletter(token);
        setSuccess(true);
        setMessage(result.message || "You have unsubscribed successfully.");
      } catch (error) {
        setSuccess(false);
        setMessage(
          error?.response?.data?.message ||
            "We could not process your unsubscribe request."
        );
      } finally {
        setLoading(false);
      }
    };

    unsubscribe();
  }, [token]);

  if (loading) {
    return (
      <section className="bg-[#EAF2FF] py-24">
        <div className="container-custom text-center">
          <Loader2 className="mx-auto animate-spin text-[#0B3D91]" size={44} />
          <h1 className="mt-6 text-3xl font-black text-[#020617]">
            Processing Request
          </h1>
          <p className="mt-3 text-slate-600">
            Please wait while we update your subscription.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#EAF2FF] py-24">
      <div className="container-custom">
        <div className="mx-auto max-w-xl rounded-3xl bg-white p-8 text-center shadow-sm">
          <div
            className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${
              success ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
            }`}
          >
            {success ? <CheckCircle size={44} /> : <XCircle size={44} />}
          </div>

          <h1 className="mt-6 text-3xl font-black text-[#020617]">
            {success ? "Unsubscribed" : "Request Failed"}
          </h1>

          <p className="mt-3 text-slate-600">{message}</p>

          <div className="mt-8">
            <Button to="/">Back to Home</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Unsubscribe;