export function paystackCheckoutUrl(value) {
  const url = new URL(value);
  if (url.protocol !== "https:" || url.hostname !== "checkout.paystack.com" || url.username || url.password || (url.port && url.port !== "443")) {
    throw new Error("Unexpected payment provider address");
  }
  return url.href;
}
