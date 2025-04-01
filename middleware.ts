import withAuth from 'next-auth/middleware';
import { NextResponse, type NextRequest } from 'next/server';

const authMiddleware = withAuth(
  function onSuccess() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
  },
);

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    const url = request.nextUrl;
    const pageParam = url.searchParams.get('page');
    const page = pageParam ? parseInt(pageParam, 10) : 1;

    if (isNaN(page) || page < 1) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  } else {
    return (authMiddleware as any)(request);
  }
}
