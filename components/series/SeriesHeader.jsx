"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SeriesHeader({ q, setQ, setVisible }) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 text-xs text-text-dim">
          Collections
        </div>
        <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight">
          Series
        </h1>
        <p className="mt-2 max-w-3xl text-lg text-text-dim">
          Every series begins on the street and continues in the connections it
          makes. Browse the work and follow the throughline of humanness.
        </p>
      </div>

      <div className="w-full max-w-xl">
        <Input
          placeholder="Search title, place, or theme"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setVisible(9);
          }}
          startAdornment={<Search className="h-4 w-4" />}
        />
      </div>
    </div>
  );
}
