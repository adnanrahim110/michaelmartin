"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SeriesCta() {
  return (
    <section className="relative overflow-hidden bg-bg py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-primary/15 via-transparent to-primary/15 blur-3xl opacity-80" />
      <div className="mx-auto flex max-w-5xl flex-col gap-10 rounded-[36px] border border-white/10 bg-white/[0.05] px-8 py-12 text-center text-text shadow-[0_40px_110px_-90px_rgba(12,18,26,1)] backdrop-blur sm:px-12">
        <span className="inline-flex items-center justify-center gap-2 self-center rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary-500">
          Art Print Enquiries
        </span>
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-[2.5rem] sm:leading-tight">
          Looking to bring a series into your collection?
        </h2>
        <p className="text-base leading-7 text-text-dim sm:text-lg sm:leading-8">
          Looking to purchase art prints? Please contact us directly through the
          contact page so we can help you select the right piece for your
          collection, whether it's a single print or a tailored sequence.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="min-w-[200px] rounded-full bg-gradient-to-r from-primary to-primary/80 px-8 py-5 text-base font-semibold tracking-wide text-white shadow-[0_32px_80px_-48px_rgba(33,92,101,0.85)] transition hover:from-primary/90 hover:to-primary/70"
          >
            <Link href="/contact">Contact the studio</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
