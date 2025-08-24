// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
    const sessionCookie = getSessionCookie(request);

    console.log({ sessionCookie });

    const protectedRoutes = ['/dashboard', '/profile', '/settings'];
    const isProtected = protectedRoutes.some((route) =>
        request.nextUrl.pathname.startsWith(route)
    );

    if (!sessionCookie) {
        return NextResponse.redirect(new URL("/signin", request.url));
    }

    if (request?.nextUrl?.pathname?.startsWith("/signin")) {
        const goToDashboard = new URL("/dashboard", request?.url);
        goToDashboard?.searchParams?.set("redirect", request?.nextUrl?.pathname);
        return NextResponse.redirect(goToDashboard);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/dashboard", "/signin"]
}