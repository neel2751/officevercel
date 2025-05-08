"use server";
import { authenticator } from "otplib";
import qrcode from "qrcode";
import { getServerSideProps } from "../session/session";

export async function generate2FA() {
  try {
    const { props } = await getServerSideProps();
    const { email } = props?.session?.user || {};
    if (!email) {
      return { success: false, message: "User not authenticated" };
    }
    // Generate a secret key for the user
    const secret = authenticator.generateSecret();
    // Set the issuer and account name for the OTP
    const user = email; // Replace with actual user ID
    const service = "HR Management"; // Replace with actual service name
    const otpauth = authenticator.keyuri(user, service, secret);
    const qrCodeUrl = await qrcode.toDataURL(otpauth);
    return { success: true, data: JSON.stringify({ secret, qrCodeUrl }) };
  } catch (error) {
    console.error("Error generating 2FA:", error);
    return { success: false, message: "Error generating 2FA" };
  }
}

export async function verify2FA(code, secret) {
  const isValid = authenticator.check(code, secret);
  return {
    success: isValid,
    message: isValid ? "Code is valid" : "Invalid code",
  };
}

export async function enable2FA(code, secret) {
  try {
    const { props } = await getServerSideProps();
    const { email, _id: employeeId } = props?.session?.user || {};
    if (!email) {
      return { success: false, message: "User not authenticated" };
    }
    // Logic to enable 2FA for the user
    if (!code) {
      return { success: false, message: "Code is required" };
    }
    // Verify the code
    const isValid = verify2FA(code, secret);
    if (!isValid) {
      return { success: false, message: "Invalid verification code" };
    }
    // This could involve updating a database record or similar
    const TwoFA = {
      employeeId,
      secret,
      isEnabled: true,
      isVerified: true,
      qrCodeUrl: "",
    };
    return { success: true, message: "2FA enabled successfully" };
  } catch (error) {
    console.error("Error enabling 2FA:", error);
    return { success: false, message: "Error enabling 2FA" };
  }
}

export async function disable2FA() {
  try {
    const { props } = await getServerSideProps();
    const { email } = props?.session?.user || {};
    if (!email) {
      return { success: false, message: "User not authenticated" };
    }
    // Logic to disable 2FA for the user
    // This could involve updating a database record or similar
    return { success: true, message: "2FA disabled successfully" };
  } catch (error) {
    console.error("Error disabling 2FA:", error);
    return { success: false, message: "Error disabling 2FA" };
  }
}
