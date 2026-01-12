/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		// Prevent ESLint from blocking builds in environments where config
		// resolution may fail (e.g. Vercel vs custom monorepo setups).
		// We still run lint locally via `npm run lint` when developing.
		ignoreDuringBuilds: true,
	},
};

module.exports = nextConfig;
