import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

const CustomeToolbar = ({ toolbar }) => {
  return (
    <div className="flex justify-between items-center mb-5">
      <div className="flex -space-x-px">
        <Button
          type="button"
          onClick={() => toolbar?.onNavigate("PREV")}
          variant="ghost"
          className=" border border-neutral-300 rounded-e-none"
          size="sm"
        >
          <ChevronLeft />
        </Button>
        <Button
          type="button"
          onClick={() => toolbar?.onNavigate("TODAY")}
          variant="ghost"
          size="sm"
          className="border border-neutral-300 rounded-none"
        >
          Today
        </Button>
        <Button
          type="button"
          onClick={() => toolbar?.onNavigate("NEXT")}
          variant="ghost"
          size="sm"
          className="rounded-s-none border border-neutral-300"
        >
          <ChevronRight />
        </Button>
      </div>
      <CardTitle className="text-sm">{toolbar?.label}</CardTitle>
      <div className="border border-neutral-300 divide-neutral-300 divide-x rounded-md">
        {toolbar?.views?.map((item) => (
          <Button
            type="button"
            onClick={() => toolbar?.onView(item)}
            variant={item === toolbar?.view ? "secondary" : "ghost"}
            size="sm"
            className={`first-of-type:rounded-s-md last-of-type:rounded-e-md rounded-none capitalize`}
            key={item}
          >
            {item}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CustomeToolbar;
