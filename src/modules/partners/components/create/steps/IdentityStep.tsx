"use client"

import React, { useState, useCallback } from "react"
import { motion } from "framer-motion"
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
import { 
  Settings2, 
  AlertCircle,
  CheckCircle2,
  Sparkles
} from "lucide-react"

/* ─────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────── */
interface CompanyIdentityForm {
  partnerType: string
  specialisation: string
  primaryMarket: string
  cantonProvince: string
  operatingLanguages: string
  exclusiveRelationship: string
  preferredPartnerStatus: boolean
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

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────────── */
export default function CompanyIdentity() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)

  const [form, setForm] = useState<CompanyIdentityForm>({
    partnerType: "",
    specialisation: "Home",
    primaryMarket: "",
    cantonProvince: "",
    operatingLanguages: "",
    exclusiveRelationship: "",
    preferredPartnerStatus: true
  })

  const updateField = useCallback(<K extends keyof CompanyIdentityForm>(
    field: K, 
    value: CompanyIdentityForm[K]
  ) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setSavedSuccess(false)
  }, [])

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
              <Settings2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                Company Identity
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                Define your company profile, specialisation, and partnership preferences.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ─── MAIN CARD ─── */}
        <motion.div variants={cardVariants}>
          <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80">
            <CardContent className="p-0">
              
              {/* Card Header */}
              <div className="flex items-center justify-between px-6 sm:px-8 pt-6 sm:pt-8 pb-2">
                <div className="flex items-center gap-2.5">
                  <Settings2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-base font-bold text-blue-600 dark:text-blue-400">
                    Company Identity
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                  <AlertCircle className="w-3.5 h-3.5" />
                  All fields marked with <span className="text-red-500 font-bold">*</span> are required
                </div>
              </div>

              {/* Form Fields */}
              <div className="px-6 sm:px-8 py-6 space-y-6">
                
                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {/* Partner Type */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                      Partner Type <span className="text-red-500">*</span>
                    </label>
                    <Select 
                      value={form.partnerType} 
                      onValueChange={(v) => updateField("partnerType", v)}
                    >
                      <SelectTrigger className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
                        <SelectValue placeholder="Select partner type" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="agent">Real Estate Agent</SelectItem>
                        <SelectItem value="broker">Broker</SelectItem>
                        <SelectItem value="developer">Developer</SelectItem>
                        <SelectItem value="property-manager">Property Manager</SelectItem>
                        <SelectItem value="investment-firm">Investment Firm</SelectItem>
                        <SelectItem value="referral-partner">Referral Partner</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
                      Choose the official categorization of the partner entity.
                    </p>
                  </motion.div>

                  {/* Specialisation */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                      Specialisation
                    </label>
                    <Input
                      value={form.specialisation}
                      onChange={(e) => updateField("specialisation", e.target.value)}
                      placeholder="e.g. Home"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </motion.div>

                  {/* Primary Market */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                      Primary Market
                    </label>
                    <Select 
                      value={form.primaryMarket} 
                      onValueChange={(v) => updateField("primaryMarket", v)}
                    >
                      <SelectTrigger className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
                        <SelectValue placeholder="Select market region" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="emea">EMEA</SelectItem>
                        <SelectItem value="apac">APAC</SelectItem>
                        <SelectItem value="americas">Americas</SelectItem>
                        <SelectItem value="global">Global</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {/* Canton / Province */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                      Canton / Province
                    </label>
                    <Select 
                      value={form.cantonProvince} 
                      onValueChange={(v) => updateField("cantonProvince", v)}
                    >
                      <SelectTrigger className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="geneva">Geneva</SelectItem>
                        <SelectItem value="zurich">Zurich</SelectItem>
                        <SelectItem value="vaud">Vaud</SelectItem>
                        <SelectItem value="bern">Bern</SelectItem>
                        <SelectItem value="basel">Basel</SelectItem>
                        <SelectItem value="ticino">Ticino</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  {/* Operating Languages */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                      Operating Languages
                    </label>
                    <Select 
                      value={form.operatingLanguages} 
                      onValueChange={(v) => updateField("operatingLanguages", v)}
                    >
                      <SelectTrigger className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
                        <SelectValue placeholder="Select languages" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="it">Italian</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="multilingual">Multilingual</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  {/* Exclusive Relationship */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                      Exclusive Relationship
                    </label>
                    <Select 
                      value={form.exclusiveRelationship} 
                      onValueChange={(v) => updateField("exclusiveRelationship", v)}
                    >
                      <SelectTrigger className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="exclusive">Exclusive</SelectItem>
                        <SelectItem value="non-exclusive">Non-Exclusive</SelectItem>
                        <SelectItem value="pending">Pending Review</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>
                </div>

                {/* Preferred Partner Status */}
                <motion.div variants={itemVariants} className="space-y-3 pt-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Preferred Partner Status
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => updateField("preferredPartnerStatus", true)}
                      className={`
                        h-10 px-8 rounded-lg text-sm font-semibold transition-all duration-200
                        ${form.preferredPartnerStatus
                          ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                        }
                      `}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => updateField("preferredPartnerStatus", false)}
                      className={`
                        h-10 px-8 rounded-lg text-sm font-semibold transition-all duration-200
                        ${!form.preferredPartnerStatus
                          ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                        }
                      `}
                    >
                      No
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
                    Preferred partners receive priority lead distribution.
                  </p>
                </motion.div>
              </div>

              {/* Card Footer */}
              {/* <div className="px-6 sm:px-8 py-5 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-end gap-3">
                {savedSuccess && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-xl"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Configuration saved
                  </motion.div>
                )}
                
                <Button
                  type="button"
                  variant="ghost"
                  className="h-10 px-6 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                >
                  Discard Changes
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
                    "Save Configuration"
                  )}
                </Button>
              </div> */}
            </CardContent>
          </Card>
        </motion.div>

      </div>
    </motion.div>
  )
}