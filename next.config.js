const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: [
      "*",

    ],
  },
  env: {
    // API_URL: "http://localhost:4802/api/v1/saudi/store/",

  },
};

module.exports = withNextIntl(nextConfig);
