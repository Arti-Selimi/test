
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
 
export default createMiddleware(routing);
 
export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};

import { NextResponse } from "next/server";

export function middleware(req: Request) {
  if (req.url.includes("/favicon.ico")) {
    return new NextResponse(null, { status: 404 });
  }
  return NextResponse.next();
}