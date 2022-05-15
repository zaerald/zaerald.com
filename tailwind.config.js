module.exports = {
  mode: 'jit',
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: [
        'VisbyCF',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica',
        'Arial',
        'sans-serif',
      ],
      mono: ['Menlo', 'Monaco', 'Courier New', 'monospace'],
    },
    colors: {
      white: '#fff',
      black: '#000',
      'gray-50': '#f9fafb',
      'gray-100': '#f3f4f6',
      'gray-200': '#d1d5db',
      'gray-300': '#9ca3af',
      'gray-400': '#6b7280',
      'gray-500': '#4b5563',
      transparent: 'transparent',
      primary: {
        400: 'var(--color-primary-400)',
      },
      secondary: {
        200: 'var(--color-secondary-200)',
        300: 'var(--color-secondary-300)',
        400: 'var(--color-secondary-400)',
      },
      accent: {
        DEFAULT: 'var(--color-accent)',
        hover: 'var(--color-accent-hover)',
        disabled: 'var(--color-accent-disabled)',
      },
    },
  },
  variants: {
    extend: {
      brightness: ['hover'],
    },
  },
  plugins: [],
}
