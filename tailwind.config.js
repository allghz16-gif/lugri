/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0A1128',      // Navy gelap background utama
          blue: '#1C2D5A',      // Blue card/container
          green: '#97E614',     // Hijau aksen (tombol/highlight)
          yellow: '#FFD700',    // Gold/Kuning aksen pendukung
          card: '#121E3E',      // Background card gelap
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'], // Sesuaikan jika pakai font lain dari Figma
      }
    },
  },
  plugins: [],
}