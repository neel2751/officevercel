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
import { addDays, addWeeks, format } from "date-fns";

const STATUTORY_WEEKLY_RATE = 172.48;
const MATERNITY_TOTAL_WEEKS = 52;
const MATERNITY_PAID_WEEKS = 39;
const PATERNITY_MAX_WEEKS = 2;
const PATERNITY_DEADLINE_WEEKS = 56;

export function ParentalLeaveCalculator() {
  const [leaveType, setLeaveType] = useState("paternity" > "maternity");
  const [dueDate, setDueDate] = useState(
    format(addWeeks(new Date(), 12), "yyyy-MM-dd")
  );
  const [weeklyEarnings, setWeeklyEarnings] = useState("500");
  const [isFactoryWorker, setIsFactoryWorker] = useState(false);
  const [calculation, setCalculation] = useState(null);

  const calculateMaternityLeave = () => {
    const averageWeeklyEarnings = parseFloat(weeklyEarnings);
    const dueDateObj = new Date(dueDate);
    const earliestStartDate = addWeeks(dueDateObj, -11);
    const compulsoryLeaves = isFactoryWorker ? 4 : 2;

    // Calculate pay
    const firstSixWeeksPay = averageWeeklyEarnings * 0.9 * 6;
    const remainingWeeksPay =
      Math.min(STATUTORY_WEEKLY_RATE, averageWeeklyEarnings * 0.9) * 33;
    const totalPay = firstSixWeeksPay + remainingWeeksPay;

    setCalculation({
      totalWeeks: MATERNITY_TOTAL_WEEKS,
      paidWeeks: MATERNITY_PAID_WEEKS,
      compulsoryLeaves,
      earliestStartDate,
      statutoryPay: {
        firstSixWeeks: firstSixWeeksPay,
        remainingWeeks: remainingWeeksPay,
        totalPay,
        weeklyRate: Math.min(
          STATUTORY_WEEKLY_RATE,
          averageWeeklyEarnings * 0.9
        ),
      },
    });
  };

  const calculatePaternityLeave = () => {
    const averageWeeklyEarnings = parseFloat(weeklyEarnings);
    const dueDateObj = new Date(dueDate);
    const deadlineDate = addDays(dueDateObj, PATERNITY_DEADLINE_WEEKS * 7);
    const weeklyPay = Math.min(
      STATUTORY_WEEKLY_RATE,
      averageWeeklyEarnings * 0.9
    );

    setCalculation({
      totalWeeks: PATERNITY_MAX_WEEKS,
      deadlineDate,
      statutoryPay: {
        weeklyRate: weeklyPay,
        totalPay: weeklyPay * PATERNITY_MAX_WEEKS,
      },
    });
  };

  const handleCalculate = () => {
    if (leaveType === "maternity") {
      calculateMaternityLeave();
    } else {
      calculatePaternityLeave();
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Parental Leave Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label>Leave Type</Label>
            <Select
              value={leaveType}
              onValueChange={(value) => setLeaveType(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select leave type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="maternity">Maternity Leave</SelectItem>
                <SelectItem value="paternity">Paternity Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="due-date">Expected Due Date</Label>
            <Input
              id="due-date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="weekly-earnings">Average Weekly Earnings (£)</Label>
            <Input
              id="weekly-earnings"
              type="number"
              value={weeklyEarnings}
              onChange={(e) => setWeeklyEarnings(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>

          {leaveType === "maternity" && (
            <div className="space-y-2">
              <Label>
                <Input
                  type="checkbox"
                  checked={isFactoryWorker}
                  onChange={(e) => setIsFactoryWorker(e.target.checked)}
                  className="mr-2"
                />
                Factory Worker
              </Label>
            </div>
          )}

          <Button onClick={handleCalculate}>Calculate Leave</Button>
        </div>

        {calculation && (
          <div className="mt-6 space-y-4 border-t pt-4">
            <h3 className="font-semibold">Calculation Results</h3>
            {leaveType === "maternity" ? (
              <div className="grid gap-2">
                <p>Total Leave Entitlement: {calculation.totalWeeks} weeks</p>
                <p>Paid Leave Period: {calculation.paidWeeks} weeks</p>
                <p>Compulsory Leave: {calculation.compulsoryLeaves} weeks</p>
                <p>
                  Earliest Start Date:{" "}
                  {format(calculation.earliestStartDate, "dd MMM yyyy")}
                </p>
                <p>
                  First 6 Weeks Pay: £
                  {calculation.statutoryPay.firstSixWeeks.toFixed(2)}
                </p>
                <p>
                  Remaining 33 Weeks Pay: £
                  {calculation.statutoryPay.remainingWeeks.toFixed(2)}
                </p>
                <p>
                  Total Statutory Pay: £
                  {calculation.statutoryPay.totalPay.toFixed(2)}
                </p>
                <p>
                  Weekly Rate (after 6 weeks): £
                  {calculation.statutoryPay.weeklyRate.toFixed(2)}
                </p>
              </div>
            ) : (
              <div className="grid gap-2">
                <p>Leave Entitlement: {calculation.totalWeeks} weeks</p>
                <p>
                  Must be taken by:{" "}
                  {format(calculation.deadlineDate, "dd MMM yyyy")}
                </p>
                <p>
                  Weekly Statutory Pay: £
                  {calculation.statutoryPay.weeklyRate.toFixed(2)}
                </p>
                <p>
                  Total Statutory Pay: £
                  {calculation.statutoryPay.totalPay.toFixed(2)}
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
