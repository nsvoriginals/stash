import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export default function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (!path.startsWith('/api/todos') &&
      !path.startsWith('/api/documents') &&
      !path.startsWith('/api/images') &&
      !path.startsWith('/api/bookmarks')) {
    return NextResponse.next();
  }

  const header = request.headers.get("Authorization");
  if (!header || !header.startsWith("Bearer ")) {
    return NextResponse.json(
      { message: "Authorization header missing or invalid" },
      { status: 401 }
    );
  }

  const token = header.split(" ")[1];
  
  try {
    const [encodedPayload, signature] = token.split('_');
    if (!encodedPayload || !signature) {
      throw new Error('Invalid token format');
    }
    
    const payloadString = Buffer.from(encodedPayload, 'base64').toString();
    const payload = JSON.parse(payloadString);
    
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      throw new Error('Token expired');
    }
    
    const secret = 'hellot';
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(payloadString);
    const expectedSignature = hmac.digest('hex');
    
    if (signature !== expectedSignature) {
      throw new Error('Invalid signature');
    }
    
    const userId = payload.userId;
    
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('X-User-Id', userId);
    
    const nextRequest = new NextRequest(request.url, {
      headers: requestHeaders,
      method: request.method,
      body: request.body,
      cache: request.cache,
      credentials: request.credentials,
      integrity: request.integrity,
      keepalive: request.keepalive,
      mode: request.mode,
      redirect: request.redirect,
    });
    
    return NextResponse.next({
      request: nextRequest,
    });
  } catch (error) {
    console.error('Token Verification Error:', error);
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: [
    '/api/todos/:path*',
    '/api/documents/:path*',
    '/api/images/:path*',
    '/api/bookmarks/:path*',
  ],
};