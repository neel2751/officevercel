import { addOneCommonLeaveToOneEmployee } from "@/server/leaveServer/countLeaveServer";

import { GlobalForm } from "@/components/form/form";
import { Button } from "@/components/ui/button";
import { useSubmitMutation } from "@/hooks/use-mutate";
import { useSelectAllLeaveCategories } from "@/hooks/useSelect/useSelect";
import { Plus } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Add the leave entitlement for one employee
export default function AddLeaveForEmployee({ leaveData, queryKey }) {
  // const [isOpen, setIsOpen] = useState(false);
  const leaveCategories = useSelectAllLeaveCategories();
  // we have show only the leave type that is not already added
  const leaveType = leaveData?.leaveData?.map((item) => item.leaveType);
  const leaveCategoriesNew = leaveCategories?.filter(
    (item) => item?.value && !leaveType?.includes(item?.value)
  );

  const { mutate: addLeave, isPending } = useSubmitMutation({
    mutationFn: async (data) =>
      await addOneCommonLeaveToOneEmployee({
        leaveType: data?.leaveType,
        leaveYear: leaveData?.leaveYear,
        employeeId: leaveData?._id,
      }),
    invalidateKey: queryKey,
    onSuccessMessage: () => "Leave added successfully",
    onClose: () => {},
  });
  const field = [
    {
      name: "leaveType",
      labelText: "Leave Type",
      type: "select",
      options: leaveCategoriesNew,
      size: true,
      validationOptions: {
        required: "Please select a leave type",
      },
    },
  ];
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="icon" variant="outline">
            <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Leave Entitlement</DialogTitle>
            <DialogDescription>Select the leave type to add</DialogDescription>
          </DialogHeader>
          <GlobalForm
            fields={field}
            btnName={"Add New"}
            onSubmit={addLeave}
            isLoading={isPending}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
