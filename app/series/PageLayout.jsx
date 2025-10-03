"use client";

import SeriesCard from "@/components/home/SeriesCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, Filter, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

const PageLayout = () => {
  const recyclers = "series/1.jpg";
  const littleIndia = "series/2.jpg";
  const umbrella = "series/3.jpg";
  const facades = "series/4.jpg";
  const minima = "series/5.jpg";
  const abstracts = "series/6.jpg";

  const data = [
    {
      title: "The Recyclers",
      description:
        "Routes at dawn. Corrugated stacked and folded. Hands that keep a city going.",
      image: recyclers,
      slug: "recyclers",
      tag: "Documentary",
      year: 2016,
      location: "Manila",
    },
    {
      title: "Little India Festivals",
      description:
        "Color, incense, and devotion. Singapore's cultural heart in celebration.",
      image: littleIndia,
      slug: "little-india",
      tag: "Culture",
      year: 2019,
      location: "Singapore",
    },
    {
      title: "Umbrella Protests, Hong Kong",
      description:
        "Mong Kok, 2014. Children in uniforms. A future at stake. A city asking to be heard.",
      image: umbrella,
      slug: "umbrella-protests",
      tag: "Protest",
      year: 2014,
      location: "Hong Kong",
    },
    {
      title: "Blue Man",
      description: "Mystery in monotone. A recurring face in cyan.",
      image: facades,
      slug: "blue-man",
      tag: "Portrait",
      year: 2018,
      location: "Hong Kong",
    },
    {
      title: "Culmination",
      description: "Where the street work meets interpretation. The synthesis.",
      image: umbrella,
      slug: "culmination",
      tag: "Synthesis",
      year: 2021,
      location: "Atlanta",
    },
    {
      title: "Disco Shirt",
      description: "Joy in the mundane. Fashion on the street.",
      image: littleIndia,
      slug: "disco-shirt",
      tag: "Style",
      year: 2017,
      location: "Singapore",
    },
    {
      title: "Facades & Scapes",
      description:
        "Urban architecture as witness to the street. Concrete testimonies.",
      image: facades,
      slug: "facades",
      tag: "Abstract",
      year: 2010,
      location: "Miami",
    },
    {
      title: "Minima",
      description: "Essential moments. Nothing more. Space and silence.",
      image: minima,
      slug: "minima",
      tag: "Minimal",
      year: 2022,
      location: "Singapore",
    },
    {
      title: "Earlier Abstracts",
      description:
        "Before the street. Light, form, and the search for meaning.",
      image: abstracts,
      slug: "abstracts",
      tag: "Origins",
      year: 2006,
      location: "Atlanta",
    },
  ];

  const tags = [
    "All",
    "Documentary",
    "Culture",
    "Protest",
    "Portrait",
    "Style",
    "Abstract",
    "Minimal",
    "Synthesis",
    "Origins",
  ];

  const [q, setQ] = useState("");
  const [tag, setTag] = useState("All");
  const [sort, setSort] = useState("recent");
  const [visible, setVisible] = useState(9);

  const filtered = useMemo(() => {
    let list = [...data];
    if (tag !== "All") list = list.filter((i) => i.tag === tag);
    if (q.trim()) {
      const s = q.toLowerCase();
      list = list.filter(
        (i) =>
          i.title.toLowerCase().includes(s) ||
          i.description.toLowerCase().includes(s) ||
          i.location.toLowerCase().includes(s)
      );
    }
    if (sort === "recent") list.sort((a, b) => b.year - a.year);
    if (sort === "alpha") list.sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [data, tag, q, sort]);

  const featured = filtered[0];
  const rest = filtered.slice(1, visible);

  return (
    <main className="bg-bg">
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 pt-10 pb-8 md:pt-16 md:pb-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 text-xs text-text-dim">
                Collections
              </div>
              <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight">
                Series
              </h1>
              <p className="mt-2 max-w-3xl text-lg text-text-dim">
                Every series begins on the street and continues in the
                connections it makes. Browse the work and follow the throughline
                of humanness.
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

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {tags.map((t) => {
              const active = tag === t;
              return (
                <button
                  key={t}
                  onClick={() => {
                    setTag(t);
                    setVisible(9);
                  }}
                  className={[
                    "rounded-full border px-3 py-1.5 text-xs transition-colors",
                    active
                      ? "border-primary/60 bg-primary/15 text-primary"
                      : "border-border bg-surface/70 text-text-dim hover:bg-muted/40",
                  ].join(" ")}
                >
                  {t}
                </button>
              );
            })}

            <div className="ml-auto inline-flex items-center gap-2 text-xs text-text-dim">
              <Filter className="h-4 w-4" />
              <label className="sr-only" htmlFor="sort">
                Sort
              </label>
              <div className="relative">
                <select
                  id="sort"
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value);
                    setVisible(9);
                  }}
                  className="appearance-none rounded-full border border-border bg-surface/70 px-3 py-1.5 pr-7 text-xs text-text outline-none"
                >
                  <option value="recent">Most recent</option>
                  <option value="alpha">A to Z</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-text-dim" />
              </div>
            </div>
          </div>

          {featured && (
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <SeriesCard
                  priority
                  tag={featured.tag}
                  title={featured.title}
                  description={featured.description}
                  image={featured.image}
                  slug={featured.slug}
                />
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
                {filtered.slice(1, 3).map((s) => (
                  <SeriesCard key={s.slug} tag={s.tag} {...s} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 md:py-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
            All collections
          </h2>
          <Link
            href="/prints"
            className="text-sm text-primary hover:text-primary-400 transition-colors"
          >
            Browse prints
          </Link>
        </div>

        {rest.length === 0 ? (
          <div className="rounded-xl border border-border bg-surface/70 p-8 text-center text-sm text-text-dim">
            Nothing matched your filters. Try a different tag or search term.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((s) => (
              <SeriesCard key={s.slug} tag={s.tag} {...s} />
            ))}
          </div>
        )}

        {visible < filtered.length && (
          <div className="mt-10 flex justify-center">
            <Button
              variant="outline"
              onClick={() => setVisible((v) => v + 6)}
              className="min-w-[180px]"
            >
              Load more
            </Button>
          </div>
        )}
      </section>
    </main>
  );
};

export default PageLayout;
