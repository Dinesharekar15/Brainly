/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        color:{
           gray:{
            100:"#eeeeef",
            200:"e6e9ed",
            600:"95989c"
           },
            purple:{
              200: "#d9ddee",
              500: "#9492db",
              600: "#7164c0",
            }
        }
      },
    },
    plugins: [],
  }
  