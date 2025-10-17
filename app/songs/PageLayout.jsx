"use client";

import { useAudioPlayer } from "@/components/songs/AudioPlayerProvider";
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

const getSongsPerPage = (width) => {
  if (width > 1280) return 10;
  if (width > 1024) return 8;
  if (width > 780) return 6;
  return 4;
};

export default function SongsPageLayout() {
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("title");
  const [isLoading, setIsLoading] = useState(true);
  const [songsPerPage, setSongsPerPage] = useState(4);
  const [displayedCount, setDisplayedCount] = useState(4);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const {
    currentSong,
    isPlaying,
    playSong,
    pause,
    togglePlay,
    setQueueFromSongs,
  } = useAudioPlayer();

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
    const updateSongsPerPage = () => {
      if (typeof window === "undefined") return;
      const width = window.innerWidth;
      const nextValue = getSongsPerPage(width);
      setSongsPerPage((prev) => (prev === nextValue ? prev : nextValue));
    };

    updateSongsPerPage();
    window.addEventListener("resize", updateSongsPerPage);
    return () => window.removeEventListener("resize", updateSongsPerPage);
  }, []);

  useEffect(() => {
    setDisplayedCount(songsPerPage);
  }, [songsPerPage, sortBy]);

  useEffect(() => {
    setQueueFromSongs(allSongs);
  }, [allSongs, setQueueFromSongs]);

  const handlePlaySong = useCallback(
    (song) => {
      if (currentSong?.id === song.id) {
        togglePlay();
      } else {
        playSong(song, allSongs);
      }
    },
    [currentSong?.id, togglePlay, playSong, allSongs]
  );

  const handleLoadMore = useCallback(() => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setDisplayedCount((prev) => prev + songsPerPage);
      setIsLoadingMore(false);
    }, 800);
  }, [songsPerPage]);

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
          onSongPause={pause}
          currentSong={currentSong}
          isPlaying={isPlaying}
          totalSongs={allSongs.length}
          hasMoreSongs={hasMoreSongs}
          onLoadMore={handleLoadMore}
          isLoadingMore={isLoadingMore}
        />
      </div>
    </div>
  );
}
