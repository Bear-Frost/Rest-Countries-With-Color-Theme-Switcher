import { FaArrowLeftLong } from "react-icons/fa6";
import { useParams, Link, useNavigate } from "react-router-dom";
import useCountryInfo from "../hooks/useCountryInfo";
import { getCountryFullDetails } from "../utils/getCountryFullDetail";
import CountryDetailsList from "./countryDetailsList";

function CountryDetails() {
  const { countryName } = useParams();
  const navigate = useNavigate();
  const [countryInfo, setCountryInfo] = useCountryInfo(countryName);
  const details = getCountryFullDetails(countryInfo);
  const handleBackHomePage = () => {
    navigate("/");
  };
  return (
    details && (
      <section className="py-8 px-5 flex flex-col gap-y-12 text-darkText dark:text-lightPrimary">
        <div className="flex justify-start">
          <button
            className="py-2 px-8 flex items-center gap-x-4 bg-lightPrimary dark:bg-darkBackground shadow-md"
            onClick={handleBackHomePage}
          >
            <FaArrowLeftLong />
            <span className="text-base font-medium capitalize">back</span>
          </button>
        </div>

        <section className="flex flex-col gap-y-8 lg:flex-row lg:gap-x-[5rem] lg:items-center">
          <img src={details.flag} alt={details.flagAlt} className="lg:max-w-[35rem] lg:max-h-[25rem] lg:shadow-md"/>
          <div className="lg:flex lg:flex-col lg:gap-8 lg:p-8 lg:flex-1">
            <p className="font-extrabold text-xl capitalize mt-8 lg:mt-0">{details.name}</p>

            <div className="flex flex-col gap-y-8 lg:flex-row lg:justify-between lg:flex-wrap lg:gap-x-[5rem]">
              <ul className="flex flex-col gap-y-4">
                {details.topInfo.map((info) => {
                  const [key, value] = details.loadInfo(info);
                  return (
                    <CountryDetailsList
                      key={key}
                      keyItem={key}
                      valueItem={value}
                    />
                  );
                })}
              </ul>
              <ul className="flex flex-col gap-y-4">
                {details.secondaryInfo.map((info) => {
                  const [key, value] = details.loadInfo(info);
                  return (
                    <CountryDetailsList
                      key={key}
                      keyItem={key}
                      valueItem={value}
                    />
                  );
                })}
              </ul>
            </div>

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center mt-8">
              <p className="font-extrabold text-base capitalize">
                border countries:
              </p>
              <div className="flex flex-wrap gap-x-2 gap-y-4">
                {details.borders.map((border) => (
                  (border !== "No Borders") ? (<Link
                    to={`/country/${border}`}
                    key={border}
                    className="py-2 px-4 text-base font-medium shadow-md capitalize bg-lightPrimary dark:bg-darkBackground rounded-sm"
                  >
                    {border}
                  </Link>) : <span key={border}>{border}</span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </section>
    )
  );
}

export default CountryDetails;
