import AboutAuthorCard from "@/components/home/AboutAuthorCard";
import AboutBookCard from "@/components/home/AboutBookCard";
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
    </>
  );
}
