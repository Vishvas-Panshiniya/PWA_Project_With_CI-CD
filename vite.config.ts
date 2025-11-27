import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    VitePWA({
      manifest: {
        name: "PWA_Project_With_CI-CD",
        short_name: "PWA_Project",
        theme_color: "#ffffff",
        icons: [
          {
            src: "icons/16.png",
            sizes: "16x16",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "icons/32.png",
            sizes: "32x32",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "icons/180.png",
            sizes: "180x180",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "icons/192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "icons/512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webp}"],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => {
              return url.pathname.startsWith("/posts");
            },
            handler: "CacheFirst",
            options: {
              cacheName: "api-cache",
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
  base: "PWA_Project_With_CI-CD/",
  server: {
    port: 4200,
    host: "localhost",
  },
  preview: {
    port: 4300,
    host: "localhost",
  },
});
