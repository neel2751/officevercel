"use server";

import { connect } from "@/db/db";
import WeeklyRotaModel from "@/models/weeklyRotaModel";
import { isMonday } from "date-fns";
import { getServerSideProps } from "../session/session";

// Future to need this function for the Approved and Rejected rota right now this feature is not implemented
export async function handleWeeklyRota(data, weekStartDate, weekId) {
  try {
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
    const validPage = Number.isInteger(parseInt(filterData?.page))
      ? parseInt(filterData.page)
      : 1;
    const validLimit = Number.isInteger(parseInt(filterData?.pageSize))
      ? parseInt(filterData.pageSize)
      : 10;
    const weekStartDate = filterData?.date;
    const skip = Math.max((validPage - 1) * validLimit, 0); // Avoid negative skip
    const approvedStatus = filterData?.status;

    // Validate date and ensure it is Monday
    if (weekStartDate) {
      const parsedDate = parseISO(weekStartDate);
      if (!isValid(parsedDate) || !isMonday(parsedDate)) {
        return { success: false, message: "Invalid date or not a Monday" };
      }
    }

    // Connect to MongoDB
    await connect();

    // Build query object
    const query = { isDeleted: false };
    if (weekStartDate) query.weekStartDate = weekStartDate;
    if (approvedStatus) query.approvedStatus = approvedStatus;

    // Aggregation pipeline
    const pipeline = [
      {
        $match: query,
      },
      {
        $lookup: {
          from: "officeemployees",
          localField: "approvedBy",
          foreignField: "_id",
          as: "result",
          pipeline: [
            {
              $project: {
                employeeId: "$_id",
                employeeName: "$name",
              },
            },
          ],
        },
      },
      {
        $sort: { weekStartDate: -1 },
      },
      {
        $skip: skip,
      },
      {
        $limit: validLimit,
      },
    ];

    // Fetch data and total count
    const [totalCountDocuments, weekRota] = await Promise.all([
      WeeklyRotaModel.countDocuments(query), // Count documents
      WeeklyRotaModel.aggregate(pipeline), // Run aggregation
    ]);

    return {
      success: true,
      data: JSON.stringify(weekRota),
      totalCount: totalCountDocuments,
    };
  } catch (error) {
    console.error("Error in getWeeklyRotaForSuperAdmin:", error);
    return {
      success: false,
      message: "An error occurred while fetching data.",
    };
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
