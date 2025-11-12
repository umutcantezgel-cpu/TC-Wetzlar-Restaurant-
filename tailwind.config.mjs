/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Tier 1: Primitive Tokens
        primitive: {
          gold: {
            50: '#fffbeb',
            100: '#fef3c7',
            200: '#fde68a',
            300: '#fcd34d',
            400: '#fbbf24',
            500: '#d4af37', // Primary Gold
            600: '#b8941f',
            700: '#8b6914',
            800: '#5e470d',
            900: '#312407',
          },
          charcoal: {
            50: '#f9fafb',
            100: '#f3f4f6',
            200: '#e5e7eb',
            300: '#d1d5db',
            400: '#9ca3af',
            500: '#6b7280',
            600: '#4b5563',
            700: '#374151',
            800: '#1f2937',
            900: '#111827', // Primary Charcoal
          },
          cream: {
            50: '#fefce8',
            100: '#fef9c3',
            200: '#fef08a',
            300: '#fde047',
            400: '#facc15',
            500: '#f5f5dc', // Beige/Cream
            600: '#e8e8cc',
            700: '#d4d4b8',
            800: '#c0c0a4',
            900: '#acab90',
          },
        },
        // Tier 2: Semantic Tokens
        brand: {
          primary: '#d4af37', // Gold
          secondary: '#111827', // Charcoal
          accent: '#f5f5dc', // Cream
        },
        ui: {
          background: '#ffffff',
          surface: '#f9fafb',
          border: '#e5e7eb',
          text: {
            primary: '#111827',
            secondary: '#6b7280',
            inverse: '#ffffff',
          },
        },
        semantic: {
          success: '#059669',
          warning: '#f59e0b',
          error: '#dc2626',
          info: '#3b82f6',
        },
      },
      fontFamily: {
        // TODO: Replace with actual WOFF2 fonts
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        display: ['Georgia', 'serif'],
      },
      fontSize: {
        // Tier 1: Primitive scale
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
      },
      spacing: {
        // Tier 1: 8px base grid
        'xs': '0.5rem', // 8px
        'sm': '1rem', // 16px
        'md': '1.5rem', // 24px
        'lg': '2rem', // 32px
        'xl': '3rem', // 48px
        '2xl': '4rem', // 64px
        '3xl': '6rem', // 96px
        '4xl': '8rem', // 128px
      },
      boxShadow: {
        'focus': '0 0 0 3px rgba(212, 175, 55, 0.5)',
        'focus-visible': '0 0 0 3px rgba(212, 175, 55, 0.5)',
      },
      borderRadius: {
        'sm': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '250ms',
        'slow': '350ms',
      },
      transitionTimingFunction: {
        'ease': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
