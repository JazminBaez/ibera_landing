import { Leaf } from "lucide-react"
import type { Locale } from "./language-switcher"
import { siteConfig } from "@/lib/site-config"

export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="bg-foreground text-background/70 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="h-5 w-5 text-primary-foreground" />
              <span className="font-serif text-lg text-background">{siteConfig.name}</span>
            </div>
            <p className="text-sm leading-relaxed text-background/50">
              {siteConfig.footer.tagline[locale]}
            </p>
            <div className="flex gap-4 mt-6">
              {siteConfig.footer.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-background/40 hover:text-background/80 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-background uppercase tracking-wider mb-4">
              {siteConfig.footer.navLabel[locale]}
            </h4>
            <ul className="flex flex-col gap-2">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-background/50 hover:text-background/80 transition-colors">
                    {link.label[locale]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium text-background uppercase tracking-wider mb-4">
              {siteConfig.footer.commitmentLabel[locale]}
            </h4>
            <p className="text-sm leading-relaxed text-background/50">
              {siteConfig.footer.commitmentText[locale]}
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/40">
            &copy; {new Date().getFullYear()} {siteConfig.companyName} &mdash; {siteConfig.footer.rights[locale]}
          </p>
          <p className="text-xs text-background/40">
            {siteConfig.location}
          </p>
        </div>
      </div>
    </footer>
  )
}
