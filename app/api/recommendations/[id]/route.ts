import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const recommendation = await prisma.recommendation.findUnique({ where: { id } })
    if (!recommendation) return NextResponse.json({ error: 'Recomendación no encontrada' }, { status: 404 })
    return NextResponse.json(recommendation)
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener recomendación' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

    const { id } = await params
    const body = await req.json()
    const recommendation = await prisma.recommendation.update({ where: { id }, data: body })
    return NextResponse.json(recommendation)
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar recomendación' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

    const { id } = await params
    await prisma.recommendation.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar recomendación' }, { status: 500 })
  }
}
