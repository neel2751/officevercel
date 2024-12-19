"use server";
import { connect } from "@/db/db";
import OfficeEmployeeModel from "@/models/officeEmployeeModel";
import WeeklyRotaModel from "@/models/weeklyRotaModel";
import { getServerSideProps } from "../session/session";

export async function getOfficeEmployeeAttendance(weekStartDate) {
  const { date } = weekStartDate;

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  try {
    await connect();
    const { props } = await getServerSideProps();
    const loginId = props?.session?.user?._id;

    const allEmployees = await OfficeEmployeeModel.find({
      delete: false,
      isActive: true,
    }).lean();

    const attendanceRecord = await WeeklyRotaModel.findOne({
      weekStartDate: date,
    });

    const attendanceData = attendanceRecord?.attendanceData || [];
    const attendanceMap = new Map(
      attendanceData.map((item) => [item?.employeeId?.toString(), item])
    );

    let allData = [];
    if (attendanceRecord) {
      allData = allEmployees
        .filter((employee) => attendanceMap.has(employee?._id.toString()))
        .map((employee) => {
          const existingAttendance = attendanceMap.get(
            employee?._id.toString()
          );
          return {
            employeeId: employee._id,
            employeeName: employee.name,
            schedule: existingAttendance?.schedule || {},
            weekStartDate: date,
          };
        });
    } else {
      allData = allEmployees.map((employee) => {
        return {
          employeeId: employee._id,
          employeeName: `${employee.name}`,
          schedule: attendanceMap.get(employee._id.toString())?.schedule || {},
          weekStartDate: date,
          // status: attendanceMap.get?.status || "Draft",
        };
      });
    }

    const approvedById = attendanceMap.get(
      attendanceRecord?.approvedBy.toString()
    );
    const approvedBy =
      approvedById?.employeeId?.toString() === loginId
        ? "You"
        : approvedById?.employeeName;

    const withIdData = {
      attendanceData: allData,
      weekId: attendanceRecord?._id || null,
      approvedStatus: attendanceRecord?.approvedStatus || null,
      approvedDate: attendanceRecord?.approvedDate || null,
      approvedBy: approvedBy || null,
      rejectReason: attendanceRecord?.rejectedReason || null,
    };
    return { data: JSON.stringify(withIdData), totalCount: allData.length };
  } catch (error) {
    console.error("Error  fetching office employee attendance", error);
    return [];
  }
}
