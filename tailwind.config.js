/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.html",
    "./public/**/*.js",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
      }
    },
  },
  plugins: [],
}
