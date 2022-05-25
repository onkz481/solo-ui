import locales from '../../locales';

export const options = {
  breakpoint: {
    scrollbarWidth: 16,
    thresholds: {
      xs: 600,
      sm: 1024,
      md: 1280,
      lg: 1920
    }
  },
  lang: {
    current: 'en',
    locales: locales
  },
  layout: {
    thresholds: {
      lg: 1200,
      md: 1000,
      sm: 688
    },
    nav: {
      lgUp: 232,
      mobile: 256
    },
    main: {
      right: 328
    }
  },
  theme: {
    current: 'light'
  }
}