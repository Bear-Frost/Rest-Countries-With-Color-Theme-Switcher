import CountryCard from "./countryCard";
import CountryFilterOption from "./countryFilterOption";

import { useCountries } from "../hooks/useCountries";
import { useSearchParams } from "react-router-dom";
import { getCountriesCardInfo } from "../utils/getCountriesCardInfo";
import { getFilteredCountryList } from "../utils/getFilteredCountryList";

function CountryList() {
  const [countries] = useCountries();
  const countriesCardInfoList = getCountriesCardInfo(countries);
  const [searchParams,setSearchParams]  = useSearchParams(); 
  const countryRegion = searchParams.get("countryRegion");
  const countryName = searchParams.get("countryName");
  const countriesCardInfoFilteredList = getFilteredCountryList(countriesCardInfoList,countryRegion,countryName);

  return (
    <main className="">
      <CountryFilterOption />
      <ul className="pt-9 px-8 grid grid-cols-1 gap-4 lg:grid-cols-4">
        {countriesCardInfoFilteredList.map((info) => {
          if(!info) return null;
          return (
            <li 
              key={info.name}
            >
              <CountryCard
                flagInfo={info.flagInfo}
                name={info.name}
                moreInfo={info.moreInfo}
              />
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export default CountryList;
