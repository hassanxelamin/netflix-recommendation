/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        arial: ["Arial"],
      },
      width: {
        'calc': 'calc(100% - 10rem)',
      },
    },
  },
  plugins: [],
}