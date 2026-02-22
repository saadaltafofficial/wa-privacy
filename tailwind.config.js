/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./popup.tsx",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "wa-green": "#25d366",
        "wa-dark": "#111b21",
        "wa-panel": "#1f2c34",
        "wa-text": "#e9edef",
        "wa-muted": "#8696a0",
        "wa-border": "#2a3942",
        "wa-hover": "#2a3942",
        "wa-red": "#e53e3e",
        "wa-red-hover": "#c53030"
      }
    }
  },
  plugins: []
}
