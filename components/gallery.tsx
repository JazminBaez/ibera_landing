"use client"

import Image from "next/image"
import { useState } from "react"
import { X } from "lucide-react"
import type { Locale } from "./language-switcher"

interface GalleryImage {
  src: string
  alt: string
  span: string
}

const images: GalleryImage[] = [
  { src: "/images/gallery-sunset.jpg", alt: "Atardecer sobre los Esteros del Ibera", span: "md:col-span-2 md:row-span-2" },
  { src: "/images/gallery-capybara.jpg", alt: "Familia de carpinchos en los Esteros del Ibera", span: "" },
  { src: "/images/gallery-birds.jpg", alt: "Aves en los humedales del Ibera al amanecer", span: "" },
  { src: "/images/gallery-boat.jpg", alt: "Navegacion guiada por los canales de los Esteros", span: "md:col-span-2" },
  { src: "/images/gallery-caiman.jpg", alt: "Yacare en su habitat natural en Ibera", span: "" },
  { src: "/images/gallery-deer.jpg", alt: "Ciervo de los pantanos en los Esteros del Ibera", span: "" },
]

const sectionText = {
  label: { es: "Galeria", en: "Gallery", pt: "Galeria" },
  heading: {
    es: "Imagenes que hablan por si solas",
    en: "Images that speak for themselves",
    pt: "Imagens que falam por si so",
  },
  sub: {
    es: "Paisajes, fauna y momentos unicos capturados durante nuestras experiencias en los Esteros del Ibera.",
    en: "Landscapes, wildlife, and unique moments captured during our experiences in the Ibera Wetlands.",
    pt: "Paisagens, fauna e momentos unicos capturados durante nossas experiencias nos Esteros del Ibera.",
  },
}

export function Gallery({ locale }: { locale: Locale }) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  return (
    <>
      <section id="gallery" className="py-24 md:py-32 bg-background">
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {images.map((image) => (
              <button
                key={image.src}
                onClick={() => setSelectedImage(image)}
                className={`relative aspect-square overflow-hidden rounded-sm group cursor-pointer ${image.span}`}
                aria-label={`Ver imagen: ${image.alt}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-label="Imagen ampliada"
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors z-10"
            aria-label="Cerrar imagen"
          >
            <X className="h-8 w-8" />
          </button>
          <div className="relative max-w-5xl max-h-[85vh] w-full h-full">
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </>
  )
}
