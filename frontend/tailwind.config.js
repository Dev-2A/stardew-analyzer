/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stardew: {
          brown:  "#8B6914",
          green:  "#5D9E4E",
          yellow: "#F5D76E",
          blue:   "#5B8DD9",
          bg:     "#FDF6E3",
          card:   "#FFFBF0",
        },
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'],
      },
    },
  },
  plugins: [],
}