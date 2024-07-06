/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: "#00b2e2",
        secondary: "#c64b9b",
        text: "#7a7a7a",
        accent: "#00b2e2",
        "color-primary": "#00b2e2",
        "color-secondary": "#c64b9b",
        "color-text": "#7a7a7a",
        "color-accent": "#00b2e2",
        "color-dark": "#000",
        "color-light": "#fff",
        "color-tertiary": "#4054b2",
        "color-quaternary": "#23a455",
        "color-gray": "#f6f6f6",
        "color-muted": "#e0dede",
        "color-dark-muted": "#282a2b",
        "color-dark-text": "#363636",
      },
	  fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        din: ['DIN Medium', 'sans-serif'],
	  },
    },
  },
  plugins: [],
};
