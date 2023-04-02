/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        'backgroundClr': '#000000',
        'bgBlue': '#CBD5E1',
        'bgFormBlue':'#b1bece',
        // 'backgroundClr': '#342e32',
        'red': '#611301',
        'redBrown':  '#61434A',
        'lightBrown': '#8a5341',
        'brightRed': '#BB5051',
        'key': '#EA580C',
        'paleKey': '#cf684f',
      },
      fontFamily: {
        bodo: ["Libre Bodoni"],
        poppins: ["Poppins"],
        jakarta: ["Plus Jakarta Sans"],
        tai: ["Noto Sans New Tai Lue"],
        roboto: ["Roboto"],
      },
    },
  },
  plugins: [require("daisyui")],
};
