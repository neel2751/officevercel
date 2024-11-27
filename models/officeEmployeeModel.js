import mongoose from "mongoose";

const officeEmployeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    password: { type: String, required: true },
    department: { type: String, required: true },
    roleType: {
      type: mongoose.Types.ObjectId,
      ref: "RoleType",
      required: true,
    },

    company: {
      type: mongoose.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    immigrationStatus: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    isAdmin: { type: Boolean, default: false },
    isSuperAdmin: { type: Boolean, default: false },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: false },
    delete: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const OfficeEmployeeModel =
  mongoose.models.OfficeEmploye ||
  mongoose.model("OfficeEmploye", officeEmployeSchema);

export default OfficeEmployeeModel;
