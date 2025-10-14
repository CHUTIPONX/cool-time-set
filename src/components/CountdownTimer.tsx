import { useState, useEffect, useRef } from "react";
import { TimerDisplay } from "./TimerDisplay";
import { TimerControls } from "./TimerControls";
import { TimerSettings } from "./TimerSettings";
import pixelCityBg from "@/assets/pixel-city-bg.png";
import { toast } from "@/hooks/use-toast";

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
  const audioContextRef = useRef<AudioContext | null>(null);
  const lastSecondRef = useRef<number>(-1);

  // Initialize Audio Context
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    return () => {
      audioContextRef.current?.close();
    };
  }, []);

  // Play tick sound
  const playTick = () => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'square';
    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.05);
  };

  // Play alarm sound
  const playAlarm = () => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;
    
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        oscillator.frequency.value = 1000;
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.3);
      }, i * 400);
    }
  };

  useEffect(() => {
    if (!isRunning || !targetTime) return;

    const calculateTimeLeft = () => {
      const difference = targetTime.getTime() - new Date().getTime();

      if (difference <= 0) {
        setIsRunning(false);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        playAlarm();
        toast({
          title: "⏰ Time's Up!",
          description: "Your countdown has finished!",
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      // Play tick sound on second change
      if (seconds !== lastSecondRef.current && isRunning) {
        playTick();
        lastSecondRef.current = seconds;
      }

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
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Pixel City Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ 
          backgroundImage: `url(${pixelCityBg})`,
          imageRendering: 'pixelated'
        }}
      />
      
      {/* Content */}
      <div className="w-full max-w-4xl space-y-8 animate-slide-in relative z-10">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold text-pixel-pink drop-shadow-lg">
            PIXEL COUNTDOWN
          </h1>
          <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest">
            RETRO TIMER SYSTEM
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
