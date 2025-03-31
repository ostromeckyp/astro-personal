import noopService from 'astro/assets/services/noop';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#39b982',
        primaryShadowed: '#009e66',
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