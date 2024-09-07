import { useEffect, useState } from "react";
import SearchBar from "./searchBar";
import SelectElement from "./selectElement";
import { useSearchParams } from "react-router-dom";

function CountryFilterOption() {
  const [searchParams,setSearchParams] = useSearchParams();
  const [regionName, setRegionName] = useState(searchParams.get("countryRegion") || "all");
  const [countryName, setCountryName] = useState(searchParams.get("countryName") || "");

    useEffect(() => {
       const params = new URLSearchParams();
       if(regionName) params.set("countryRegion",regionName);
       if(countryName) params.set("countryName",countryName);
        setSearchParams(params);
    },[regionName,countryName,setSearchParams]);

  const onUpdateCountryRegionAndName = (newValue, stateUpdate) => {
    if (stateUpdate === "countryRegion") {
      setRegionName(newValue);
    } else if (stateUpdate === "countryName") {
      setCountryName(newValue);
    }
  };

  return (
    <div className="p-4 flex flex-col items-start gap-8 lg:flex-row lg:justify-between">
      <SearchBar handleUpdateCountryRegion={onUpdateCountryRegionAndName} />
      <SelectElement handleUpdateCountryRegion={onUpdateCountryRegionAndName} />
    </div>
  );
}

export default CountryFilterOption;
