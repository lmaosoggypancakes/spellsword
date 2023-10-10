const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Tektur"],
      },
      boxShadow: {
        "inset-accent": "inset 0 0 10px #FCD0A1",
        "inset-info": "inset 0 0 10px #78e5ee",
        "inset-secondary": "inset 0 0 10px #E2C2FF",
        "inset-left-info": "inset 15px 0 15px 15px #75e5ee",
      },
      textShadow: {
        sm: "0 4px 8px var(--tw-shadow-color)",
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        marquee2: "marquee2 30s linear infinite",
        "spin-slow": "spin 3s linear infinite",
        "spin-super-slow-backwards": "spin 60s linear infinite reverse",
        "spin-super-slow": "spin 60s linear infinite",
        "bounce-slow": "bounce 3s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateY(0%)" },
          "100%": { transform: "translateY(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0%)" },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
    require("tailwind-scrollbar"),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
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
          info: "#78e5ee",
          secondary: "#E2C2FF",
          error: "#dc4762",
        },
      },
    ],
  },
};
