"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Cta() {
  return (
    <section className="bg-bg">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-12 sm:py-20">
        <div className="relative overflow-hidden rounded-[40px] border border-primary/25 bg-gradient-to-br from-surface/90 via-surface/70 to-primary/10 px-6 py-14 sm:px-12 sm:py-18 md:px-20 md:py-20 shadow-[0_45px_120px_-70px_rgba(12,18,24,0.9)]">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[140px] bg-gradient-to-b from-primary/30 via-transparent to-primary/20 blur-3xl opacity-70" />
          <div className="pointer-events-none absolute -right-28 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-primary/25 blur-3xl opacity-60" />
          <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center text-text">
            <h2 className="mt-6 text-2xl font-semibold tracking-tight text-white sm:text-[2.35rem] sm:leading-tight">
              Seizing Our Humanness is more than a book—it’s a tactile record of
              light, protest, and grace.
            </h2>
            <div className="mt-8 h-px w-24 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            <blockquote className="mt-8 max-w-2xl text-base font-light leading-7 text-text-dim sm:text-lg sm:leading-8">
              “Photography is not only light and shadow; it is memory, protest,
              and humanness. Each page is a reminder.”
            </blockquote>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="min-w-[200px] rounded-full border border-primary/50 bg-primary/90 px-8 py-5 text-base font-semibold tracking-wide text-white shadow-[0_20px_40px_-24px_rgba(33,92,101,0.7)] transition hover:bg-primary hover:shadow-[0_26px_60px_-24px_rgba(33,92,101,0.9)]"
                data-testid="button-contact"
              >
                <Link href="/contact">Get In Touch</Link>
              </Button>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 rounded-[40px] ring-1 ring-white/10" />
        </div>
      </div>
    </section>
  );
}
