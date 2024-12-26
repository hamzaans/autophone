import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const isAuthenticated = request.cookies.get('auth')?.value === 'true';

  if (!isAuthenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true }, { status: 200 });
} 