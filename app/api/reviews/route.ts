import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(reviews)
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener reseñas' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

    const body = await req.json()
    const review = await prisma.review.create({ data: body })
    return NextResponse.json(review, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear reseña' }, { status: 500 })
  }
}
