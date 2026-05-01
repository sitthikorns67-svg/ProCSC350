import { NextResponse } from "next/server";

export async function PUT(req) {
  const body = await req.json();

  const res = await fetch("https://online-cours-api-puap.vercel.app/api/forgot-password", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}