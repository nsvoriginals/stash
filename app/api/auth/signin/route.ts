import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

// Simple token generation function
function generateToken(userId: string, email: string) {
  // Create a payload with user data and expiration
  const payload = {
    userId,
    email,
    exp: Math.floor(Date.now() / 1000) + (6 * 60 * 60) // 6 hours
  };
  
  // Convert payload to string and encrypt
  const data = JSON.stringify(payload);
  const secret = 'hellot'; // Keep the same secret
  
  // Create HMAC
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(data);
  const signature = hmac.digest('hex');
  
  // Create simple token by combining the base64 encoded payload and signature
  const encodedPayload = Buffer.from(data).toString('base64');
  return encodedPayload + '_' + signature;
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const user = await prisma.user.findUnique({
      where: { email }
    });
    
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Generate simple token
    const token = generateToken(user.id, user.email);
    
    return NextResponse.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username
      }
    });
  } catch (error) {
    console.error('Signin Error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}