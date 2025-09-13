import clientPromise from "@/lib/mongodb"
import { NextResponse } from "next/server"

// GET /api/audio-url?language=english|arabic
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const language = searchParams.get("language")?.toLowerCase()
  if (!language || !["english", "arabic"].includes(language)) {
    return NextResponse.json({ error: "Invalid language" }, { status: 400 })
  }
  const client = await clientPromise
  const db = client.db()
  const audio = await db.collection("audioFiles").findOne({ language })
  if (!audio) {
    return NextResponse.json({ error: "Audio not found" }, { status: 404 })
  }
  return NextResponse.json({ audioUrl: audio.url })
}
