import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCommonContext } from "@/context/commonContext";
import React from "react";

const SiteFilter = () => {
  const { filter, setFilter, selectSiteProject: site } = useCommonContext();
  return (
    <Select
      onValueChange={(val) =>
        setFilter({ ...filter, siteId: val === "All" ? "" : val })
      }
      defaultValue={filter.siteId !== "" ? filter.siteId : "All"}
    >
      <SelectTrigger className="max-w-max">
        <SelectValue
          placeholder={filter.siteId !== "" ? filter.siteId : "All"}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {[{ label: "All", value: "All" }, ...site]?.map((item, index) => (
            <SelectItem key={index} value={item.value}>
              {" "}
              {item.label}{" "}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SiteFilter;
