import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	// Use the real origin in the browser (handles both http://localhost:3000 and http://127.0.0.1:3000)
	baseURL:
		typeof window !== "undefined"
			? window.location.origin
			: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
});
