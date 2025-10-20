"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Cta() {
  return (
    <section className="relative isolate overflow-hidden bg-bg py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-transparent to-primary/5" />
      <div className="pointer-events-none absolute left-1/2 top-8 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/25 blur-[120px] opacity-50" />
      <div className="pointer-events-none absolute -left-24 bottom-14 h-56 w-56 rounded-full bg-primary/15 blur-[100px] opacity-40" />
      <div className="pointer-events-none absolute -right-28 top-1/3 h-64 w-64 rounded-full bg-primary/20 blur-[110px] opacity-45" />
      <div className="relative mx-auto max-w-3xl px-6">
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] p-12 text-center text-text shadow-[0_55px_140px_-95px_rgba(11,22,34,1)] backdrop-blur-lg sm:p-16">
          <div className="pointer-events-none absolute inset-x-14 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <p className="relative text-lg leading-8 text-text-dim sm:text-[1.35rem] sm:leading-[2rem]">
            Looking to purchase art prints?{" "}
            <span className="bg-gradient-to-r from-primary/80 via-primary to-primary/70 bg-clip-text font-medium text-transparent">
              Please contact us directly through the contact page
            </span>{" "}
            so we can help you select the right piece for your collection.
          </p>
          <Button
            asChild
            size="lg"
            className="relative mt-12 inline-flex min-w-[220px] items-center justify-center rounded-full bg-gradient-to-r from-primary to-primary/80 px-8 py-5 text-base font-semibold text-white shadow-[0_32px_80px_-46px_rgba(33,92,101,0.9)] transition hover:from-primary/90 hover:to-primary/70"
            data-testid="button-contact"
          >
            <Link href="/contact">Contact the Studio</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
