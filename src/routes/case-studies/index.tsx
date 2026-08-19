import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { caseStudies } from "@/data/site";

export const Route = createFileRoute("/case-studies/")({
  head: () => ({
    meta: [
      { title: "Case Studies — Agione & Renuity | Imagina Devs" },
      {
        name: "description",
        content:
          "How embedded senior nearshore teams modernized field operations at Agione and scaled Salesforce at Renuity.",
      },
      { property: "og:title", content: "Case Studies | Imagina Devs" },
      {
        property: "og:description",
        content: "Real engagements: Agione field operations and Renuity Salesforce platform.",
      },
    ],
  }),
  component: CaseStudiesIndex,
});

function CaseStudiesIndex() {
  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="text-xs font-semibold tracking-[0.28em] text-primary uppercase">
          Case Studies
        </p>
        <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Work that stayed in production</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Two long-term partnerships where embedded senior engineers changed how the product team
          delivers.
        </p>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {caseStudies.map((c) => (
            <CaseCard key={c.slug} slug={c.slug} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function CaseCard({ slug }: { slug: string }) {
  const c = caseStudies.find((x) => x.slug === slug)!;
  return (
    <article
      className="section-light group overflow-hidden rounded-3xl border border-surface-light-border"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="aspect-[16/9] w-full overflow-hidden bg-surface-light-border/40">
        <img
          src={c.image}
          alt={`${c.client} case study`}
          loading="lazy"
          width={1280}
          height={720}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-8">
        <div className="flex items-center justify-between gap-4">
          <img
            src={c.logo}
            alt={`${c.client} logo`}
            loading="lazy"
            className="h-8 w-auto object-contain"
          />
          <span className="rounded-full bg-surface-light-foreground/5 px-3 py-1 text-xs text-surface-light-muted">
            {c.industry}
          </span>
        </div>
        <h2 className="mt-5 text-xl font-semibold text-surface-light-foreground">{c.client}</h2>
        <p className="mt-3 text-sm text-surface-light-muted">{c.summary}</p>

        <dl className="mt-6 grid grid-cols-3 gap-3">
          {c.results.map((r) => (
            <div key={r.label} className="rounded-xl bg-surface-light-foreground/5 p-3">
              <dt className="text-[11px] text-surface-light-muted">{r.label}</dt>
              <dd className="mt-1 text-sm font-semibold text-surface-light-foreground">
                {r.value}
              </dd>
            </div>
          ))}
        </dl>

        <Link
          to="/case-studies/$slug"
          params={{ slug: c.slug }}
          className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-surface-light-foreground hover:underline"
        >
          Read the case study <ArrowRight className="size-4" />
        </Link>
      </div>
    </article>
  );
}