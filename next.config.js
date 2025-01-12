const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Specify the domains from which images can be loaded.
    domains: [
      "thumbs.dreamstime.com", 
      "images.unsplash.com",
      "i.pinimg.com",
      "i5.walmartimages.com"// Allow images from this domain
      // Add other domains as needed, for example:
      // "example.com",
      // "another-image-source.com",
    ],
  },
  env: {
    // API_URL: "http://localhost:4802/api/v1/saudi/store/",
  },
};

module.exports = withNextIntl(nextConfig);
