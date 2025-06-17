/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./App.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",  // if you're using expo-router
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5", // Indigo-600
        secondary: "#22D3EE", // Cyan-400

        light: {
          100: "#F9FAFB", // Gray-50
          200: "#E5E7EB", // Gray-200
          300: "#D1D5DB", // Gray-300
        },

        dark: {
          100: "#4B5563", // Gray-600
          200: "#374151", // Gray-700
          300: "#1F2937", // Gray-800
        },

        success: "#10B981",  // Emerald-500
        warning: "#F59E0B",  // Amber-500
        danger: "#EF4444",   // Red-500

        background: "#111827", // Almost black - Gray-900
        surface: "#1E293B", // BlueGray-800
      },
    },
  },
  plugins: [],
}