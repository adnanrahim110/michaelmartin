"use client";

import { Loader2, Plus } from "lucide-react";
import { memo } from "react";
import SongCard from "./SongCard";
import SongsControls from "./SongsControls";

const EmptyState = memo(function EmptyState() {
  return (
    <div className="text-center py-12">
      <p className="text-text-dim text-lg">
        No songs found matching your criteria.
      </p>
      <p className="text-text-dim text-sm mt-2">
        Try adjusting your filters or search terms.
      </p>
    </div>
  );
});

const LoadMoreButton = memo(function LoadMoreButton({
  onLoadMore,
  isLoadingMore,
}) {
  return (
    <div className="flex justify-center">
      <button
        onClick={onLoadMore}
        disabled={isLoadingMore}
        className="group flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-surface/70 backdrop-blur-sm border border-border/50 rounded-xl hover:bg-surface hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoadingMore ? (
          <>
            <Loader2 className="w-4 sm:w-5 h-4 sm:h-5 animate-spin text-primary-400" />
            <span className="text-sm sm:text-base font-medium text-text">
              Loading...
            </span>
          </>
        ) : (
          <>
            <Plus className="w-4 sm:w-5 h-4 sm:h-5 text-primary-400 group-hover:scale-110 transition-transform" />
            <span className="text-sm sm:text-base font-medium text-text group-hover:text-primary-300 transition-colors">
              Load More
            </span>
          </>
        )}
      </button>
    </div>
  );
});

const SongsGrid = memo(function SongsGrid({
  songs,
  currentSong,
  isPlaying,
  onSongPlay,
  onSongPause,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
  totalSongs,
  hasMoreSongs,
  onLoadMore,
  isLoadingMore,
}) {
  const hasSongs = songs && songs.length > 0;

  return (
    <section className="space-y-4 sm:space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-text">
            Complete Collection
          </h2>
          {totalSongs > 0 && (
            <span className="text-xs sm:text-sm text-text-dim bg-muted px-2 py-1 rounded-md w-fit">
              Showing {songs.length} of {totalSongs} songs
            </span>
          )}
        </div>
        <SongsControls
          viewMode={viewMode}
          onViewModeChange={onViewModeChange}
          sortBy={sortBy}
          onSortChange={onSortChange}
        />
      </header>

      {hasSongs ? (
        <>
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6"
                : "space-y-2 sm:space-y-3"
            }
            role="list"
            aria-label="Songs collection"
          >
            {songs.map((song) => (
              <SongCard
                key={song.id}
                song={song}
                isPlaying={isPlaying && currentSong?.id === song.id}
                onPlaySong={() => onSongPlay(song)}
                onPause={onSongPause}
                currentSong={currentSong}
                layout={viewMode === "list" ? "list" : "card"}
              />
            ))}
          </div>

          <div className="flex flex-col items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            {hasMoreSongs && (
              <LoadMoreButton
                onLoadMore={onLoadMore}
                isLoadingMore={isLoadingMore}
              />
            )}
            {totalSongs > 0 && (
              <div className="text-center">
                <span className="text-xs sm:text-sm text-text-dim bg-muted/50 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full">
                  Showing {songs.length} of {totalSongs} songs
                </span>
              </div>
            )}
          </div>
        </>
      ) : (
        <EmptyState />
      )}
    </section>
  );
});

export default SongsGrid;
