import { Link } from "@tanstack/react-router";
import { Mail, Phone } from "lucide-react";
import { brand } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-brand-deeper">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <img src={brand.logo} alt={`${brand.name} logo`} className="h-7 w-auto" />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Nearshore software development partner for U.S. companies building, scaling and
            operating mission-critical systems.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/services" className="hover:text-foreground">
                Services
              </Link>
            </li>
            <li>
              <Link to="/case-studies" className="hover:text-foreground">
                Case Studies
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-foreground">
                About
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-foreground">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>
              <a
                href={`mailto:${brand.email}`}
                className="flex items-center gap-2 hover:text-foreground"
              >
                <Mail className="size-4 text-primary" />
                {brand.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${brand.phoneHref}`}
                className="flex items-center gap-2 hover:text-foreground"
              >
                <Phone className="size-4 text-primary" />
                {brand.phone}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/40 px-5 py-6 text-center text-xs text-muted-foreground lg:px-8">
        © {new Date().getFullYear()} {brand.name}. All rights reserved.
      </div>
    </footer>
  );
}