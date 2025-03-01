import { NextResponse, type NextMiddleware } from 'next/server';

const middleware: NextMiddleware = async (req) => {
	return NextResponse.next({ request: req });
};

export { middleware };

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico, sitemap.xml, robots.txt (metadata files)
		 */
		'/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
	],
};
