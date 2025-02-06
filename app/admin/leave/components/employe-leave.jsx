"use client";

import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  mockEmployees,
  mockLeaveEntitlements,
  mockLeaveRequests,
} from "@/data/mockData";

export function EmployeeLeaveOverview() {
  const [selectedLeaveType, setSelectedLeaveType] = useState("All");

  const employeeLeaveData = useMemo(() => {
    return mockEmployees.map((employee) => ({
      employee,
      leaveRequests: mockLeaveRequests.filter(
        (request) => request.employeeId === employee.id
      ),
      leaveEntitlements: mockLeaveEntitlements.filter(
        (entitlement) => entitlement.employeeId === employee.id
      ),
    }));
  }, []);

  const filteredEmployeeLeaveData = useMemo(() => {
    if (selectedLeaveType === "All") {
      return employeeLeaveData;
    }
    return employeeLeaveData.map((data) => ({
      ...data,
      leaveRequests: data.leaveRequests.filter(
        (request) => request.leaveType === selectedLeaveType
      ),
      leaveEntitlements: data.leaveEntitlements.filter(
        (entitlement) => entitlement.type === selectedLeaveType
      ),
    }));
  }, [employeeLeaveData, selectedLeaveType]);

  const totalRemainingLeave = useMemo(() => {
    return filteredEmployeeLeaveData.reduce((total, data) => {
      const remainingLeave = data.leaveEntitlements.reduce(
        (sum, entitlement) => sum + entitlement.remaining,
        0
      );
      return total + remainingLeave;
    }, 0);
  }, [filteredEmployeeLeaveData]);

  const leaveTypes = [
    "Annual",
    "Sick",
    "Maternity",
    "Paternity",
    "Compassionate",
  ];

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4">Employee Leave Overview</h2>
      <div className="mb-4 flex justify-between items-center">
        <Select
          value={selectedLeaveType}
          onValueChange={(value) => setSelectedLeaveType(value || "All")}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Leave Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Leave Types</SelectItem>
            {leaveTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Card>
          <CardHeader className="py-2">
            <CardTitle>Total Remaining Leave</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalRemainingLeave} days</p>
          </CardContent>
        </Card>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Leave Type</TableHead>
            <TableHead>Total Entitlement</TableHead>
            <TableHead>Used</TableHead>
            <TableHead>Remaining</TableHead>
            <TableHead>Pending Requests</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredEmployeeLeaveData.map(
            ({ employee, leaveRequests, leaveEntitlements }) =>
              leaveEntitlements.map((entitlement) => (
                <TableRow key={`${employee.id}-${entitlement.type}`}>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{entitlement.type}</TableCell>
                  <TableCell>{entitlement.total}</TableCell>
                  <TableCell>{entitlement.used}</TableCell>
                  <TableCell>{entitlement.remaining}</TableCell>
                  <TableCell>
                    {
                      leaveRequests.filter(
                        (request) =>
                          request.leaveType === entitlement.type &&
                          request.status === "Pending"
                      ).length
                    }
                    {leaveRequests
                      .filter(
                        (request) =>
                          request.leaveType === entitlement.type &&
                          request.status === "Pending"
                      )
                      .map((request) => (
                        <Badge
                          key={request.id}
                          variant="outline"
                          className="ml-2"
                        >
                          {new Date(request.startDate).toLocaleDateString()} -{" "}
                          {new Date(request.endDate).toLocaleDateString()}
                        </Badge>
                      ))}
                  </TableCell>
                </TableRow>
              ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
