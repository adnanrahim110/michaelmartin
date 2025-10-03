// components/about/AboutPress.jsx
"use client";

import { FileText } from "lucide-react";

export default function AboutPress() {
  return (
    <section className="bg-bg">
      <div className="mx-auto max-w-7xl px-6 pb-4 pt-12">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface/80">
          <div className="absolute inset-0 bg-[radial-gradient(85%_70%_at_80%_30%,rgba(33,92,101,.18),transparent)]" />
          <div className="relative grid gap-6 p-6 md:grid-cols-[1.2fr_.8fr] md:p-10">
            <div>
              <h3 className="text-xl font-semibold tracking-tight">
                Press and media
              </h3>
              <p className="mt-1 text-sm text-text-dim">
                High-res images, full bio, exhibition history.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/12 px-4 py-2 text-sm text-primary"
                >
                  <FileText className="h-4 w-4" />
                  Download press kit
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm"
                >
                  Request interview
                </a>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-surface/70 p-4">
                <div className="text-sm font-medium">Contact</div>
                <p className="mt-1 text-sm text-text-dim">
                  press@michaelmartin.photo
                </p>
              </div>
              <div className="rounded-xl border border-border bg-surface/70 p-4">
                <div className="text-sm font-medium">Availability</div>
                <p className="mt-1 text-sm text-text-dim">
                  Interviews, panels, workshops
                </p>
              </div>
            </div>
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/5"
          />
        </div>
      </div>
    </section>
  );
}
