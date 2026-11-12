// Compiles assets/home.css for index.html (replaces the Tailwind Play CDN).
// Run via `node scripts/build-pages.cjs` (needs `npm install` once).
// The old design used Tailwind's violet/indigo/purple scales; they are remapped
// here to the brand palette (navy #0C1B2A, brass #B89B5E, porcelain #F6F4EF)
// so existing class names keep working without a markup rewrite.
const brand = {
  50: '#F6F4EF',  // porcelain
  100: '#EFE9DC',
  200: '#E3DDD0', // hairline
  300: '#CFC2A0',
  400: '#B89B5E', // brass (icons, accents on dark)
  500: '#9A7F45', // brass deep
  600: '#1F3550',
  700: '#0C1B2A', // navy (primary buttons, links)
  800: '#0A1724',
  900: '#08121D',
  950: '#050C14',
};
module.exports = {
  content: ['./index.html', './assets/app.js'], // app.js renders cards/modals with Tailwind classes
  theme: {
    extend: {
      colors: { violet: brand, indigo: brand, purple: brand, fuchsia: brand },
    },
  },
  plugins: [],
};
