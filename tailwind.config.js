const colors = {
  primary: "#0E0F19",
  secondary: "#A9FFCB",
  accent: "#BEE3DB",
};
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        seasalt: "#FAF9F9",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          ...colors,
        },
      },
    ],
  },
};
