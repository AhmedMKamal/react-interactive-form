module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['src/**/*.{ts,tsx,css}', 'example/src/**/*.{ts,tsx,css}']
  },
  theme: {
    extend: {
      colors: {
        primary: '#3886b1'
      }
    },
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      default: '4px',
      md: '0.375rem',
      lg: '1rem',
      full: '9999px'
    },
    minHeight: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      full: '100%'
    }
  },
  variants: {},
  plugins: []
};
