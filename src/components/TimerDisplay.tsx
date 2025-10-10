import { TimeLeft } from "./CountdownTimer";

interface TimerDisplayProps {
  timeLeft: TimeLeft;
}

export const TimerDisplay = ({ timeLeft }: TimerDisplayProps) => {
  const timeUnits = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINUTES", value: timeLeft.minutes },
    { label: "SECONDS", value: timeLeft.seconds },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {timeUnits.map((unit, index) => (
        <div
          key={unit.label}
          className="relative group"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="cyber-border bg-card/50 backdrop-blur-sm rounded-xl p-6 md:p-8 transition-smooth hover:scale-105 hover:glow-strong">
            <div className="text-5xl md:text-7xl font-black text-neon-cyan text-center mb-2 animate-pulse-glow">
              {String(unit.value).padStart(2, "0")}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground text-center uppercase tracking-widest font-bold">
              {unit.label}
            </div>
          </div>
          
          {/* Decorative corner elements */}
          <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-primary opacity-50" />
          <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-primary opacity-50" />
          <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-primary opacity-50" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-primary opacity-50" />
        </div>
      ))}
    </div>
  );
};
