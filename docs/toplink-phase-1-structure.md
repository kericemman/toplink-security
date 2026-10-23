# TopLink Phase 1 Structure

## Purpose

TopLink is moving from a broad security advisory website into a more focused Risk and Governance Advisory practice. The site should now lead with the problem that security can identify risk, but the organization still needs clarity on who decides, who owns the risk, who has authority, and who is accountable for the outcome.

The attached documents are treated as source content and business direction, not executable instructions.

## Core positioning

Primary message:

> Security can identify the risk. Who decides what happens next?

TopLink should be positioned around helping executives, security leaders, and risk leaders move from identified exposure to structured decision clarity.

The old advisory services remain useful, but they become secondary support under the broader Risk and Governance Advisory brand.

## Current site structure

The current site is organized around:

- Home
- About
- Services
- Resources
- Insights
- Contact
- Login and admin routes
- Four advisory service detail pages
- Store and payment pages for digital resources

This structure supports a traditional services business, but it does not yet support the new decision-review journey described in the documents.

## Proposed top-level navigation

Recommended primary navigation:

- Home
- Decision and Governance
- Advisory Services
- Resources
- Insights
- About
- Contact

Recommended primary CTA:

- Start With the Diagnostic

Secondary CTA where relevant:

- Request a Review Qualification

## Proposed sitemap

### Core public pages

- `/`
  - Homepage
  - Reposition around risk, authority, ownership, accountability, and decision clarity.

- `/decision-governance`
  - Overview page for the new decision and governance practice area.
  - Explains the relationship between Risk Governance Systems, the diagnostic, Decision Review, and Decision Sprint.

- `/risk-governance-systems`
  - Framework page.
  - Explains how TopLink connects security risk with authority, ownership, accountability, and business decisions.

- `/diagnostic`
  - WHO ACTUALLY OWNS THIS RISK?™
  - Entry point for identifying whether risk ownership, decision authority, and accountability are aligned.

- `/executive-security-decision-review`
  - Landing page for Executive Security Decision Review™.
  - Uses the Decision Review landing page document as source content.
  - CTA should lead to qualification, not direct public checkout.

- `/executive-security-decision-review/qualification`
  - Review Qualification and Decision Brief™.
  - Intake form for one consequential security decision.
  - Uses the qualification document as source content.

- `/executive-security-decision-review/engagement`
  - Engagement and payment page.
  - Should be available only after qualification or through a controlled link.
  - Uses the engagement and payment document as source content.

- `/executive-decision-sprint`
  - Separate governance intervention page.
  - Should be introduced from homepage and Decision Review, but treated as a separate engagement.

### Existing advisory pages to retain

- `/services`
  - Rename conceptually to Advisory Services.
  - Position as broader support when the requirement extends beyond a specific decision.

- `/services/risk-assessment`
- `/services/physical-security-strategy`
- `/services/security-training`
- `/services/executive-protection`

These remain valid, but the copy should be aligned with the new Risk and Governance Advisory positioning.

### Existing supporting pages to retain

- `/store`
  - Resources library.

- `/blog`
  - Insights.

- `/about`
  - Should emphasize cross-sector experience, decision governance, security risk, authority, and accountability.

- `/contact`
  - Should support both broader inquiries and decision-review inquiries.

## Page and document mapping

| Source document | Website use |
| --- | --- |
| Homepage TopLink.co.ke.docx | New homepage content architecture and footer/nav direction |
| Decision review landing page .docx | `/executive-security-decision-review` |
| Decision Review Qualification .docx | `/executive-security-decision-review/qualification` |
| Decision review engagement and payment .docx | `/executive-security-decision-review/engagement` |

## Recommended user journey

### Primary decision-review journey

1. Visitor lands on the homepage.
2. Visitor understands the core problem: the risk is known, but the decision is unresolved.
3. Visitor starts with the diagnostic or explores the Executive Security Decision Review.
4. Visitor submits the Review Qualification and Decision Brief.
5. TopLink reviews suitability.
6. If suitable, TopLink sends the client to the Engagement and Payment page.
7. Client confirms scope, terms, and payment.
8. Review begins.
9. TopLink delivers the Executive Security Decision Brief.
10. If the unresolved matter is mainly governance, authority, ownership, or accountability, TopLink may offer the Executive Decision Sprint separately.

### Broader advisory journey

1. Visitor needs general advisory support rather than one decision review.
2. Visitor goes to Advisory Services.
3. Visitor selects the relevant service page.
4. Visitor books a discussion through Contact.

## Separation of offers

### Decision and Governance

These are the new priority offers:

- Risk Governance Systems™
- WHO ACTUALLY OWNS THIS RISK?™ diagnostic
- Executive Security Decision Review™
- Executive Decision Sprint™

These should feel executive-facing, focused, and productized.

### Broader Security and Risk Advisory

These remain as traditional advisory services:

- Security Risk Assessments
- Physical Security Strategy and Planning
- Security Awareness and Capability Development
- Executive Protection and Travel Risk Management

These should support the brand, but not dominate the homepage.

## Payment and qualification rule

The Executive Security Decision Review payment should not behave like a normal public product purchase.

Recommended rule:

- Public visitors can read the service page and submit qualification.
- TopLink reviews and approves suitability.
- Approved clients receive access to the engagement and payment step.

Reason:

The documents clearly state that the engagement proceeds after qualification, agreement of scope, payment, and completion of the applicable terms.

## Admin and backend implications

Phase 3 and Phase 4 will likely require backend changes:

- Store Review Qualification submissions separately from general contact messages.
- Add admin view for qualification briefs.
- Track status:
  - submitted
  - under review
  - qualified
  - not suitable
  - engagement sent
  - paid
  - in progress
  - completed
- Generate or expose a controlled engagement/payment link after qualification.
- Ensure payment success is tied to the advisory engagement, not only store orders.

## Phase 2 homepage direction

The homepage should be rebuilt around this order:

1. Hero: Security can identify the risk. Who decides what happens next?
2. The unresolved decision problem.
3. Risk ownership is not decision authority.
4. Risk, Authority, Ownership, Accountability model.
5. WHO ACTUALLY OWNS THIS RISK?™ diagnostic.
6. Decision Review and Decision Sprint.
7. From diagnosis to decision flow.
8. Risk Governance Systems™.
9. Broader Security and Risk Advisory.
10. Experience and standards.
11. Final CTA.

## Phase 1 recommendation

Proceed with this structure before making visual or code-heavy changes. The next implementation phase should start with the homepage because it sets the new positioning for the entire site.
