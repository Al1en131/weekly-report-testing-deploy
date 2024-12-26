import type { Config } from "tailwindcss/types";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        "dash-nav": ["40px", "56px"],
        "2.5xl": ["28px", "40px"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#1B4E6B",
        secondary: "#FFDE59",
        button: "#5EACDD",
        border: "rgba(255, 255, 255, 0.16)",
        tersier: "#90A3BF",
        grey: "#B3C4CE",
        danger: "#D45B53",
      },

      animation: {
        hilang: "hilang 0.4s forwards",
      },
      keyframes: {
        hilang: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0", display: "none" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
