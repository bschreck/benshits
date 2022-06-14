require("dotenv").config();
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    CLASS_TOKEN_CONTRACT: process.env.CLASS_TOKEN_CONTRACT,
    TIME_NFT_CONTRACT: process.env.TIME_NFT_CONTRACT,
  },
}

module.exports = nextConfig
