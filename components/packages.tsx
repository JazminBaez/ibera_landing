import { Check } from "lucide-react"
import type { Locale } from "./language-switcher"
import { siteConfig } from "@/lib/site-config"

interface PackageData {
  name: Record<Locale, string>
  duration: Record<Locale, string>
  price: string
  description: Record<Locale, string>
  includes: Record<Locale, string[]>
  featured?: boolean
}

function PackageCard({ pkg, locale }: { pkg: PackageData; locale: Locale }) {
  return (
    <div
      className={`relative flex flex-col rounded-sm border p-8 transition-shadow hover:shadow-lg ${
        pkg.featured ? "border-primary bg-card shadow-md" : "border-border bg-card"
      }`}
    >
      {pkg.featured && (
        <span className="absolute -top-3 left-8 bg-primary text-primary-foreground text-xs font-medium uppercase tracking-wider px-4 py-1 rounded-sm">
          {siteConfig.packages.featured[locale]}
        </span>
      )}

      <p className="text-sm uppercase tracking-[0.15em] text-primary font-medium">
        {pkg.duration[locale]}
      </p>
      <h3 className="font-serif text-2xl md:text-3xl text-foreground mt-2">
        {pkg.name[locale]}
      </h3>
      <p className="text-muted-foreground mt-3 leading-relaxed text-sm flex-grow">
        {pkg.description[locale]}
      </p>

      <div className="mt-6 mb-6">
        <span className="font-serif text-3xl text-foreground">{pkg.price}</span>
        <span className="text-muted-foreground text-sm ml-2">{siteConfig.packages.perPerson[locale]}</span>
      </div>

      <ul className="flex flex-col gap-3 mb-8">
        {pkg.includes[locale].map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
            <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className={`mt-auto inline-flex items-center justify-center py-3 px-6 text-sm font-medium tracking-wide rounded-sm transition-colors ${
          pkg.featured
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "border border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        }`}
      >
        {siteConfig.packages.cta[locale]}
      </a>
    </div>
  )
}

export function Packages({ locale }: { locale: Locale }) {
  return (
    <section id="packages" className="py-24 md:py-32 bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3">
            {siteConfig.packages.label[locale]}
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground text-balance">
            {siteConfig.packages.heading[locale]}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {siteConfig.packages.sub[locale]}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {siteConfig.packages.items.map((pkg) => (
            <PackageCard key={pkg.name.es} pkg={pkg} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  )
}
