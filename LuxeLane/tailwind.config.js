/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'fade-in-slow': 'fadeIn 1.2s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'bounce-gentle': 'bounceGentle 0.8s ease-in-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'pattern-fade': 'patternFade 2s ease-in-out',
        'text-reveal': 'textReveal 1s ease-out',
        'underline-expand': 'underlineExpand 0.6s ease-out',
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
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200px 0' },
          '100%': { backgroundPosition: 'calc(200px + 100%) 0' },
        },
        patternFade: {
          '0%': { opacity: '0', transform: 'scale(1.05)' },
          '100%': { opacity: '0.03', transform: 'scale(1)' },
        },
        textReveal: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        underlineExpand: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
      colors: {
        // Editorial Light Mode Colors
        editorial: {
          white: '#FFFFFF',
          navy: '#22334E',
          gold: '#C5A253',
          cream: '#F8F6F2',
          charcoal: '#2C3E50',
          silver: '#95A5A6',
          pearl: '#ECF0F1',
          slate: '#34495E',
        },
        // Editorial Dark Mode Colors
        editorialDark: {
          black: '#0D0D0D',
          gold: '#C5A253',
          cream: '#F8F6F2',
          charcoal: '#2C3E50',
          silver: '#95A5A6',
          pearl: '#ECF0F1',
          slate: '#34495E',
          navy: '#22334E',
        },
        // Legacy colors for compatibility
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      screens: {
        'xs': '475px',
        '3xl': '1600px',
        '4xl': '1920px',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1000': '1000ms',
      },
      backdropBlur: {
        xs: '2px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#22334E',
            h1: {
              fontFamily: 'Playfair Display, serif',
              fontWeight: '700',
              color: '#22334E',
            },
            h2: {
              fontFamily: 'Playfair Display, serif',
              fontWeight: '600',
              color: '#22334E',
            },
            h3: {
              fontFamily: 'Playfair Display, serif',
              fontWeight: '500',
              color: '#22334E',
            },
            strong: {
              color: '#22334E',
            },
            a: {
              color: '#C5A253',
              textDecoration: 'underline',
              textDecorationThickness: '1px',
              textUnderlineOffset: '2px',
            },
          },
        },
        dark: {
          css: {
            color: '#C5A253',
            h1: {
              color: '#C5A253',
            },
            h2: {
              color: '#C5A253',
            },
            h3: {
              color: '#C5A253',
            },
            strong: {
              color: '#C5A253',
            },
            a: {
              color: '#F8F6F2',
            },
          },
        },
      },
    },
  },
  plugins: [],
} 