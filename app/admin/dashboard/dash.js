"use client";
import { fetchCardData } from "@/server/dashboardServer/dashboardServer";
import { useEffect, useMemo, useState } from "react";
import DashCount from "./components/dashCard";
import TodayCard from "./components/todayCard";
import Overview from "./components/overview";
import RecentData from "./components/recentData";
import { toast } from "sonner";

const Dash = () => {
  const [data, setData] = useState();
  const [chartData, setChartData] = useState();
  const [today, setToday] = useState();

  const info = async () => {
    try {
      const {
        NumberOfEmployeeData,
        NumberOfficeEmployeeData,
        NumbertotalFullSiteData,
        last90DaysDataForChartData,
        CurrentDayTotalPay,
      } = await fetchCardData();
      const mergeData = [
        {
          label: "Employee Summary",
          value: JSON.parse([NumberOfEmployeeData?.data]),
        },
        {
          label: "Office Employee Summary",
          value: JSON.parse([NumberOfficeEmployeeData?.data]),
        },
        {
          label: "Total Site",
          value: JSON.parse([NumbertotalFullSiteData?.data]),
        },
      ]; // merge data
      console.log(mergeData);
      setToday({
        ...CurrentDayTotalPay,
        employees: JSON.parse(CurrentDayTotalPay?.employees),
      });
      setData(mergeData);
      setChartData(last90DaysDataForChartData);
    } catch (error) {
      toast.error("Error Occurred! Please Try Again Later.");
    }
  };
  useEffect(() => {
    info();
  }, []);
  const memoizedEmployeeData = useMemo(() => data, [data]);
  const memoizedChartData = useMemo(() => chartData, [chartData]); // memoize data
  const memoizedToday = useMemo(() => today, [today]); // memoize data
  return (
    <>
      {/* Office Employee Data */}
      {memoizedEmployeeData && (
        <DashCount memoizedEmployeeData={memoizedEmployeeData} />
      )}
      <div className="sm:px-8 px-4 py-4 lg:flex gap-x-8 w-full">
        <div className="flex flex-col lg:w-1/2 gap-8">
          <div className="flex gap-8">
            <TodayCard
              title={"Total Pay"}
              value={memoizedToday?.totalPay || 0}
              supportText={"Today"}
            />
            <TodayCard
              title={"Total Hours"}
              value={memoizedToday?.totalHours || 0}
              supportText={"Hours"}
            />
          </div>
          <Overview dayData={memoizedChartData} />
          {/* <ChartComponent chartData={chartData} /> */}
        </div>
        <div className="lg:w-1/2 sm:mt-0 mt-8">
          <RecentData data={memoizedToday?.employees} />
        </div>
      </div>
    </>
  );
};

export default Dash;
