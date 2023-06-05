/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  content: [],
  daisyui: {
    themes: [
      {
        main: {
          "base-100": "#1A0F1A",
          "base-200": "#1B0E1B",
          neutral: "#341D33",
          accent: "#FCD0A1",
          primary: "#271625",

          secondary: "#E2C2FF",
        },
      },
    ],
  },
};
