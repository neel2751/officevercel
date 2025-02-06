"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const STATUTORY_LEAVE_DAYS = 28; // UK statutory minimum (including bank holidays)
const WORKING_DAYS_PER_WEEK = 5; // Standard UK working week

export function LeaveCalculator() {
  const [employmentType, setEmploymentType] = useState("Full-Time");
  const [hoursPerWeek, setHoursPerWeek] = useState("37.5");
  const [weeksPerYear, setWeeksPerYear] = useState("52");
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [calculation, setCalculation] = useState(null);

  const calculateLeave = () => {
    let annualEntitlement = STATUTORY_LEAVE_DAYS;
    let accrualRate = STATUTORY_LEAVE_DAYS / 12; // Monthly accrual
    let currentAccrued = 0;

    const startDateObj = new Date(startDate);
    const monthsWorked =
      new Date().getMonth() -
      startDateObj.getMonth() +
      12 * (new Date().getFullYear() - startDateObj.getFullYear());

    switch (employmentType) {
      case "Full-Time":
        currentAccrued = Math.min(
          STATUTORY_LEAVE_DAYS,
          accrualRate * monthsWorked
        );
        break;

      case "Part-Time":
        const weekRatio = Number(hoursPerWeek) / 37.5; // Standard UK full-time hours
        annualEntitlement = Math.round(STATUTORY_LEAVE_DAYS * weekRatio);
        accrualRate = annualEntitlement / 12;
        currentAccrued = Math.min(
          annualEntitlement,
          accrualRate * monthsWorked
        );
        break;

      case "Part-Year":
        const yearRatio = Number(weeksPerYear) / 52;
        annualEntitlement = Math.round(STATUTORY_LEAVE_DAYS * yearRatio);
        accrualRate = annualEntitlement / 12;
        currentAccrued = Math.min(
          annualEntitlement,
          accrualRate * monthsWorked
        );
        break;

      case "Irregular-Hours":
        // For irregular hours, calculate based on hours worked
        // This would typically be calculated retrospectively based on actual hours
        const averageWeeklyHours = Number(hoursPerWeek);
        const weeklyAccrual = (averageWeeklyHours * 5.6) / 52; // 5.6 weeks is the statutory minimum
        annualEntitlement = Math.round(weeklyAccrual * 52);
        accrualRate = weeklyAccrual * 4; // Monthly accrual
        currentAccrued = Math.min(
          annualEntitlement,
          accrualRate * monthsWorked
        );
        break;
    }

    setCalculation({
      annualEntitlement,
      accrualRate,
      currentAccrued: Math.round(currentAccrued * 100) / 100,
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Leave Entitlement Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="employment-type">Employment Type</Label>
            <Select
              value={employmentType}
              onValueChange={(value) => setEmploymentType(value)}
            >
              <SelectTrigger id="employment-type">
                <SelectValue placeholder="Select employment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Full-Time">Full Time</SelectItem>
                <SelectItem value="Part-Time">Part Time</SelectItem>
                <SelectItem value="Irregular-Hours">Irregular Hours</SelectItem>
                <SelectItem value="Part-Year">Part Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(employmentType === "Part-Time" ||
            employmentType === "Irregular-Hours") && (
            <div className="space-y-2">
              <Label htmlFor="hours-per-week">Hours per Week</Label>
              <Input
                id="hours-per-week"
                type="number"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(e.target.value)}
                min="0"
                max="37.5"
                step="0.5"
              />
            </div>
          )}

          {employmentType === "Part-Year" && (
            <div className="space-y-2">
              <Label htmlFor="weeks-per-year">Weeks per Year</Label>
              <Input
                id="weeks-per-year"
                type="number"
                value={weeksPerYear}
                onChange={(e) => setWeeksPerYear(e.target.value)}
                min="0"
                max="52"
                step="1"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="start-date">Employment Start Date</Label>
            <Input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <Button onClick={calculateLeave}>Calculate Leave</Button>
        </div>

        {calculation && (
          <div className="mt-6 space-y-4 border-t pt-4">
            <h3 className="font-semibold">Calculation Results</h3>
            <div className="grid gap-2">
              <p>Annual Entitlement: {calculation.annualEntitlement} days</p>
              <p>
                Monthly Accrual Rate: {calculation.accrualRate.toFixed(2)} days
              </p>
              <p>Currently Accrued: {calculation.currentAccrued} days</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
