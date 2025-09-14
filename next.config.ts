import withPWA from 'next-pwa';

const isDev = process.env.NODE_ENV === 'development';

export default withPWA({
    dest: 'public',
    disable: isDev,
    register: true,
    skipWaiting: true,
    buildExcludes: [
        /app-build-manifest\.json$/,
        /react-loadable-manifest\.json$/,
    ],
    fallbacks: {
        document: '/offline',
        image: '/offline',
        font: '/offline',
        audio: '/offline',
        video: '/offline',
    },
    additionalManifestEntries: [{ url: '/images/logo.jpg', revision: null }],
    runtimeCaching: [
        {
            urlPattern: /^\/$/,
            handler: 'NetworkFirst',
            options: { cacheName: 'pages-cache' },
        },
        {
            urlPattern: /^\/offline$/,
            handler: 'CacheFirst',
            options: { cacheName: 'pages-cache' },
        },
        {
            urlPattern: /.+\.(?:png|jpg|jpeg|gif|webp|svg)$/i,
            handler: 'CacheFirst',
            options: { cacheName: 'images-cache' },
        },
    ],
});
