/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '360px',
      },
      fontFamily: {
        forum: ['Forum','sans-serif']
      },
      backgroundImage: {
        'custom-hero': 'linear-gradient(rgba(4, 9, 30, 0.7), rgba(14, 16, 24, 0.7)), url("../assets/hero-element.png")',
      },
    },
  },
  plugins: [],
}

