import React, { useState, useEffect, useRef } from 'react';

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

const TimeTracker: React.FC = () => {
  const [time, setTime] = useState<number>(parseInt(localStorage.getItem('timerTime') || '0'));
  const [running, setRunning] = useState<boolean>(localStorage.getItem('timerRunning') === 'true');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    localStorage.setItem('timerTime', time.toString());
    localStorage.setItem('timerRunning', running.toString());
  }, [time, running]);

  useEffect(() => {
    if (running && !intervalRef.current) {
      intervalRef.current = setInterval(() => setTime(t => t + 1), 1000);
    } else if (!running && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  return (
    <div>
      <h2>Time Tracker</h2>
      <div>{formatTime(time)}</div>
      <div>
        <button
          onClick={() => setRunning(true)}
          disabled={running}
        >
          Start
        </button>
        <button
          onClick={() => setRunning(false)}
          disabled={!running}
        >
          Pause
        </button>
        <button
          onClick={() => setRunning(true)}
          disabled={running || time === 0}
        >
          Resume
        </button>
        <button
          onClick={() => {
            setTime(0);
            setRunning(false);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default TimeTracker;
