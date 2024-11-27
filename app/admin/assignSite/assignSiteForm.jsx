import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import AssignAttendance from "./assignAttendance";
import { Searchbox } from "@/components/ComboBox/SearchBox";
import { ComboboxDemo } from "@/components/ComboBox/ComboBox";
import { useCommonContext } from "@/context/commonContext";
import DateSelectCom from "@/components/dateSelect/dateSelect";
import { Button } from "@/components/ui/button";

const AssignSiteForm = () => {
  const {
    selectedProjects,
    setSelectedProjects,
    selectedEmployees,
    setSelectedEmployees,
    alreadyAssignEmployee,
    alreadyAssignSite,
    filterForEdit,
    handleReset,
    setFilterForEdit,
  } = useCommonContext();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <CardTitle>Assign Employe</CardTitle>
            <CardDescription>
              Assign project to Employee in one-click.
            </CardDescription>
          </div>
          {!filterForEdit?.siteId && (
            <DateSelectCom
              date={filterForEdit?.aDate}
              setDate={(date) =>
                setFilterForEdit({ ...filterForEdit, aDate: date })
              }
            />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <div className="space-y-2">
            <span className="text-sm text-neutral-600 font-medium ms-1">
              Site Project
            </span>
            <Searchbox
              value={selectedProjects}
              onChange={setSelectedProjects}
              frameworks={alreadyAssignSite}
              placeholder="Search Project"
              noData="No Project Found"
            />
          </div>
          {selectedProjects && (
            <div className="space-y-2">
              <span className="text-sm text-neutral-600 font-medium ms-1">
                Employee
              </span>
              <ComboboxDemo
                value={selectedEmployees}
                onChange={setSelectedEmployees}
                frameworks={alreadyAssignEmployee}
                placeholder="Select Employee" // default placeholder
                noData="No Employee Found" // default no data message
              />
            </div>
          )}
          <AssignAttendance
            selectedEmployee={selectedEmployees}
            selectedProjects={selectedProjects}
            date={filterForEdit?.aDate || new Date()}
          />
          <div className="flex gap-4 mt-4">
            {/* <Button>{filterForEdit.id ? "Edit" : "Submit"}</Button> */}
            {filterForEdit?.id ||
              (selectedEmployees.length > 0 && (
                <Button variant="outline" onClick={handleReset}>
                  Cancel
                </Button>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssignSiteForm;
