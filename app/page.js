import AboutAuthorCard from "@/components/home/AboutAuthorCard";
import AboutBookCard from "@/components/home/AboutBookCard";
import AudioToggle from "@/components/home/AudioToggle";
import Cta from "@/components/home/Cta";
import HeroSlideshow from "@/components/home/HeroSlideshow";
import SeriesSec from "@/components/home/SeriesSec";

export const metadata = {
  title: "Home | Michael Martin",
};

export default function Home() {
  return (
    <>
      <HeroSlideshow />
      <AboutAuthorCard />
      <AboutBookCard />
      <SeriesSec />
      <Cta />
      <AudioToggle src="/audio/ambient.mp3" initialPlaying={false} loop />
    </>
  );
}
