import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { MENU } from "./data/menu";

async function checkRoleMiddleware(req) {
  const userRole = req.nextauth.token?.role;
  const requestedPath = req.nextUrl.pathname;
  // const id = req.nextauth.token?.id;
  // const loginToken = req.nextauth.token?.loginToken;

  // If no token is found, redirect to login
  if (!userRole) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  // Allow `superAdmin` role unrestricted access
  if (userRole === "superAdmin") {
    return NextResponse.next();
  }

  // Check if the requested path matches any MENU item
  const menuItem = MENU.find(
    (item) =>
      requestedPath === item?.path || requestedPath.startsWith(`${item?.path}/`)
  );

  // If no matching menu item is found, deny access
  if (!menuItem) {
    return NextResponse.json(
      {
        status: 401,
        message: "Not Allowed - Path not found",
      },
      { status: 401 }
    );
  }

  // Check if the user's role is authorized for the menu item
  if (!menuItem?.role?.includes(userRole)) {
    return NextResponse.json(
      {
        status: 401,
        message: "Not Allowed - Unauthorized role",
      },
      { status: 401 }
    );
  }

  // Allow the request to continue
  return NextResponse.next();
}

export default withAuth(checkRoleMiddleware, {
  callbacks: {
    // Only check if the user is authenticated; role validation happens in the middleware
    authorized: ({ token }) => !!token,
  },
});

// Exclude auth routes and public paths from the middleware
export const config = {
  matcher: ["/admin/:path*"], // Only match admin routes
};
