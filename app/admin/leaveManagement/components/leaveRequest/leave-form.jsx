import { GlobalForm } from "@/components/form/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";

const LeaveForm = ({
  showDialog,
  setShowDialog,
  fields,
  handleSubmit,
  initialValues,
}) => {
  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Leave Request</DialogTitle>
          <DialogDescription>
            Please fill in the form below to submit a leave request.
          </DialogDescription>
        </DialogHeader>
        <GlobalForm
          fields={fields}
          onSubmit={handleSubmit}
          initialValues={initialValues}
        />
      </DialogContent>
    </Dialog>
  );
};

export default LeaveForm;
