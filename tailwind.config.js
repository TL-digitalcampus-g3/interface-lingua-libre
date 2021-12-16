module.exports = {
  prefix: '',
  important: false,
  separator: ':',
  darkMode: 'class',
  theme: {
    screens: {
      xs: '340px',
      sm: '610px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    zIndex: {
      0: 0,
      1: 1,
      10: 10,
      20: 20,
      25: 25,
      30: 30,
      40: 40,
      50: 50,
      75: 75,
      100: 100,
      900: 900,
      1000: 1000,
      auto: 'auto',
    },
    extend: {
      fontSize: {
        xxs: '0.625rem',
      },
      colors: {
        primary: {
          light: 'var(--color-primary-lighten)',
          DEFAULT: 'var(--color-primary)',
          dark: 'var(--color-primary-darken)',
        },
        secondary: {
          light: 'var(--color-secondary-lighten)',
          DEFAULT: 'var(--color-secondary)',
          dark: 'var(--color-secondary-darken)',
        },
        gray: {
          darkest: '#191919',
          dark: '#707070',
          DEFAULT: '#B7B7B7',
          light: '#E3E3E3',
          lightest: '#F4F4F4',
        },
        backgroundApp:{
          light:'#F0F2F3',
          dark:'#121216',
        },
        backgroundBlock:{
          light:'#ffffff',
          dark:'#21212C',
        },
        text:{
          light:"#373A40",
          dark:"#ffffff"
        }
      },
    },
    fontFamily: {},
  },
  variants: {},
  plugins: [],
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      `components/**/*.{vue,js}`,
      `layouts/**/*.vue`,
      `pages/**/*.vue`,
      `plugins/**/*.{js,ts}`,
      `nuxt.config.{js,ts}`,
    ],
  },
};
