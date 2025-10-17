"use client";

import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import Link from "next/link";

export default function AboutAuthorCard() {
  return (
    <section className="bg-bg">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-12 sm:py-16 md:py-24">
        <div className="grid items-center gap-8 sm:gap-10 lg:gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div className="relative">
            <div className="relative rounded-2xl border border-border bg-surface/60 backdrop-blur">
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" />
              <img
                src="/images/author.png"
                alt="Michael Martin"
                className="h-[400px] sm:h-[480px] lg:h-[520px] w-full rounded-2xl object-cover"
              />
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(to_top,rgba(11,15,18,.85),transparent_55%)]" />
            </div>
          </div>

          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1">
              <Camera className="h-4 w-4 text-primary" />
              <span className="text-xs tracking-wide text-text-dim">
                About the Author
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-6xl font-semibold tracking-tight text-text">
              Michael Martin
            </h2>

            <p className="mt-4 text-base leading-relaxed text-text-dim">
              Photographer, writer, and close reader of the human condition.
              Michael’s work reaches past documentation to what lingers our
              shared humanness. From the Umbrella Protests in Hong Kong to
              different Manila barangays,, his photographs show politics, street
              life, and quiet resilience colliding in frames that evoke more
              than they describe.
            </p>

            <p className="mt-4 text-base leading-relaxed text-text-dim">
              An adjunct lecturer at LaSalle College of the Arts and former
              gallery owner in Atlanta, Michael’s path moves from early
              abstractions to intimate street portraiture. Light and shadow are
              the tools. Truth, justice, and connection are the aim.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                asChild
                variant="primary"
                size="lg"
                className="shadow-[0_12px_40px_-16px_rgba(34,178,184,.45)]"
              >
                <Link href="/about" data-testid="button-about-author">
                  Read full biography
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/series">Explore the series</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
