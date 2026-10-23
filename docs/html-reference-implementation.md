# HTML reference implementation

## Sources and routing

The supplied documents are treated as product content and design references, not instructions to perform payments or transmit client data during development.

| Supplied document | Implemented route |
| --- | --- |
| landing page diagnostics.html | `/diagnostic` |
| Diagnostic tool 1.html | `/diagnostic/complete/:accessToken` (verified purchase only) |
| toplink-risk-governance-decision-guide-tool-2-1.html | `/diagnostic/guide/:accessToken` (same paid purchase) |
| Decision Room landing page (1).html | `/decision-room` |
| brief situation context.html | `/decision-room/context/:accessToken` (verified Room purchase only) |
| Secure checkout.html | `/diagnostic/checkout` (USD 395) |
| Decision room checkout.html | `/decision-room/checkout` (USD 295) |

The public landing pages retain source section ordering, content, colors, typography, spacing and breakpoints. Their CSS is scoped to prevent Tailwind or the rest of the app from changing the layouts. Standalone document branding bars/footers are replaced by the existing homepage navbar/footer, retaining the original TopLink logo. The Guide's substantive header remains part of the document.

Changes beyond the references are limited to functional wiring and accessibility: purchase buttons point to real checkout routes; setup placeholder notes are removed; Tool 1 links to Tool 2; the Guide's literal-newline export and non-input field-selection bugs are corrected; form labels are associated with their controls; the Room form submits through the verified booking endpoint. Local tools run in an isolated iframe and keep their original scripts for manual classifications, generated records, exports and print. Only height/anchor navigation is exchanged with the parent page. Tool entries are never posted to an API.

The Room context form has a separate, explicit submission bridge. Its answers are stored only after verified Room payment and explicit Submit. Preview/edit alone sends nothing. Submissions cannot overwrite buyer identity or transaction fields. Context is available only in authenticated admin, with notifications that exclude the answers.

The October 22 checkout update replaces the two previous purchase components with one source-matched checkout component. Each collects full name, email and country and creates the Paystack session in one server request. Prices and payment status cannot be assigned by the client. There is no separate details, professional-boundaries or terms screen in the new Diagnostic/Room checkout paths. The design does not include a consent checkbox, so the server does not invent consent timestamps or accepted terms. The Diagnostic and Room landing pages retain their scope information. Existing Review/legacy engagement checkout handling is kept for old records; new Diagnostic payment callbacks show only concise verification/retry feedback and then unlock the purchased tools. Old purchase page URLs redirect to the corresponding checkout.

The superseded DiagnosticPurchase and DecisionRoomPurchase components were archived before removal at `/private/tmp/toplink-before-direct-checkout-20261022.tar.gz`. This archive also contains the prior payment-return components for recovery; it is not deployed.

The unused Diagnostic terms-copy module was also removed after its explanatory UI was deleted. Its recoverable copy is `/private/tmp/toplink-diagnostic-terms-copy-20261022.tar.gz`. Legacy engagement payment handling remains in place for historic records; it is not part of the new two-product checkout path.

Insights, article previews, legacy product payment/download handlers, admin management, and the separate Review qualification/payment process are retained. Active About, Services, Contact and service-detail pages are kept because the homepage still links to them. Resources/store remain hidden and their old routes redirect home. Privacy & Terms stays unlinked as requested.

## Cleanup

Twenty-five unused frontend files were removed after checking imports: superseded homepage components, unused service templates, the former Diagnostic intake component, disabled public store/product pages, empty Register page, store cards/filters, and unused common/data/hook utilities. A recoverable snapshot of those files was generated before deletion at `/private/tmp/toplink-before-html-cleanup-20261019.tar.gz`. This temporary local archive is not deployed. Old Diagnostic API submission handling and records remain for compatibility; the new tools do not call it.

## Verification and release

Run frontend lint/build and backend syntax/tests. Backend tests stub database, Paystack and email; no live purchase or mail is required. Use the VPS checklist for live settlement and delivery validation. No production deployment or real charge is performed by this implementation.
