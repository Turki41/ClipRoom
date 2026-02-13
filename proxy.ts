import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "./middleware/chechAuth.middleware";
import { loginSignup } from "./middleware/login-signup.middleware";

const protectedRoutes = ['/', '/profile', '/upload', '/video']

const isProtected = (path: string) => {
  return protectedRoutes.some((p) => path.startsWith(p))
}

const isPublicVideoPage = (path: string) => {
  return path.startsWith('/video') && path.split('/')[1] !== null
}

export default async function proxy(req: NextRequest) {
  try {
    const path = req.nextUrl.pathname

    if (path.startsWith('/login') || path.startsWith('/signup')) {
      const res = await loginSignup(req)
      return res
    }

    if(isPublicVideoPage(path)) {
      return NextResponse.next()
    }

    if (isProtected(path)) {
      const res = await checkAuth(req)
      return res
    }

    return NextResponse.next()
  } catch (error) {
    console.log('Error in main middleware', error)
    return NextResponse.redirect(new URL('/', req.url))
  }
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|.*\\..*).*)']
}
