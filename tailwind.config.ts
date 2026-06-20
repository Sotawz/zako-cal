import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#18181b",
        acid: "#f9a8d4",
        venom: "#ec4899",
        blush: "#fbcfe8",
        bone: "#ffffff",
        cyanpop: "#f4f4f5"
      },
      boxShadow: {
        pop: "0 24px 80px rgba(255, 62, 165, 0.18)",
        hard: "0 18px 56px rgba(0, 0, 0, 0.28)"
      }
    }
  },
  plugins: []
};

export default config;
