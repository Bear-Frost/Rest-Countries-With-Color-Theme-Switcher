class CountryModel {
  constructor() {
    this.countryList = this.getCountryList().then((countryData) => countryData);
  }

  async getCountryList() {
    try {
      const requestCountryData = await fetch(
        "https://restcountries.com/v3.1/all"
      );
      const responseCountryData = await requestCountryData.json();
      return responseCountryData;
    } catch (error) {
      alert(error.message);
    }
  }

  async getAllCountryIntroInfo() {
    const countriesData = await this.countryList;
    const countriesIntroInfo = countriesData.map((country) =>
      this.getCountryIntroInfo(country, countriesData)
    );
    return countriesIntroInfo;
  }

  async getCountryIntroInfoByName(countryName) {
    const countriesData = await this.countryList;
    const countriesInfoByName = countriesData.filter((country) => {
      return (
        country.name.common.substring(0, countryName.length).toLowerCase() ===
        countryName.toLowerCase()
      );
    });
    const countriesInfoIntroByName = countriesInfoByName.map((country) =>
      this.getCountryIntroInfo(country, countriesData)
    );
    return countriesInfoIntroByName;
  }

  async getCountryIntroInfoByRegion(regionName) {
    const countriesData = await this.countryList;
    const countriesInGivenRegion = countriesData.filter(
      (country) => country.region.toLowerCase() === regionName.toLowerCase()
    );
    const countriesIntroInfoByRegion = countriesInGivenRegion.map((country) =>
      this.getCountryIntroInfo(country, countriesData)
    );
    return countriesIntroInfoByRegion;
  }

  getCountryIntroInfo(country, countriesList) {
    const countryFlagImage = country.flags.svg;
    const countryFlagImageDescription =
      country.flags.alt === undefined
        ? `flag of ${country.name.common}`
        : country.flags.alt;
    const countryNativeName = this.getCountryNativeName(country);
    const countrySubRegion =
      country.subregion === undefined ? "N / A" : country.subregion;
    const countryTopLevelDomain = this.getCountryTopLevelDomain(country);
    const countryCurrencies = this.getCountryCurrencies(country);
    const countryLanguages = this.getCountryLanguages(country);
    const countryBorderCountries = this.getBorderCountryName(
      countriesList,
      country?.borders
    );

    const countryName = country.name.common;
    const countryPopulation = new Intl.NumberFormat().format(
      country.population
    );
    const countryRegion = country.region;
    const countryCapitalList = country.capital?.join(", ");
    const countryCapital =
      countryCapitalList === undefined ? "N / A" : countryCapitalList;
    return {
      countryFlagImage,
      countryNativeName,
      countrySubRegion,
      countryTopLevelDomain,
      countryCurrencies,
      countryLanguages,
      countryBorderCountries,
      countryFlagImageDescription,
      countryName,
      countryPopulation,
      countryRegion,
      countryCapital,
    };
  }

  getBorderCountryName(countries, borderList) {
    if (!borderList) {
      return "No Border Country";
    }

    const borderListNames = {};
    for (const country of countries) {
      borderListNames[country.cca3] = country.name.common;
    }
    const countryBorderList = borderList
      .map((borderName) => borderListNames[borderName])
      .join(",");
    return countryBorderList;
  }

  getCountryTopLevelDomain(country) {
    const countryTopLevelDomainList = country.tld?.join(", ");
    return typeof countryTopLevelDomainList !== "undefined"
      ? countryTopLevelDomainList
      : "N / A";
  }

  getCountryNativeName(country) {
    const countryNativeName = country.name.nativeName;
    if (!countryNativeName) {
      return "N / A";
    }
    return country.name.nativeName[Object.keys(countryNativeName)[0]].common;
  }

  getCountryCurrencies(country) {
    const countryCurrency = country.currencies;
    if (!countryCurrency) {
      return "N / A";
    }
    const currencyList = [];
    for (const currency in countryCurrency) {
      currencyList.push(countryCurrency[currency].name);
    }
    return currencyList.join(", ");
  }

  getCountryLanguages(country) {
    const countryLanguages = country.languages;
    if (!country.languages) {
      return "N / A";
    }
    const languageList = [];
    for (const language in countryLanguages) {
      languageList.push(countryLanguages[language]);
    }
    return languageList.join(", ");
  }
}

class CountryView {
  constructor() {
    this.countryListContainerElement = document.getElementById(
      "country-list-element"
    );
    this.countryListInfoBackBtn = document.getElementById("back-info-list-btn");
    this.searchBarInputElement = document.getElementById("search-bar-country");
    this.filterRegionSelectElement = document.getElementById(
      "filter-region-select-element"
    );
    this.detailedCountryInfoFlag = document.getElementById(
      "detailed-country-info-flag"
    );
    this.detailedCountryInfoFlagCaption = document.getElementById(
      "detailed-country-info-flag-caption"
    );
    this.detailedCountryInfoName = document.getElementById(
      "detailed-country-info-name"
    );
    this.detailedCountryInfoListInitial = document.getElementById(
      "detailed-country-info-list-initial"
    );
    this.detailedCountryInfoListSecondary = document.getElementById(
      "detailed-country-info-list-secondary"
    );
    this.detailedCountryInfoBorders = document.getElementById(
      "detailed-country-info-borders"
    );

    this.searchBarInputElement.addEventListener("input", () =>
      this.searchCountry(this.searchBarInputElement.value)
    );
    this.filterRegionSelectElement.addEventListener("change", (event) =>
      this.filterCountryByRegion(event.target.value)
    );
    this.countryListContainerElement.addEventListener("click", (event) =>
      this.showFullInfoAboutCountry(event)
    );
    this.countryListInfoBackBtn.addEventListener("click", () =>
      this.closeFullInfoAboutCountry()
    );
  }

  createCountriesIntroInfo(countryList) {
    countryList.forEach((country) => {
      const countryListElement = this.createStyledElement("li", {
        class: "countries__list-item",
        "data-country-name": country.countryName,
        "data-country-region": country.countryRegion,
        "data-filtered": "false",
        "data-country-info-id-reference": `country-${country.countryName}`,
      });
      const countryInfoElement = this.createStyledElement("article", {
        class: "countries__info",
        "data-country-info-id-reference": `country-${country.countryName}`,
      });
      const countryFlagFigureElement = this.createStyledElement("figure", {
        class: "countries__info__flag-figure",
        "data-country-info-id-reference": `country-${country.countryName}`,
      });
      const countryFlagFigureCaptionElement = this.createStyledElement(
        "figcaption",
        {
          class: "countries__info__flag-figure__caption",
          "data-country-info-id-reference": `country-${country.countryName}`,
        }
      );
      const countryFlagImageElement = this.createStyledElement("img", {
        class: "countries__info__flag",
        src: country.countryFlagImage,
        alt: country.countryFlagImageDescription,
        loading: "lazy",
        height: "150",
        width: "250",
        "data-country-info-id-reference": `country-${country.countryName}`,
      });
      const countryNameElement = this.createStyledElement("button", {
        class: "countries__info__name",
        id: `country-${country.countryName}`,
        "aria-label": `view more info about the country ${country.countryName}`,
        "data-country-info-id-reference": `country-${country.countryName}`,
        "data-country-flag-image-src": country.countryFlagImage,
        "data-country-flag-image-description":
          country.countryFlagImageDescription,
        "data-country-name": country.countryName,
        "data-country-native-name": country.countryNativeName,
        "data-country-population": country.countryPopulation,
        "data-country-region": country.countryRegion,
        "data-country-sub-region": country.countrySubRegion,
        "data-country-capital": country.countryCapital,
        "data-country-top-level-domain": country.countryTopLevelDomain,
        "data-country-currencies": country.countryCurrencies,
        "data-country-languages": country.countryLanguages,
        "data-country-border-countries": country.countryBorderCountries,
      });
      const countryInfoStatElement = this.createStyledElement("dl", {
        class: "countries__info__stats",
        "data-country-info-id-reference": `country-${country.countryName}`,
      });
      const countryStatsListValueElements = this.countryStatListValue(country);

      countryNameElement.textContent = country.countryName;
      countryFlagFigureCaptionElement.textContent = country.countryName;
      countryFlagFigureCaptionElement.hidden = true;

      countryFlagFigureElement.append(
        countryFlagImageElement,
        countryFlagFigureCaptionElement
      );
      countryStatsListValueElements.forEach((stats) =>
        countryInfoStatElement.append(stats)
      );
      countryInfoElement.append(
        countryFlagFigureElement,
        countryNameElement,
        countryInfoStatElement
      );
      countryListElement.append(countryInfoElement);

      this.countryListContainerElement.append(countryListElement);
    });
  }

  countryStatListValue(countryInfo) {
    const statListElement = [];
    const irrelevantCountryStats = [
      "countryFlagImage",
      "countryFlagImageDescription",
      "countryNativeName",
      "countrySubRegion",
      "countryTopLevelDomain",
      "countryCurrencies",
      "countryLanguages",
      "countryBorderCountries",
    ];
    for (const info in countryInfo) {
      if (irrelevantCountryStats.includes(info)) continue;

      const countryInfoStatValueElement = this.createStyledElement("div", {
        class: "countries__info__stats__value",
        "data-country-info-id-reference": `country-${countryInfo.countryName}`,
      });
      const countryInfoStatValueNameElement = this.createStyledElement("dt", {
        class: "stats__value__name",
        "data-country-info-id-reference": `country-${countryInfo.countryName}`,
      });
      const countryInfoStatValueInfoElement = this.createStyledElement("dd", {
        class: "stats__value__name__info",
        "data-country-info-id-reference": `country-${countryInfo.countryName}`,
      });

      countryInfoStatValueNameElement.textContent = `${info
        .split("country")
        .join("")}: `;
      countryInfoStatValueInfoElement.textContent = countryInfo[info];
      countryInfoStatValueElement.append(
        countryInfoStatValueNameElement,
        countryInfoStatValueInfoElement
      );

      statListElement.push(countryInfoStatValueElement);
    }
    return statListElement;
  }

  searchCountry(countryName) {
    const countryListElement = [
      ...document.querySelectorAll(
        ".countries__list-item[data-filtered='false']"
      ),
    ];
    const countryToFilter = countryListElement.filter(
      (countryElement) =>
        countryElement.dataset.countryName
          .substring(0, countryName.length)
          .toLowerCase() !== countryName.toLowerCase()
    );
    const countrySearchResult = countryListElement.filter(
      (countryElement) =>
        countryElement.dataset.countryName
          .substring(0, countryName.length)
          .toLowerCase() === countryName.toLowerCase()
    );

    countryToFilter.forEach((countryElement) => (countryElement.hidden = true));
    countrySearchResult.forEach(
      (countryElement) => (countryElement.hidden = false)
    );
  }

  filterCountryByRegion(regionName) {
    if (regionName === "all-regions") {
      this.showAllCountries();
      return;
    }
    const countryListElement = [
      ...document.querySelectorAll(".countries__list-item"),
    ];
    const countryToFilterByRegion = countryListElement.filter(
      (countryElement) =>
        countryElement.dataset.countryRegion.toLowerCase() !==
        regionName.toLowerCase()
    );
    const countryFilterRegionResult = countryListElement.filter(
      (countryElement) =>
        countryElement.dataset.countryRegion.toLowerCase() ===
        regionName.toLowerCase()
    );

    countryToFilterByRegion.forEach((countryElement) => {
      countryElement.hidden = true;
      countryElement.dataset.filtered = "true";

      this.searchCountry(this.searchBarInputElement.value);
    });
    countryFilterRegionResult.forEach((countryElement) => {
      countryElement.hidden = false;
      countryElement.dataset.filtered = "false";

      this.searchCountry(this.searchBarInputElement.value);
    });
  }

  showAllCountries() {
    const countryListElement = [
      ...document.querySelectorAll(".countries__list-item"),
    ];
    countryListElement.forEach((countryElement) => {
      countryElement.hidden = false;
      countryElement.dataset.filtered = "false";

      this.searchCountry(this.searchBarInputElement.value);
    });
  }

  showFullInfoAboutCountry({ target }) {
    const targetReference = target.dataset.countryInfoIdReference;
    if (!targetReference) return;
    const targetElement = document.getElementById(`${targetReference}`);
    this.toggleMainHeader("on");
    this.toggleCountryList("on");
    this.toggleMainCountriesInfo(targetElement, "on");
  }

  closeFullInfoAboutCountry() {
    this.toggleMainHeader("off");
    this.toggleCountryList("off");
    this.toggleMainCountriesInfo(null, "off");
    this.clearInfoCountries();
  }

  toggleMainHeader(state) {
    const mainHeaderElement = document.getElementById("main-header-element");
    if (state === "on") {
      mainHeaderElement.classList.add("main__header--hidden");
    } else if (state === "off") {
      mainHeaderElement.classList.remove("main__header--hidden");
    }
  }

  toggleCountryList(state) {
    const countryListContainer = document.getElementById(
      "country-list-container"
    );
    if (state === "on") {
      countryListContainer.hidden = true;
    } else if (state === "off") {
      countryListContainer.hidden = false;
    }
  }

  toggleMainCountriesInfo(infoElement, state) {
    const mainCountriesInfoElement = document.getElementById(
      "main-countries-info-element"
    );
    if (state === "on") {
      this.createFullCountriesInfo(infoElement.dataset);
      mainCountriesInfoElement.hidden = false;
    } else if (state === "off") {
      mainCountriesInfoElement.hidden = true;
    }
  }

  createFullCountriesInfo(countryData) {
    const {
      countryFlagImageSrc,
      countryFlagImageDescription,
      countryName,
      countryNativeName,
      countryPopulation,
      countryRegion,
      countrySubRegion,
      countryCapital,
      countryTopLevelDomain,
      countryCurrencies,
      countryLanguages,
      countryBorderCountries,
    } = countryData;
    const initialInfo = {
      "Native Name": countryNativeName,
      "Country Population": countryPopulation,
      Region: countryRegion,
      Subregion: countrySubRegion,
      "Country Capital": countryCapital,
    };
    const secondaryInfo = {
      "Top Level Domain": countryTopLevelDomain,
      Currency: countryCurrencies,
      Languages: countryLanguages,
    };

    this.detailedCountryInfoFlag.src = countryFlagImageSrc;
    this.detailedCountryInfoFlag.alt = countryFlagImageDescription;
    this.detailedCountryInfoFlagCaption.textContent = `flag of ${countryNativeName}`;
    this.detailedCountryInfoName.textContent = countryName;

    this.appendInfoList(initialInfo, this.detailedCountryInfoListInitial);
    this.appendInfoList(secondaryInfo, this.detailedCountryInfoListSecondary);
    this.createBorderList(
      countryBorderCountries,
      this.detailedCountryInfoBorders
    );
  }

  clearInfoCountries() {
    this.detailedCountryInfoFlag.src = "";
    this.detailedCountryInfoFlag.alt = "";
    this.detailedCountryInfoFlagCaption.textContent = "";
    this.detailedCountryInfoName.textContent = "";

    this.removeInfoList();
  }

  appendInfoList(infoList, infoContainer) {
    for (const infoName in infoList) {
      const infoItemContainer = this.createStyledElement("div", {
        class: "list__item__info__container",
      });
      const infoItemValue = this.createStyledElement("dt", {
        class: "info__container__value",
      });
      const infoItemInfo = this.createStyledElement("dd", {
        class: "info__container__info",
      });

      infoItemValue.textContent = `${infoName}:`;
      infoItemInfo.textContent = infoList[infoName];
      infoItemContainer.append(infoItemValue, infoItemInfo);

      infoContainer.append(infoItemContainer);
    }
  }

  removeInfoList() {
    const elementsWithInfoList = [
      this.detailedCountryInfoListInitial,
      this.detailedCountryInfoListSecondary,
      this.detailedCountryInfoBorders,
    ];
    elementsWithInfoList.forEach((list) => {
      while (list.firstElementChild) {
        list.removeChild(list.firstElementChild);
      }
    });
  }

  createBorderList(borders, borderContainer) {
    const borderList = borders.split(",");
    for (const borderName of borderList) {
      const borderNameElement = this.createStyledElement("span", {
        class: "info__border__name",
      });
      borderNameElement.textContent = borderName;
      borderContainer.append(borderNameElement);
    }
  }

  createStyledElement(elementName, elementAttributes = {}) {
    const element = document.createElement(elementName);
    for (const attribute in elementAttributes) {
      element.setAttribute(attribute, elementAttributes[attribute]);
    }
    return element;
  }
}

class CountryController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.initialCountriesLoad();
  }

  async initialCountriesLoad() {
    const countryList = await this.model.getAllCountryIntroInfo();
    this.view.createCountriesIntroInfo(countryList);
  }

  async searchCountry(countryName) {
    const searchCountryByNameResult =
      await this.model.getCountryIntroInfoByName(countryName);
    this.view.createCountriesIntroInfo(searchCountryByNameResult);
  }

  async filterCountryByRegion(regionName) {
    const filterCountryByRegionResult =
      await this.model.getCountryIntroInfoByRegion(regionName);
    this.view.createCountriesIntroInfo(filterCountryByRegionResult);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const toggleDarkMode = (state) => {
    const root = document.documentElement.style;
    const moonIcon = document.getElementById("moon-icon");

    if (state === "on") {
      root.setProperty(
        "--Element-bg",
        "var(--Very-Dark-Blue-Dark-Mode-Background)"
      );
      root.setProperty(
        "--Element-text-clr",
        "var(--White-Dark-Mode-Text-Light-Mode-Elements)"
      );
      root.setProperty(
        "--Element-text-clr-gray",
        "var(--White-Dark-Mode-Text-Light-Mode-Elements)"
      );
      root.setProperty("--Body-bg", "var(--Dark-Blue-Dark-Mode-Elements)");
      document.getElementById("theme-switcher").checked = true;
      moonIcon.className = "fa-solid fa-moon theme-switcher__moon-icon";
    } else if (state === "off") {
      root.setProperty("--Element-bg", null);
      root.setProperty("--Element-text-clr", null);
      root.setProperty("--Element-text-clr-gray", null);
      root.setProperty("--Body-bg", null);
      document.getElementById("theme-switcher").checked = false;
      moonIcon.className = "fa-regular fa-moon theme-switcher__moon-icon";
    }
  };
  const darkModeState = window.matchMedia("(prefers-color-scheme:dark)");
  const checkDarkModeState = () => {
    if (darkModeState.matches) {
      toggleDarkMode("on");
    } else if (!darkModeState.matches) {
      toggleDarkMode("off");
    }
  };
  document
    .getElementById("theme-switcher")
    .addEventListener("click", (event) => {
      if (event.target.checked) {
        toggleDarkMode("on");
      } else {
        toggleDarkMode("off");
      }
    });
  darkModeState.addEventListener("change", checkDarkModeState);
  checkDarkModeState();
});

const countryController = new CountryController(
  new CountryModel(),
  new CountryView()
);
