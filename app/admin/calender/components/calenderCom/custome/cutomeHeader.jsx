import { format } from "date-fns";
import React from "react";

const CustomeHeader = ({ header }) => {
  return (
    <div className="h-10 flex items-center justify-center mb-2">
      <span
        className={`text-sm font-semibold ${
          format(new Date(), "dd EEE") === header?.label
            ? "text-indigo-700"
            : "text-neutral-700"
        } `}
      >
        {header?.label}
      </span>
    </div>
  );
};

export default CustomeHeader;
