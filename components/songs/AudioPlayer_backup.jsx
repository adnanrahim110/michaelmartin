"use client";

import {
  ExternalLink,
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
}) {
  const [volume, setVolume] = useState(70);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180);
  const [isMuted, setIsMuted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [player, setPlayer] = useState(null);
  const [playerReady, setPlayerReady] = useState(false);

  const intervalRef = useRef(null);
  const playerRef = useRef(null);
  const mountedRef = useRef(true);

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
      setIsBuffering(false); // Don't start buffering immediately
      setPlayerReady(false);
      if (player) {
        try {
          player.destroy();
        } catch (error) {
          console.error("Error destroying player:", error);
        }
        setPlayer(null);
      }
      const initPlayer = () => {
        if (window.YT && window.YT.Player && playerRef.current) {
          const newPlayer = new window.YT.Player(playerRef.current, {
            height: "1",
            width: "1",
            videoId: currentSong.id,
            playerVars: {
              autoplay: isPlaying ? 1 : 0,
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
                console.log("Player ready, setting up...");
                const playerInstance = event.target;
                setPlayer(playerInstance);
                setPlayerReady(true);
                setIsBuffering(false);

                try {
                  playerInstance.setVolume(volume);

                  // Only auto-play if isPlaying is true
                  if (isPlaying) {
                    setTimeout(() => {
                      if (
                        playerInstance &&
                        typeof playerInstance.playVideo === "function"
                      ) {
                        playerInstance.playVideo();
                      }
                    }, 100);
                  }

                  const videoDuration = playerInstance.getDuration();
                  if (videoDuration > 0) {
                    setDuration(videoDuration);
                  }
                } catch (error) {
                  console.error("Error in onReady:", error);
                }
              },
              onStateChange: (event) => {
                if (event.data === window.YT.PlayerState.ENDED) {
                  onNext();
                } else if (event.data === window.YT.PlayerState.PLAYING) {
                  setIsBuffering(false);
                  const videoDuration = event.target.getDuration();
                  if (videoDuration > 0) {
                    setDuration(videoDuration);
                  }
                } else if (event.data === window.YT.PlayerState.BUFFERING) {
                  setIsBuffering(true);
                }
              },
              onError: (event) => {
                console.error("YouTube Player Error:", event.data);
                setIsBuffering(false);
              },
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
      setCurrentTime(0);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (player) {
        try {
          player.destroy();
        } catch (error) {
          console.error("Error destroying player:", error);
        }
        setPlayer(null);
      }
    }
  }, [currentSong, isPlaying]);
  useEffect(() => {
    if (player && playerReady && currentSong) {
      try {
        if (isPlaying) {
          player.playVideo();
        } else {
          player.pauseVideo();
        }
      } catch (error) {
        console.error("Error controlling player:", error);
      }
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
          console.error("Error getting player time:", error);
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
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (player) {
        try {
          player.destroy();
        } catch (error) {
          console.error("Error destroying player on unmount:", error);
        }
      }
    };
  }, []);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    const volumePercent = Math.floor(newVolume * 100);
    setVolume(volumePercent);
    setIsMuted(newVolume === 0);

    if (player && playerReady) {
      try {
        player.setVolume(volumePercent);
        if (newVolume === 0) {
          player.mute();
        } else {
          player.unMute();
        }
      } catch (error) {
        console.error("Error setting volume:", error);
      }
    }
  };
  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (player && playerReady) {
      try {
        if (newMuted) {
          player.mute();
        } else {
          player.unMute();
        }
      } catch (error) {
        console.error("Error toggling mute:", error);
      }
    }
  };
  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = Math.floor(percent * duration);

    if (player && playerReady && duration > 0) {
      try {
        player.seekTo(newTime, true);
        setCurrentTime(newTime);
      } catch (error) {
        console.error("Error seeking:", error);
      }
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

  if (!currentSong || !isVisible) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-surface/95 backdrop-blur-xl border-t border-border/50 shadow-2xl z-50 animate-slide-up">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="relative w-12 h-12 bg-gradient-to-br from-primary/20 to-primary-600/20 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={`https://img.youtube.com/vi/${currentSong.id}/default.jpg`}
                alt={currentSong.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-muted">
                <Music className="w-6 h-6 text-primary-300" />
              </div>
              {isBuffering && (
                <div className="absolute inset-0 bg-bg/60 flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-medium text-text truncate">
                {currentSong.title}
              </h4>
              <div className="text-sm text-text-dim flex items-center gap-1">
                {isBuffering ? "Connecting..." : "YouTube Music"}
                {isPlaying && !isBuffering && (
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
          <div className="flex items-center gap-2">
            <button
              onClick={onPrevious}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <SkipBack className="w-5 h-5 text-text-dim" />
            </button>
            <button
              onClick={isPlaying ? onPause : onPlay}
              className="w-10 h-10 bg-primary hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white fill-current" />
              ) : (
                <Play className="w-5 h-5 text-white fill-current ml-0.5" />
              )}
            </button>
            <button
              onClick={onNext}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <SkipForward className="w-5 h-5 text-text-dim" />
            </button>
          </div>
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <span className="text-xs text-text-dim w-12 text-right">
              {formatTime(currentTime)}
            </span>
            <div
              className="flex-1 bg-muted rounded-full h-3 cursor-pointer group relative overflow-hidden"
              onClick={handleSeek}
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
            <span className="text-xs text-text-dim w-12">
              {formatTime(duration)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-5 h-5 text-text-dim" />
              ) : (
                <Volume2 className="w-5 h-5 text-text-dim" />
              )}
            </button>
            <div className="relative w-20">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume / 100}
                onChange={handleVolumeChange}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer volume-slider"
                style={{
                  background: `linear-gradient(to right, #215c65 0%, #215c65 ${
                    isMuted ? 0 : volume
                  }%, #1b2328 ${isMuted ? 0 : volume}%, #1b2328 100%)`,
                }}
              />
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleOpenInYouTube}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              title="Open in YouTube"
            >
              <ExternalLink className="w-4 h-4 text-text-dim" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              title="Close player"
            >
              <X className="w-4 h-4 text-text-dim" />
            </button>
          </div>
        </div>
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
      {isVisible && (
        <div className="px-4 pb-2 text-center">
          <p className="text-xs text-text-dim/80 flex items-center justify-center gap-2">
            <span>🎵</span>
            <span>Audio player active - Use controls above or</span>
            <button
              onClick={handleOpenInYouTube}
              className="text-primary-400 hover:text-primary-300 underline transition-colors"
            >
              open full video
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
