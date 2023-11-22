const colors = require('tailwindcss/colors')
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './assets/**/*.{vue,js,css}',
      './components/**/*.{vue,js}',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './plugins/**/*.{js,ts}',
      './nuxt.config.{js,ts}',
    ],
    variants: {
      extend: {},
    },
    plugins: [require("@tailwindcss/forms"), require("@headlessui/tailwindcss")],
    theme: {
      extend: {
        colors: {
          transparent: 'transparent',
          current: 'currentColor',
          'darkest': '#18232D',
          'dark': '#243945',
          'semi-dark': '',
          'tcwc-sub': '#33515D',
          'btn-submit': '#31B287',
        },
        fontFamily: {
          'poppins': ['Poppins'],
        }
      }
    },
    safelist: [
      'bg-transparent',
      'bg-current',
      'bg-darkest',
      'bg-dark',
      'bg-tcwc-sub',
      'bg-btn-submit',
    ],
  };