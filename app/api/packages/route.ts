import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const packages = await prisma.package.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(packages)
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener paquetes' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

    const body = await req.json()
    const pkg = await prisma.package.create({ data: body })
    return NextResponse.json(pkg, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear paquete' }, { status: 500 })
  }
}
