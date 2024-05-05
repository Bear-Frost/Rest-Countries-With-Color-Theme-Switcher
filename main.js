class CountryModel {
    constructor(){
        this.countryList = this.getCountryList().then(countryData => countryData); 
    }

    async getCountryList(){
        try{ 
            const requestCountryData = await fetch("https://restcountries.com/v3.1/all");
            const responseCountryData =  await requestCountryData.json();
            return responseCountryData; 
        }
        catch(error){
            alert(error.message);
        }
    }

    async getAllCountryIntroInfo(){
        const countriesData = await this.countryList;
        const countriesIntroInfo = countriesData.map(country => this.getCountryIntroInfo(country));
        return countriesIntroInfo;
    }
    
    async getCountryIntroInfoByName(countryName){
        const countriesData = await this.countryList;
        const countriesInfoByName =  countriesData.filter(country => {
            return country.name.common.substring(0,countryName.length).toLowerCase() === countryName.toLowerCase();
        })
        const countriesInfoIntroByName = countriesInfoByName.map(country => this.getCountryIntroInfo(country));
        return countriesInfoIntroByName;
    }

    async getCountryIntroInfoByRegion(regionName){
        const countriesData =  await this.countryList;
        const countriesInGivenRegion = countriesData.filter(country => country.region.toLowerCase() === regionName.toLowerCase());
        const countriesIntroInfoByRegion = countriesInGivenRegion.map(country => this.getCountryIntroInfo(country));
        return countriesIntroInfoByRegion;
    }

    getCountryIntroInfo(country){
        const countryFlagImage = country.flags.svg;
        const countryFlagImageDescription = country.flags.alt;
        const countryName =  country.name.common;
        const countryPopulation = new Intl.NumberFormat().format(country.population);
        const countryRegion = country.region;
        const countryCapital = country.capital?.join(",");
        return {countryFlagImage,countryFlagImageDescription,countryName,countryPopulation,countryRegion,countryCapital};
    }
}

class CountryView {
    constructor(){
        this.countryListContainerElement = document.getElementById("country-list-element");
        this.searchBarInputElement = document.getElementById("search-bar-country");
        this.filterByRegionButtonElement = document.getElementById("filter-by-region-btn");
        this.filterRegionListElement = document.getElementById("region-options");
        this.regionFilterChoices = document.querySelectorAll(".region-list__option__radio");

        this.searchBarInputElement.addEventListener("input",() => this.searchCountry(this.searchBarInputElement.value));
        this.filterByRegionButtonElement.addEventListener("click",() => this.showRegionFilterList());
        this.regionFilterChoices.forEach(region => {
            region.addEventListener("click",() => this.filterCountryByRegion(region.id));
        })
    }

    createCountriesIntroInfo(countryList){
        countryList.forEach(country => {
            const countryListElement = this.createStyledElement("li",{class:"countries__list-item","data-country-name":country.countryName,"data-country-region":country.countryRegion,"data-filtered":"false"});
            const countryInfoElement = this.createStyledElement("article",{class:"countries__info"});
            const countryFlagFigureElement = this.createStyledElement("figure",{class:"countries__info__flag-figure"});
            const countryFlagFigureCaptionElement = this.createStyledElement("figcaption",{class:"countries__info__flag-figure__caption"});
            const countryFlagImageElement = this.createStyledElement("img",{class:"countries__info__flag",src:country.countryFlagImage,alt:country.countryFlagImageDescription,loading:"lazy",height:"150",width:"250"});
            const countryNameElement = this.createStyledElement("button",{class:"countries__info__name","aria-label":`view more info about ${country.countryName}`});
            const countryInfoStatElement = this.createStyledElement("ul",{class:"countries__info__stats"});
            const countryStatsListValueElements =  this.countryStatListValue(country);

            countryNameElement.textContent = country.countryName;
            countryFlagFigureCaptionElement.textContent = country.countryName;    
            countryFlagFigureCaptionElement.hidden = true;

            countryFlagFigureElement.append(countryFlagImageElement,countryFlagFigureCaptionElement); 
            countryStatsListValueElements.forEach(stats => countryInfoStatElement.append(stats)) 
            countryInfoElement.append(countryFlagFigureElement,countryNameElement,countryInfoStatElement);
            countryListElement.append(countryInfoElement);  

            this.countryListContainerElement.append(countryListElement);
        });
    }

    countryStatListValue(countryInfo){
        const statListElement = [];
        const irrelevantCountryStats = ["countryFlagImage","countryFlagImageDescription"];
        for(const info in countryInfo){
            if(irrelevantCountryStats.includes(info)) continue; 

            const countryInfoStatValueElement = this.createStyledElement("li",{class:"countries__info__stats__value"});
            const countryInfoStatValueNameElement = this.createStyledElement("span",{class:"stats__value__name"});
            const countryInfoStatValueInfoElement = this.createStyledElement("span",{class:"stats__value__name__info"});              
    
            countryInfoStatValueNameElement.textContent = `${info.split("country").join("")}: `;
            countryInfoStatValueInfoElement.textContent = countryInfo[info];
            countryInfoStatValueElement.append(countryInfoStatValueNameElement,countryInfoStatValueInfoElement);

            statListElement.push(countryInfoStatValueElement);
        }
        return statListElement;
    }

    searchCountry(countryName){
       const countryListElement = [...document.querySelectorAll(".countries__list-item[data-filtered='false']")];
       const countryToFilter = countryListElement.filter(countryElement => countryElement.dataset.countryName.substring(0,countryName.length).toLowerCase() !== countryName.toLowerCase());
       const countrySearchResult = countryListElement.filter(countryElement => countryElement.dataset.countryName.substring(0,countryName.length).toLowerCase() === countryName.toLowerCase());

       countryToFilter.forEach(countryElement => countryElement.hidden = true);
       countrySearchResult.forEach(countryElement => countryElement.hidden = false);
    }

    filterCountryByRegion(regionName){
        if(regionName === "all-regions"){
            this.showAllCountries();
            return;
        }
        const countryListElement = [...document.querySelectorAll(".countries__list-item")];
        const countryToFilterByRegion = countryListElement.filter(countryElement => countryElement.dataset.countryRegion.toLowerCase() !== regionName.toLowerCase());
        const countryFilterRegionResult  = countryListElement.filter(countryElement => countryElement.dataset.countryRegion.toLowerCase() === regionName.toLowerCase());

        countryToFilterByRegion.forEach(countryElement => {
            countryElement.hidden = true;
            countryElement.dataset.filtered = "true";

            this.searchCountry(this.searchBarInputElement.value);
        });
        countryFilterRegionResult.forEach(countryElement => {
            countryElement.hidden = false;
            countryElement.dataset.filtered = "false";

            this.searchCountry(this.searchBarInputElement.value);
        }); 
    }

    showAllCountries(){
        const countryListElement = [...document.querySelectorAll(".countries__list-item")];
        countryListElement.forEach(countryElement => {
            countryElement.hidden = false;
            countryElement.dataset.filtered = "false";

            this.searchCountry(this.searchBarInputElement.value);
        })
    }

    showRegionFilterList(){
        if(this.filterByRegionButtonElement.dataset.state === "close"){
            this.filterRegionListElement.hidden = false;
            this.filterByRegionButtonElement.dataset.state = "open"
        } 
        else {
            this.filterRegionListElement.hidden = true;
            this.filterByRegionButtonElement.dataset.state = "close"
        }
    }

    createStyledElement(elementName,elementAttributes = {}){
        const element = document.createElement(elementName);
        for(const attribute in elementAttributes){
            element.setAttribute(attribute,elementAttributes[attribute]);
        }
        return element;
    }
}

class CountryController {
    constructor(model,view){
        this.model = model;
        this.view = view;        

        this.initialCountriesLoad();
    }

    async initialCountriesLoad(){
        const countryList = await this.model.getAllCountryIntroInfo();
        this.view.createCountriesIntroInfo(countryList);
    }

    async searchCountry(countryName){
        const searchCountryByNameResult = await this.model.getCountryIntroInfoByName(countryName);
        this.view.createCountriesIntroInfo(searchCountryByNameResult);
    }

    async filterCountryByRegion(regionName){
        const filterCountryByRegionResult = await this.model.getCountryIntroInfoByRegion(regionName);
        this.view.createCountriesIntroInfo(filterCountryByRegionResult);
    }
}

window.addEventListener("DOMContentLoaded",() => {

    const toggleDarkMode = (state) => {
        const root = document.documentElement.style;
        const moonIcon = document.getElementById("moon-icon"); 

        if(state === "on"){
            root.setProperty("--Element-bg","var(--Very-Dark-Blue-Dark-Mode-Background)");
            root.setProperty("--Element-text-clr","var(--White-Dark-Mode-Text-Light-Mode-Elements)");
            root.setProperty("--Element-text-clr-gray","var(--White-Dark-Mode-Text-Light-Mode-Elements)");  
            root.setProperty("--Body-bg","var(--Dark-Blue-Dark-Mode-Elements)");
            document.getElementById("theme-switcher").checked = true;
            moonIcon.className = "fa-solid fa-moon theme-switcher__moon-icon";
        } 

        else if(state  === "off") {
            root.setProperty("--Element-bg",null);
            root.setProperty("--Element-text-clr",null);
            root.setProperty("--Element-text-clr-gray",null);
            root.setProperty("--Body-bg",null);
            document.getElementById("theme-switcher").checked = false;
            moonIcon.className = "fa-regular fa-moon theme-switcher__moon-icon";

        }
    }
    const darkModeState = window.matchMedia("(prefers-color-scheme:dark)");
    const checkDarkModeState = () => {
        if(darkModeState.matches){
            toggleDarkMode("on");
        }
        else if(!darkModeState.matches) {
            toggleDarkMode("off");
        }
    }
    document.getElementById("theme-switcher").addEventListener ("click",(event) => {
        if(event.target.checked){
            toggleDarkMode("on");
        } 
        else {
            toggleDarkMode("off");
        }
    });
    darkModeState.addEventListener("change",checkDarkModeState);
    checkDarkModeState();
})

const countryController = new CountryController(new CountryModel(),new CountryView());