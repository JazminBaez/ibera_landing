import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const images = await prisma.galleryImage.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(images)
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener imágenes' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

    const body = await req.json()
    const image = await prisma.galleryImage.create({ data: body })
    return NextResponse.json(image, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear imagen' }, { status: 500 })
  }
}
