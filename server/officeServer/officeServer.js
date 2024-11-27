"use server";
import { connect } from "@/db/db";
import OfficeEmployeeModel from "@/models/officeEmployeeModel";
import bcrypt from "bcryptjs";

export const handleOfficeEmployee = async (data) => {
  // check if email and phone  already exist in db
  if (!data) return { success: false, message: "No Data Provided" };
  const id = data?._id;
  try {
    if (id) {
      // update an existing office employee
      const updatedEmp = await OfficeEmployeeModel.findOne({ _id: id }).exec();
      if (!updatedEmp) {
        return { success: false, message: "Employee Not Found" };
      }
      // checking  for unique fields both email and phone
      const hasSameEmail = await OfficeEmployeeModel.findOne({
        email: data.email,
        delete: false, // only check for active employees
        _id: { $ne: id },
      }).exec();
      const hasSamePhone = await OfficeEmployeeModel.findOne({
        phoneNumber: data.phoneNumber,
        delete: false, // only check for active employees
        _id: { $ne: id },
      }).exec();
      if (hasSameEmail || hasSamePhone) {
        throw new Error("This Email or Phone Number is Already In Use");
      }
      // check password is hash or not
      const mayBeHash = await isPossibleBcryptHash(data.password);
      if (mayBeHash) {
        Object.assign(updatedEmp, data);
      } else {
        const hashPass = await GenerateHashPassword(data.password);
        Object.assign(updatedEmp, data, { password: hashPass }); // update the existing employee
      }
      const updatedData = await updatedEmp.save();
      if (!updatedData)
        return { success: false, message: "Error Updating Employee" };
      return { success: true, data: JSON.stringify(updatedData) };
    } else {
      const { email, phoneNumber, password } = data;
      const hashPass = await GenerateHashPassword(password);
      await connect();
      let userExist = await OfficeEmployeeModel.findOne({
        delete: false, // only check for active employees
        $or: [{ email }, { phoneNumber }],
      });
      if (!userExist) {
        const newUser = new OfficeEmployeeModel({
          ...data,
          password: hashPass,
        });
        const result = await newUser.save();
        if (!result)
          return {
            success: false,
            message: "Failed to create office Employee",
          };
        return {
          success: true,
          message: "Successfully added office employee",
          data: JSON.stringify(result),
        };
      } else {
        // throw new Error("This Email or Phone Number is Already In Use");
        return {
          success: false,
          message: "Email or Phone number is already taken",
        };
      }
    }
  } catch (error) {
    console.log(error.message);
    return error;
    // return {
    //   success: false,
    //   error: "Failed to create office employee",
    // };
  }
  // const isExists = await OfficeEmployeeModel.findOne({ email }).lean().exec();
};

export const getOfficeEmployee = async (filterData) => {
  try {
    await connect();
    const sanitizedSearch = filterData?.query?.trim() || ""; // Ensure search is a string
    // const searchRegex = new RegExp(sanitizedSearch, "i"); // Create a case-ins ensitive regex
    const validPage = parseInt(filterData?.page || 1);
    const validLimit = parseInt(filterData?.pageSize || 10);
    const roleTypeFilter = filterData.filter;
    const skip = (validPage - 1) * validLimit;
    const query = { delete: false };
    if (roleTypeFilter) {
      query.roleType = roleTypeFilter;
    }
    if (sanitizedSearch) {
      query.$or = [
        { name: { $regex: sanitizedSearch, $options: "i" } },
        { email: { $regex: sanitizedSearch, $options: "i" } },
        // { phoneNumber: { $regex: sanitizedSearch, $options: "i" } },
      ];
    }
    const totalCountDocuments = await OfficeEmployeeModel.countDocuments(query);
    const result = await OfficeEmployeeModel.find(query)
      .populate("roleType", "roleTitle")
      .skip(skip)
      .limit(validLimit)
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    if (totalCountDocuments === 0) {
      return {
        success: false,
        message: "No office employee found",
        data: JSON.stringify([]),
        totalCount: 0,
      };
    }
    return {
      success: true,
      data: JSON.stringify(result),
      totalCount: totalCountDocuments,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to get office employee",
      data: JSON.stringify([]),
      totalCount: 0,
    };
  }
};

export const getEmployeById = async (empId) => {
  if (!empId) return { success: false, message: "No Employee Id Provided" };
  try {
    const response = await OfficeEmployeeModel.findOne({ _id: empId });
    if (!response)
      return {
        success: false,
        message: `Employee not found with the provided Id ${empId}`,
      };
    return { success: true, data: JSON.stringify(response) };
  } catch (error) {
    return { success: false, message: "Server error" };
  }
};

export const isPossibleBcryptHash = async (password) => {
  const bcryptPattern = /^\$2[ay]\$\d+\$[0-9a-zA-Z./]+$/;
  return bcryptPattern.test(password);
};

export const GenerateHashPassword = async (password) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
  } catch (error) {
    console.log("Error hashing password: ", error);
  }
};
