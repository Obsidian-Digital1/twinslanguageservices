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

	serverExternalPackages: ["@google-cloud/recaptcha-enterprise"],

	typedRoutes: true,
} satisfies NextConfig;

export default nextConfig;
