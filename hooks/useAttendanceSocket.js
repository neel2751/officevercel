"use client";
// hooks/useAttendanceSocket.js
import {
  getEmployeeTodayAttendanceDataForAdmin,
  getTodayAttendanceData,
} from "@/server/timeOffServer/timeOffServer";
import { useEffect, useRef, useState, useCallback } from "react";
import { io } from "socket.io-client";
import { toast } from "sonner";

export function useAttendanceSocket() {
  const socketRef = useRef(null);
  const [attendanceMap, setAttendanceMap] = useState({}); // employeeId → [clockData]

  const fetchInitialData = useCallback(async () => {
    const result = await getTodayAttendanceData();
    if (result) {
      try {
        const initialClockData = JSON.parse(result);
        const initialMap = {};
        initialClockData.forEach((item) => {
          if (item.employeeId) {
            initialMap[item.employeeId] = initialMap[item.employeeId] || [];
            initialMap[item.employeeId].push(item);
          }
        });
        setAttendanceMap(initialMap);
      } catch (error) {
        console.log("Failed to parse initial attendance data:", error);
        toast.error("Failed to load initial attendance data");
      }
    } else {
      console.log("Failed to fetch initial attendance data");
      toast.error("Failed to load initial attendance data");
    }
  }, []);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(process.env.NEXT_PUBLIC_WEB_URL);

      socketRef.current.on("connect", () => {
        console.log("✅ Socket connected:", socketRef.current.id);
        fetchInitialData(); // Fetch initial data after connecting
      });

      socketRef.current.on("refresh-clock-table", async (employeeId) => {
        toast.success(`📥 New scan from employee: ${employeeId}`);
        const result = await getEmployeeTodayAttendanceDataForAdmin(employeeId);
        if (result) {
          try {
            const clockData = JSON.parse(result);
            setAttendanceMap((prev) => ({
              ...prev,
              [employeeId]: clockData,
            }));
          } catch (error) {
            console.error("❌ Failed to parse updated clock data:", error);
            toast.error("Failed to fetch updated clock data");
          }
        } else {
          console.error("❌ Failed to fetch updated clock data");
          toast.error("Failed to fetch updated clock data");
        }
      });
    }

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [fetchInitialData]); // Include fetchInitialData in the dependency array

  return {
    attendanceList: Object.values(attendanceMap).flat(), // All employee records combined
  };
}
