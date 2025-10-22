// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // Modo estático por defecto, pero las rutas dinámicas funcionarán en dev
  vite: {
    plugins: [tailwindcss()],
  },
});