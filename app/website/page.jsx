"use client";
import { TwoFactorAuthCard } from "@/components/2FA/2FA";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const queryClient = new QueryClient();

export default function page() {
  return (
    <QueryClientProvider client={queryClient}>
      <TwoFactorAuthCard />
    </QueryClientProvider>
  );
}
