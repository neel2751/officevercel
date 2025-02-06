import { AnimatedTooltip } from "@/components/animatedui/animated-tooltip";
import { Status } from "@/components/tableStatus/status";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCommonContext } from "@/context/commonContext";
import { format } from "date-fns";
import { Edit } from "lucide-react";
import React from "react";

const AssignSiteTable = () => {
  const { data, editInfo } = useCommonContext();
  const tabelHead = [
    "id",
    "sitename",
    "assign to",
    "sitestatus",
    "sitetype",
    "startDate",
    "action",
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {tabelHead.map((item, index) => (
            <TableHead className="uppercase text-xs font-medium" key={index}>
              {item}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{item?.siteInfo?.label}</TableCell>
            <TableCell>
              <AnimatedTooltip items={item?.employeeInfo} />
            </TableCell>
            <TableCell>
              <Status title={item?.siteInfo?.siteStatus} />
            </TableCell>
            <TableCell>{item?.siteInfo?.siteType || "-- NA --"}</TableCell>
            <TableCell>{format(item?.date, "PPP")}</TableCell>
            <TableCell className="hidden sm:table-cell text-sm text-neutral-600">
              <Button
                onClick={() => editInfo(item)}
                className="py-2 px-3 flex items-center justify-center"
              >
                <Edit className="size-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AssignSiteTable;
