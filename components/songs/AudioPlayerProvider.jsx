"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import AudioPlayer from "./AudioPlayer";
import MiniAudioPlayer from "./MiniAudioPlayer";

const AudioPlayerContext = createContext(null);

export function AudioPlayerProvider({ children }) {
  const [queue, setQueue] = useState([]);
  const [currentSongId, setCurrentSongId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMiniExpanded, setIsMiniExpanded] = useState(false);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);

  const pathname = usePathname();
  const lastVolumeRef = useRef(70);

  const currentSong = useMemo(
    () => queue.find((item) => item.id === currentSongId) ?? null,
    [queue, currentSongId]
  );

  const currentIndex = useMemo(
    () => (currentSongId ? queue.findIndex((item) => item.id === currentSongId) : -1),
    [queue, currentSongId]
  );

  const hasSongs = queue.length > 0;

  const playSong = useCallback((song, songQueue) => {
    if (!song) return;

    setQueue((prevQueue) => {
      if (songQueue && songQueue.length) {
        return songQueue;
      }

      if (!prevQueue.some((item) => item.id === song.id)) {
        return [...prevQueue, song];
      }
      return prevQueue;
    });

    setCurrentSongId(song.id);
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const resume = useCallback(() => {
    if (currentSong) {
      setIsPlaying(true);
    }
  }, [currentSong]);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => {
      if (!currentSong) {
        return prev;
      }
      return !prev;
    });
  }, [currentSong]);

  const playNext = useCallback(() => {
    if (!hasSongs) return;

    setCurrentTime(0);
    setDuration((prev) => prev);

    setCurrentSongId((prevId) => {
      const index = queue.findIndex((item) => item.id === prevId);
      if (index === -1) {
        return queue[0]?.id ?? null;
      }
      const nextIndex = (index + 1) % queue.length;
      return queue[nextIndex]?.id ?? null;
    });
    setIsPlaying(true);
  }, [hasSongs, queue]);

  const playPrevious = useCallback(() => {
    if (!hasSongs) return;

    setCurrentTime(0);

    setCurrentSongId((prevId) => {
      const index = queue.findIndex((item) => item.id === prevId);
      if (index === -1) {
        return queue[0]?.id ?? null;
      }
      const prevIndex = index === 0 ? queue.length - 1 : index - 1;
      return queue[prevIndex]?.id ?? null;
    });
    setIsPlaying(true);
  }, [hasSongs, queue]);

  const close = useCallback(() => {
    setIsPlaying(false);
    setTimeout(() => {
      setCurrentSongId(null);
      setQueue([]);
      setCurrentTime(0);
      setDuration(0);
    }, 150);
  }, []);

  const setVolumePercent = useCallback((value) => {
    const clamped = Math.min(100, Math.max(0, Math.floor(value)));
    setVolume(clamped);
    if (clamped > 0) {
      lastVolumeRef.current = clamped;
      setIsMuted(false);
    } else {
      setIsMuted(true);
    }
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      if (!prev) {
        lastVolumeRef.current = volume > 0 ? volume : lastVolumeRef.current || 70;
        setVolume(0);
        return true;
      }
      const restoreVolume = lastVolumeRef.current > 0 ? lastVolumeRef.current : 70;
      setVolume(restoreVolume);
      return false;
    });
  }, [volume]);

  const setQueueFromSongs = useCallback((songQueue) => {
    if (Array.isArray(songQueue) && songQueue.length) {
      setQueue(songQueue);
    }
  }, []);

  const value = useMemo(
    () => ({
      queue,
      currentSong,
      currentSongId,
      currentIndex,
      isPlaying,
      currentTime,
      duration,
      isMiniExpanded,
      setIsMiniExpanded,
      volume,
      isMuted,
      playSong,
      togglePlay,
      pause,
      resume,
      playNext,
      playPrevious,
      close,
      setQueueFromSongs,
      setCurrentTime,
      setDuration,
      setVolumePercent,
      toggleMute,
      isPlayerActive: Boolean(currentSong),
    }),
    [
      queue,
      currentSong,
      currentSongId,
      currentIndex,
      isPlaying,
      currentTime,
      duration,
      isMiniExpanded,
      volume,
      isMuted,
      playSong,
      togglePlay,
      pause,
      resume,
      playNext,
      playPrevious,
      close,
      setQueueFromSongs,
      setVolumePercent,
      toggleMute,
    ]
  );

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
      <AudioPlayer
        currentSong={currentSong}
        isPlaying={isPlaying}
        onPlay={resume}
        onPause={pause}
        onClose={close}
        onNext={playNext}
        onPrevious={playPrevious}
        onTimeUpdate={setCurrentTime}
        onDurationChange={setDuration}
        showUi={pathname?.startsWith("/songs") ?? false}
        volume={volume}
        isMuted={isMuted}
        onVolumeChange={setVolumePercent}
        onMuteToggle={toggleMute}
      />
      <MiniAudioPlayer />
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error("useAudioPlayer must be used within an AudioPlayerProvider");
  }
  return context;
}
