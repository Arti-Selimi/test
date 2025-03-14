import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    domains: ["rickandmortyapi.com"], // Add this line
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
