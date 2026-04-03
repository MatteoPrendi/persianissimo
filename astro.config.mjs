// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
    },

    integrations: [react()],

    fonts: [
        {
            name: "Inter",
            cssVariable: "--font-sans",
            provider: fontProviders.google(),
            weights: ["100 900"],
        },
        {
            name: "Merriweather",
            cssVariable: "--font-serif",
            provider: fontProviders.google(),
            weights: ["300 900"],
        },
    ],
});
