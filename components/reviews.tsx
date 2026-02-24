import { Star } from "lucide-react"
import type { Locale } from "./language-switcher"
import { siteConfig } from "@/lib/site-config"

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

export function Reviews({ locale }: { locale: Locale }) {
  return (
    <section id="reviews" className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3">
            {siteConfig.reviews.label[locale]}
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground text-balance">
            {siteConfig.reviews.heading[locale]}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {siteConfig.reviews.items.map((review) => (
            <div key={review.name} className="bg-card border border-border rounded-sm p-8 flex flex-col">
              <StarRating rating={review.rating} />
              <blockquote className="mt-5 text-muted-foreground leading-relaxed flex-grow">
                &ldquo;{review.text[locale]}&rdquo;
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
