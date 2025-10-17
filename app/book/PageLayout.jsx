"use client";
import { Button } from "@/components/ui/button";
import { BookOpen, Mail } from "lucide-react";
import Image from "next/image";
const PageLayout = () => {
  const sections = [
    {
      title: "Human Echoes",
      description:
        "“What remains after the image fades.” Reflections and fragments that point past the frame.",
    },
    {
      title: "Shadows and Silence",
      description:
        "“Between presence and absence lies meaning.” Notes that hold the quiet weight of a shared story.",
    },
    {
      title: "The Untold Layer",
      description:
        "“Beneath the photograph lives another truth.” Writing that opens what images alone cannot say.",
    },
    {
      title: "Afterthoughts of Humanity",
      description:
        "“Closing words for an unfinished story.” Reminders that humanness moves, never fixed.",
    },
  ];
  const spreads = [
    {
      src: "/images/hero/1.jpg",
      caption: "Walker in the rain, Atlanta, Georgia, 2007",
    },
    { src: "/images/hero/2.jpg", caption: "Krog Tunnel I, 2006, “Hope”" },
    {
      src: "/images/hero/3.jpg",
      caption: "South Beach Facade, Miami, rework 2010, #2",
    },
  ];
  return (
    <main className="bg-bg">
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-5 md:pb-18 md:pt-0">
          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 text-xs text-text-dim">
                The Book
              </div>
              <h1 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight">
                Seeing Humanness{" "}
                <span className="text-primary">Through the Lens</span>
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-text-dim">
                Seizing Our Humanness is not only photographs. It is moments. It
                is how art, politics, and ordinary life meet in the open. Over
                two decades the work crosses streets in Asia, Europe, and the
                US, searching for humanness in unguarded form.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg">Buy the book</Button>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/images/book.png"
                  alt="Seizing Our Humanness — cover"
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-contain p-4 md:p-6"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-12 md:py-18">
        <div className="grid gap-8 md:grid-cols-2">
          {sections.map((s, i) => (
            <article
              key={i}
              className="rounded-2xl border border-border bg-surface/70 p-6 transition-colors hover:bg-surface/80"
            >
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
                {s.title}
              </h2>
              <p className="mt-2 text-base leading-relaxed text-text-dim">
                {s.description}
              </p>
            </article>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-12 md:py-18">
        <h3 className="mb-8 text-center text-2xl font-semibold tracking-tight">
          A glimpse within
        </h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {spreads.map((sp, i) => (
            <figure key={i} className="group">
              <div className="relative overflow-hidden rounded-xl border border-border bg-surface/60">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={sp.src}
                    alt={sp.caption}
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/80 via-bg/20 to-transparent" />
              </div>
              <figcaption className="mt-2 text-center text-sm text-text-dim">
                {sp.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      <section className="px-6 pb-36 pt-14 relative mx-auto max-w-7xl">
        <blockquote className="text-[1.9rem] font-abril leading-tight sm:text-[2.1rem] lg:text-[50px] relative border-[3px] border-primary-600 p-12 rounded-[20px] after:absolute after:border-[3px] after:border-primary-600 after:size-20 after:-bottom-20 after:left-14 after:rounded-[0_100%_0_0] after:border-l-0 after:border-b-0 z-[3] before:absolute before:w-28 before:border-[6px] before:border-bg before:-bottom-[3px] before:left-14 before:z-[0]">
          <span className="text-primary-500">Every series</span>
          &nbsp;begins on the street. It continues in the{" "}
          <span className="text-primary-500">connections</span> it makes.
          Be&nbsp;
          <span className="text-primary-500">part of that story</span>.
        </blockquote>
      </section>
    </main>
  );
};
export default PageLayout;
