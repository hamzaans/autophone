import { verify } from 'jsonwebtoken';
import { compare } from 'bcryptjs';

async function testAuth() {
  const password = 'your_password'; // The password you used
  const hash = process.env.AUTH_PASSWORD_HASH;
  const secret = process.env.JWT_SECRET;

  if (!hash || !secret) {
    console.error('Environment variables not set');
    return;
  }

  try {
    // Test password hash
    const validPassword = await compare(password, hash);
    console.log('Password hash valid:', validPassword);

    // Test JWT
    const token = verify('test', secret);
    console.log('JWT secret valid');
  } catch (error) {
    console.error('Auth test failed:', error);
  }
}

testAuth(); 