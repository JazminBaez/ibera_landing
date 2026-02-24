"use client"

import { useState, useRef, useEffect } from "react"
import { Globe } from "lucide-react"

const languages = [
  { code: "es", label: "ES", full: "Espanol" },
  { code: "en", label: "EN", full: "English" },
  { code: "pt", label: "PT", full: "Portugues" },
] as const

export type Locale = (typeof languages)[number]["code"]

export function LanguageSwitcher({
  locale,
  onChange,
}: {
  locale: Locale
  onChange: (locale: Locale) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const current = languages.find((l) => l.code === locale)

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-sm"
        aria-label="Cambiar idioma"
      >
        <Globe className="h-4 w-4" />
        <span className="font-medium">{current?.label}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 bg-card border border-border rounded-sm shadow-lg overflow-hidden min-w-[140px] z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                onChange(lang.code)
                setOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                locale === lang.code
                  ? "bg-primary/5 text-primary font-medium"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <span className="font-medium w-6">{lang.label}</span>
              <span>{lang.full}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
