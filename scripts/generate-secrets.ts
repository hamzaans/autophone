import { randomBytes } from 'crypto';
import { hash } from 'bcryptjs';

async function generateSecrets() {
  // Generate JWT secret
  const jwtSecret = randomBytes(32).toString('hex');
  
  // Your desired username and password
  const username = 'admin'; // Change this
  const password = 'your_password'; // Change this
  
  // Hash password
  const passwordHash = await hash(password, 10);

  console.log('Add these to your .env.local file:\n');
  console.log(`AUTH_USERNAME=${username}`);
  console.log(`AUTH_PASSWORD_HASH=${passwordHash}`);
  console.log(`JWT_SECRET=${jwtSecret}`);
}

generateSecrets(); 