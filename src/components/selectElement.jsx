function SelectElement({ handleUpdateCountryRegion }) {
  const REGION_OPTIONS = ["africa", "americas", "asia", "europe", "ocenia"];
  return (
    <div className="pr-4 rounded-md shadow-md bg-lightPrimary dark:bg-darkBackground dark:text-lightPrimary">
      <select
        className="p-4 font-semibol bg-inherit"
        onChange={(e) =>
          handleUpdateCountryRegion(e.target.value, "countryRegion")
        }
      >
        <option defaultValue hidden>
          Filter By Region
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
