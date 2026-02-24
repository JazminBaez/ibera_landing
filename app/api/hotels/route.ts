import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const hotels = await prisma.hotel.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(hotels)
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener hospedajes' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

    const body = await req.json()
    const hotel = await prisma.hotel.create({ data: body })
    return NextResponse.json(hotel, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear hospedaje' }, { status: 500 })
  }
}
