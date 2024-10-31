/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';
export const content = ['./public/**/*.{html,js}', './index.html', './profile.html', './navbar.html'];
export const theme = {
  extend: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'purple': '#3f3cbb',
      'midnight': '#121063',
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
      'primary1': '#c86b85',
      'primary2': '#E6A4B4',
      'primary3': '#F3D7CA',
      'primary4': '#F5EEE6'
    },
    fontFamily: {
      'montserrat': ['Montserrat', 'sans-serif'],
    },
    
  },
};
export const plugins = [
  require('@tailwindcss/line-clamp'),
  plugin(function ({ addUtilities }) {
    addUtilities({
      '.no-scrollbar': {
        '-ms-overflow-style': 'none', // IE and Edge
        'scrollbar-width': 'none', // Firefox
      },
      '.no-scrollbar::-webkit-scrollbar': {
        'display': 'none', // Chrome, Safari and Opera
      },
      '.custom-upload-button': {
          '@apply bg-blue-500 text-white font-bold py-2 px-4 rounded-full cursor-pointer': {},
      },
      '.custom-upload-button:hover': {
        '@apply bg-blue-700': {},
      }
    });
  }),
];

