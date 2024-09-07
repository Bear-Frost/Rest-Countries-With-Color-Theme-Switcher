function getFilteredCountryList(
  countriesCardInfoList,
  countryRegion,
  countryName
) {
  const [countryRegionValue, countryNameValue] = [
    countryRegion ?? "all",
    countryName ?? "",
  ];
  const countriesCardInfoFilteredList = countriesCardInfoList.filter((info) => {
    const isCountryRegionMatch =
      countryRegionValue === "all"
        ? true
        : countryRegionValue === info.region
        ? true
        : false;
    const isCountryNameMatch = info.name.substring(0, countryNameValue.length) === countryNameValue;
    const isSearchedCountry = isCountryRegionMatch && isCountryNameMatch;

    return isSearchedCountry ? true : false;
  });

  return countriesCardInfoFilteredList;
}

export { getFilteredCountryList };
