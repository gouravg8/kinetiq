import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
	const sessionCookie = getSessionCookie(request);
	const { pathname } = request.nextUrl;

	const isProtected =
		pathname.startsWith("/dashboard") ||
		pathname.startsWith("/profile") ||
		pathname.startsWith("/settings");

	// ✅ Unauthenticated trying to access protected routes
	if (isProtected && !sessionCookie) {
		const signinUrl = new URL("/signin", request.url);
		signinUrl.searchParams.set("redirect", pathname);
		return NextResponse.redirect(signinUrl);
	}

	// ✅ Authenticated user trying to access /signin
	if (sessionCookie && pathname.startsWith("/signin")) {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	return NextResponse.next();
}

export const config = {
	// exclude /signin, api, _next, static assets from middleware
	matcher: ["/((?!api|_next|static|signin).*)"],
};
