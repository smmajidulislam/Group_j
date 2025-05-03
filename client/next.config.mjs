/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "www.google.com", "hatrabbits.com"], // এখানেই Cloudinary এর ডোমেইনটা দিতে হবে
  },
};

export default nextConfig;
