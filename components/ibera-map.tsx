"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { MapPin } from "lucide-react"
import type { Locale } from "./language-switcher"
import { siteConfig } from "@/lib/site-config"

interface Portal {
  id: string
  name: Record<Locale, string>
  description: Record<Locale, string>
  x: number
  y: number
}

function PortalDot({
  portal,
  isActive,
  locale,
  onActivate,
  onDeactivate,
}: {
  portal: Portal
  isActive: boolean
  locale: Locale
  onActivate: () => void
  onDeactivate: () => void
}) {
  const [tooltipSide, setTooltipSide] = useState<"left" | "right">("right")
  const dotRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!dotRef.current) return
    const rect = dotRef.current.getBoundingClientRect()
    const parentRect = dotRef.current.closest("[data-map-container]")?.getBoundingClientRect()
    if (!parentRect) return
    const spaceRight = parentRect.right - rect.right
    setTooltipSide(spaceRight < 180 ? "left" : "right")
  }, [])

  return (
    <button
      ref={dotRef}
      type="button"
      className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
      style={{ left: `${portal.x}%`, top: `${portal.y}%` }}
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      onClick={onActivate}
      onFocus={onActivate}
      onBlur={onDeactivate}
      aria-label={portal.name[locale]}
    >
      {/* Ripple rings when active */}
      {isActive && (
        <>
          <span className="absolute inset-0 m-auto w-4 h-4 rounded-full border border-primary/40 animate-ping" />
          <span
            className="absolute inset-0 m-auto w-4 h-4 rounded-full border border-primary/25 animate-ping"
            style={{ animationDelay: "0.4s" }}
          />
        </>
      )}

      {/* Outer halo */}
      <span
        className={`absolute inset-0 m-auto rounded-full transition-all duration-300 ease-out ${
          isActive
            ? "w-10 h-10 bg-primary/20"
            : "w-7 h-7 bg-primary/8 group-hover:bg-primary/15 group-hover:w-9 group-hover:h-9"
        }`}
      />

      {/* Main dot */}
      <span
        className={`relative block rounded-full border-2 border-background shadow-md transition-all duration-300 ease-out ${
          isActive
            ? "w-4 h-4 bg-primary shadow-primary/30"
            : "w-3 h-3 bg-primary/80 group-hover:w-3.5 group-hover:h-3.5 group-hover:bg-primary"
        }`}
      />

      {/* Tooltip */}
      <span
        className={`pointer-events-none absolute top-1/2 -translate-y-1/2 whitespace-nowrap transition-all duration-200 ${
          tooltipSide === "right" ? "left-full ml-3" : "right-full mr-3"
        } ${
          isActive
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-1"
        }`}
      >
        <span className="flex items-center gap-2 bg-foreground/90 backdrop-blur-sm text-background text-xs font-medium tracking-wide px-3 py-1.5 rounded shadow-lg">
          {portal.name[locale]}
        </span>
      </span>
    </button>
  )
}

export function IberaMap({ locale }: { locale: Locale }) {
  const [activePortal, setActivePortal] = useState<Portal | null>(null)

  const handleActivate = useCallback((portal: Portal) => {
    setActivePortal(portal)
  }, [])

  const handleDeactivate = useCallback(() => {
    setActivePortal(null)
  }, [])

  return (
    <section id="map" className="py-24 md:py-32 bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3">
            {siteConfig.map.label[locale]}
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground text-balance">
            {siteConfig.map.heading[locale]}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {siteConfig.map.subheading[locale]}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* ── Map with overlay markers ──────────────────── */}
          <div className="lg:col-span-3">
            <div className="bg-card border border-border rounded-sm overflow-hidden">
              <div className="relative" data-map-container>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/corrientes-map.svg"
                  alt="Corrientes Province map"
                  className="w-full h-auto block select-none"
                  draggable={false}
                />

                {siteConfig.map.portals.map((portal) => (
                  <PortalDot
                    key={portal.id}
                    portal={portal}
                    isActive={activePortal?.id === portal.id}
                    locale={locale}
                    onActivate={() => handleActivate(portal as Portal)}
                    onDeactivate={handleDeactivate}
                  />
                ))}
              </div>

              {/* Hover hint */}
              <p className="text-center text-xs text-muted-foreground py-3 border-t border-border">
                {siteConfig.map.hoverHint[locale]}
              </p>
            </div>
          </div>

          {/* ── Info panel ───────────────────────────────────── */}
          <div className="lg:col-span-2">
            {activePortal ? (
              <div
                key={activePortal.id}
                className="bg-card border border-border rounded-sm p-8 animate-in fade-in-0 slide-in-from-bottom-2 duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl text-foreground leading-tight">
                    {activePortal.name[locale]}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {activePortal.description[locale]}
                </p>
                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center justify-center bg-primary text-primary-foreground px-6 py-2.5 text-sm font-medium tracking-wide rounded-sm hover:bg-primary/90 transition-colors"
                >
                  {siteConfig.map.askAccess[locale]}
                </a>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-sm p-8">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary/5 flex items-center justify-center">
                    <MapPin className="h-7 w-7 text-primary/40" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-foreground mb-2">
                      {siteConfig.map.selectPortal[locale]}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {siteConfig.map.selectPortalDesc[locale]}
                    </p>
                  </div>
                </div>

                {/* Portal list */}
                <ul className="mt-6 space-y-2">
                  {siteConfig.map.portals.map((portal) => (
                    <li key={portal.id}>
                      <button
                        type="button"
                        className="w-full text-left flex items-center gap-3 px-4 py-2.5 rounded-sm text-sm text-muted-foreground hover:bg-primary/5 hover:text-foreground transition-colors"
                        onMouseEnter={() => handleActivate(portal as Portal)}
                        onMouseLeave={handleDeactivate}
                        onClick={() => handleActivate(portal as Portal)}
                      >
                        <span className="w-2 h-2 rounded-full bg-primary/50 flex-shrink-0" />
                        {portal.name[locale]}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
