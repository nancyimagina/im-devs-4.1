import logoLight from "@/assets/logos/logo-im-devs-light.png.asset.json";
import iconGreen from "@/assets/logos/icon-green.png.asset.json";
import logoAgione from "@/assets/logos/logo-agione.png.asset.json";
import logoRenuity from "@/assets/logos/logo-renuity.png.asset.json";
import logoNutresa from "@/assets/logos/logo-Nutresa.png.asset.json";
import logoAmazonia from "@/assets/logos/logo-amazonia.png.asset.json";
import logoBimbo from "@/assets/logos/logo-bimbo.png.asset.json";
import logoDane from "@/assets/logos/logo-dane.png.asset.json";
import caseAgione from "@/assets/case-agione.jpg";
import caseRenuity from "@/assets/case-renuity.jpg";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";

export const brand = {
  name: "Imagina Devs",
  email: "info@imaginadevs.com",
  phone: "+1 3212522392",
  phoneHref: "+13212522392",
  logo: logoLight.url,
  icon: iconGreen.url,
};

export const clientLogos = [
  { name: "Agione", src: logoAgione.url },
  { name: "Renuity", src: logoRenuity.url },
  { name: "Nutresa", src: logoNutresa.url },
  { name: "Amazonia", src: logoAmazonia.url },
  { name: "Bimbo", src: logoBimbo.url },
  { name: "DANE", src: logoDane.url },
];

export type CaseStudy = {
  slug: string;
  client: string;
  logo: string;
  image: string;
  industry: string;
  summary: string;
  challenge: string;
  approach: string[];
  results: { label: string; value: string }[];
  stack: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "agione",
    client: "Agione",
    logo: logoAgione.url,
    image: caseAgione,
    industry: "Home Services & Operations",
    summary:
      "Embedded a senior nearshore squad to modernize a field-operations platform and cut release cycles from weeks to days.",
    challenge:
      "A growing operations platform was slowed down by a monolithic codebase, manual releases and an internal team stretched across too many priorities.",
    approach: [
      "Embedded senior engineers directly into the existing product team, aligned to U.S. business hours.",
      "Introduced Clean Architecture boundaries and extracted the highest-churn modules into services.",
      "Built CI/CD pipelines with automated test gates and preview environments.",
      "Established code review standards and documentation for long-term knowledge transfer.",
    ],
    results: [
      { label: "Release cycle", value: "Weeks to days" },
      { label: "Automated coverage", value: "+62%" },
      { label: "Ramp-up time", value: "9 days" },
    ],
    stack: ["Node.js", "React", "PostgreSQL", "AWS", "GitHub Actions"],
  },
  {
    slug: "renuity",
    client: "Renuity",
    logo: logoRenuity.url,
    image: caseRenuity,
    industry: "Construction & Home Improvement",
    summary:
      "Scaled a Salesforce-based enterprise platform with certified Apex and LWC engineers integrated into the internal team.",
    challenge:
      "Rapid acquisition-driven growth demanded a Salesforce platform that could absorb new brands, new data models and new integrations without breaking.",
    approach: [
      "Added certified Salesforce engineers specialized in Apex, LWC and enterprise integrations.",
      "Refactored triggers and batch jobs to a governed, testable Apex architecture.",
      "Designed integration contracts between Salesforce and operational systems.",
      "Set up regression testing and deployment pipelines for safe, frequent releases.",
    ],
    results: [
      { label: "Apex test coverage", value: "88%" },
      { label: "Deployment failures", value: "-74%" },
      { label: "Brands onboarded", value: "Multi-brand" },
    ],
    stack: ["Apex", "Lightning Web Components", "Salesforce Platform", "MuleSoft-style APIs"],
  },
];

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "They didn't feel like a vendor. Within two weeks their engineers were reviewing our code and shipping to production like any other member of the team.",
    author: "VP of Engineering",
    role: "Home services platform, U.S.",
  },
  {
    quote:
      "The Salesforce work was the difference between patching things every sprint and finally having an architecture we trust.",
    author: "Director of Technology",
    role: "Enterprise construction group",
  },
  {
    quote:
      "Senior-first really means senior-first. We got technical leadership, not just extra hands, and our delivery velocity shows it.",
    author: "Head of Product",
    role: "Logistics software company",
  },
  {
    quote:
      "Same time zone, clear communication, no hand-holding required. Scaling the team up and down has been effortless.",
    author: "CTO",
    role: "Technology-driven services business",
  },
];

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "staff-augmentation-that-actually-scales",
    title: "Staff augmentation that actually scales delivery",
    excerpt:
      "Adding engineers is easy. Adding engineers who increase throughput without increasing overhead is a design problem.",
    date: "2026-07-14",
    readTime: "6 min read",
    category: "Staff Augmentation",
    image: blog1,
    body: [
      "Most teams discover the hard way that headcount and velocity are not the same curve. A new engineer who needs three months of context, constant supervision and a dedicated reviewer can make a team slower for a full quarter before making it faster.",
      "The difference comes from how the engagement is designed. A senior-first model puts people on the team who can read an unfamiliar codebase, ask the right questions in week one and take ownership of a vertical slice rather than waiting for tickets.",
      "We onboard through the work itself: a small, real, production-bound change in the first days, paired with an internal engineer. That surfaces gaps in documentation and environment setup immediately, and it gives both sides a fast, low-risk signal about fit.",
      "Time zone alignment matters more than most companies estimate. Nearshore teams working U.S. hours turn a 24-hour review loop into a same-morning conversation, which is often the single biggest unlock for delivery speed.",
      "Finally, plan for the exit from day one. Documentation, tests and knowledge transfer are not a closing phase; they are the reason an extended team stays an asset instead of becoming a dependency.",
    ],
  },
  {
    slug: "apex-architecture-for-enterprise-salesforce",
    title: "Apex architecture for enterprise Salesforce platforms",
    excerpt:
      "Triggers everywhere, untestable logic, deployment anxiety. A governed Apex architecture fixes the root cause.",
    date: "2026-06-02",
    readTime: "7 min read",
    category: "Salesforce",
    image: blog2,
    body: [
      "Salesforce orgs rarely fail because of a single bad class. They fail because business logic accumulates in triggers, flows and one-off automations until nobody can predict what a single record update will do.",
      "The remedy is boring and effective: one trigger per object, a handler that only routes, and domain services that hold the actual rules. Once logic lives in plain, injectable Apex classes, it becomes testable without contorting the test suite around the platform.",
      "Lightning Web Components should stay thin. Data shaping belongs in Apex controllers with explicit contracts, so the UI can evolve without dragging query logic along with it.",
      "Governor limits are an architecture constraint, not an inconvenience. Bulk-safe patterns, selective queries and asynchronous processing need to be decided at design time, particularly for orgs absorbing multiple brands or acquisitions.",
      "Pair all of this with real deployment pipelines and regression tests. Coverage percentage is a poor goal by itself; a suite that catches integration breakage before release is the actual objective.",
    ],
  },
  {
    slug: "modernizing-a-monolith-without-stopping-delivery",
    title: "Modernizing a monolith without stopping delivery",
    excerpt:
      "Big-bang rewrites fail quietly. Incremental extraction lets you modernize while the business keeps shipping.",
    date: "2026-05-08",
    readTime: "5 min read",
    category: "Architecture",
    image: blog3,
    body: [
      "A rewrite promises a clean slate and usually delivers two systems to maintain. The safer path is to modernize the monolith in place, extracting only what earns its own boundary.",
      "Start with change data, not opinions. The modules with the highest churn and the highest incident rate are the ones where a clean boundary pays back fastest.",
      "Domain-Driven Design gives the vocabulary for those boundaries, and Clean Architecture gives the enforcement: dependencies point inward, infrastructure stays replaceable, and business rules stop being coupled to a framework version.",
      "Every extraction step must ship. If a refactor cannot go to production behind a flag within a sprint, it is too large and should be decomposed further.",
      "Measure the outcome in delivery terms, not architecture diagrams: lead time, change failure rate and the time it takes a new engineer to make their first safe change.",
    ],
  },
];

export const services = [
  {
    slug: "staff-augmentation",
    title: "Staff Augmentation",
    description:
      "Senior engineers embedded into your team — Jr, Mid, Senior and Tech Leads — aligned to U.S. time zones.",
    points: [
      "Long-term team extensions, not short-term outsourcing",
      "Direct collaboration with internal engineering and product",
      "Flexible scaling as your roadmap changes",
    ],
  },
  {
    slug: "custom-software-development",
    title: "Custom Software Development",
    description:
      "Backend, frontend and API-first systems built to enterprise standards from day one.",
    points: [
      "Node.js, Python, Java and .NET backends",
      "React, Vue and Angular frontends",
      "API-first and service-oriented architectures",
    ],
  },
  {
    slug: "enterprise-platform-development",
    title: "Enterprise Platform Development",
    description:
      "Salesforce-based and mission-critical platforms designed for scale, security and change.",
    points: [
      "Advanced Apex development and LWC",
      "Custom objects, workflows, triggers and integrations",
      "Enterprise-grade Salesforce architectures",
    ],
  },
  {
    slug: "technical-support-and-evolution",
    title: "Ongoing Support & Evolution",
    description:
      "Stable engineering capacity to operate, harden and evolve the systems you already run.",
    points: [
      "Performance optimization and technical debt reduction",
      "CI/CD pipelines and automated testing strategies",
      "Documentation and knowledge transfer",
    ],
  },
];