"use client"

import Image from "next/image"
import { useState } from "react"
import { X } from "lucide-react"
import type { Locale } from "./language-switcher"

interface GalleryImageFromDB {
  id: string
  imageUrl: string
  altText: string
  span: string
}

const sectionText = {
  label: { es: "Galería", en: "Gallery", pt: "Galeria" },
  heading: {
    es: "Imágenes que hablan por sí solas",
    en: "Images that speak for themselves",
    pt: "Imagens que falam por si só",
  },
  sub: {
    es: "Paisajes, fauna y momentos únicos capturados durante nuestras experiencias en los Esteros del Iberá.",
    en: "Landscapes, wildlife, and unique moments captured during our experiences in the Iberá Wetlands.",
    pt: "Paisagens, fauna e momentos únicos capturados durante nossas experiências nos Esteros del Iberá.",
  },
}

export function GalleryDynamic({ locale, images }: { locale: Locale; images: GalleryImageFromDB[] }) {
  const [selectedImage, setSelectedImage] = useState<GalleryImageFromDB | null>(null)

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
                key={image.id}
                onClick={() => setSelectedImage(image)}
                className={`relative aspect-square overflow-hidden rounded-sm group cursor-pointer ${image.span}`}
                aria-label={`Ver imagen: ${image.altText}`}
              >
                <Image
                  src={image.imageUrl}
                  alt={image.altText}
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
              src={selectedImage.imageUrl}
              alt={selectedImage.altText}
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
