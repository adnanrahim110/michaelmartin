"use client";
import { series } from "@/constants";
import Image from "next/image";
import React from "react";
import GalleryLightbox from "@/components/series/GalleryLightbox";
import {
  useJustifiedLayout,
  useNaturalImageSizes,
  useLightbox,
} from "@/lib/justified-layout";

const GAP = 12;
const TARGET_ROW_HEIGHT_LG = 260;
const MIN_PER_ROW_LG = 3;
const MAX_PER_ROW_LG = 3;

function toTiles(list) {
  return list.slice(0, 10).map((item, idx) => {
    const cover =
      Array.isArray(item.img) && item.img.length > 0 ? item.img[0] : item.img;
    return {
      id: `${item.slug}-${idx}`,
      index: idx,
      src: `/images/series/${cover}`,
      alt: item.text,
      text: item.text,
      tag: item.tag,
      slug: item.slug,
    };
  });
}

export default function SeriesSec() {
  const tiles = React.useMemo(() => toTiles(series), []);
  const sizesById = useNaturalImageSizes(tiles);
  const lightbox = useLightbox(tiles);

  const [isLg, setIsLg] = React.useState(false);
  React.useEffect(() => {
    const check = () =>
      setIsLg(window.matchMedia("(min-width: 1024px)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { ref, rows } = useJustifiedLayout(tiles, sizesById, {
    enabled: isLg,
    targetRowHeight: TARGET_ROW_HEIGHT_LG,
    gap: GAP,
    minPerRow: MIN_PER_ROW_LG,
    maxPerRow: MAX_PER_ROW_LG,
  });

  return (
    <section className="relative bg-bg">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-12 sm:py-16 md:py-24">
        <div ref={ref} className="hidden lg:block">
          {rows.map((row, ri) => (
            <div
              key={`row-${ri}`}
              className="flex"
              style={{ gap: `${GAP}px`, marginBottom: `${GAP}px` }}
            >
              {row.items.map(({ entity, width, height }) => (
                <Tile
                  key={entity.id}
                  tile={entity}
                  width={width}
                  height={height}
                  onClick={() => lightbox.openAt(entity.index)}
                />
              ))}
            </div>
          ))}
          {rows.length === 0 && (
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[220px] animate-pulse rounded-xl bg-neutral-200"
                />
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 lg:hidden">
          {tiles.map((tile) => (
            <Tile
              key={tile.id}
              tile={tile}
              width="100%"
              height={undefined}
              onClick={() => lightbox.openAt(tile.index)}
            />
          ))}
        </div>
      </div>

      <GalleryLightbox
        current={lightbox.currentItem}
        onClose={lightbox.close}
        onPrev={lightbox.prev}
        onNext={lightbox.next}
        showArrows={tiles.length > 1}
      />
    </section>
  );
}

function Tile({ tile, width, height, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative block overflow-hidden rounded-xl focus:outline-none"
      style={
        typeof width === "number"
          ? { width, height }
          : width === "100%"
          ? { width: "100%" }
          : {}
      }
    >
      <Image
        src={tile.src}
        alt={tile.alt}
        fill={typeof width !== "number"}
        width={typeof width === "number" ? width : undefined}
        height={typeof height === "number" ? height : undefined}
        sizes={
          typeof width === "number"
            ? undefined
            : "(max-width: 640px) 100vw, 50vw"
        }
        className={
          typeof width === "number"
            ? "object-cover"
            : "h-auto w-full object-cover"
        }
        priority={false}
      />
      <div className="pointer-events-none absolute inset-0 bg-black/0 transition group-hover:bg-black/35" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 opacity-0 p-2 sm:p-3 text-white transition group-hover:translate-y-0 group-hover:opacity-100">
        <div className="rounded-lg bg-black/50 px-2.5 py-1.5 sm:px-3 sm:py-2 backdrop-blur">
          <p className="text-xs leading-snug sm:text-[13px]">{tile.text}</p>
          <span className="mt-1 inline-block rounded-full bg-white/20 px-1.5 py-[2px] text-[10px] sm:px-2 sm:text-[11px]">
            {tile.tag}
          </span>
        </div>
      </div>
      <span className="absolute inset-0 rounded-xl ring-0 ring-inset focus-visible:ring-2 focus-visible:ring-blue-500" />
    </button>
  );
}

