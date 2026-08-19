import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/site/Hero";
import { LogoMarquee } from "@/components/site/LogoMarquee";
import { TestimonialsCarousel } from "@/components/site/Testimonials";
import { CaseCard } from "./case-studies/index";
import { caseStudies, posts, services } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Imagina Devs — Senior Nearshore Engineering Teams" },
      {
        name: "description",
        content:
          "Embed senior nearshore engineers into your team within days. Custom software, Salesforce Apex and LWC, and long-term team extensions for U.S. companies.",
      },
      { property: "og:title", content: "Imagina Devs — Senior Nearshore Engineering Teams" },
      {
        property: "og:description",
        content:
          "Scale delivery without compromising quality. Senior-first nearshore teams aligned to U.S. time zones.",
      },
    ],
  }),
  component: Index,
});

function SectionHeading({
  kicker,
  title,
  to,
  linkLabel,
  light,
}: {
  kicker: string;
  title: string;
  to: "/services" | "/case-studies" | "/about" | "/blog" | "/testimonials";
  linkLabel: string;
  light?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-xs font-semibold tracking-[0.28em] text-primary uppercase">{kicker}</p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{title}</h2>
      </div>
      <Link
        to={to}
        className={`inline-flex items-center gap-2 text-sm font-semibold ${
          light ? "text-surface-light-foreground" : "text-primary"
        }`}
      >
        {linkLabel} <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}

function Index() {
  return (
    <>
      <Hero />
      <LogoMarquee />

      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <SectionHeading
          kicker="Services"
          title="Senior engineering, embedded"
          to="/services"
          linkLabel="All services"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div key={s.slug} className="rounded-2xl border border-border/60 bg-card p-7">
              <h3 className="text-base font-semibold">{s.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-light py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            kicker="Case Studies"
            title="Proof, not promises"
            to="/case-studies"
            linkLabel="All case studies"
            light
          />
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {caseStudies.map((c) => (
              <CaseCard key={c.slug} slug={c.slug} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <SectionHeading
          kicker="About"
          title="A nearshore partner, senior-first"
          to="/about"
          linkLabel="More about us"
        />
        <p className="mt-8 max-w-3xl text-lg text-muted-foreground">
          Imagina Devs integrates senior engineering talent directly into your teams, aligned to
          U.S. time zones and enterprise standards — building, scaling and operating
          mission-critical systems.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {[
            ["Senior-first mindset", "Engineers who own outcomes, not tickets."],
            ["U.S. time zone alignment", "Same-day collaboration, no handoff lag."],
            ["Long-term capacity", "Stable teams that reduce delivery risk."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-border/50 p-6">
              <h3 className="text-sm font-semibold text-primary">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border/40 bg-brand-deeper py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="text-center text-xs font-semibold tracking-[0.28em] text-primary uppercase">
            Testimonials
          </p>
          <div className="mt-10">
            <TestimonialsCarousel />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <SectionHeading
          kicker="Blog"
          title="Engineering notes"
          to="/blog"
          linkLabel="All articles"
        />
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {posts.map((p) => (
            <article
              key={p.slug}
              className="group overflow-hidden rounded-2xl border border-border/60 bg-card"
            >
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                width={1280}
                height={720}
                className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="p-7">
                <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
                  {p.category}
                </p>
                <h3 className="mt-3 text-base font-semibold">{p.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{p.excerpt}</p>
                <Link
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary"
                >
                  Read <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-24 lg:px-8">
        <div className="rounded-3xl border border-primary/30 bg-card p-12 text-center">
          <h2 className="text-3xl font-bold text-balance">Ready to extend your team?</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Senior engineers, aligned to your hours, shipping with your team in days.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground"
            style={{ boxShadow: "var(--shadow-glow)" }}
          >
            Talk to us <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
