"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, SkipForward, SkipBack, Settings } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export interface VideoPlayerProps {
  videoSrc: string;
  posterSrc?: string;
  title?: string;
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
  initialProgress?: number;
  lessonId: string;
  className?: string;
  nextLessonId?: string;
  previousLessonId?: string;
  onNavigateToLesson?: (lessonId: string) => void;
  autoplay?: boolean;
  chapters?: {
    id: string;
    title: string;
    startTime: number; // in seconds
  }[];
}

export default function VideoPlayer({
  videoSrc,
  posterSrc,
  title,
  onProgress,
  onComplete,
  initialProgress = 0,
  lessonId,
  className,
  nextLessonId,
  previousLessonId,
  onNavigateToLesson,
  autoplay = false,
  chapters = [],
}: VideoPlayerProps) {
  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  
  // State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [progress, setProgress] = useState(initialProgress);
  const [controlsTimeout, setControlsTimeout] = useState<NodeJS.Timeout | null>(null);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [videoQuality, setVideoQuality] = useState('auto');
  const [hasEnded, setHasEnded] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [bufferedProgress, setBufferedProgress] = useState(0);
  const [controlsHovered, setControlsHovered] = useState(false);
  
  // Format time function (converts seconds to MM:SS format)
  const formatTime = (time: number) => {
    if (isNaN(time)) return '00:00';
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Set up video and event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const onLoadedMetadata = () => {
      setDuration(video.duration);
      
      // Set initial progress if provided
      if (initialProgress > 0 && initialProgress < 100) {
        const seekTime = (initialProgress / 100) * video.duration;
        video.currentTime = seekTime;
        setCurrentTime(seekTime);
      }
      
      if (autoplay) {
        video.play().catch(() => {
          // Autoplay prevented by browser, handle gracefully
          setIsPlaying(false);
        });
      }
    };
    
    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      const progressPercent = (video.currentTime / video.duration) * 100;
      setProgress(progressPercent);
      
      // Update buffering progress
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const bufferedProgress = (bufferedEnd / video.duration) * 100;
        setBufferedProgress(bufferedProgress);
      }
      
      // Callback for tracking progress
      if (onProgress) {
        onProgress(progressPercent);
      }
      
      // Check if video is at least 95% complete for completion callback
      if (progressPercent >= 95 && !hasEnded && onComplete) {
        setHasEnded(true);
        onComplete();
      }
    };
    
    const onEnded = () => {
      setIsPlaying(false);
      setHasEnded(true);
      if (onComplete) onComplete();
    };
    
    // Add event listeners
    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('ended', onEnded);
    
    // Set up fullscreen change event
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    // Clean up event listeners on unmount
    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('ended', onEnded);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      
      if (controlsTimeout) {
        clearTimeout(controlsTimeout);
      }
    };
  }, [videoSrc, initialProgress, onProgress, onComplete, autoplay, hasEnded, controlsTimeout]);
  
  // Auto-hide controls when not hovering
  useEffect(() => {
    if (!isPlaying || controlsHovered) return;
    
    const hideControls = () => {
      if (!controlsHovered) {
        setShowControls(false);
      }
    };
    
    const timeout = setTimeout(hideControls, 3000);
    setControlsTimeout(timeout);
    
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isPlaying, controlsHovered, currentTime]);
  
  // Handle play/pause
  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    
    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(err => console.error('Playback error:', err));
    }
    
    setIsPlaying(!isPlaying);
    setShowControls(true);
  };
  
  // Handle seeking on progress bar click
  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = progressBarRef.current;
    const video = videoRef.current;
    if (!progressBar || !video) return;
    
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const seekTime = clickPosition * video.duration;
    
    video.currentTime = seekTime;
    setCurrentTime(seekTime);
  };
  
  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;
    
    const newVolume = value[0];
    setVolume(newVolume);
    video.volume = newVolume;
    
    if (newVolume === 0) {
      setIsMuted(true);
      video.muted = true;
    } else if (isMuted) {
      setIsMuted(false);
      video.muted = false;
    }
  };
  
  // Handle mute toggle
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    video.muted = newMutedState;
  };
  
  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    const container = playerContainerRef.current;
    if (!container) return;
    
    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };
  
  // Handle playback speed change
  const handlePlaybackRateChange = (rate: string) => {
    const video = videoRef.current;
    if (!video) return;
    
    const numericRate = parseFloat(rate);
    setPlaybackRate(numericRate);
    video.playbackRate = numericRate;
  };
  
  // Handle video quality change (in a real implementation, this would switch video sources)
  const handleQualityChange = (quality: string) => {
    setVideoQuality(quality);
    // In a real implementation, you would switch the video source here
    console.log(`Quality changed to: ${quality}`);
  };
  
  // Handle seeking to a specific chapter
  const seekToChapter = (startTime: number) => {
    const video = videoRef.current;
    if (!video) return;
    
    video.currentTime = startTime;
    setCurrentTime(startTime);
    
    if (!isPlaying) {
      togglePlayPause();
    }
  };
  
  // Skip forward/backward
  const skipTime = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    
    const newTime = Math.min(Math.max(0, video.currentTime + seconds), video.duration);
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };
  
  // Navigate to next/previous lesson
  const navigateToLesson = (lessonId: string | undefined) => {
    if (lessonId && onNavigateToLesson) {
      onNavigateToLesson(lessonId);
    }
  };
  
  // Mouse movement & touch handlers for controls visibility
  const handleMouseMove = () => {
    setShowControls(true);
    
    if (controlsTimeout) {
      clearTimeout(controlsTimeout);
      setControlsTimeout(null);
    }
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setShowControls(true);
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchEndX - touchStartX;
    
    // Swipe right to go back 10s, swipe left to go forward 10s
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        skipTime(-10);
      } else {
        skipTime(10);
      }
    } else {
      // Small movement is treated as a tap, toggle play/pause
      togglePlayPause();
    }
  };
  
  // Double click to toggle fullscreen
  const handleDoubleClick = () => {
    toggleFullscreen();
  };
  
  // Calculate current chapter
  const getCurrentChapter = () => {
    if (chapters.length === 0 || !currentTime) return null;
    
    // Find the last chapter that starts before the current time
    for (let i = chapters.length - 1; i >= 0; i--) {
      if (chapters[i].startTime <= currentTime) {
        return chapters[i];
      }
    }
    
    return chapters[0]; // Default to first chapter if none found
  };
  
  const currentChapter = getCurrentChapter();
  
  return (
    <div 
      ref={playerContainerRef}
      className={cn(
        "relative group overflow-hidden rounded-lg bg-black", 
        isFullscreen ? "w-screen h-screen" : "w-full aspect-video",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => !isPlaying && setShowControls(true)}
      onDoubleClick={handleDoubleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={videoSrc}
        poster={posterSrc}
        className="w-full h-full"
        onClick={togglePlayPause}
        playsInline
      />
      
      {/* Title Overlay (visible when controls are showing) */}
      {title && showControls && (
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent text-white">
          <h3 className="font-medium text-lg">{title}</h3>
          {currentChapter && (
            <p className="text-sm opacity-90">
              Chapter: {currentChapter.title}
            </p>
          )}
        </div>
      )}
      
      {/* Play/Pause Button Overlay (center of video) */}
      {(!isPlaying || showControls) && (
        <div 
          className={cn(
            "absolute inset-0 flex items-center justify-center",
            "transition-opacity duration-200",
            !showControls && "opacity-0"
          )}
          onClick={togglePlayPause}
        >
          <div className="bg-black/40 rounded-full p-4">
            {isPlaying ? (
              <Pause className="h-10 w-10 text-white" />
            ) : (
              <Play className="h-10 w-10 text-white" />
            )}
          </div>
        </div>
      )}
      
      {/* Controls Bar */}
      <div 
        className={cn(
          "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent",
          "transition-opacity duration-200 px-4 pb-2 pt-10",
          (!showControls && isPlaying) && "opacity-0 pointer-events-none"
        )}
        onMouseEnter={() => setControlsHovered(true)}
        onMouseLeave={() => setControlsHovered(false)}
      >
        {/* Progress Bar */}
        <div 
          ref={progressBarRef}
          className="relative h-1.5 mb-2 bg-white/30 rounded cursor-pointer group"
          onClick={handleProgressBarClick}
        >
          {/* Buffered Progress */}
          <div 
            className="absolute h-full bg-white/50 rounded"
            style={{ width: `${bufferedProgress}%` }}
          />
          {/* Current Progress */}
          <div 
            className="absolute h-full bg-primary rounded"
            style={{ width: `${progress}%` }}
          />
          {/* Progress Handle */}
          <div 
            className="absolute h-3 w-3 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2 top-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ left: `${progress}%` }}
          />
        </div>
        
        {/* Controls Row */}
        <div className="flex items-center justify-between text-white">
          {/* Left Controls */}
          <div className="flex items-center space-x-2">
            {/* Play/Pause Button */}
            <Button 
              onClick={togglePlayPause} 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-white hover:bg-white/10 rounded-full"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>
            
            {/* Skip Backward/Forward */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    onClick={() => skipTime(-10)} 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-white hover:bg-white/10 rounded-full"
                  >
                    <SkipBack className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Back 10s</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    onClick={() => skipTime(10)} 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-white hover:bg-white/10 rounded-full"
                  >
                    <SkipForward className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Forward 10s</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            {/* Volume Control */}
            <div className="hidden sm:flex items-center space-x-1">
              <Button 
                onClick={toggleMute} 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-white hover:bg-white/10 rounded-full"
              >
                {isMuted ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </Button>
              <Slider
                value={[isMuted ? 0 : volume]}
                min={0}
                max={1}
                step={0.01}
                onValueChange={handleVolumeChange}
                className="w-20"
              />
            </div>
            
            {/* Time Display */}
            <span className="text-xs text-white/90">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
          
          {/* Right Controls */}
          <div className="flex items-center space-x-2">
            {/* Previous/Next Lesson Buttons */}
            {(previousLessonId || nextLessonId) && (
              <div className="flex items-center space-x-1">
                {previousLessonId && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          onClick={() => navigateToLesson(previousLessonId)} 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-white hover:bg-white/10 rounded-full"
                        >
                          <SkipBack className="h-5 w-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        <p>Previous Lesson</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                
                {nextLessonId && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          onClick={() => navigateToLesson(nextLessonId)} 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-white hover:bg-white/10 rounded-full"
                        >
                          <SkipForward className="h-5 w-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        <p>Next Lesson</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            )}
            
            {/* Settings Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-white hover:bg-white/10 rounded-full"
                >
                  <Settings className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                {/* Playback Speed */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <span>Playback Speed</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuRadioGroup 
                      value={playbackRate.toString()} 
                      onValueChange={handlePlaybackRateChange}
                    >
                      <DropdownMenuRadioItem value="0.5">0.5x</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="0.75">0.75x</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="1">Normal</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="1.25">1.25x</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="1.5">1.5x</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="2">2x</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                
                {/* Video Quality */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <span>Quality</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuRadioGroup 
                      value={videoQuality} 
                      onValueChange={handleQualityChange}
                    >
                      <DropdownMenuRadioItem value="auto">Auto</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="1080p">1080p</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="720p">720p</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="480p">480p</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="360p">360p</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                
                {/* Chapters (if available) */}
                {chapters.length > 0 && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <span>Chapters</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent className="max-h-60 overflow-y-auto">
                        {chapters.map((chapter) => (
                          <DropdownMenuItem 
                            key={chapter.id}
                            onClick={() => seekToChapter(chapter.startTime)}
                          >
                            <span>{chapter.title}</span>
                            <span className="ml-auto text-xs opacity-70">
                              {formatTime(chapter.startTime)}
                            </span>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Fullscreen Toggle */}
            <Button 
              onClick={toggleFullscreen} 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-white hover:bg-white/10 rounded-full"
            >
              <Maximize className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Progress Indicator (outside the video for lesson progress) */}
      {!isFullscreen && (
        <div className="mt-2">
          <div className="flex justify-between text-xs mb-1">
            <span>Your progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-1" />
        </div>
      )}
    </div>
  );
} 