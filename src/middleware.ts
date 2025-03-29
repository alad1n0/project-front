import { NextResponse, NextRequest } from "next/server";

const privateRoutes = [/^\/profile(\/.*)?$/];
const adminRoutes = [/^\/admin(\/.*)?$/];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const accessToken = request.cookies.get("access_token")?.value;
    const refreshToken = request.cookies.get("refresh_token")?.value;

    const adminAccessToken = request.cookies.get("admin_access_token")?.value;
    const adminRefreshToken = request.cookies.get("admin_refresh_token")?.value;

    if (pathname === "/admin") {
        return NextResponse.next();
    }

    if (adminRoutes.some((regex) => regex.test(pathname))) {
        if (!adminAccessToken || !adminRefreshToken) {
            console.log("Redirecting to /admin because admin tokens are missing");
            return NextResponse.redirect(new URL("/admin", request.url));
        }
    }
    else if (privateRoutes.some((regex) => regex.test(pathname))) {
        if (!accessToken || !refreshToken) {
            console.log("Redirecting to / because user tokens are missing");
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/profile", "/admin", "/admin/:path*"],
};
