"use client";

import { Facebook, Instagram, Linkedin, Twitter, Mail } from "lucide-react";

const footerLinks = {
  Empresa: [
  { name: "Nosotros", href: "#about" },
  { name: "Servicios", href: "#services" },
  { name: "Casos de Éxito", href: "#case-studies" },
  { name: "Contacto", href: "#contact" }],

  Servicios: [
  { name: "Bots de WhatsApp", href: "#services" },
  { name: "Reportes con IA", href: "#services" },
  { name: "Automatización de Ventas", href: "#services" },
  { name: "Dashboards", href: "#services" }],

  Recursos: [
  { name: "Blog", href: "#" },
  { name: "Documentación", href: "#" },
  { name: "FAQ", href: "#" },
  { name: "Soporte", href: "#" }]

};

const socialLinks = [
{ icon: Facebook, href: "#", label: "Facebook" },
{ icon: Instagram, href: "https://www.instagram.com/franco_jurjely/", label: "Instagram" },
{ icon: Linkedin, href: "https://www.linkedin.com/in/franco-jurjely-79a2a0298/", label: "LinkedIn" }];


export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <a href="#" className="text-3xl font-bold inline-block mb-4">
              <span className="bg-gradient-to-r from-violet to-cyan bg-clip-text text-transparent !whitespace-pre-line">JELY

              </span>
              <span className="text-foreground">IA</span>
            </a>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Construyendo sistemas inteligentes de automatización que transforman la forma en que operan los negocios.
              Potenciado por IA, diseñado para el crecimiento.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-violet/10 hover:bg-violet/20 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110">

                    <Icon className="w-5 h-5 text-violet" />
                  </a>);

              })}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) =>
          <div key={category}>
              <h3 className="font-semibold text-foreground mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) =>
              <li key={link.name}>
                    <a
                  href={link.href}
                  className="text-muted-foreground hover:text-violet transition-colors duration-300">

                      {link.name}
                    </a>
                  </li>
              )}
              </ul>
            </div>
          )}
        </div>

        {/* Newsletter */}
        <div className="bg-gradient-to-r from-violet/10 to-cyan/10 rounded-2xl p-8 mb-12 border border-violet/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-violet rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Mantente Actualizado</h3>
                <p className="text-muted-foreground">
                  Recibí los últimos consejos de automatización e insights de IA
                </p>
              </div>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Ingresá tu email"
                className="flex-1 md:w-64 px-4 py-3 rounded-xl bg-background border border-border focus:border-violet focus:outline-none" />

              <button className="px-6 py-3 bg-gradient-to-r from-violet to-cyan hover:from-violet-dark hover:to-cyan-dark rounded-xl text-white font-medium transition-all duration-300 shadow-lg shadow-violet/30 hover:shadow-xl hover:shadow-violet/40">
                Suscribirse
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} jelyIA. Todos los derechos reservados. Fundada por Franco
            Jurjely Nicolás.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-violet transition-colors">
              Política de Privacidad
            </a>
            <a href="#" className="text-muted-foreground hover:text-violet transition-colors">
              Términos de Servicio
            </a>
            <a href="#" className="text-muted-foreground hover:text-violet transition-colors">
              Política de Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>);

}