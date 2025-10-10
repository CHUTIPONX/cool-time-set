import { TimeLeft } from "./CountdownTimer";

interface TimerDisplayProps {
  timeLeft: TimeLeft;
}

export const TimerDisplay = ({ timeLeft }: TimerDisplayProps) => {
  const timeUnits = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINS", value: timeLeft.minutes },
    { label: "SECS", value: timeLeft.seconds },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {timeUnits.map((unit, index) => (
        <div
          key={unit.label}
          className="relative group animate-slide-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="pixel-border-inset bg-card/80 backdrop-blur-sm p-6 md:p-8 transition-smooth hover:scale-105 hover:shadow-pixel-hover hover:border-primary">
            <div className="text-4xl md:text-6xl font-bold text-pixel-pink text-center mb-3 animate-pixel-float">
              {String(unit.value).padStart(2, "0")}
            </div>
            <div className="text-[8px] md:text-[10px] text-muted-foreground text-center uppercase tracking-widest font-bold">
              {unit.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
