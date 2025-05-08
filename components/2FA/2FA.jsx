"use client";

import { useState } from "react";
import { Shield, Copy } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useFetchQuery } from "@/hooks/use-query";
import { generate2FA, verify2FA } from "@/server/2FAServer/TwoAuthserver";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import Image from "next/image";

export function TwoFactorAuthCard({
  onEnableChange,
  className,
  defaultEnabled = false,
}) {
  const [enabled, setEnabled] = useState(defaultEnabled);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [showSetupDialog, setShowSetupDialog] = useState(false);
  const { data } = useFetchQuery({
    fetchFn: generate2FA,
    queryKey: ["generate2FA"],
  });
  const { qrCodeUrl, secret } = data?.newData || {};

  const handleToggleChange = async (checked) => {
    setLoading(true);

    try {
      // In a real app, this would call an API endpoint to enable/disable 2FA
      const result = onEnableChange ? await onEnableChange(checked) : true;

      if (result) {
        if (checked) {
          // If enabling 2FA, show the setup dialog
          setShowSetupDialog(true);
          // Don't update the state yet - we'll do that after setup is complete
        } else {
          // If disabling 2FA, update the state immediately
          setEnabled(false);
        }
      } else {
        throw new Error("Failed to update two-factor authentication status");
      }
    } catch (err) {
      console.error("Error toggling 2FA:", err);
      // Revert the toggle if there was an error
      setEnabled(!checked);
    } finally {
      setLoading(false);
    }
  };

  const onComplete = async () => {
    // TODO: Verify the code with the server
    console.log("Verification code submitted:", code);
    const response = await verify2FA(code, secret);
    if (response.success) {
      setEnabled(true);
      toast.success("Two-factor authentication enabled successfully");
    } else {
      toast.error("Invalid verification code");
    }
  };

  const copySecretKey = () => {
    navigator.clipboard.writeText(secret);
    toast.success("Secret key copied to clipboard");
  };

  return (
    <>
      <Card
        className={cn(
          "w-full max-w-md transition-all duration-300",
          enabled ? "border-primary shadow-md" : "border-muted",
          className
        )}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex flex-row items-center space-x-2">
            <Shield
              className={cn(
                "h-5 w-5",
                enabled ? "text-primary" : "text-muted-foreground"
              )}
            />
            <div>
              <CardTitle className="text-xl">
                Two-Factor Authentication
              </CardTitle>
              <CardDescription className="mt-1">
                Add an extra layer of security to your account
              </CardDescription>
            </div>
          </div>
          <Badge
            variant={enabled ? "default" : "outline"}
            className={cn(
              "transition-all",
              enabled
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground"
            )}
          >
            {enabled ? "Enabled" : "Disabled"}
          </Badge>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="toggle-2fa" className="text-sm font-medium">
              {enabled ? "2FA is active" : "2FA is inactive"}
            </Label>
            <Switch
              id="toggle-2fa"
              checked={enabled}
              onCheckedChange={handleToggleChange}
              disabled={loading}
              aria-label="Toggle two-factor authentication"
            />
          </div>
        </CardContent>
        <CardFooter className="pt-2 text-sm text-muted-foreground">
          {enabled ? (
            <p>
              Your account is protected with two-factor authentication. You'll
              need to enter a verification code from your authenticator app when
              you sign in.
            </p>
          ) : (
            <p>
              Protect your account with two-factor authentication. You'll need
              to enter a verification code from your authenticator app when you
              sign in.
            </p>
          )}
        </CardFooter>
      </Card>

      <Dialog open={showSetupDialog} onOpenChange={setShowSetupDialog}>
        <DialogContent className="w-full max-w-2xl max-h-screen overflow-y-auto bg-white rounded-lg shadow-lg p-6 sm:max-w-md md:max-w-lg lg:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Setup Authenticator App
            </DialogTitle>
            <DialogDescription>
              Each time you log in, in addition to your password, you'll use an
              authenticator app to generate a one-time code.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium flex items-center gap-2">
                <span className="inline-flex items-center justify-center rounded-full bg-primary/10 text-primary h-5 w-5 text-xs">
                  1
                </span>
                Scan QR code
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Scan the QR code below or manually enter the secret key into
                your authenticator app.
              </p>

              <div className="mt-4 flex flex-col items-center space-y-4">
                <div className="border p-4 rounded-md bg-white">
                  <Image
                    src={qrCodeUrl}
                    alt="QR Code for 2FA setup"
                    className="w-48 h-48 object-contain"
                    width={192}
                    height={192}
                  />
                </div>

                <div className="w-full">
                  <p className="text-sm text-muted-foreground mb-1">
                    Can't scan QR code?
                  </p>
                  <p className="text-sm mb-1">Enter this secret instead:</p>
                  <div className="flex items-center space-x-2">
                    <div className="bg-muted p-2 rounded text-sm font-mono w-full">
                      {secret}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copySecretKey}
                      aria-label="Copy secret key"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium flex items-center gap-2">
                <span className="inline-flex items-center justify-center rounded-full bg-primary/10 text-primary h-5 w-5 text-xs">
                  2
                </span>
                Get verification Code
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Enter the 6-digit code you see in your authenticator app.
              </p>

              <div className="mt-4">
                <Label htmlFor="code-input-0" className="sr-only">
                  Enter verification code
                </Label>
                <div className="flex justify-center gap-2">
                  <InputOTP
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS}
                    name="code"
                    value={code}
                    onChange={(value) => setCode(value)}
                    onComplete={onComplete}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator className="text-neutral-400" />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="flex">
            <DialogClose asChild>
              <Button variant="outline" onClick={() => setEnabled(false)}>
                Cancel
              </Button>
            </DialogClose>
            <Button>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
