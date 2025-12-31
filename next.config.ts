import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'portfolio-server-0e3k.onrender.com',
                port: '10000',
                pathname: '/media/**',
            },
            {
                protocol: 'http',
                hostname: '192.168.100.62',
                port: '4000',
                pathname: '/media/**',
            }
        ]
    },
}

export default nextConfig;
