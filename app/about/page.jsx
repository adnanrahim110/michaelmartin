import AboutEssays from "@/components/about/AboutEssays";
import AboutGallery from "@/components/about/AboutGallery";
import AboutHero from "@/components/about/AboutHero";
import AboutStats from "@/components/about/AboutStats";
import AboutTimeline from "@/components/about/AboutTimeline";
export const metadata = {
  title: "About Michael Martin",
};
export default function About() {
  const timeline = [
    {
      year: "1990s",
      title: "Foundations",
      text: "Study in photography and visual arts. Groundwork for a lifetime of looking.",
    },
    {
      title: "Atlanta experiments",
      text: "Gallery in Atlanta. Abstracts, early research, learning by doing.",
    },
    {
      title: "Into the streets",
      text: "Move to Singapore. From abstraction to the intimacy of street work.",
    },
    {
      title: "Teach and learn",
      text: "Adjunct at LaSalle College of the Arts. Street portraiture across Asia.",
    },
    {
      title: "Protest on the lens",
      text: "Umbrella Protests, Hong Kong. Art, politics, courage in one frame.",
    },
    {
      title: "Across Asia",
      text: "Based in Hong Kong. Cities as studio, people as subject and teacher.",
    },
    {
      title: "Interpretive shift",
      text: "Return home. Layered work holding culture, memory, and myth.",
    },
    {
      year: "Now",
      title: "Synthesis",
      text: "Street meets interpretation. Not only to portray, but to evoke.",
    },
  ];
  return (
    <main className="bg-bg">
      <AboutHero />
      <AboutTimeline items={timeline} />
      <AboutEssays />
    </main>
  );
}
