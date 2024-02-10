/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: 'Inter600SemiBold',
        subtitle: 'Inter500Medium',
        body: 'Inter400Regular',
        bold: 'Inter700Bold',
      },
    },
  },
  plugins: [],
}
