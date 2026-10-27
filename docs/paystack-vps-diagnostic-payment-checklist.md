# TopLink Diagnostic Payment Flow — VPS Production Checklist

The standalone Diagnostic is US$395, processed in USD. The server fixes the price and currency; checkout inputs cannot change them.

Diagnostic Landing Page → Secure Checkout (full name, email, country) → Paystack USD Payment → Verified Payment → Secure HTML Diagnostic (Tool 1) → Risk Governance Decision Guide (Tool 2)

The Diagnostic is now self-guided, using the supplied HTML instruments. Individual review is not included. Answers are held only in the open document, with JSON/TXT export and print/PDF options. They are not submitted to TopLink, persisted to browser storage or automatically saved. Admin retains buyer and payment records, plus any historic submissions from the previous intake form.

Decision Room™ is a separate US$295 / 45-minute service:

Decision Room Landing Page → Checkout (full name, email, country) → Paystack USD Payment → Verified Payment → Brief Situation Context → Admin Review & Manual Session Arrangements

The current checkout screens match `Secure checkout.html` and `Decision room checkout.html`. There is no separate buyer-details/terms/explanation step for these two products. Country is recorded with the purchase and passed in Paystack metadata. Checkout does not record terms as accepted when the design has no explicit consent control. Historic engagement/purchase APIs remain compatible; the separate Review engagement terms are unchanged.

New routes: `/diagnostic/checkout` and `/decision-room/checkout`. Old `/purchase` page URLs redirect to these checkouts. The two `/payment/:token` routes remain necessary for server verification and error/retry feedback; they are not pre-checkout steps. Confirmed browser callbacks continue to the paid instrument or context form.

The five context answers are submitted only after explicit client confirmation and stored with the paid booking. They are visible in Admin → Decision Room. Notification emails do not contain the sensitive context. Session date/time and Zoom link are arranged manually; this release does not create a calendar booking or Zoom meeting.

The existing Review / Sprint engagement journey remains separate:

Service Page → Qualification / Engagement Confirmation → Terms of Engagement → Paystack USD Payment → Payment Confirmation → Secure Client Intake → Engagement Commences

## Required environment variables

Backend:

- `PUBLIC_SITE_URL=https://toplinksecurity.co.ke`
- `CLIENT_URL=https://toplinksecurity.co.ke`
- `PAYSTACK_SECRET_KEY=<live secret key>`
- `RESEND_API_KEY=<email key>`
- `ADMIN_EMAIL=engagements@toplinksecurity.co.ke`
- `FROM_EMAIL=engagements@toplinksecurity.co.ke`
- `FROM_NAME=TopLink Security`

Before enabling live email, verify `toplinksecurity.co.ke` in Resend and confirm
that `engagements@toplinksecurity.co.ke` is authorized as a sender. The same
address receives internal contact, qualification, booking and payment
notifications.

Prices are fixed server-side: Diagnostic USD 395, Decision Room USD 295, and newly created Decision Review qualifications USD 5,000. Existing engagement records retain their recorded prices. No database price migration is run.

Frontend:

- `VITE_API_URL=https://toplinksecurity.co.ke/api`

## Paystack setup before going live

- Confirm the Paystack account is in live mode.
- Confirm USD is enabled for the account.
- Confirm the Co-op Bank USD settlement account is added and approved in Paystack.
- Confirm the settlement currency shown by Paystack is USD, not KES.
- Configure the webhook URL as `https://toplinksecurity.co.ke/api/paystack/webhook`.
- Run one live low-value USD test payment if Paystack supports it for the account.
- Confirm the transaction appears in the admin Diagnostics tab after webhook verification.
- Confirm the client receives the payment confirmation email.
- Confirm both new checkout pages collect exactly full name, email and country, open Paystack without an intermediate page, and show Diagnostic USD 395 / Decision Room USD 295.
- Confirm TopLink receives the admin payment notification email.
- Confirm payment unlocks `/diagnostic/complete/:token` and `/diagnostic/guide/:token`; the email includes the secure entry link.
- Confirm an unpaid purchase cannot fetch either instrument, including direct API requests. Instrument HTML is delivered from the backend only; it is not part of the public frontend build.
- Confirm diagnostic exports, classification selection, record generation and print work without submitting answers to the server.
- Test Decision Room independently: correct USD 295, signed webhook, confirmation email, private context access, preview/edit/submit, duplicate-submission protection and admin visibility.
- Confirm wrong amounts, currency, payment references or purchase metadata cannot unlock either product.
- Confirm the VPS release includes `backend/src/documents/`; the API reads those three HTML templates at runtime.
- Confirm the Review checkout shows USD 5,000 for newly qualified Reviews. Existing accepted engagement prices are retained.

## Diagnostic credit and professional boundaries

The supplied Tool 1 and Tool 2 are implemented with their original questions, manual governance classifications and interpretation logic. There is no numerical risk score or automatic advisory-service acceptance. The Guide states a possible USD 395 credit toward the USD 5,000 Review (USD 4,605 balance), subject to its same-organization, reference/date, 14-day, and separate qualification/acceptance conditions. Credit eligibility is reviewed manually; checkout does not automatically apply a discount. The Review/Sprint routes remain separate from the self-guided tools.

## Important implementation note

The application initializes and verifies the Diagnostic payment in USD 395. Review and Decision Room also retain their configured USD prices. Settlement destination and enabled payment channels must be confirmed inside the Paystack dashboard; the application does not restrict channels, so Paystack can present enabled methods for the currency.
