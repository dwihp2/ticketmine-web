"use server";
import { compare } from 'bcryptjs';
import cookie from 'cookie';
import { getUserByEmail } from '../getUserByEmail';
import { generateJwt } from './generateJwt';


export async function loginUserAction(email: string, password: string) {
  const user = await getUserByEmail(email);
  if (!user) throw new Error('Incorrect email');
  const isValid = await compare(password, user.password);
  if (!isValid) throw new Error('Incorrect password');
  const token = generateJwt(user); // Cast to any to match expected type
  // Set cookie header for authentication (for use in API routes/pages)
  const cookieHeader = cookie.serialize('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
    sameSite: 'lax',
  });
  return { user, cookieHeader };
}
