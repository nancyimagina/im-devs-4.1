import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { posts } from "@/data/site";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — Engineering Notes | Imagina Devs" },
      {
        name: "description",
        content:
          "Practical notes on staff augmentation, Salesforce Apex architecture and modernizing legacy systems.",
      },
      { property: "og:title", content: "Imagina Devs Blog" },
      {
        property: "og:description",
        content: "Engineering notes on scaling teams, Salesforce architecture and modernization.",
      },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="text-xs font-semibold tracking-[0.28em] text-primary uppercase">Blog</p>
        <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Engineering notes</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Lessons from building and scaling mission-critical systems with embedded senior teams.
        </p>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {posts.map((p) => (
            <BlogCard key={p.slug} slug={p.slug} />
          ))}
        </div>
      </div>
    </div>
  );
}

function BlogCard({ slug }: { slug: string }) {
  const post = posts.find((p) => p.slug === slug)!;
  return (
    <article className="group overflow-hidden rounded-2xl border border-border/60 bg-card">
      <img
        src={post.image}
        alt={post.title}
        loading="lazy"
        width={1280}
        height={720}
        className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="p-7">
        <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
          {post.category}
        </p>
        <h2 className="mt-3 text-lg font-semibold">{post.title}</h2>
        <p className="mt-3 text-sm text-muted-foreground">{post.excerpt}</p>
        <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
          <span>{post.readTime}</span>
          <Link
            to="/blog/$slug"
            params={{ slug: post.slug }}
            className="inline-flex items-center gap-1 font-semibold text-primary"
          >
            Read <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}