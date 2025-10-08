"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

const GAP = 12;
const TARGET_ROW_HEIGHT = 280;
const MIN_PER_ROW = 3;
const MAX_PER_ROW = 4;

function useNaturalSizes(items) {
  const [sizes, setSizes] = useState({});

  const itemsKey = useMemo(() => {
    return items.map((item) => item.slug).join(",");
  }, [items]);

  useEffect(() => {
    if (!items.length) return;

    let alive = true;

    const load = (item) =>
      new Promise((resolve) => {
        const img = new window.Image();
        img.src = `/images/series/${item.image}`;
        img.decoding = "async";
        img.onload = () =>
          resolve({
            id: item.slug,
            w: img.naturalWidth || 1,
            h: img.naturalHeight || 1,
          });
        img.onerror = () =>
          resolve({
            id: item.slug,
            w: 3,
            h: 2,
          });
      });

    Promise.all(items.map(load)).then((res) => {
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
  }, [itemsKey]);

  return sizes;
}

function computeJustifiedRows({
  items,
  sizesById,
  containerWidth,
  targetRowHeight = TARGET_ROW_HEIGHT,
  gap = GAP,
  minPerRow = MIN_PER_ROW,
  maxPerRow = MAX_PER_ROW,
}) {
  if (!Array.isArray(items) || items.length === 0) return [];
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

    const rowItemsWithSize = rowItems.map((r) => ({
      item: r.item,
      width: Math.max(1, Math.round(r.widthAtTarget * scale)),
      height: rowHeight,
    }));

    rows.push({ height: rowHeight, items: rowItemsWithSize });
  };

  items.forEach((item, i) => {
    const size = sizesById[item.slug];
    const ratio = size?.ratio || 1.5;
    const widthAtTarget = ratio * targetRowHeight;

    row.push({ item, ratio, widthAtTarget });
    rowWidthAtTarget += widthAtTarget;

    const gapsTotal = gap * (row.length - 1);
    const filledAtTarget = rowWidthAtTarget + gapsTotal;
    const isOverflow = filledAtTarget >= innerWidth;
    const isLast = i === items.length - 1;
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
        const size = sizesById[it.item.slug];
        const ratio = size?.ratio || it.width / Math.max(1, it.height) || 1.5;
        return {
          item: it.item,
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

function useJustifiedLayout(items, sizesById) {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  const [rows, setRows] = useState([]);

  const itemsKey = useMemo(() => {
    return items.map((item) => item.slug).join(",");
  }, [items]);

  const sizesKey = useMemo(() => {
    return JSON.stringify(sizesById);
  }, [sizesById]);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (width <= 0) return;
    if (!items.length) {
      setRows([]);
      return;
    }
    const rowsComputed = computeJustifiedRows({
      items,
      sizesById,
      containerWidth: width,
      targetRowHeight: TARGET_ROW_HEIGHT,
      gap: GAP,
      minPerRow: MIN_PER_ROW,
      maxPerRow: MAX_PER_ROW,
    });
    setRows(rowsComputed);
  }, [width, itemsKey, sizesKey]);

  return { ref, width, rows };
}

function JustifiedItem({ item, width, height, index = 0 }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 120);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <Link
      href={`/series/${item.slug}`}
      className={`group relative block overflow-hidden rounded-xl transition-all duration-700 ease-out hover:shadow-2xl ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-8 scale-90"
      }`}
      style={{
        width,
        height,
        transitionDelay: isVisible ? "0ms" : `${index * 50}ms`,
      }}
    >
      <Image
        src={`/images/series/${item.image}`}
        alt={item.description}
        width={width}
        height={height}
        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        priority={false}
      />

      <div className="pointer-events-none absolute inset-0 bg-black/0 transition group-hover:bg-black/35" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 opacity-0 p-3 text-white transition group-hover:translate-y-0 group-hover:opacity-100">
        <div className="rounded-lg bg-black/50 px-3 py-2 backdrop-blur">
          <p className="text-[13px] leading-snug line-clamp-2">{item.title}</p>
          <span className="mt-1 inline-block rounded-full bg-white/20 px-2 py-[2px] text-[11px]">
            {item.tag}
          </span>
        </div>
      </div>

      <span className="absolute inset-0 ring-inset ring-0 focus-within:ring-2 focus-within:ring-blue-500 rounded-xl" />
    </Link>
  );
}

export default function JustifiedGrid({ items }) {
  const sizesById = useNaturalSizes(items);
  const { ref: justifiedRef, rows } = useJustifiedLayout(items, sizesById);

  return (
    <div ref={justifiedRef}>
      {rows.map((row, ri) => (
        <div
          key={`row-${ri}`}
          className="flex"
          style={{ gap: `${GAP}px`, marginBottom: `${GAP}px` }}
        >
          {row.items.map(({ item, width, height }, itemIndex) => (
            <JustifiedItem
              key={item.slug}
              item={item}
              width={width}
              height={height}
              index={ri * MAX_PER_ROW + itemIndex}
            />
          ))}
        </div>
      ))}
      {rows.length === 0 && items.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-[220px] bg-neutral-200 animate-pulse rounded-xl"
            />
          ))}
        </div>
      )}
    </div>
  );
}
