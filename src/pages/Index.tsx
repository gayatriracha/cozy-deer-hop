"use client";

import React, { useState, useEffect, useRef } from 'react';
import TimerDisplay from '../components/TimerDisplay';
import TimerControls from '../components/TimerControls';

const FOCUS_TIME = 2 * 60 * 60; // 2 hours in seconds
const SHORT_BREAK_TIME = 5 * 60; // 5 minutes in seconds
const LONG_BREAK_TIME = 15 * 60; // 15 minutes in seconds
const CYCLES_BEFORE_LONG_BREAK = 4;

const IndexPage: React.FC = () => {
  const [time, setTime] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isFocusing, setIsFocusing] = useState(true);
  const [cycles, setCycles] = useState(0);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsFocusing(true);
    setTime(FOCUS_TIME);
    setCycles(0);
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
  };

  const switchTimerMode = (isFocus: boolean) => {
    setIsRunning(false);
    setIsFocusing(isFocus);
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    setTime(isFocus ? FOCUS_TIME : (cycles + 1) % LONG_BREAK_TIME === 0 ? LONG_BREAK_TIME : SHORT_BREAK_TIME);
  };

  useEffect(() => {
    if (isRunning) {
      timerIntervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 1) {
            if (timerIntervalRef.current) {
              clearInterval(timerIntervalRef.current);
            }
            setIsRunning(false);
            if (isFocusing) {
              setCycles((prevCycles) => prevCycles + 1);
              switchTimerMode(false); // Switch to break
            } else {
              switchTimerMode(true); // Switch back to focus
            }
            return 0; // Should not be displayed as timer switches immediately
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [isRunning, isFocusing, cycles]); // Re-run effect when these states change

  useEffect(() => {
    // Set initial time based on focus state when component mounts
    setTime(isFocusing ? FOCUS_TIME : (cycles + 1) % LONG_BREAK_TIME === 0 ? LONG_BREAK_TIME : SHORT_BREAK_TIME);
  }, [isFocusing, cycles]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Pomodoro Focus Timer</h1>
      <div className="bg-white rounded-xl shadow-xl p-8 flex flex-col items-center">
        <p className="text-xl text-gray-600 mb-4">
          {isFocusing ? "Focus Time" : "Break Time"}
        </p>
        <TimerDisplay time={time} />
        <TimerControls
          isRunning={isRunning}
          onStartPause={isRunning ? pauseTimer : startTimer}
          onReset={resetTimer}
        />
        <div className="mt-6 text-lg text-gray-600">
          Cycles Completed: {cycles}
        </div>
      </div>
    </div>
  );
};

export default IndexPage;