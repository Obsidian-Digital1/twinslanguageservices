import type { NextConfig } from "next";

const nextConfig = {
	devIndicators: {
		position: "bottom-right",
	},

	experimental: {
		typedEnv: true,
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

	typedRoutes: true,
} satisfies NextConfig;

export default nextConfig;
