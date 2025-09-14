import { NextConfig } from "next";
import withPWA from 'next-pwa';


const isDev = process.env.NODE_ENV === 'development';

const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            icon: false,
          },
        },
      ],
    });
    return config;
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
      },
    ],
  },
  output: "standalone",
} satisfies NextConfig;

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: isDev,
})(nextConfig);