"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const TEXT_SLIDES = [
  <>
    Moments vanish.
    <br />
    Humanness remains.
  </>,
  <>
    Through shadows and light,
    <br />
    we see ourselves.
  </>,
  <>
    Protests, markets,
    <br />
    alleys tell unguarded stories.
  </>,
  <>
    The street remembers
    <br />
    what we forget.
  </>,
  <>
    Abstract or real,
    <br />
    every frame is us.
  </>,
  <>
    Technology divides.
    <br />
    Faces reconnect.
  </>,
];

const DURATION_MS = 5000;

export default function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const progressRef = useRef(null);
  const swiperRef = useRef(null);

  const images = useMemo(
    () =>
      Array.from(
        { length: TEXT_SLIDES.length },
        (_, i) => `/images/hero/${i + 1}.jpg`
      ),
    []
  );

  return (
    <section
      className="relative w-full h-[70vh] md:h-[calc(100vh-80px)] overflow-hidden bg-bg"
      onMouseEnter={() => swiperRef.current?.autoplay?.pause()}
      onMouseLeave={() => swiperRef.current?.autoplay?.resume()}
    >
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={900}
        loop
        allowTouchMove
        autoplay={{
          delay: DURATION_MS,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        onSwiper={(s) => (swiperRef.current = s)}
        onSlideChange={(s) => setIndex(s.realIndex)}
        onAutoplayTimeLeft={(_, time, progress) => {
          if (progressRef.current) {
            progressRef.current.style.width = `${(1 - progress) * 100}%`;
          }
        }}
        className="absolute! inset-0"
      >
        {images.map((src, i) => (
          <SwiperSlide key={src}>
            <div className="absolute inset-0 z-0">
              <img
                src={src}
                alt={`Slide ${i + 1}`}
                draggable={false}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(11,15,18,.85),rgba(11,15,18,.35)_35%,transparent_60%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_65%_75%,rgba(33,92,101,.25),transparent)] mix-blend-screen" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="pointer-events-none absolute inset-0" />

      <div className="absolute right-6 md:right-10 bottom-8 md:bottom-12 max-w-[90%] z-[1] md:max-w-[48rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={cn(
              "ml-auto rounded-xl bg-surface/70 backdrop-blur px-4 md:px-6 py-3 md:py-4",
              "border border-border/70 shadow-[0_10px_30px_-12px_rgba(0,0,0,.55)]"
            )}
          >
            <h1 className="text-right text-2xl md:text-5xl lg:text-6xl font-light leading-tight text-text">
              {TEXT_SLIDES[index]}
            </h1>
          </motion.div>
        </AnimatePresence>

        <div className="mt-3 flex items-center justify-end gap-3">
          <div className="text-text-dim text-xs md:text-sm tabular-nums">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(TEXT_SLIDES.length).padStart(2, "0")}
          </div>
          <div className="relative h-1 w-28 md:w-40 rounded-full bg-muted/50 overflow-hidden">
            <div
              ref={progressRef}
              className="absolute left-0 top-0 h-full bg-primary"
              style={{ width: "0%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
