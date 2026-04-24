import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  const { id } = await params

  const res = await fetch(
    `https://online-cours-api-puap.vercel.app/api/courses/${id}/lessons`
  )

  const data = await res.json()
  return Response.json(data, { status: res.status })
}

