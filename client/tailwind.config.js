/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      lobster: ['Lobster', 'sans-serif'],
    },
    colors: {
      musicRed: '#BE3144',
      musicPurple: '#22092C',
      musicOrange: '#F05941',
      musicViolet: '#872341',
    },
    extend: {},
  },
  plugins: [],
};
