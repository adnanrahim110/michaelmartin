"use client";

import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import {
  useJustifiedLayout,
  useNaturalImageSizes,
  useLightbox,
} from "@/lib/justified-layout";
import GalleryLightbox from "@/components/series/GalleryLightbox";

const GAP = 12;
const TARGET_ROW_HEIGHT = 280;
const MIN_PER_ROW = 3;
const MAX_PER_ROW = 4;

function JustifiedItem({ item, width, height, index = 0, onClick }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 120);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative block overflow-hidden rounded-xl transition-all duration-700 ease-out hover:shadow-2xl focus:outline-none ${
        isVisible
          ? "translate-y-0 scale-100 opacity-100"
          : "translate-y-8 scale-95 opacity-0"
      }`}
      style={{
        width,
        height,
        transitionDelay: isVisible ? "0ms" : `${index * 50}ms`,
      }}
    >
      <Image
        src={item.src}
        alt={item.description || item.title || ""}
        width={width}
        height={height}
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        priority={false}
      />

      <div className="pointer-events-none absolute inset-0 bg-black/0 transition group-hover:bg-black/35" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 opacity-0 p-3 text-white transition group-hover:translate-y-0 group-hover:opacity-100">
        <div className="rounded-lg bg-black/50 px-3 py-2 backdrop-blur">
          <p className="line-clamp-2 text-[13px] leading-snug">{item.title}</p>
          {item.tag && (
            <span className="mt-1 inline-block rounded-full bg-white/20 px-2 py-[2px] text-[11px]">
              {item.tag}
            </span>
          )}
        </div>
      </div>

      <span className="absolute inset-0 rounded-xl ring-0 ring-inset focus-visible:ring-2 focus-visible:ring-blue-500" />
    </button>
  );
}

export default function JustifiedGrid({ items }) {
  const preparedItems = useMemo(
    () =>
      items.map((item, idx) => ({
        ...item,
        id: item.slug,
        index: idx,
        src: `/images/series/${item.image}`,
      })),
    [items]
  );

  const sizesById = useNaturalImageSizes(preparedItems);
  const { ref: justifiedRef, rows } = useJustifiedLayout(
    preparedItems,
    sizesById,
    {
      targetRowHeight: TARGET_ROW_HEIGHT,
      gap: GAP,
      minPerRow: MIN_PER_ROW,
      maxPerRow: MAX_PER_ROW,
    }
  );

  const lightbox = useLightbox(preparedItems);

  return (
    <div ref={justifiedRef}>
      {rows.map((row, ri) => (
        <div
          key={`row-${ri}`}
          className="flex"
          style={{ gap: `${GAP}px`, marginBottom: `${GAP}px` }}
        >
          {row.items.map(({ entity, width, height }, itemIndex) => (
            <JustifiedItem
              key={entity.slug}
              item={entity}
              width={width}
              height={height}
              index={ri * MAX_PER_ROW + itemIndex}
              onClick={() => lightbox.openAt(entity.index)}
            />
          ))}
        </div>
      ))}
      {rows.length === 0 && preparedItems.length > 0 && (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-[220px] animate-pulse rounded-xl bg-neutral-200"
            />
          ))}
        </div>
      )}

      <GalleryLightbox
        current={lightbox.currentItem}
        onClose={lightbox.close}
        onPrev={lightbox.prev}
        onNext={lightbox.next}
        showArrows={preparedItems.length > 1}
      />
    </div>
  );
}



