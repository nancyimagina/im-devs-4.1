import { useCallback, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { ParticleField } from "./ParticleField";

const slides = [
  {
    kicker: "Staff Augmentation",
    title: "Scale your engineering team fast",
    text: "Embed senior engineers into your team within days. Scale delivery without compromising quality or velocity",
    shape: "handshake" as const,
  },
  {
    kicker: "Salesforce Experts",
    title: "Specialized Salesforce engineering",
    text: "Certified Salesforce engineers specialized in Apex, LWC, and scalable enterprise implementations",
    shape: "cloud" as const,
  },
];

export function Hero() {
  const [index, setIndex] = useState(0);
  const go = useCallback((dir: number) => {
    setIndex((i) => (i + dir + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => go(1), 7000);
    return () => window.clearInterval(id);
  }, [go, index]);

  const active = slides[index]!;

  return (
    <section
      className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-2 lg:px-8">
        <div>
          <span className="inline-flex items-center rounded-full border border-primary/40 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-primary uppercase">
            {active.kicker}
          </span>
          <h1 className="mt-6 text-4xl leading-[1.05] font-bold text-balance sm:text-5xl lg:text-6xl">
            {active.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">{active.text}</p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              style={{ boxShadow: "var(--shadow-glow)" }}
            >
              Talk to us <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
            >
              Explore services
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => go(-1)}
              className="rounded-full border border-border p-2 transition-colors hover:border-primary hover:text-primary"
            >
              <ChevronLeft className="size-4" />
            </button>
            <div className="flex gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.kicker}
                  type="button"
                  aria-label={s.kicker}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-8 bg-primary" : "w-4 bg-border"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => go(1)}
              className="rounded-full border border-border p-2 transition-colors hover:border-primary hover:text-primary"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        <div className="relative h-[340px] sm:h-[440px] lg:h-[520px]">
          <div className="absolute inset-0 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative h-full w-full">
            <ParticleField shape={active.shape} />
          </div>
        </div>
      </div>
    </section>
  );
}