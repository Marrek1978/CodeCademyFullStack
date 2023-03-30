/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        'key': '#cf684f',
        'brown': '#835443',
        'red': '#611301'
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
