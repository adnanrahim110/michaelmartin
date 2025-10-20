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
import Image from "next/image";
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
    <footer className="relative isolate overflow-hidden border-t border-border bg-bg">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-transparent to-primary/10" />
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-primary/20 blur-[120px] opacity-70" />
      <div className="pointer-events-none absolute -right-28 bottom-12 h-80 w-80 rounded-full bg-primary/15 blur-[140px] opacity-65" />
      <div className="relative mx-auto max-w-7xl px-4 pb-6 pt-14 sm:px-6 sm:pb-8 sm:pt-20 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-4 lg:gap-14">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/images/logo.png"
                alt="Michael Martin logo"
                width={220}
                height={80}
                className="h-12 w-auto transition-transform duration-300 hover:scale-[1.02] sm:h-20"
                priority
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-text-dim sm:mt-5 sm:text-base">
              Street and portrait work that looks past the pose and into the
              person.
            </p>
            <div className="mt-6 flex items-center gap-2.5 sm:mt-8">
              <Button
                size="icon"
                variant="ghost"
                asChild
                aria-label="Instagram"
                className="h-10 w-10 rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:border-white/20 hover:bg-white/10 sm:h-11 sm:w-11"
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
                variant="ghost"
                asChild
                aria-label="Twitter"
                className="h-10 w-10 rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:border-white/20 hover:bg-white/10 sm:h-11 sm:w-11"
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
                variant="ghost"
                asChild
                aria-label="Email"
                className="h-10 w-10 rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:border-white/20 hover:bg-white/10 sm:h-11 sm:w-11"
              >
                <a href="mailto:contact@michaelmartin.com">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              </Button>
            </div>
          </div>
          <div className="order-3 sm:order-2 sm:col-span-2 lg:order-none lg:col-span-2">
            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_40px_110px_-80px_rgba(12,18,26,1)] backdrop-blur-lg sm:p-8">
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/15 blur-[120px] opacity-70" />
              <div className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-primary/10 blur-[110px] opacity-60" />
              <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-xl">
                  <h3 className="text-2xl font-semibold text-white sm:text-[2rem] sm:leading-tight">
                    Newsletter from the studio.
                  </h3>
                  <p className="mt-3 text-sm text-text-dim sm:text-base">
                    Essays, behind-the-scenes, and exhibition invitations—sent
                    only when there is something worth sharing.
                  </p>
                </div>
                {status?.type === "success" && (
                  <span className="inline-flex flex-shrink-0 items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Subscribed</span>
                  </span>
                )}
              </div>
              <form onSubmit={onSubmit} className="relative z-10 mt-6 sm:mt-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="flex flex-1 items-center overflow-hidden rounded-full bg-primary-950/20 focus-within:bg-primary-950 focus-within:ring-2 focus-within:ring-primary transition-all duration-300 ease-in-out px-3 pr-2 py-2 shadow-[0_24px_65px_-40px_rgba(12,18,26,0.4)]">
                    <div className="grow">
                      <Input
                        id="newsletter-email"
                        size="md"
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-label="Email address"
                        data-testid="input-newsletter"
                        className="h-12 flex-1 border-0 bg-transparent px-3 text-sm text-slate-100 placeholder:text-slate-400 focus-visible:ring-0 focus-visible:outline-none sm:text-base"
                        error={status?.type === "error"}
                      />
                    </div>
                    <div className="pl-2">
                      <Button
                        type="submit"
                        size="md"
                        className="h-10 rounded-full bg-primary px-6 text-sm font-semibold text-white shadow-none transition hover:bg-primary/90 sm:h-12 sm:px-7 sm:text-base"
                        data-testid="button-subscribe"
                      >
                        Subscribe
                      </Button>
                    </div>
                  </div>
                </div>
                {status?.type === "error" && (
                  <div className="mt-2 min-h-[20px]">
                    <p className="flex items-center gap-2 text-xs text-red-400 sm:text-sm">
                      <AlertCircle className="h-4 w-4" />
                      {status.msg}
                    </p>
                  </div>
                )}
                {status?.type === "success" && (
                  <div className="mt-3 text-sm text-primary/90 sm:text-base">
                    Subscribed – keep an eye on your inbox.
                  </div>
                )}
              </form>
            </div>
          </div>
          <div className="lg:col-span-1">
            <h3 className="mb-3 text-lg font-semibold text-white sm:mb-4 sm:text-xl">
              Explore
            </h3>
            <ul className="grid max-w-xs gap-y-1.5 text-sm text-text-dim sm:gap-y-2 sm:text-base">
              <li>
                <Link
                  href="/series"
                  className="block rounded-full py-1 transition-colors hover:text-text"
                >
                  Series
                </Link>
              </li>
              <li>
                <Link
                  href="/book"
                  className="block rounded-full py-1 transition-colors hover:text-text"
                >
                  Book
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="block rounded-full py-1 transition-colors hover:text-text"
                >
                  About
                </Link>
              </li>
            </ul>
            <div className="mt-6 sm:mt-8">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-gradient-to-r from-primary/90 via-primary to-primary/75 pl-6 pr-3 py-3 text-sm font-semibold text-white shadow-[0_32px_70px_-48px_rgba(33,92,101,0.9)] transition-all duration-300 hover:scale-[1.02] sm:pl-8 sm:pr-3 sm:text-base"
              >
                <span>Get in touch</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white transition group-hover:bg-white/25">
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-5 text-center text-xs text-text-dim sm:mt-12 sm:text-sm md:text-left">
          &copy; {new Date().getFullYear()} Michael Martin Photography. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
}
