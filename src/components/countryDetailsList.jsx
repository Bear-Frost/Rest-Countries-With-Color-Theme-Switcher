function CountryDetailsList({keyItem,valueItem}) {
    return (
        <li className="flex gap-x-1">
            <span className="font-bold text-base capitalize">{keyItem}: </span>
            <span className="font-medium text-base capitalize">{valueItem}</span>
        </li>
    );
}

export default CountryDetailsList;