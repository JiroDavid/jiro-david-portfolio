import { NextResponse } from 'next/server'

async function redis(command: unknown[]) {
  const url   = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN

  if (!url || !token) {
    throw new Error('Upstash env vars not set')
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error(`Upstash error: ${res.status}`)
  }

  const data = await res.json()
  return data.result
}

export async function GET() {
  try {
    const count = (await redis(['GET', 'visitor_count'])) ?? 0
    return NextResponse.json({ count: Number(count) })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ count: 0 }, { status: 200 })
  }
}

export async function POST() {
  try {
    const count = await redis(['INCR', 'visitor_count'])
    return NextResponse.json({ count: Number(count) })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ count: 0 }, { status: 200 })
  }
}
