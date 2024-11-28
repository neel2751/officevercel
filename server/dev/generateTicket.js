"use server";

import IssueTicketModel from "@/models/issueTicketModel";
import { getServerSideProps } from "../session/session";

export async function generateTicket(data) {
  console.log(data);
  try {
    const { props } = await getServerSideProps();
    const userId = props?.session?.user?._id;
    if (!userId) return { success: false, message: "User not logged in" };
    const ticketId = crypto.randomUUID();
    const dbData = {
      ...data,
      userId,
      ticketId,
    };
    const ticket = await IssueTicketModel.create(dbData);
    if (!ticket) return { success: false, message: "Failed to create ticket" };
    return { success: true, message: "Ticket created successfully", ticketId };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to create ticket" };
  }
}
