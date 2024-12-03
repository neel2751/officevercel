"use server";
import { connect } from "@/db/db";
import OfficeEmployeeModel from "@/models/officeEmployeeModel";
import bcrypt from "bcryptjs";
import UserSession from "@/models/sessionModel";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/option";
import { signOut } from "next-auth/react";
import { sendMail } from "../email/email";

export const LoginData = async (email, password) => {
  if (!email || !password)
    return { status: false, message: "Please Provide  all details" };
  password = password.trim();
  email = email.trim();
  try {
    await connect();
    const foundData = await OfficeEmployeeModel.findOne({ email })
      .lean()
      .exec();
    if (!foundData)
      return {
        status: false,
        message: "Email  Not Found",
      };
    if (foundData.isActive === false || foundData.delete === true)
      return {
        status: false,
        message: "Your account is Inactive! Please contact Admin...",
      };
    // Check Password
    const isMatch = await isMatchedPassword(password, foundData.password);
    if (!isMatch)
      return {
        status: false,
        message: "Invalid Password! Try  Again...",
      };
    if (foundData?.isSuperAdmin) {
      foundData["role"] = "superAdmin";
    } else if (foundData?.isAdmin) {
      foundData["role"] = "admin";
    } else {
      foundData["role"] = "user";
    }
    delete foundData["password"];
    foundData["employeType"] = "OfficeEmploye";
    // store the login Token in to DB
    // const token = await storeToken(foundData);
    // if (token.success) {
    // foundData["loginToken"] = token.token;
    return {
      status: true,
      data: foundData,
    };
    // }
    // return {
    //   status: fal,
    //   data: foundData,
    // };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Something Went Wrong! Please Try Again...",
    };
  }
};

export const isMatchedPassword = async (password, hashword) => {
  try {
    // console.log(password, hashword);
    return await bcrypt.compareSync(password, hashword);
  } catch (error) {
    console.log(`Error in Matching Password ${error}`);
  }
};

export const storeSession = async (data) => {
  try {
    const {
      _id: userId,
      employeType: userType,
      platform,
      browser,
      device,
      query: ipAddress,
      country,
      city,
      zip,
      lat: latitude,
      lon: longitude,
      isp,
    } = data;
    const obj = {
      userId,
      userType,
      platform,
      browser,
      device,
      ipAddress,
      country,
      city,
      zip,
      latitude,
      longitude,
      isp,
    };
    const alreadyStore = await UserSession.findOne({ userId, ipAddress });
    if (alreadyStore) {
      const update = await UserSession.updateOne({ userId, ipAddress }, obj);
      if (update) {
        // await sendMail({ ...obj, email: data.email });
        return { status: true, message: "Session Updated" };
      }
    } else {
      const session = await UserSession.create(obj);
      if (session) {
        await sendMail({ ...obj, email: data.email });
        return { status: true };
      }
    }
    return { status: false, message: "Failed to store session" };
  } catch (error) {
    console.log(`Error in Storing Session ${error}`);
    return { status: false, message: "Failed to store session" };
  }
};

export const getSessionData = async () => {
  try {
    const session = await getServerSession(options);
    if (!session) return signOut();
    const user = await UserSession.findOne({ userId: session?.user?._id });
    if (!user) return signOut();
    return { status: true, data: JSON.stringify(user) };
  } catch (error) {}
};

// const storeToken = async (data) => {
//   try {
//     const loginToken = crypto.randomUUID();
//     const user = await OfficeEmployeeModel.findOne({ email: data.email });
//     if (!user) return { success: false, message: "User not found" };
//     const userId = await LoginTokenModel.findOne({ userId: user._id });
//     if (!userId) {
//       const token = await LoginTokenModel.create({
//         loginToken,
//         userId: user._id,
//       });
//       if (token) {
//         return { success: true, token: loginToken };
//       }
//     } else {
//       const update = await LoginTokenModel.updateOne(
//         { userId: user._id },
//         { loginToken }
//       );
//       if (update) {
//         return { success: true, token: loginToken };
//       }
//     }
//   } catch (error) {
//     console.log(`Error in Storing Token ${error}`);
//     return { success: false, message: "Failed to store token" };
//   }
// };

// export const handleSignOut = async () => {
//   try {
//     const { props } = await getServerSideProps();
//     const userId = props.session.user._id;
//     const loginToken = "";
//     const update = await LoginTokenModel.updateOne({ userId }, { loginToken });
//   } catch (error) {
//     console.log(`Error in SignOut ${error}`);
//   }
// };

// export function getClientFingerprint(req) {
//   const userAgent = req.headers["user-agent"] || "";
//   const ip =
//     req.headers["x-forwarded-for"] || req.connection.remoteAddress || "";
//   return `${userAgent}-${ip}`; // Simple fingerprint example
// }
