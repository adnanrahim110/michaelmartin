import { series } from "@/constants";
import SeriesCard from "./SeriesCard";

export default function SeriesSec() {
  return (
    <section className="relative bg-bg">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {series
            .filter((sr) => !Array.isArray(sr.img))
            .slice(0, 6)
            .map((s, i) => (
              <SeriesCard key={i} priority={i < 3} {...s} />
            ))}
        </div>
      </div>
    </section>
  );
}
