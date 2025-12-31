import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '4000',
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
    devServer: {
        allowedDevOrigins: ['http://localhost:3000', "http:192.168.100.62:3000"],
    }
}

export default nextConfig;
