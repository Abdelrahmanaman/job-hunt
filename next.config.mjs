/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "mdv98kqhmsp4ca02.public.blob.vercel-storage.com"
            }
        ]
    }
};

export default nextConfig;
