"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Instagram,
  Mail,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // { type: "success" | "error", msg: string }
  const onSubmit = (e) => {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!ok) {
      setStatus({ type: "error", msg: "Enter a valid email." });
      return;
    }
    setStatus({ type: "success", msg: "Subscribed. Check your inbox soon." });
    console.log("Newsletter signup:", email);
    setEmail("");
    const t = setTimeout(() => setStatus(null), 4000);
    return () => clearTimeout(t);
  };
  return (
    <footer className="bg-bg border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-12 sm:pt-16 pb-4 sm:pb-6">
        <div className="grid gap-8 sm:gap-10 lg:gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="text-xl sm:text-2xl font-semibold tracking-tight">
                Michael <span className="text-primary">Martin</span>
              </span>
            </Link>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed text-text-dim">
              Street and portrait work that looks past the pose and into the
              person.
            </p>
            <div className="mt-4 sm:mt-6 flex items-center gap-2">
              <Button
                size="icon"
                variant="outline"
                asChild
                aria-label="Instagram"
                className="h-9 w-9 sm:h-10 sm:w-10"
              >
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              </Button>
              <Button
                size="icon"
                variant="outline"
                asChild
                aria-label="Twitter"
                className="h-9 w-9 sm:h-10 sm:w-10"
              >
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              </Button>
              <Button
                size="icon"
                variant="outline"
                asChild
                aria-label="Email"
                className="h-9 w-9 sm:h-10 sm:w-10"
              >
                <a href="mailto:contact@michaelmartin.com">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              </Button>
            </div>
          </div>
          <div className="sm:col-span-2 lg:col-span-2 order-3 sm:order-2 lg:order-none">
            <div className="rounded-xl sm:rounded-2xl border border-border bg-surface/70 p-4 sm:p-6 backdrop-blur">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-medium">Newsletter</h3>
                  <p className="mt-1 text-sm sm:text-base text-text-dim">
                    New work, essays, and exhibition dates. One to two emails a
                    month.
                  </p>
                </div>
                {status?.type === "success" && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary/10 px-2 sm:px-2.5 py-1 text-[10px] sm:text-[11px] text-primary flex-shrink-0">
                    <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    <span className="hidden sm:inline">Subscribed</span>
                    <span className="sm:hidden">✓</span>
                  </span>
                )}
              </div>
              <form
                onSubmit={onSubmit}
                className="mt-3 sm:mt-4 flex flex-col sm:flex-row gap-2 sm:gap-0"
              >
                <Input
                  size="md"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  startAdornment={
                    <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  }
                  aria-label="Email address"
                  data-testid="input-newsletter"
                  className="sm:rounded-r-none text-sm sm:text-base"
                  error={status?.type === "error"}
                />
                <Button
                  type="submit"
                  size="md"
                  className="sm:min-w-[100px] sm:rounded-l-none text-sm sm:text-base px-4 sm:px-6"
                  data-testid="button-subscribe"
                >
                  Subscribe
                </Button>
              </form>
              {status?.type === "error" && (
                <div className="mt-2 min-h-[20px]">
                  <p className="flex items-center gap-1 text-[11px] text-red-400">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {status.msg}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="lg:col-span-1">
            <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl font-medium">
              Explore
            </h3>
            <ul className="grid gap-y-1.5 sm:gap-y-2 text-sm sm:text-base text-text-dim max-w-xs">
              <li>
                <Link
                  href="/series"
                  className="transition-colors hover:text-text py-1 block"
                >
                  Series
                </Link>
              </li>
              <li>
                <Link
                  href="/book"
                  className="transition-colors hover:text-text py-1 block"
                >
                  Book
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="transition-colors hover:text-text py-1 block"
                >
                  About
                </Link>
              </li>
            </ul>
            <div className="mt-4 sm:mt-6">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm sm:text-base text-primary transition-colors hover:text-primary-400 py-1"
              >
                Get in touch
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 sm:mt-10 lg:mt-12 grid items-center gap-3 sm:gap-4 border-t border-border pt-4 sm:pt-5 lg:pt-6 md:grid-cols-2">
          <div className="text-center text-xs sm:text-sm text-text-dim md:text-left">
            &copy; {new Date().getFullYear()} Michael Martin Photography. All
            rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
