/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
    require("tailwind-scrollbar"),
  ],
  content: [],
  daisyui: {
    themes: [
      {
        main: {
          "base-100": "#1A0F1A",
          "base-200": "#1e111d",
          neutral: "#341D33",
          accent: "#FCD0A1",
          primary: "#271625",
          info: "#2dc7d3",
          secondary: "#E2C2FF",
          error: "#942b45",
        },
      },
    ],
  },
};
