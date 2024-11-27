"use server";
import SiteAssignManagerModel from "@/models/siteAssignManagerModel";
import { getSiteById } from "../siteProjectServer/siteProjectServer";
import { getEmployeById } from "../officeServer/officeServer";

export async function getAllSiteAssign(filterData) {
  const sanitizedSearch = filterData?.query?.trim() || "";
  const validPage = parseInt(filterData?.page || 1);
  const validLimit = parseInt(filterData?.pageSize || 10);
  const skip = (validPage - 1) * validLimit;
  const query = { delete: false };
  if (sanitizedSearch) {
    query.$or = [
      { "role.name": { $regex: sanitizedSearch, $options: "i" } },
      { "projectSite.siteName": { $regex: sanitizedSearch, $options: "i" } },
      {
        "projectSite.siteAddress": { $regex: sanitizedSearch, $options: "i" },
      },
      { "projectSite.siteType": { $regex: sanitizedSearch, $options: "i" } },
    ];
  }
  try {
    const totalCountDocuments = await SiteAssignManagerModel.countDocuments(
      query
    );
    const siteData = await SiteAssignManagerModel.aggregate([
      {
        $lookup: {
          from: "officeemployes",
          localField: "roleId",
          foreignField: "_id",
          as: "role",
        },
      },
      {
        $lookup: {
          from: "projectsites",
          localField: "projectSiteID",
          foreignField: "_id",
          as: "projectSite",
        },
      },
      {
        $match: query,
      },
      {
        $project: {
          _id: 1,
          roleId: 1,
          projectSiteID: 1,
          isActive: 1,
          isVerified: 1,
          startDate: 1,
          endDate: 1,
          roleName: { $arrayElemAt: ["$role.name", 0] },
          siteName: { $arrayElemAt: ["$projectSite.siteName", 0] },
          siteAddress: { $arrayElemAt: ["$projectSite.siteAddress", 0] },
          siteType: { $arrayElemAt: ["$projectSite.siteType", 0] },
          siteStatus: { $arrayElemAt: ["$projectSite.status", 0] },
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: validLimit,
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]).exec();
    const data = {
      success: true,
      data: JSON.stringify(siteData),
      totalCount: totalCountDocuments,
    };
    return data;
  } catch (error) {
    console.log(error);
    return { success: false, message: " Error fetching data" };
  }
}

export async function handleSiteAssignManager(data) {
  if (!data) return { success: false, message: "No data provided" };
  //Checking if the site id and user id are valid
  const id = data?._id;
  try {
    // check if employed id and  site id exists in database with status true and delete false to already assigned error
    const proId = data?.projectSiteID;
    const rolId = data.roleId;
    const siteData = await isSiteandNameisExists(id, proId, rolId);
    if (siteData?.success === false)
      return { success: siteData.success, message: siteData.message };
    //Getting the site information to check if it exists
    const siteInfo = await getSiteById(proId);
    if (!siteInfo?.success)
      return { success: siteInfo.success, message: siteInfo.message };

    const employeInfo = await getEmployeById(rolId);
    if (!employeInfo?.success)
      return { success: false, message: `Failed to retrieve employee` };

    const info = JSON.parse(employeInfo?.data);
    const password = info.password;
    const email = info.email;
    if (id) {
      const updateAssign = {
        password,
        email,
        projectSiteID: proId,
        roleId: rolId,
        isActive: true,
      };
      const updateAssignData = await SiteAssignManagerModel.updateOne(
        { _id: id },
        { $set: updateAssign }
      ).exec();

      if (!updateAssignData)
        return { success: false, message: "Faild to Update Assign..." };
      return {
        success: true,
        message: `The Project has  been updated Successfully`,
      };
    } else {
      // generate the Random Interger using  crypto
      const loginSiteId = crypto.randomUUID();
      //   const loginSiteId = randomInt(1000000, 9999999).toString();

      console.log("crypto number", loginSiteId);
      const assignData = { ...data, loginSiteId, email, password };

      const result = await assignSiteData(assignData);
      if (!result) return { success: false, message: "Failed to Assign" };
      return result;
    }
  } catch (e) {
    return { success: false, message: e };
  }
}

const assignSiteData = async (assignData) => {
  if (!assignData) return { success: false, message: "No Data assign" };
  try {
    const assign = new SiteAssignManagerModel(assignData);
    const res = await assign.save();
    if (!res)
      return { success: false, message: "No Data saved. somthing wrong" };
    return { success: true, data: JSON.stringify(res) };
  } catch (error) {
    console.log("from assignSiteData", error);
    return { success: false, message: error };
  }
};

const isSiteandNameisExists = async (id, projectSiteID, roleId) => {
  try {
    if (!id) {
      const existingAssignment = await SiteAssignManagerModel.findOne({
        roleId: roleId,
        isActive: true,
      });
      if (existingAssignment)
        return { success: false, message: "This Role already assigned" };
      const existingSite = await SiteAssignManagerModel.findOne({
        projectSiteID: projectSiteID,
        isActive: true,
      });
      if (existingSite) {
        return { success: false, message: "This Site is already assigned." };
      }
      return true;
    }
    if (id) {
      const existingAssignment = await SiteAssignManagerModel.findOne({
        projectSiteID: projectSiteID,
        roleId: { $ne: roleId }, // Ensure employeeId is not the same
        isActive: true,
      });
      if (existingAssignment) {
        return { success: false, message: "Site is already Assign" }; // Site is not assigned to the employee or not active
      }
    }
    return true;
  } catch (error) {
    console.log("this error come from isSiteandNameisExists", error);
    return { success: false, message: "Error checking while Assignment" };
  }
};

export const handleSiteAssignManagerStatus = async (data) => {
  if (!data) return { success: false, message: "Not found" };
  try {
    const id = data?.id;
    const isActive = !data?.status;
    await SiteAssignManagerModel.updateOne({ _id: id }, { $set: { isActive } });
    return {
      success: true,
      message: "The  Status of the Assign Project has been Updated",
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: `Error Occurred in server problem` };
  }
};

export const handleSiteAssignManagerDelete = async (data) => {
  if (!data) return { success: false, message: "Not found" };
  try {
    const id = data?.id;
    const isActive = false;
    const isDelete = true;
    await SiteAssignManagerModel.updateOne(
      { _id: id },
      { $set: { isActive, isDelete } }
    );
    return {
      success: true,
      message: "The  Status of the Assign Project has been Updated",
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: `Error Occurred in server problem` };
  }
};
