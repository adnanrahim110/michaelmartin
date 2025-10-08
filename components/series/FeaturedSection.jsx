"use client";

import SeriesCard from "@/components/home/SeriesCard";

export default function FeaturedSection({ filtered }) {
  if (!filtered[0]) return null;

  const featured = filtered[0];

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <SeriesCard
          priority
          tag={featured.tag}
          text={featured.description}
          img={featured.image}
          slug={featured.slug}
        />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
        {filtered.slice(1, 3).map((s) => (
          <SeriesCard
            key={s.slug}
            tag={s.tag}
            text={s.description}
            img={s.image}
            slug={s.slug}
          />
        ))}
      </div>
    </div>
  );
}
