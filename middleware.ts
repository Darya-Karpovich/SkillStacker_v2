import withAuth from "next-auth/middleware";
import { NextResponse, type NextRequest } from "next/server";

const authMiddleware = withAuth(
  function onSuccess(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
  }
);

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.next();
  } else {
    return (authMiddleware as any)(request);
  }
}
