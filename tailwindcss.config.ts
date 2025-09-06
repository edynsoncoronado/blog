import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
    darkMode: "class", // 🌙 habilita dark mode con clase
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [typography],
} satisfies Config;