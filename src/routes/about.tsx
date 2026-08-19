import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Imagina Devs — Nearshore Engineering Partner" },
      {
        name: "description",
        content:
          "Imagina Devs is a nearshore software development partner building, scaling and operating mission-critical systems for U.S. companies.",
      },
      { property: "og:title", content: "About Imagina Devs" },
      {
        property: "og:description",
        content:
          "Senior-first nearshore engineering teams aligned to U.S. time zones and enterprise standards.",
      },
    ],
  }),
  component: AboutPage,
});

const why = [
  "Senior-first mindset",
  "Strong technical leadership",
  "Proven experience with enterprise U.S. clients",
  "Nearshore efficiency without compromising quality",
];

const value = [
  "We extend your team with experienced developers",
  "We accelerate delivery without increasing internal overhead",
  "We reduce risk by providing stable, long-term engineering capacity",
];

const industries = [
  "Home Services & Construction",
  "Enterprise Platforms (Salesforce-based systems)",
  "Logistics & Operations",
  "Technology-driven businesses",
];

const howWeWork = [
  "Teams aligned to U.S. business hours",
  "Clear communication and accountability",
  "Flexible scaling as your needs grow",
];

function AboutPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="text-xs font-semibold tracking-[0.28em] text-primary uppercase">Who we are</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold text-balance sm:text-5xl">
          A nearshore partner for mission-critical systems
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
          Imagina Devs is a nearshore software development partner specialized in building, scaling
          and operating mission-critical systems for U.S. companies. We integrate senior engineering
          talent directly into your teams, aligned to U.S. time zones and enterprise standards.
        </p>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <section className="rounded-2xl border border-border/60 bg-card p-8">
            <h2 className="text-xl font-semibold">What we do</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              We help U.S. companies design and build reliable software through high-quality
              nearshore development teams. We focus on long-term partnerships, not short-term
              outsourcing.
            </p>
            <h3 className="mt-6 text-sm font-semibold text-primary">How we create value</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {value.map((v) => (
                <li key={v} className="flex gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  {v}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-border/60 bg-card p-8">
            <h2 className="text-xl font-semibold">Why Imagina Devs</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {why.map((v) => (
                <li key={v} className="flex gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  {v}
                </li>
              ))}
            </ul>
            <h3 className="mt-6 text-sm font-semibold text-primary">Delivery model</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Staff Augmentation (Jr, Mid, Senior, Tech Leads)</li>
              <li>Long-term team extensions</li>
              <li>Direct collaboration with internal engineering and product teams</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-border/60 bg-card p-8">
            <h2 className="text-xl font-semibold">Industries we support</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {industries.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-border/60 bg-card p-8">
            <h2 className="text-xl font-semibold">How we work</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {howWeWork.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}