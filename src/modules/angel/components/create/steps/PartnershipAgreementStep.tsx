"use client"

import React, { useState, useRef, useCallback } from "react"
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
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { 
  FileText, 
  ShieldCheck, 
  Landmark,
  Upload,
  FileCheck,
  X,
  CheckCircle2,
  Sparkles,
  Eye,
  Banknote,
  Percent,
  Calendar
} from "lucide-react"

/* ─────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────── */
interface PartnershipForm {
  partnershipStatus: string
  partnershipType: string
  agreementSigned: string
  agreementStartDate: string
  agreementEndDate: string
  exclusivity: string

  exclusiveGeographicZone: string
  propertyTypes: {
    luxuryResidential: boolean
    offPlanProjects: boolean
    commercial: boolean
    landPlots: boolean
  }
  ndaDocument: File | null
  gdprDocument: File | null

  salesCommission: string
  rentalCommission: string
  referralFee: string
  annualRevenueTarget: string
  paymentTerms: string
  ibanCommission: string
  paymentCurrency: string
  withholdingTaxApplicable: boolean
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
export default function PartnershipAgreement() {
  const ndaInputRef = useRef<HTMLInputElement>(null)
  const gdprInputRef = useRef<HTMLInputElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)

  const [form, setForm] = useState<PartnershipForm>({
    partnershipStatus: "active",
    partnershipType: "standard-affiliate",
    agreementSigned: "",
    agreementStartDate: "",
    agreementEndDate: "",
    exclusivity: "exclusive",

    exclusiveGeographicZone: "",
    propertyTypes: {
      luxuryResidential: true,
      offPlanProjects: true,
      commercial: false,
      landPlots: false
    },
    ndaDocument: null,
    gdprDocument: null,

    salesCommission: "2.5",
    rentalCommission: "1.0",
    referralFee: "0.00",
    annualRevenueTarget: "500000",
    paymentTerms: "net-30",
    ibanCommission: "",
    paymentCurrency: "CHF",
    withholdingTaxApplicable: false
  })

  const updateField = useCallback(<K extends keyof PartnershipForm>(
    field: K, 
    value: PartnershipForm[K]
  ) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setSavedSuccess(false)
  }, [])

  const updatePropertyType = (type: keyof PartnershipForm["propertyTypes"], checked: boolean) => {
    setForm(prev => ({
      ...prev,
      propertyTypes: { ...prev.propertyTypes, [type]: checked }
    }))
    setSavedSuccess(false)
  }

  /* ── File Upload Handlers ── */
  const handleFileSelect = (
    files: FileList | null, 
    field: "ndaDocument" | "gdprDocument"
  ) => {
    if (files && files[0]) {
      const file = files[0]
      const validTypes = ["application/pdf", "image/jpeg", "image/jpg", "image/png"]
      const maxSize = 10 * 1024 * 1024
      
      if (!validTypes.includes(file.type)) {
        alert("Please upload a PDF, JPG, or PNG file.")
        return
      }
      if (file.size > maxSize) {
        alert("File size must be less than 10MB.")
        return
      }
      updateField(field, file)
    }
  }

  const removeFile = (field: "ndaDocument" | "gdprDocument", inputRef: React.RefObject<HTMLInputElement | null>) => {
    updateField(field, null)
    if (inputRef.current) inputRef.current.value = ""
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
            <div className="p-2.5 bg-[#1f6ea9] rounded-xl shadow-lg shadow-blue-600/20">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                Partnership Agreement
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                Define partnership terms, compliance scope, and commission structures.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ─── AGREEMENT CORE ─── */}
        <motion.div variants={cardVariants}>
          <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <FileCheck className="w-5 h-5 text-blue-600 dark:text-[#1f6ea9]" />
                  <h3 className="text-sm font-bold text-blue-600 dark:text-[#1f6ea9] uppercase tracking-wider">
                    Agreement Core
                  </h3>
                </div>
                <FileText className="w-5 h-5 text-gray-300 dark:text-gray-600" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Partnership Status */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Partnership Status
                  </label>
                  <Select 
                    value={form.partnershipStatus} 
                    onValueChange={(v) => updateField("partnershipStatus", v)}
                  >
                    <SelectTrigger className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                      <SelectItem value="terminated">Terminated</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                {/* Partnership Type */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Partnership Type
                  </label>
                  <Select 
                    value={form.partnershipType} 
                    onValueChange={(v) => updateField("partnershipType", v)}
                  >
                    <SelectTrigger className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="standard-affiliate">Standard Affiliate</SelectItem>
                      <SelectItem value="premium-partner">Premium Partner</SelectItem>
                      <SelectItem value="strategic-alliance">Strategic Alliance</SelectItem>
                      <SelectItem value="exclusive-agent">Exclusive Agent</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                {/* Agreement Signed */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Agreement Signed
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      value={form.agreementSigned}
                      onChange={(e) => updateField("agreementSigned", e.target.value)}
                      placeholder="mm/dd/yyyy"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 pl-10"
                    />
                    <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </motion.div>

                {/* Agreement Start Date */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Agreement Start Date
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      value={form.agreementStartDate}
                      onChange={(e) => updateField("agreementStartDate", e.target.value)}
                      placeholder="mm/dd/yyyy"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 pl-10"
                    />
                    <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </motion.div>

                {/* End / Renewal Date */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    End / Renewal Date
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      value={form.agreementEndDate}
                      onChange={(e) => updateField("agreementEndDate", e.target.value)}
                      placeholder="mm/dd/yyyy"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 pl-10"
                    />
                    <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </motion.div>

                {/* Exclusivity */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Exclusivity
                  </label>
                  <RadioGroup
                    value={form.exclusivity}
                    onValueChange={(value) => updateField("exclusivity", value)}
                    className="flex items-center gap-5 h-11"
                  >
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <RadioGroupItem 
                        value="exclusive" 
                        className="text-blue-600 border-gray-300 dark:border-gray-600 data-[state=checked]:border-blue-600 data-[state=checked]:text-blue-600"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                        Exclusive
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <RadioGroupItem 
                        value="non-exclusive" 
                        className="text-blue-600 border-gray-300 dark:border-gray-600 data-[state=checked]:border-blue-600 data-[state=checked]:text-blue-600"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                        Non-Exclusive
                      </span>
                    </label>
                  </RadioGroup>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ─── SCOPE & COMPLIANCE ─── */}
        <motion.div variants={cardVariants}>
          <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-[#1f6ea9]" />
                  <h3 className="text-sm font-bold text-blue-600 dark:text-[#1f6ea9] uppercase tracking-wider">
                    Scope & Compliance
                  </h3>
                </div>
                <ShieldCheck className="w-5 h-5 text-gray-300 dark:text-gray-600" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-5">
                  {/* Exclusive Geographic Zone */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                      Exclusive Geographic Zone
                    </label>
                    <Input
                      value={form.exclusiveGeographicZone}
                      onChange={(e) => updateField("exclusiveGeographicZone", e.target.value)}
                      placeholder="e.g. Geneva Canton, Switzerland"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </motion.div>

                  {/* Property Types Covered */}
                  <motion.div variants={itemVariants} className="space-y-3">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                      Property Types Covered
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="flex items-center gap-2.5 cursor-pointer group">
                        <Checkbox 
                          checked={form.propertyTypes.luxuryResidential}
                          onCheckedChange={(checked) => updatePropertyType("luxuryResidential", checked === true)}
                          className="rounded-md border-gray-300 dark:border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                          Luxury Residential
                        </span>
                      </label>
                      <label className="flex items-center gap-2.5 cursor-pointer group">
                        <Checkbox 
                          checked={form.propertyTypes.commercial}
                          onCheckedChange={(checked) => updatePropertyType("commercial", checked === true)}
                          className="rounded-md border-gray-300 dark:border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                          Commercial
                        </span>
                      </label>
                      <label className="flex items-center gap-2.5 cursor-pointer group">
                        <Checkbox 
                          checked={form.propertyTypes.offPlanProjects}
                          onCheckedChange={(checked) => updatePropertyType("offPlanProjects", checked === true)}
                          className="rounded-md border-gray-300 dark:border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                          Off-Plan Projects
                        </span>
                      </label>
                      <label className="flex items-center gap-2.5 cursor-pointer group">
                        <Checkbox 
                          checked={form.propertyTypes.landPlots}
                          onCheckedChange={(checked) => updatePropertyType("landPlots", checked === true)}
                          className="rounded-md border-gray-300 dark:border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                          Land / Plots
                        </span>
                      </label>
                    </div>
                  </motion.div>
                </div>

                {/* Right Column - Document Uploads */}
                <div className="space-y-5">
                  {/* NDA / Confidentiality Agreement */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                        NDA / Confidentiality Agreement
                      </label>
                      <button className="text-xs font-medium text-blue-600 dark:text-[#1f6ea9] hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                        View PDF
                      </button>
                    </div>
                    
                    <input
                      ref={ndaInputRef}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileSelect(e.target.files, "ndaDocument")}
                      className="hidden"
                    />

                    <AnimatePresence mode="wait">
                      {form.ndaDocument ? (
                        <motion.div
                          key="nda-file"
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          className="flex items-center justify-between p-3.5 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/20"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                              <FileText className="w-4 h-4 text-blue-600 dark:text-[#1f6ea9]" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {form.ndaDocument.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {(form.ndaDocument.size / 1024).toFixed(0)} KB
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFile("ndaDocument", ndaInputRef)}
                            className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          >
                            <X className="w-4 h-4 text-gray-400 hover:text-red-500" />
                          </button>
                        </motion.div>
                      ) : (
                        <motion.button
                          key="nda-upload"
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          onClick={() => ndaInputRef.current?.click()}
                          className="w-full flex items-center justify-center gap-2 p-3.5 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30 hover:border-[#1f6ea9] dark:hover:border-blue-700 hover:bg-blue-50/30 dark:hover:bg-blue-900/20 transition-all duration-200 cursor-pointer"
                        >
                          <Upload className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                            Upload Signed
                          </span>
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* GDPR / Data Processing Agreement */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                        GDPR / Data Processing Agreement
                      </label>
                      <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
                        Not Uploaded
                      </span>
                    </div>
                    
                    <input
                      ref={gdprInputRef}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileSelect(e.target.files, "gdprDocument")}
                      className="hidden"
                    />

                    <AnimatePresence mode="wait">
                      {form.gdprDocument ? (
                        <motion.div
                          key="gdpr-file"
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          className="flex items-center justify-between p-3.5 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/20"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                              <FileText className="w-4 h-4 text-blue-600 dark:text-[#1f6ea9]" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {form.gdprDocument.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {(form.gdprDocument.size / 1024).toFixed(0)} KB
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFile("gdprDocument", gdprInputRef)}
                            className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          >
                            <X className="w-4 h-4 text-gray-400 hover:text-red-500" />
                          </button>
                        </motion.div>
                      ) : (
                        <motion.button
                          key="gdpr-upload"
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          onClick={() => gdprInputRef.current?.click()}
                          className="w-full flex items-center justify-center gap-2 p-3.5 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30 hover:border-[#1f6ea9] dark:hover:border-blue-700 hover:bg-blue-50/30 dark:hover:bg-blue-900/20 transition-all duration-200 cursor-pointer"
                        >
                          <Upload className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                            Upload Signed
                          </span>
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ─── FINANCIAL & COMMISSION STRUCTURE ─── */}
        <motion.div variants={cardVariants}>
          <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <Landmark className="w-5 h-5 text-blue-600 dark:text-[#1f6ea9]" />
                  <h3 className="text-sm font-bold text-blue-600 dark:text-[#1f6ea9] uppercase tracking-wider">
                    Financial & Commission Structure
                  </h3>
                </div>
                <Banknote className="w-5 h-5 text-gray-300 dark:text-gray-600" />
              </div>

              {/* Row 1: Commission & Revenue */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
                {/* Sales Commission */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Sales Commission (%)
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      value={form.salesCommission}
                      onChange={(e) => updateField("salesCommission", e.target.value)}
                      placeholder="0.00"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 pr-10"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-400 dark:text-gray-500">
                      %
                    </span>
                  </div>
                </motion.div>

                {/* Rental Commission */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Rental Commission (%)
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      value={form.rentalCommission}
                      onChange={(e) => updateField("rentalCommission", e.target.value)}
                      placeholder="0.00"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 pr-10"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-400 dark:text-gray-500">
                      %
                    </span>
                  </div>
                </motion.div>

                {/* Referral Fee */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Referral Fee (Flat)
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      value={form.referralFee}
                      onChange={(e) => updateField("referralFee", e.target.value)}
                      placeholder="0.00"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 pr-14"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-400 dark:text-gray-500">
                      CHF
                    </span>
                  </div>
                </motion.div>

                {/* Annual Revenue Target */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Annual Revenue Target
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      value={form.annualRevenueTarget}
                      onChange={(e) => updateField("annualRevenueTarget", e.target.value)}
                      placeholder="0"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 pr-14"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-400 dark:text-gray-500">
                      CHF
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Row 2: Payment Terms & IBAN */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                {/* Payment Terms */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Payment Terms
                  </label>
                  <Select 
                    value={form.paymentTerms} 
                    onValueChange={(v) => updateField("paymentTerms", v)}
                  >
                    <SelectTrigger className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
                      <SelectValue placeholder="Select terms" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="net-15">Net 15</SelectItem>
                      <SelectItem value="net-30">Net 30</SelectItem>
                      <SelectItem value="net-45">Net 45</SelectItem>
                      <SelectItem value="net-60">Net 60</SelectItem>
                      <SelectItem value="due-on-receipt">Due on Receipt</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                {/* IBAN for Commission */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    IBAN for Commission
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      value={form.ibanCommission}
                      onChange={(e) => updateField("ibanCommission", e.target.value)}
                      placeholder="CH00 0000 0000 0000 0000 0"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 pr-11"
                    />
                    <Landmark className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </motion.div>
              </div>

              {/* Row 3: Currency & Tax */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                {/* Currency for Payment */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Currency for Payment
                  </label>
                  <div className="flex gap-2">
                    {(["CHF", "EUR", "USD", "GBP"] as const).map((currency) => (
                      <button
                        key={currency}
                        onClick={() => updateField("paymentCurrency", currency)}
                        className={`
                          h-10 px-5 rounded-xl text-sm font-medium transition-all duration-200 border
                          ${form.paymentCurrency === currency
                            ? "bg-blue-50 border-blue-300 text-blue-700 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-300 shadow-sm"
                            : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                          }
                        `}
                      >
                        {currency}
                      </button>
                    ))}
                  </div>
                </motion.div>

                {/* Withholding Tax */}
                <motion.div variants={itemVariants} className="flex items-center gap-4 pt-6 sm:pt-0">
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <Checkbox 
                      checked={form.withholdingTaxApplicable}
                      onCheckedChange={(checked) => updateField("withholdingTaxApplicable", checked === true)}
                      className="rounded-md border-gray-300 dark:border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                      Withholding Tax Applicable
                    </span>
                  </label>
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    Tax registration required
                  </span>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ─── ACTION BUTTONS ─── */}
        <motion.div 
          variants={cardVariants}
          className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2 pb-8"
        >
          <AnimatePresence>
            {savedSuccess && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-4 py-2.5 rounded-xl"
              >
                <CheckCircle2 className="w-4 h-4" />
                Agreement saved successfully
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* <div className="flex gap-3 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              className="flex-1 sm:flex-none rounded-xl h-11 px-8 font-medium border-gray-300 dark:border-gray-600 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              disabled={isSubmitting}
              className="flex-1 sm:flex-none rounded-xl h-11 px-8 font-medium bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transition-all duration-200 disabled:opacity-70"
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
                "Save Agreement"
              )}
            </Button>
          </div> */}
        </motion.div>

      </div>
    </motion.div>
  )
}