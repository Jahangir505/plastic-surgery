/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: false,
  compress: true,
  images: {
    domains: ["plasticeduhub.itexpertnow.com", "flagcdn.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "plasticeduhub.itexpertnow.com",
        port: "",
        pathname: "/plasticeduhub/uploads/**"
      }
    ]
  },
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"]
};

module.exports = nextConfig;
