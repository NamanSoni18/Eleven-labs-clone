import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

// Mock audio URLs for different voices and languages
const mockAudioUrls = {
  samara: {
    english: "/placeholder.mp3?voice=samara&lang=en",
    spanish: "/placeholder.mp3?voice=samara&lang=es",
    french: "/placeholder.mp3?voice=samara&lang=fr",
    german: "/placeholder.mp3?voice=samara&lang=de",
  },
  spuds: {
    english: "/placeholder.mp3?voice=spuds&lang=en",
    spanish: "/placeholder.mp3?voice=spuds&lang=es",
    french: "/placeholder.mp3?voice=spuds&lang=fr",
    german: "/placeholder.mp3?voice=spuds&lang=de",
  },
  jessica: {
    english: "/placeholder.mp3?voice=jessica&lang=en",
    spanish: "/placeholder.mp3?voice=jessica&lang=es",
    french: "/placeholder.mp3?voice=jessica&lang=fr",
    german: "/placeholder.mp3?voice=jessica&lang=de",
  },
  announcer: {
    english: "/placeholder.mp3?voice=announcer&lang=en",
    spanish: "/placeholder.mp3?voice=announcer&lang=es",
    french: "/placeholder.mp3?voice=announcer&lang=fr",
    german: "/placeholder.mp3?voice=announcer&lang=de",
  },
  sergeant: {
    english: "/placeholder.mp3?voice=sergeant&lang=en",
    spanish: "/placeholder.mp3?voice=sergeant&lang=es",
    french: "/placeholder.mp3?voice=sergeant&lang=fr",
    german: "/placeholder.mp3?voice=sergeant&lang=de",
  },
}

export async function POST(request: NextRequest) {
  try {
    const { text, voice, language } = await request.json()

    if (!text || !voice || !language) {
      return NextResponse.json({ error: "Missing required fields: text, voice, language" }, { status: 400 })
    }

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db("panelvoices")
    const collection = db.collection("audio_generations")

    // Check if we already have this audio generated
    const existingAudio = await collection.findOne({
      text,
      voice,
      language,
    })

    if (existingAudio) {
      return NextResponse.json({
        audioUrl: existingAudio.audioUrl,
        cached: true,
      })
    }

    // Simulate audio generation delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Get mock audio URL based on voice and language
    const voiceUrls = mockAudioUrls[voice as keyof typeof mockAudioUrls]
    const audioUrl = voiceUrls?.[language as keyof typeof voiceUrls] || voiceUrls?.english || "/placeholder.mp3"

    // Store the generated audio in MongoDB
    const audioRecord = {
      text,
      voice,
      language,
      audioUrl,
      createdAt: new Date(),
      textHash: Buffer.from(text).toString("base64"), // Simple hash for indexing
    }

    const result = await collection.insertOne(audioRecord)

    return NextResponse.json({
      audioUrl,
      id: result.insertedId,
      cached: false,
    })
  } catch (error) {
    console.error("Error generating audio:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const language = searchParams.get("language")
    const voice = searchParams.get("voice")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    const client = await clientPromise
    const db = client.db("panelvoices")
    const collection = db.collection("audio_generations")

    // Build query
    const query: any = {}
    if (language) query.language = language
    if (voice) query.voice = voice

    // Get recent audio generations
    const audioGenerations = await collection.find(query).sort({ createdAt: -1 }).limit(limit).toArray()

    return NextResponse.json({
      audioGenerations: audioGenerations.map((audio) => ({
        id: audio._id,
        text: audio.text,
        voice: audio.voice,
        language: audio.language,
        audioUrl: audio.audioUrl,
        createdAt: audio.createdAt,
      })),
    })
  } catch (error) {
    console.error("Error fetching audio generations:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
