"use client";

import AudioPlayer from "@/components/songs/AudioPlayer";
import FeaturedSongs from "@/components/songs/FeaturedSongs";
import SongsGrid from "@/components/songs/SongsGrid";
import SongsHeader from "@/components/songs/SongsHeader";
import { songs } from "@/constants";
import { useCallback, useEffect, useMemo, useState } from "react";

const SORT_FUNCTIONS = {
  featured: (a, b) =>
    a.featured && !b.featured ? -1 : !a.featured && b.featured ? 1 : 0,
  title: (a, b) => a.title.localeCompare(b.title),
};

const SONGS_PER_PAGE = 8;

export default function SongsPageLayout() {
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("title");
  const [isLoading, setIsLoading] = useState(true);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [displayedCount, setDisplayedCount] = useState(SONGS_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const featuredSongs = useMemo(
    () => songs.filter((song) => song.featured),
    []
  );

  const allSongs = useMemo(() => {
    const sortFunction = SORT_FUNCTIONS[sortBy] || SORT_FUNCTIONS.featured;
    return [...songs].sort(sortFunction);
  }, [sortBy]);

  const displayedSongs = useMemo(
    () => allSongs.slice(0, displayedCount),
    [allSongs, displayedCount]
  );

  const hasMoreSongs = useMemo(
    () => displayedCount < allSongs.length,
    [displayedCount, allSongs.length]
  );

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setDisplayedCount(SONGS_PER_PAGE);
  }, [sortBy]);

  const handlePlaySong = useCallback(
    (song) => {
      if (currentSong?.id === song.id) {
        setIsPlaying((prev) => !prev);
      } else {
        setCurrentSong(song);
        setIsPlaying(true);
      }
    },
    [currentSong?.id]
  );

  const handlePause = useCallback(() => setIsPlaying(false), []);
  const handlePlay = useCallback(() => setIsPlaying(true), []);

  const handleClosePlayer = useCallback(() => {
    setIsPlaying(false);
    setTimeout(() => setCurrentSong(null), 100);
  }, []);

  const navigateToSong = useCallback(
    (direction) => {
      if (!currentSong) return;
      const currentIndex = allSongs.findIndex(
        (song) => song.id === currentSong.id
      );
      if (currentIndex === -1) return;

      const nextIndex =
        direction === "next"
          ? (currentIndex + 1) % allSongs.length
          : currentIndex === 0
          ? allSongs.length - 1
          : currentIndex - 1;

      setCurrentSong(allSongs[nextIndex]);
      setIsPlaying(true);
    },
    [currentSong, allSongs]
  );

  const handleLoadMore = useCallback(() => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setDisplayedCount((prev) => prev + SONGS_PER_PAGE);
      setIsLoadingMore(false);
    }, 800);
  }, []);

  const handleNextSong = useCallback(
    () => navigateToSong("next"),
    [navigateToSong]
  );
  const handlePreviousSong = useCallback(
    () => navigateToSong("prev"),
    [navigateToSong]
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bg via-surface to-muted flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto"></div>
          <p className="text-text-dim font-medium">
            Loading musical inspirations...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-surface to-muted pb-20 sm:pb-24">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8 space-y-8 sm:space-y-10 lg:space-y-12">
        <SongsHeader />

        {featuredSongs.length > 0 && (
          <FeaturedSongs
            songs={featuredSongs}
            onPlaySong={handlePlaySong}
            currentSong={currentSong}
            isPlaying={isPlaying}
          />
        )}

        <SongsGrid
          songs={displayedSongs}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          sortBy={sortBy}
          onSortChange={setSortBy}
          title="Complete Collection"
          onSongPlay={handlePlaySong}
          onSongPause={handlePause}
          currentSong={currentSong}
          isPlaying={isPlaying}
          totalSongs={allSongs.length}
          hasMoreSongs={hasMoreSongs}
          onLoadMore={handleLoadMore}
          isLoadingMore={isLoadingMore}
        />
      </div>

      <AudioPlayer
        currentSong={currentSong}
        isPlaying={isPlaying}
        onPlay={handlePlay}
        onPause={handlePause}
        onClose={handleClosePlayer}
        onNext={handleNextSong}
        onPrevious={handlePreviousSong}
      />
    </div>
  );
}
