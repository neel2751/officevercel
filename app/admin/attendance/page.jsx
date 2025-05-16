import Gretting from "@/components/gretting/gretting";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import AttendanceTable from "./attendanceTable";

export default function page() {
  return (
    <div className="p-4 space-y-6">
      <Gretting />

      <Card>
        <CardHeader className="flex justify-between">
          <div>
            <CardTitle>Live Attedance</CardTitle>
            <CardDescription>
              View, & Edit the employee attendance deatils
            </CardDescription>
          </div>
          <Button asChild>
            <Link href={"/admin/scan"}>Open Scan</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <AttendanceTable />
        </CardContent>
      </Card>
    </div>
  );
}
