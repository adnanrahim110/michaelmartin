"use client";

import { cn } from "@/lib/utils";
import {
  Loader2,
  Minimize2,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useAudioPlayer } from "./AudioPlayerProvider";

function formatTime(value) {
  const totalSeconds = Math.max(0, Math.floor(value ?? 0));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

const MiniAudioPlayer = () => {
  const pathname = usePathname();
  const {
    currentSong,
    isPlaying,
    togglePlay,
    playNext,
    playPrevious,
    close,
    currentTime,
    duration,
    isPlayerActive,
    isMiniExpanded,
    setIsMiniExpanded,
    volume,
    isMuted,
    setVolumePercent,
    toggleMute,
  } = useAudioPlayer();

  const progress = useMemo(() => {
    if (!duration || duration === 0) return 0;
    return Math.min(100, Math.max(0, (currentTime / duration) * 100));
  }, [currentTime, duration]);

  const containerRef = useRef(null);

  const handleToggleExpanded = useCallback(() => {
    setIsMiniExpanded((prev) => !prev);
  }, [setIsMiniExpanded]);

  const handleCollapse = useCallback(() => {
    setIsMiniExpanded(false);
  }, [setIsMiniExpanded]);

  const handleVolumeChange = useCallback(
    (event) => {
      const newVolume = parseFloat(event.target.value);
      const volumePercent = Math.floor(newVolume * 100);
      setVolumePercent(volumePercent);
    },
    [setVolumePercent]
  );

  useEffect(() => {
    if (!isMiniExpanded) return;

    const handleClickOutside = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        handleCollapse();
      }
    };

    const handleScroll = () => {
      handleCollapse();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMiniExpanded, handleCollapse]);

  if (!isPlayerActive) return null;

  const isOnSongsPage = pathname?.startsWith("/songs");
  if (isOnSongsPage) return null;

  const thumbnailSrc = currentSong
    ? `https://img.youtube.com/vi/${currentSong.id}/default.jpg`
    : null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        ref={containerRef}
        className={cn(
          "group relative flex items-center gap-3 border transition-all duration-300",
          isMiniExpanded
            ? "w-80 px-4 py-3 rounded-2xl border-border/50 bg-surface/95 backdrop-blur-xl shadow-xl overflow-hidden"
            : "size-20 p-2 cursor-pointer rounded-full border-transparent"
        )}
        aria-expanded={isMiniExpanded}
        onClick={() => {
          if (!isMiniExpanded) {
            handleToggleExpanded();
          }
        }}
      >
        {!isMiniExpanded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="size-full relative flex items-center justify-center">
              <div className="w-full h-full relative flex items-center justify-center">
                <div className="absolute inset-0 blur-sm rounded-full bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-purple-500/30 animate-pulse" />

                <div
                  className="absolute inset-1.5 bg-gray-900 rounded-full flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
                  style={
                    thumbnailSrc
                      ? {
                          backgroundImage: `url(${thumbnailSrc})`,
                        }
                      : {}
                  }
                >
                  <div className="flex gap-1 items-center">
                    <div
                      className={cn(
                        "w-1.5 h-5 bg-cyan-500 shadow-[0_0_0_1px] shadow-black/90 rounded-full",
                        isPlaying && "animate-[bars_2s_ease_infinite_alternate]"
                      )}
                    />
                    <div
                      className={cn(
                        "w-1.5 h-8 bg-blue-500 shadow-[0_0_0_1px] shadow-black/90 rounded-full",
                        isPlaying &&
                          "animate-[bars_2s_ease_infinite_alternate_0.1s]"
                      )}
                    />
                    <div
                      className={cn(
                        "w-1.5 h-10 bg-indigo-500 shadow-[0_0_0_1px] shadow-black/90 rounded-full",
                        isPlaying &&
                          "animate-[bars_2s_ease_infinite_alternate_0.2s]"
                      )}
                    />
                    <div
                      className={cn(
                        "w-1.5 h-6 bg-purple-500 shadow-[0_0_0_1px] shadow-black/90 rounded-full",
                        isPlaying &&
                          "animate-[bars_2s_ease_infinite_alternate_0.3s]"
                      )}
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-500/10 to-transparent animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        )}
        <div
          className={`flex-1 transition-opacity duration-200 ${
            isMiniExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            {thumbnailSrc ? (
              <div
                className={`relative overflow-hidden rounded-xl bg-muted ${
                  isMiniExpanded ? "h-16 w-16 flex-shrink-0" : "h-full w-full"
                }`}
              >
                <img
                  src={thumbnailSrc}
                  alt={currentSong?.title ?? "Current song"}
                  className="h-full w-full object-cover"
                />
                {!isMiniExpanded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-bg/50 backdrop-blur-[2px]">
                    {isPlaying ? (
                      <div className="flex items-end gap-[3px]">
                        {[12, 18, 10, 16].map((height, index) => (
                          <div
                            key={`eq-bar-${index}`}
                            className="equalizer-bar w-1.5 rounded-sm bg-primary-300"
                            style={{
                              height: `${height}px`,
                              animationDelay: `${index * 120}ms`,
                            }}
                          ></div>
                        ))}
                      </div>
                    ) : (
                      <Play className="ml-0.5 h-6 w-6 fill-current text-primary-300" />
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-xl bg-muted">
                <Loader2 className="h-6 w-6 animate-spin text-primary-300" />
              </div>
            )}
            <div className="min-w-0">
              <p className="text-sm font-semibold text-text line-clamp-2">
                {currentSong?.title ?? "Now Playing"}
              </p>
              <p className="mt-1 text-xs text-text-dim">
                {formatTime(currentTime)} / {formatTime(duration)}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  handleCollapse();
                }}
                className="rounded-lg p-1 text-text-dim transition-colors hover:bg-muted hover:text-text"
                aria-label="Collapse mini player"
              >
                <Minimize2 className="h-4 w-4" />
              </button>
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  close();
                }}
                className="rounded-lg p-1 text-text-dim transition-colors hover:bg-muted hover:text-text"
                aria-label="Close mini player"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <div className="flex flex-1 items-center gap-2">
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  playPrevious();
                }}
                className="rounded-full p-2 text-text-dim transition-colors hover:bg-muted hover:text-text"
                aria-label="Play previous song"
              >
                <SkipBack className="h-4 w-4" />
              </button>
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  togglePlay();
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary-600"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5 fill-current" />
                ) : (
                  <Play className="h-5 w-5 fill-current ml-0.5" />
                )}
              </button>
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  playNext();
                }}
                className="rounded-full p-2 text-text-dim transition-colors hover:bg-muted hover:text-text"
                aria-label="Play next song"
              >
                <SkipForward className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  toggleMute();
                }}
                className="rounded-full p-2 text-text-dim transition-colors hover:bg-muted hover:text-text"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </button>
              <div className="relative w-20 sm:w-24">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume / 100}
                  onChange={handleVolumeChange}
                  onClick={(event) => event.stopPropagation()}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer volume-slider"
                  style={{
                    background: `linear-gradient(to right, #215c65 0%, #215c65 ${
                      isMuted ? 0 : volume
                    }%, #1b2328 ${isMuted ? 0 : volume}%, #1b2328 100%)`,
                  }}
                />
              </div>
            </div>
          </div>
          <div className="mt-3 h-1.5 w-full rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-primary-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniAudioPlayer;
