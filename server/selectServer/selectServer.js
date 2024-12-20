"use server";

import { connect } from "@/db/db";
import AttendanceCategoryModel from "@/models/attendanceCategoryModel";
import CompanyModel from "@/models/companyModel";
import EmployeModel from "@/models/employeModel";
import OfficeEmployeeModel from "@/models/officeEmployeeModel";
import RoleTypesModel from "@/models/roleTypeModel";
import ProjectSiteModel from "@/models/siteProjectModel";

export const getSelectRoleType = async () => {
  try {
    await connect();
    // we have to create index on roleTypeModel
    // const indexes = await RoleTypesModel.collection.listIndexes().toArray();
    // mongoose.set("debug", true);
    // const check = await RoleTypesModel.collection.getIndexes();
    await RoleTypesModel.collection.createIndex({
      delete: 1,
      isActive: 1,
    });
    const roles = await RoleTypesModel.aggregate([
      {
        $match: { delete: false, isActive: true }, // Filters documents where delete is false
      },
      {
        $project: {
          _id: 0,
          value: "$_id", // Renames `_id` to `value`
          label: "$roleTitle", // Renames `roleTitle` to `name`
        },
      },
    ]).exec();
    if (!roles || roles.length === 0) {
      return { success: false, message: "No Data Found" };
    } else {
      const roleData = JSON.stringify(roles);
      const data = {
        success: true,
        data: roleData,
      };
      return data;
    }
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error Occured" };
  }
};

export const getSelectProjects = async () => {
  try {
    // await connect();
    const roles = await ProjectSiteModel.aggregate([
      {
        $match: { siteDelete: false, isActive: true }, // Filters documents where delete is false
      },
      {
        $project: {
          _id: 0,
          value: "$_id", // Renames `_id` to `value`
          label: "$siteName", // Renames `roleTitle` to `name`
        },
      },
    ]).exec();
    if (!roles || roles.length === 0) {
      return { success: false, message: "No Data Found" };
    } else {
      const roleData = JSON.stringify(roles);
      const data = {
        success: true,
        data: roleData,
      };
      return data;
    }
  } catch (err) {
    console.log(err);
    return { status: false, message: "Error Occured" };
  }
};

export const getSelectOfficeEmployee = async () => {
  try {
    // await connect();
    const roles = await OfficeEmployeeModel.aggregate(
      [
        {
          $match: { delete: false, isActive: true },
        },
        {
          $project: {
            _id: 0,
            value: "$_id",
            label: "$name",
          },
        },
        {
          $sort: {
            label: 1,
          },
        },
      ]
      // { allowDiskUse: true }
    ).exec();
    if (!roles || roles.length === 0) {
      return { success: false, message: "No Data Found" };
    } else {
      const roleData = JSON.stringify(roles);
      const data = {
        success: true,
        data: roleData,
      };
      return data;
    }
  } catch (error) {
    console.log(error);
    return { status: false, message: "Error Occured" };
  }
};

export const getSelectEmployee = async () => {
  try {
    // await connect();
    const roles = await EmployeModel.aggregate(
      [
        {
          $match: { delete: false, isActive: true },
        },
        {
          $project: {
            _id: 0,
            value: "$_id",
            label: { $concat: ["$firstName", " ", "$lastName"] },
          },
        },
        {
          $sort: {
            label: 1,
          },
        },
      ]
      // { allowDiskUse: true }
    ).exec();
    if (!roles || roles.length === 0) {
      return { success: false, message: "No Data Found" };
    } else {
      const roleData = JSON.stringify(roles);
      const data = {
        success: true,
        data: roleData,
      };
      return data;
    }
  } catch (error) {
    console.log(error);
    return { status: false, message: "Error Occured" };
  }
};

export const getSelectCompanies = async () => {
  try {
    // await connect();
    const company = await CompanyModel.aggregate([
      {
        $match: { delete: false, isActive: true }, // Filters documents where delete is false
      },
      {
        $project: {
          _id: 0,
          value: "$_id", // Renames `_id` to `value`
          label: "$name", // Renames `roleTitle` to `name`
        },
      },
    ]).exec();
    if (!company || company?.length === 0) {
      return { success: false, message: "No Data Found" };
    } else {
      const roleData = JSON.stringify(company);
      const data = {
        success: true,
        data: roleData,
      };
      return data;
    }
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error Occured" };
  }
};

export const getSelectAttendanceCategory = async () => {
  try {
    const categories = await AttendanceCategoryModel.aggregate([
      {
        $match: { isDeleted: false, isActive: true }, // Filters documents where delete is false
      },
      {
        $project: {
          _id: 0,
          value: "$attendanceCategoryValue", // Renames `_id` to `value`
          label: "$attendanceCategoryName", // Renames `roleTitle` to `name`
        },
      },
    ]).exec();
    if (!categories || categories.length === 0) {
      return { success: false, message: "No Data Found" };
    } else {
      const data = {
        success: true,
        data: JSON.stringify(categories),
      };
      return data;
    }
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error Occured" };
  }
};
