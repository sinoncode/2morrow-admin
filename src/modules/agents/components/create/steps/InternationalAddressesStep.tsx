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
  Shield, 
  Award, 
  GraduationCap,
  Car,
  Globe,
  Calendar,
  CheckCircle2,
  Sparkles,
  Plus,
  X,
  FileBadge,
  ScrollText
} from "lucide-react"

/* ─────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────── */
interface LicenseForm {
  realEstateLicence: string
  issuingCanton: string
  licenceNumber: string
  licenceExpiry: string
  professionalMembership: string
  membershipNumber: string
  amlStatus: string
  gdprStatus: string
  internalTraining: string
  externalCertifications: string
  languages: { name: string; level: string }[]
  drivingLicence: string
  ownVehicle: string
  policyReference: string
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
export default function LicensingRegistration() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)
  const [languageInput, setLanguageInput] = useState("")

  const [form, setForm] = useState<LicenseForm>({
    realEstateLicence: "edyta-graf",
    issuingCanton: "zurich",
    licenceNumber: "CH-992-019-X",
    licenceExpiry: "24/05/2026",
    professionalMembership: "svit-switzerland",
    membershipNumber: "88210-MEM",
    amlStatus: "certified-level-2",
    gdprStatus: "completed-2023",
    internalTraining: "Corporate Ethics, Valuation asics",
    externalCertifications: "RICS Candidate",
    languages: [
      { name: "German", level: "Native" },
      { name: "English", level: "C2" },
      { name: "French", level: "B2" }
    ],
    drivingLicence: "category-b",
    ownVehicle: "yes",
    policyReference: "AXA Winterthur - #POL-102938"
  })

  const updateField = useCallback(<K extends keyof LicenseForm>(
    field: K, 
    value: LicenseForm[K]
  ) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setSavedSuccess(false)
  }, [])

  /* ── Language Tags ── */
  const addLanguage = () => {
    const trimmed = languageInput.trim()
    if (trimmed) {
      const [name, level] = trimmed.split(" ")
      if (name) {
        updateField("languages", [...form.languages, { name, level: level || "Basic" }])
        setLanguageInput("")
      }
    }
  }

  const removeLanguage = (index: number) => {
    updateField("languages", form.languages.filter((_, i) => i !== index))
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
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                Licensing & Registration
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                Manage professional credentials, compliance status, and insurance coverage.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ─── ROW 1: Licensing (left) + Association (right) ─── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* LEFT: Licensing & Registration (2/3) */}
          <motion.div variants={cardVariants} className="xl:col-span-2">
            <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80 h-full">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                    <FileBadge className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white">
                      Licensing & Registration
                    </h3>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                      Manage core professional legal requirements
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Real Estate Licence / Patent */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Real Estate Licence / Patent
                    </label>
                    <Select 
                      value={form.realEstateLicence} 
                      onValueChange={(v) => updateField("realEstateLicence", v)}
                    >
                      <SelectTrigger className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
                        <SelectValue placeholder="Select licence" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="edyta-graf">Edyta Graf</SelectItem>
                        <SelectItem value="rics">RICS Certified</SelectItem>
                        <SelectItem value="svit">SVIT Member</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  {/* Issuing Canton / Country */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Issuing Canton / Country
                    </label>
                    <Select 
                      value={form.issuingCanton} 
                      onValueChange={(v) => updateField("issuingCanton", v)}
                    >
                      <SelectTrigger className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="zurich">Zurich, Switzerland</SelectItem>
                        <SelectItem value="geneva">Geneva, Switzerland</SelectItem>
                        <SelectItem value="london">London, UK</SelectItem>
                        <SelectItem value="paris">Paris, France</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  {/* Licence Number */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Licence Number
                    </label>
                    <Input
                      value={form.licenceNumber}
                      onChange={(e) => updateField("licenceNumber", e.target.value)}
                      placeholder="Enter licence number"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </motion.div>

                  {/* Licence Expiry Date */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Licence Expiry Date
                    </label>
                    <div className="relative">
                      <Input
                        type="text"
                        value={form.licenceExpiry}
                        onChange={(e) => updateField("licenceExpiry", e.target.value)}
                        placeholder="dd/mm/yyyy"
                        className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 pr-10"
                      />
                      <Calendar className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* RIGHT: Association (1/3) */}
          <motion.div variants={cardVariants} className="xl:col-span-1">
            <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80 h-full">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white">
                      Association
                    </h3>
                  </div>
                </div>

                <div className="mt-6 space-y-5">
                  {/* Professional Membership */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Professional Membership
                    </label>
                    <Select 
                      value={form.professionalMembership} 
                      onValueChange={(v) => updateField("professionalMembership", v)}
                    >
                      <SelectTrigger className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
                        <SelectValue placeholder="Select membership" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="svit-switzerland">SVIT Switzerland</SelectItem>
                        <SelectItem value="rics">RICS</SelectItem>
                        <SelectItem value="naea">NAEA</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  {/* Membership Number */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Membership Number
                    </label>
                    <Input
                      value={form.membershipNumber}
                      onChange={(e) => updateField("membershipNumber", e.target.value)}
                      placeholder="Enter number"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </motion.div>

                  {/* Status Badge */}
                  <motion.div variants={itemVariants}>
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/50 w-fit">
                      <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                      <span className="text-xs font-semibold text-green-700 dark:text-green-300">
                        Status: Active Member
                      </span>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* ─── ROW 2: Compliance (left) + Capability (right) ─── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* LEFT: Compliance & Training (2/3) */}
          <motion.div variants={cardVariants} className="xl:col-span-2">
            <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80 h-full">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">
                    Compliance & Training
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Anti-Money Laundering */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Anti-Money Laundering
                    </label>
                    <div className="relative">
                      <Input
                        value={form.amlStatus === "certified-level-2" ? "Certified (Level 2)" : form.amlStatus}
                        onChange={(e) => updateField("amlStatus", e.target.value)}
                        placeholder="Enter status"
                        className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 pr-10"
                      />
                      <ScrollText className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </motion.div>

                  {/* GDPR / Data Protection */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      GDPR / Data Protection
                    </label>
                    <div className="relative">
                      <Input
                        value={form.gdprStatus === "completed-2023" ? "Completed 2023" : form.gdprStatus}
                        onChange={(e) => updateField("gdprStatus", e.target.value)}
                        placeholder="Enter status"
                        className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 pr-10"
                      />
                      <Shield className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </motion.div>

                  {/* Internal Training Completed */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Internal Training Completed
                    </label>
                    <Input
                      value={form.internalTraining}
                      onChange={(e) => updateField("internalTraining", e.target.value)}
                      placeholder="Enter training details"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </motion.div>

                  {/* External Certifications */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      External Certifications
                    </label>
                    <Input
                      value={form.externalCertifications}
                      onChange={(e) => updateField("externalCertifications", e.target.value)}
                      placeholder="Enter certifications"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* RIGHT: Capability & Mobility (1/3) */}
          <motion.div variants={cardVariants} className="xl:col-span-1">
            <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80 h-full">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">
                    Capability & Mobility
                  </h3>
                </div>

                <div className="space-y-5">
                  {/* Languages */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Languages
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <AnimatePresence mode="popLayout">
                        {form.languages.map((lang, index) => (
                          <motion.div
                            key={`${lang.name}-${index}`}
                            layout
                            variants={tagVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                          >
                            <Badge 
                              className="bg-blue-50 hover:bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-0 pl-3 pr-2 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-default"
                            >
                              {lang.name.toUpperCase()} <span className="opacity-70">({lang.level})</span>
                              <button
                                onClick={() => removeLanguage(index)}
                                className="ml-0.5 hover:bg-blue-200 dark:hover:bg-blue-800/50 rounded-md p-0.5 transition-colors"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </Badge>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      <button
                        onClick={addLanguage}
                        className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>

                  {/* Driving Licence + Own Vehicle */}
                  <div className="grid grid-cols-2 gap-3">
                    <motion.div variants={itemVariants} className="space-y-2">
                      <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                        Driving Licence
                      </label>
                      <Select 
                        value={form.drivingLicence} 
                        onValueChange={(v) => updateField("drivingLicence", v)}
                      >
                        <SelectTrigger className="h-10 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-xs">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectItem value="category-b">Category B</SelectItem>
                          <SelectItem value="category-c">Category C</SelectItem>
                          <SelectItem value="none">None</SelectItem>
                        </SelectContent>
                      </Select>
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-2">
                      <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                        Own Vehicle
                      </label>
                      <Select 
                        value={form.ownVehicle} 
                        onValueChange={(v) => updateField("ownVehicle", v)}
                      >
                        <SelectTrigger className="h-10 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-xs">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </motion.div>
                  </div>
                               </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* ─── PROFESSIONAL INDEMNITY INSURANCE (Full Width) ─── */}
        <motion.div variants={cardVariants}>
          <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                {/* Left: Icon + Text */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white">
                      Professional Indemnity Insurance
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-md leading-relaxed">
                      Protecting the agent and the agency from professional errors and omissions.
                    </p>
                  </div>
                </div>

                {/* Right: Policy + Button */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
                  <motion.div variants={itemVariants} className="space-y-2 w-full sm:w-auto">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Policy Reference / Provider
                    </label>
                    <Input
                      value={form.policyReference}
                      onChange={(e) => updateField("policyReference", e.target.value)}
                      placeholder="Enter policy reference"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 min-w-[260px]"
                    />
                  </motion.div>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-11 px-6 rounded-xl font-medium border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 mt-5 sm:mt-0"
                  >
                    View Policy
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ─── ACTION BUTTONS ─── */}
       
      </div>
    </motion.div>
  )
}