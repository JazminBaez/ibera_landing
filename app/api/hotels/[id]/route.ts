import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const hotel = await prisma.hotel.findUnique({ where: { id } })
    if (!hotel) return NextResponse.json({ error: 'Hospedaje no encontrado' }, { status: 404 })
    return NextResponse.json(hotel)
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener hospedaje' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

    const { id } = await params
    const body = await req.json()
    const hotel = await prisma.hotel.update({ where: { id }, data: body })
    return NextResponse.json(hotel)
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar hospedaje' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

    const { id } = await params
    await prisma.hotel.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar hospedaje' }, { status: 500 })
  }
}
