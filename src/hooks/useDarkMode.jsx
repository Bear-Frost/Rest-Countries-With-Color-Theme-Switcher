import { useEffect, useState } from "react";

function UseDarkMode() {
    const userDefaultTheme = (window.matchMedia("(prefers-color-scheme:dark)").matches) ? "dark" : "light";
    const userSetTheme = localStorage.getItem("rest-country-theme");
    const currentTheme = userSetTheme ?? userDefaultTheme;
    const [theme,setTheme] = useState(currentTheme);

    useEffect(() => {
        document.documentElement.setAttribute("class",theme);
        localStorage.setItem("rest-country-theme",theme);
    },[theme]);

    return [theme,setTheme];
}

export default UseDarkMode;