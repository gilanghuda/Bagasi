/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';
export const content = ['./public/**/*.{html,js}'];
export const theme = {
  extend: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'primary': '#c86b85',
      'secondary': '#E6A4B4',
      'tertiary': '#F3D7CA',
      'quaternary': '#F5EEE6'
    },
    fontFamily: {
      'montserrat': ['Montserrat', 'sans-serif'],
    },
    borderColor: { 
      'secondary': 'rgb(230 164 180 / var(--tw-border-opacity))', 
      'primary': 'rgb(200, 107, 133 / var(--tw-border-opacity))'
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

