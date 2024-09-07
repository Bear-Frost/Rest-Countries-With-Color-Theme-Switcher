import { Link } from "react-router-dom";

function CountryCard({ flagInfo, name, moreInfo }) {
  return (
    <Link to={`country/${name}`}>
      <div className="flex flex-col text-darkText dark:text-lightPrimary bg-lightPrimary dark:bg-darkBackground shadow-md rounded-md overflow-hidden">
        <img src={flagInfo.flagSrc} alt={flagInfo.flagAlt} width={300} height={200} className="h-full w-full"/>
        <div className="px-4 py-8 flex flex-col gap-y-4">
          <p className="text-base font-extrabold capitalize">
            {name}
          </p>
          <ul className="flex flex-col gap-y-1 justify-center">
            {moreInfo.map((info) => (
              <li className="flex gap-x-1" key={info.key}>
                <span className="text-sm font-bold capitalize">
                  {info.key}:{" "}
                </span>
                <span className="text-sm font-normal capitalize">
                  {info.value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Link>
  );
}

export default CountryCard;
