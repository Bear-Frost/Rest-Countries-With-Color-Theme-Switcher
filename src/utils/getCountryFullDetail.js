import bordersFullName from "../data/countryBorders.json";

function getCountryFullDetails(country) { 
  if(!country)return null;
  const getNativeName = () => {
    return (country.name.nativeName) ? country.name.nativeName[Object.keys(country.name.nativeName)[0]].common : "N / A";
  };

  const getCapital = () => {
    return (country.capital) ? country.capital.join(", ") : "N / A";
  };

  const getTld = () => {
    return country.tld.join(", ");
  };

  const getCurrencies = () => {
    if(!country.currencies) return "N / A";
    const currencies = [];
    const currencyKeys = Object.keys(country.currencies);
    currencyKeys.forEach((currencyKey) =>
      currencies.push(country.currencies[currencyKey].name)
    );
    return currencies.join(", ");
  };

  const getLanguages = () => {
    if(!country.languages) return "N / A";
    return Object.values(country.languages).join(", ");
  };

  const getBordersName = () => {
    if(!country.borders) return ["No Borders"];
    return country.borders.map(border => bordersFullName[border]);
  }

  return {
    flag: country.flags.svg,
    flagAlt:country.flags.alt,
    name: country.name.common,
    topInfo: [
      {
        "native name": getNativeName(),
      },
      {
        population:country.population.toLocaleString(),
      },
      {
        region: country.region,
      },
      {
        "sub region": country.subregion ?? "N / A",
      },
      {
        capital: getCapital(),
      },
    ],
    secondaryInfo: [
      {
        "top level domain": getTld(),
      },
      {
        currencies: getCurrencies(),
      },
      {
        languages: getLanguages(),
      },
    ],
    borders:getBordersName(),
    loadInfo(info){
      const key = Object.keys(info)[0];
      const value = info[key];
      return [key,value];
    }
  };
}

export { getCountryFullDetails }