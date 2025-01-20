import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['192.168.10.12'],
  },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'http', // Match any protocol (http or https)
  //       hostname: '*', // Match any hostname
       
  //     },
  //     {
  //       protocol: 'https', // Match any protocol (http or https)
  //       hostname: '*', // Match any hostname
       
  //     },
      
   // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'http', // Match any protocol (http or https)
  //       hostname: '*', // Match any hostname
       
  //     },
  //     {
  //       protocol: 'https', // Match any protocol (http or https)
  //       hostname: '*', // Match any hostname
       
  //     },,
};

export default nextConfig;
