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
import { 
  Info, 
  Link2, 
  Settings, 
  FileText, 
  BarChart3,
  CheckCircle2,
  Sparkles
} from "lucide-react"

/* ─────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────── */
interface CompanyInfoForm {
  companyName: string
  individualOrFirm: string
  companyRegistrationNo: string
  vatUidNumber: string
  professionalLicenceNo: string
  regulatedBody: string
  officeAddressLine1: string
  officeAddressLine2: string
  zipCode: string
  city: string
  country: string
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

const statCardVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.4 + i * 0.1,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  })
}

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────────── */
export default function CompanyProfessionalInformation() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)
  const [lastSaved, setLastSaved] = useState("2 minutes ago")

  const [form, setForm] = useState<CompanyInfoForm>({
    companyName: "",
    individualOrFirm: "firm",
    companyRegistrationNo: "",
    vatUidNumber: "",
    professionalLicenceNo: "",
    regulatedBody: "",
    officeAddressLine1: "",
    officeAddressLine2: "",
    zipCode: "",
    city: "",
    country: "us"
  })

  const updateField = useCallback(<K extends keyof CompanyInfoForm>(
    field: K, 
    value: CompanyInfoForm[K]
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
    setLastSaved("just now")
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
              <Info className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                Company & Professional Information
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                Please provide the legal registration details for your agency partner.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ─── MAIN FORM CARD ─── */}
        <motion.div variants={cardVariants}>
          <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80">
            <CardContent className="p-0">
              
              {/* Card Header */}
              <div className="flex items-center gap-2.5 px-6 sm:px-8 pt-6 sm:pt-8 pb-1">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-base font-bold text-blue-600 dark:text-blue-400">
                  Company & Professional Information
                </h3>
              </div>
              <p className="px-6 sm:px-8 text-xs text-gray-400 dark:text-gray-500 pb-6">
                Please provide the legal registration details for your agency partner.
              </p>

              {/* Form Body */}
              <div className="px-6 sm:px-8 pb-6 space-y-6">
                
                {/* Row 1: Registration Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {/* Company Name */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      value={form.companyName}
                      onChange={(e) => updateField("companyName", e.target.value)}
                      placeholder="e.g. 2Morrow Real Estate Ltd"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </motion.div>

                  {/* Individual or Firm */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Individual or Firm <span className="text-red-500">*</span>
                    </label>
                    <Select 
                      value={form.individualOrFirm} 
                      onValueChange={(v) => updateField("individualOrFirm", v)}
                    >
                      <SelectTrigger className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="firm">Firm</SelectItem>
                        <SelectItem value="individual">Individual</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="llc">LLC</SelectItem>
                        <SelectItem value="corporation">Corporation</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  {/* Company Registration No */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Company Registration No
                    </label>
                    <Input
                      value={form.companyRegistrationNo}
                      onChange={(e) => updateField("companyRegistrationNo", e.target.value)}
                      placeholder="REG-12345678"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </motion.div>

                  {/* VAT / UID Number */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      VAT / UID Number
                    </label>
                    <Input
                      value={form.vatUidNumber}
                      onChange={(e) => updateField("vatUidNumber", e.target.value)}
                      placeholder="VAT-987-654"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </motion.div>

                  {/* Professional Licence No */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Professional Licence No. <span className="text-red-500">*</span>
                    </label>
                    <Input
                      value={form.professionalLicenceNo}
                      onChange={(e) => updateField("professionalLicenceNo", e.target.value)}
                      placeholder="LIC-000-XYZ"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </motion.div>

                  {/* Regulated Body */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking tracking-wider leading-tight">
                      Regulated Body / Supervisory Authority
                    </label>
                    <Input
                      value={form.regulatedBody}
                      onChange={(e) => updateField("regulatedBody", e.target.value)}
                      placeholder="State Real Estate Authority"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </motion.div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-100 dark:bg-gray-800" />

                {/* Row 2: Office Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {/* Office Address Line 1 */}
                  <motion.div variants={itemVariants} className="sm:col-span-2 lg:col-span-1 space-y-2">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Office Address — Line 1 <span className="text-red-500">*</span>
                    </label>
                    <Input
                      value={form.officeAddressLine1}
                      onChange={(e) => updateField("officeAddressLine1", e.target.value)}
                      placeholder="Street name, Building No, Office Suite"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </motion.div>

                  {/* Office Address Line 2 */}
                  <motion.div variants={itemVariants} className="sm:col-span-2 lg:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Office Address — Line 2
                    </label>
                    <Input
                      value={form.officeAddressLine2}
                      onChange={(e) => updateField("officeAddressLine2", e.target.value)}
                      placeholder="Secondary Address Info"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </motion.div>

                  {/* Zip Code */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Zip Code <span className="text-red-500">*</span>
                    </label>
                    <Input
                      value={form.zipCode}
                      onChange={(e) => updateField("zipCode", e.target.value)}
                      placeholder="e.g. 10001"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </motion.div>

                  {/* City */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      City <span className="text-red-500">*</span>
                    </label>
                    <Input
                      value={form.city}
                      onChange={(e) => updateField("city", e.target.value)}
                      placeholder="Select or type city"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </motion.div>

                  {/* Country */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <Select 
                      value={form.country} 
                      onValueChange={(v) => updateField("country", v)}
                    >
                      <SelectTrigger className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl max-h-60">
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="ch">Switzerland</SelectItem>
                        <SelectItem value="de">Germany</SelectItem>
                        <SelectItem value="fr">France</SelectItem>
                        <SelectItem value="it">Italy</SelectItem>
                        <SelectItem value="es">Spain</SelectItem>
                        <SelectItem value="ae">UAE</SelectItem>
                        <SelectItem value="sg">Singapore</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 sm:px-8 py-5 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
                  <Link2 className="w-3.5 h-3.5" />
                  Last saved {lastSaved}
                </div>
                
                <div className="flex items-center gap-3">
                  <AnimatePresence>
                    {savedSuccess && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-xl"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Updated successfully
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* <Button
                    type="button"
                    variant="ghost"
                    className="h-10 px-6 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                  >
                    Discard
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
                      "Update Details"
                    )}
                  </Button> */}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ─── BOTTOM STATS CARDS ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Compliance Status */}
          <motion.div
            custom={0}
            variants={statCardVariants}
            initial="hidden"
            animate="visible"
          >
            <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80 hover:shadow-md dark:hover:shadow-none transition-shadow duration-300">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                  <Settings className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Compliance Status
                  </p>
                  <p className="text-base font-bold text-gray-900 dark:text-white mt-0.5">
                    Verified Partner
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Shared Assets */}
          <motion.div
            custom={1}
            variants={statCardVariants}
            initial="hidden"
            animate="visible"
          >
            <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80 hover:shadow-md dark:hover:shadow-none transition-shadow duration-300">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Shared Assets
                  </p>
                  <p className="text-base font-bold text-gray-900 dark:text-white mt-0.5">
                    14 Documents
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Annual Revenue */}
          <motion.div
            custom={2}
            variants={statCardVariants}
            initial="hidden"
            animate="visible"
          >
            <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80 hover:shadow-md dark:hover:shadow-none transition-shadow duration-300">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center shrink-0">
                  <BarChart3 className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Annual Revenue
                  </p>
                  <p className="text-base font-bold text-gray-900 dark:text-white mt-0.5">
                    $1.2M Target
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

      </div>
    </motion.div>
  )
}