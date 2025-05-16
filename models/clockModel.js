import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const clockSchema = new Schema(
  {
    employeeId: {
      type: ObjectId,
      required: true,
    },
    clockIn: {
      type: String,
      required: true,
      match: /^([01]\d|2[0-3]):([0-5]\d)$/, // optional: validate "HH:mm" format
    },
    clockOut: {
      type: String,
      match: /^([01]\d|2[0-3]):([0-5]\d)$/,
    },
    breakIn: {
      type: String,
      match: /^([01]\d|2[0-3]):([0-5]\d)$/,
    },
    breakOut: {
      type: String,
      match: /^([01]\d|2[0-3]):([0-5]\d)$/,
    },
    clockInLocation: {
      type: String,
    },
    clockInStatus: {
      type: Boolean,
      default: true,
    },
    clockBy: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const ClockModel =
  mongoose.models.Clock || mongoose.model("Clock", clockSchema);
export default ClockModel;
