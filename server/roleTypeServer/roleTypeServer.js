"use server";

import RoleTypesModel from "@/models/roleTypeModel";

export async function getRoleTypes(filterData) {
  try {
    const sanitizedSearch = filterData?.query?.trim() || ""; // Ensure search is a string
    // const searchRegex = new RegExp(sanitizedSearch, "i"); // Create a case-ins ensitive regex
    const validPage = parseInt(filterData?.page || 1);
    const validLimit = parseInt(filterData?.pageSize || 10);
    const skip = (validPage - 1) * validLimit;
    const query = { delete: false };
    if (sanitizedSearch) {
      query.$or = [{ roleTitle: { $regex: sanitizedSearch, $options: "i" } }];
    }
    const totalCountDocuments = await RoleTypesModel.countDocuments(query);
    const roleTypes = await RoleTypesModel.find(query)
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
      message: " Error fetching role types",
    };
  }
}

export const handleRoleType = async (roleData) => {
  if (!roleData) return { success: false, message: "No Data Provided" };
  const id = roleData?._id;
  try {
    if (id) {
      let role = await RoleTypesModel.findById(id);
      if (!role)
        return { success: false, message: `Id not found please try  again` };
      const roleType = await RoleTypesModel.updateOne({ _id: id }, roleData);
      if (!roleType)
        return { success: false, message: "Failed to Update  the Record" };
      // revalidatePath("/"); // revalidate the path
      const data = {
        success: true,
        message: `Successfully Upadted Information`,
      };
      return data;
    } else {
      const addRoleType = new RoleTypesModel(roleData);
      const saveSite = await addRoleType.save();
      if (!saveSite)
        return {
          success: false,
          message: `Failed to Add Role Type Information`,
        };

      if (saveSite) {
        const data = {
          success: true,
          message: "Add RoleType Successfully...",
        };
        return data;
      }
    }
  } catch (error) {
    console.log("Error in updating site project information by Id ", error);
    return { success: false, message: `Internal Server Error` };
  }
};
