"use client";

import { Crown, Heart, Star } from "lucide-react";
import { memo } from "react";
import SongCard from "./SongCard";

const FeaturedSongs = memo(function FeaturedSongs({
  songs,
  onPlaySong,
  currentSong,
  isPlaying,
}) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative">
            <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/20 to-primary-600/20 flex items-center justify-center backdrop-blur-sm">
              <Crown className="w-5 sm:w-6 h-5 sm:h-6 text-primary-300" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 sm:w-4 h-3 sm:h-4 bg-gradient-to-r from-primary-500 to-primary-400 rounded-full opacity-80 animate-pulse"></div>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-text flex items-center gap-1.5 sm:gap-2">
              <span className="hidden sm:inline">Featured Favorites</span>
              <span className="sm:hidden">Featured</span>
              <Star className="w-4 sm:w-5 h-4 sm:h-5 text-primary-400 animate-pulse" />
            </h2>
            <p className="text-xs sm:text-sm text-text-dim">
              The most treasured songs in the collection
            </p>
          </div>
        </div>
        <div className="hidden sm:block flex-1 h-px bg-gradient-to-r from-primary/20 via-primary-400/20 to-transparent"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {songs.map((song, index) => (
          <div
            key={song.id}
            className="group relative animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative bg-gradient-to-br from-surface/95 to-muted/90 backdrop-blur-xl rounded-2xl border border-primary/30 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group-hover:scale-[1.01] group-hover:-translate-y-0.5">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <SongCard
                song={song}
                featured={true}
                onPlaySong={onPlaySong}
                currentSong={currentSong}
                isPlaying={isPlaying}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center py-8">
        <div className="flex items-center gap-4 px-6 py-3 bg-gradient-to-r from-primary/10 to-primary-600/20 rounded-full border border-primary/20">
          <Heart className="w-5 h-5 text-primary-400 animate-pulse" />
          <span className="text-sm font-medium text-text-dim">
            Personally selected favorites
          </span>
          <Heart className="w-5 h-5 text-primary-400 animate-pulse" />
        </div>
      </div>
    </div>
  );
});

export default FeaturedSongs;
