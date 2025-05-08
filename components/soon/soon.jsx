import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";

const Soon = () => {
  return (
    <div className="p-4 max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>
            Leave Management System{" "}
            <span className="bg-linear-to-tr from-indigo-600 to-rose-500 bg-clip-text text-transparent">
              (Comming Soon)
            </span>
          </CardTitle>
          <CardDescription>
            This feature is currently under development and will be available
            soon.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Image src={"/images/Soon.svg"} alt="" height={700} width={700} />
          <p>
            We are working hard to bring you the best experience. Please check
            back soon.
          </p>
          <Button className="mt-4">Under Review ✌️</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Soon;
