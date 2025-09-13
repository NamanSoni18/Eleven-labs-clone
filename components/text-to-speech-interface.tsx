"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Play, Download, ChevronDown, Pause, Loader2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TabBar } from "@/components/tab-bar"

const voices = [
  { id: "samara", name: "Samara", description: "Narrate a story", tone: "bg-sky-100 text-sky-800" },
  { id: "2 speaker", name: "speaker", description: "Create a dialogue", tone: "bg-emerald-100 text-emerald-800" },
  { id: "Announcer", name: "announcer", description: "Voiceover a game", tone: "bg-pink-100 text-pink-800" },
  { id: "Spuds", name: "spuds", description: "Recount an old story", tone: "bg-violet-100 text-violet-800" },
  { id: "sergeant", name: "Sergeant", description: "Play a drill sergeant", tone: "bg-rose-100 text-rose-800" },
  { id: "Jessica", name: "Jessica", description: "Provide customer support", tone: "bg-rose-100 text-rose-800" },
]

export function TextToSpeechInterface() {
  const [activeTab, setActiveTab] = useState("text-to-speech")
  const [selectedLanguage, setSelectedLanguage] = useState("ENGLISH")
  const [selectedVoice, setSelectedVoice] = useState("samara")
  const [text, setText] = useState(
    `In the ancient land of Eldoria, where skies shimmered and forests, whispered secrets to the wind, lived a dragon named Zephyros. [sarcastically] Not the "burn it all down" kind... [giggles] but he was gentle, wise, with eyes like old stars. [whispers] Even the birds fell silent when he passed.`,
  )
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handlePlay = async () => {
    if (isPlaying && audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
      return
    }
    if (audioUrl && audioRef.current) {
      audioRef.current.play()
      setIsPlaying(true)
      return
    }
    setIsLoading(true)
    try {
      // Fetch audio URL for selected language
      const response = await fetch(`/api/audio-url?language=${selectedLanguage.toLowerCase()}`)
      if (response.ok) {
        const data = await response.json()
        setAudioUrl(data.audioUrl)
        if (audioRef.current) {
          audioRef.current.src = data.audioUrl
          audioRef.current.play()
          setIsPlaying(true)
        }
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const end = () => setIsPlaying(false)
    const pause = () => setIsPlaying(false)
    const play = () => setIsPlaying(true)
    audio.addEventListener("ended", end)
    audio.addEventListener("pause", pause)
    audio.addEventListener("play", play)
    return () => {
      audio.removeEventListener("ended", end)
      audio.removeEventListener("pause", pause)
      audio.removeEventListener("play", play)
    }
  }, [])

  const handleDownload = async () => {
    if (!audioUrl) {
      await handlePlay()
      return
    }
    const link = document.createElement("a")
    link.href = audioUrl
    link.download = `voice-${selectedVoice}-${Date.now()}.mp3`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section className="mx-auto w-full max-w-5xl px-4 pb-24">
      <div className="mb-8">
        <TabBar active={activeTab} onChange={setActiveTab} />
      </div>
      <div className="relative rounded-2xl border-4 border-black/40 bg-white p-5 shadow-sm">
        <Textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value)
            setAudioUrl(null)
          }}
          className="min-h-[180px] resize-none border-none px-4 py-3 text-sm leading-relaxed shadow-inner focus-visible:ring-0"
        />
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-5 lg:grid-cols-4 gap-4">
          {voices.map((v) => {
            const active = v.id === selectedVoice
            return (
              <button
                key={v.id}
                onClick={() => {
                  setSelectedVoice(v.id)
                  setAudioUrl(null)
                }}
                className={`group relative flex items-center gap-1 rounded-lg border px-2 py-1 text-left transition-all duration-200 ${
                  active
                    ? "border-gray-300 bg-gray-50 shadow-sm"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50/50"
                }`}
              >
                <span className={`inline-block h-3 w-3 rounded-full ${v.tone.split(" ")[0]} flex-shrink-0`}></span>
                <div className="flex items-center flex-1 gap-2">
                  <span className="font-bold text-sm text-black">{v.name}</span>
                  <span className="text-gray-400">|</span>
                  <span className="text-xs font-bold text-black truncate">{v.description}</span>
                </div>
              </button>
            )
          })}
        </div>
        <div className="mt-6 flex flex-col justify-between gap-4 border-t border-border/70 pt-4 md:flex-row md:items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-9 rounded-sm bg-transparent px-3 text-xs">
                {selectedLanguage === "ENGLISH" ? "🇺🇸" : "🇸🇦"} {selectedLanguage} <ChevronDown className="ml-1 h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {["ENGLISH", "ARABIC"].map((lang) => (
                <DropdownMenuItem
                  key={lang}
                  onClick={() => {
                    setSelectedLanguage(lang)
                    setAudioUrl(null)
                  }}
                >
                  {lang === "ENGLISH" ? "🇺🇸" : "🇸🇦"} {lang.charAt(0) + lang.slice(1).toLowerCase()}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex items-center gap-2">
            <Button
              onClick={handlePlay}
              disabled={isLoading}
              className="h-9 rounded-full bg-black px-5 text-xs font-bold tracking-wide text-white hover:bg-black/40"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : isPlaying ? (
                <Pause className="mr-2 h-4 w-4" />
              ) : (
                <Play className="mr-2 h-4 w-4" />
              )}
              {isLoading ? "GENERATING..." : isPlaying ? "PAUSE" : "PLAY"}
            </Button>
            <Button
              
              size="icon"
              disabled={isLoading}
              onClick={handleDownload}
              className="h-9 w-9 rounded-sm bg-transparent text-black/50 border-0"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <audio ref={audioRef} className="hidden" />
        <div className="mt-5 relative z-10 flex justify-center pt-2 pb-2 text-xl font-bold text-black">
          <p>Powered by Eleven v3 (alpha)</p>
        </div>
        <div className="pointer-events-none absolute inset-x-[-4px] bottom-[-4px] h-20 rounded-b-2xl bg-gradient-to-r from-white from-80% via-cyan-200 via-85% via-purple-300 via-90% to-orange-400 to-100%" />
      </div>
      
      <div className="mt-6 flex items-center justify-center gap-4">
        <span className="text-sm font-medium text-black">EXPERIENCE THE FULL AUDIO AI PLATFORM</span>
        <Button className="h-9 rounded-full bg-black px-6 text-xs font-bold tracking-wide text-white hover:bg-black/80">
          SIGN UP
        </Button>
      </div>
    </section>
  )
}
