import { FaRegMoon,FaMoon } from "react-icons/fa";
import UseDarkMode from "../hooks/useDarkMode";

function DarkModeButton() {
    const [theme,setTheme] = UseDarkMode();
    const handleChangeTheme = () => {
        setTheme(t => (t === "dark") ? "light" : "dark");
    }
    return ( 
        <button className="font-bold flex gap-x-2 capitalize" onClick={handleChangeTheme}>
            {(theme === "dark") ? <FaMoon />  : <FaRegMoon/>} 
            <span className="text-sm">dark mode</span>
        </button>
    );
}

export default DarkModeButton;