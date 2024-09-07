import { useEffect, useState } from "react";

function useCountryInfo(countryName) {
    const [countryInfo,setCountryInfo] = useState(null);
    useEffect(() => {
        let isRequestCanceled = false;
        const getCountryDetails = async () => {
            if(!isRequestCanceled){
                const COUNTRY_API = `https://restcountries.com/v3.1/name/${countryName}`;
                const countryRequest = await fetch(COUNTRY_API);
                const countryResponse = await countryRequest.json();
                setCountryInfo(countryResponse[0]);
            }
        }
        getCountryDetails();
        return () => isRequestCanceled = true;
    },[countryName]);
    return [countryInfo,setCountryInfo];
}

export default useCountryInfo;