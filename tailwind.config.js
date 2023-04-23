const colors = {
  primary: "#0E0F19",
  secondary: "#A9FFCB",
  accent: "#BEE3DB",
  seasalt: "#FAF9F9",
  raisin: "#161727",
  space: "#1D1F34",
  tea_green: "#C2FFDA",
  apricot: "#FFD6BA",
};
/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [require("@tailwindcss/typography")],
  content: [],
  theme: {
    extend: {
      colors,
    },
  },
};
