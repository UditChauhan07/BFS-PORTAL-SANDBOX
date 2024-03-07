import React from "react";
import { FilterItem } from "../FilterItem";
import { useManufacturer } from "../../api/useManufacturer";
import FilterSearch from "../FilterSearch";
import { CloseButton } from "../../lib/svg";

const Filters = ({ value, onChange, resetFilter }) => {
  const { data: manufacturerData } = useManufacturer();
  const handleMonthFilter = (v) => onChange("month", v);
  const handleManufacturerFilter = (v) => onChange("manufacturer", v);
  const handleSearchFilter = (v) => onChange("search", v);

  return (
    <>
      <FilterItem
        label="Months"
        name="Months"
        value={value.month}
        options={[
          {
            label: "Last 6 Months",
            value: "last-6-months",
          },
          {
            label: "Current Year",
            value: `${new Date().getFullYear()}`,
          },
          {
            label: `${new Date().getFullYear() - 1}`,
            value: `${new Date().getFullYear() - 1}`,
          },
        ]}
        onChange={handleMonthFilter}
      />
      <FilterItem
        label="MANUFACTURER"
        name="MANUFACTURER"
        value={value.manufacturer}
        options={
          Array.isArray(manufacturerData?.data)
            ? manufacturerData?.data?.map((manufacturer) => ({
                label: manufacturer.Name,
                value: manufacturer.Id,
              }))
            : []
        }
        onChange={handleManufacturerFilter}
      />
      <FilterSearch
        onChange={(e) => handleSearchFilter(e.target.value)}
        value={value.search}
        placeholder="Search By Account"
        minWidth="167px"
      />
      <button
        className="border px-2.5 py-1 leading-tight"
        onClick={resetFilter}
      >
        <CloseButton crossFill={'#fff'} height={20} width={20} />
      </button>
    </>
  );
};

export default Filters;
