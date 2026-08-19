import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, Send } from "lucide-react";
import { brand } from "@/data/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Imagina Devs — Talk to a Senior Engineering Team" },
      {
        name: "description",
        content:
          "Reach Imagina Devs at info@imaginadevs.com or +1 3212522392 to scale your engineering team with senior nearshore talent.",
      },
      { property: "og:title", content: "Contact Imagina Devs" },
      {
        property: "og:description",
        content: "Tell us what you're building and we'll propose a team shape that fits.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-xs font-semibold tracking-[0.28em] text-primary uppercase">Contact</p>
          <h1 className="mt-4 text-4xl font-bold text-balance sm:text-5xl">
            Let's talk about your roadmap
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            Share your goals, stack and timeline. We'll come back with a proposed team shape,
            seniority mix and start date.
          </p>

          <div className="mt-10 space-y-4">
            <a
              href={`mailto:${brand.email}`}
              className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card p-5 transition-colors hover:border-primary"
            >
              <Mail className="size-5 text-primary" />
              <span>{brand.email}</span>
            </a>
            <a
              href={`tel:${brand.phoneHref}`}
              className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card p-5 transition-colors hover:border-primary"
            >
              <Phone className="size-5 text-primary" />
              <span>{brand.phone}</span>
            </a>
          </div>
        </div>

        <form
          className="rounded-3xl border border-border/60 bg-card p-8"
          style={{ boxShadow: "var(--shadow-card)" }}
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <div className="grid gap-4">
            <label className="text-sm">
              Name
              <input
                required
                name="name"
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </label>
            <label className="text-sm">
              Work email
              <input
                required
                type="email"
                name="email"
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </label>
            <label className="text-sm">
              Company
              <input
                name="company"
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </label>
            <label className="text-sm">
              What do you need?
              <textarea
                required
                name="message"
                rows={5}
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </label>
          </div>

          <button
            type="submit"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Send message <Send className="size-4" />
          </button>

          {sent ? (
            <p className="mt-4 text-center text-sm text-primary">
              Thanks — write us directly at {brand.email} and we'll reply within one business day.
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );
}