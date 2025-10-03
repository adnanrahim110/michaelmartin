// components/about/AboutGallery.jsx
"use client";

import Image from "next/image";

export default function AboutGallery() {
  const shots = [
    { src: "/images/series/1.jpg", alt: "Hong Kong" },
    { src: "/images/series/2.jpg", alt: "Little India" },
    { src: "/images/series/3.jpg", alt: "The Recyclers" },
    { src: "/images/series/4.jpg", alt: "Facade" },
    { src: "/images/series/5.jpg", alt: "Minima" },
    { src: "/images/series/6.jpg", alt: "Abstracts" },
  ];

  return (
    <section className="bg-bg">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shots.map((s, i) => (
            <figure
              key={s.src}
              className="group relative overflow-hidden rounded-2xl border border-border bg-surface/70"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes="(max-width:1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent" />
              </div>
              <figcaption className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-lg border border-border/70 bg-surface/80 px-3 py-2 text-[11px] text-text-dim backdrop-blur">
                <span>{s.alt}</span>
                <span className="rounded-full bg-primary/15 px-2 py-0.5 text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
