function SelectElement({ handleUpdateCountryRegion,regionName }) {
  const REGION_OPTIONS = ["africa", "americas", "asia", "europe", "ocenia"];
  return (
    <div className="pr-4 rounded-md shadow-md bg-lightPrimary dark:bg-darkBackground dark:text-lightPrimary">
      <select
        className="p-4 font-semibold bg-inherit"
        onChange={(e) =>
          handleUpdateCountryRegion(e.target.value, "countryRegion")
        }
      >
        <option defaultValue hidden>
          {(regionName) === "all" ? "Filter By Region" : regionName}
        </option>
        {REGION_OPTIONS.map((region) => (
          <option key={region} value={region} className="capitalize">
            {region}
          </option>
        ))}
        <option value={"all"} className="capitalize">
          all region
        </option>
      </select>
    </div>
  );
}

export default SelectElement;
