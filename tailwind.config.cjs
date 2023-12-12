/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "440px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      brand_primary: "#DF826C",
      brand_primaryFade: "#f8ffd29e",
      brand_secondary: "#F8FFD2",
      brand_success: "#8ADAB2",
      brand_warning: "#D0F288",
      brand_error: "#9e0303",
      white: "#FFFFFF",
    },
    extend: {},
    fontFamily: {
      sans: ["Nexa", "sans-serif"],
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "cupcake"], // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  },
};
