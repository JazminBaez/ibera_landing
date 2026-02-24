"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { LanguageSwitcher, type Locale } from "./language-switcher"
import { siteConfig } from "@/lib/site-config"

export function Navbar({
  locale,
  onLocaleChange,
}: {
  locale: Locale
  onLocaleChange: (locale: Locale) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
        <a href="#hero" className="font-serif text-xl tracking-tight text-foreground">
          {siteConfig.name}
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-6">
          {siteConfig.navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm tracking-wide text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label[locale]}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <LanguageSwitcher locale={locale} onChange={onLocaleChange} />

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-foreground"
            aria-label={open ? "Cerrar menu" : "Abrir menu"}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-background border-t border-border">
          <ul className="flex flex-col px-6 py-4 gap-4">
            {siteConfig.navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-sm tracking-wide text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label[locale]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
