import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function useFilterCountry() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [regionName, setRegionName] = useState(
    searchParams.get("countryRegion") || "all"
  );
  const [countryName, setCountryName] = useState(
    searchParams.get("countryName") || ""
  );

  useEffect(() => {
    const params = new URLSearchParams();
    if (regionName) params.set("countryRegion", regionName);
    if (countryName) params.set("countryName", countryName);
    setSearchParams(params);
  }, [regionName, countryName, setSearchParams]);

  const onUpdateCountryRegionAndName = (newValue, stateUpdate) => {
    if (stateUpdate === "countryRegion") {
      setRegionName(newValue);
    } else if (stateUpdate === "countryName") {
      setCountryName(newValue);
    }
  };

  return [regionName, countryName, onUpdateCountryRegionAndName];
}

export { useFilterCountry };
