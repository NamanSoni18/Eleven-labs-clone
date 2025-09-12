import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative mx-auto w-full max-w-5xl px-4 pt-20 pb-10 text-center md:pt-24">
      <h1 className="mx-auto mb-6 max-w-4xl text-balance text-2xl font-semibold leading-tight tracking-[-0.02em] sm:text-5xl md:text-4xl">
        The most realistic voice AI platform
      </h1>
      <p className="mx-auto mb-8 max-w-3xl text-pretty text-base font-semibold leading-relaxed text-muted-foreground md:text-md">
        AI voice models and products powering millions of developers, creators, and enterprises. From low-latency
        conversational agents to the leading AI voice generator for voiceovers and audiobooks.
      </p>
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button size="lg" className="h-11 rounded-full bg-black px-8 text-sm font-bold tracking-wide hover:bg-black/40">
          SIGN UP
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="h-11 rounded-sm border-border/70 px-8 rounded-full bg-black/10 text-sm font-bold tracking-wide hover:bg-black/30"
        >
          CONTACT SALES
        </Button>
      </div>
    </section>
  )
}
