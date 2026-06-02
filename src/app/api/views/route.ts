import { NextResponse } from 'next/server'

const UPSTASH_URL   = process.env.UPSTASH_REDIS_REST_URL!
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN!

async function redis(command: unknown[]) {
  const res = await fetch(`${UPSTASH_URL}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${UPSTASH_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
  })
  const data = await res.json()
  return data.result
}

export async function GET() {
  const count = (await redis(['GET', 'visitor_count'])) ?? 0
  return NextResponse.json({ count: Number(count) })
}

export async function POST() {
  const count = await redis(['INCR', 'visitor_count'])
  return NextResponse.json({ count: Number(count) })
}
