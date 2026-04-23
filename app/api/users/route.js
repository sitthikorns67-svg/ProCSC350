import { NextRequest, NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();

  const res = await fetch('https://online-cours-api-puap.vercel.app/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  return NextResponse.json(data, { status: res.status });
}
