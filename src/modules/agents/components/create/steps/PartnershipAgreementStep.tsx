"use client"

import React, { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Card, 
  CardContent 
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Globe, 
  MapPin,
  DollarSign,
  X,
  Plus,
  CheckCircle2,
  Sparkles
} from "lucide-react"

/* ─────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────── */
interface SpecialisationForm {
  propertyType: string
  transactionType: string
  geographicPrimary: string
  geographicSecondary: string
  internationalMarkets: string
  clientSegment: string
  languages: string[]
  languageInput: string
  averageTransactionValue: string
}

/* ─────────────────────────────────────────────────────────────
   ANIMATION VARIANTS
   ───────────────────────────────────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
}

const tagVariants = {
  hidden: { opacity: 0, scale: 0.6, y: 8 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 500, damping: 25 }
  },
  exit: { 
    opacity: 0, 
    scale: 0.6, 
    transition: { duration: 0.2 } 
  }
}

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────────── */
export default function SpecialisationTerritory() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)

  const [form, setForm] = useState<SpecialisationForm>({
    propertyType: "Residential Luxury",
    transactionType: "Sales & Resale",
    geographicPrimary: "Central Business District",
    geographicSecondary: "West Coast Marina",
    internationalMarkets: "",
    clientSegment: "Ultra High Net Worth",
    languages: ["English", "Spanish", "Mandarin"],
    languageInput: "",
    averageTransactionValue: "2,500,000+"
  })

  const updateField = useCallback(<K extends keyof SpecialisationForm>(
    field: K, 
    value: SpecialisationForm[K]
  ) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setSavedSuccess(false)
  }, [])

  /* ── Language Tags ── */
  const addLanguage = () => {
    const trimmed = form.languageInput.trim()
    if (trimmed && !form.languages.includes(trimmed)) {
      updateField("languages", [...form.languages, trimmed])
      updateField("languageInput", "")
    }
  }

  const removeLanguage = (lang: string) => {
    updateField("languages", form.languages.filter(l => l !== lang))
  }

  const handleLanguageKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addLanguage()
    }
  }

  /* ── Submit ── */
  const handleSave = async () => {
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1200))
    setIsSubmitting(false)
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 3000)
  }

  /* ─────────────────────────────────────────────────────────────
   RENDER
   ───────────────────────────────────────────────────────────── */
  return (
    <motion.div 
      className="min-h-screen bg-gray-50/80 dark:bg-gray-950/80 p-4 sm:p-6 lg:p-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="mx-auto max-w-full space-y-6">
        
        {/* Page Header */}
        <motion.div variants={cardVariants} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-blue-600 rounded-xl shadow-lg shadow-blue-600/20">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                Specialisation & Territory
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                Configure agent's regional coverage and market expertise parameters.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ─── MAIN CARD ─── */}
        <motion.div variants={cardVariants}>
          <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80">
            <CardContent className="p-0">
              
              {/* Form Body */}
              <div className="px-6 sm:px-8 py-8 space-y-6">
                
                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {/* Property Type Specialisation */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Property Type Specialisation
                    </label>
                    <Input
                      value={form.propertyType}
                      onChange={(e) => updateField("propertyType", e.target.value)}
                      placeholder="Residential Luxury"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </motion.div>

                  {/* Transaction Type Specialisation */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Transaction Type Specialisation
                    </label>
                    <Input
                      value={form.transactionType}
                      onChange={(e) => updateField("transactionType", e.target.value)}
                      placeholder="Sales & Resale"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </motion.div>

                  {/* Geographic Territory — Primary */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Geographic Territory — Primary
                    </label>
                    <div className="relative">
                      <Input
                        value={form.geographicPrimary}
                        onChange={(e) => updateField("geographicPrimary", e.target.value)}
                        placeholder="Central Business District"
                        className="h-11 rounded-xl border-gray-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 pr-10"
                      />
                      <MapPin className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </motion.div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {/* Secondary Geographic Territory */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Secondary Geographic Territory
                    </label>
                    <Input
                      value={form.geographicSecondary}
                      onChange={(e) => updateField("geographicSecondary", e.target.value)}
                      placeholder="West Coast Marina"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </motion.div>

                  {/* International Markets */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      International Markets
                    </label>
                    <div className="relative">
                      <Select 
                        value={form.internationalMarkets} 
                        onValueChange={(v) => updateField("internationalMarkets", v)}
                      >
                        <SelectTrigger className="h-11 rounded-xl border-gray-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 pr-10">
                          <SelectValue placeholder="Select International" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectItem value="emea">EMEA</SelectItem>
                          <SelectItem value="apac">APAC</SelectItem>
                          <SelectItem value="americas">Americas</SelectItem>
                          <SelectItem value="global">Global</SelectItem>
                        </SelectContent>
                      </Select>
                      <Globe className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </motion.div>

                  {/* Client Segment Focus */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Client Segment Focus
                    </label>
                    <Input
                      value={form.clientSegment}
                      onChange={(e) => updateField("clientSegment", e.target.value)}
                      placeholder="Ultra High Net Worth"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </motion.div>
                </div>

                {/* Row 3: Languages + Transaction Value */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {/* Language Markets Covered */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Language Markets Covered
                    </label>
                    <div className="flex flex-wrap items-center gap-2 min-h-[44px] p-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800/30">
                      <AnimatePresence mode="popLayout">
                        {form.languages.map((lang) => (
                          <motion.div
                            key={lang}
                            layout
                            variants={tagVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                          >
                            <Badge 
                              className="bg-blue-600 hover:bg-blue-700 text-white border-0 pl-3 pr-2 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1.5 cursor-default"
                            >
                              {lang}
                              <button
                                onClick={() => removeLanguage(lang)}
                                className="ml-0.5 hover:bg-white/20 rounded-md p-0.5 transition-colors"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </Badge>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      <div className="flex items-center gap-2 flex-1 min-w-[120px]">
                        <Input
                          value={form.languageInput}
                          onChange={(e) => updateField("languageInput", e.target.value)}
                          onKeyDown={handleLanguageKeyDown}
                          placeholder="Type and press Enter..."
                          className="h-8 border-0 bg-transparent shadow-none focus-visible:ring-0 p-0 text-xs placeholder:text-gray-400 dark:placeholder:text-gray-500 dark:text-gray-200"
                        />
                        <button
                          onClick={addLanguage}
                          disabled={!form.languageInput.trim()}
                          className="flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 disabled:opacity-40 transition-colors shrink-0"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Add Language
                        </button>
                      </div>
                    </div>
                  </motion.div>

                  {/* Average Transaction Value */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Average Transaction Value
                    </label>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                      </div>
                      <Input
                        value={form.averageTransactionValue}
                        onChange={(e) => updateField("averageTransactionValue", e.target.value)}
                        placeholder="0"
                        className="h-11 rounded-xl border-gray-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 pl-10"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 sm:px-8 py-5 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-end gap-3">
                <AnimatePresence>
                  {savedSuccess && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-xl"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Changes saved successfully
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <Button
                  type="button"
                  variant="ghost"
                  className="h-10 px-6 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleSave}
                  disabled={isSubmitting}
                  className="h-10 px-6 rounded-xl text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transition-all duration-200 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      >
                        <Sparkles className="w-4 h-4" />
                      </motion.div>
                      Saving...
                    </span>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

      </div>
    </motion.div>
  )
}