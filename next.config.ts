import type { NextConfig } from "next";

const nextConfig = {
	devIndicators: {
		position: "bottom-right",
	},

	images: {
		remotePatterns: [
			{
				hostname: "images.unsplash.com",
				pathname: "/**",
				protocol: "https",
			},
		],
	},

	reactStrictMode: true,

	typescript: {
		ignoreBuildErrors: true,
	},
} satisfies NextConfig;

export default nextConfig;
