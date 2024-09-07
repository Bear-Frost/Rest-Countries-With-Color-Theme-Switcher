import { useEffect } from "react";
import { useState } from "react";

function useCountries() {
  const [countries, setCountries] = useState([]); 
  useEffect(() => {
    const requestCountries = async () => {
      const countriesRequest = await fetch(
        "https://restcountries.com/v3.1/all"
      );
      const countriesResponse = await countriesRequest.json();
      setCountries(countriesResponse);
    };
    requestCountries();
  }, []);
  return [countries];
}

export { useCountries };
