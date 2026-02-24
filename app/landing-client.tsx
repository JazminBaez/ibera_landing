"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { ConservationBanner } from "@/components/conservation-banner"
import { PackagesDynamic } from "@/components/packages-dynamic"
import { GalleryDynamic } from "@/components/gallery-dynamic"
import { IberaMap } from "@/components/ibera-map"
import { TravelTips } from "@/components/travel-tips"
import { HotelsDynamic } from "@/components/hotels-dynamic"
import { ReviewsDynamic } from "@/components/reviews-dynamic"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import type { Locale } from "@/components/language-switcher"

interface Props {
  packages: any[]
  reviews: any[]
  hotels: any[]
  recommendations: any[]
  galleryImages: any[]
}

export function LandingClient({ packages, reviews, hotels, recommendations, galleryImages }: Props) {
  const [locale, setLocale] = useState<Locale>("es")

  return (
    <main>
      <Navbar locale={locale} onLocaleChange={setLocale} />
      <Hero locale={locale} />
      <About locale={locale} />
      <ConservationBanner locale={locale} />
      {packages.length > 0 && <PackagesDynamic locale={locale} packages={packages} />}
      {galleryImages.length > 0 && <GalleryDynamic locale={locale} images={galleryImages} />}
      <IberaMap locale={locale} />
      <TravelTips locale={locale} />
      {hotels.length > 0 && <HotelsDynamic locale={locale} hotels={hotels} />}
      {reviews.length > 0 && <ReviewsDynamic locale={locale} reviews={reviews} />}
      <Contact locale={locale} />
      <Footer locale={locale} />
    </main>
  )
}
