/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f0ff',
          100: '#cce1ff',
          200: '#99c3ff',
          300: '#66a4ff',
          400: '#3386ff',
          500: '#0067ff',      // Main primary blue
          600: '#0052cc',
          700: '#003e99',
          800: '#002966',
          900: '#001533',
        },
        secondary: {
          50: '#f0f9f9',
          100: '#dff3f3',
          200: '#beecec',
          300: '#9de6e6',
          400: '#7cdede',
          500: '#5bd8d8',      // Teal accent
          600: '#49adad',
          700: '#378282',
          800: '#255656',
          900: '#122b2b',
        },
        gold: {
          50: '#fffdf0',
          100: '#fef9e1',
          200: '#fdf3c3',
          300: '#fceca4',
          400: '#fbe686',
          500: '#f9e068',      // Gold accent
          600: '#c7b353',
          700: '#95863e',
          800: '#645929',
          900: '#322d15',
        },
        // Soft whites and deep blues
        'deep-blue': '#0a192f',
        'soft-white': '#f8f9fa',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in-down': 'fadeInDown 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-right': 'slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(249, 224, 104, 0.4)' },
          '50%': { boxShadow: '0 0 20px 8px rgba(249, 224, 104, 0.15)' },
        },
      },
    },
  },
  plugins: [],
}