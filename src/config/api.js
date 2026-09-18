// Central API configuration
// In production (Vercel): uses VITE_API_URL environment variable
// In development: falls back to localhost:5000
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const resolveNewsImageUrl = (image) => {
	if (!image) return "";

	try {
		const imageUrl = new URL(image, API_BASE_URL);
		const isBackendLocalUrl =
			imageUrl.hostname === "localhost" || imageUrl.hostname === "127.0.0.1";

		if (isBackendLocalUrl && imageUrl.pathname.startsWith("/uploads")) {
			return `${API_BASE_URL.replace(/\/$/, "")}${imageUrl.pathname}${imageUrl.search}${imageUrl.hash}`;
		}

		return imageUrl.href;
	} catch {
		return image;
	}
};

export default API_BASE_URL;
