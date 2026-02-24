"use client"

import { useState, type FormEvent } from "react"
import { Send, MessageCircle, Mail, MapPin } from "lucide-react"
import type { Locale } from "./language-switcher"
import { siteConfig } from "@/lib/site-config"

export function Contact({ locale }: { locale: Locale }) {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="py-24 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3">
            {siteConfig.contact.label[locale]}
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground text-balance">
            {siteConfig.contact.heading[locale]}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {siteConfig.contact.sub[locale]}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">{siteConfig.contact.emailLabel[locale]}</h3>
                <p className="text-sm text-muted-foreground">{siteConfig.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">{siteConfig.contact.whatsappLabel[locale]}</h3>
                <p className="text-sm text-muted-foreground">{siteConfig.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">{siteConfig.contact.locationLabel[locale]}</h3>
                <p className="text-sm text-muted-foreground">{siteConfig.location}</p>
              </div>
            </div>

            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center gap-3 bg-whatsapp text-white px-8 py-3.5 rounded-sm text-sm font-medium tracking-wide hover:bg-whatsapp-hover transition-colors"
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>{siteConfig.contact.waCta[locale]}</span>
            </a>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="bg-primary/5 border border-primary/20 rounded-sm p-12 text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Send className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-serif text-2xl text-foreground mb-2">{siteConfig.contact.success.title[locale]}</h3>
                <p className="text-muted-foreground">{siteConfig.contact.success.message[locale]}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      {siteConfig.contact.form.name[locale]}
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder={siteConfig.contact.form.namePh[locale]}
                      className="w-full px-4 py-3 bg-background border border-input rounded-sm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      {siteConfig.contact.form.email[locale]}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="tu@email.com"
                      className="w-full px-4 py-3 bg-background border border-input rounded-sm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="package" className="block text-sm font-medium text-foreground mb-2">
                    {siteConfig.contact.form.package[locale]}
                  </label>
                  <select
                    id="package"
                    name="package"
                    className="w-full px-4 py-3 bg-background border border-input rounded-sm text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
                  >
                    <option value="">{siteConfig.contact.form.packagePh[locale]}</option>
                    <option value="esencia">{siteConfig.packages.items[0].name[locale]}</option>
                    <option value="inmersion">{siteConfig.packages.items[1].name[locale]}</option>
                    <option value="expedicion">{siteConfig.packages.items[2].name[locale]}</option>
                    <option value="custom">{locale === "es" ? "Itinerario a medida" : locale === "en" ? "Custom itinerary" : "Roteiro personalizado"}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="dates" className="block text-sm font-medium text-foreground mb-2">
                    {siteConfig.contact.form.dates[locale]}
                  </label>
                  <input
                    id="dates"
                    name="dates"
                    type="text"
                    placeholder={siteConfig.contact.form.datesPh[locale]}
                    className="w-full px-4 py-3 bg-background border border-input rounded-sm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    {siteConfig.contact.form.message[locale]}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    placeholder={siteConfig.contact.form.messagePh[locale]}
                    className="w-full px-4 py-3 bg-background border border-input rounded-sm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="self-start inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 text-sm font-medium tracking-wide rounded-sm hover:bg-primary/90 transition-colors"
                >
                  <Send className="h-4 w-4" />
                  <span>{siteConfig.contact.form.submit[locale]}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
