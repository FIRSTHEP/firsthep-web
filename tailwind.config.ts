/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.vue'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
