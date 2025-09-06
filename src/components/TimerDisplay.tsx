"use client";

import React from 'react';

interface TimerDisplayProps {
  time: number;
}

const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const TimerDisplay: React.FC<TimerDisplayProps> = ({ time }) => {
  return (
    <div className="text-6xl font-bold text-gray-800 mb-8">
      {formatTime(time)}
    </div>
  );
};

export default TimerDisplay;