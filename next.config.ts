import withPWA from 'next-pwa';

const isDev = process.env.NODE_ENV === 'development';

// Define types for runtime caching
interface RuntimeCacheEntry {
    urlPattern: RegExp | ((args: { url: URL; request: Request }) => boolean);
    handler: 'CacheFirst' | 'NetworkFirst' | 'StaleWhileRevalidate';
    options?: {
        cacheName?: string;
        expiration?: {
            maxEntries?: number;
            maxAgeSeconds?: number;
        };
    };
}

const runtimeCaching: RuntimeCacheEntry[] = [
    {
        urlPattern: ({ url }) => url.pathname.startsWith('/_next/static/'),
        handler: 'CacheFirst',
        options: {
            cacheName: 'next-static-cache',
            expiration: { maxEntries: 100, maxAgeSeconds: 30 * 24 * 60 * 60 },
        },
    },
    {
        urlPattern: ({ url }) =>
            url.origin === self.location.origin &&
            url.pathname.startsWith('/api/'),
        handler: 'StaleWhileRevalidate',
        options: {
            cacheName: 'api-cache',
            expiration: { maxEntries: 100, maxAgeSeconds: 30 * 24 * 60 * 60 },
        },
    },
    {
        urlPattern: /.+\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
        handler: 'CacheFirst',
        options: {
            cacheName: 'images-cache',
            expiration: { maxEntries: 100, maxAgeSeconds: 30 * 24 * 60 * 60 },
        },
    },
    {
        urlPattern: /.+\.(?:woff2?|eot|ttf|otf)$/i,
        handler: 'CacheFirst',
        options: {
            cacheName: 'fonts-cache',
            expiration: { maxEntries: 30, maxAgeSeconds: 365 * 24 * 60 * 60 },
        },
    },
    {
        urlPattern: ({ request }) => request.destination === 'document',
        handler: 'NetworkFirst',
        options: {
            cacheName: 'html-pages-cache',
            expiration: { maxEntries: 50, maxAgeSeconds: 30 * 24 * 60 * 60 },
        },
    },
    {
        urlPattern: ({ request }) =>
            request.destination === 'script' || request.destination === 'style',
        handler: 'CacheFirst',
        options: {
            cacheName: 'assets-cache',
            expiration: { maxEntries: 50, maxAgeSeconds: 30 * 24 * 60 * 60 },
        },
    },
];


export default withPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: isDev,
    fallbacks: {
        document: '/offline',
        image: '/offline',
        font: '/offline',
        audio: '/offline',
        video: '/offline',
    },
    runtimeCaching,
});
