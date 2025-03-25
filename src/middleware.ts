import { auth } from './lib/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const session = await auth.session(request);

  // Protéger les routes de création d'emoji
  if (request.nextUrl.pathname.startsWith('/emoji/create') && !session) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}