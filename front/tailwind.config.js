/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      scale: {
        112: "1.12",
      },
    },
    screens: {
      xs: "320px", // Extra small devices (phones)
      sm: "640px", // Small devices (phones)
      md: "768px", // Medium devices (tablets)
      lg: "1024px", // Large devices (laptops/desktops)
      xl: "1280px", // Extra large devices (desktops)
      "2xl": "1536px", // 2x extra large devices (large desktops)
      "3xl": "1920px", // 3x extra large devices
      "4xl": "2560px", // 4x extra large devices
    },
    zIndex: {
      1: "1",
    },
  },
  variants: {
    extend: {
      scale: ["hover"],
    },
  },
  plugins: [],
};
