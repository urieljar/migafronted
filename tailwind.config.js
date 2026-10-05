/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        miga: {
          bg: '#FAF7F2',        // Tono crema harina
          card: '#FFFFFF',
          border: '#E8E2D9',
          dark: '#2B1810',      // Café oscuro / Monograma
          accent: '#A06136',    // Dorado tostado / Botones
          accentHover: '#874F2A',
          footer: '#663B14',    // Café profundo
          muted: '#6B5E55',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}