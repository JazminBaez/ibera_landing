import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const pkg = await prisma.package.findUnique({ where: { id } })
    if (!pkg) return NextResponse.json({ error: 'Paquete no encontrado' }, { status: 404 })
    return NextResponse.json(pkg)
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener paquete' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

    const { id } = await params
    const body = await req.json()
    const pkg = await prisma.package.update({ where: { id }, data: body })
    return NextResponse.json(pkg)
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar paquete' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

    const { id } = await params
    await prisma.package.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar paquete' }, { status: 500 })
  }
}
