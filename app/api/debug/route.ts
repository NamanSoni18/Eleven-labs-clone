import clientPromise from "@/lib/mongodb"
import { NextResponse } from "next/server"
import path from "path"
import { existsSync } from "fs"

// GET /api/debug - Debug audio files and database
export async function GET(req: Request) {
  try {
    const client = await clientPromise
    const db = client.db("panelvoices")
    
    // Get all audio files from database
    const audioFiles = await db.collection("audioFiles").find({}).toArray()
    
    // Check if files exist on disk
    const filesWithStatus = audioFiles.map((audio) => {
      const filePath = path.join(process.cwd(), "public", audio.url)
      const exists = existsSync(filePath)
      
      return {
        ...audio,
        fileExists: exists,
        fullPath: filePath,
        publicUrl: audio.url
      }
    })
    
    // Environment info
    const envInfo = {
      NODE_ENV: process.env.NODE_ENV,
      MONGODB_URI: process.env.MONGODB_URI ? "SET" : "NOT SET",
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || "NOT SET",
    }
    
    return NextResponse.json({
      environment: envInfo,
      database: {
        connected: true,
        databaseName: "panelvoices",
        collection: "audioFiles",
        totalFiles: audioFiles.length
      },
      audioFiles: filesWithStatus,
      languages: {
        english: audioFiles.filter(f => f.language === "english").length,
        arabic: audioFiles.filter(f => f.language === "arabic").length
      }
    })
  } catch (error) {
    console.error("Debug API error:", error)
    return NextResponse.json({ 
      error: "Debug failed", 
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}