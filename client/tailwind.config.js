/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Saffron Color Scale - Primary Brand
        saffron: {
          50: '#FFF8F0',
          100: '#FFE4CC',
          200: '#FFD9B3',
          300: '#FFB266',
          400: '#FF9933', // PRIMARY
          500: '#E68A2D',
          600: '#CC7A26',
          700: '#B36B20',
          800: '#995C19',
          900: '#804D13',
        },
        // Emerald - Success & Positive States
        emerald: {
          50: '#F0FDF4',
          100: '#D4EDDA',
          200: '#A8DBC9',
          300: '#7CC9B5',
          400: '#4FB7A0', // SUCCESS
          500: '#43A08A',
          600: '#389E86',
          700: '#2D8974',
          800: '#228B62',
          900: '#177D50',
        },
        // Sky - Info States
        sky: {
          50: '#F0F9FF',
          100: '#E3F2FD',
          200: '#B3E5FC',
          300: '#81D4FA',
          400: '#4FC3F7', // INFO
          500: '#29B6F6',
          600: '#03A9F4',
          700: '#039BE5',
          800: '#0288D1',
          900: '#0277BD',
        },
        // Rose - Error & Negative States
        rose: {
          50: '#FDF2F8',
          100: '#FCE4EC',
          200: '#F8BBD0',
          300: '#F48FB1',
          400: '#F06292', // ERROR
          500: '#EC407A',
          600: '#E91E63',
          700: '#C2185B',
          800: '#AD1457',
          900: '#880E4F',
        },
        // Amber - Warning States
        amber: {
          50: '#FFFBF0',
          100: '#FFF3E0',
          200: '#FFE0B2',
          300: '#FFCC80',
          400: '#FFB74D', // WARNING
          500: '#FFA726',
          600: '#FF9800',
          700: '#F57C00',
          800: '#E65100',
          900: '#BF360C',
        },
        // Neutral Gray Scale
        neutral: {
          0: '#FFFFFF',
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#EEEEEE',
          300: '#E0E0E0',
          400: '#BDBDBD',
          500: '#9E9E9E',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
        },
      },
      fontSize: {
        // Headings
        h1: ['48px', { lineHeight: '1.2', fontWeight: '800' }],
        h2: ['40px', { lineHeight: '1.2', fontWeight: '700' }],
        h3: ['32px', { lineHeight: '1.3', fontWeight: '700' }],
        h4: ['24px', { lineHeight: '1.4', fontWeight: '600' }],
        h5: ['20px', { lineHeight: '1.4', fontWeight: '600' }],
        h6: ['16px', { lineHeight: '1.5', fontWeight: '600' }],
        // Body
        base: ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        sm: ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        xs: ['12px', { lineHeight: '1.5', fontWeight: '400' }],
        // Large
        lg: ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        xl: ['20px', { lineHeight: '1.6', fontWeight: '500' }],
        '2xl': ['24px', { lineHeight: '1.3', fontWeight: '500' }],
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '80px',
        '5xl': '96px',
      },
      boxShadow: {
        // Light Shadows
        'soft': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'base': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        // Colored Shadows
        'saffron': '0 4px 12px rgba(255, 153, 51, 0.15)',
        'saffron-lg': '0 8px 20px rgba(255, 153, 51, 0.2)',
        'dark': '0 4px 12px rgba(26, 26, 26, 0.15)',
        'dark-lg': '0 8px 20px rgba(26, 26, 26, 0.2)',
        'smooth': '0 2px 15px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        'none': '0',
        'sm': '4px',
        'base': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
        'full': '9999px',
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '300ms',
        'slow': '500ms',
      },
      animation: {
        'fadeIn': 'fadeIn 0.3s ease-out',
        'slideInLeft': 'slideInLeft 0.3s ease-out',
        'slideInRight': 'slideInRight 0.3s ease-out',
        'scaleIn': 'scaleIn 0.3s ease-out',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          'from': { opacity: '0', transform: 'translateX(-40px)' },
          'to': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          'from': { opacity: '0', transform: 'translateX(40px)' },
          'to': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          'from': { opacity: '0', transform: 'scale(0.95)' },
          'to': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-saffron': 'linear-gradient(135deg, #FF9933 0%, #FFB266 100%)',
        'gradient-saffron-fade': 'linear-gradient(135deg, #FF9933 0%, #FFFFFF 100%)',
        'gradient-saffron-card': 'linear-gradient(135deg, #FFE0B2 0%, #FFFFFF 100%)',
        'gradient-saffron-rank': 'linear-gradient(135deg, #FF9933 0%, #FFB266 100%)',
      },
      maxWidth: {
        'container': '1024px',
        'container-lg': '1280px',
        'container-md': '900px',
        'container-sm': '700px',
        'question-card': '600px',
      },
      minHeight: {
        'screen': '100vh',
        'viewport': '100dvh',
      },
    },
  },
  plugins: [],
}
