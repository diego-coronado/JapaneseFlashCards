module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        "94px": "94px",
        "188px": "188px",
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ["focus"],
      backgroundColor: ["checked"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
