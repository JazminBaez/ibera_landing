import Image from "next/image"
import { ArrowDown } from "lucide-react"
import type { Locale } from "./language-switcher"
import { siteConfig } from "@/lib/site-config"

export function Hero({ locale }: { locale: Locale }) {
  return (
    <section id="hero" className="relative h-screen min-h-[600px] flex items-end">
      <Image
        src={siteConfig.hero.image}
        alt={siteConfig.hero.heading[locale]}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 md:pb-28 w-full">
        <p className="text-sm md:text-base uppercase tracking-[0.25em] text-white/70 mb-4">
          {siteConfig.hero.location[locale]}
        </p>
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white leading-tight max-w-3xl text-balance">
          {siteConfig.hero.heading[locale]}
        </h1>
        <p className="mt-4 text-lg md:text-xl text-white/80 max-w-xl leading-relaxed">
          {siteConfig.hero.sub[locale]}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <a
            href="#packages"
            className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-3.5 text-sm font-medium tracking-wide rounded-sm hover:bg-primary/90 transition-colors"
          >
            {siteConfig.hero.cta1[locale]}
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center border border-white/40 text-white px-8 py-3.5 text-sm font-medium tracking-wide rounded-sm hover:bg-white/10 transition-colors"
          >
            {siteConfig.hero.cta2[locale]}
          </a>
        </div>

        <a
          href="#about"
          className="mt-12 inline-flex items-center gap-2 text-white/60 text-sm hover:text-white/90 transition-colors"
          aria-label="Scroll down"
        >
          <ArrowDown className="h-4 w-4 animate-bounce" />
          <span>{siteConfig.hero.scroll[locale]}</span>
        </a>
      </div>
    </section>
  )
}
