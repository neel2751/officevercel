import { GlobalForm } from "@/components/form/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";

const DialogTask = ({ isOpen, setIsOpen }) => {
  const type = [
    { value: "Task", label: "Task" },
    { value: "Project", label: "Project" },
    { value: "Meeting", label: "Meeting" },
    { value: "Event", label: "Event" },
    { value: "Todo", label: "Todo" },
  ];
  const field = [
    {
      name: "title",
      labelText: "Title",
      type: "text",
      placeholder: "Enter title",
      validationOptions: {
        required: "Title is required",
      },
    },
    {
      name: "type",
      labelText: "Type",
      options: type,
      type: "select",
      validationOptions: { required: "Type is required" },
    },

    {
      name: "priority",
      labelText: "Priority",
      options: [
        { label: "Low", value: "Low" },
        { label: "Medium", value: "Medium" },
        { label: "High", value: "High" },
      ],
      type: "select",
      validationOptions: { required: "Priority is required" },
    },

    {
      name: "color",
      labelText: "Color",
      type: "select",
      placeholder: "Select color",
      options: [
        { value: "blue", label: "Blue" },
        { value: "red", label: "Red" },
        { value: "green", label: "Green" },
        { value: "purple", label: "Purple" },
        { value: "gray", label: "Gray" },
      ],
      validationOptions: {
        required: "Color is required",
      },
    },
    {
      name: "startDate",
      labelText: "Start Date",
      type: "date",
      value: new Date(),
      placeholder: "Start Date",
      validationOptions: {
        required: "Start Date is required",
      },
    },
    {
      name: "endDate",
      labelText: "End Date",
      type: "date",
      placeholder: "End Date",
      validationOptions: {
        required: "End Date is required",
      },
    },
    {
      name: "description",
      labelText: "Description",
      type: "textarea",
      placeholder: "Description",
      size: true,
      validationOptions: {
        required: "Description is required",
      },
    },
  ];

  const handleSubmit = (data) => {
    console.log("form data", data);
  };
  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Task Details</DialogTitle>
          <DialogDescription>
            Can you please provide the following information:
          </DialogDescription>
        </DialogHeader>
        <GlobalForm fields={field} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default DialogTask;
