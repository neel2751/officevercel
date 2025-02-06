import mongoose from "mongoose";

const commonLeaveSchema = new mongoose.Schema(
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
    leaveData: {
      type: Object,
      required: true,
    },
    leaveHistory: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const CommonLeaveModel =
  mongoose.models.CommonLeave ||
  mongoose.model("CommonLeave", commonLeaveSchema);
export default CommonLeaveModel;
