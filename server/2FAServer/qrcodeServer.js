"use server";
import { getServerSideProps } from "../session/session";
import qrcode from "qrcode";
import jwt from "jsonwebtoken";
import OfficeEmployeeModel from "@/models/officeEmployeeModel";
import { createObjectId, isValidObjectId } from "@/lib/mongodb";
import ClockModel from "@/models/clockModel";
import { connect } from "@/db/db";
import { formatTime, normalizeDateToUTC } from "@/lib/formatDate";

export async function getQRCodeToken(expiresIn = "20s") {
  try {
    const { props } = await getServerSideProps();
    const { _id } = props.session.user;
    // we have to make our own token with expiration time using HMAC
    const jwtToken = await generateToken(_id, expiresIn);
    const response = await getQRCode(jwtToken);
    if (!response.success) {
      return { success: false, message: "Error generating QR code" };
    }
    const qrData = response.qrData;
    return { success: true, data: JSON.stringify({ qrData }) };
  } catch (error) {
    console.error("Error generating QR code:", error);
    return { success: false, message: "Error generating QR code" };
  }
}
export async function generateToken(userId, expiresIn) {
  return jwt.sign({ userId }, process.env.NEXTAUTH_SECRET, {
    expiresIn,
  });
}

export async function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);
    if (!decoded) return { success: false, message: "Invalid token" };
    return {
      success: true,
      employeeId: decoded.employeeId,
      action: decoded.action,
    };
  } catch (error) {
    console.error("Error verifying token:", error);
    return { success: false, message: "Invalid token" };
  }
}

export async function getCurrentTimeAndDate() {
  try {
    const currentDate = new Date();
    const date = normalizeDateToUTC(currentDate);
    const currentTime = formatTime(currentDate);
    return { success: true, date, currentTime };
  } catch (error) {
    console.error("Error getting current time:", error);
    return { success: false, message: "Error getting current time" };
  }
}

export async function storeClockTime(token) {
  try {
    const decode = await verifyToken(token);
    if (!decode.success) return decode;

    await connect();
    const employeeId = decode.employeeId;
    const action = decode.action;
    if (!employeeId || !action)
      return { success: false, message: "Invalid token" };

    const { success, date, currentTime } = await getCurrentTimeAndDate();
    if (!success) return { success: false, message: "Error getting time" };

    const isValidId = isValidObjectId(employeeId);
    if (!isValidId) return { success: false, message: "Invalid Employee Id" };

    const employeeOid = createObjectId(employeeId);

    const existing = await OfficeEmployeeModel.findById(employeeOid);
    if (!existing) return { success: false, message: "Employee not found" };

    const existingAttendance = await ClockModel.findOne({
      employeeId: employeeOid,
      date: date,
    });

    const MIN_BREAK_DURATION_MINUTES = 30;
    const MIN_WORK_HOURS_TO_CLOCK_OUT = 2;
    const MIN_BREAK_TIME_HOURS = 2;

    if (!existingAttendance && action !== "clockIn") {
      return { success: false, message: "You must clock in first." };
    }

    if (!existingAttendance && action === "clockIn") {
      await new ClockModel({
        employeeId: employeeOid,
        date: date,
        clockIn: currentTime,
        clockInStatus: true,
      }).save();
      return { success: true, message: "Clocked In", employeeId };
    }

    if (
      action === "breakIn" &&
      !existingAttendance.breakIn &&
      !existingAttendance.clockOut
    ) {
      const timeSinceClockIn =
        (currentTime - existingAttendance.clockIn) / (1000 * 60 * 60); // in hours

      if (timeSinceClockIn < MIN_BREAK_TIME_HOURS) {
        return {
          success: false,
          message: `Cannot take break within ${MIN_BREAK_TIME_HOURS} hours of clocking in.`,
        };
      }
      await ClockModel.updateOne(
        { employeeId: employeeOid, date: date },
        { $set: { breakIn: currentTime } }
      );
      return { success: true, message: "Break In", employeeId };
    }

    if (
      action === "breakOut" &&
      existingAttendance.breakIn &&
      !existingAttendance.breakOut &&
      !existingAttendance.clockOut
    ) {
      const breakDuration =
        (currentTime - existingAttendance.breakIn) / (1000 * 60); // in minutes
      if (breakDuration < MIN_BREAK_DURATION_MINUTES) {
        return {
          success: false,
          message: `Break must be at least ${MIN_BREAK_DURATION_MINUTES} minutes.`,
        };
      }

      await ClockModel.updateOne(
        { employeeId: employeeOid, date: date },
        { $set: { breakOut: currentTime } }
      );
      return { success: true, message: "Break Out", employeeId };
    }

    if (action === "clockOut" && !existingAttendance.clockOut) {
      const hoursSinceClockIn =
        (currentTime - existingAttendance.clockIn) / (1000 * 60 * 60); // in hours
      if (hoursSinceClockIn < MIN_WORK_HOURS_TO_CLOCK_OUT) {
        return {
          success: false,
          message: `You must work at least ${MIN_WORK_HOURS_TO_CLOCK_OUT} hours before clocking out.`,
        };
      }

      await ClockModel.updateOne(
        { employeeId: employeeOid, date: date },
        { $set: { clockOut: currentTime } }
      );

      const autoFlag =
        !existingAttendance.breakIn || !existingAttendance.breakOut;
      await ClockModel.updateOne(
        { employeeId: employeeOid, date: date },
        { $set: { clockInStatus: autoFlag } }
      );

      return {
        success: true,
        message: autoFlag ? "Clocked Out (No Break)" : "Clocked Out",
        employeeId,
      };
    }

    return {
      success: false,
      message: "Already clocked out or invalid action.",
    };
  } catch (error) {
    console.error("Error storing clock time:", error);
    return { success: false, message: "Error storing clock time" };
  }
}

// use Every where for the get the qr code accross the app
export async function getQRCode(data) {
  try {
    const options = {
      errorCorrectionLevel: "H",
      type: "image/jpeg",
      quality: 0.95,
      margin: 1,
      width: 200,
      color: {
        dark: "#010599FF",
        light: "#FFBF60FF",
      },
    };

    const qrData = await qrcode.toDataURL(data, options);
    return { success: true, qrData };
  } catch (error) {
    console.error("Error generating QR code:", error);
    return { success: false, message: "Error generating QR code" };
  }
}
