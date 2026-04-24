export async function POST(request) {
  const body = await request.json()

  const res = await fetch('https://online-cours-api-puap.vercel.app/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const data = await res.json()
  return Response.json(data, {
    id: res.id 
    status: res.status
   })
}