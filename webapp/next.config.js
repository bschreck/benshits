require("dotenv").config();
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    CLASS_TOKEN_CONTRACT: process.env.CLASS_TOKEN_CONTRACT,
  },
}

module.exports = nextConfig
