import { useEffect, useRef, useState } from "react";
import { createServiceCheckout } from "../services/paymentService";
import { paystackCheckoutUrl } from "../utils/checkoutUrl";
import "./Checkout.css";

const countries = ["Kenya", "United States", "United Kingdom", "Canada", "Australia", "South Africa", "United Arab Emirates", "Nigeria", "India"];
const diagnosticTitle = "Executive Security Risk Governance Diagnostic™";

function CheckoutForm({ service, room }) {
  const [buyer, setBuyer] = useState({ name: "", email: "", country: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const pending = useRef(null);
  const errorRef = useRef(null);
  useEffect(() => () => pending.current?.abort(), []);

  const showError = (message) => { setError(message); requestAnimationFrame(() => errorRef.current?.focus()); };
  const submit = async (event) => {
    event.preventDefault();
    if (pending.current) return;
    setError("");
    if (!buyer.name.trim() || !buyer.country.trim()) {
      showError("Enter your full name, email address and country.");
      return;
    }
    const controller = new AbortController();
    pending.current = controller;
    setBusy(true);
    try {
      const checkout = await createServiceCheckout(service, {
        name: buyer.name.trim(), email: buyer.email.trim(), country: buyer.country.trim(),
      }, controller.signal);
      if (!controller.signal.aborted) window.location.assign(paystackCheckoutUrl(checkout.authorizationUrl));
    } catch (err) {
      if (!controller.signal.aborted) {
        showError(err.response?.data?.message || "We could not open secure payment. Please try again.");
        pending.current = null;
        setBusy(false);
      }
    }
  };
  const nameId = room ? "name" : "full-name";
  const countryListId = room ? "country-list" : "countries";
  const update = (event) => setBuyer((previous) => ({ ...previous, [event.target.name]: event.target.value }));
  return <form className={room ? undefined : "panel"} id="checkout-form" style={room ? { marginTop: 20 } : undefined} onSubmit={submit} aria-busy={busy}>
    <label htmlFor={nameId}>Full name</label>
    <input id={nameId} name="name" autoComplete="name" placeholder={room ? "Full name" : "Your full name"} required maxLength={250} value={buyer.name} onChange={update} disabled={busy} />
    <label htmlFor="email">Email address</label>
    <input id="email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required maxLength={250} value={buyer.email} onChange={update} disabled={busy} />
    <label htmlFor="country">Country</label>
    <input id="country" name="country" autoComplete="country-name" placeholder={room ? "Country" : "Your country"} list={countryListId} required maxLength={100} value={buyer.country} onChange={update} disabled={busy} />
    <datalist id={countryListId}>{countries.map((country) => <option key={country} value={country} />)}</datalist>
    <p ref={errorRef} className="error" id="checkout-error" role="alert" tabIndex={-1} style={{ display: error ? "block" : "none" }}>{error}</p>
    <button type="submit" disabled={busy}>{busy ? "Opening secure payment…" : room ? "Proceed to payment — US$295" : "Continue to secure payment — US$2"}</button>
    <p className={room ? "note" : "secure-note"}>{room ? "Payment is completed securely on Paystack." : "Payment is completed on the payment provider’s secure checkout."}</p>
  </form>;
}

export default function Checkout({ service = "diagnostic" }) {
  const room = service === "decision-room";
  useEffect(() => {
    const previousTitle = document.title;
    document.title = room ? "Decision Room™ | Checkout" : "Checkout | TopLink Security";
    window.scrollTo(0, 0);
    return () => { document.title = previousTitle; };
  }, [room]);
  return <div className={`reference-checkout html-checkout ${room ? "html-room-checkout" : "html-diagnostic-checkout"}`}>
    <main>
      <p className="eyebrow">{room ? "Checkout" : "Secure checkout"}</p>
      <h1>{room ? "Decision Room™" : diagnosticTitle}</h1>
      <p className={room ? "subtitle" : "intro"}>{room ? "Private Security Executive Decision Partnership™" : "Enter your details, then continue to secure payment."}</p>
      {room ? <section className="panel" aria-label="Checkout">
        <div className="product">45-minute private session</div>
        <div className="price-row"><span className="once">One-time payment</span><span className="price">US$295</span></div>
        <CheckoutForm key={service} service={service} room />
      </section> : <>
        <section className="panel" aria-label="Order summary">
          <div className="summary-title">{diagnosticTitle}</div>
          <div className="summary-note">A self-guided diagnostic for one live security risk and its associated governance decision.</div>
          <div className="price-row"><span className="fixed">One-time fee</span><span className="price">US$2</span></div>
        </section>
        <CheckoutForm key={service} service={service} room={false} />
        <p className="delivery">After confirmed payment, you will receive access instructions for the Diagnostic and the Risk Governance Decision Guide™. This is self-guided; individual review is not included.</p>
      </>}
      <p className="footer">{room ? "© TopLink Security" : "© TopLink Security | Risk & Governance Advisory"}</p>
    </main>
  </div>;
}
