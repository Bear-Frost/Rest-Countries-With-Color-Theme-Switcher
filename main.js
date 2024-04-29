window.addEventListener("DOMContentLoaded",() => {

    const toggleDarkMode = (state) => {
        const root = document.documentElement.style;
        const moonIcon = document.getElementById("moon-icon");

        if(state === "on"){
            root.setProperty("--Element-bg","var(--Very-Dark-Blue-Dark-Mode-Background)");
            root.setProperty("--Element-text-clr","var(--White-Dark-Mode-Text-Light-Mode-Elements)");
            root.setProperty("--Element-text-clr-gray","var(--White-Dark-Mode-Text-Light-Mode-Elements)");  
            root.setProperty("--Body-bg","var(--Dark-Blue-Dark-Mode-Elements)");
            moonIcon.className = "fa-solid fa-moon theme-switcher__moon-icon";
        } 

        else if(state  === "off") {
            root.setProperty("--Element-bg",null);
            root.setProperty("--Element-text-clr",null);
            root.setProperty("--Element-text-clr-gray",null);
            root.setProperty("--Body-bg",null);
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