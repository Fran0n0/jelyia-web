"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, FileText, TrendingUp, BarChart3 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const services = [
  {
    icon: MessageSquare,
    title: "Chatbots de WhatsApp e Instagram",
    description:
      "Bots conversacionales con IA que interactúan con clientes 24/7, responden preguntas y califican leads automáticamente.",
    gradient: "from-violet to-purple-500",
  },
  {
    icon: FileText,
    title: "Generación de Reportes con IA",
    description:
      "Generá automáticamente informes empresariales detallados, análisis e insights de tus datos en segundos.",
    gradient: "from-cyan to-blue-500",
  },
  {
    icon: TrendingUp,
    title: "Automatización de Embudo de Ventas",
    description:
      "Automatización completa del embudo desde la captura de leads hasta la conversión, con seguimientos y nurturing personalizados.",
    gradient: "from-violet to-cyan",
  },
  {
    icon: BarChart3,
    title: "Dashboards Empresariales",
    description:
      "Dashboards en tiempo real que consolidan todas tus métricas, KPIs y datos en una interfaz elegante.",
    gradient: "from-purple-500 to-violet",
  },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="services" ref={ref} className="py-24 px-4 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-violet/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Nuestros <span className="text-cyan">Servicios</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-violet to-cyan mx-auto mb-8 rounded-full" />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Soluciones integrales de automatización con IA diseñadas para transformar tus operaciones empresariales
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="group relative h-full bg-card border border-border hover:border-violet/50 transition-all duration-500 overflow-hidden hover:shadow-2xl hover:shadow-violet/20">
                  {/* Hover gradient effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-5`} />
                  </div>

                  <CardHeader className="relative z-10 p-8">
                    <div className="mb-6">
                      <div
                        className={`inline-flex w-16 h-16 items-center justify-center rounded-2xl bg-gradient-to-br ${service.gradient} shadow-lg group-hover:scale-110 transition-transform duration-500`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <CardTitle className="text-2xl mb-4 group-hover:text-violet transition-colors duration-300">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}