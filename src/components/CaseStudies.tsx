"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

const caseStudies = [
{
  title: "Sistema de IA para Clínica Dental",
  industry: "Salud",
  description:
  "Implementamos un sistema inteligente a WhatsApp + Evolution API para comunicación directa. Realiza lo siguiente: Gestión automática de citas, reprogramaciones y confirmaciones, Base de datos interna para registrar cada interacción, Un flujo de seguimiento inteligente que vuelve a contactar al paciente automáticamente a los 3, 7 y 15 días después de su consulta o tratamiento..",
  results: [
  "80% de reducción en turnos perdidos",
  "Proceso de reserva 3x más rápido",
  "95% de satisfacción de pacientes"],

  image: "/img/instituto-dental.jpg"
},
{
  title: "Automatización para Reparación de PCs",
  industry: "Retail",
  description:
  "Construimos una automatización completa de CRM con seguimiento de inventario, notificaciones a clientes y facturación automática.",
  results: [
  "60% de tiempo ahorrado en tareas administrativas",
  "40% de aumento en clientes recurrentes",
  "Gestión de inventario en tiempo real"],

  image: "/img/origenpc.jpg"
},
{
  title: "IA Institucional de educación privada",
  industry: "Educación",
  description:
  "El instituto IPET 1308 necesitaba responder consultas sobre carreras, inscripciones y stock de vacantes. El volumen crecia cada año y los administrativos no daban a basto.                                                                                      LA SOLUCION: El desarrollo de una IA con funcionamiento 24/7, RAG conenctado a documentos internos, respuestas oficiales verificadas, Orquestador de consultas con n8n y Postgres, integracions con whatsapp para atención inmediata",
  results: [
  "Reduccion drámatica de consultas repetidas",
  "Los administrativos recuperaron horas para tareas internas.",
  "Soporte multilingüe 24/7"],

  image: "/img/ipet.jpg"
}];


export default function CaseStudies() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="case-studies" ref={ref} className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16">

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Historias de <span className="text-violet">Éxito</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-violet to-cyan mx-auto mb-8 rounded-full" />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto !whitespace-pre-line">Resultados reales de empresas que se transformaron con JELYIA

          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) =>
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}>

              <Card className="group h-full bg-card border border-border hover:border-cyan/50 transition-all duration-500 overflow-hidden hover:shadow-2xl hover:shadow-cyan/20">
                {/* Image with overlay */}
                <div className="relative h-48 overflow-hidden">
                  <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${study.image})` }} />

                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent !bg-cover !bg-center !bg-none !block !bg-[url(https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/735630f5-2c22-45a4-8385-26f47fa100b6/visual-edit-uploads/1764195221194-dvvhlmkzjve.jpeg)] !bg-cover !bg-center !w-full !h-full !text-base" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-violet/90 hover:bg-violet text-white">
                      {study.industry}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-4">
                  <CardTitle className="text-xl mb-2 group-hover:text-cyan transition-colors duration-300">
                    {study.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {study.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                      Resultados Clave
                    </h4>
                    {study.results.map((result, idx) =>
                  <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-cyan flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{result}</span>
                      </div>
                  )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}