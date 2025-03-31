import noopService from 'astro/assets/services/noop';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#39b982',
        'primary-600': '#2ea16f',
        'primary-300': '#6fcca0',
        primaryShadowed: '#009e66',
        dark: {
          card: '#1f2937',
          input: '#374151',
          border: '#374151'
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      fontWeight: {
        light: '200',
        normal: '400',
        medium: '400',
        semibold: '700',
        bold: '900',
      },
      lineHeight: {
        none: '1em',
        normal: '1.95em',
        tight: '1.5em',
        relaxed: '2.5em',
        loose: '3.5em',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards'
      }
    },
    variants: {
      extends: {
        ringColor: ['hover', 'active'],
        outline: false
      }
    },
    corePlugins: {
      outline: false
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}