import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* YouTube poster frames for the "before you go" videos. Scoped as tightly
       as the thumbnail URLs allow. */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        port: "",
        pathname: "/vi/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
