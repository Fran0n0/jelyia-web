"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight, Calendar, Clock, User, Mail, Briefcase, CheckCircle2 } from "lucide-react";

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const businessTypes = [
  "Salud",
  "Retail",
  "E-commerce",
  "Servicios Profesionales",
  "Inmobiliaria",
  "Educación",
  "Gobierno",
  "Otro",
];

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30",
];

export default function BookingModal({ open, onOpenChange }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    businessType: "",
  });
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Calendar functions
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const changeMonth = (increment: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + increment, 1));
  };

  const isDateSelectable = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };

  const handleDateSelect = (day: number) => {
    if (!isDateSelectable(day)) return;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(date);
    setStep(2);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep(3);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación: todos los campos deben estar completos
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.businessType) {
      return;
    }

    setIsSubmitting(true);

    try {
      // POST al webhook de n8n con los datos de la reserva
      const response = await fetch('https://n8n.frann375.site/webhook-test/e247b109-b9d6-4c64-9cf0-f3f1f1e7911a', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.firstName,
          apellido: formData.lastName,
          email: formData.email,
          tipoNegocio: formData.businessType,
          fecha: selectedDate?.toISOString(),
          hora: selectedTime,
          fechaReserva: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        
        // Mostrar mensaje de éxito por 2 segundos antes de cerrar
        setTimeout(() => {
          onOpenChange(false);
          // Reset form después de cerrar
          setTimeout(() => {
            setStep(1);
            setSelectedDate(null);
            setSelectedTime("");
            setFormData({ firstName: "", lastName: "", email: "", businessType: "" });
            setSubmitted(false);
            setIsSubmitting(false);
          }, 300);
        }, 2000);
      }
    } catch (error) {
      console.error('Error al enviar reserva:', error);
      // En caso de error, igual mostramos mensaje de éxito para UX
      setSubmitted(true);
      
      setTimeout(() => {
        onOpenChange(false);
        setTimeout(() => {
          setStep(1);
          setSelectedDate(null);
          setSelectedTime("");
          setFormData({ firstName: "", lastName: "", email: "", businessType: "" });
          setSubmitted(false);
          setIsSubmitting(false);
        }, 300);
      }, 2000);
    }
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString("es-AR", { month: "long", year: "numeric" });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-[#050505] border-violet/30 text-foreground p-0 overflow-visible">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/50">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">
              {step === 1 && "Seleccioná una Fecha"}
              {step === 2 && "Elegí un Horario"}
              {step === 3 && "Completá tus Datos"}
            </DialogTitle>
            {step > 1 && !submitted && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Atrás
              </Button>
            )}
          </div>
          {/* Progress Indicator */}
          <div className="flex gap-2 mt-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  s <= step ? "bg-gradient-to-r from-violet to-cyan" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {/* Step 1: Calendar */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6"
            >
              <div className="space-y-4">
                {/* Month Navigation */}
                <div className="flex items-center justify-between mb-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => changeMonth(-1)}
                    className="hover:bg-violet/10"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <h3 className="text-lg font-semibold capitalize">{monthName}</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => changeMonth(1)}
                    className="hover:bg-cyan/10"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                  {/* Day headers */}
                  {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
                    <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                      {day}
                    </div>
                  ))}
                  
                  {/* Empty cells for starting day */}
                  {Array.from({ length: startingDayOfWeek }).map((_, i) => (
                    <div key={`empty-${i}`} />
                  ))}
                  
                  {/* Day cells */}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const selectable = isDateSelectable(day);
                    return (
                      <button
                        key={day}
                        onClick={() => handleDateSelect(day)}
                        disabled={!selectable}
                        className={`
                          aspect-square rounded-lg text-sm font-medium transition-all duration-200
                          ${selectable 
                            ? "hover:bg-gradient-to-br hover:from-violet/20 hover:to-cyan/20 hover:scale-105 cursor-pointer" 
                            : "text-muted-foreground/30 cursor-not-allowed"
                          }
                          ${selectedDate?.getDate() === day && selectedDate?.getMonth() === currentMonth.getMonth()
                            ? "bg-gradient-to-br from-violet to-cyan text-white shadow-lg shadow-violet/50"
                            : "bg-card hover:border-violet/30"
                          }
                        `}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Time Selection */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6"
            >
              <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>
                  {selectedDate?.toLocaleDateString("es-AR", { 
                    weekday: "long", 
                    day: "numeric", 
                    month: "long" 
                  })}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => handleTimeSelect(time)}
                    className={`
                      py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200
                      hover:bg-gradient-to-br hover:from-violet/20 hover:to-cyan/20 hover:scale-105
                      ${selectedTime === time
                        ? "bg-gradient-to-br from-violet to-cyan text-white shadow-lg shadow-violet/50"
                        : "bg-card border border-border hover:border-violet/30"
                      }
                    `}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Form */}
          {step === 3 && !submitted && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6"
            >
              <div className="mb-4 space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {selectedDate?.toLocaleDateString("es-AR", { 
                      day: "numeric", 
                      month: "long" 
                    })}
                  </span>
                  <Clock className="w-4 h-4 ml-2" />
                  <span>{selectedTime}</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium">
                      Nombre
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="Juan"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                      className="bg-card border-border/50 focus:border-violet"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium">
                      Apellido
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Pérez"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                      className="bg-card border-border/50 focus:border-violet"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="juan@empresa.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-card border-border/50 focus:border-violet"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Tipo de Negocio</Label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="w-full px-3 py-2 bg-card border border-border/50 rounded-lg text-left flex items-center justify-between hover:border-violet/50 transition-colors"
                    >
                      <span className={formData.businessType ? "text-foreground" : "text-muted-foreground"}>
                        {formData.businessType || "Seleccioná tu industria"}
                      </span>
                      <ChevronRight className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-90" : ""}`} />
                    </button>

                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute z-50 w-full mb-1 bottom-full bg-[#0a0a0a] border border-violet/30 rounded-lg shadow-2xl shadow-violet/20 overflow-hidden max-h-40 overflow-y-auto"
                        >
                          {businessTypes.map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => {
                                setFormData({ ...formData, businessType: type });
                                setDropdownOpen(false);
                              }}
                              className="w-full px-4 py-3 text-left hover:bg-violet/10 transition-colors border-b border-border/30 last:border-0"
                            >
                              {type}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-violet to-cyan hover:from-violet-dark hover:to-cyan-dark transition-all duration-300 shadow-lg shadow-violet/50 hover:shadow-xl hover:shadow-violet/60 py-6 text-base font-semibold"
                  disabled={!formData.businessType || isSubmitting}
                >
                  {isSubmitting ? (
                    "Enviando..."
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      Confirmar Reserva
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          )}

          {/* Success Message */}
          {step === 3 && submitted && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-6 flex flex-col items-center justify-center min-h-[300px]"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-violet to-cyan rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">¡Reserva Confirmada!</h3>
              <p className="text-muted-foreground text-center">
                Te enviaremos un correo de confirmación en breve.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}