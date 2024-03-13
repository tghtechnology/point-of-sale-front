import { useContext } from "react";
import CountryContext from "../context/country/CountryContext";

const useCountry = () => {
    const { countries, fetchCountries } = useContext(CountryContext);

    return { countries, fetchCountries };
}

export default useCountry;
