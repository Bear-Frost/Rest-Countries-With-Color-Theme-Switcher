import { FaSearch } from "react-icons/fa";

function SearchBar({ handleUpdateCountryRegion ,countryName}) {
  return (
    <div className="w-full lg:w-max text-darkPrimary dark:text-lightPrimary flex flex-row gap-x-4 p-4 lg:px-8 items-center rounded-md bg-lightPrimary dark:bg-darkBackground shadow-md">
      <FaSearch className="text-sm" aria-hidden="true" />
      <input
        id="searchInput"
        type="text"
        placeholder="Search for a country..."
        aria-label="Search for a country"
        className="px-4 py-2 text-sm placeholder:text-inherit flex-1 bg-inherit"
        value={countryName}
        onChange={(e) =>
          handleUpdateCountryRegion(e.target.value, "countryName")
        }
      />
    </div>
  );
}

export default SearchBar;
