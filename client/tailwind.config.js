/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#023020",
          
          "secondary": "#efeff1",
                   
          "accent": "#1fb2a6",
                   
          "neutral": "#2a323c",
                   
          "base-100": "#1e242a",
                   
          "info": "#3abff8",
                   
          "success": "#CCCCCC",
                   
          "warning": "#FF8400",
                   
          "error": "#f87272",
        },
      },
    ],
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui")],
};
