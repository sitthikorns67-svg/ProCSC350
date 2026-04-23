export async function GET() {
  const res = await fetch('https://online-cours-api-puap.vercel.app/api/courses')
  const data = await res.json()
  return Response.json(data, { status: res.status })
}