import { XCircle } from "lucide-react";
import Button from "../components/common/Button";

const PaymentFailed = () => {
  return (
    <section className="bg-[#EAF2FF] py-24">
      <div className="container-custom">
        <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-600">
            <XCircle size={44} />
          </div>

          <h1 className="mt-6 text-3xl font-black text-[#020617]">
            Payment Failed
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            Your payment was not completed successfully. You can return to the
            store and try again.
          </p>

          <div className="mt-8 flex justify-center gap-3">
            <Button to="/store">Back to Store</Button>
            <Button to="/contact" variant="lightOutline">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentFailed;