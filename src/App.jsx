import { BrowserRouter, Route, Routes } from "react-router-dom";
import CountryInfoApp from "./components/countryInfoApp";
import CountryList from "./components/countryList"
import CountryDetails from "./components/countryDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CountryInfoApp />}>
            <Route index element={<CountryList />} />
            <Route path="country/:countryName" element={<CountryDetails />}/>
          </Route>
        </Routes>
      </BrowserRouter> 
    </>
  );
}
export default App;
