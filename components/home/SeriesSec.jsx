import SeriesCard from "./SeriesCard";

const selectedSeries = [
  {
    title: "The Recyclers",
    description: "Routes at dawn...",
    image: "cardboard.png",
    slug: "recyclers",
    tag: "Documentary",
  },
  {
    title: "Little India Festivals",
    description: "Color, celebration...",
    image: "festival.png",
    slug: "little-india",
    tag: "Culture",
  },
  {
    title: "Umbrella Protests",
    description: "Mong Kok, 2014...",
    image: "hongkong.png",
    slug: "umbrella-protests",
    tag: "Protest",
  },
  {
    title: "Two Meilings",
    description: "Parallel lives...",
    image: "women.png",
    slug: "two-meilings",
    tag: "Portrait",
  },
  {
    title: "Disco Shirt",
    description: "Fashion, character...",
    image: "man.png",
    slug: "disco-shirt",
    tag: "Style",
  },
  {
    title: "Facades & Scapes",
    description: "Geometric patterns...",
    image: "building.png",
    slug: "facades",
    tag: "Abstract",
  },
];

export default function SeriesSec() {
  return (
    <section className="relative bg-bg">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {selectedSeries.map((s, i) => (
            <SeriesCard key={s.title} priority={i < 3} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
