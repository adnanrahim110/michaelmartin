// components/about/AboutEssays.jsx
"use client";

export default function AboutEssays() {
  return (
    <section className="bg-bg">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
          <div className="relative rounded-3xl p-[1px] bg-[conic-gradient(at_70%_30%,rgba(62,207,210,.25),transparent_40%)]">
            <div className="rounded-3xl border border-border bg-surface/80 p-6">
              <h3 className="text-xl font-semibold tracking-tight">
                Stories etched in light
              </h3>
              <p className="mt-3 text-base leading-relaxed text-text-dim">
                From abstract gestures to raw human encounters. Little India at
                dusk. Mong Kok after midnight. Places where recyclers, vendors,
                and children carry the day forward.
              </p>
              <p className="mt-3 text-base leading-relaxed text-text-dim">
                The interpretive work admits every frame is a choice. A way to
                remember together and see what we miss when life moves fast.
              </p>
              <blockquote className="mt-5 rounded-xl border border-border bg-surface/70 px-5 py-4 text-base italic">
                The photograph is less proof than promise.
              </blockquote>
            </div>
          </div>

          <div className="grid gap-6">
            <article className="rounded-2xl border border-border bg-surface/75 p-6">
              <h4 className="text-lg font-semibold tracking-tight">
                Practice and approach
              </h4>
              <p className="mt-3 text-base leading-relaxed text-text-dim">
                Work sits between intimate and political. Portraits without
                pose. Streets without spectacle. Patience over perfection.
              </p>
            </article>
            <article className="rounded-2xl border border-border bg-surface/75 p-6">
              <h4 className="text-lg font-semibold tracking-tight">
                Materials and display
              </h4>
              <p className="mt-3 text-base leading-relaxed text-text-dim">
                Prints on museum stock with archival inks. Editions kept small.
                Sequencing guided by lived context, not neat categories.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
