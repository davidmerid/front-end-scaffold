import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value

  const isProtectedRoute = request.nextUrl.pathname.startsWith('/tasks')
  const isAuthRoute = request.nextUrl.pathname.startsWith('/login')

  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/tasks', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/tasks/:path*', '/login'],
}
