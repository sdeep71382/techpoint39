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
        /* Brand palette. Hex values are unchanged from the supplied identity. */
        royal: "#0857d6",
        "royal-deep": "#0750b0",
        navy: "#071f4f",
        "navy-deep": "#061630",
        ink: "#07101f",
        signal: "#ffd21f",
        alert: "#e11d2f",

        /* Surfaces */
        canvas: "#f7f9fc",
        paper: "#ffffff",
        tint: "#dbe7f5",

        /* Lines and text */
        line: "#dbe3ee",
        "line-strong": "#c3cedd",
        muted: "#5a6a80",
        "muted-strong": "#475569",

        /* Text on dark navy surfaces */
        "on-navy": "#ffffff",
        "on-navy-soft": "#c7d7f0",
        "on-navy-muted": "#b8c7e1",
      },

      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-inter)", "ui-sans-serif", "sans-serif"],
        gurmukhi: ["var(--font-gurmukhi)", "var(--font-inter)", "sans-serif"],
        devanagari: ["var(--font-devanagari)", "var(--font-inter)", "sans-serif"],
      },

      /* One scale, round values, every size paired with a line height. */
      fontSize: {
        kicker: ["0.75rem", { lineHeight: "1rem", letterSpacing: "0.14em" }],
        micro: ["0.8125rem", { lineHeight: "1.15rem" }],
        small: ["0.875rem", { lineHeight: "1.4rem" }],
        body: ["1rem", { lineHeight: "1.65rem" }],
        lead: ["1.125rem", { lineHeight: "1.7rem" }],
        "lead-lg": ["1.25rem", { lineHeight: "1.75rem" }],
        h4: ["1.0625rem", { lineHeight: "1.5rem" }],
        h3: ["1.3125rem", { lineHeight: "1.6rem" }],
        h2: ["clamp(1.75rem, 1.3rem + 1.9vw, 2.6rem)", { lineHeight: "1.14", letterSpacing: "-0.021em" }],
        /*
         * The cap is 3.75rem rather than 4.15rem. In the hero's text column
         * (507px at 1280px) a 66px headline broke to five lines and pushed the
         * whole hero past the fold. At 60px it breaks to four, which keeps the
         * hero on one screen without making the headline feel small.
         */
        h1: ["clamp(2.4rem, 1.5rem + 3.9vw, 3.75rem)", { lineHeight: "1.04", letterSpacing: "-0.032em" }],
      },

      /*
       * 800 and 900 are mapped down to a real 700 on purpose. The previous build asked
       * for weights the fallback font does not have, so the browser synthesised a faux
       * bold. Anything still asking for `font-extrabold` / `font-black` now renders as a
       * genuine bold instead of a smear.
       */
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "700",
        black: "700",
      },

      maxWidth: {
        shell: "1280px",
        prose: "68ch",
      },

      borderRadius: {
        card: "14px",
        panel: "18px",
      },

      boxShadow: {
        card: "0 1px 2px rgba(7, 31, 79, 0.04), 0 10px 30px -14px rgba(7, 31, 79, 0.16)",
        cardHover: "0 2px 4px rgba(7, 31, 79, 0.05), 0 22px 46px -16px rgba(7, 31, 79, 0.24)",
        header: "0 1px 0 rgba(7, 31, 79, 0.07), 0 10px 28px -16px rgba(7, 31, 79, 0.2)",
        panel: "0 30px 70px -24px rgba(7, 31, 79, 0.26)",
        cta: "0 10px 24px -8px rgba(8, 87, 214, 0.42)",
      },

      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
