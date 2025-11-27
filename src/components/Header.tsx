"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
{ name: "Nosotros", href: "#about" },
{ name: "Servicios", href: "#services" },
{ name: "Casos de Éxito", href: "#case-studies" },
{ name: "Testimonios", href: "#testimonials" },
{ name: "Contacto", href: "#contact" }];


export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ?
      "bg-background/80 backdrop-blur-lg border-b border-border shadow-lg" :
      "bg-transparent"}`
      }>

      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="text-2xl font-bold">
          <span className="bg-gradient-to-r from-violet to-cyan bg-clip-text text-transparent !whitespace-pre-line">JELY

          </span>
          <span className="text-foreground">IA</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
          <a
            key={link.name}
            href={link.href}
            className="text-foreground/80 hover:text-violet transition-colors duration-300 font-medium">

              {link.name}
            </a>
          )}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Button
            className="bg-gradient-to-r from-violet to-cyan hover:from-violet-dark hover:to-cyan-dark transition-all duration-300 shadow-lg shadow-violet/30"
            asChild>

            <a href="#contact">Comenzar</a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>

          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen &&
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border">

            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) =>
            <a
              key={link.name}
              href={link.href}
              className="block text-foreground/80 hover:text-violet transition-colors duration-300 font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}>

                  {link.name}
                </a>
            )}
              <Button
              className="w-full bg-gradient-to-r from-violet to-cyan hover:from-violet-dark hover:to-cyan-dark transition-all duration-300"
              asChild>

                <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                  Comenzar
                </a>
              </Button>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </header>);

}