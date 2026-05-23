/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "propertydeal.alohomorasol.com",
      },
       {
        protocol: "https",
        hostname: "example.com", // remove once real logo URLs are in place
      },
    ],
  },
};

export default nextConfig;