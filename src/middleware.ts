/**
 * Protecting routes
 * Hàm middleware kiểm tra xem người dùng đã đăng nhập hay chưa và
 * đang muốn truy cập vào một đường dẫn bảo vệ. Nếu vậy, nó sẽ chuyển người dùng đến trang đăng nhập. Ngược lại, nó cho phép yêu cầu tiếp tục.
 */

import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import authConfig from "./auth.config"
import NextAuth from "next-auth"
//Hàm middleware được xác định bằng hàm auth từ thư viện next-auth, được cấu hình bằng tệp authConfig.
const { auth } = NextAuth(authConfig)

const protectedPaths = ["/settings", "/dashboard", "/profile"]; // Add all your protected paths here

export default auth(async function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();
    const sessionToken = await getToken({ req, secret: process.env.AUTH_SECRET });

    // Check if the user is not authenticated and trying to access a protected route
    if (!sessionToken && protectedPaths.includes(url.pathname)) {
        // Redirect to the sign-in page if the user is not authenticated
        url.pathname = "/sign-in";
        return NextResponse.redirect(url);
    }

    // If authenticated, continue with the request
    return NextResponse.next();
})

// Configuring the middleware to apply to specific routes
export const config = {
    matcher: ["/((?!api|_next/ static|_next/ image|favicon. ico).*)"],
};
//api, _next/static, _next/image và favicon.ico.
