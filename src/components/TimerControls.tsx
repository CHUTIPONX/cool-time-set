import { Button } from "@/components/ui/button";
import { Pause, Play, RotateCcw } from "lucide-react";

interface TimerControlsProps {
  isRunning: boolean;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
}

export const TimerControls = ({ isRunning, onPause, onResume, onReset }: TimerControlsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      {isRunning ? (
        <Button onClick={onPause} variant="outline" size="lg" className="w-full sm:w-auto">
          <Pause className="mr-2" />
          Pause
        </Button>
      ) : (
        <Button onClick={onResume} variant="default" size="lg" className="w-full sm:w-auto">
          <Play className="mr-2" />
          Resume
        </Button>
      )}
      <Button onClick={onReset} variant="pixel" size="lg" className="w-full sm:w-auto">
        <RotateCcw className="mr-2" />
        Reset
      </Button>
    </div>
  );
};
