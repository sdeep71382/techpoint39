import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        royal: "#0857d6",
        navy: "#071f4f",
        ink: "#07101f",
        signal: "#ffd21f",
        location: "#e11d2f",
      },
      boxShadow: {
        lift: "0 24px 70px rgba(7, 31, 79, 0.16)",
        card: "0 18px 45px rgba(7, 31, 79, 0.10)",
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        marquee: "marquee 22s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
