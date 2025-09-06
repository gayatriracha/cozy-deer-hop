"use client";

import React from 'react';
import { Button } from "@/components/ui/button"; // Assuming shadcn/ui button

interface TimerControlsProps {
  isRunning: boolean;
  onStartPause: () => void;
  onReset: () => void;
}

const TimerControls: React.FC<TimerControlsProps> = ({ isRunning, onStartPause, onReset }) => {
  return (
    <div className="flex space-x-4">
      <Button onClick={onStartPause} variant="outline" size="lg">
        {isRunning ? "Pause" : "Start"}
      </Button>
      <Button onClick={onReset} variant="secondary" size="lg">
        Reset
      </Button>
    </div>
  );
};

export default TimerControls;