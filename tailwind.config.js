module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        "94px": "94px",
        "188px": "188px",
      },
      minHeight: {
        15: "3.75rem",
        60: "15rem",
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
