// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";
// import { MENU } from "./data/menu";

// async function checkRoleMiddleware(req) {
//   const userRole = req?.nextauth?.token?.role;
//   const requestedPath = req?.nextUrl?.pathname;
//   const employeeId = req?.nextauth?.token?.id;
//   // const loginToken = req.nextauth.token?.loginToken;

//   // If no token is found, redirect to login
//   if (!userRole && !employeeId) {
//     return NextResponse.redirect(new URL("/api/auth/signin", req.url));
//   }

//   // Allow `superAdmin` role unrestricted access
//   if (userRole === "superAdmin") {
//     return NextResponse.next();
//   }

//   // Use `fetch` to request role data
//   const res = await fetch(`${process.env.NEXTAUTH_URL}/api/role`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ employeeId }),
//   });

//   if (!res.ok) {
//     if (res.status === 404) {
//       return NextResponse.redirect(new URL("/admin/dashboard", req.url));
//       // return NextResponse.json(
//       //   { status: 404, message: "Role not found" },
//       //   { status: 404 }
//       // );
//     }
//     // throw new Error("Failed to fetch role data");
//   }
//   const roleData = await res.json();

//   // validate permission

//   // Check if the requested path matches any MENU item
//   const menuItem = MENU?.find(
//     (item) =>
//       requestedPath === item?.path || requestedPath.startsWith(`${item?.path}/`)
//   );

//   // const dashboardPath = MENU.find((item) => item.isDashboard)?.path || "/dashboard";

//   // If no matching menu item is found, deny access
//   if (!menuItem) {
//     return NextResponse.redirect(new URL("/admin/dashboard", req.url));
//     // return NextResponse.json(
//     //   {
//     //     status: 401,
//     //     message: "Not Allowed - Path not found",
//     //   },
//     //   { status: 401 }
//     // );
//   }

//   if (!roleData?.permissions || roleData?.permissions.length === 0) {
//     return NextResponse.redirect(new URL("/admin/dashboard", req.url));
//     // return NextResponse.json(
//     //   {
//     //     status: 401,
//     //     message: "Not Allowed - No permissions found",
//     //   },
//     //   { status: 401 }
//     // );
//   }

//   // const isAccessible = roleData?.permissions?.some((path) =>
//   //   requestedPath.startsWith(path)
//   // );
//   // if (!isAccessible) {
//   //   const firstPermittedPath = roleData?.permissions[0];
//   //   return NextResponse.redirect(new URL(firstPermittedPath, req.url));
//   // }
//   if (!roleData?.permissions?.includes(menuItem?.path)) {
//     return NextResponse.redirect(new URL("/admin/dashboard", req.url));
//     // return NextResponse.json(
//     //   {
//     //     status: 401,
//     //     message: "Not Allowed - Permission denied",
//     //   },
//     //   { status: 401 }
//     // );
//   }

//   // we have to redirect the first path in roleData .permissions

//   // we have to redirect to the first permiission path

//   // Check if the user's role is authorized for the menu item
//   // if (!menuItem?.role?.includes(userRole)) {
//   //   return NextResponse.json(
//   //     {
//   //       status: 401,
//   //       message: "Not Allowed - Unauthorized role",
//   //     },
//   //     { status: 401 }
//   //   );
//   // }

//   // Allow the request to continue
//   return NextResponse.next();
// }

// export default withAuth(checkRoleMiddleware, {
//   callbacks: {
//     // Only check if the user is authenticated; role validation happens in the middleware
//     authorized: ({ token }) => !!token,
//   },
// });

// // Exclude auth routes and public paths from the middleware
// export const config = {
//   matcher: ["/admin/:path*"], // Only match admin routes
//   // matcher: ["/api/:path*", "/:path*"], // Match all routes
// };

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { MENU, COMMONMENUITEMS } from "./data/menu";

async function checkRoleMiddleware(req) {
  const userRole = req?.nextauth?.token?.role;
  const requestedPath = req?.nextUrl?.pathname;
  const employeeId = req?.nextauth?.token?.id;

  // If no token is found, redirect to login
  if (!userRole && !employeeId) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  // Allow `superAdmin` role unrestricted access
  if (userRole === "superAdmin") {
    return NextResponse.next();
  }

  // Combine MENU and COMMONMENUITEMS
  const allMenuItems = [...MENU, ...COMMONMENUITEMS];

  // Check if the requested path matches any menu item
  const menuItem = allMenuItems.find(
    (item) =>
      requestedPath === item?.path || requestedPath.startsWith(`${item?.path}/`)
  );

  // If the requested path is in COMMONMENUITEMS, allow unrestricted access
  const isCommonMenuItem = COMMONMENUITEMS.some(
    (item) =>
      requestedPath === item?.path || requestedPath.startsWith(`${item?.path}/`)
  );

  if (isCommonMenuItem) {
    return NextResponse.next();
  }

  // Use `fetch` to request role data for non-common menu items
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/role`, {
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

  const dashboardPath =
    MENU.find((item) => item.isDashboard)?.path || "/admin/dashboard";

  // If no matching menu item is found, redirect to the dashboard
  if (!menuItem) {
    return NextResponse.redirect(new URL(dashboardPath, req.url));
  }

  // If no permissions are found for the user
  if (!roleData?.permissions || roleData?.permissions.length === 0) {
    return NextResponse.redirect(new URL(dashboardPath, req.url));
  }

  // Check if the user has permission for the requested path
  const isAccessible = roleData?.permissions?.some((path) =>
    requestedPath.startsWith(path)
  );

  if (!isAccessible) {
    return NextResponse.redirect(new URL(dashboardPath, req.url));
  }

  if (!roleData?.permissions?.includes(menuItem?.path)) {
    return NextResponse.redirect(new URL(dashboardPath, req.url));
  }

  // Allow the request to continue
  return NextResponse.next();
}

export default withAuth(checkRoleMiddleware, {
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

// Exclude auth routes and public paths from the middleware
export const config = {
  matcher: ["/admin/:path*"], // Only match admin routes
};
