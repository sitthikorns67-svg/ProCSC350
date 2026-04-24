import { NextResponse } from 'next/server'

const BASE_URL = 'https://online-cours-api-puap.vercel.app'

export async function DELETE(_request, { params }) {
  try {
    const { id } = await params
    const res = await fetch(`${BASE_URL}/api/courses/${id}`, {
      method: 'DELETE',
    })

    const text = await res.text()
    console.log('status:', res.status)
    console.log('response:', text)

    if (!res.ok) {
      return NextResponse.json({ error: text }, { status: res.status })
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}