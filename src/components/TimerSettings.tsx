import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Zap } from "lucide-react";

interface TimerSettingsProps {
  onStart: (duration: { days: number; hours: number; minutes: number; seconds: number }) => void;
}

export const TimerSettings = ({ onStart }: TimerSettingsProps) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalTime = days * 86400 + hours * 3600 + minutes * 60 + seconds;
    
    if (totalTime <= 0) {
      alert("กรุณาตั้งเวลาอย่างน้อย 1 วินาที");
      return;
    }
    
    onStart({ days, hours, minutes, seconds });
  };

  const quickSet = (mins: number) => {
    setDays(0);
    setHours(Math.floor(mins / 60));
    setMinutes(mins % 60);
    setSeconds(0);
  };

  return (
    <Card className="p-8 pixel-border bg-card/80 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-lg md:text-xl font-bold text-pixel-pink mb-3 uppercase">SET TIMER</h2>
          <p className="text-muted-foreground text-[10px] leading-relaxed">กำหนดเวลานับถอยหลัง</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="days" className="text-primary uppercase text-[10px] font-bold tracking-wider">
              DAYS
            </Label>
            <Input
              id="days"
              type="number"
              min="0"
              max="999"
              value={days}
              onChange={(e) => setDays(Math.max(0, parseInt(e.target.value) || 0))}
              className="bg-background/50 border-4 border-border text-foreground text-center text-base font-bold h-12 pixel-border-inset hover:border-primary transition-smooth"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hours" className="text-primary uppercase text-[10px] font-bold tracking-wider">
              HOURS
            </Label>
            <Input
              id="hours"
              type="number"
              min="0"
              max="23"
              value={hours}
              onChange={(e) => setHours(Math.max(0, Math.min(23, parseInt(e.target.value) || 0)))}
              className="bg-background/50 border-4 border-border text-foreground text-center text-base font-bold h-12 pixel-border-inset hover:border-primary transition-smooth"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="minutes" className="text-primary uppercase text-[10px] font-bold tracking-wider">
              MINS
            </Label>
            <Input
              id="minutes"
              type="number"
              min="0"
              max="59"
              value={minutes}
              onChange={(e) => setMinutes(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
              className="bg-background/50 border-4 border-border text-foreground text-center text-base font-bold h-12 pixel-border-inset hover:border-primary transition-smooth"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="seconds" className="text-primary uppercase text-[10px] font-bold tracking-wider">
              SECS
            </Label>
            <Input
              id="seconds"
              type="number"
              min="0"
              max="59"
              value={seconds}
              onChange={(e) => setSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
              className="bg-background/50 border-4 border-border text-foreground text-center text-base font-bold h-12 pixel-border-inset hover:border-primary transition-smooth"
            />
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-[8px] text-muted-foreground uppercase tracking-wider text-center">QUICK SET</p>
          <div className="grid grid-cols-3 gap-2">
            <Button type="button" variant="ghost" onClick={() => quickSet(1)} className="text-[10px] h-10">
              1 MIN
            </Button>
            <Button type="button" variant="ghost" onClick={() => quickSet(5)} className="text-[10px] h-10">
              5 MIN
            </Button>
            <Button type="button" variant="ghost" onClick={() => quickSet(10)} className="text-[10px] h-10">
              10 MIN
            </Button>
            <Button type="button" variant="ghost" onClick={() => quickSet(30)} className="text-[10px] h-10">
              30 MIN
            </Button>
            <Button type="button" variant="ghost" onClick={() => quickSet(60)} className="text-[10px] h-10">
              1 HOUR
            </Button>
            <Button type="button" variant="ghost" onClick={() => quickSet(120)} className="text-[10px] h-10">
              2 HOUR
            </Button>
          </div>
        </div>

        <Button type="submit" size="lg" className="w-full">
          <Zap className="mr-2" />
          START
        </Button>
      </form>
    </Card>
  );
};
