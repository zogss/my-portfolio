'use server';

import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';

const getCookie = async (...args: [name: string] | [RequestCookie]) => {
  const cookieStore = await cookies();
  return cookieStore.get(...args)?.value;
};

export default getCookie;
