/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "rgb(var(--background-start-rgb))",
                foreground: "rgb(var(--foreground-rgb))",
            },
            fontFamily: {
                sans: ['Inter var', 'Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
} 