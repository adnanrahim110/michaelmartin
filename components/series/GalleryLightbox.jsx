"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function GalleryLightbox({
  current,
  onClose,
  onPrev,
  onNext,
  showArrows = true,
}) {
  const [mounted, setMounted] = useState(false);
  const item = current?.item;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!item) return;

    const handleKey = (event) => {
      if (event.key === "Escape") onClose?.();
      if (event.key === "ArrowRight") onNext?.();
      if (event.key === "ArrowLeft") onPrev?.();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [item, onClose, onNext, onPrev]);

  if (!mounted || !item) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm">
      <button
        type="button"
        onClick={onClose}
        className="absolute right-6 top-6 rounded-full border border-white/20 bg-white/10 p-2 text-white transition hover:bg-white/20"
        aria-label="Close preview"
      >
        <X className="h-5 w-5" />
      </button>

      {showArrows && (
        <>
          <button
            type="button"
            onClick={onPrev}
            className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 text-white transition hover:bg-white/20"
            aria-label="Previous"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={onNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 text-white transition hover:bg-white/20"
            aria-label="Next"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      <div className="mx-4 flex w-full max-w-6xl flex-col items-center gap-6 text-center text-white">
        <div className="relative h-[55vh] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-2xl md:h-[70vh]">
          <Image
            src={item.src}
            alt={item.alt || item.title || ""}
            fill
            sizes="(max-width: 768px) 90vw, 60vw"
            className="h-full w-full object-contain"
            priority
          />
        </div>
        <div className="space-y-2">
          {(item.text || item.title) && (
            <p className="text-lg font-medium">{item.text || item.title}</p>
          )}
          {item.tag && (
            <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs uppercase tracking-wide">
              {item.tag}
            </span>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
