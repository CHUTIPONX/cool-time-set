import { useState, useEffect } from "react";
import { TimerDisplay } from "./TimerDisplay";
import { TimerControls } from "./TimerControls";
import { TimerSettings } from "./TimerSettings";

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = () => {
  const [targetTime, setTargetTime] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isRunning, setIsRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(true);

  useEffect(() => {
    if (!isRunning || !targetTime) return;

    const calculateTimeLeft = () => {
      const difference = targetTime.getTime() - new Date().getTime();

      if (difference <= 0) {
        setIsRunning(false);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        // Alert or sound can be added here
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [isRunning, targetTime]);

  const handleStart = (duration: { days: number; hours: number; minutes: number; seconds: number }) => {
    const now = new Date();
    const target = new Date(
      now.getTime() +
        duration.days * 24 * 60 * 60 * 1000 +
        duration.hours * 60 * 60 * 1000 +
        duration.minutes * 60 * 1000 +
        duration.seconds * 1000
    );
    setTargetTime(target);
    setTimeLeft(duration);
    setIsRunning(true);
    setShowSettings(false);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleResume = () => {
    if (targetTime) {
      setIsRunning(true);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTargetTime(null);
    setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    setShowSettings(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-8 animate-slide-in">
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-7xl font-black text-neon-cyan animate-flicker">
            CYBER COUNTDOWN
          </h1>
          <p className="text-lg text-muted-foreground uppercase tracking-widest">
            Futuristic Timer System
          </p>
        </div>

        {showSettings ? (
          <TimerSettings onStart={handleStart} />
        ) : (
          <>
            <TimerDisplay timeLeft={timeLeft} />
            <TimerControls
              isRunning={isRunning}
              onPause={handlePause}
              onResume={handleResume}
              onReset={handleReset}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default CountdownTimer;
