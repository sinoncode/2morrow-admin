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
import { 
  FileText, 
  Calendar,
  Clock,
  Link2,
  X,
  CheckCircle2,
  Sparkles
} from "lucide-react"

/* ─────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────── */
interface PartnershipTermsForm {
  partnershipType: string
  partnershipStatus: string
  agreementDocument: File | null
  agreementStartDate: string
  agreementEndDate: string
  exclusivity: "exclusive" | "shared"
  exclusiveGeographicZone: string
  commissionSplitMethod: string
  paymentTerms: string
  primaryTransactionType: "sale" | "rent"
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
export default function PartnershipTerms() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)

  const [form, setForm] = useState<PartnershipTermsForm>({
    partnershipType: "franchise",
    partnershipStatus: "active",
    agreementDocument: null,
    agreementStartDate: "01/01/2024",
    agreementEndDate: "12/31/2026",
    exclusivity: "exclusive",
    exclusiveGeographicZone: "Metropolitan Area North",
    commissionSplitMethod: "Fixed Percentage (80/20)",
    paymentTerms: "net-30",
    primaryTransactionType: "sale"
  })

  const updateField = useCallback(<K extends keyof PartnershipTermsForm>(
    field: K, 
    value: PartnershipTermsForm[K]
  ) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setSavedSuccess(false)
  }, [])

  /* ── File Upload ── */
  const handleFileSelect = (files: FileList | null) => {
    if (files && files[0]) {
      updateField("agreementDocument", files[0])
    }
  }

  const removeFile = () => {
    updateField("agreementDocument", null)
    if (fileInputRef.current) fileInputRef.current.value = ""
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
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                Partnership Terms
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                Define partnership governance, duration, and transaction structures.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ─── TOP ROW: Partnership Terms (left) + Duration (right) ─── */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          
          {/* LEFT: Partnership Terms (3/5) */}
          <motion.div variants={cardVariants} className="xl:col-span-3">
            <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80 h-full">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white">
                      Partnership Terms
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      Define the core governance and operational status
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-5">
                  {/* Row 1: Type + Status */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <motion.div variants={itemVariants} className="space-y-2">
                      <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
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
                          <SelectItem value="franchise">Franchise</SelectItem>
                          <SelectItem value="affiliate">Affiliate</SelectItem>
                          <SelectItem value="strategic">Strategic Alliance</SelectItem>
                          <SelectItem value="referral">Referral Partner</SelectItem>
                        </SelectContent>
                      </Select>
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-2">
                      <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
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
                  </div>

                  {/* Partnership Agreement Signed - File Upload */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Partnership Agreement Signed
                    </label>
                    
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleFileSelect(e.target.files)}
                      className="hidden"
                    />

                    <AnimatePresence mode="wait">
                      {form.agreementDocument ? (
                        <motion.div
                          key="file-selected"
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          className="flex items-center justify-between p-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                              <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                              {form.agreementDocument.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => fileInputRef.current?.click()}
                              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                            >
                              Change File
                            </button>
                            <button
                              onClick={removeFile}
                              className="p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                            >
                              <X className="w-4 h-4 text-gray-400 hover:text-red-500" />
                            </button>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.button
                          key="upload-zone"
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full flex items-center justify-center gap-2 p-3.5 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30 hover:border-blue-400 dark:hover:border-blue-700 hover:bg-blue-50/30 dark:hover:bg-blue-900/20 transition-all duration-200 cursor-pointer"
                        >
                          <FileText className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                            Upload Partnership Agreement
                          </span>
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* RIGHT: Duration (2/5) */}
          <motion.div variants={cardVariants} className="xl:col-span-2">
            <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80 h-full">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white">
                      Duration
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      Lifecycle timeline
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-5">
                  {/* Agreement Start Date */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Agreement Start Date
                    </label>
                    <div className="relative">
                      <Input
                        type="text"
                        value={form.agreementStartDate}
                        onChange={(e) => updateField("agreementStartDate", e.target.value)}
                        placeholder="mm/dd/yyyy"
                        className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 pr-10"
                      />
                      <Calendar className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </motion.div>

                  {/* Agreement End Date */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Agreement End Date
                    </label>
                    <div className="relative">
                      <Input
                        type="text"
                        value={form.agreementEndDate}
                        onChange={(e) => updateField("agreementEndDate", e.target.value)}
                        placeholder="mm/dd/yyyy"
                        className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 pr-10"
                      />
                      <Calendar className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* ─── AGREEMENT SPECIFICS (Full Width) ─── */}
        <motion.div variants={cardVariants}>
          <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">
                    Agreement Specifics
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Detailed contractual obligations and financial splits
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* Exclusivity */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-300 text-center block">
                    Exclusivity
                  </label>
                  <div className="flex rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => updateField("exclusivity", "exclusive")}
                      className={`
                        flex-1 h-10 text-sm font-semibold transition-all duration-200
                        ${form.exclusivity === "exclusive"
                          ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                          : "bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                        }
                      `}
                    >
                      Exclusive
                    </button>
                    <button
                      type="button"
                      onClick={() => updateField("exclusivity", "shared")}
                      className={`
                        flex-1 h-10 text-sm font-semibold transition-all duration-200 border-l border-gray-200 dark:border-gray-700
                        ${form.exclusivity === "shared"
                          ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                          : "bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                        }
                      `}
                    >
                      Shared
                    </button>
                  </div>
                </motion.div>

                {/* Exclusive Geographic Zone */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-300 text-center block">
                    Exclusive Geographic Zone
                  </label>
                  <Input
                    value={form.exclusiveGeographicZone}
                    onChange={(e) => updateField("exclusiveGeographicZone", e.target.value)}
                    placeholder="Enter zone"
                    className="h-10 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-center text-sm"
                  />
                </motion.div>

                {/* Commission Split Method */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-300 text-center block">
                    Commission Split Method
                  </label>
                  <div className="relative">
                    <Input
                      value={form.commissionSplitMethod}
                      onChange={(e) => updateField("commissionSplitMethod", e.target.value)}
                      placeholder="Enter split"
                      className="h-10 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-center text-sm pr-8"
                    />
                    <Link2 className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>
                </motion.div>

                {/* Payment Terms */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-300 text-center block">
                    Payment Terms
                  </label>
                  <Select 
                    value={form.paymentTerms} 
                    onValueChange={(v) => updateField("paymentTerms", v)}
                  >
                    <SelectTrigger className="h-10 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
                      <SelectValue placeholder="Select terms" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="net-15">Net 15</SelectItem>
                      <SelectItem value="net-30">Net 30</SelectItem>
                      <SelectItem value="net-45">Net 45</SelectItem>
                      <SelectItem value="net-60">Net 60</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ─── PRIMARY TRANSACTION TYPE (Full Width) ─── */}
        <motion.div variants={cardVariants}>
          <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white">
                      Primary Transaction Type
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      This determines the fee structure applied across the portal.
                    </p>
                  </div>
                </div>

                <div className="flex rounded-full border border-gray-200 dark:border-gray-700 overflow-hidden bg-gray-50 dark:bg-gray-800/50 p-1">
                  <button
                    type="button"
                    onClick={() => updateField("primaryTransactionType", "sale")}
                    className={`
                      h-9 px-8 rounded-full text-sm font-semibold transition-all duration-200
                      ${form.primaryTransactionType === "sale"
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                      }
                    `}
                  >
                    Sale
                  </button>
                  <button
                    type="button"
                    onClick={() => updateField("primaryTransactionType", "rent")}
                    className={`
                      h-9 px-8 rounded-full text-sm font-semibold transition-all duration-200
                      ${form.primaryTransactionType === "rent"
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                      }
                    `}
                  >
                    Rent
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ─── ACTION BUTTONS ─── */}
        {/* <motion.div 
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
                Partnership terms saved
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="flex gap-3 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              className="flex-1 sm:flex-none rounded-xl h-11 px-8 font-medium border-gray-300 dark:border-gray-600 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
            >
              Discard
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
                "Save Terms"
              )}
            </Button>
          </div>
        </motion.div> */}

      </div>
    </motion.div>
  )
}