import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calculator,
  Computer,
  HeartPulse,
  HomeIcon,
  Plane,
  Plus,
} from "lucide-react";
import CardName from "../../_components/name";
import QRCodeSocket from "@/components/2FA/qrcodesocket";

export default function EmployeCard() {
  return (
    <div className="container mx-auto p-4 space-y-4">
      <CardName />
      <QRCodeSocket />
      <div className="grid grid-cols-2 gap-4">
        <div className=" border border-neutral-200 rounded-lg divide-y">
          <div className="px-4 py-2">
            <div className="flex  items-center justify-between">
              <CardTitle className="text-neutral-600 text-sm">
                Your Weekly Attendance
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Calculator className="text-neutral-500" />
                </Button>
                <Button size="sm" className="bg-indigo-700">
                  Request time off
                </Button>
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-start p-4">
              <div className="flex items-center text-neutral-500 text-sm gap-2 font-medium tracking-tight">
                <Computer className="h-4 w-4" />
                <span className="">Paid Time Off</span>
              </div>
              <div className="flex items-center text-neutral-500 text-sm gap-2 font-medium tracking-tight">
                <Plane className="h-4 w-4" />
                <span className="">Vacation</span>
              </div>
              <div className="flex items-center text-neutral-500 text-sm gap-2 font-medium tracking-tight">
                <HeartPulse className="h-4 w-4" />
                <span className="">Sick Leave</span>
              </div>
              <div className="flex items-center text-neutral-500 text-sm gap-2 font-medium tracking-tight">
                <HomeIcon className="h-4 w-4" />
                <span className="">Home Office</span>
              </div>
            </div>
            <div className="px-4 pb-2 flex items-start justify-between">
              <div className="space-x-1 text-indigo-700">
                <span className="text-lg font-semibold">98</span>
                <span className="text-neutral-500 text-xs font-medium">
                  hours available
                </span>
              </div>
              <div className="space-x-1 text-indigo-700">
                <span className="text-lg font-semibold">98</span>
                <span className="text-neutral-500 text-xs font-medium">
                  hours available
                </span>
              </div>
              <div className="space-x-1 text-indigo-700">
                <span className="text-lg font-semibold">98</span>
                <span className="text-neutral-500 text-xs font-medium">
                  hours available
                </span>
              </div>
              <div className="space-x-1 text-indigo-700">
                <span className="text-lg font-semibold">98</span>
                <span className="text-neutral-500 text-xs font-medium">
                  hours available
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Announcement */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Announcement</CardTitle>
                <CardDescription>
                  All a update project and meeting and workforce
                </CardDescription>
              </div>
              <Button variant="outline" size="icon">
                <Plus />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-indigo-800 text-start py-0.5 px-1 border border-indigo-700 border-s-4 rounded-lg w-full h-full flex relative cursor-pointer">
                <div className="px-4 py-2 divide-x divide-indigo-700/30 flex gap-6">
                  <div className="flex">
                    <div className="flex flex-col items-center text-xs">
                      <CardTitle className="text-lg">29</CardTitle>
                      June
                    </div>
                  </div>
                  <div className="flex ps-6">
                    <div className="flex flex-col text-xs">
                      <CardTitle className="text-base text-pretty">
                        Monthly Meeting 🔥🔥🔥
                      </CardTitle>
                      <CardDescription className="text-sm">
                        All a update project and meeting and workforce
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
