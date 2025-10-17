"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export function useNaturalImageSizes(items) {
  const [sizes, setSizes] = useState({});

  const itemsKey = useMemo(() => {
    if (!items || !items.length) return "";
    return items.map((item) => `${item.id || item.slug || ""}:${item.src || ""}`).join("|");
  }, [items]);

  useEffect(() => {
    if (!items || items.length === 0) {
      setSizes({});
      return;
    }

    let alive = true;

    const load = (item) =>
      new Promise((resolve) => {
        const img = new window.Image();
        img.src = item.src;
        img.decoding = "async";
        img.onload = () =>
          resolve({
            id: item.id,
            w: img.naturalWidth || 1,
            h: img.naturalHeight || 1,
          });
        img.onerror = () =>
          resolve({
            id: item.id,
            w: 3,
            h: 2,
          });
      });

    Promise.all(items.map(load)).then((res) => {
      if (!alive) return;
      const next = {};
      res.forEach(({ id, w, h }) => {
        next[id] = { w, h, ratio: w / Math.max(1, h) };
      });
      setSizes(next);
    });

    return () => {
      alive = false;
    };
  }, [itemsKey, items]);

  return sizes;
}

export function computeJustifiedRows({
  items,
  sizesById,
  containerWidth,
  targetRowHeight = 240,
  gap = 12,
  minPerRow = 2,
  maxPerRow = Infinity,
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

    const preparedItems = rowItems.map((r) => ({
      entity: r.entity,
      width: Math.max(1, Math.round(r.widthAtTarget * scale)),
      height: rowHeight,
    }));

    rows.push({ height: rowHeight, items: preparedItems });
  };

  items.forEach((entity, idx) => {
    const size = sizesById[entity.id];
    const ratio = size?.ratio || 1.5;
    const widthAtTarget = ratio * targetRowHeight;

    row.push({ entity, ratio, widthAtTarget });
    rowWidthAtTarget += widthAtTarget;

    const gapsTotal = gap * (row.length - 1);
    const filledAtTarget = rowWidthAtTarget + gapsTotal;
    const isOverflow = filledAtTarget >= innerWidth;
    const isLast = idx === items.length - 1;
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
      const prevRepacked = prev.items.map((it) => {
        const size = sizesById[it.entity.id];
        const ratio = size?.ratio || it.width / Math.max(1, it.height) || 1.5;
        return {
          entity: it.entity,
          ratio,
          widthAtTarget: ratio * targetRowHeight,
        };
      });
      const merged = [...prevRepacked, ...row];
      pushRow(merged);
    }
  }

  return rows;
}

export function useJustifiedLayout(
  items,
  sizesById,
  {
    enabled = true,
    targetRowHeight = 240,
    gap = 12,
    minPerRow = 2,
    maxPerRow = Infinity,
  } = {}
) {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  const [rows, setRows] = useState([]);

  useEffect(() => {
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

  useEffect(() => {
    if (!enabled) {
      setRows([]);
      return;
    }
    if (width <= 0) return;
    if (!items.length) {
      setRows([]);
      return;
    }

    const rowsComputed = computeJustifiedRows({
      items,
      sizesById,
      containerWidth: width,
      targetRowHeight,
      gap,
      minPerRow,
      maxPerRow,
    });

    setRows(rowsComputed);
  }, [enabled, width, items, sizesById, targetRowHeight, gap, minPerRow, maxPerRow]);

  return { ref, width, rows };
}

export function useLightbox(items) {
  const [currentIndex, setCurrentIndex] = useState(null);

  const openAt = (index) => {
    if (index < 0 || index >= items.length) return;
    setCurrentIndex(index);
  };

  const close = () => setCurrentIndex(null);

  const next = () => {
    if (currentIndex === null || !items.length) return;
    setCurrentIndex((prev) =>
      prev === null ? prev : (prev + 1) % items.length
    );
  };

  const prev = () => {
    if (currentIndex === null || !items.length) return;
    setCurrentIndex((prev) =>
      prev === null ? prev : (prev - 1 + items.length) % items.length
    );
  };

  useEffect(() => {
    if (!items.length) {
      setCurrentIndex(null);
    } else if (currentIndex !== null && currentIndex >= items.length) {
      setCurrentIndex(items.length - 1);
    }
  }, [items, currentIndex]);

  return {
    currentIndex,
    openAt,
    close,
    next,
    prev,
    currentItem:
      currentIndex === null ? null : { item: items[currentIndex], index: currentIndex },
  };
}
