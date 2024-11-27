"use server";
import CompanyModel from "@/models/companyModel";

export async function getCompanies(filterData) {
  try {
    const sanitizedSearch = filterData?.query?.trim() || ""; // Ensure search is a string
    // const searchRegex = new RegExp(sanitizedSearch, "i"); // Create a case-ins ensitive regex
    const validPage = parseInt(filterData?.page || 1);
    const validLimit = parseInt(filterData?.pageSize || 10);
    const skip = (validPage - 1) * validLimit;
    const query = { delete: false };
    if (sanitizedSearch) {
      query.$or = [{ name: { $regex: sanitizedSearch, $options: "i" } }];
    }
    const totalCountDocuments = await CompanyModel.countDocuments(query);
    const roleTypes = await CompanyModel.find(query)
      .skip(skip)
      .limit(validLimit)
      .sort({ createdAt: -1 });
    return {
      success: true,
      data: JSON.stringify(roleTypes),
      totalCount: totalCountDocuments,
    };
  } catch (error) {
    console.log("error", error);
    return {
      success: false,
      message: " Error fetching comapnies",
    };
  }
}

export const handleCompany = async (data) => {
  if (!data) return { success: false, message: "No Data Provided" };
  const id = data?._id;
  try {
    if (id) {
      let company = await CompanyModel.findById(id);
      if (!company)
        return { success: false, message: `Id not found please try  again` };
      const roleType = await CompanyModel.updateOne({ _id: id }, data);
      if (!roleType)
        return { success: false, message: "Failed to Update  the Record" };
      // revalidatePath("/"); // revalidate the path
      const data = {
        success: true,
        message: `Successfully Upadted Information`,
      };
      return data;
    } else {
      const addRoleType = new CompanyModel(data);
      const saveSite = await addRoleType.save();
      if (!saveSite)
        return {
          success: false,
          message: `Failed to Add Company Information`,
        };

      if (saveSite) {
        const data = {
          success: true,
          message: "Add Company Successfully...",
        };
        return data;
      }
    }
  } catch (error) {
    console.log("Error in updatin company information by Id ", error);
    return { success: false, message: `Internal Server Error` };
  }
};
