"use client";
import React, { FC, useState, useEffect } from "react";

interface ITimerProps {
  timeLeft: number;
  onTimerEnd: () => void;
  isActive: boolean;
}

const Timer: FC<ITimerProps> = ({ timeLeft, onTimerEnd, isActive }) => {
  const [time, setTime] = useState(timeLeft);

  useEffect(() => {
    if (!isActive) return;

    if (time <= 0) {
      onTimerEnd();
      return;
    }

    const timer = setTimeout(() => {
      setTime(time - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [time, isActive, onTimerEnd]);

  useEffect(() => {
    setTime(timeLeft);
  }, [timeLeft]);

  if (!isActive || time <= 0) return null;

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return <span>{timeString}</span>;
};

export default Timer;