import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useBankHoliday } from "@/lib/holiday";
import { format, isPast } from "date-fns";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

export const BankHoliday = () => {
  const { isLoading, isError, data } = useBankHoliday();

  // find the next bank holiday
  const nextBankHoliday = data?.find((holiday) => {
    return isPast(new Date(holiday?.date)) === false;
  });

  return (
    <div className="mt-4 space-y-2">
      {/* <p>Bank Holidays: {data?.length}</p> */}
      {/* Show list of bank holidays */}

      <ul className="grid grid-cols-4 gap-4">
        {data &&
          data?.map((holiday, index) => (
            <li key={index}>
              <Card className="group cursor-pointer">
                <CardHeader
                  className={`sm:ps-24 p-4 rounded-md overflow-hidden relative ${
                    isPast(new Date(holiday?.date))
                      ? "opacity-40"
                      : nextBankHoliday?.date === holiday?.date
                      ? ""
                      : "opacity-50"
                  }`}
                >
                  <div className="flex items-center gap-x-3">
                    <div className="hidden sm:block -start-0 -bottom-3 absolute">
                      {/* <div className="text-7xl">🏕️</div> */}
                      <Image
                        // in src after index is equal 8  image repeat again 1 to 8 index image
                        src={`/images/bankHoliday/${(index % 8) + 1}.svg`}
                        // src={`/images/bankHoliday/${index + 1}.svg`}
                        alt={holiday?.title}
                        width={80}
                        height={80}
                        className="group-hover:scale-110 transition duration-300"
                      />
                    </div>
                    <div className="grow space-y-1">
                      <CardTitle
                        className={`${
                          isPast(new Date(holiday?.date)) ? "text-gray-400" : ""
                        }`}
                      >
                        {holiday?.title}
                      </CardTitle>
                      <CardDescription>
                        {format(holiday?.date, "E, MMMM d, yyyy")}
                      </CardDescription>
                    </div>
                    {nextBankHoliday.date === holiday?.date && (
                      <StarIcon className="size-3 top-2 absolute right-2 fill-indigo-600 text-indigo-600" />
                      // <div className="text-xl">🌟 </div>
                    )}
                  </div>
                </CardHeader>
              </Card>
            </li>
          ))}
      </ul>
    </div>
  );
};
