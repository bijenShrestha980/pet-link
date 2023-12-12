import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        theme_color: "#752444",
        background_color: "#ffffff",
        display: "standalone",
        scope: "/",
        start_url: "/",
        short_name: "Affix",
        description: "Affix pwa",
        name: "AffixLink",
        icons: [
          {
            src: "/afixlink.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/afixlink.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "/afixlink.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "/afixlink.png",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  define: {
    "process.env": {},
    // global: {},
  },
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
});
