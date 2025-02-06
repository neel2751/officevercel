"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { mockEmployees, mockLeaveEntitlements } from "@/data/mockData";

const allLeaveTypes = [
  "Annual",
  "Sick",
  "Maternity",
  "Paternity",
  "Compassionate",
];

export function EmployeeLeaveDetails() {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(
    mockEmployees[0].id
  );

  const selectedEmployee = useMemo(
    () => mockEmployees.find((emp) => emp.id === selectedEmployeeId),
    [selectedEmployeeId]
  );

  const employeeLeaveEntitlements = useMemo(() => {
    const entitlements = mockLeaveEntitlements.filter(
      (entitlement) => entitlement.employeeId === selectedEmployeeId
    );
    return allLeaveTypes.map((leaveType) => {
      const existingEntitlement = entitlements.find(
        (e) => e.type === leaveType
      );
      return (
        existingEntitlement || {
          employeeId: selectedEmployeeId,
          type: leaveType,
          total: 0,
          used: 0,
          remaining: 0,
        }
      );
    });
  }, [selectedEmployeeId]);

  const totalRemainingLeave = useMemo(
    () =>
      employeeLeaveEntitlements.reduce(
        (total, entitlement) => total + entitlement.remaining,
        0
      ),
    [employeeLeaveEntitlements]
  );

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4">Employee Leave Details</h2>
      <div className="mb-4">
        <Select
          value={selectedEmployeeId}
          onValueChange={(value) => setSelectedEmployeeId(value)}
        >
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Select an employee" />
          </SelectTrigger>
          <SelectContent>
            {mockEmployees.map((employee) => (
              <SelectItem key={employee.id} value={employee.id}>
                {employee.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {selectedEmployee && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedEmployee.name} - {selectedEmployee.department}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">
                Total Remaining Leave: {totalRemainingLeave} days
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Leave Entitlements</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Leave Type</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Used</TableHead>
                    <TableHead>Remaining</TableHead>
                    <TableHead>Usage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employeeLeaveEntitlements.map((entitlement) => (
                    <TableRow key={entitlement.type}>
                      <TableCell>{entitlement.type}</TableCell>
                      <TableCell>{entitlement.total} days</TableCell>
                      <TableCell>{entitlement.used} days</TableCell>
                      <TableCell>{entitlement.remaining} days</TableCell>
                      <TableCell className="w-[200px]">
                        <Progress
                          value={
                            entitlement.total > 0
                              ? (entitlement.used / entitlement.total) * 100
                              : 0
                          }
                          className="w-full"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
