/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pink: {
          DEFAULT: '#e8206a',
          2: '#ff4d94',
          3: '#ff85b8',
          4: '#ffd6e8',
        },
        dark: {
          DEFAULT: '#030308',
          2: '#0a0a14',
          3: '#10101f',
          4: '#181828',
        },
        text: {
          DEFAULT: '#e8e8f0',
          2: '#a0a0c0',
          3: '#606080',
        },
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        grotesk: ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(232,32,106,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(232,32,106,0.7)' },
        },
      },
    },
  },
  plugins: [],
}
