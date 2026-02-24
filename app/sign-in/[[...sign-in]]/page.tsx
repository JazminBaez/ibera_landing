'use client'

import { SignIn } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Background Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src="/images/hero-wetlands.jpg"
          alt="Esteros del Iberá"
          fill
          className="object-cover"
          priority
          sizes="50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/70" />
        <div className="relative z-10 flex flex-col justify-between p-12">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm">
              <ArrowLeft className="h-4 w-4" />
              <span>Volver al sitio</span>
            </Link>
          </div>
          <div>
            <h1 className="font-serif text-4xl xl:text-5xl text-white leading-tight max-w-lg text-balance">
              Panel de Administración
            </h1>
            <p className="mt-4 text-white/70 text-lg max-w-md leading-relaxed">
              Gestiona las experiencias, galería, reseñas y todo el contenido de tu sitio desde un solo lugar.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <div className="w-12 h-[1px] bg-white/30" />
              <p className="text-white/50 text-sm tracking-wider uppercase">Esteros del Iberá</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Sign In Form */}
      <div className="flex-1 flex items-center justify-center bg-background p-6">
        <div className="w-full max-w-md">
          {/* Mobile header */}
          <div className="lg:hidden mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm mb-6">
              <ArrowLeft className="h-4 w-4" />
              <span>Volver al sitio</span>
            </Link>
            <h1 className="font-serif text-3xl text-foreground">Panel de Administración</h1>
            <p className="mt-2 text-muted-foreground">Inicia sesión para acceder al dashboard</p>
          </div>

          <div className="flex justify-center">
            <SignIn
              appearance={{
                elements: {
                  rootBox: 'w-full',
                  cardBox: 'w-full shadow-none',
                  card: 'w-full shadow-none border border-border rounded-lg p-0',
                  headerTitle: 'font-serif text-2xl',
                  headerSubtitle: 'text-muted-foreground',
                  formButtonPrimary: 'bg-primary hover:bg-primary/90 text-primary-foreground rounded-sm text-sm font-medium tracking-wide',
                  formFieldInput: 'rounded-sm border-border focus:ring-primary',
                  footerAction: 'hidden',
                  footer: 'hidden',
                },
              }}
              forceRedirectUrl="/dashboard"
              signUpUrl={undefined}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
