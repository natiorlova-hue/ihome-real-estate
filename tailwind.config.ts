import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.module.css",
    "./components/**/*.module.css",
  ],
  theme: {
    extend: {
      colors: {
        // ====================================
        // SHADCN/UI CSS VARIABLES
        // ====================================
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // ====================================
        // BASE COLORS
        // ====================================
        base: {
          white: "#FFFFFF",
          black: "#000000",
        },

        tertiary: {
          600: "#535862",
        },

        // ====================================
        // GRAY (Neutral)
        // ====================================
        gray: {
          25: "#FCFCFD",
          50: "#FAFAFA",
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

        // ====================================
        // BRAND ORANGE (Terracotta) - PRIMARY
        // ====================================
        terracotta: {
          25: "#FFFAF5",
          50: "#FFF4ED",
          100: "#FFE6D5",
          200: "#FAD3AE",
          300: "#FF9C66",
          400: "#FF692E",
          500: "#EF651A", // 🔥 MAIN BRAND
          600: "#C2410C",
          700: "#9C2A10",
          800: "#7E1D0E",
          900: "#771D1D",
          950: "#4C0D0D",
        },

        // ====================================
        // MEDITERRANEAN BLUE - SECONDARY
        // ====================================
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

        // ====================================
        // ERROR (Red)
        // ====================================
        error: {
          25: "#FFFBFA",
          50: "#FEF3F2",
          100: "#FEE4E2",
          200: "#FECDCA",
          300: "#FDA29B",
          400: "#F97066",
          500: "#F04438",
          600: "#D92D20",
          700: "#B42318",
          800: "#912018",
          900: "#7A271A",
        },

        // ====================================
        // SUCCESS (Green)
        // ====================================
        success: {
          25: "#F6FEF9",
          50: "#ECFDF3",
          100: "#D1FADF",
          200: "#A6F4C5",
          300: "#6CE9A6",
          400: "#32D583",
          500: "#12B76A",
          600: "#039855",
          700: "#027A48",
          800: "#05603A",
          900: "#054F31",
        },

        // ====================================
        // WARNING (Amber)
        // ====================================
        warning: {
          25: "#FFFCF5",
          50: "#FFFAEB",
          100: "#FEF0C7",
          200: "#FEDF89",
          300: "#FEC84B",
          400: "#FDB022",
          500: "#F79009",
          600: "#DC6803",
          700: "#B54708",
          800: "#93370D",
          900: "#7A2E0E",
        },

        // ====================================
        // SECONDARY COLORS
        // ====================================

        // Blue light (для info, links)
        "blue-light": {
          25: "#F5FBFF",
          50: "#F0F9FF",
          100: "#E0F2FE",
          200: "#B9E6FE",
          300: "#7CD4FD",
          400: "#36BFFA",
          500: "#0BA5EC",
          600: "#0086C9",
          700: "#026AA2",
          800: "#065986",
          900: "#0B4A6F",
        },

        // Purple (для premium features)
        purple: {
          25: "#FAFAFF",
          50: "#F4F3FF",
          100: "#EBE9FE",
          200: "#D9D6FE",
          300: "#BDB4FE",
          400: "#9B8AFB",
          500: "#7A5AF8",
          600: "#6938EF",
          700: "#5925DC",
          800: "#4A1FB8",
          900: "#3E1C96",
        },

        // Fuchsia (для luxury)
        fuchsia: {
          25: "#FEFAFF",
          50: "#FDF4FF",
          100: "#FBE8FF",
          200: "#F6D0FE",
          300: "#EEAAFD",
          400: "#E478FA",
          500: "#D444F1",
          600: "#BA24D5",
          700: "#9F1AB1",
          800: "#821890",
          900: "#6F1877",
        },

        // Rose (для romantic properties)
        rose: {
          25: "#FFF5F6",
          50: "#FFF1F3",
          100: "#FFE4E8",
          200: "#FECDD6",
          300: "#FEA3B4",
          400: "#FD6F8E",
          500: "#F63D68",
          600: "#E31B54",
          700: "#C01048",
          800: "#A11043",
          900: "#89123E",
        },

        // Yellow (для highlights)
        yellow: {
          25: "#FEFDF0",
          50: "#FEFBE8",
          100: "#FEF7C3",
          200: "#FEEE95",
          300: "#FDE272",
          400: "#FAC515",
          500: "#EAAA08",
          600: "#CA8504",
          700: "#A15C07",
          800: "#854A0E",
          900: "#713B12",
        },

        brandBlue: {
          400: "#7CA6DE",
          500: "#5A85D3",
          600: "#496EC7",
        },
      },

      // ====================================
      // TYPOGRAPHY
      // ====================================
      fontFamily: {
        sans: ["Noto Sans", "system-ui", "sans-serif"],
        serif: ["Noto Serif", "Georgia", "serif"],
        "noto-serif": ["Noto Serif", "Georgia", "serif"],
        "noto-sans": ["Noto Sans", "system-ui", "sans-serif"],
      },

      // ====================================
      // CONTAINER
      // ====================================
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem", // 16px mobile
          sm: "1.5rem", // 24px
          lg: "2rem", // 32px
        },
        screens: {
          DEFAULT: "100%",
          sm: "100%",
          md: "100%",
          lg: "100%",
          xl: "1224px", // 1192 content + 32 padding
          "2xl": "1320px", // 1288 content + 32 padding
        },
      },
      maxWidth: {
        page: "1440px",
        benefits: "1054px",
        tabs: "800px",
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.125rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1rem", { lineHeight: "1.5rem" }],
        xl: ["1.125rem", { lineHeight: "1.75rem" }],
        dxs: ["1.25rem", { lineHeight: "1.875rem" }],
        dsm: ["1.5rem", { lineHeight: "2rem" }],
        dmd: ["1.875rem", { lineHeight: "2.375rem" }],
        dlg: ["2.25rem", { lineHeight: "2.75rem" }],
        dxl: ["3rem", { lineHeight: "3.75rem" }],
        d2xl: ["3.75rem", { lineHeight: "4.5rem" }],
        // serif
        serifsm: ["1.875rem", { lineHeight: "2.375rem" }],
        serifmd: ["2.25rem", { lineHeight: "2.75rem" }],
        seriflg: ["3rem", { lineHeight: "3.75rem" }],
        serifxl: ["3.75rem", { lineHeight: "4.5rem" }],
        serif2xl: ["4.5rem", { lineHeight: "6.625rem" }],

        // benefits tokens (Figma)
        benefitsHeading: ["3rem", { lineHeight: "3.75rem" }], // 48/60
      },

      // ====================================
      // SPACING
      // ====================================
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },

      // ====================================
      // BORDER RADIUS
      // ====================================
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "4xl": "2rem",
      },

      // ====================================
      // BOX SHADOW
      // ====================================
      boxShadow: {
        xs: "0 1px 2px 0 rgba(16, 24, 40, 0.05)",
        sm: "0 1px 3px 0 rgba(16, 24, 40, 0.1)",
        md: "0 4px 8px -2px rgba(16, 24, 40, 0.1)",
        lg: "0 12px 16px -4px rgba(16, 24, 40, 0.08)",
        xl: "0 20px 24px -4px rgba(16, 24, 40, 0.08)",
        "2xl": "0 24px 48px -12px rgba(16, 24, 40, 0.18)",
      },

      // ====================================
      // ANIMATIONS
      // ====================================
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeIn: "fadeIn 0.6s ease-out",
        slideUp: "slideUp 0.6s ease-out",
        slideDown: "slideDown 0.4s ease-out",
        "pulse-subtle": "pulse-subtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-subtle": "bounce-subtle 2s infinite",
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        "bounce-subtle": {
          "0%, 100%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(-10px)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },

      // ====================================
      // Z-INDEX
      // ====================================
      zIndex: {
        dropdown: "1000",
        sticky: "1020",
        fixed: "1030",
        modal: "1050",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
