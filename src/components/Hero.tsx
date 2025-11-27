"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import BookingModal from "@/components/BookingModal";

export default function Hero() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
      {/* Gradient background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet rounded-full opacity-20 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan rounded-full opacity-20 blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-6">

          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet/10 border border-violet/20 text-violet text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            Automatización Empresarial con IA
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">

          <span className="bg-gradient-to-r from-violet via-cyan to-violet bg-clip-text text-transparent animate-gradient">
            Automatizá tu negocio
          </span>
          <br />
          <span className="text-foreground">con inteligencia artificial.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">

          Construimos sistemas inteligentes que gestionan clientes, generan reportes y cierran ventas por vos.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center">

          <Button
            size="lg"
            onClick={() => setBookingModalOpen(true)}
            className="text-lg px-8 py-6 bg-gradient-to-r from-violet to-cyan hover:from-violet-dark hover:to-cyan-dark transition-all duration-300 shadow-lg shadow-violet/50 hover:shadow-xl hover:shadow-violet/60 hover:scale-105">

            Solicitar Demo Gratis
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6 border-2 border-violet/30 hover:border-violet hover:bg-violet/10 transition-all duration-300">

            Conocer Más
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">

          {[
          { value: "2000+", label: "Integraciones posibles" },
          { value: "95%", label: "Tiempo Ahorrado" },
          { value: "100%", label: "Personalizado" },
          { value: "24/7", label: "Soporte IA" }].
          map((stat, index) =>
          <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-violet mb-2 !whitespace-pre-line !whitespace-pre-line">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground !whitespace-pre-line !whitespace-pre-line">{stat.label}</div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Booking Modal */}
      <BookingModal open={bookingModalOpen} onOpenChange={setBookingModalOpen} />
    </section>);

}