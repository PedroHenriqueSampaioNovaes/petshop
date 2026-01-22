import * as jose from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function verifyToken(token: string): Promise<boolean> {
  try {
    await jose.jwtVerify(token, secret);

    return true;
  } catch {
    return false;
  }
}
