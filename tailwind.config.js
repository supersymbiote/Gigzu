/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF", // Example primary color
        secondary: "#FFFFFF", // Example secondary color
        light: {
          DEFAULT: "#F3F4F6", // Example light color
          100: "#F9FAFB", // Lighter shade
          200: "#E5E7EB", // Lighter shade
        },
        dark: {
          DEFAULT: "#111827", // Example dark color
          100: "#1F2937", // Darker shade
          200: "#374151", // Darker shade
        },
        accent: "#EF4444", // Example accent color
    },
  },
  plugins: [],
}
}
