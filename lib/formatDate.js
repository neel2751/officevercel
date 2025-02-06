import { format } from "date-fns";

export function formatDates(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (start.getFullYear() === end.getFullYear()) {
    return `${format(start, "MMM dd")} - ${format(end, "MMM dd, yyyy")}`;
  } else {
    return `${format(start, "MMM dd, yyyy")} - ${format(end, "MMM dd, yyyy")}`;
  }
}
