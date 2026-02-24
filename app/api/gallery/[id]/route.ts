import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const image = await prisma.galleryImage.findUnique({ where: { id } })
    if (!image) return NextResponse.json({ error: 'Imagen no encontrada' }, { status: 404 })
    return NextResponse.json(image)
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener imagen' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

    const { id } = await params
    const body = await req.json()
    const image = await prisma.galleryImage.update({ where: { id }, data: body })
    return NextResponse.json(image)
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar imagen' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

    const { id } = await params
    await prisma.galleryImage.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar imagen' }, { status: 500 })
  }
}
