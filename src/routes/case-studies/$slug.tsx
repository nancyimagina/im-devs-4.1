import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import { caseStudies } from "@/data/site";

export const Route = createFileRoute("/case-studies/$slug")({
  loader: ({ params }) => {
    const study = caseStudies.find((c) => c.slug === params.slug);
    if (!study) throw notFound();
    return { study };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Case study not found" }, { name: "robots", content: "noindex" }] };
    }
    const { study } = loaderData;
    return {
      meta: [
        { title: `${study.client} Case Study | Imagina Devs` },
        { name: "description", content: study.summary },
        { property: "og:title", content: `${study.client} — Case Study` },
        { property: "og:description", content: study.summary },
      ],
    };
  },
  component: CaseStudyPage,
});

function CaseStudyPage() {
  const { study } = Route.useLoaderData();
  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <Link
          to="/case-studies"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="size-4" /> All case studies
        </Link>

        <div className="mt-8 flex items-center gap-5">
          <img
            src={study.logo}
            alt={`${study.client} logo`}
            className="h-10 w-auto object-contain brightness-0 invert"
          />
          <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
            {study.industry}
          </span>
        </div>

        <h1 className="mt-6 text-3xl font-bold text-balance sm:text-4xl">{study.summary}</h1>

        <img
          src={study.image}
          alt={`${study.client} project`}
          width={1280}
          height={720}
          className="mt-10 aspect-[16/9] w-full rounded-3xl object-cover"
        />

        <div className="section-light mt-10 rounded-3xl p-8">
          <h2 className="text-xl font-semibold">The challenge</h2>
          <p className="mt-3 text-sm text-surface-light-muted">{study.challenge}</p>

          <h2 className="mt-8 text-xl font-semibold">Our approach</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {study.approach.map((a) => (
              <li key={a} className="flex gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-surface-light-foreground" />
                {a}
              </li>
            ))}
          </ul>

          <h2 className="mt-8 text-xl font-semibold">Results</h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-3">
            {study.results.map((r) => (
              <div key={r.label} className="rounded-2xl bg-surface-light-foreground/5 p-5">
                <dt className="text-xs text-surface-light-muted">{r.label}</dt>
                <dd className="mt-1 text-lg font-semibold">{r.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-2">
            {study.stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-surface-light-border px-3 py-1 text-xs text-surface-light-muted"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            Start a similar engagement
          </Link>
        </div>
      </div>
    </div>
  );
}