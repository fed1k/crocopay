"use client";

import React, { useState, useEffect } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const getRandomStatus = () => {
  const statuses = ["В процессе", "Выполнен", "Отменен"];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

const getRandomDirection = () => (Math.random() > 0.5 ? "up" : "down");

const getRandomPrice = () => {
  const number = Math.floor(Math.random() * 10000) + 100; // Random number between 100 and 10,100
  return number.toLocaleString("ru-RU") + " RUB";
};

const getInitialOperations = (count = 5) => {
  return Array.from({ length: count }, () => ({
    price: getRandomPrice(),
    direction: getRandomDirection(),
    status: getRandomStatus(),
    timestamp: Date.now() - Math.floor(Math.random() * 60) * 1000, // random past seconds
  }));
};

// Format time as "X seconds ago", "X minutes ago", etc.
const formatTimeAgo = (timestamp) => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return `${seconds}s назад`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}м назад`;
  const hours = Math.floor(minutes / 60);
  return `${hours}ч назад`;
};

const LastOperations = () => {
  const [lastOperations, setLastOperations] = useState(getInitialOperations(5));

  // Generate new operation every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const newOp = {
        price: getRandomPrice(),
        direction: getRandomDirection(),
        status: getRandomStatus(),
        timestamp: Date.now(),
      };

      setLastOperations((prevOps) => [newOp, ...prevOps].slice(0, 5));
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // Force update every second to update "time ago"
  useEffect(() => {
    const timer = setInterval(() => {
      setLastOperations((ops) => [...ops]); // trigger re-render
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-2">
      {lastOperations.map((lastOp, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all duration-300"
        >
          <div className="flex items-center gap-3">
            {lastOp.direction === "up" ? (
              <FaArrowUp className="text-red-400" />
            ) : (
              <FaArrowDown className="text-green-400" />
            )}
            <div>
              <p className="text-sm text-white">{lastOp.price}</p>
              <p className="text-xs text-gray-400">
                {formatTimeAgo(lastOp.timestamp)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {lastOp.status === "В процессе" && (
              <span className="text-xs px-2 py-1 rounded-full bg-yellow-400/10 text-yellow-400">
                В процессе
              </span>
            )}
            {lastOp.status === "Выполнен" && (
              <span className="text-xs px-2 py-1 rounded-full bg-green-400/10 text-green-400">
                Выполнен
              </span>
            )}
            {lastOp.status === "Отменен" && (
              <span className="text-xs px-2 py-1 rounded-full bg-red-400/10 text-red-400">
                Отменен
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LastOperations;
