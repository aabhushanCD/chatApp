/** @type {import('tailwindcss').Config} */
export default {
 
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui:{
    theme:[
      "light",
      "dark",
      "cupcake",
      "retro"
    ]
  },
}; 