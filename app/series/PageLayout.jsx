"use client";

import SeriesCard from "@/components/home/SeriesCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { series } from "@/constants";
import { ChevronDown, Filter, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

const PageLayout = () => {
  // Transform series data to match component structure
  const data = series.map((item, index) => {
    // Extract year from text (look for 4-digit year)
    const yearMatch = item.text.match(/\b(19|20)\d{2}\b/);
    const year = yearMatch ? parseInt(yearMatch[0]) : 2000 + index;

    // Extract location from text (look for location patterns)
    let location = "Unknown";
    if (item.text.includes("Atlanta")) location = "Atlanta";
    else if (item.text.includes("Hong Kong")) location = "Hong Kong";
    else if (item.text.includes("Singapore")) location = "Singapore";
    else if (item.text.includes("Manila") || item.text.includes("Philippines"))
      location = "Philippines";
    else if (item.text.includes("Miami")) location = "Miami";
    else if (item.text.includes("Laoag")) location = "Philippines";

    // Format tag for display
    const formatTag = (tag) => {
      return tag
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    };

    return {
      title: item.text.split(",")[0].replace(/"/g, ""), // Take first part as title, remove quotes
      description: item.text,
      image: Array.isArray(item.img) ? item.img[0] : item.img,
      slug: item.slug,
      tag: formatTag(item.tag),
      year: year,
      location: location,
    };
  });

  // Get unique tags from series data
  const uniqueTags = [
    ...new Set(
      series.map((item) => {
        return item.tag
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      })
    ),
  ].sort();

  const tags = ["All", ...uniqueTags];

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
                  text={featured.description}
                  img={featured.image}
                  slug={featured.slug}
                />
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
                {filtered.slice(1, 3).map((s) => (
                  <SeriesCard
                    key={s.slug}
                    tag={s.tag}
                    text={s.description}
                    img={s.image}
                    slug={s.slug}
                  />
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
              <SeriesCard
                key={s.slug}
                tag={s.tag}
                text={s.description}
                img={s.image}
                slug={s.slug}
              />
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
