/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/daisyui/dist/**/*.js",
    "node_modules/react-daisyui/dist/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [...defaultTheme.fontFamily.sans],
        sub: ["Roboto"],
      },
      colors: {
        "link-hover": "#383838",
        "primary-hover":
          "color-mix(oklab, oklch(var(--btn-color, var(--b2)) / var(--tw-bg-opacity, 1)) 90%, black)",
        "gray-50": "#ababab",
        "gray-100": "#969696",
        "gray-200": "#828282",
        "gray-300": "#6f6f6f",
      },
      boxShadow: {
        sideBar: "10px 0 30px -2px #D9D9D9",
        mainMenu: "0px 4px 12.100000381469727px 0px #00000040",
        tableItem: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        headerMenu: "rgba(0, 0, 0, 0.1) 0px 2px 1px 0px",
      },
      borderRadius: {
        modal: "16px",
      },
      backgroundImage: {},
    },
  },
  plugins: [
    require("daisyui"),
    require("tailwind-scrollbar"),
    require("tailwind-scrollbar-hide"),
  ],

  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#5e90cc",
          "text-primary-content": "#5e90cc",
          secondary: "#86aad7",
          "text-secondary-content": "#86aad7",
          info: "#312e91",
          success: "#009485",
          warning: "#ff9900",
          error: "#e53e3e",
        },
      },
    ],
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot: ":root",
  },
  theme: {
    extend: {
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },  
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        marquee: 'marquee 50s linear infinite', 
      },
    },
  },
  plugins: [],
};
