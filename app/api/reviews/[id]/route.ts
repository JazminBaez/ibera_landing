import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const review = await prisma.review.findUnique({ where: { id } })
    if (!review) return NextResponse.json({ error: 'Reseña no encontrada' }, { status: 404 })
    return NextResponse.json(review)
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener reseña' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

    const { id } = await params
    const body = await req.json()
    const review = await prisma.review.update({ where: { id }, data: body })
    return NextResponse.json(review)
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar reseña' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

    const { id } = await params
    await prisma.review.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar reseña' }, { status: 500 })
  }
}
