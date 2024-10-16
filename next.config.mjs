/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {   
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname:'/**',
            }
        ]
    },
    env: {  NEXT_PUBLIC_UNSPLASH_API_ACCESS_KEY: process.env.NEXT_PUBLIC_UNSPLASH_API_ACCESS_KEY  }
};

export default nextConfig;
