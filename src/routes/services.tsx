import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { services } from "@/data/site";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Nearshore Engineering Teams | Imagina Devs" },
      {
        name: "description",
        content:
          "Staff augmentation, custom software development, Salesforce enterprise platforms and ongoing technical evolution for U.S. companies.",
      },
      { property: "og:title", content: "Services | Imagina Devs" },
      {
        property: "og:description",
        content:
          "Senior nearshore engineering: staff augmentation, custom software, Salesforce platforms and ongoing support.",
      },
    ],
  }),
  component: ServicesPage,
});

const capabilities = [
  {
    title: "Software Engineering",
    items: [
      "Backend development (Node.js, Python, Java, .NET)",
      "Frontend development (React, Vue, Angular)",
      "API-first and service-oriented architectures",
      "Monolith modernization and system refactoring",
    ],
  },
  {
    title: "Salesforce & Apex Engineering",
    items: [
      "Advanced Apex development",
      "Lightning Web Components (LWC)",
      "Custom objects, workflows, triggers and integrations",
      "Enterprise-grade Salesforce architectures",
    ],
  },
  {
    title: "Architecture & Scalability",
    items: [
      "Clean Architecture and Domain-Driven Design",
      "High-availability and fault-tolerant systems",
      "Performance optimization and technical debt reduction",
      "Secure authentication and authorization models",
    ],
  },
  {
    title: "Quality & Delivery",
    items: [
      "Code reviews and technical leadership",
      "CI/CD pipelines",
      "Automated testing strategies",
      "Documentation and knowledge transfer",
    ],
  },
];

function ServicesPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="text-xs font-semibold tracking-[0.28em] text-primary uppercase">Services</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold text-balance sm:text-5xl">
          Engineering capacity built for long-term partnerships
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          We help U.S. companies design and build reliable software through high-quality nearshore
          teams — focused on long-term partnerships, not short-term outsourcing.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <article
              key={s.slug}
              className="rounded-2xl border border-border/60 bg-card p-8"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <h2 className="text-xl font-semibold">{s.title}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{s.description}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <h2 className="mt-20 text-2xl font-bold">Core technical capabilities</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((c) => (
            <div key={c.title} className="rounded-2xl border border-border/50 p-6">
              <h3 className="text-sm font-semibold text-primary">{c.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {c.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 rounded-3xl border border-primary/30 bg-card p-10 text-center">
          <h2 className="text-2xl font-bold">Need senior engineers this month?</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Tell us what you're building and we'll propose a team shape that fits your roadmap.
          </p>
          <Link
            to="/contact"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            Talk to us <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}