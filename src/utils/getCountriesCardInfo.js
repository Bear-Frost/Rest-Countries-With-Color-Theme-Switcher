function getCountriesCardInfo(countryList) {
  return countryList.map((country) => ({
    name: country.name.common.toLowerCase(),
    region:country.region.toLowerCase(),
    flagInfo: {
      flagSrc: country.flags.svg,
      flagAlt: country.flags.alt,
    },
    moreInfo: [
      { key: "population", value: country.population.toLocaleString() },
      { key: "region", value: country.region.toLowerCase() },
      { key: "capital", value: country.capital?.join(", ") ?? "N / A"},
    ],
  }));
}

export { getCountriesCardInfo };
