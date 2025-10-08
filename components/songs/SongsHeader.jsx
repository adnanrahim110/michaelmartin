"use client";

import { memo } from "react";

const SongsHeader = memo(function SongsHeader() {
  return (
    <header className="flex flex-col gap-4 sm:gap-6">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-2.5 sm:px-3 py-1 text-xs text-text-dim">
          Musical Inspirations
        </div>
        <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
          Songs
        </h1>
        <p className="mt-2 max-w-none sm:max-w-2xl lg:max-w-3xl text-base sm:text-lg text-text-dim leading-relaxed">
          A curated collection of songs that inspire, motivate, and accompany
          the creative journey. These musical pieces have shaped perspectives,
          influenced artistic vision, and provided the soundtrack to countless
          moments of inspiration.
        </p>
      </div>
    </header>
  );
});

export default SongsHeader;
