import { Check } from "lucide-react"
import type { Locale } from "./language-switcher"

interface PackageFromDB {
  id: string
  nameEs: string
  nameEn: string
  namePt: string
  durationEs: string
  durationEn: string
  durationPt: string
  price: string
  descriptionEs: string
  descriptionEn: string
  descriptionPt: string
  includesEs: string[]
  includesEn: string[]
  includesPt: string[]
  featured: boolean
}

const sectionText = {
  label: { es: "Experiencias", en: "Experiences", pt: "Experiencias" },
  heading: {
    es: "Elegí la experiencia que mejor se adapte a vos",
    en: "Choose the experience that suits you best",
    pt: "Escolha a experiência que melhor se adapta a você",
  },
  sub: {
    es: "Cada paquete está diseñado para ofrecer una conexión genuina con los Esteros del Iberá, respetando el entorno natural y las comunidades locales.",
    en: "Each package is designed to offer a genuine connection with the Iberá Wetlands, respecting the natural environment and local communities.",
    pt: "Cada pacote foi projetado para oferecer uma conexão genuína com os Esteros del Iberá, respeitando o ambiente natural e as comunidades locais.",
  },
  featured: { es: "Más elegido", en: "Most popular", pt: "Mais escolhido" },
  cta: { es: "Reservar Ahora", en: "Book Now", pt: "Reservar Agora" },
  perPerson: { es: "ARS / persona", en: "ARS / person", pt: "ARS / pessoa" },
}

function getName(pkg: PackageFromDB, locale: Locale) {
  return locale === 'en' ? pkg.nameEn : locale === 'pt' ? pkg.namePt : pkg.nameEs
}
function getDuration(pkg: PackageFromDB, locale: Locale) {
  return locale === 'en' ? pkg.durationEn : locale === 'pt' ? pkg.durationPt : pkg.durationEs
}
function getDescription(pkg: PackageFromDB, locale: Locale) {
  return locale === 'en' ? pkg.descriptionEn : locale === 'pt' ? pkg.descriptionPt : pkg.descriptionEs
}
function getIncludes(pkg: PackageFromDB, locale: Locale) {
  return locale === 'en' ? pkg.includesEn : locale === 'pt' ? pkg.includesPt : pkg.includesEs
}

function PackageCard({ pkg, locale }: { pkg: PackageFromDB; locale: Locale }) {
  return (
    <div
      className={`relative flex flex-col rounded-sm border p-8 transition-shadow hover:shadow-lg ${
        pkg.featured ? "border-primary bg-card shadow-md" : "border-border bg-card"
      }`}
    >
      {pkg.featured && (
        <span className="absolute -top-3 left-8 bg-primary text-primary-foreground text-xs font-medium uppercase tracking-wider px-4 py-1 rounded-sm">
          {sectionText.featured[locale]}
        </span>
      )}

      <p className="text-sm uppercase tracking-[0.15em] text-primary font-medium">
        {getDuration(pkg, locale)}
      </p>
      <h3 className="font-serif text-2xl md:text-3xl text-foreground mt-2">
        {getName(pkg, locale)}
      </h3>
      <p className="text-muted-foreground mt-3 leading-relaxed text-sm flex-grow">
        {getDescription(pkg, locale)}
      </p>

      <div className="mt-6 mb-6">
        <span className="font-serif text-3xl text-foreground">{pkg.price}</span>
        <span className="text-muted-foreground text-sm ml-2">{sectionText.perPerson[locale]}</span>
      </div>

      <ul className="flex flex-col gap-3 mb-8">
        {getIncludes(pkg, locale).map((item) => (
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
        {sectionText.cta[locale]}
      </a>
    </div>
  )
}

export function PackagesDynamic({ locale, packages }: { locale: Locale; packages: PackageFromDB[] }) {
  return (
    <section id="packages" className="py-24 md:py-32 bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3">
            {sectionText.label[locale]}
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground text-balance">
            {sectionText.heading[locale]}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {sectionText.sub[locale]}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  )
}
