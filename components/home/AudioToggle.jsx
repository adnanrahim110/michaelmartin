"use client";

import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export default function AudioToggle({
  src,
  initialPlaying = false,
  loop = true,
  className = "",
}) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(initialPlaying);

  useEffect(() => {
    const el = new Audio(src);
    el.loop = loop;
    el.preload = "auto";
    el.volume = 0.7;
    audioRef.current = el;

    if (initialPlaying) {
      el.play().catch(() => setIsPlaying(false));
    }
    return () => {
      el.pause();
      el.src = "";
      audioRef.current = null;
    };
  }, [src, loop, initialPlaying]);

  const toggleAudio = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    if (isPlaying) {
      el.pause();
      setIsPlaying(false);
    } else {
      el.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [isPlaying]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key.toLowerCase() === "m") toggleAudio();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggleAudio]);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isPlaying && (
        <span className="pointer-events-none absolute inset-0 -z-10 grid place-items-center">
          <span className="h-12 w-12 rounded-full bg-primary/25 animate-ping" />
        </span>
      )}

      <Button
        size="icon"
        variant="ghost"
        aria-pressed={isPlaying}
        aria-label={isPlaying ? "Mute audio" : "Play audio"}
        title={isPlaying ? "Mute audio (M)" : "Play audio (M)"}
        onClick={toggleAudio}
        className={[
          "rounded-full border border-border",
          "bg-surface/80 hover:bg-muted/40 backdrop-blur",
          "shadow-[0_12px_40px_-16px_rgba(0,0,0,.6)]",
          "transition-transform active:scale-[0.98]",
          className,
        ].join(" ")}
        data-testid="button-audio-toggle"
      >
        {isPlaying ? (
          <Volume2 className="h-5 w-5" />
        ) : (
          <VolumeX className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
}
