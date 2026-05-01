import { NextResponse } from 'next/server'

const BASE_URL = "https://online-cours-api-puap.vercel.app";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const instructor_id = searchParams.get("instructor_id");

  let url = `${BASE_URL}/api/courses`;

  // if has query param -> add to url
  if (instructor_id) {
    url += `?instructor_id=${instructor_id}`;
  }

  const res = await fetch(url);
  const data = await res.json();

  return NextResponse.json(data, { status: res.status });
}

export async function POST(request) {
  const body = await request.json()
  const BASE_URL = 'https://online-cours-api-puap.vercel.app'
  const { instructor_id, title, description, thumbnail_url, is_published } = body

  const res = await fetch(`${BASE_URL}/api/courses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ instructor_id, title, description, thumbnail_url, is_published }),
  })

  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}