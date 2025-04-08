import { NextResponse, NextRequest } from "next/server";
import {getToken} from "next-auth/jwt";

const privateRoutes = [/^\/profile(\/.*)?$/];
const adminRoutes = [/^\/admin\/.+$/];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    let refreshToken: string | undefined = request.cookies.get("refresh_token")?.value;

    if (!refreshToken) {
        const token = await getToken({ req: request, secret: process.env.JWT_SECRET });

        refreshToken = token?.refresh_token as string | undefined;

        if (refreshToken) {
            const response = NextResponse.next();
            response.cookies.set("refresh_token", refreshToken, {maxAge: 60 * 60 * 24 * 30,});
            return response;
        }
    }

    const adminAccessToken = request.cookies.get("admin_access_token")?.value;
    const adminRefreshToken = request.cookies.get("admin_refresh_token")?.value;

    if (pathname === "/admin" && adminAccessToken) {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    if (adminRoutes.some((regex) => regex.test(pathname))) {
        if (!adminAccessToken || !adminRefreshToken) {
            return NextResponse.redirect(new URL("/admin", request.url));
        }
    } else if (privateRoutes.some((regex) => regex.test(pathname))) {
        if (!refreshToken) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/profile", "/admin", "/admin/:path*"],
};
