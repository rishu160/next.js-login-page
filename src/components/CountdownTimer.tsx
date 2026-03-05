"use client";

import React, { useState, useEffect, useCallback } from "react";

interface CountdownTimerProps {
  initialSeconds?: number;
  onComplete?: () => void;
  onResend?: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  initialSeconds = 24,
  onComplete,
  onResend,
}) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
      if (onComplete) onComplete();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds, onComplete]);

  const handleResend = useCallback(() => {
    setSeconds(initialSeconds);
    setIsActive(true);
    if (onResend) onResend();
  }, [initialSeconds, onResend]);

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="text-center">
      {isActive ? (
        <p className="text-gray-400 text-sm">
          Resend code in{" "}
          <span className="text-purple-400 font-semibold">{formatTime(seconds)}</span>
        </p>
      ) : (
        <button
          onClick={handleResend}
          className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
        >
          Resend OTP
        </button>
      )}
    </div>
  );
};

export default CountdownTimer;
