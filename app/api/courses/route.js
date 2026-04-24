import { NextResponse } from 'next/server'
export async function GET() {
  const res = await fetch('https://online-cours-api-puap.vercel.app/api/courses')
  const data = await res.json()
  return Response.json(data, { status: res.status })
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