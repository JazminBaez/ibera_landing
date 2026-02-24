"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import type { Locale } from "./language-switcher"
import { siteConfig } from "@/lib/site-config"

interface TipCategory {
  icon: React.ElementType
  title: Record<Locale, string>
  items: Record<Locale, string[]>
}

function TipAccordionItem({
  category,
  locale,
  isOpen,
  onToggle,
}: {
  category: TipCategory
  locale: Locale
  isOpen: boolean
  onToggle: () => void
}) {
  const Icon = category.icon

  return (
    <div className="border border-border rounded-sm overflow-hidden bg-card">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 px-6 py-5 text-left transition-colors hover:bg-secondary/50"
        aria-expanded={isOpen}
      >
        <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <span className="flex-grow font-medium text-foreground">
          {category.title[locale]}
        </span>
        <ChevronDown
          className={`h-5 w-5 text-muted-foreground transition-transform duration-300 flex-shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <ul className="px-6 pb-6 pt-1 flex flex-col gap-3">
            {category.items[locale].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-sm text-muted-foreground leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export function TravelTips({ locale }: { locale: Locale }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="travel-tips" className="py-24 md:py-32 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3">
            {siteConfig.travelTips.label[locale]}
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground text-balance">
            {siteConfig.travelTips.heading[locale]}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {siteConfig.travelTips.subheading[locale]}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {siteConfig.travelTips.categories.map((category, i) => (
            <TipAccordionItem
              key={i}
              category={category as TipCategory}
              locale={locale}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
