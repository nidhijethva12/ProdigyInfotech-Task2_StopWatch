import React, { useState, useEffect } from 'react';
import './Stopwatch.css';

const Stopwatch = () => {
  const [time, setTime] = useState(0); // Time in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000); // Update time every second
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [isRunning]);

  const startStopHandler = () => {
    setIsRunning(!isRunning); // Start or stop the stopwatch
  };

  const resetHandler = () => {
    setIsRunning(false);
    setTime(0); // Reset time
  };

  const lapHandler = () => {
    setLaps([...laps, time]); // Record the current time as a lap
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="stopwatch">
      <h1>Stopwatch</h1>
      <div className="time-display">{formatTime(time)}</div>

      <div className="controls">
        <button onClick={startStopHandler}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={resetHandler}>Reset</button>
        <button onClick={lapHandler} disabled={!isRunning}>
          Lap
        </button>
      </div>

      {laps.length > 0 && (
        <div className="laps">
          <h2>Laps</h2>
          <ul>
            {laps.map((lap, index) => (
              <li key={index}>Lap {index + 1}: {formatTime(lap)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Stopwatch;
