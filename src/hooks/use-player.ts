import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ONE_HUNDRED_PERCENT } from '../const';
import { useAppSelector } from '../store/hooks';
import { FilmsSelector } from '../store/films/selector';

const POSITION_CORRECTION = 25;
const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_MINUTE = 60;

function getLeftTime(duration: number, currentTime: number) {
  const hours = Math.floor(duration / SECONDS_IN_HOUR);
  let leftSeconds = duration - currentTime;
  const leftHours = Math.floor(leftSeconds / SECONDS_IN_HOUR);
  leftSeconds -= leftHours * SECONDS_IN_HOUR;
  const leftMinutes = Math.floor(leftSeconds / SECONDS_IN_MINUTE);
  leftSeconds = Math.floor(leftSeconds - leftMinutes * SECONDS_IN_MINUTE);
  const displayedHours = hours.toString().padStart(2, '0');
  const displayedMinutes = leftMinutes.toString().padStart(2, '0');
  const displayedSeconds = leftSeconds.toString().padStart(2, '0');
  if (hours > 0) {
    return `-${displayedHours}:${displayedMinutes}:${displayedSeconds}`;
  }
  return `-${displayedMinutes}:${displayedSeconds}`;
}

export function usePlayer() {
  const film = useAppSelector(FilmsSelector.film);
  const videoLink = film?.videoLink;

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState<null | string>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const handleExit = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleTogglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const handleToggleFullScreen = useCallback(() => {
    videoRef.current?.requestFullscreen();
  }, []);

  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      const { duration, currentTime } = videoRef.current;
      const newProgress = (currentTime / duration) * ONE_HUNDRED_PERCENT;
      setProgress(newProgress);
      setTimeLeft(getLeftTime(duration, currentTime));
    }
  }, []);

  const handleProgressClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && sliderRef.current) {
      const newProgress =
        (e.clientX - POSITION_CORRECTION) / sliderRef.current.clientWidth;
      setProgress(newProgress * ONE_HUNDRED_PERCENT);
      videoRef.current.currentTime = videoRef.current.duration * newProgress;
    }
  }, []);

  useEffect(() => {
    if (progress === ONE_HUNDRED_PERCENT) {
      setIsPlaying(false);
    }
  }, [progress]);

  return {
    film,
    videoRef,
    videoLink,
    handleTimeUpdate,
    handleExit,
    sliderRef,
    handleProgressClick,
    progress,
    handleTogglePlay,
    isPlaying,
    handleToggleFullScreen,
    timeLeft,
  };
}
