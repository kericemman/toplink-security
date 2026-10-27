import { useEffect } from "react";
import { ArrowLeft, ArrowRight, CircleAlert } from "lucide-react";
import { Link } from "react-router-dom";
import "./DiagnosticWorkedExample.css";

const contents = [
  ["situation", "Business situation"],
  ["finding", "Diagnostic finding"],
  ["implications", "Executive implications"],
  ["next-step", "Recommended next step"],
  ["summary", "Diagnostic summary"],
  ["diagnostic", "About the Diagnostic"],
];

export default function DiagnosticWorkedExample() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Worked Example | Executive Security Risk Governance Diagnostic™ | TopLink Security";
    window.scrollTo(0, 0);
    return () => { document.title = previousTitle; };
  }, []);

  return (
    <div className="worked-example-page">
      <header className="worked-example-hero">
        <div className="worked-example-container">
          <Link to="/diagnostic" className="worked-example-back">
            <ArrowLeft size={16} aria-hidden="true" /> Back to the Diagnostic
          </Link>
          <p className="worked-example-eyebrow">Executive Security Risk Governance Diagnostic™</p>
          <h1>A Security Recommendation Awaiting Budget Approval</h1>
          <p className="worked-example-subtitle">Worked Example</p>

          <dl className="worked-example-meta" aria-label="Case details">
            <div><dt>Case reference</dt><dd>EXAMPLE-001</dd></div>
            <div><dt>Scope</dt><dd>One security risk and its associated business decision</dd></div>
            <div><dt>Classification</dt><dd>UNDEFINED</dd></div>
          </dl>

          <p className="worked-example-note">
            This worked example illustrates how the Diagnostic is applied. It is not based on an actual client case.
          </p>
        </div>
      </header>

      <div className="worked-example-container worked-example-layout">
        <nav className="worked-example-toc" aria-label="Page contents">
          <p className="worked-example-toc-title">On this page</p>
          <div className="worked-example-toc-links">
            {contents.map(([id, label], index) => (
              <a href={`#${id}`} key={id}>
                {index < 5 ? `${String(index + 1).padStart(2, "0")} · ` : ""}{label}
              </a>
            ))}
          </div>
        </nav>

        <article className="worked-example-article" aria-label="Worked example analysis">
          <section id="situation" className="worked-example-section">
            <p className="worked-example-section-number">Section 01</p>
            <h2>The Business Situation</h2>
            <p>A warehouse experiences repeated inventory losses linked to weaknesses in access control and monitoring.</p>
            <p>The Security Manager identifies the risk and recommends additional controls requiring capital expenditure.</p>
            <p>Management has not resolved the investment decision. Competing priorities and budget constraints have delayed progress. The Security Manager cannot approve the expenditure independently.</p>
            <p>It remains unclear who holds final approval authority, how the recommendation should be escalated, and who can accept the residual risk.</p>
            <p>The security risk is known, but the arrangements for resolving the decision remain unclear.</p>
          </section>

          <section id="finding" className="worked-example-section">
            <p className="worked-example-section-number">Section 02</p>
            <h2>Diagnostic Finding</h2>
            <div className="worked-example-finding" aria-label="Diagnostic classification: Undefined">
              <CircleAlert size={32} strokeWidth={1.7} aria-hidden="true" />
              <div><span>Classification</span><strong>UNDEFINED</strong></div>
            </div>
            <p>Available information does not establish how risk ownership, decision authority, accountability, and treatment responsibility relate to one another.</p>
            <aside className="worked-example-interpretation" aria-label="Interpretation boundary">
              <p>Interpretation boundary</p>
              <span>This does not prove a governance failure. The required arrangements may exist, but the information provided does not establish how they operate.</span>
            </aside>
            <p>The classification reflects an unresolved governance position. It does not determine whether management should approve the investment or accept the residual risk.</p>
          </section>

          <section id="implications" className="worked-example-section">
            <p className="worked-example-section-number">Section 03</p>
            <h2>Executive Implications</h2>
            <p>Management needs to clarify who can approve, modify, or defer the proposed treatment and who remains accountable for the decision.</p>
            <p>It must also establish how the recommendation reaches the authorised decision-maker and who has authority to accept any residual risk.</p>
            <p>A budget delay alone does not demonstrate poor governance. The relevant question is whether the organisation’s arrangements adequately connect responsibility, authority, and accountability.</p>
          </section>

          <section id="next-step" className="worked-example-section">
            <p className="worked-example-section-number">Section 04</p>
            <h2>Recommended Next Step</h2>
            <p>The immediate priority is to establish who holds decision authority, how the recommendation reaches that person, and who is accountable for the resulting decision.</p>
            <p>Once these arrangements are clear, management can determine whether further governance action is required.</p>
            <p>The objective is not to secure approval for the original recommendation at any cost. It is to clarify the decision, the authority behind it, and the accountability for its outcome.</p>
          </section>

          <section id="summary" className="worked-example-section worked-example-summary-section">
            <p className="worked-example-section-number">Section 05</p>
            <h2>Diagnostic Summary</h2>
            <div className="worked-example-summary">
              <div className="worked-example-summary-heading">Case EXAMPLE-001 · Summary of findings</div>
              <div className="worked-example-table-wrap">
                <table>
                  <tbody>
                    <tr><th scope="row">Risk examined</th><td>Repeated warehouse inventory losses</td></tr>
                    <tr><th scope="row">Decision examined</th><td>Whether to approve, modify, or defer additional access controls and monitoring, or consider alternative treatment</td></tr>
                    <tr><th scope="row">Responsible role identified in the scenario</th><td>Security Manager</td></tr>
                    <tr><th scope="row">Classification</th><td><strong>UNDEFINED</strong></td></tr>
                    <tr><th scope="row">Principal finding</th><td>Available information does not establish the relevant decision authority and accountability arrangements</td></tr>
                    <tr><th scope="row">Immediate priority</th><td>Clarify decision authority, escalation arrangements, and accountability</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </article>
      </div>

      <section id="diagnostic" className="worked-example-cta-section">
        <div className="worked-example-container worked-example-cta-card">
          <p className="worked-example-eyebrow">Executive Security Risk Governance Diagnostic™</p>
          <h2>Identify the governance condition behind an unresolved security risk.</h2>
          <p>You have identified the risk. But is responsibility for it properly connected to the authority needed to make the decision?</p>
          <p>The Executive Security Risk Governance Diagnostic™ provides a structured examination of one live security risk and its associated business decision. It helps you establish the governance position supported by the available information, understand the principal finding, and identify what requires clarification or further action.</p>

          <h3>What you receive</h3>
          <ul>
            <li><strong>Governance classification:</strong> A defined classification based on the information provided.</li>
            <li><strong>Principal finding:</strong> A concise statement of the governance condition identified.</li>
            <li><strong>Risk Governance Decision Guide™:</strong> Guidance to help you interpret the finding and consider the appropriate response.</li>
          </ul>
          <div className="worked-example-price"><strong>US$395</strong><span>Self-guided · One-time fee</span></div>
          <p>Your purchase covers one live security risk and its associated business decision.</p>
          <p>Access is provided after purchase. You complete the Diagnostic independently. Individual review by TopLink Security is not included.</p>
          <Link to="/diagnostic/checkout" className="worked-example-purchase">
            Purchase the Diagnostic <ArrowRight size={17} aria-hidden="true" />
          </Link>
          <p className="worked-example-scope">Scope: This is a focused governance diagnostic, not a full security risk assessment, independent verification, or advisory engagement. Findings depend on the information provided and do not guarantee a particular decision or business outcome.</p>
        </div>
      </section>
    </div>
  );
}
