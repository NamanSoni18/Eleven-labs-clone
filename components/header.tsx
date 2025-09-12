"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="flex h-14 items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center font-semibold tracking-tight text-lg">
            <span className="select-none">IIElevenLabs</span>
          </div>
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1 text-sm">
            <Button variant="ghost" className="h-8 px-3 font-bold hover:bg-black/10 text-foreground/80 hover:text-foreground">
              Creative Platform <ChevronDown className="ml-1 h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" className="h-8 px-3 font-bold hover:bg-black/10 text-foreground/80 hover:text-foreground">
              Agents Platform <ChevronDown className="ml-1 h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" className="h-8 px-3 font-bold hover:bg-black/10 text-foreground/80 hover:text-foreground">
              Developers <ChevronDown className="ml-1 h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" className="h-8 px-3 font-bold hover:bg-black/10 text-foreground/80 hover:text-foreground">
              Resources <ChevronDown className="ml-1 h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" className="h-8 px-3 font-bold hover:bg-black/10 text-foreground/80 hover:text-foreground">Enterprise</Button>
            <Button variant="ghost" className="h-8 px-3 font-bold hover:bg-black/10 text-foreground/80 hover:text-foreground">Pricing</Button>
          </nav>
          {/* Auth */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="hidden sm:inline-flex h-8 px-3 text-sm font-bold rounded-full hover:bg-black/10 text-foreground/80 hover:text-foreground">Log in</Button>
            <Button className="h-8 rounded-full bg-black px-4 text-xs font-bold tracking-wide text-white hover:bg-black/40">Sign up</Button>
          </div>
        </div>
      </div>
    </header>
  )
}
