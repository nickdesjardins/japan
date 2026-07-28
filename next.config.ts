import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    /* Lets Next treat a route change as the trigger for React's
       <ViewTransition>. The component itself comes from React — this flag is
       only what wires it up to navigation, which is what makes the chapter
       slide directional. */
    viewTransition: true,
  },
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
