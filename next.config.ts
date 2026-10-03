import type {NextConfig} from 'next';

const isDevelopment = process.env.NODE_ENV === 'development';

const contentSecurityPolicy = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ''} https://vercel.live`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://portfolio-server-0e3k.onrender.com https://vercel.live",
    "font-src 'self' data:",
    "connect-src 'self' https://portfolio-server-0e3k.onrender.com https://vercel.live wss://ws-us3.pusher.com",
    "media-src 'self' https://portfolio-server-0e3k.onrender.com",
    "frame-src https://vercel.live",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    ...(!isDevelopment ? ['upgrade-insecure-requests'] : []),
].join('; ');

const securityHeaders = [
    {key: 'Content-Security-Policy', value: contentSecurityPolicy},
    {key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload'},
    {key: 'X-Content-Type-Options', value: 'nosniff'},
    {key: 'X-Frame-Options', value: 'DENY'},
    {key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin'},
    {key: 'Permissions-Policy', value: 'camera=(), geolocation=(), microphone=()'},
];

const nextConfig: NextConfig = {
    poweredByHeader: false,
    outputFileTracingRoot: process.cwd(),
    turbopack: {
        root: process.cwd(),
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: securityHeaders,
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "portfolio-server-0e3k.onrender.com",
                pathname: "/media/**",
            },
            // локалка (если реально используешь в dev)
            {
                protocol: "http",
                hostname: "192.168.100.62",
                port: "4000",
                pathname: "/media/**",
            },
        ],
    },
};

export default nextConfig;
