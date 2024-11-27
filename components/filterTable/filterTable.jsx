import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export const FilterDataTableHead = ({ attendanceData }) => {
  const tableHead = Object.keys(attendanceData[0] || "");
  return (
    <TableHeader>
      <TableRow>
        {tableHead.map((item, index) => (
          <TableHead className="uppercase text-xs" key={index}>
            {item}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};

export const FilterDataTableBody = ({ attendanceData }) => {
  if (!attendanceData || !Array.isArray(attendanceData)) {
    console.error("Error: attendanceData is not an array or is empty");
    return null;
  }
  return (
    <TableBody>
      {attendanceData.map((item, index) => (
        <TableRow key={index}>
          {Object.values(item).map((value, index) => (
            <TableCell className="text-sm" key={index}>
              {/* if value is date , format it */}
              {value instanceof Date ? value.toLocaleString() : value}
              {/* {value} */}
              {/* {item[key]} {item[key] === "Weekly" && " (CIS)"} */}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};
