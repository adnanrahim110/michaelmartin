"use client";
import { series } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
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
      src: `/images/series/${cover}`,
      alt: item.text,
      text: item.text,
      tag: item.tag,
      slug: item.slug,
    };
  });
}
function useNaturalSizes(tiles) {
  const [sizes, setSizes] = React.useState({});
  React.useEffect(() => {
    let alive = true;
    const load = (tile) =>
      new Promise((resolve) => {
        const img = new window.Image();
        img.src = tile.src;
        img.decoding = "async";
        img.onload = () =>
          resolve({
            id: tile.id,
            w: img.naturalWidth || 1,
            h: img.naturalHeight || 1,
          });
        img.onerror = () =>
          resolve({
            id: tile.id,
            w: 3,
            h: 2,
          });
      });
    Promise.all(tiles.map(load)).then((res) => {
      if (!alive) return;
      const next = {};
      res.forEach(({ id, w, h }) => {
        next[id] = { w, h, ratio: w / h };
      });
      setSizes(next);
    });
    return () => {
      alive = false;
    };
  }, [tiles]);
  return sizes;
}
function computeJustifiedRows({
  tiles,
  sizesById,
  containerWidth,
  targetRowHeight = TARGET_ROW_HEIGHT_LG,
  gap = GAP,
  minPerRow = MIN_PER_ROW_LG,
  maxPerRow = MAX_PER_ROW_LG,
}) {
  if (!Array.isArray(tiles) || tiles.length === 0) return [];
  if (!containerWidth || containerWidth <= 0) return [];
  const rows = [];
  let row = [];
  let rowWidthAtTarget = 0;
  const innerWidth = Math.max(1, containerWidth);
  const pushRow = (rowItems) => {
    const gapsTotal = gap * Math.max(0, rowItems.length - 1);
    const widthAtTarget = rowItems.reduce((acc, r) => acc + r.widthAtTarget, 0);
    const denom = Math.max(1, widthAtTarget);
    const scale = Math.max(0.01, (innerWidth - gapsTotal) / denom);
    const rowHeight = Math.max(1, Math.round(targetRowHeight * scale));
    const items = rowItems.map((r) => ({
      tile: r.tile,
      width: Math.max(1, Math.round(r.widthAtTarget * scale)),
      height: rowHeight,
    }));
    rows.push({ height: rowHeight, items });
  };
  tiles.forEach((tile, i) => {
    const size = sizesById[tile.id];
    const ratio = size?.ratio || 1.5;
    const widthAtTarget = ratio * targetRowHeight;
    row.push({ tile, ratio, widthAtTarget });
    rowWidthAtTarget += widthAtTarget;
    const gapsTotal = gap * (row.length - 1);
    const filledAtTarget = rowWidthAtTarget + gapsTotal;
    const isOverflow = filledAtTarget >= innerWidth;
    const isLast = i === tiles.length - 1;
    const isMaxReached = row.length >= maxPerRow;
    if (
      (isOverflow && row.length >= minPerRow) ||
      (isLast && row.length >= minPerRow) ||
      isMaxReached
    ) {
      pushRow(row);
      row = [];
      rowWidthAtTarget = 0;
    }
  });
  if (row.length > 0) {
    if (rows.length === 0) {
      pushRow(row);
    } else {
      const prev = rows.pop();
      const prevPacked = prev.items.map((it) => {
        const size = sizesById[it.tile.id];
        const ratio = size?.ratio || it.width / Math.max(1, it.height) || 1.5;
        return {
          tile: it.tile,
          ratio,
          widthAtTarget: ratio * targetRowHeight,
        };
      });
      const merged = [...prevPacked, ...row];
      pushRow(merged);
    }
  }
  return rows;
}
function useJustifiedLayout(tiles, sizesById, enabled) {
  const ref = React.useRef(null);
  const [width, setWidth] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  React.useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = Math.round(entry.contentRect.width);
        setWidth(w);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [enabled]);
  React.useEffect(() => {
    if (!enabled) {
      setRows([]);
      return;
    }
    if (width <= 0) return;
    if (!tiles.length) {
      setRows([]);
      return;
    }
    const rowsComputed = computeJustifiedRows({
      tiles,
      sizesById,
      containerWidth: width,
      targetRowHeight: TARGET_ROW_HEIGHT_LG,
      gap: GAP,
      minPerRow: MIN_PER_ROW_LG,
      maxPerRow: MAX_PER_ROW_LG,
    });
    setRows(rowsComputed);
  }, [enabled, width, tiles, sizesById]);
  return { ref, width, rows };
}
export default function SeriesSec() {
  const tiles = React.useMemo(() => toTiles(series), []);
  const sizesById = useNaturalSizes(tiles);
  const [isLg, setIsLg] = React.useState(false);
  React.useEffect(() => {
    const check = () =>
      setIsLg(window.matchMedia("(min-width: 1024px)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  const { ref, rows } = useJustifiedLayout(tiles, sizesById, isLg);
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
              {row.items.map(({ tile, width, height }) => (
                <Tile key={tile.id} tile={tile} width={width} height={height} />
              ))}
            </div>
          ))}
          {rows.length === 0 && (
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[220px] bg-neutral-200 animate-pulse rounded-xl"
                />
              ))}
            </div>
          )}
        </div>
        <div className="grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-2 lg:hidden">
          {tiles.map((tile) => (
            <Tile key={tile.id} tile={tile} width="100%" height={undefined} />
          ))}
        </div>
      </div>
    </section>
  );
}
function Tile({ tile, width, height }) {
  return (
    <Link
      href={`/series/${tile.slug}`}
      className="group relative block overflow-hidden rounded-xl"
      style={typeof width === "number" ? { width, height } : {}}
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
            : "w-full h-auto object-cover"
        }
        priority={false}
      />
      <div className="pointer-events-none absolute inset-0 bg-black/0 transition group-hover:bg-black/35" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 opacity-0 p-2 sm:p-3 text-white transition group-hover:translate-y-0 group-hover:opacity-100">
        <div className="rounded-lg bg-black/50 px-2.5 sm:px-3 py-1.5 sm:py-2 backdrop-blur">
          <p className="text-xs sm:text-[13px] leading-snug">{tile.text}</p>
          <span className="mt-1 inline-block rounded-full bg-white/20 px-1.5 sm:px-2 py-[2px] text-[10px] sm:text-[11px]">
            {tile.tag}
          </span>
        </div>
      </div>
      <span className="absolute inset-0 ring-inset ring-0 focus-within:ring-2 focus-within:ring-blue-500 rounded-xl" />
    </Link>
  );
}
