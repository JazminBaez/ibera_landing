import { prisma } from '@/lib/prisma'
import { Package, Star, Building2, Compass, ImageIcon } from 'lucide-react'

async function getStats() {
  const [packages, reviews, hotels, recommendations, gallery] = await Promise.all([
    prisma.package.count({ where: { active: true } }),
    prisma.review.count({ where: { active: true } }),
    prisma.hotel.count({ where: { active: true } }),
    prisma.recommendation.count({ where: { active: true } }),
    prisma.galleryImage.count({ where: { active: true } }),
  ])
  return { packages, reviews, hotels, recommendations, gallery }
}

export default async function DashboardPage() {
  const stats = await getStats()

  const cards = [
    { label: 'Paquetes Turísticos', count: stats.packages, icon: Package, href: '/dashboard/packages', color: 'bg-emerald-500/10 text-emerald-600' },
    { label: 'Reseñas', count: stats.reviews, icon: Star, href: '/dashboard/reviews', color: 'bg-amber-500/10 text-amber-600' },
    { label: 'Hospedajes', count: stats.hotels, icon: Building2, href: '/dashboard/hotels', color: 'bg-blue-500/10 text-blue-600' },
    { label: 'Recomendaciones', count: stats.recommendations, icon: Compass, href: '/dashboard/recommendations', color: 'bg-purple-500/10 text-purple-600' },
    { label: 'Galería', count: stats.gallery, icon: ImageIcon, href: '/dashboard/gallery', color: 'bg-rose-500/10 text-rose-600' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl text-foreground">Panel de Administración</h1>
        <p className="mt-2 text-muted-foreground">Gestiona todo el contenido de tu sitio web desde aquí.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <a
              key={card.href}
              href={card.href}
              className="group bg-card border border-border rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:border-primary/30"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${card.color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-3xl font-semibold text-foreground">{card.count}</p>
              <p className="text-sm text-muted-foreground mt-1">{card.label}</p>
            </a>
          )
        })}
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="font-serif text-xl text-foreground mb-4">Bienvenido</h2>
        <p className="text-muted-foreground leading-relaxed">
          Desde este panel podes administrar todo el contenido visible en la landing page de Esteros del Iberá.
          Utiliza el menú lateral para navegar entre las diferentes secciones y gestionar paquetes turísticos,
          reseñas de clientes, alojamientos recomendados, recomendaciones de viaje y la galería de imágenes.
        </p>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-secondary/50">
            <h3 className="font-medium text-foreground text-sm">📦 Paquetes</h3>
            <p className="text-xs text-muted-foreground mt-1">Crea y edita paquetes turísticos con precios, duración e inclusiones multi-idioma.</p>
          </div>
          <div className="p-4 rounded-lg bg-secondary/50">
            <h3 className="font-medium text-foreground text-sm">⭐ Reseñas</h3>
            <p className="text-xs text-muted-foreground mt-1">Administra testimonios de clientes que aparecen en la sección de reseñas.</p>
          </div>
          <div className="p-4 rounded-lg bg-secondary/50">
            <h3 className="font-medium text-foreground text-sm">🏨 Hospedajes</h3>
            <p className="text-xs text-muted-foreground mt-1">Gestiona alojamientos recomendados con imágenes y descripciones.</p>
          </div>
          <div className="p-4 rounded-lg bg-secondary/50">
            <h3 className="font-medium text-foreground text-sm">🧭 Recomendaciones</h3>
            <p className="text-xs text-muted-foreground mt-1">Tips de viaje y recomendaciones para los visitantes.</p>
          </div>
          <div className="p-4 rounded-lg bg-secondary/50">
            <h3 className="font-medium text-foreground text-sm">🖼️ Galería</h3>
            <p className="text-xs text-muted-foreground mt-1">Sube y organiza fotos para la galería de la landing page.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
