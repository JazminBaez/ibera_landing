import { Star } from "lucide-react"
import type { Locale } from "./language-switcher"

interface ReviewFromDB {
  id: string
  name: string
  location: string
  textEs: string
  textEn: string
  textPt: string
  rating: number
}

const sectionText = {
  label: { es: "Testimonios", en: "Testimonials", pt: "Depoimentos" },
  heading: {
    es: "Lo que dicen quienes vivieron la experiencia",
    en: "What those who lived the experience say",
    pt: "O que dizem aqueles que viveram a experiência",
  },
}

function getText(review: ReviewFromDB, locale: Locale) {
  return locale === 'en' ? review.textEn : locale === 'pt' ? review.textPt : review.textEs
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "text-accent fill-accent" : "text-border"}`}
        />
      ))}
    </div>
  )
}

export function ReviewsDynamic({ locale, reviews }: { locale: Locale; reviews: ReviewFromDB[] }) {
  return (
    <section id="reviews" className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3">
            {sectionText.label[locale]}
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground text-balance">
            {sectionText.heading[locale]}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-card border border-border rounded-sm p-8 flex flex-col">
              <StarRating rating={review.rating} />
              <blockquote className="mt-5 text-muted-foreground leading-relaxed flex-grow">
                &ldquo;{getText(review, locale)}&rdquo;
              </blockquote>
              <div className="mt-6 pt-6 border-t border-border">
                <p className="font-medium text-foreground">{review.name}</p>
                <p className="text-sm text-muted-foreground">{review.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
