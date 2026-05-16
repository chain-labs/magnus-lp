import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	async rewrites() {
		return [
			{
				source: "/webinar",
				destination: "https://magenta-triangle-863913.framer.app/",
			},
		];
	},
};

export default nextConfig;
