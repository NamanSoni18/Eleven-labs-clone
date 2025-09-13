import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { writeFile, mkdir } from "fs/promises"
import path from "path"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const language = formData.get("language") as string

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    if (!language || !["english", "arabic"].includes(language.toLowerCase())) {
      return NextResponse.json({ error: "Language must be 'english' or 'arabic'" }, { status: 400 })
    }

    const uploadsDir = path.join(process.cwd(), "public", "uploads")
    await mkdir(uploadsDir, { recursive: true })

    const filename = `${Date.now()}-${file.name}`
    const filepath = path.join(uploadsDir, filename)

    // Write file to disk
    const bytes = await file.arrayBuffer()
    await writeFile(filepath, Buffer.from(bytes))

    // Store metadata in MongoDB
    const client = await clientPromise
    const db = client.db("panelvoices")
    const collection = db.collection("audioFiles")

    const audioRecord = {
      filename,
      originalName: file.name,
      url: `/uploads/${filename}`,
      language: language.toLowerCase(),
      uploadedAt: new Date(),
    }

    const result = await collection.insertOne(audioRecord)

    return NextResponse.json({
      id: result.insertedId,
      url: audioRecord.url,
      filename: audioRecord.filename,
      language: audioRecord.language,
    })
  } catch (error) {
    console.error("Error uploading audio:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("panelvoices")
    const collection = db.collection("audioFiles")

    const audios = await collection.find({}).sort({ uploadedAt: -1 }).toArray()

    return NextResponse.json({
      audios: audios.map((audio) => ({
        id: audio._id,
        filename: audio.filename,
        originalName: audio.originalName,
        url: audio.url,
        language: audio.language,
        uploadedAt: audio.uploadedAt,
      })),
      total: audios.length,
      languages: {
        english: audios.filter(a => a.language === "english").length,
        arabic: audios.filter(a => a.language === "arabic").length
      }
    })
  } catch (error) {
    console.error("Error fetching audios:", error)
    return NextResponse.json({ 
      error: "Failed to fetch audio files",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}
