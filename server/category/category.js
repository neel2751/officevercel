"use server";
import { connect } from "@/db/db";
import AttendanceCategoryModel from "@/models/attendanceCategoryModel";

export async function getAttendanceCategories(filterData) {}

export async function handleAttendanceCategory(data, id) {
  if (!data) return { success: false, message: "No data provided" };
  try {
    await connect();
    // we have to chcek if the attendance category already exists by name
    const existingCategory = await AttendanceCategoryModel.findOne({
      where: {
        attendanceCategoryName: data.attendanceCategoryName,
        attendanceCategoryValue: data.attendanceCategoryValue,
      },
    });
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
