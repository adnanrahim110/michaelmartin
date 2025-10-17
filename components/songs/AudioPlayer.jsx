"use client";

import {
  ExternalLink,
  Loader2,
  Music,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function AudioPlayer({
  currentSong,
  isPlaying,
  onPlay,
  onPause,
  onClose,
  onNext,
  onPrevious,
  onTimeUpdate,
  onDurationChange,
  showUi = true,
  volume = 70,
  isMuted = false,
  onVolumeChange,
  onMuteToggle,
}) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180);
  const [isVisible, setIsVisible] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [player, setPlayer] = useState(null);
  const [playerReady, setPlayerReady] = useState(false);

  const intervalRef = useRef(null);
  const playerRef = useRef(null);
  const mountedRef = useRef(true);
  const destroyedRef = useRef(false);

  const safeDestroy = () => {
    if (!player || destroyedRef.current) return;
    try {
      if (typeof player.getIframe === "function") {
        const iframe = player.getIframe();
        if (iframe && iframe.parentNode) {
          player.destroy();
        } else {
          try {
            player.destroy();
          } catch (e) {}
        }
      } else {
        player.destroy();
      }
    } catch (e) {}
    destroyedRef.current = true;
    setPlayer(null);
  };

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = () => {};
    }
  }, []);

  useEffect(() => {
    if (currentSong) {
      setIsVisible(true);
      setCurrentTime(0);
      setIsBuffering(false);
      setIsLoading(true);
      setPlayerReady(false);
      if (player) {
        safeDestroy();
      }
      const initPlayer = () => {
        if (window.YT && window.YT.Player && playerRef.current) {
          new window.YT.Player(playerRef.current, {
            height: "1",
            width: "1",
            videoId: currentSong.id,
            playerVars: {
              autoplay: 0,
              controls: 0,
              disablekb: 1,
              fs: 0,
              iv_load_policy: 3,
              modestbranding: 1,
              playsinline: 1,
              rel: 0,
            },
            events: {
              onReady: (event) => {
                const playerInstance = event.target;
                setPlayer(playerInstance);
                destroyedRef.current = false;
                setPlayerReady(true);
                setIsBuffering(false);
                setIsLoading(false);

                try {
                  playerInstance.setVolume(volume);
                  if (isMuted || volume === 0) {
                    playerInstance.mute();
                  } else {
                    playerInstance.unMute();
                  }
                  const videoDuration = playerInstance.getDuration();
                  if (videoDuration > 0) {
                    setDuration(videoDuration);
                  }
                } catch (error) {}
              },
              onStateChange: (event) => {
                if (event.data === window.YT.PlayerState.ENDED) {
                  onNext();
                } else if (event.data === window.YT.PlayerState.PLAYING) {
                  setIsBuffering(false);
                  setIsLoading(false);
                  const videoDuration = event.target.getDuration();
                  if (videoDuration > 0) {
                    setDuration(videoDuration);
                  }
                } else if (event.data === window.YT.PlayerState.BUFFERING) {
                  setIsBuffering(true);
                } else if (event.data === window.YT.PlayerState.PAUSED) {
                  setIsBuffering(false);
                  setIsLoading(false);
                }
              },
              onError: () => setIsBuffering(false),
            },
          });
        } else {
          setTimeout(initPlayer, 500);
        }
      };
      initPlayer();
    } else {
      setIsVisible(false);
      setPlayerReady(false);
      setIsBuffering(false);
      setIsLoading(false);
      setCurrentTime(0);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (player) {
        safeDestroy();
      }
    }
  }, [currentSong]);

  useEffect(() => {
    if (player && playerReady && currentSong) {
      try {
        if (isPlaying) {
          setIsLoading(true);
          player.playVideo();
        } else {
          player.pauseVideo();
          setIsLoading(false);
        }
      } catch (error) {}
    } else if (isPlaying && currentSong && !playerReady) {
      setIsLoading(true);
    }
  }, [isPlaying, playerReady, currentSong]);

  useEffect(() => {
    if (player && playerReady && isPlaying && !isBuffering && currentSong) {
      intervalRef.current = setInterval(() => {
        try {
          if (
            mountedRef.current &&
            player &&
            typeof player.getCurrentTime === "function"
          ) {
            const currentTimeYT = player.getCurrentTime();
            const durationYT = player.getDuration();
            if (currentTimeYT !== undefined && currentTimeYT !== null) {
              setCurrentTime(Math.floor(currentTimeYT));
            }
            if (durationYT > 0) {
              setDuration(Math.floor(durationYT));
            }
          }
        } catch (error) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, isBuffering, playerReady, currentSong]);

  useEffect(() => {
    if (player && playerReady) {
      try {
        if (isMuted || volume === 0) {
          player.setVolume(volume);
          player.mute();
        } else {
          player.setVolume(volume);
          player.unMute();
        }
      } catch (error) {}
    }
  }, [player, playerReady, volume, isMuted]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (player) {
        safeDestroy();
      }
    };
  }, []);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    const volumePercent = Math.floor(newVolume * 100);
    onVolumeChange?.(volumePercent);

    if (player && playerReady) {
      try {
        player.setVolume(volumePercent);
        if (volumePercent === 0) {
          player.mute();
        } else {
          player.unMute();
        }
      } catch (error) {}
    }
  };

  const toggleMute = () => {
    onMuteToggle?.();
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = Math.floor(percent * duration);

    if (player && playerReady && duration > 0) {
      try {
        player.seekTo(newTime, true);
        setCurrentTime(newTime);
      } catch (error) {}
    }
  };

  const handleOpenInYouTube = () => {
    if (currentSong) {
      window.open(currentSong.url, "_blank");
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (typeof onTimeUpdate === "function") {
      onTimeUpdate(currentTime);
    }
  }, [currentTime, onTimeUpdate]);

  useEffect(() => {
    if (typeof onDurationChange === "function") {
      onDurationChange(duration);
    }
  }, [duration, onDurationChange]);

  const hasSong = Boolean(currentSong);

  return (
    <>
      <div
        className="fixed bottom-0 left-0 right-0 bg-surface/95 backdrop-blur-xl border-t border-border/50 shadow-2xl z-50 animate-slide-up"
        style={{ display: showUi && hasSong ? undefined : "none" }}
      >
        <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <div className="relative w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-primary/20 to-primary-600/20 rounded-lg overflow-hidden flex-shrink-0">
                {hasSong ? (
                  <img
                    src={`https://img.youtube.com/vi/${currentSong.id}/default.jpg`}
                    alt={currentSong.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-muted" />
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                  <Music className="w-5 sm:w-6 h-5 sm:h-6 text-primary-300" />
                </div>
                {isBuffering && hasSong && (
                  <div className="absolute inset-0 bg-bg/60 flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm sm:text-base font-medium text-text truncate">
                  {hasSong ? currentSong.title : "No song playing"}
                </h4>
                <div className="text-xs sm:text-sm text-text-dim flex items-center gap-1">
                  {isBuffering ? "Connecting..." : "YouTube Music"}
                  {hasSong && isPlaying && !isBuffering && (
                    <div className="flex items-center gap-0.5">
                      <div className="w-1 h-2 bg-primary-400 rounded animate-pulse" />
                      <div
                        className="w-1 h-3 bg-primary-400 rounded animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      />
                      <div
                        className="w-1 h-2 bg-primary-400 rounded animate-pulse"
                        style={{ animationDelay: "0.4s" }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={onPrevious}
                className="p-1.5 sm:p-2 hover:bg-muted rounded-lg transition-colors"
                disabled={!hasSong}
              >
                <SkipBack className="w-4 sm:w-5 h-4 sm:h-5 text-text-dim" />
              </button>
              <button
                onClick={isPlaying ? onPause : onPlay}
                className="w-8 sm:w-10 h-8 sm:h-10 bg-primary hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors"
                disabled={isLoading || !hasSong}
              >
                {isLoading ? (
                  <Loader2 className="w-4 sm:w-5 h-4 sm:h-5 text-white animate-spin" />
                ) : isPlaying ? (
                  <Pause className="w-4 sm:w-5 h-4 sm:h-5 text-white fill-current" />
                ) : (
                  <Play className="w-4 sm:w-5 h-4 sm:h-5 text-white fill-current ml-0.5" />
                )}
              </button>
              <button
                onClick={onNext}
                className="p-1.5 sm:p-2 hover:bg-muted rounded-lg transition-colors"
                disabled={!hasSong}
              >
                <SkipForward className="w-4 sm:w-5 h-4 sm:h-5 text-text-dim" />
              </button>
            </div>
            <div className="hidden sm:flex items-center gap-2 flex-1 max-w-xs lg:max-w-md">
              <span className="text-xs text-text-dim w-10 lg:w-12 text-right">
                {formatTime(currentTime)}
              </span>
              <div
                className="flex-1 bg-muted rounded-full h-2.5 lg:h-3 cursor-pointer group relative overflow-hidden"
                onClick={handleSeek}
                style={{ pointerEvents: hasSong ? undefined : "none", opacity: hasSong ? 1 : 0.5 }}
              >
                <div
                  className="bg-gradient-to-r from-primary to-primary-600 h-full rounded-full transition-all duration-200"
                  style={{
                    width: `${Math.min(
                      100,
                      Math.max(0, (currentTime / duration) * 100)
                    )}%`,
                  }}
                ></div>
                <div className="absolute inset-0 hover:bg-white/10 rounded-full transition-colors"></div>
              </div>
              <span className="text-xs text-text-dim w-10 lg:w-12">
                {formatTime(duration)}
              </span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="p-1.5 lg:p-2 hover:bg-muted rounded-lg transition-colors"
                disabled={!hasSong}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 lg:w-5 h-4 lg:h-5 text-text-dim" />
                ) : (
                  <Volume2 className="w-4 lg:w-5 h-4 lg:h-5 text-text-dim" />
                )}
              </button>
              <div className="relative w-16 lg:w-20">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume / 100}
                  onChange={handleVolumeChange}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer volume-slider"
                  disabled={!hasSong}
                  style={{
                    background: `linear-gradient(to right, #215c65 0%, #215c65 ${
                      isMuted ? 0 : volume
                    }%, #1b2328 ${isMuted ? 0 : volume}%, #1b2328 100%)`,
                  }}
                />
              </div>
            </div>
            <div className="flex items-center gap-0.5 sm:gap-1">
              <button
                onClick={handleOpenInYouTube}
                className="p-1.5 sm:p-2 hover:bg-muted rounded-lg transition-colors"
                title="Open in YouTube"
              >
                <ExternalLink className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-text-dim" />
              </button>
              <button
                onClick={onClose}
                className="p-1.5 sm:p-2 hover:bg-muted rounded-lg transition-colors"
                title="Close player"
              >
                <X className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-text-dim" />
              </button>
            </div>
          </div>
        </div>
        {isVisible && (
          <div className="hidden sm:block px-2 sm:px-4 pb-1.5 sm:pb-2 text-center">
            <p className="text-xs text-text-dim/80 flex items-center justify-center gap-1.5 sm:gap-2">
              <span>??</span>
              <span className="hidden sm:inline">
                Audio player active - Use controls above or
              </span>
              <span className="sm:hidden">Playing now -</span>
              <button
                onClick={handleOpenInYouTube}
                className="text-primary-400 hover:text-primary-300 underline transition-colors"
              >
                <span className="hidden sm:inline">open full video</span>
                <span className="sm:hidden">open in YouTube</span>
              </button>
            </p>
          </div>
        )}
      </div>
      <div
        ref={playerRef}
        style={{
          position: "absolute",
          left: "-9999px",
          visibility: "hidden",
          width: "1px",
          height: "1px",
        }}
      />
    </>
  );
}
