"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SeriesCard({
  title,
  description,
  image,
  slug,
  href,
  tag,
  meta,
  priority,
}) {
  const to = href ?? (slug ? `/series/${slug}` : "#");
  const src = image?.startsWith("http") ? image : `/images/${image}`;

  return (
    <Link href={to} className="group relative block">
      <div className="relative rounded-2xl p-[1px] transition-transform duration-500 group-hover:scale-[1.01]">
        <div className="absolute inset-0 rounded-2xl bg-[conic-gradient(from_140deg,rgba(62,207,210,.28),rgba(32,79,89,.14)_35%,transparent_60%)] opacity-70" />
        <div className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_20px_60px_-30px_rgba(0,0,0,.65)]">
          <div className="relative aspect-[1/1]">
            <Image
              src={src}
              alt={title}
              fill
              sizes="(max-width: 1024px) 100vw, 420px"
              priority={!!priority}
              className="object-cover transition-transform duration-700 group-hover:scale-[1.065]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/20 to-transparent" />

            {tag && (
              <span className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full border border-border bg-surface/85 px-3 py-1 text-[11px] text-text-dim backdrop-blur">
                {tag}
                {meta ? (
                  <i className="not-italic opacity-60">· {meta}</i>
                ) : null}
              </span>
            )}

            <span className="pointer-events-none absolute -inset-1 translate-x-[-60%] rotate-6 bg-gradient-to-r from-white/0 via-white/8 to-white/0 opacity-0 blur-xl transition-all duration-[900ms] group-hover:translate-x-[60%] group-hover:opacity-100" />
          </div>

          <div className="absolute inset-x-3 bottom-3">
            <div className="flex items-start gap-3 rounded-xl border border-border/70 bg-surface/85 backdrop-blur px-4 py-3 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:border-primary/40 group-hover:bg-surface/90">
              <div className="min-w-0">
                <h3 className="text-base md:text-lg font-semibold tracking-tight">
                  {title}
                </h3>
                <p className="mt-1 line-clamp-2 text-[13px] text-text-dim">
                  {description}
                </p>
              </div>

              <span className="ml-auto inline-flex items-center justify-center rounded-full border border-border bg-surface/95 text-primary h-9 w-9 shrink-0 opacity-0 translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" />
        </div>
      </div>
    </Link>
  );
}
