import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFetchQuery } from "@/hooks/use-query";
import { fetchCommonLeave } from "@/server/leaveServer/leaveServer";

import { EditIcon, EyeIcon, ScanSearchIcon } from "lucide-react";
import LeaveEntitlementTable from "./leave-table";

const EmployeeLeaveEntitlement = () => {
  const queryKey = ["leave-entitlement"];
  const { data, isLoading, isError } = useFetchQuery({
    queryKey,
    fetchFn: fetchCommonLeave,
  });

  const { newData } = data || {};

  return (
    <Card>
      <CardHeader>
        <CardTitle>Employee Leave Entitlement</CardTitle>
        <CardDescription>
          This is a list of all employee leave entitlements.
          {/* See all employee leaves if not already added so that you can add them. */}
        </CardDescription>
        <div className="flex items-center gap-2 text-xs pt-2 text-neutral-700">
          <span className="text-xs font-medium text-neutral-700">Note*:</span>
          {[
            { id: 1, title: "Update the Employee data", icon: EditIcon },
            { id: 2, title: "View Leave Entitlement", icon: EyeIcon },
            { id: 3, title: "Sync Leave", icon: ScanSearchIcon },
          ].map((item) => (
            <span key={item.id} className="flex gap-2 items-center">
              <span className="border p-1 rounded-md">
                <item.icon className="h-3 w-3" />
              </span>
              <span>{item.title}</span>
            </span>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <LeaveEntitlementTable
          newData={newData}
          isPending={isLoading}
          queryKey={queryKey}
        />
      </CardContent>
    </Card>
  );
};

export default EmployeeLeaveEntitlement;
