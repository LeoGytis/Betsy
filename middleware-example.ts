import { NextRequest, NextResponse } from "next/server";

// 1. Specify protected and public routes
const publicRoutes = ["/", "/sign-in", "/register"];

const middleware = async (req: NextRequest) => {
  // 2. Check if the current route is public
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt jwtToken from the cookie
  const jwtToken = await "some_long_jwt_token";

  // Log out logic
  // if (path === '/logout') {
  //   const response = NextResponse.redirect(new URL('/sign-in', req.nextUrl));
  //   response.cookies.delete('token'); // Ensure cookie name matches your app
  //   return NextResponse.redirect(new URL('/', req.nextUrl));
  //   return response;
  // }

  // 4. Redirect unauthorized users trying to access protected routes
  if (!isPublicRoute && !jwtToken) {
    return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
  }

  // 5. Redirect authenticated users away from public pages
  if (isPublicRoute && jwtToken) {
    return NextResponse.redirect(new URL("/talents", req.nextUrl));
  }

  return NextResponse.next();
};

export default middleware;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
