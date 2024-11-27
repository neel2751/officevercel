import ReactHookForm from "@/components/form/reactHookForm";
import { useCommonContext } from "@/context/commonContext";
import React from "react";

const EmployeeForm = () => {
  const { field, handleSubmit, onSubmit, initialValues } = useCommonContext();

  return (
    <ReactHookForm
      fields={field}
      onSubmit={onSubmit}
      btnName={"Save"}
      editBtnName={"Submit"}
      isLoading={handleSubmit?.isPending}
      initialValues={initialValues}
    />
  );
};

export default EmployeeForm;
