"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Bot, Workflow, Zap } from "lucide-react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="about" ref={ref} className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16">

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Acerca de <span className="text-violet !whitespace-pre-line">JELYIA</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-violet to-cyan mx-auto mb-8 rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-violet to-cyan opacity-20 blur-2xl rounded-3xl" />
              <div className="relative bg-card border border-violet/20 rounded-3xl p-8 shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-violet to-cyan rounded-2xl flex items-center justify-center">
                    <Bot className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Fundada por</h3>
                    <p className="text-violet text-lg">Franco Jurjely Nicolás</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed !whitespace-pre-line">JELYIA es una agencia profesional de automatización con IA especializada en soluciones empresariales inteligentes. Ayudamos a las empresas a optimizar sus operaciones y aumentar la productividad mediante tecnología de automatización de vanguardia.



                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6">

            <div className="bg-card border border-cyan/20 rounded-2xl p-6 hover:border-cyan/40 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cyan/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Workflow className="w-6 h-6 text-cyan" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Integraciones Inteligentes</h4>
                  <p className="text-muted-foreground">
                    Conectamos tus herramientas favoritas: WhatsApp, Instagram, Google Sheets y CRMs
                    a través de plataformas potentes como n8n y Make.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-violet/20 rounded-2xl p-6 hover:border-violet/40 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-violet/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-violet" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Automatización Integral</h4>
                  <p className="text-muted-foreground">
                    Desde la captura de leads hasta el cierre de ventas, automatizamos todo tu flujo de trabajo,
                    dejándote enfocado en lo más importante: el crecimiento.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>);

}