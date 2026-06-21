import DOMPurify from "dompurify";

const sanitizeHtml = (html = "") =>
  DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    FORBID_TAGS: ["form", "input", "button", "iframe", "object", "embed"],
  });

export default sanitizeHtml;

