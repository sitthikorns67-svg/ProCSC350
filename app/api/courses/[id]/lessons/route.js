import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  const { id } = await params

  const res = await fetch(
    `https://online-cours-api-puap.vercel.app/api/courses/${id}/lessons`
  )

  const data = await res.json()
  return Response.json(data, { status: res.status })
}

export async function POST(request, { params }) {
  const BASE_URL = 'https://online-cours-api-puap.vercel.app'
  try {
    const { id } = await params
    const body = await request.json()
    const { title, video_url, content, position } = body

    const res = await fetch(`${BASE_URL}/api/courses/${id}/lessons`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, video_url, content, position }),
    })

    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}