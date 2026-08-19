import { createFileRoute } from "@tanstack/react-router";
import { Quote } from "lucide-react";
import { TestimonialsCarousel } from "@/components/site/Testimonials";
import { testimonials } from "@/data/site";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Client Testimonials — Imagina Devs" },
      {
        name: "description",
        content:
          "What engineering and product leaders say about working with Imagina Devs nearshore teams.",
      },
      { property: "og:title", content: "Client Testimonials | Imagina Devs" },
      {
        property: "og:description",
        content: "Feedback from U.S. engineering leaders who extended their teams with us.",
      },
    ],
  }),
  component: TestimonialsPage,
});

function TestimonialsPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="text-xs font-semibold tracking-[0.28em] text-primary uppercase">
          Testimonials
        </p>
        <h1 className="mt-4 text-4xl font-bold sm:text-5xl">What our partners say</h1>

        <div className="mt-14 rounded-3xl border border-border/60 bg-card p-10">
          <TestimonialsCarousel />
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <article key={t.author + t.role} className="rounded-2xl border border-border/50 p-8">
              <Quote className="size-6 text-primary" />
              <p className="mt-4 text-sm leading-relaxed">“{t.quote}”</p>
              <p className="mt-5 text-sm font-semibold">{t.author}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}