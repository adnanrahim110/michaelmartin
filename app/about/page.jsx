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
      year: "2000–2008",
      title: "Atlanta experiments",
      text: "Gallery in Atlanta. Abstracts, early research, learning by doing.",
    },
    {
      year: "2008",
      title: "Into the streets",
      text: "Move to Singapore. From abstraction to the intimacy of street work.",
    },
    {
      year: "2010–2014",
      title: "Teach and learn",
      text: "Adjunct at LaSalle College of the Arts. Street portraiture across Asia.",
    },
    {
      year: "2014",
      title: "Protest on the lens",
      text: "Umbrella Protests, Hong Kong. Art, politics, courage in one frame.",
    },
    {
      year: "2014–2018",
      title: "Across Asia",
      text: "Based in Hong Kong. Cities as studio, people as subject and teacher.",
    },
    {
      year: "2018",
      title: "Interpretive shift",
      text: "Return home. Layered work holding culture, memory, and myth.",
    },
    {
      year: "2020–Now",
      title: "Synthesis",
      text: "Street meets interpretation. Not only to portray, but to evoke.",
    },
  ];

  return (
    <main className="bg-bg">
      <AboutHero />
      {/* <AboutStats /> */}
      <AboutTimeline items={timeline} />
      <AboutEssays />
      <AboutGallery />
    </main>
  );
}
