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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { differenceInWeeks } from "date-fns";

const STATUTORY_ANNUAL_LEAVE_DAYS = 28;
const STATUTORY_SICK_WEEKS = 28; // Maximum SSP weeks
const MATERNITY_WEEKS = 52;
const MATERNITY_PAID_WEEKS = 39;
const PATERNITY_WEEKS = 2;

export function LeaveEntitlementCalculator() {
  const [employmentType, setEmploymentType] = useState("Full-Time");
  const [hoursPerWeek, setHoursPerWeek] = useState("37.5");
  const [weeksPerYear, setWeeksPerYear] = useState("52");
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [isFactoryWorker, setIsFactoryWorker] = useState(false);
  const [calculation, setCalculation] = useState(null);

  const calculateLeaveEntitlements = () => {
    const startDateObj = new Date(startDate);
    const weeksWorked = differenceInWeeks(new Date(), startDateObj);
    const fullYearRatio = Math.min(weeksWorked / 52, 1);

    let annualLeave = STATUTORY_ANNUAL_LEAVE_DAYS;
    let sspEligibleWeeks = STATUTORY_SICK_WEEKS;

    // Calculate SSP eligibility and weeks
    const isEligibleForSSP = weeksWorked >= 4; // Need 4 weeks of employment
    if (!isEligibleForSSP) {
      sspEligibleWeeks = 0;
    }

    // Adjust annual leave based on employment type
    switch (employmentType) {
      case "Part-Time":
        const weekRatio = Number(hoursPerWeek) / 37.5;
        annualLeave = Math.round(STATUTORY_ANNUAL_LEAVE_DAYS * weekRatio);
        // SSP weeks remain the same for part-time workers
        break;

      case "Part-Year":
        const yearRatio = Number(weeksPerYear) / 52;
        annualLeave = Math.round(STATUTORY_ANNUAL_LEAVE_DAYS * yearRatio);
        // SSP weeks remain the same for part-year workers
        break;

      case "Irregular-Hours":
        const averageWeeklyHours = Number(hoursPerWeek);
        const weeklyAccrual = (averageWeeklyHours * 5.6) / 52;
        annualLeave = Math.round(weeklyAccrual * 52);
        // SSP weeks remain the same for irregular hours workers
        break;
    }

    // Calculate maternity/paternity based on eligibility (26 weeks continuous employment)
    const isEligibleForParental = weeksWorked >= 26;

    const result = {
      annual: {
        total: annualLeave,
        accrued: Math.round(annualLeave * fullYearRatio),
      },
      sick: {
        totalWeeks: STATUTORY_SICK_WEEKS,
        sspEligibleWeeks: sspEligibleWeeks,
        requiresFitNote: true, // Always true after 7 days
        sspEligible: isEligibleForSSP,
      },
      maternity: {
        total: isEligibleForParental ? MATERNITY_WEEKS : 0,
        paid: isEligibleForParental ? MATERNITY_PAID_WEEKS : 0,
        compulsory: isFactoryWorker ? 4 : 2,
      },
      paternity: {
        total: isEligibleForParental ? PATERNITY_WEEKS : 0,
        paid: isEligibleForParental ? PATERNITY_WEEKS : 0,
      },
    };

    setCalculation(result);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Leave Entitlement Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
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

          <div className="space-y-2">
            <Label className="flex items-center space-x-2">
              <Input
                type="checkbox"
                checked={isFactoryWorker}
                onChange={(e) => setIsFactoryWorker(e.target.checked)}
                className="w-4 h-4"
              />
              <span>Factory Worker</span>
            </Label>
          </div>

          <Button onClick={calculateLeaveEntitlements}>
            Calculate Entitlements
          </Button>
        </div>

        {calculation && (
          <div className="mt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Leave Type</TableHead>
                  <TableHead>Total Entitlement</TableHead>
                  <TableHead>Current Accrued/Eligible</TableHead>
                  <TableHead>Additional Information</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Annual Leave</TableCell>
                  <TableCell>{calculation.annual.total} days</TableCell>
                  <TableCell>{calculation.annual.accrued} days</TableCell>
                  <TableCell>Includes bank holidays</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Sick Leave (SSP)</TableCell>
                  <TableCell>
                    {calculation.sick.totalWeeks} weeks maximum
                  </TableCell>
                  <TableCell>
                    {calculation.sick.sspEligible
                      ? `${calculation.sick.sspEligibleWeeks} weeks eligible`
                      : "Not yet eligible"}
                  </TableCell>
                  <TableCell>
                    {calculation.sick.sspEligible
                      ? "Eligible for SSP after 3 waiting days, fit note required after 7 days"
                      : "Need 4 weeks service for SSP eligibility"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Maternity Leave</TableCell>
                  <TableCell>{calculation.maternity.total} weeks</TableCell>
                  <TableCell>
                    {calculation.maternity.paid > 0
                      ? `${calculation.maternity.paid} weeks paid`
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {calculation.maternity.total > 0
                      ? `${calculation.maternity.paid} weeks paid, ${calculation.maternity.compulsory} weeks compulsory`
                      : "Not eligible yet (need 26 weeks service)"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Paternity Leave</TableCell>
                  <TableCell>{calculation.paternity.total} weeks</TableCell>
                  <TableCell>
                    {calculation.paternity.paid > 0
                      ? `${calculation.paternity.paid} weeks paid`
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {calculation.paternity.total > 0
                      ? "Must be taken within 56 days of birth"
                      : "Not eligible yet (need 26 weeks service)"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
