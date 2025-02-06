import mongoose from "mongoose";

const leaveCategorySchema = new mongoose.Schema(
  {
    leaveType: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    rule: {
      type: Number,
      required: true,
    },
    ruleType: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      required: false,
    },
    isEditable: {
      type: Boolean,
      default: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const LeaveCategoryModel =
  mongoose.models.LeaveCategory ||
  mongoose.model("LeaveCategory", leaveCategorySchema);
export default LeaveCategoryModel; // export the model
