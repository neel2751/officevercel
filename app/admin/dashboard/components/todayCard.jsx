import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const TodayCard = ({ title, description, value, supportText }) => {
  return (
    <Card className="max-w-xs w-full" x-chunk="charts-01-chunk-6">
      <CardHeader className="p-4 pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription className="sm:block hidden">
          Today's attendance total{" "}
          {title.toLowerCase().split(" ").join("") === "totalhours"
            ? "Hours"
            : "Pays"}{" "}
          is listed below.
          {/* You're burning an average of 754 calories per day. Good job! */}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex sm:flex-row flex-col items-baseline gap-4 p-4 pt-2">
        <div className="flex items-baseline gap-2 text-2xl font-bold tabular-nums leading-none">
          {title.toLowerCase().split(" ").join("") === "totalhours"
            ? value
            : `£${value}`}
          {/* {value || 0} */}
          <span className="text-sm font-normal text-muted-foreground">
            {supportText}
          </span>
        </div>
        <Progress
          // value={Math.floor(value / 2)}
          value={Math.round(value) / 2 > 100 ? 90 : Math.round(value) / 2}
          className="bg-neutral-200"
        />
      </CardContent>
    </Card>
  );
};

export default TodayCard;
