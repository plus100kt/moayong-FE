import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /** Gray 계열 */
        "gray-0": "#FFFFFF",
        "gray-5": "#F4F5F6",
        "gray-10": "#E6E8EA",
        "gray-20": "#CDD1D5",
        "gray-30": "#B1B8BE",
        "gray-40": "#8A949E",
        "gray-50": "#6D7882",
        "gray-60": "#58616A",
        "gray-70": "#464C53",
        "gray-80": "#33363D",
        "gray-90": "#1E2124",
        "gray-100": "#000000",

        /** Red 계열 */
        "red-5": "#FEE9EE",
        "red-10": "#E6E8EA",
        "red-20": "#CDD1D5",
        "red-30": "#B1B8BE",
        "red-40": "#8A949E",
        "red-50": "#6D7882",
        "red-60": "#FF4747",
        "red-70": "#464C53",
        "red-80": "#C70115",
        "red-90": "#A80115",

        /** Purple 계열 */
        "purple-5": "#F0E7FC",
        "purple-10": "#D4B4FA",
        "purple-20": "#B388F5",
        "purple-30": "#9061F6",
        "purple-40": "#763DF2",
        "purple-50": "#590DE5",
        "purple-60": "#4E0ADF",
        "purple-70": "#3204AC",
        "purple-80": "#2B0396",
        "purple-90": "#1F0566",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [animate],
} satisfies Config;
