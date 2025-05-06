"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Check, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { CardDescription, CardTitle } from "../ui/card";

export default function PasswordChange() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // check the new password and current password
  const checkPassword = () => {
    if (newPassword !== confirmPassword) {
      toast.error("new password and confirm password are not the same");
      return false;
    }
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkPassword()) {
      // send the new password to the server
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      // Here you would typically make an API call to change the password
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <CardTitle>Change Password</CardTitle>
        <CardDescription>
          Enter your current password and a new password to change your
          password.
        </CardDescription>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
        <div className="space-y-2">
          <Label htmlFor="current-password">Current Password</Label>
          <div className="relative">
            <Input
              id="current-password"
              type={showCurrentPassword ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="pr-10"
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showCurrentPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
              <span className="sr-only">
                {showCurrentPassword ? "Hide password" : "Show password"}
              </span>
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="new-password">New Password</Label>
          <div className="relative">
            <Input
              id="new-password"
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="pr-10"
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
              <span className="sr-only">
                {showNewPassword ? "Hide password" : "Show password"}
              </span>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Password must be at least 8 characters long and include at least one
            uppercase letter, one lowercase letter, one number, and one special
            character.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm New Password</Label>
          <div className="relative">
            <Input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pr-10"
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
              <span className="sr-only">
                {showConfirmPassword ? "Hide password" : "Show password"}
              </span>
            </Button>
          </div>
        </div>

        <Button type="submit" className="mt-4">
          Update Password
        </Button>
      </form>
    </div>
  );
}
