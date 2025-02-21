// https://nuxt.com/docs/api/configuration/nuxt-config
import { definePreset } from "@primevue/themes";
import Aura from "@primevue/themes/aura";
// import Material from "@primevue/themes/material";

const AuraCustomPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "#e9edf3",
      100: "#c8d2e1",
      200: "#a2afc8",
      300: "#7286a5",
      400: "#455a79",
      500: "#051a3a", // Main custom Color
      600: "#041634",
      700: "#03132c",
      800: "#020f25",
      900: "#020a1b",
      950: "#010510",
    },
    colorScheme: {
      light: {
        primary: {
          color: "{primary.500}",
          contrastColor: "#ffffff",
          hoverColor: "{primary.600}",
          activeColor: "{primary.700}",
        },
        highlight: {
          background: "{primary.50}",
          focusBackground: "{primary.100}",
          color: "{primary.700}",
          focusColor: "{primary.800}",
        },
      },
      dark: {
        primary: {
          color: "{primary.400}",
          contrastColor: "{surface.900}",
          hoverColor: "{primary.300}",
          activeColor: "{primary.200}",
        },
        highlight: {
          background: "color-mix(in srgb, {primary.400}, transparent 84%)",
          focusBackground: "color-mix(in srgb, {primary.400}, transparent 76%)",
          color: "rgba(255,255,255,.87)",
          focusColor: "rgba(255,255,255,.87)",
        },
      },
    },
  },
});

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  nitro: {
    devProxy: {
      "/api": {
        target: "http://localhost:4000/api",
        changeOrigin: true,
      },
    },
  },

  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss", "@primevue/nuxt-module"],
  pinia: {
    storesDirs: ["./stores/**"],
  },
  tailwindcss: {
    config: {},
  },
  primevue: {
    components: {
      prefix: "Prime",
      include: "*",
    },
    options: {
      theme: {
        ripple: true,
        preset: AuraCustomPreset,
        colorScheme: "dark",
        darkModeSelector: "system",
        cssLayer: false,
      },
    },
  },
});
