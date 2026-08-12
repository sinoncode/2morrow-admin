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
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { 
  FileText, 
  Landmark, 
  Calendar,
  CheckCircle2,
  Sparkles,
  Download,
  ExternalLink,
  ShieldCheck,
  Clock
} from "lucide-react"

/* ─────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────── */
interface ReferralForm {
  companyName: string
  referralFeeType: string
  referralFeeRate: string
  referralFeeModel: string
  agreementSignedDate: string
  paymentTerms: string
  ibanPayment: string
  hourlyRate: string
  volumeDiscount: string
  retainerDescription: string
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
export default function ReferralFeeAgreement() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)

  const [form, setForm] = useState<ReferralForm>({
    companyName: "2MORROW Real Estate Global",
    referralFeeType: "home-referral",
    referralFeeRate: "0.00",
    referralFeeModel: "percentage-based",
    agreementSignedDate: "",
    paymentTerms: "net-30",
    ibanPayment: "GB89 3704 0044 0532 0130 00",
    hourlyRate: "",
    volumeDiscount: "",
    retainerDescription: ""
  })

  const updateField = useCallback(<K extends keyof ReferralForm>(
    field: K, 
    value: ReferralForm[K]
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
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                Referral Fee Agreement
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                Manage referral fee structures, payment terms, and agreement documentation.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ─── MAIN GRID: Form (left, wider) + Status (right, narrower) ─── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* LEFT COLUMN (Form) */}
          <div className="xl:col-span-2">
            <motion.div variants={cardVariants}>
              <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80">
                <CardContent className="p-0">
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between px-6 sm:px-8 pt-6 sm:pt-8 pb-6 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <h3 className="text-base font-bold text-gray-900 dark:text-white">
                        Referral Fee Agreement
                      </h3>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-0 font-semibold text-[10px] uppercase tracking-wider px-3 py-1"
                    >
                      Draft Mode
                    </Badge>
                  </div>

                  {/* Form Body */}
                  <div className="px-6 sm:px-8 py-6 space-y-5">
                    
                    {/* Row 1 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Company Name */}
                      <motion.div variants={itemVariants} className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Company Name
                        </label>
                        <Input
                          value={form.companyName}
                          onChange={(e) => updateField("companyName", e.target.value)}
                          placeholder="Enter company name"
                          className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        />
                      </motion.div>

                      {/* Referral Fee Type */}
                      <motion.div variants={itemVariants} className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Referral Fee Type
                        </label>
                        <Select 
                          value={form.referralFeeType} 
                          onValueChange={(v) => updateField("referralFeeType", v)}
                        >
                          <SelectTrigger className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
                            <SelectValue placeholder="Select fee type" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            <SelectItem value="home-referral">Home Referral</SelectItem>
                            <SelectItem value="commercial-referral">Commercial Referral</SelectItem>
                            <SelectItem value="land-referral">Land Referral</SelectItem>
                            <SelectItem value="investment-referral">Investment Referral</SelectItem>
                          </SelectContent>
                        </Select>
                      </motion.div>
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Referral Fee Rate */}
                      <motion.div variants={itemVariants} className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Referral Fee Rate (%)
                        </label>
                        <Input
                          type="text"
                          value={form.referralFeeRate}
                          onChange={(e) => updateField("referralFeeRate", e.target.value)}
                          placeholder="0.00"
                          className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        />
                      </motion.div>

                      {/* Referral Fee Model */}
                      <motion.div variants={itemVariants} className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Referral Fee Model
                        </label>
                        <Select 
                          value={form.referralFeeModel} 
                          onValueChange={(v) => updateField("referralFeeModel", v)}
                        >
                          <SelectTrigger className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
                            <SelectValue placeholder="Select model" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            <SelectItem value="percentage-based">Percentage-based</SelectItem>
                            <SelectItem value="flat-fee">Flat Fee</SelectItem>
                            <SelectItem value="tiered">Tiered Structure</SelectItem>
                            <SelectItem value="hybrid">Hybrid Model</SelectItem>
                          </SelectContent>
                        </Select>
                      </motion.div>
                    </div>

                    {/* Row 3 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Agreement Signed Date */}
                      <motion.div variants={itemVariants} className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Agreement Signed Date
                        </label>
                        <div className="relative">
                          <Input
                            type="text"
                            value={form.agreementSignedDate}
                            onChange={(e) => updateField("agreementSignedDate", e.target.value)}
                            placeholder="mm/dd/yyyy"
                            className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 pl-10"
                          />
                          <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        </div>
                      </motion.div>

                      {/* Payment Terms */}
                      <motion.div variants={itemVariants} className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
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
                    </div>

                    {/* IBAN for Payment (Full Width) */}
                    <motion.div variants={itemVariants} className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        IBAN for Payment
                      </label>
                      <div className="relative">
                        <Input
                          type="text"
                          value={form.ibanPayment}
                          onChange={(e) => updateField("ibanPayment", e.target.value)}
                          placeholder="Enter IBAN"
                          className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 pl-11"
                        />
                        <Landmark className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      </div>
                    </motion.div>

                    {/* Row 4 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Hourly Rate / Fee Schedule */}
                      <motion.div variants={itemVariants} className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Hourly Rate / Fee Schedule
                        </label>
                        <Input
                          value={form.hourlyRate}
                          onChange={(e) => updateField("hourlyRate", e.target.value)}
                          placeholder="e.g., £250/hr for consultancy"
                          className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        />
                      </motion.div>

                      {/* Volume Discount Agreement */}
                      <motion.div variants={itemVariants} className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Volume Discount Agreement
                        </label>
                        <Input
                          value={form.volumeDiscount}
                          onChange={(e) => updateField("volumeDiscount", e.target.value)}
                          placeholder="Enter zip code or reference code"
                          className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        />
                      </motion.div>
                    </div>

                    {/* Retainer Agreement Description */}
                    <motion.div variants={itemVariants} className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Retainer Agreement Description
                      </label>
                      <Textarea
                        value={form.retainerDescription}
                        onChange={(e) => updateField("retainerDescription", e.target.value)}
                        placeholder="Describe the terms of the monthly retainer if applicable..."
                        rows={4}
                        className="rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 resize-none"
                      />
                    </motion.div>
                  </div>

                  {/* Card Footer */}
                  {/* <div className="px-6 sm:px-8 py-5 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-end gap-3">
                    <AnimatePresence>
                      {savedSuccess && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-xl"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          Agreement saved successfully
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    <Button
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
                        "Save Agreement"
                      )}
                    </Button>
                  </div> */}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* RIGHT COLUMN (Status Sidebar) */}
          <div className="xl:col-span-1 space-y-6">
            
            {/* Agreement Status Card */}
            <motion.div variants={cardVariants}>
              <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80">
                <CardContent className="p-6">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-5">
                    Agreement Status
                  </h3>

                  {/* Compliance Verified */}
                  <motion.div 
                    variants={itemVariants}
                    className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 mb-5"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                          Compliance Verified
                        </span>
                      </div>
                      <span className="text-sm font-bold text-blue-700 dark:text-blue-300">
                        98%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-blue-200 dark:bg-blue-800/50 overflow-hidden">
                      <motion.div 
                        className="h-full rounded-full bg-blue-600 dark:bg-blue-400"
                        initial={{ width: 0 }}
                        animate={{ width: "98%" }}
                        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                      />
                    </div>
                  </motion.div>

                  {/* Last Revision */}
                  <motion.div variants={itemVariants} className="mb-5">
                    <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
                      Last Revision
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-700 dark:text-blue-300 text-xs font-bold">
                        JD
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          Jane Doe
                        </p>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          <Clock className="w-3 h-3" />
                          <span>2 days ago</span>
                          <span className="text-gray-300 dark:text-gray-600">•</span>
                          <span>Legal Review</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Divider */}
                  <div className="h-px bg-gray-100 dark:bg-gray-800 mb-5" />

                  {/* Linked Documents */}
                  <motion.div variants={itemVariants}>
                    <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
                      Linked Documents
                    </p>
                    <div className="space-y-3">
                      {/* Document 1 */}
                      <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors duration-200 group cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                            <FileText className="w-4 h-4 text-red-500 dark:text-red-400" />
                          </div>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                            Referral_T&C_v4.pdf
                          </span>
                        </div>
                        <Download className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                      </div>

                      {/* Document 2 */}
                      <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors duration-200 group cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <FileText className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                          </div>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                            Onboarding_Checklist
                          </span>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                      </div>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

      </div>
    </motion.div>
  )
}