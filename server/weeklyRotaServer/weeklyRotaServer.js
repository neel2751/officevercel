"use server";

import { connect } from "@/db/db";
import WeeklyRotaModel from "@/models/weeklyRotaModel";
import { isMonday } from "date-fns";
import { getServerSideProps } from "../session/session";

// Future to need this function for the Approved and Rejected rota right now this feature is not implemented
export async function handleWeeklyRota(data, weekStartDate, weekId) {
  try {
    await connect();
    const { props } = await getServerSideProps();
    const role = props?.session?.user?.role;
    const approvedStatus = role === "superAdmin" ? "Approve" : "Pending";
    const validDate = isMonday(weekStartDate);
    if (!validDate) return { success: false, message: "Date is not valid" };
    if (weekId) {
      const weekIdValidOrNot = await WeeklyRotaModel.findById(
        { _id: weekId },
        { approvedStatus: 1 }
      );
      if (
        (role === "admin" && weekIdValidOrNot?.approvedStatus === "Pending") ||
        !weekIdValidOrNot
      )
        return { success: false, message: "Status is Pending" };

      const updateData = await WeeklyRotaModel.findByIdAndUpdate(
        { _id: weekId },
        {
          attendanceData: data,
          weekStartDate,
          approvedStatus,
        }
      );
      return { success: true, message: "Weekly Rota Updated" };
    } else {
      const response = await WeeklyRotaModel.create({
        attendanceData: data,
        weekStartDate,
        approvedStatus,
      });
      return { success: true, message: "Weekly Rota Stored" };
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something Went Wrong" };
  }
}

export async function handleWeeklyRotaWithStatus(data, weekStartDate, weekId) {
  try {
    await connect();
    const { props } = await getServerSideProps();
    const approvedBy = props?.session?.user?._id;
    const approvedStatus = "Approved";
    const validDate = isMonday(weekStartDate);
    if (!validDate) return { success: false, message: "Date is not valid" };
    if (weekId) {
      const weekIdValidOrNot = await WeeklyRotaModel.findById({ _id: weekId });
      if (!weekIdValidOrNot)
        return { success: false, message: "Week ID is not valid" };
      const approvedCount = weekIdValidOrNot.approvedCount + 1;
      const updateData = await WeeklyRotaModel.findByIdAndUpdate(
        { _id: weekId },
        {
          attendanceData: data,
          weekStartDate,
          approvedStatus,
          approvedBy,
          approvedCount,
          approvedDate: new Date(),
        }
      );
      return { success: true, message: "Weekly Rota Updated" };
    } else {
      const response = await WeeklyRotaModel.create({
        attendanceData: data,
        weekStartDate,
        approvedStatus,
        approvedBy,
        approvedDate: new Date(),
      });
      return { success: true, message: "Weekly Rota Stored" };
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something Went Wrong" };
  }
}

/*
 Step:1 Check the role SuperAdmin or not
 Step:2 Get the current week data up to 10 result for page 1
 Step:3 Filter wise data if pass the date on filter it date wise otherwise take current week date
 Step:4 Sort the date wise
*/
export async function getWeeklyRotaForSuperAdmin(filterData) {
  try {
    const { props } = await getServerSideProps();
    const loginId = props?.session?.user?._id;
    const validPage = parseInt(filterData?.page || 1);
    const validLimit = parseInt(filterData?.pageSize || 10);
    const weekStartDate = filterData?.date;
    const skip = (validPage - 1) * validLimit;
    const validDate = isMonday(weekStartDate);
    const approvedStatus = filterData?.status;
    if (weekStartDate && !validDate)
      return { success: false, message: "Date is not valid" };
    const query = {};
    if (weekStartDate) {
      query.weekStartDate = weekStartDate;
    }
    if (approvedStatus) {
      query.approvedStatus = approvedStatus;
    }
    const pipeline = [
      {
        $match: query,
      },
      {
        $lookup: {
          from: "officeemployes",
          localField: "approvedBy",
          foreignField: "_id",
          as: "result",
          pipeline: [
            {
              $project: {
                employeeId: "$_id", // Rename `_id` to `employeeId`
                employeeName: "$name", // Rename `name` to `employeeName`
              },
            },
          ],
        },
      },
      {
        $sort: {
          weekStartDate: -1,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: validLimit,
      },
    ];

    const totalCountDocuments = await WeeklyRotaModel.countDocuments(query);
    const weekRota = await WeeklyRotaModel.aggregate(pipeline);
    return {
      success: true,
      data: JSON.stringify(weekRota),
      totalCount: totalCountDocuments,
    };
  } catch (error) {
    console.log("Get week rota for superAdmin error server", error);
  }
}

// Future to need this function handle Status for weekly rota right now this feature is not implemented
export async function handleWeekApproveStatus(data) {
  try {
    const { props } = await getServerSideProps();
    const approvedBy = props?.session?.user?._id;

    const dbData = {
      ...data,
      approvedBy,
      approvedDate: new Date(),
    };
    const newData = await WeeklyRotaModel.findByIdAndUpdate(
      {
        _id: data?.weekId,
      },
      dbData
    );
    return {
      success: true,
      message: "Week rota approved successfully",
    };
  } catch (error) {
    console.log("Error While on handleWeekRotaStatus", error);
    return {
      success: false,
      message: "Error While on handleWeekRotaStatus",
    };
  }
}
