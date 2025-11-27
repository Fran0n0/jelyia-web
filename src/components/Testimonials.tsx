"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "María González",
    role: "Propietaria, Clínica Dental Santa Fe",
    content:
      "jelyIA transformó nuestro sistema de turnos. Pasamos de gestionar todo manualmente a tener un asistente con IA que maneja reservas, recordatorios y seguimientos. ¡Nuestra tasa de ausencias bajó un 80%!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
  },
  {
    name: "Carlos Méndez",
    role: "Gerente, TechFix Reparaciones",
    content:
      "El sistema de automatización nos ahorró más de 15 horas semanales en tareas administrativas. Ahora nos enfocamos en nuestros clientes mientras la IA gestiona inventario, facturación y comunicaciones.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
  },
  {
    name: "Ana Rodríguez",
    role: "Directora de Servicios Digitales, Ciudad de Oberá",
    content:
      "El asistente digital revolucionó la forma en que los ciudadanos interactúan con nuestros servicios. Atendemos más de 10,000 personas mensualmente con respuestas instantáneas y disponibilidad 24/7. ¡Realmente impresionante!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
  },
  {
    name: "Roberto Silva",
    role: "CEO, Silva Ventures",
    content:
      "Nuestro proceso de ventas ahora está completamente automatizado. Desde la captura del lead hasta el cierre, el sistema de jelyIA maneja todo. Vimos un aumento del 200% en conversiones y nuestro equipo es más productivo que nunca.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="testimonials" ref={ref} className="py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Lo Que Dicen Nuestros <span className="text-cyan">Clientes</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-violet to-cyan mx-auto mb-8 rounded-full" />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Confianza de empresas de todas las industrias para automatizar y escalar
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group h-full bg-card border border-border hover:border-violet/50 transition-all duration-500 hover:shadow-2xl hover:shadow-violet/20 relative overflow-hidden">
                {/* Quote icon background */}
                <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  <Quote className="w-24 h-24 text-violet" />
                </div>

                <CardContent className="p-8 relative z-10">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-violet text-violet" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-foreground leading-relaxed mb-6 text-lg">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-violet to-cyan rounded-full opacity-50 blur-md" />
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="relative w-14 h-14 rounded-full object-cover border-2 border-violet/30"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}