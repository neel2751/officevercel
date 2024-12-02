"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ReactHookForm from "@/components/form/reactHookForm";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

export const LOGINFIELD = [
  {
    name: "email",
    labelText: "Email Address",
    type: "email",
    helperText: "*Please enter a valid email address.",
    placeholder: "Enter your email",
    inputMode: "email",
    size: true,
    validationOptions: {
      required: "Email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email format. Please check and try again.",
      },
    },
  },
  {
    name: "password",
    labelText: "Password",
    type: "password",
    placeholder: "******",
    size: true,
    validationOptions: {
      required: "password is required",
      minLength: {
        value: 6,
        message: "Minimum length should be 6 characters",
      },
    },
  },
];

export const LoginUi = () => {
  const [resetFlag, setResetFlag] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [formError, setFormError] = useState(""); // State to hold form-specific errors

  const searchParams = useSearchParams();
  const callback = searchParams.get("callbackUrl");
  const { status } = useSession();

  const callBackcheck = callback || process.env.NEXTAUTH_URL || "/";

  useEffect(() => {
    if (status === "authenticated") {
      if (window.location.href !== callBackcheck) {
        window.location.href = callBackcheck;
      }
    }
  }, [status, callBackcheck]);

  const handleSubmit = async (data) => {
    setFormError(""); // Reset form error before submission
    try {
      const res = await signIn("credentials", {
        redirect: false, // Prevent automatic page reload
        email: data.email,
        password: data.password,
      });

      if (res?.error) {
        setFormError(res.error); // Set the error to display below the form
        toast.error(res.error); // Optionally show a toast notification
      } else {
        window.location.href = res.url || callBackcheck || "/";
      }
    } catch (err) {
      console.error("Error during login:", err);
      setFormError("An unexpected error occurred. Please try again.");
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-sm mx-auto px-4 mt-36">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Image
              height={20}
              width={20}
              className="h-10 w-10"
              src="/images/cdc.svg"
              alt="CDC"
            />
            <span className="text-gray-800 font-semibold text-lg">
              Creative Design & Construction
            </span>
          </div>
          <div className=" flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6">
            Login
          </div>
        </CardHeader>
        <CardContent>
          <ReactHookForm
            fields={LOGINFIELD}
            resetFlag={resetFlag}
            setResetFlag={setResetFlag}
            onSubmit={handleSubmit}
            initialValues={initialValues}
            btnName={"Login"}
          />
        </CardContent>
      </Card>
    </div>
  );
};
