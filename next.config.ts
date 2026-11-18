import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // cacheComponents: true,
  // partialPrefetching: true,

  images: {
    remotePatterns:[
      {
        protocol:'https',
        hostname:"images.unsplash.com"
      },
         {
        protocol:'https',
        hostname:"plus.unsplash.com"
      }
    ]
  },
  transpilePackages: ['firebase-admin', 'jwks-rsa', 'jose'],
  
  typescript:{
      ignoreBuildErrors: true,

  }
  


  
};

export default nextConfig;
