"use client";
import { useEffect, useState } from "react";

const TODAY_DATE = new Date();

export const useTime = () => {
  const [currentTime, setCurrentTime] = useState(TODAY_DATE);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  });
  return currentTime;
};
