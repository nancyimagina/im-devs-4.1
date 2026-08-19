import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/data/site";

export function TestimonialsCarousel({ intervalMs = 6500 }: { intervalMs?: number }) {
  const [index, setIndex] = useState(0);
  const go = useCallback((dir: number) => {
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => go(1), intervalMs);
    return () => window.clearInterval(id);
  }, [go, intervalMs, index]);

  const active = testimonials[index]!;

  return (
    <div className="relative mx-auto max-w-3xl text-center">
      <Quote className="mx-auto size-8 text-primary" />
      <blockquote className="mt-6 text-xl leading-relaxed font-medium text-balance sm:text-2xl">
        “{active.quote}”
      </blockquote>
      <div className="mt-6">
        <p className="font-semibold">{active.author}</p>
        <p className="text-sm text-muted-foreground">{active.role}</p>
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Previous testimonial"
          onClick={() => go(-1)}
          className="rounded-full border border-border p-2 transition-colors hover:border-primary hover:text-primary"
        >
          <ChevronLeft className="size-4" />
        </button>
        <div className="flex gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.author + i}
              type="button"
              aria-label={`Testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-7 bg-primary" : "w-3 bg-border"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next testimonial"
          onClick={() => go(1)}
          className="rounded-full border border-border p-2 transition-colors hover:border-primary hover:text-primary"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}