"use server";

import AttendanceModel from "@/models/attendanceModel";
import EmployeModel from "@/models/employeModel";
import { parseISO, startOfDay } from "date-fns";
import mongoose from "mongoose";

export async function fetchEmployeAttendanceDataWithDateRange(filterData) {
  const validPage = parseInt(filterData?.page || 1);
  const validLimit = parseInt(filterData?.pageSize || 10);
  const skip = (validPage - 1) * validLimit;

  const startDate = filterData?.date?.from || new Date(); // Default start date
  const endDate = filterData?.date?.to || new Date(); // Default end date
  const sanitizedSearch = filterData?.query?.trim() || "";
  const paymentType = filterData?.paymentType || "All";
  const employeId = filterData?.employeeId || [];
  const employeIdArray = employeId.map((id) => new mongoose.Types.ObjectId(id));

  const aggregationPipeline = [
    // Match on date range
    {
      $match: {
        "employeAttendance.aDate": {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },

    // Unwind attendance data
    { $unwind: "$employeAttendance" },

    // Add filters dynamically

    // Lookup to join employee data
    {
      $lookup: {
        from: "employes",
        localField: "employeAttendance.employeeId",
        foreignField: "_id",
        as: "employeeData",
      },
    },

    // Unwind employee data
    { $unwind: "$employeeData" },

    // Add full name field for better search capability
    {
      $addFields: {
        fullName: {
          $concat: ["$employeeData.firstName", " ", "$employeeData.lastName"],
        },
      },
    },
    {
      $match: {
        ...(paymentType !== "All" && {
          "employeeData.paymentType": paymentType,
        }),
        ...(employeIdArray.length > 0 && {
          "employeAttendance.employeeId": { $in: employeIdArray },
        }),
      },
    },
    // Match on sanitizedSearch if provided
    ...(sanitizedSearch
      ? [
          {
            $match: {
              $or: [
                {
                  "employeeData.firstName": {
                    $regex: sanitizedSearch,
                    $options: "i",
                  },
                },
                {
                  "employeeData.lastName": {
                    $regex: sanitizedSearch,
                    $options: "i",
                  },
                },
                { fullName: { $regex: sanitizedSearch, $options: "i" } },
              ],
            },
          },
        ]
      : []),

    // Sort by date
    { $sort: { "employeAttendance.aDate": -1 } },

    // Facet for pagination and total count
    {
      $facet: {
        paginatedResults: [
          { $skip: skip },
          { $limit: validLimit },
          {
            $project: {
              _id: 0,
              name: "$fullName",
              paymentType: "$employeeData.paymentType",
              payRate: "$employeeData.payRate",
              oldPayRate: "$employeAttendance.aPayRate",
              totalHours: "$employeAttendance.totalHours",
              totalPay: "$employeAttendance.totalPay",
              date: "$employeAttendance.aDate",
            },
          },
        ],
        totalCount: [{ $count: "count" }],
      },
    },
  ];
  const result = await AttendanceModel.aggregate(aggregationPipeline);

  // Extract results and total count
  const paginatedResults = result[0]?.paginatedResults || [];
  const totalCount = result[0]?.totalCount[0]?.count || 0;
  return { data: JSON.stringify(paginatedResults), totalCount };
}

export async function attendanceData(date, keyword) {
  try {
    // Query for attendance records within the entire day range
    const attendanceRecords = await AttendanceModel.find({
      // we find site id and date as well
      attendanceDate: startOfDay(date),
    });

    // Continue with the rest of your code logic
    const employeeAttendanceMap = new Map();
    attendanceRecords.forEach((record) => {
      record.employeAttendance.forEach((attendee) => {
        const {
          employeeId,
          totalPay,
          totalHours,
          hours,
          breakHours,
          extraHours,
          aPayRate,
          note,
        } = attendee;

        // Update the employee map with attendance data
        employeeAttendanceMap.set(employeeId.toString(), {
          totalPay,
          totalHours,
          hours,
          breakHours,
          extraHours,
          aPayRate,
          note,
        });
      });
    });

    let employees;

    if (keyword) {
      // Search employees by keyword
      employees = await EmployeModel.find({
        $or: [
          { firstName: { $regex: String(keyword), $options: "i" } },
          { lastName: { $regex: String(keyword), $options: "i" } },
        ],
      });
    } else {
      // Fetch all active employees with valid eVisa
      // employees = await EmployeModel.find(
      //   { eVisaExp: { $gte: new Date() }, isActive: true },
      //   { _id: 1, payRate: 1, firstName: 1, lastName: 1, paymentType: 1 }
      // );

      employees = await EmployeModel.find(
        {
          isActive: true,
          $or: [
            { employeeType: "British", endDate: { $gte: new Date() } }, // Check endDate for British employees
            {
              employeeType: { $ne: "British" },
              eVisaExp: { $gte: new Date() },
            }, // Check eVisaExp for others
          ],
        },
        { _id: 1, payRate: 1, firstName: 1, lastName: 1, paymentType: 1 }
      );
    }

    // Combine employees with attendance data
    const employeesWithData = employees.map((employee) => {
      const employeeId = employee._id.toString();
      const {
        totalPay = 0,
        hours = 0,
        breakHours = 0,
        extraHours = 0,
        totalHours = 0,
        note = "No Note",
      } = employeeAttendanceMap.get(employeeId) || {};

      return {
        ...employee.toObject(),
        totalPay,
        totalHours,
        hours,
        breakHours,
        extraHours,
        note,
      };
    });
    // Final result to return
    const result = {
      status: true,
      count: employeesWithData.length,
      data: JSON.stringify(employeesWithData),
    };
    return result;
  } catch (error) {
    console.error("Error fetching attendance or employee data:", error);
    return { status: false, message: "Error fetching data", error };
  }
}

export const addAttendance = async (data, editableRows, siteId) => {
  const dateToString = data?.aDate;
  const normalizedDate = startOfDay(dateToString);

  try {
    if (!data)
      return {
        status: false,
        message: "Somthing went wrong Please try again.",
      };
    if (!editableRows) return { status: false, message: "No rows selected" };
    const { hours, breakHours, extraHours, note } = data;
    const [newId, edata] = Object.entries(editableRows)[0];
    const { totalHours, totalPay, payRate } = edata;
    const employeAttendance = {
      employeeId: newId,
      hours,
      breakHours,
      extraHours,
      aDate: normalizedDate,
      totalHours,
      totalPay,
      aPayRate: payRate,
      isPresent: true,
      note,
    };
    let attendanceRecord = await AttendanceModel.findOne({
      attendanceDate: normalizedDate,
      siteId,
    }).exec();
    if (!attendanceRecord) {
      attendanceRecord = new AttendanceModel({
        attendanceDate: normalizedDate,
        siteId,
        employeAttendance,
      });
    }
    // Find employee attendance record within the found or newly created attendance record
    const employeeAttendanceRecord = attendanceRecord.employeAttendance.find(
      (record) => record.employeeId.toString() === newId.toString()
    );
    // Update existing employee's information in the array
    if (employeeAttendanceRecord) {
      // If employee attendance record found, update it
      Object.assign(employeeAttendanceRecord, employeAttendance);
    } else {
      // If employee attendance record not found, create a new record under the attendance date
      attendanceRecord.employeAttendance.push({
        attendanceDate: normalizedDate,
        siteId: siteId,
        ...employeAttendance,
      });
    }
    // Save the updated or newly created attendance record
    const attendance = await attendanceRecord.save();
    if (attendance) {
      const response = {
        status: true,
        message: "Successfully recorded attendance",
      };
      return response;
    }
  } catch (err) {
    console.log(err.message);
    return { status: false, message: "Somthing  went wrong!" };
  }
};

export async function deleteAttendance(id, siteId, mainDate) {
  const aDate = startOfDay(mainDate);
  try {
    const attendanceRecord = await AttendanceModel.deleteOne({
      attendanceDate: aDate,
      siteId,
      employeAttendance: {
        $size: 1,
        $elemMatch: {
          employeeId: id,
        },
      },
    });
    console.log(attendanceRecord);
    if (attendanceRecord) {
      const response = {
        success: true,
        message: "Successfully deleted attendance",
      };
      return response;
    }
  } catch (error) {
    console.log(error.message);
    return { success: false, message: "Somthing  went wrong!" };
  }
}
