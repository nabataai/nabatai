import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Nabat brand colors extracted from logo and website
        nabat: {
          // Primary teal/green tones
          primary: {
            50: '#e6f5f3',
            100: '#c2e6e0',
            200: '#9bd7cc',
            300: '#73c8b8',
            400: '#56bda9',
            500: '#38b29a', // Main brand color
            600: '#32a48d',
            700: '#2b937c',
            800: '#24826c',
            900: '#176249',
          },
          // Deep forest/dark green
          forest: {
            50: '#e8f2ed',
            100: '#c5dfd2',
            200: '#9fcbb4',
            300: '#79b696',
            400: '#5ca77f',
            500: '#3f9868',
            600: '#398960',
            700: '#2f7655',
            800: '#26644b',
            900: '#164533',
          },
          // Neutral tones
          neutral: {
            50: '#f8faf9',
            100: '#f1f4f2',
            200: '#e4e9e7',
            300: '#cbd4d0',
            400: '#9baba3',
            500: '#6d8078',
            600: '#5a6b64',
            700: '#475751',
            800: '#354340',
            900: '#1a2624',
          },
          // Accent light green/mint
          accent: {
            50: '#f0faf7',
            100: '#d4f1e8',
            200: '#b6e8d7',
            300: '#97dfc6',
            400: '#80d8b9',
            500: '#69d1ac',
            600: '#61cca5',
            700: '#56c69b',
            800: '#4cc092',
            900: '#3bb582',
          },
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      borderRadius: {
        'nabat-sm': '0.5rem',
        'nabat-md': '0.75rem',
        'nabat-lg': '1rem',
        'nabat-xl': '1.5rem',
      },
      boxShadow: {
        'nabat-sm': '0 2px 8px rgba(56, 178, 154, 0.08)',
        'nabat-md': '0 4px 16px rgba(56, 178, 154, 0.12)',
        'nabat-lg': '0 8px 32px rgba(56, 178, 154, 0.16)',
        'nabat-card': '0 2px 12px rgba(26, 38, 36, 0.06)',
      },
      backgroundImage: {
        'nabat-gradient': 'linear-gradient(135deg, #38b29a 0%, #2f7655 100%)',
        'nabat-gradient-subtle': 'linear-gradient(135deg, #e6f5f3 0%, #f0faf7 100%)',
        'topographic': "url('/nabat.jpeg')",
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
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
        slideIn: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
