import { useEffect } from "react";
import Button from "../common/Button";
import { CheckCircle2 } from "lucide-react";

const sectionBackgrounds = {
  white: "bg-white",
  stone: "bg-[var(--site-soft)]",
  dark: "bg-[var(--site-navy)] text-white",
};

const SectionLabel = ({ children, tone = "teal" }) => (
  <p
    className={`text-xs font-extrabold uppercase tracking-[0.2em] ${
      tone === "sage" ? "text-[var(--site-sage)]" : "text-[var(--site-teal)]"
    }`}
  >
    {children}
  </p>
);

const IntroContent = ({ blocks = [] }) => (
  <div className="mt-7 space-y-5 text-lg leading-8 text-[var(--site-muted)]">
    {blocks.map((block, index) => {
      if (block.type === "list") {
        return (
          <div key={`list-${index}`} className="my-6 grid gap-2 sm:my-8 sm:grid-cols-2 sm:gap-3">
            {block.items.map((item) => (
              <p
                key={item}
                className="rounded-lg border border-[var(--site-line)] bg-white px-4 py-3 text-base font-semibold leading-7 text-[var(--site-navy)] sm:px-5 sm:py-4"
              >
                {item}
              </p>
            ))}
          </div>
        );
      }

      return (
        <p
          key={block.text}
          className={block.emphasis ? "font-semibold text-[var(--site-navy)]" : ""}
        >
          {block.text}
        </p>
      );
    })}
  </div>
);

const ItemGrid = ({ items = [], dark = false }) => (
  <ul className="grid gap-2 sm:gap-3 md:grid-cols-2 md:gap-4">
    {items.map((item) => (
      <li
        key={item}
        className={`flex gap-2 rounded-lg border p-3 sm:gap-3 sm:p-4 ${
          dark ? "border-white/10 bg-white/5 text-slate-100" : "border-[var(--site-line)] bg-white text-[var(--site-navy)]"
        }`}
      >
        <CheckCircle2
          aria-hidden="true"
          size={19}
          className={`mt-1 shrink-0 ${
            dark ? "text-[var(--site-sage)]" : "text-[var(--site-teal)]"
          }`}
        />
        <span className="font-semibold leading-6 sm:leading-7">{item}</span>
      </li>
    ))}
  </ul>
);

const TextServicePage = ({
  eyebrow,
  title,
  intro = [],
  sections = [],
  approach,
  cta,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navItems = [
    ...sections.map((section) => ({
      id: section.id,
      label: section.eyebrow,
    })),
    approach ? { id: "our-approach", label: approach.eyebrow } : null,
  ].filter(Boolean);

  return (
    <>
      <section className="site-hero">
        <div className="container-custom grid gap-12 lg:grid-cols-[minmax(0,0.92fr)_320px] lg:items-start">
          <div>
            <SectionLabel>{eyebrow}</SectionLabel>
            <h1 className="mt-5 max-w-5xl text-2xl font-bold leading-tight text-[var(--site-navy)] md:text-3xl lg:text-4xl">
              {title}
            </h1>
            <IntroContent blocks={intro} />
          </div>

          <aside className="site-panel hidden lg:sticky lg:top-28 lg:block">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--site-teal)]">
              Service Detail
            </p>
            <p className="mt-4 text-2xl font-extrabold leading-tight text-[var(--site-navy)]">
              A clear path from risk context to practical action.
            </p>
            <nav className="mt-7 grid gap-3">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-sm font-bold text-[var(--site-muted)] hover:text-[var(--site-teal)]"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </aside>
        </div>
      </section>

      {sections.map((section, index) => {
        const variant = section.variant || (index % 2 === 0 ? "stone" : "white");
        const isDark = variant === "dark";

        return (
          <section
            key={section.id}
            id={section.id}
            className={`${sectionBackgrounds[variant]} py-12 md:py-16`}
          >
            <div className="container-custom grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
              <div>
                <SectionLabel tone={isDark ? "sage" : section.labelTone || "gold"}>
                  {section.eyebrow}
                </SectionLabel>
                {section.title && (
                  <h2
                    className={`mt-4 text-2xl font-bold leading-tight md:text-3xl lg:text-4xl ${
                      isDark ? "text-white" : "text-[var(--site-navy)]"
                    }`}
                  >
                    {section.title}
                  </h2>
                )}
                {section.description && (
                  <p
                    className={`mt-5 leading-8 ${
                      isDark ? "text-slate-300" : "text-[var(--site-muted)]"
                    }`}
                  >
                    {section.description}
                  </p>
                )}
              </div>

              <ItemGrid items={section.items} dark={isDark} />
            </div>
          </section>
        );
      })}

      {approach && (
        <section
          id="our-approach"
          className="border-y border-[var(--site-line)] bg-[var(--site-soft)] py-10 lg:py-15"
        >
          <div className="container-custom grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div>
              <SectionLabel tone="gold">{approach.eyebrow}</SectionLabel>
              <h2 className="mt-4 text-2xl font-bold leading-tight text-[var(--site-navy)] md:text-3xl lg:text-4xl">
                {approach.title}
              </h2>
            </div>

            <div className="site-panel space-y-5 text-lg leading-8 text-[var(--site-muted)]">
              {approach.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {cta && (
        <section className="bg-white py-10 lg:py-15">
          <div className="container-custom site-panel site-panel-dark p-8 md:p-12 lg:p-16">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <SectionLabel tone="sage">{cta.eyebrow}</SectionLabel>
                <h2 className="mt-4 max-w-3xl text-2xl font-bold leading-tight md:text-3xl lg:text-4xl">
                  {cta.title}
                </h2>
                {cta.text && (
                  <p className="mt-5 max-w-2xl leading-8 text-slate-300">
                    {cta.text}
                  </p>
                )}
              </div>
              <Button to={cta.to || "/contact"} variant="secondary">
                {cta.buttonLabel || "Book a Risk Governance Discussion"}
              </Button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default TextServicePage;
