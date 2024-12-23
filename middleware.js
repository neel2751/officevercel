import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { MENU } from "./data/menu";

async function checkRoleMiddleware(req) {
  const userRole = req?.nextauth?.token?.role;
  const requestedPath = req?.nextUrl?.pathname;
  const employeeId = req?.nextauth?.token?.id;
  // const loginToken = req.nextauth.token?.loginToken;

  // If no token is found, redirect to login
  if (!userRole && !employeeId) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  // Allow `superAdmin` role unrestricted access
  if (userRole === "superAdmin") {
    return NextResponse.next();
  }

  // Use `fetch` to request role data
  const res = await fetch(`${process.env.NEXTAUTH_URL}api/role`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ employeeId }),
  });

  if (!res.ok) {
    if (res.status === 404) {
      return NextResponse.json(
        { status: 404, message: "Role not found" },
        { status: 404 }
      );
    }
    throw new Error("Failed to fetch role data");
  }
  const roleData = await res.json();

  // validate permission

  // Check if the requested path matches any MENU item
  const menuItem = MENU?.find(
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

  if (!roleData?.permissions || roleData?.permissions.length === 0) {
    return NextResponse.json(
      {
        status: 401,
        message: "Not Allowed - No permissions found",
      },
      { status: 401 }
    );
  }

  const isAccessible = roleData?.permissions?.some((path) =>
    requestedPath.startsWith(path)
  );
  if (!isAccessible) {
    const firstPermittedPath = roleData?.permissions[0];
    return NextResponse.redirect(new URL(firstPermittedPath, req.url));
  }
  if (!roleData?.permissions?.includes(menuItem?.path)) {
    return NextResponse.json(
      {
        status: 401,
        message: "Not Allowed - Permission denied",
      },
      { status: 401 }
    );
  }

  // we have to redirect the first path in roleData .permissions

  // we have to redirect to the first permiission path

  // Check if the user's role is authorized for the menu item
  // if (!menuItem?.role?.includes(userRole)) {
  //   return NextResponse.json(
  //     {
  //       status: 401,
  //       message: "Not Allowed - Unauthorized role",
  //     },
  //     { status: 401 }
  //   );
  // }

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
  // matcher: ["/api/:path*", "/:path*"], // Match all routes
};
