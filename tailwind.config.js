/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wisal: {
          primary: '#212529',   // Rich Black
          secondary: '#2E2F2F', // Jet
          azure: '#CDDDDD',     // Primary UI/Borders
          muted: '#ACBDBA',     // Ash Grey
          rose: '#A599B5',      // Rose Quartz / Highlight
          bg: '#F1F5F9',        // White Rose
        }
      },
      fontFamily: {
        sans: ['Rubik', 'sans-serif'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '20px',
      }
    }
  },
  plugins: [],
}
