import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },

  // Add your plugins, themes, settings, and variants here
  // Added daisyUI plugin here to enable dark mode support in the project using daisyUI plugin
  plugins: [require("daisyui")],
  daisyui: { themes: ["dark"] },
} satisfies Config;
