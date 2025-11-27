"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import BookingModal from "@/components/BookingModal";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessType: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación básica: campos no vacíos
    if (!formData.name.trim() || !formData.email.trim() || !formData.businessType) {
      return;
    }

    setIsSubmitting(true);

    try {
      // POST al webhook de n8n
      const response = await fetch(process.env.NEXT_PUBLIC_N8N_BOOKING, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre: formData.name,
          email: formData.email,
          tipoNegocio: formData.businessType,
          fecha: new Date().toISOString()
        })
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", businessType: "" });

        // Reset success message after 5 seconds
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      // En caso de error, igual mostramos el mensaje de éxito para UX
      setSubmitted(true);
      setFormData({ name: "", email: "", businessType: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="py-24 px-4 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-violet to-cyan opacity-10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16">

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Comencemos <span className="text-violet">Juntos</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-violet to-cyan mx-auto mb-8 rounded-full" />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            ¿Listo para transformar tu negocio con IA? Solicitá tu demo gratis hoy.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}>

            <Card className="bg-card border border-violet/20 shadow-2xl shadow-violet/10">
              <CardHeader>
                <CardTitle className="text-2xl">Solicitá tu Demo</CardTitle>
                <CardDescription>
                  Completá el formulario y te responderemos en menos de 24 horas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre Completo</Label>
                    <Input
                      id="name"
                      placeholder="Juan Pérez"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="border-violet/30 focus:border-violet" />

                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="juan@empresa.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="border-violet/30 focus:border-violet" />

                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessType">Tipo de Negocio</Label>
                    <Select
                      value={formData.businessType}
                      onValueChange={(value) => setFormData({ ...formData, businessType: value })}
                      required>

                      <SelectTrigger className="border-violet/30 focus:border-violet">
                        <SelectValue placeholder="Seleccioná tu industria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="healthcare">Salud</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                        <SelectItem value="services">Servicios Profesionales</SelectItem>
                        <SelectItem value="realestate">Inmobiliaria</SelectItem>
                        <SelectItem value="education">Educación</SelectItem>
                        <SelectItem value="government">Gobierno</SelectItem>
                        <SelectItem value="other">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-violet to-cyan hover:from-violet-dark hover:to-cyan-dark transition-all duration-300 shadow-lg shadow-violet/50 hover:shadow-xl hover:shadow-violet/60"
                    disabled={isSubmitting}>

                    {isSubmitting ?
                    "Enviando..." :
                    submitted ?
                    "¡Recibido! Nos pondremos en contacto" :

                    <>
                        <Send className="w-4 h-4 mr-2" />
                        Solicitar Demo
                      </>
                    }
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8">

            <div>
              <h3 className="text-2xl font-bold mb-6">Contactanos</h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                ¿Tenés preguntas? Estamos acá para ayudarte. Comunicate con nosotros a través de cualquiera
                de estos canales y nuestro equipo responderá rápidamente.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-violet/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-violet/20 transition-colors duration-300">
                  <Mail className="w-6 h-6 text-violet" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <a
                    href="mailto:contact@jelyia.com"
                    className="text-muted-foreground hover:text-violet transition-colors !whitespace-pre-line !whitespace-pre-line">jurjely@jelyia.com


                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-cyan/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-cyan/20 transition-colors duration-300">
                  <Phone className="w-6 h-6 text-cyan" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Teléfono</h4>
                  <a
                    href="tel:+543764000000"
                    className="text-muted-foreground hover:text-cyan transition-colors !whitespace-pre-line">+54 3755 249369


                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-violet/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-violet/20 transition-colors duration-300">
                  <MapPin className="w-6 h-6 text-violet" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Ubicación</h4>
                  <p className="text-muted-foreground">
                    Oberá, Misiones
                    <br />
                    Argentina
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Box */}
            <Card className="bg-gradient-to-br from-violet/10 to-cyan/10 border-violet/30 mt-8">
              <CardContent className="p-6">
                <h4 className="text-xl font-bold mb-2">¿Listo para Automatizar?</h4>
                <p className="text-muted-foreground mb-4 !whitespace-pre-line">Sumate a más de 2000 integraciones que ya están transformando empresas con JELYIA.

                </p>
                <Button
                  variant="outline"
                  className="w-full border-violet hover:bg-violet hover:text-white transition-all duration-300"
                  onClick={() => setIsModalOpen(true)}>

                  Agendar una Llamada
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </section>);

}
