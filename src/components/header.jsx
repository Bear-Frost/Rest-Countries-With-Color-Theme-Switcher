import DarkModeButton from "./darkModeButton";

function Header() {
    return (        
        <header className="flex flex-col gap-y-4 text-darkText bg-lightPrimary dark:bg-darkBackground dark:text-lightPrimary">
            <div className="px-4 py-8 flex justify-between shadow-md">
                <h1 className="text-base font-extrabold">Where in the world?</h1>
                <DarkModeButton />
            </div>
        </header>
    );
}

export default Header;