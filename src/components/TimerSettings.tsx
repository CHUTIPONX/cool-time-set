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
    <Card className="p-8 cyber-border bg-card/50 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-neon-cyan mb-2 uppercase">ตั้งเวลา Countdown</h2>
          <p className="text-muted-foreground text-sm">กำหนดเวลาที่ต้องการนับถอยหลัง</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="days" className="text-primary uppercase text-xs font-bold tracking-wider">
              Days
            </Label>
            <Input
              id="days"
              type="number"
              min="0"
              max="999"
              value={days}
              onChange={(e) => setDays(Math.max(0, parseInt(e.target.value) || 0))}
              className="bg-background/50 border-primary/30 text-foreground text-center text-lg font-bold h-14"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hours" className="text-primary uppercase text-xs font-bold tracking-wider">
              Hours
            </Label>
            <Input
              id="hours"
              type="number"
              min="0"
              max="23"
              value={hours}
              onChange={(e) => setHours(Math.max(0, Math.min(23, parseInt(e.target.value) || 0)))}
              className="bg-background/50 border-primary/30 text-foreground text-center text-lg font-bold h-14"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="minutes" className="text-primary uppercase text-xs font-bold tracking-wider">
              Minutes
            </Label>
            <Input
              id="minutes"
              type="number"
              min="0"
              max="59"
              value={minutes}
              onChange={(e) => setMinutes(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
              className="bg-background/50 border-primary/30 text-foreground text-center text-lg font-bold h-14"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="seconds" className="text-primary uppercase text-xs font-bold tracking-wider">
              Seconds
            </Label>
            <Input
              id="seconds"
              type="number"
              min="0"
              max="59"
              value={seconds}
              onChange={(e) => setSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
              className="bg-background/50 border-primary/30 text-foreground text-center text-lg font-bold h-14"
            />
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs text-muted-foreground uppercase tracking-wider text-center">Quick Set</p>
          <div className="grid grid-cols-3 gap-2">
            <Button type="button" variant="ghost" onClick={() => quickSet(1)} className="text-xs">
              1 min
            </Button>
            <Button type="button" variant="ghost" onClick={() => quickSet(5)} className="text-xs">
              5 min
            </Button>
            <Button type="button" variant="ghost" onClick={() => quickSet(10)} className="text-xs">
              10 min
            </Button>
            <Button type="button" variant="ghost" onClick={() => quickSet(30)} className="text-xs">
              30 min
            </Button>
            <Button type="button" variant="ghost" onClick={() => quickSet(60)} className="text-xs">
              1 hour
            </Button>
            <Button type="button" variant="ghost" onClick={() => quickSet(120)} className="text-xs">
              2 hours
            </Button>
          </div>
        </div>

        <Button type="submit" size="lg" className="w-full">
          <Zap className="mr-2" />
          เริ่ม Countdown
        </Button>
      </form>
    </Card>
  );
};
