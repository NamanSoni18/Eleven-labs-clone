"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export interface TabItem {
  id: string
  label: string
  icon?: string
}

const defaultTabs: TabItem[] = [
  { id: "text-to-speech", label: "TEXT TO SPEECH" },
  { id: "agents", label: "AGENTS" },
  { id: "music", label: "MUSIC" },
  { id: "speech-to-text", label: "SPEECH TO TEXT" },
  { id: "dubbing", label: "DUBBING" },
  { id: "voice-cloning", label: "VOICE CLONING" },
  { id: "elevenreader", label: "ELEVENREADER" },
]

export function TabBar({
  active,
  onChange,
  tabs = defaultTabs,
}: {
  active: string
  onChange: (id: string) => void
  tabs?: TabItem[]
}) {
  return (
    <div className="mx-auto w-full max-w-5xl px-4">
      <div className="flex items-center justify-evenly gap-2">
        {tabs.map((t) => {
          const isActive = t.id === active
          return (
            <Button
              key={t.id}
              size="lg"
              onClick={() => onChange(t.id)}
              variant="ghost"
              className={`h-9 rounded-md px-4 text-sm font-semibold tracking-wide transition-all duration-200 ${
                isActive 
                  ? "bg-black/10 text-black shadow-sm" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
              }`}
            >
              {t.label}
            </Button>
          )
        })}
      </div>
    </div>
  )
}

export function UseTabBarDemo() {
  const [active, setActive] = useState("text-to-speech")
  return <TabBar active={active} onChange={setActive} />
}
