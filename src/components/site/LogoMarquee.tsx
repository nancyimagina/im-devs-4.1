import { clientLogos } from "@/data/site";

export function LogoMarquee() {
  const row = [...clientLogos, ...clientLogos];
  return (
    <section className="border-y border-border/40 bg-brand-deeper py-12">
      <p className="text-center text-xs font-semibold tracking-[0.28em] text-muted-foreground uppercase">
        Trusted by teams we build with
      </p>
      <div className="mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="marquee-track flex w-max items-center gap-16 pr-16">
          {row.map((logo, i) => (
            <img
              key={`${logo.name}-${i}`}
              src={logo.src}
              alt={logo.name}
              loading="lazy"
              className="h-9 w-auto opacity-60 brightness-0 invert transition-opacity hover:opacity-100"
            />
          ))}
        </div>
      </div>
    </section>
  );
}