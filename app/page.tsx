import { prisma } from '@/lib/prisma'
import { LandingClient } from './landing-client'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const [packages, reviews, hotels, recommendations, galleryImages] = await Promise.all([
    prisma.package.findMany({ where: { active: true }, orderBy: { order: 'asc' } }),
    prisma.review.findMany({ where: { active: true }, orderBy: { order: 'asc' } }),
    prisma.hotel.findMany({ where: { active: true }, orderBy: { order: 'asc' } }),
    prisma.recommendation.findMany({ where: { active: true }, orderBy: { order: 'asc' } }),
    prisma.galleryImage.findMany({ where: { active: true }, orderBy: { order: 'asc' } }),
  ])

  return (
    <LandingClient
      packages={JSON.parse(JSON.stringify(packages))}
      reviews={JSON.parse(JSON.stringify(reviews))}
      hotels={JSON.parse(JSON.stringify(hotels))}
      recommendations={JSON.parse(JSON.stringify(recommendations))}
      galleryImages={JSON.parse(JSON.stringify(galleryImages))}
    />
  )
}
