import mongoose from "mongoose";

const leaveRequestSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Types.ObjectId,
      ref: "OfficeEmploye",
      required: true,
    },
    leaveYear: {
      type: Number,
      required: true,
    },
    leaveType: {
      type: String,
      required: true,
    },
    leaveSubmitDate: {
      type: Date,
      default: new Date(),
      required: true,
    },
    leaveStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    leaveReason: {
      type: String,
    },
    leaveStartDate: {
      type: Date,
      required: true,
    },
    leaveEndDate: {
      type: Date,
      required: true,
    },
    leaveDays: {
      type: Number,
      required: true,
    },
    leaveTotalHours: {
      type: Number,
    },
    approvedBy: {
      type: mongoose.Types.ObjectId,
      ref: "OfficeEmploye",
      required: false,
    },
    approvedDate: {
      type: Date,
      required: false,
    },
    adminComment: {
      type: String,
    },
  },
  { timestamps: true }
);

const LeaveRequestModel =
  mongoose.models.LeaveRequest ||
  mongoose.model("LeaveRequest", leaveRequestSchema);
export default LeaveRequestModel;
