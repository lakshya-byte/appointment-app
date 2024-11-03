/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        sans: ['baloo-bhai-2', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
