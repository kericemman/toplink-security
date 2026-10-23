import { useEffect, useMemo } from "react";

// Only bundled, reviewed reference documents are accepted here, never user HTML.
export default function ReferenceHtmlPage({ source, className }) {
  const document = useMemo(() => new DOMParser().parseFromString(source, "text/html"), [source]);
  const title = document.title;
  const description = document.querySelector('meta[name="description"]')?.content;
  useEffect(() => {
    const previousTitle = window.document.title;
    const meta = window.document.querySelector('meta[name="description"]');
    const previousDescription = meta?.content;
    window.document.title = title;
    if (meta && description) meta.content = description;
    return () => {
      window.document.title = previousTitle;
      if (meta && previousDescription !== undefined) meta.content = previousDescription;
    };
  }, [title, description]);
  return <div className={className}>
    <style>{Array.from(document.querySelectorAll("style"), (style) => style.textContent).join("\n")}</style>
    <div dangerouslySetInnerHTML={{ __html: document.body.innerHTML }} />
  </div>;
}
