import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
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
