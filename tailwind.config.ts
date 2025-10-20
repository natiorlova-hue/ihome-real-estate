import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base
        base: {
          white: "#FFFFFF",
          black: "#000000",
        },

        // Gray (Neutral)
        gray: {
          25: "#FCFCFD",
          50: "#F9FAFB",
          100: "#F2F4F7",
          200: "#E4E7EC",
          300: "#D0D5DD",
          400: "#98A2B3",
          500: "#667085",
          600: "#475467",
          700: "#344054",
          800: "#1D2939",
          900: "#101828",
          950: "#0C111D",
        },

        // Brand Orange (Terracotta) - PRIMARY
        terracotta: {
          25: "#FFFAF5",
          50: "#FFF4ED",
          100: "#FFE6D5",
          200: "#FFD6AE",
          300: "#FF9C66",
          400: "#FF692E",
          500: "#d87a4e", // 🔥 MAIN BRAND
          600: "#C2410C",
          700: "#9C2A10",
          800: "#7E1D0E",
          900: "#771D1D",
          950: "#4C0D0D",
        },

        // Mediterranean Blue - SECONDARY
        mediterranean: {
          25: "#F5FEFF",
          50: "#ECFDFF",
          100: "#CFF9FE",
          200: "#A5F0FC",
          300: "#67E3F9",
          400: "#22CCEE",
          500: "#0ea5e9", // 🔥 MAIN BLUE
          600: "#0E7090",
          700: "#155B75",
          800: "#164C63",
          900: "#134E4A",
          950: "#0D2D3A",
        },

        // Error (Red)
        error: {
          50: "#FEF3F2",
          500: "#F04438",
          700: "#B42318",
        },

        // Success (Green)
        success: {
          50: "#ECFDF3",
          500: "#12B76A",
          700: "#027A48",
        },

        // Warning (Amber)
        warning: {
          50: "#FFFAEB",
          500: "#F79009",
          700: "#B54708",
        },
      },

      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
      },

      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
      },

      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },

      borderRadius: {
        "4xl": "2rem",
      },

      boxShadow: {
        xs: "0 1px 2px 0 rgba(16, 24, 40, 0.05)",
        sm: "0 1px 3px 0 rgba(16, 24, 40, 0.1)",
        md: "0 4px 8px -2px rgba(16, 24, 40, 0.1)",
        lg: "0 12px 16px -4px rgba(16, 24, 40, 0.08)",
        xl: "0 20px 24px -4px rgba(16, 24, 40, 0.08)",
        "2xl": "0 24px 48px -12px rgba(16, 24, 40, 0.18)",
      },

      animation: {
        fadeIn: "fadeIn 0.6s ease-out",
        slideUp: "slideUp 0.6s ease-out",
        "pulse-subtle": "pulse-subtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
      },

      zIndex: {
        dropdown: "1000",
        sticky: "1020",
        fixed: "1030",
        modal: "1050",
      },
    },
  },
  plugins: [],
}

export default config
