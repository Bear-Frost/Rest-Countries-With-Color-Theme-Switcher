/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        darkPrimary: "hsl(209,23%,22%)",
        darkBackground: "hsl(207,26%,17%)",
        darkText: "hsl(200,15%,8%)",
        lightPrimary: "hsl(0,0%,100%)",
        lightBackground: "hsl(0,0%,98%)",
        lightText: "hsl(200,15%,8%)",
      },
      fontFamily: {
        mainFont: ["Nunito Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
