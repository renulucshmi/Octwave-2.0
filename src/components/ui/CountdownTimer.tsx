// components/ui/CountdownTimer.tsx
import { useState, useEffect } from 'react';

export function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!mounted) return <div className="skeleton h-20 w-80 rounded-lg"></div>;

  return (
    <div className="flex gap-4 justify-center">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="text-center">
          <div className="glass-card px-4 py-3 min-w-[80px]">
            <div className="text-2xl font-bold octwave-gradient-text">
              {value.toString().padStart(2, '0')}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">
              {unit}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}