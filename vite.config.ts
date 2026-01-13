import path from 'path';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            devOptions: {
                enabled: true,
            },
            workbox: {
                navigateFallbackDenylist: [/^\/api/],
                runtimeCaching: [
                    {
                        urlPattern: /^.*\/api\/v1\/game\/data$/,
                        handler: 'StaleWhileRevalidate',
                        options: {
                            cacheName: `game-data-cache-${Date.now()}`,
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 60 * 60 * 24,
                            },
                        },
                    },
                ],
                cleanupOutdatedCaches: true,
            },
            includeAssets: [
                'brand-icon.svg',
                'brand-icon.png',
                'fonts/*.woff2',
                'images/*.{png,jpg,webp,svg}',
            ],
            manifest: {
                name: 'BigTechNight',
                short_name: 'BGT',
                theme_color: '#191919',
                background_color: '#191919',
                display: 'standalone',
                start_url: '/',
                icons: [
                    {
                        src: '/brand-icon.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: '/brand-icon.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                    {
                        src: '/brand-icon.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'maskable',
                    },
                ],
            },
        }),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    preview: {
        port: 80,
        host: '0.0.0.0',
        allowedHosts: true,
    },
});
