"use client";

import { useMemo } from "react";
import GalleryLightbox from "@/components/series/GalleryLightbox";
import SeriesCard from "@/components/home/SeriesCard";
import { useLightbox } from "@/lib/justified-layout";

export default function FeaturedSection({ filtered }) {
  const items = useMemo(
    () =>
      filtered.map((item, index) => ({
        id: `${item.slug}-${index}`,
        index,
        src: `/images/series/${item.image}`,
        title: item.title || item.text || item.description,
        text: item.description,
        tag: item.tag,
        slug: item.slug,
      })),
    [filtered]
  );

  const lightbox = useLightbox(items);

  if (!items.length) return null;

  const featured = filtered[0];

  return (
    <>
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SeriesCard
            priority
            tag={featured.tag}
            text={featured.description}
            img={featured.image}
            slug={featured.slug}
            onClick={() => lightbox.openAt(0)}
          />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
          {filtered.slice(1, 3).map((s, idx) => {
            const index = idx + 1;
            return (
              <SeriesCard
                key={s.slug}
                tag={s.tag}
                text={s.description}
                img={s.image}
                slug={s.slug}
                onClick={() => lightbox.openAt(index)}
              />
            );
          })}
        </div>
      </div>
      <GalleryLightbox
        current={lightbox.currentItem}
        onClose={lightbox.close}
        onPrev={lightbox.prev}
        onNext={lightbox.next}
        showArrows={items.length > 1}
      />
    </>
  );
}
