/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FF6B35",
          hover: "#E85522",
          light: "#FFF0EB",
          dark: "#D64510",
        },
        cream: {
          DEFAULT: "#FFF8F0",
          50: "#FFFCF9",
          100: "#FFF8F0",
          200: "#FBEFE2",
          300: "#F5ECE1",
          400: "#E6D7C3",
        },
        charcoal: {
          DEFAULT: "#1A1A1A",
          muted: "#5A5550",
          light: "#827B75",
          border: "#E9DFD5",
        },
        accent: {
          green: "#2ECC71",
          'green-light': "#E8F8F0",
          'green-dark': "#27AE60",
          red: "#E74C3C",
          'red-light': "#FDEDEC",
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(26, 26, 26, 0.06)',
        'warm': '0 8px 30px -4px rgba(255, 107, 53, 0.15)',
        'warm-lg': '0 12px 40px -4px rgba(255, 107, 53, 0.22)',
        'float': '0 20px 40px -8px rgba(26, 26, 26, 0.12)',
      },
      keyframes: {
        'bump': {
          '0%, 100%': { transform: 'scale(1)' },
          '30%': { transform: 'scale(1.25) rotate(-4deg)' },
          '60%': { transform: 'scale(1.15) rotate(4deg)' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'bump': 'bump 350ms cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'fade-in': 'fade-in 200ms ease-out',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
