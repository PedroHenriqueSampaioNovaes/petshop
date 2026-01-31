import { NextResponse, NextRequest } from 'next/server';

import { verifyToken } from './src/common/utils/verifyToken';

const publicRoutes = [
  { path: '/', conflictingPrivateRoutes: null, whenAuthenticated: 'next' },
  {
    path: '/pet/:id',
    conflictingPrivateRoutes: ['/pet/add', '/pet/mypets', '/pet/myadoptions'],
    whenAuthenticated: 'next',
  },
];

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/';

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => {
    const routeParts = route.path.split('/');
    const requestParts = path.split('/');

    if (routeParts.length !== requestParts.length) {
      return false;
    }

    if (route.conflictingPrivateRoutes?.includes(path)) {
      return false;
    }

    return routeParts.every((part, index) => {
      if (part.startsWith(':')) {
        return true;
      }

      return part === requestParts[index];
    });
  });

  const token = request.cookies.get('token')?.value;

  if (!token && publicRoute) {
    return NextResponse.next();
  }

  if (!token && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();

    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;

    return NextResponse.redirect(redirectUrl);
  }

  if (token && !publicRoute) {
    const isAuthenticated = token ? await verifyToken(token) : false;

    if (!isAuthenticated) {
      const redirectUrl = request.nextUrl.clone();

      redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;

      const response = NextResponse.redirect(redirectUrl);
      response.cookies.delete('token');

      return response;
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.png$).*)',
  ],
};
