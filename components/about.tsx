import Image from "next/image"
import type { Locale } from "./language-switcher"
import { siteConfig } from "@/lib/site-config"

export function About({ locale }: { locale: Locale }) {
  return (
    <section id="about" className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3">
            {siteConfig.about.label[locale]}
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground text-balance">
            {siteConfig.about.heading[locale]}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[3/4] lg:aspect-[4/5] rounded-sm overflow-hidden">
            <Image
              src={siteConfig.about.image}
              alt={siteConfig.about.heading[locale]}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div>
            <p className="text-lg leading-relaxed text-muted-foreground mb-6">
              {siteConfig.about.p1[locale]}
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground mb-10">
              {siteConfig.about.p2[locale]}
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
              {siteConfig.about.highlights.map((item) => (
                <div key={item.title.es} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">
                      {item.title[locale]}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.text[locale]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
