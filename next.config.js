const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "thumbs.dreamstime.com",
      "images.unsplash.com", 
      "i.pinimg.com",
      "i5.walmartimages.com",
      "162.240.24.203" // Add this line
    ],
  },
  env: {
    // API_URL: "http://localhost:4802/api/v1/saudi/store/",
  },
};

module.exports = withNextIntl(nextConfig);
