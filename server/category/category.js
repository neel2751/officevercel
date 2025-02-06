"use server";
import { connect } from "@/db/db";
import AttendanceCategoryModel from "@/models/attendanceCategoryModel";
import CommonLeaveModel from "@/models/commonLeaveModel";
import LeaveCategoryModel from "@/models/leaveCategoryModel";
import { getYear } from "date-fns";

export async function getAttendanceCategories(filterData) {}

export async function handleAttendanceCategory(data, id) {
  if (!data) return { success: false, message: "No data provided" };
  try {
    await connect();
    // we have to chcek if the attendance category already exists by name
    if (id) {
      await AttendanceCategoryModel.findByIdAndUpdate(id, data, {
        new: true,
      });
      return {
        success: true,
        message: "Attendance Category updated successfully",
      };
    } else {
      const existingCategory = await AttendanceCategoryModel.findOne({
        attendanceCategoryName: data.attendanceCategoryName,
        attendanceCategoryValue: data.attendanceCategoryValue,
      });
      if (existingCategory)
        return {
          success: false,
          message: "Attendance Category already exists",
        };
      await AttendanceCategoryModel.create(data);
      return {
        success: true,
        message: "Attendance Category created successfully",
      };
    }
  } catch (error) {
    console.log(" Error creating attendance category", error);
    return { success: false, message: "Error creating attendance category" };
  }
}
export async function fetchLeaveCategory() {
  try {
    await connect();
    const leaveCategories = await LeaveCategoryModel.find({
      isDeleted: false,
    }).sort({
      updatedAt: 1,
    });
    return { success: true, data: JSON.stringify(leaveCategories) };
  } catch (error) {
    console.log(" Error fetching leave categories", error);
    return { success: false, message: "Error fetching leave categories" };
  }
}

export async function handleLeaveCategory(data, id) {
  if (!data) return { success: false, message: "No data provided" };
  try {
    await connect();
    // we have to chcek if the attendance category already exists by name
    if (id) {
      const existingCategory = await LeaveCategoryModel.findById(id);
      const updateQuery = {
        leaveYear: getYear(new Date()),
        "leaveData.leaveType": existingCategory?.leaveType,
      };
      const updatePayload = {
        $set: {
          "leaveData.$.leaveType": data?.leaveType,
          "leaveData.$.total": data?.total,
        },
      };
      // await CommonLeaveModel.updateMany( updateQuery, updatePayload, { multi: true } );
      await CommonLeaveModel.updateMany(updateQuery, updatePayload);
      await LeaveCategoryModel.findByIdAndUpdate(id, data, {
        new: true,
      });
      return {
        success: true,
        message: "Leave Category updated successfully",
      };
    } else {
      const existingCategory = await LeaveCategoryModel.findOne({
        leaveType: data?.leaveType,
      });
      if (existingCategory)
        return {
          success: false,
          message: "Leave Category already exists",
        };
      await LeaveCategoryModel.create(data);
      await CommonLeaveModel.updateMany({
        $push: {
          leaveData: {
            ...data,
            used: 0,
            remaining: data?.total,
            type: "days",
          },
        },
      });
      return {
        success: true,
        message: "Leave Category created successfully",
      };
    }
  } catch (error) {
    console.log(" Error creating leave category", error);
    return { success: false, message: "Error creating Leave category" };
  }
}

export const leaveCategoryStatus = async (data) => {
  if (!data) return { success: false, message: "Not found" };
  try {
    const id = data?.id;
    const isActive = !data?.status;
    await LeaveCategoryModel.updateOne({ _id: id }, { $set: { isActive } });
    return {
      success: true,
      message: "The Status has been updated successfully",
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: `Error Occurred in server problem` };
  }
};

export const leaveCategoryDelete = async (data) => {
  if (!data) return { success: false, message: "Not found" };
  try {
    const id = data?.id;
    const isActive = false;
    const isDelete = true;
    await LeaveCategoryModel.updateOne(
      { _id: id },
      { $set: { isActive, isDeleted: isDelete } }
    );
    return {
      success: true,
      message: " The Leave Category has been deleted successfully",
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: `Error Occurred in server problem` };
  }
};
