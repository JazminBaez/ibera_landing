import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const recommendations = await prisma.recommendation.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(recommendations)
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener recomendaciones' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

    const body = await req.json()
    const recommendation = await prisma.recommendation.create({ data: body })
    return NextResponse.json(recommendation, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear recomendación' }, { status: 500 })
  }
}
