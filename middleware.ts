import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export default function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Skip middleware for non-protected routes
  if (!path.startsWith('/api/todos') &&
      !path.startsWith('/api/documents') &&
      !path.startsWith('/api/images') &&
      !path.startsWith('/api/bookmarks')) {
    return NextResponse.next();
  }

  // Check for Authorization header
  const header = request.headers.get("Authorization");
  if (!header || !header.startsWith("Bearer ")) {
    return NextResponse.json(
      { message: "Authorization header missing or invalid" },
      { status: 401 }
    );
  }

  // Extract token
  const token = header.split(" ")[1];
  
  // Verify token
  try {
    // Split token into payload and signature parts
    const [encodedPayload, signature] = token.split('_');
    if (!encodedPayload || !signature) {
      throw new Error('Invalid token format');
    }
    
    // Decode payload
    const payloadString = Buffer.from(encodedPayload, 'base64').toString();
    const payload = JSON.parse(payloadString);
    
    // Check if token is expired
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      throw new Error('Token expired');
    }
    
    // Verify signature
    const secret = 'hellot'; // Same secret
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(payloadString);
    const expectedSignature = hmac.digest('hex');
    
    if (signature !== expectedSignature) {
      throw new Error('Invalid signature');
    }
    
    // Token is valid - extract userId
    const userId = payload.userId;
    
    // Add userId to headers for downstream handlers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('X-User-Id', userId);
    
    // Create new request with modified headers
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