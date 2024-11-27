"use client";
import { DatePickerWithRange } from "@/components/form/formFields";
import SearchDebounce from "@/components/search/searchDebounce";

import { CommonContext } from "@/context/commonContext";
import { useFetchQuery } from "@/hooks/use-query";
import Pagination from "@/lib/pagination";
import { fetchEmployeAttendanceDataWithDateRange } from "@/server/attendanceServer/attendanceServer";
import { addDays } from "date-fns";
import React from "react";
import FilterTable from "./filterTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SelectFilter } from "@/components/selectFilter/selectFilter";

const FilterAttendance = ({ searchParams }) => {
  const query = searchParams?.query;
  const currentPage = parseInt(searchParams?.page || "1");
  const pagePerData = parseInt(searchParams?.pageSize || "10");
  const [filter, setFilter] = React.useState("All");

  const [date, setDate] = React.useState({
    from: new Date(),
    to: addDays(new Date(), 20),
  });
  const queryKey = [
    "attendanceData",
    { currentPage, pagePerData, query, date, filter },
  ];
  const { data, isLoading, isError } = useFetchQuery({
    params: {
      page: currentPage,
      pageSize: pagePerData,
      query: query,
      date,
      paymentType: filter,
    },
    queryKey,
    fetchFn: fetchEmployeAttendanceDataWithDateRange,
  });

  const { newData, totalCount } = data || {};

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <div className="mb-4 flex flex-col gap-1">
            <CardTitle>Filter Attendance</CardTitle>
            <CardDescription>
              Filter attendance by date and payment type
            </CardDescription>
          </div>
          <div
            className={`flex items-center ${
              totalCount > 0 ? "justify-between" : "justify-end"
            }`}
          >
            {totalCount > 0 && <SearchDebounce />}
            <div className="flex gap-3">
              {totalCount > 0 && (
                <SelectFilter
                  value={filter}
                  frameworks={[
                    { label: "All", value: "All" },
                    { label: "Monthly", value: "Monthly" },
                    { label: "Weekly", value: "Weekly" },
                  ]}
                  placeholder={filter === "" ? "All" : "Select  Filter"}
                  onChange={(e) => setFilter(e)}
                  noData="No Data found"
                />
              )}
              <DatePickerWithRange date={date} setDate={setDate} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CommonContext.Provider
            value={{
              data: newData,
              currentPage,
              pagePerData,
              totalCount,
            }}
          >
            {isLoading && <div>Loading...</div>}
            {isError && <div>Error</div>}
            {newData?.length <= 0 ? (
              <div className="text-center text-gray-500">No data available</div>
            ) : (
              <FilterTable />
            )}
            {totalCount > 10 && (
              <div className="pt-4 mt-2 border-t border-gray-200">
                <Pagination />
              </div>
            )}
          </CommonContext.Provider>
        </CardContent>
      </Card>
    </div>
  );
};

export default FilterAttendance;
