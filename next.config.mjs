/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
            },
            {
                protocol : "https",
                hostname : "a0.muscache.com"
            },
            {
                protocol : "https",
                hostname : "fmvbfucauukhkcqwcuhy.supabase.co"
            }
        ],
    },
};

export default nextConfig;