/** @type {import("next").NextConfig} */
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
};

export default nextConfig;
