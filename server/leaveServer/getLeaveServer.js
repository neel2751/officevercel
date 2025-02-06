"use server";

import { connect } from "@/db/db";
import { getServerSideProps } from "../session/session";
import { format, getYear, isPast } from "date-fns";
import mongoose from "mongoose";
import LeaveRequestModel from "@/models/leaveRequestModel";
import CommonLeaveModel from "@/models/commonLeaveModel";

export async function getLeaveRequestData(leaveYear) {
  try {
    const { props } = await getServerSideProps();
    const employeeId = props?.session?.user?._id;
    const role = props?.session?.user?.role;
    if (!employeeId) return { success: false, message: "Employee not found" };
    await connect();
    const checLeaveYear = Number(parseInt(leaveYear))
      ? Number(parseInt(leaveYear))
      : getYear(new Date());

    const match =
      role === "superAdmin"
        ? { leaveYear: checLeaveYear }
        : {
            employeeId: new mongoose.Types.ObjectId(employeeId),
            leaveYear: checLeaveYear,
          };
    const lookup =
      role === "superAdmin"
        ? {
            from: "officeemployes",
            localField: "employeeId",
            foreignField: "_id",
            as: "employees",
          }
        : {};
    const approveLookup = {
      from: "officeemployes",
      localField: "approvedBy",
      foreignField: "_id",
      as: "admin",
    };

    const pipeline = [
      {
        $match: match,
      },
      {
        $sort: {
          leaveSubmitDate: -1,
        },
      },
      {
        $lookup: lookup,
      },
      {
        $lookup: approveLookup,
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              "$$ROOT",
              {
                employee: {
                  name: { $arrayElemAt: ["$employees.name", 0] },
                  role: { $arrayElemAt: ["$employees.roleType", 0] },
                },
                approvedBy: {
                  name: { $arrayElemAt: ["$admin.name", 0] },
                },
              },
            ],
          },
        },
      },
    ];
    const leaveData = await LeaveRequestModel.aggregate(pipeline);
    return { success: true, data: JSON.stringify(leaveData) };
  } catch (error) {
    console.log("Error fetching leave request data", error);
    return { success: false, message: "Error fetching leave request data" };
  }
}

export async function getLeaveRequestDataAdmin(filterData) {
  try {
    const { props } = await getServerSideProps();
    const employeeId = props?.session?.user?._id;
    const role = props?.session?.user?.role;
    if (!employeeId) return { success: false, message: "Employee not found" };

    await connect();
    const { leaveYear } = filterData;
    const checkLeaveYear = Number(parseInt(leaveYear))
      ? Number(parseInt(leaveYear))
      : getYear(new Date());

    const match =
      role === "superAdmin"
        ? { leaveYear: checkLeaveYear }
        : {
            employeeId: new mongoose.Types.ObjectId(employeeId),
            leaveYear: checkLeaveYear,
          };
    const lookup =
      role === "superAdmin"
        ? {
            from: "officeemployes",
            localField: "employeeId",
            foreignField: "_id",
            as: "employees",
          }
        : {};

    const approveLookup = {
      from: "officeemployes",
      localField: "approvedBy",
      foreignField: "_id",
      as: "admin",
    };
    const pipeline = [
      {
        $match: match,
      },
      {
        $sort: {
          leaveSubmitDate: -1,
        },
      },
      {
        $lookup: lookup,
      },
      {
        $lookup: approveLookup,
      },
      {
        $lookup: {
          from: "leaverequests", // Self-join on the same collection
          let: {
            startDate: "$leaveStartDate",
            endDate: "$leaveEndDate",
            employeeId: "$employeeId",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $ne: ["$employeeId", "$$employeeId"] }, // exclude self
                    { $lte: ["$leaveStartDate", "$$endDate"] }, // start date is before end date
                    { $gte: ["$leaveEndDate", "$$startDate"] }, // end date is after start
                  ],
                },
              },
            },
            {
              $lookup: {
                from: "officeemployes", // Lookup to get employee details
                localField: "employeeId", // Use `employeeId` from the matching leave requests
                foreignField: "_id", // Match it with the `_id` field in `officeemployees`
                as: "overlapEmployee", // Name the field in the output
              },
            },
            {
              $unwind: {
                path: "$overlapEmployee",
                preserveNullAndEmptyArrays: true,
              }, // Unwind the result to make employee data accessible
            },
            {
              $project: {
                _id: 1,
                employeeId: 1,
                leaveStartDate: 1,
                leaveEndDate: 1,
                leaveType: 1,
                leaveStatus: 1,
                leaveSubmitDate: 1,
                employeeName: "$overlapEmployee.name", // Project the employee name
                overLappingDays: {
                  $add: [
                    {
                      $divide: [
                        {
                          $subtract: [
                            { $min: ["$leaveEndDate", "$$endDate"] }, // Min of the two end dates
                            { $max: ["$leaveStartDate", "$$startDate"] }, // Max of the two start
                          ],
                        },
                        1000 * 60 * 60 * 24, // Convert millisecond to days
                      ],
                    },
                    1, // Add 1 to include the day of overlap
                  ],
                },
              },
            },
          ],
          as: "overlappingRequests",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              "$$ROOT",
              {
                employee: {
                  name: { $arrayElemAt: ["$employees.name", 0] },
                  role: { $arrayElemAt: ["$employees.roleType", 0] },
                },
                approvedBy: {
                  name: { $arrayElemAt: ["$admin.name", 0] },
                },
              },
            ],
          },
        },
      },
      {
        $unset: ["employees", "admin"], // Remove the arrays
      },
    ];

    const leaveData = await LeaveRequestModel.aggregate(pipeline);
    return { success: true, data: JSON.stringify(leaveData) }; // Return the data as a string
  } catch (error) {
    console.log("Get Leave Request Data for Admin", error);
    return { success: false, message: "Failed to get leave request data" };
  }
}

export async function handleEmployeeLeaveStatus(data) {
  try {
    const { props } = await getServerSideProps();
    const { _id: approvedBy } = props?.session?.user;
    const approvedDate = new Date();
    const newData = { ...data, approvedBy, approvedDate };
    if (data?.leaveStatus === "Approved") {
      const updatedLeave = await LeaveRequestModel.updateOne(
        { _id: data.leaveId },
        {
          $set: newData,
        }
      );
      return { success: true, message: "Leave status updated successfully" };
    } else {
      const rejectLeave = await rejectLeaveRequest(
        data?.leaveId,
        approvedBy,
        data?.adminComment
      );
      console.log(rejectLeave);
      return { success: true, message: "Leave status updated successfully" };
    }
  } catch (error) {
    console.log("Error updating leave request status", error);
    return { success: false, message: "Error updating leave request status" };
  }
}

async function rejectLeaveRequest(requestId, adminId, adminComment = "") {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // Step 1: Fetch the leave request to be rejected
    const leaveRequest = await LeaveRequestModel.findById(requestId).session(
      session
    );
    if (!leaveRequest)
      return { success: false, message: "Leave request not found" };

    // Step 2: Check if the leave request is already approved or rejected
    if (
      leaveRequest?.leaveStatus === "Approved" ||
      leaveRequest?.leaveStatus === "Rejected"
    )
      return {
        success: false,
        message: "Leave request is already approved or rejected",
      };

    // Step 3: Fetch the common leave record
    const commonLeave = await CommonLeaveModel.findOne({
      employeeId: leaveRequest.employeeId,
      leaveYear: leaveRequest.leaveYear,
    }).session(session);
    if (!commonLeave)
      return { success: false, message: "Common leave record not found" };

    const leaveData = commonLeave.leaveData.find(
      (leave) => leave.leaveType === leaveRequest.leaveType
    );
    if (!leaveData) return { success: false, message: "Leave data not found" };

    // Step 4: Adjust common leave balance if perviously approved

    const used = leaveData?.used - leaveRequest?.leaveDays;
    const remaining = leaveData?.remaining + leaveRequest?.leaveDays;

    const newLeaveData = {
      ...leaveData,
      used,
      remaining,
    };
    commonLeave.leaveData = commonLeave.leaveData.map((leave) =>
      leave.leaveType === leaveRequest.leaveType ? newLeaveData : leave
    );

    await commonLeave.save({ session });

    //Step 5: Update the leave request status and add admin rejectoin deatils
    leaveRequest.leaveStatus = "Rejected";
    leaveRequest.approvedBy = adminId;
    leaveRequest.approvedDate = new Date();
    leaveRequest.rejectedBy = adminId;
    leaveRequest.adminComment = isPast(leaveRequest?.leaveStartDate)
      ? "Leave request is rejected due to past date"
      : adminComment;
    await leaveRequest.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    return { success: true, message: "Leave request rejected successfully" };
  } catch (error) {
    // Abort the transaction if there's an error
    await session.abortTransaction();
    console.log(" Error rejecting leave request:", error);
    return { success: false, message: "Error rejecting leave request" };
  } finally {
    session.endSession();
  }
}

export async function rejectPastLeaveRequest() {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // Step 1: Find all pending leave request with a start date in the past
    const today = new Date();
    const pendindLeaveRequests = await LeaveRequestModel.find({
      leaveStartDate: { $lt: today },
      leaveStatus: "Pending",
    }).session(session);
    if (pendindLeaveRequests.length === 0)
      return { success: false, message: "No pending leave requests found" };

    // Step 2: Loop through each request and hadndle rejections
    for (const leaveRequest of pendindLeaveRequests) {
      const { employeeId, leaveYear, leaveType, leaveDays } = leaveRequest;

      // Fetch CommonLeaveModel for this employee
      const commonLeave = await CommonLeaveModel.findOne({
        employeeId,
        leaveYear,
      }).session(session);
      if (!commonLeave)
        return { success: false, message: "No common leave data found" };
      const leaveData = commonLeave.leaveData[leaveType];
      if (!leaveData) return { success: false, message: "No leave data found" };

      // Adjust balance only if the leave was consuming balance
      if (leaveRequest?.leaveStatus === "Approved") {
        const updatedLeaveData = {
          ...leaveData,
          used: leaveData?.used - leaveDays,
          remaining: leaveData?.remaining + leaveDays,
        };

        // Ensure no negative values
        if (updatedLeaveData?.used < 0) updatedLeaveData.used = 0;
        if (updatedLeaveData?.remaining > leaveData?.total)
          updatedLeaveData.remaining = leaveData?.total;
        commonLeave.leaveData[leaveType] = updatedLeaveData;
        await commonLeave.save({ session });
      }
      // Mark the leave request as rejected
      leaveRequest.leaveStatus = "Rejected";
      leaveRequest.adminComment = `Autometically rejected because leave start date (${format(
        leaveRequest?.leaveStartDate,
        "PPP"
      )}) is in the past.`;
      await leaveRequest.save({ session });
    }
    await session.commitTransaction();
    return {
      success: true,
      message: "Leave requests from the past have been rejected.",
    };
  } catch (error) {
    await session.abortTransaction();
    console.log(" Error rejecting past leave requests:", error);
    return { success: false, message: "Error rejecting past leave requests." };
  } finally {
    session.endSession();
  }
}

export async function editCommonLeave(data) {
  try {
    const {
      value,
      initialValues: { leaveYear, employeeId, leaveType },
    } = data;

    // Step 1: Validate input
    if (!Number.isInteger(value) || value <= 0 || value > 40) {
      return {
        success: false,
        message:
          "Invalid Leave days. Only positive integers greater than 0 are allowed.",
      };
    }

    // fetch the current user session login data
    const { props } = await getServerSideProps();
    const { _id: admin, name, role } = props?.session?.user;

    // call the connection
    await connect();

    // Step 1: Find the common leave document
    const commonLeave = await CommonLeaveModel.findOne(
      {
        employeeId,
        leaveYear,
        "leaveData.leaveType": leaveType,
      },
      { "leaveData.$": 1 } // Fetch only the matched leave type
    );
    if (
      !commonLeave ||
      !commonLeave.leaveData ||
      commonLeave.leaveData.length === 0
    )
      return { success: false, message: "Leave type or employee not found" };

    // Step 3: Calculate new remaining days
    const leaveTypeData = commonLeave.leaveData[0]; // Access the matched leave data
    const { used, total: oldTotal, remaining: oldRemaining } = leaveTypeData;
    if (used > value)
      return {
        success: false,
        message: "New total leave is less then used days",
      };
    const newRemaining = value - used;

    if (newRemaining < 0)
      return { success: false, message: "Invalid Leave days" };

    // Step 4: Prepare history entry
    const historyEntry = {
      updateAt: new Date(),
      updatedBy: admin || "System", // Deafult to system if admin is not found
      updatedByName: name || "System", // Deafult to system if name is not found
      role: role || "system", // Deafult to system if role is not found
      leaveType,
      used,
      oldTotal,
      newTotal: value,
      oldRemaining,
      newRemaining,
    };

    // Step 5: Update the total, remaining, and append to history
    const updateResult = await CommonLeaveModel.updateOne(
      {
        employeeId,
        leaveYear,
        "leaveData.leaveType": leaveType, // Match the leave type
      },
      {
        $set: {
          "leaveData.$.total": value,
          "leaveData.$.remaining": newRemaining, // Update the remaining days
        },
        $push: {
          leaveHistory: historyEntry, // Append the history entry
        },
      }
    );

    if (updateResult.matchedCount === 0)
      return { success: false, message: "Leave type or employee not found" };
    if (updateResult.modifiedCount === 0)
      return { success: false, message: "No changes made to leave data" };

    // Step 6: Return success response
    return { success: true, message: "Leave days updated successfully" };
  } catch (error) {
    console.log("Error editing common leave:", error);
    return { success: false, message: "Error editing common leave." };
  }
}
