import { TreePine, Bird, Droplets, Shield } from "lucide-react"
import type { Locale } from "./language-switcher"
import { siteConfig } from "@/lib/site-config"

export function ConservationBanner({ locale }: { locale: Locale }) {
  return (
    <section className="relative bg-primary py-20 md:py-24 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="font-serif text-3xl md:text-4xl text-primary-foreground text-balance">
            {siteConfig.conservation.heading[locale]}
          </h2>
          <p className="mt-3 text-primary-foreground/70 max-w-2xl mx-auto leading-relaxed">
            {siteConfig.conservation.sub[locale]}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {siteConfig.conservation.stats.map((stat) => (
            <div key={stat.label.es} className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center mx-auto mb-3">
                <stat.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <p className="font-serif text-2xl md:text-3xl text-primary-foreground">
                {stat.value}
              </p>
              <p className="text-sm text-primary-foreground/60 mt-1">
                {stat.label[locale]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
