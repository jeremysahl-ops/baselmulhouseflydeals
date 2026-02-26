import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#C9A0DC',
          light: '#D7BDE2',
        },
        blue: {
          soft: '#5DADE2',
          DEFAULT: '#4A90E2',
        },
        rose: {
          powder: '#FF9AA2',
          light: '#FFB6C1',
        },
        bg: '#FDFDFF',
        text: {
          DEFAULT: '#333333',
          dark: '#2C3E50',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      backgroundImage: {
        'gradient-header': 'linear-gradient(135deg, #C9A0DC 0%, #5DADE2 100%)',
        'gradient-hero': 'linear-gradient(160deg, #D7BDE2 0%, #EBF5FB 50%, #D6EAF8 100%)',
        'gradient-cta': 'linear-gradient(135deg, #FF9AA2, #FFB6C1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
