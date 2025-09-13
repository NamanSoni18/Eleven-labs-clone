import clientPromise from "@/lib/mongodb"
import { NextResponse } from "next/server"

// GET /api/audio-url?language=english|arabic
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const language = searchParams.get("language")?.toLowerCase()
    
    if (!language || !["english", "arabic"].includes(language)) {
      return NextResponse.json({ error: "Invalid language. Must be 'english' or 'arabic'" }, { status: 400 })
    }
    
    const client = await clientPromise
    const db = client.db("panelvoices") // Match the database name from upload API
    const audio = await db.collection("audioFiles").findOne({ language })
    
    if (!audio) {
      return NextResponse.json({ 
        error: `No audio found for language: ${language}`,
        available: await db.collection("audioFiles").find({}).toArray()
      }, { status: 404 })
    }
    
    // Ensure the URL is absolute for production
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `${req.headers.get('origin') || 'http://localhost:3000'}`
    const audioUrl = audio.url.startsWith('http') ? audio.url : `${baseUrl}${audio.url}`
    
    return NextResponse.json({ 
      audioUrl,
      filename: audio.filename,
      language: audio.language
    })
  } catch (error) {
    console.error("Error fetching audio URL:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
