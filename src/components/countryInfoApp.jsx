import { Outlet } from "react-router-dom";

import Header from "./header";

function CountryInfoApp() {
    return (
       <>
         <Header /> 
         <Outlet />
       </> 
    );
}

export default CountryInfoApp;