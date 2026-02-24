import Image from "next/image"
import { MapPin, Star, ExternalLink } from "lucide-react"
import type { Locale } from "./language-switcher"
import { siteConfig } from "@/lib/site-config"

export function Hotels({ locale }: { locale: Locale }) {
  return (
    <section id="hotels" className="py-24 md:py-32 bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3">
            {siteConfig.hotels.label[locale]}
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground text-balance">
            {siteConfig.hotels.heading[locale]}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {siteConfig.hotels.sub[locale]}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {siteConfig.hotels.items.map((hotel) => (
            <div
              key={hotel.name}
              className="bg-card border border-border rounded-sm overflow-hidden group transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={hotel.image}
                  alt={hotel.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif text-xl text-foreground">{hotel.name}</h3>
                  <div className="flex items-center gap-1 text-accent">
                    <Star className="h-4 w-4 fill-accent" />
                    <span className="text-sm font-medium">{hotel.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{hotel.location}</span>
                  <span className="ml-auto text-primary font-medium">{hotel.priceRange}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {hotel.description[locale]}
                </p>
                <button className="mt-4 inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline">
                  <span>{siteConfig.hotels.moreInfo[locale]}</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
