"use client"

import React, { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface AudioFile {
  id: string
  language: string
  url: string
  filename: string
  uploadedAt: string
}

export default function UploadAudioPage() {
  const [files, setFiles] = useState<AudioFile[]>([])
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState<string>("english")
  const audioRef = useRef<HTMLAudioElement>(null)
  const [uploading, setUploading] = useState(false)

  // Fetch audio files on mount
  useEffect(() => {
    fetch("/api/upload")
      .then((res) => res.json())
      .then((data) => setFiles(data.audios || []))
  }, [])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const formData = new FormData()
    formData.append("file", file)
    formData.append("language", selectedLanguage)
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
    if (res.ok) {
      const data = await res.json()
      setFiles((prev) => [...prev, data])
    }
    setUploading(false)
  }

  const handlePlay = (url: string) => {
    if (audioRef.current) {
      audioRef.current.src = url
      audioRef.current.play()
      setSelectedFile(url)
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4">Upload Audio Files</h2>
      
      <div className="mb-4">
        <label className="block mb-2">Select Language:</label>
        <select 
          value={selectedLanguage} 
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="border rounded px-3 py-2 mr-4"
        >
          <option value="english">English</option>
          <option value="arabic">Arabic</option>
        </select>
      </div>
      
      <input type="file" accept="audio/*" onChange={handleUpload} disabled={uploading} />
      
      <ul className="mt-6 space-y-4">
        {files.map((file) => (
          <li key={file.id} className="flex items-center gap-4">
            <span>{file.filename} ({file.language})</span>
            <Button
              onClick={() => handlePlay(file.url)}
              disabled={selectedFile === file.url}
              className="px-4 py-1"
            >
              {selectedFile === file.url ? "Playing" : "Play"}
            </Button>
          </li>
        ))}
      </ul>
      <audio ref={audioRef} onEnded={() => setSelectedFile(null)} />
    </div>
  )
}