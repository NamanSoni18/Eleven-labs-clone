import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { TextToSpeechInterface } from "@/components/text-to-speech-interface"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <TextToSpeechInterface />
    </main>
  )
}
