"use client";

import { ExternalLink, Heart, Play, Star, Volume2 } from "lucide-react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";

const SongCard = memo(function SongCard({
  song,
  featured = false,
  layout = "card",
  onPlaySong,
  currentSong,
  isPlaying,
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  const isActive = useMemo(
    () => currentSong?.id === song.id,
    [currentSong?.id, song.id]
  );
  const thumbnailUrl = useMemo(
    () => `https://img.youtube.com/vi/${song.id}/maxresdefault.jpg`,
    [song.id]
  );
  const displayTitle = useMemo(
    () =>
      song.title !== "Loading..."
        ? song.title
        : `Song ${song.id.substring(0, 8)}`,
    [song.title, song.id]
  );

  useEffect(() => {
    const loadTimeout = setTimeout(
      () => setIsLoaded(true),
      Math.random() * 1000 + 500
    );
    return () => clearTimeout(loadTimeout);
  }, []);

  const handlePlay = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      onPlaySong?.(song);
    },
    [onPlaySong, song]
  );

  const handleExternalLink = useCallback(
    (e) => {
      e.stopPropagation();
      window.open(song.url, "_blank", "noopener,noreferrer");
    },
    [song.url]
  );
  if (layout === "list") {
    return (
      <div
        className={`group relative bg-surface/70 backdrop-blur-sm rounded-xl border border-border/50 p-4 hover:bg-surface hover:shadow-lg transition-all duration-200 cursor-pointer ${
          featured ? "border-primary/50" : ""
        }`}
        onClick={handlePlay}
      >
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
            {thumbnailUrl ? (
              <img
                src={thumbnailUrl}
                alt={displayTitle}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                onError={() => setThumbnailUrl("")}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Volume2 className="w-6 h-6 text-text-dim" />
              </div>
            )}
            <div
              className={`absolute inset-0 bg-bg/60 flex items-center justify-center transition-opacity duration-200 ${
                currentSong?.id === song.id
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100"
              }`}
            >
              {currentSong?.id === song.id && isPlaying ? (
                <div className="w-5 h-5 flex items-center justify-center">
                  <div className="flex gap-0.5">
                    <div
                      className="w-1 bg-primary-300 animate-pulse"
                      style={{ height: "12px", animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-1 bg-primary-300 animate-pulse"
                      style={{ height: "16px", animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-1 bg-primary-300 animate-pulse"
                      style={{ height: "8px", animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              ) : (
                <Play className="w-5 h-5 text-primary-300 fill-current" />
              )}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-text line-clamp-1 group-hover:text-primary-300 transition-colors">
              {isLoaded ? displayTitle : "Loading..."}
            </h3>
            <p className="text-sm text-text-dim">YouTube Music</p>
          </div>
          <div className="flex items-center gap-2">
            {featured && (
              <div className="flex items-center gap-1 px-2 py-1 bg-primary/20 rounded-full">
                <Star className="w-3 h-3 text-primary-400 fill-current" />
                <span className="text-xs font-medium text-primary-300">
                  Featured
                </span>
              </div>
            )}
            <button
              onClick={handleExternalLink}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-text-dim" />
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      className={`group relative bg-surface/90 backdrop-blur-sm rounded-2xl border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer hover:scale-[1.01] hover:-translate-y-0.5 ${
        featured ? "ring-2 ring-primary-400/50" : ""
      }`}
      onClick={handlePlay}
    >
      <div className="relative aspect-video bg-gradient-to-br from-muted to-bg overflow-hidden">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={displayTitle}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setThumbnailUrl("")}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Volume2 className="w-12 h-12 text-text-dim" />
          </div>
        )}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-bg/80 via-bg/20 to-transparent flex items-center justify-center transition-opacity duration-300 ${
            currentSong?.id === song.id
              ? "opacity-100"
              : "opacity-0 group-hover:opacity-100"
          }`}
        >
          <div
            className={`w-16 h-16 bg-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-primary/30 transition-all duration-300 ${
              currentSong?.id === song.id
                ? "scale-110 bg-primary/30"
                : "group-hover:scale-110"
            }`}
          >
            {currentSong?.id === song.id && isPlaying ? (
              <div className="flex items-center justify-center gap-1">
                <div
                  className="w-1 bg-primary-300 animate-pulse"
                  style={{ height: "20px", animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-1 bg-primary-300 animate-pulse"
                  style={{ height: "28px", animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-1 bg-primary-300 animate-pulse"
                  style={{ height: "16px", animationDelay: "300ms" }}
                ></div>
                <div
                  className="w-1 bg-primary-300 animate-pulse"
                  style={{ height: "24px", animationDelay: "450ms" }}
                ></div>
              </div>
            ) : (
              <Play className="w-8 h-8 text-primary-300 fill-current ml-1" />
            )}
          </div>
        </div>
        {featured && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-current" />
              Featured
            </div>
          </div>
        )}
        {!isLoaded && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-text line-clamp-2 group-hover:text-primary-300 transition-colors">
            {isLoaded ? displayTitle : "Loading..."}
          </h3>
          <p className="text-sm text-text-dim flex items-center gap-2 mt-1">
            <Volume2 className="w-4 h-4" />
            YouTube Music
          </p>
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={handleExternalLink}
            className="flex items-center gap-2 px-3 py-1.5 bg-muted hover:bg-border rounded-lg text-sm font-medium text-text-dim hover:text-text transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Open
          </button>
          {featured && (
            <div className="flex items-center gap-1 text-primary-400">
              <Heart className="w-4 h-4 fill-current" />
              <span className="text-xs font-medium">Favorite</span>
            </div>
          )}
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
});

export default SongCard;
