/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  content: [],
  daisyui: {
    themes: {
      main: {
        neutral: "#FFFFFF",
        "base-100": "#271625",
        accent: "#FCD0A1",
        primary: "#A9FFCB",
        secondary: "#016FB9",
      },
    },
  },
};
