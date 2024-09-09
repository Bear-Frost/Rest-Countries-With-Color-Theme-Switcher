import { useFilterCountry } from "../hooks/useFilterCountry";
import SearchBar from "./searchBar";
import SelectElement from "./selectElement";

function CountryFilterOption() {
  const [regionName,countryName,onUpdateCountryRegionAndName] = useFilterCountry();
  return (
    <div className="p-4 flex flex-col items-start gap-8 lg:flex-row lg:justify-between">
      <SearchBar handleUpdateCountryRegion={onUpdateCountryRegionAndName} countryName={countryName}/>
      <SelectElement handleUpdateCountryRegion={onUpdateCountryRegionAndName} regionName={regionName}/>
    </div>
  );
}

export default CountryFilterOption;
