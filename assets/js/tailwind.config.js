tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Unbounded"', 'sans-serif'],
        sans: ['"Albert Sans"', 'sans-serif'],
      },
      colors: {
        background: {
          primary: '#090B10',
        },
        text: {
          primary: '#F3F4F6',
          alternative: '#C9A843',
          secondary: '#94A3B8',
        }
      },
      keyframes: {
        'loop-vertically': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(-50%)' },
        },
      },
      animation: {
        'loop-vertically': 'loop-vertically 30s linear infinite',
      },
      fontSize: {
        overline: ['0.8125rem', { lineHeight: '1.4' }],
        ui: ['0.9375rem', { lineHeight: '1.5' }],
        'body-sm': ['1rem', { lineHeight: '1.6' }],
      },
    }
  }
}
