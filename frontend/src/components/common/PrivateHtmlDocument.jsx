import { useEffect, useMemo, useRef, useState } from "react";

// These documents deliberately run in an opaque-origin sandbox. They cannot
// access the site's cookies, admin token, storage or DOM. Only explicit context
// submissions use the optional onMessage bridge; Diagnostic entries never do.
const bridge = `<script>
(() => {
  document.querySelectorAll('.field').forEach((field, index) => {
    const label = field.querySelector(':scope > label');
    const control = field.querySelector(':scope > input:not([type="radio"]):not([type="checkbox"]), :scope > select, :scope > textarea');
    if (label && control && !label.htmlFor) {
      if (!control.id) control.id = 'toplink-field-' + index;
      label.htmlFor = control.id;
    }
  });
  let previousHeight = 0;
  function resize() {
    const height = Math.ceil(document.body.getBoundingClientRect().height + 2);
    if (height !== previousHeight) {
      previousHeight = height;
      parent.postMessage({ type: 'toplink:height', height }, '*');
    }
  }
  new ResizeObserver(resize).observe(document.body);
  addEventListener('load', resize);
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (href?.startsWith('#')) {
      const target = document.getElementById(href.slice(1));
      if (target) {
        event.preventDefault();
        parent.postMessage({ type: 'toplink:scroll', top: target.getBoundingClientRect().top + scrollY }, '*');
      }
    }
  });
})();
</script>`;

export default function PrivateHtmlDocument({ html, title, onMessage, allowForms = false }) {
  const frameRef = useRef(null);
  const [height, setHeight] = useState(700);
  const source = useMemo(() => html.replace(/<head>/i, '<head><meta name="referrer" content="no-referrer">')
    .replace(/<\/body>/i, `${bridge}</body>`), [html]);

  useEffect(() => {
    const receive = (event) => {
      if (event.source !== frameRef.current?.contentWindow) return;
      if (event.data?.type === "toplink:height" && Number.isFinite(event.data.height)) {
        setHeight(Math.max(500, Math.min(80000, event.data.height)));
      } else if (event.data?.type === "toplink:scroll" && Number.isFinite(event.data.top)) {
        const frameTop = frameRef.current.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: frameTop + Math.max(0, Math.min(80000, event.data.top)) - 94, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
      } else onMessage?.(event.data, (data) => frameRef.current?.contentWindow?.postMessage(data, "*"));
    };
    window.addEventListener("message", receive);
    return () => window.removeEventListener("message", receive);
  }, [onMessage]);

  return <iframe ref={frameRef} title={title} srcDoc={source} style={{ display: "block", width: "100%", height, border: 0, background: "#f7f7f3" }}
    sandbox={`allow-scripts allow-modals allow-downloads allow-popups allow-popups-to-escape-sandbox${allowForms ? " allow-forms" : ""}`} referrerPolicy="no-referrer" />;
}
