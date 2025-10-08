"use client";

import { Button } from "@/components/ui/button";
import { AMZ_LINK } from "@/constants";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutBookCard() {
  return (
    <section className="border-y border-border bg-bg">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-12 sm:py-16 md:py-24">
        <div className="grid items-center lg:grid-cols-2 gap-8 sm:gap-10">
          <div className="order-2 lg:order-1">
            <div className="mb-3 sm:mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1">
              <BookOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
              <span className="text-xs tracking-wide text-text-dim">
                The Book
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-semibold tracking-tight text-text">
              Seizing Our <span className="text-primary-600">Humanness</span>
            </h3>

            <div className="mt-4 sm:mt-5 space-y-2 leading-relaxed text-sm sm:text-base text-text-dim">
              <p>
                What happens when you point a camera at the ordinary and refuse
                to look away? Michael Martin wanders the streets of Singapore,
                Manila, Hong Kong, and beyond, gathering faces, fragments, and
                gestures that say more than words ever could.
              </p>
              <p>
                This isn’t a polished narrative. It’s uneven, layered, alive.
                From abstract beginnings to the raw pulse of street life and the
                echoes of protest, each image asks a quiet question: what does
                it mean to remain human in a world racing toward something less?
              </p>
              <p>
                The pages don’t answer. They remind. Connection. Resistance.
                Small proofs that behind the noise, we’re still here.
              </p>
            </div>

            <div className="mt-6 sm:mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="shadow-[0_12px_40px_-16px_rgba(34,178,184,.45)]"
              >
                <Link href="/book" data-testid="button-view-book">
                  View book details
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link
                  href={AMZ_LINK}
                  target="_blank"
                  rel="noopener"
                  data-testid="button-buy-book"
                >
                  Purchase book
                </Link>
              </Button>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative w-full h-[320px] sm:h-[380px] md:h-[480px] lg:h-[580px]">
              <Image
                src="/images/book.png"
                alt="Seizing Our Humanness — book cover"
                fill
                sizes="(max-width: 1024px) 100vw, 540px"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
