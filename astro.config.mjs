import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
    devToolbar: {
        enabled: false,
    },
    vite: {
        optimizeDeps: {
            include: ["lucide-react", "framer-motion", "react", "react-dom"],
        },
        server: {
            watch: {
                usePolling: true,
            },
        },
    },
    site: "https://magesticwork.co",
    i18n: {
        defaultLocale: "en",
        locales: ["en", "it"],
    },
    markdown: {
        drafts: true,
        shikiConfig: {
            theme: "css-variables",
        },
    },
    shikiConfig: {
        wrap: true,
        skipInline: false,
        drafts: true,
    },
    integrations: [tailwind({
        applyBaseStyles: false,
		}), sitemap(), mdx(), icon(), react()],
});