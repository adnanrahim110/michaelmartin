"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Cta() {
  return (
    <section className="bg-bg">
      <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <div className="rounded-2xl border border-border bg-surface/70 backdrop-blur px-6 py-12 md:px-12 md:py-16">
          <h2 className="text-center text-2xl md:text-3xl font-semibold tracking-tight">
            At its heart,{" "}
            <span className="text-primary">Seizing Our Humanness</span> is a
            reminder
          </h2>

          <div className="mx-auto mt-6 h-px w-24 bg-border" />

          <blockquote className="mt-6 text-center">
            <p className="mx-auto max-w-2xl text-base md:text-lg leading-relaxed text-text-dim">
              “Photography is not only light and shadow; it is memory, protest,
              and humanness.”
            </p>
          </blockquote>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="shadow-[0_12px_40px_-16px_rgba(34,178,184,.45)]"
              data-testid="button-view-prints"
            >
              <Link href="/prints">Browse prints</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              data-testid="button-contact"
            >
              <Link href="/contact">Get in touch</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
