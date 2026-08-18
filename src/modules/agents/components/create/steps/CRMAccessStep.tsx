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
  DollarSign, 
  ShieldAlert, 
  Landmark,
  Car,
  Clock,
  Landmark as BankIcon,
  Pencil,
  CheckCircle2,
  Sparkles,
  History
} from "lucide-react"

/* ─────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────── */
interface CompensationForm {
  baseSalary: string
  commissionStructure: string
  salesCommission: string
  rentalsCommission: string
  commissionTiers: string
  coAgentSplit: string
  socialSecurityNumber: string
  pensionFund: string
  healthInsurance: string
  paymentFrequency: "monthly" | "bi-weekly"
  carAllowance: string
  expenseAccount: string
  thirteenthMonthEligible: boolean
  annualBonusStructure: string
}

/* ─────────────────────────────────────────────────────────────
   ANIMATION VARIANTS
   ───────────────────────────────────────────────────────────── */
const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
}

const cardVariants: any = {
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

const itemVariants: any = {
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
export default function CompensationOverview() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)

  const [form, setForm] = useState<CompensationForm>({
    baseSalary: "CHF 5,500.00 / mo",
    commissionStructure: "standard-corporate",
    salesCommission: "3.50",
    rentalsCommission: "1.00",
    commissionTiers: "accelerated",
    coAgentSplit: "50 / 50",
    socialSecurityNumber: "756.1234.5678.90",
    pensionFund: "allianz-swiss",
    healthInsurance: "CHF 150.00 / mo",
    paymentFrequency: "monthly",
    carAllowance: "CHF 800.00 - Business Usage",
    expenseAccount: "uncapped",
    thirteenthMonthEligible: true,
    annualBonusStructure: "Performance Linked (Up to 15%)"
  })

  const updateField = useCallback(<K extends keyof CompensationForm>(
    field: K, 
    value: CompensationForm[K]
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
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                Compensation Overview
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                Manage salary structures, commissions, benefits, and compliance details.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ─── TOP ROW: Compensation (left) + Compliance (right) ─── */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          
          {/* LEFT: Compensation Overview (3/5) */}
          <motion.div variants={cardVariants} className="xl:col-span-3">
            <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80 h-full">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                    <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">
                    Compensation Overview
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Base Salary */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Base Salary
                    </label>
                    <Input
                      value={form.baseSalary}
                      onChange={(e) => updateField("baseSalary", e.target.value)}
                      placeholder="CHF 0.00 / mo"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </motion.div>

                  {/* Commission Structure */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Commission Structure
                    </label>
                    <Select 
                      value={form.commissionStructure} 
                      onValueChange={(v) => updateField("commissionStructure", v)}
                    >
                      <SelectTrigger className="h-11 rounded-xl border-gray-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
                        <SelectValue placeholder="Select structure" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="standard-corporate">Standard Corporate Plan</SelectItem>
                        <SelectItem value="premium">Premium Plan</SelectItem>
                        <SelectItem value="executive">Executive Plan</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  {/* Sales Commission (%) */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Sales Commission (%)
                    </label>
                    <Input
                      value={form.salesCommission}
                      onChange={(e) => updateField("salesCommission", e.target.value)}
                      placeholder="0.00"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </motion.div>

                  {/* Rentals Commission (%) */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Rentals Commission (%)
                    </label>
                    <Input
                      value={form.rentalsCommission}
                      onChange={(e) => updateField("rentalsCommission", e.target.value)}
                      placeholder="0.00"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </motion.div>

                  {/* Commission Tiers */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Commission Tiers
                    </label>
                    <Select 
                      value={form.commissionTiers} 
                      onValueChange={(v) => updateField("commissionTiers", v)}
                    >
                      <SelectTrigger className="h-11 rounded-xl border-gray-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
                        <SelectValue placeholder="Select tier" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="accelerated">Accelerated (Volume Based)</SelectItem>
                        <SelectItem value="flat">Flat Rate</SelectItem>
                        <SelectItem value="tiered">Tiered Structure</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  {/* Co-agent Split (%) */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Co-agent Split (%)
                    </label>
                    <Input
                      value={form.coAgentSplit}
                      onChange={(e) => updateField("coAgentSplit", e.target.value)}
                      placeholder="50 / 50"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </motion.div>
 </div>
               
              </CardContent>
            </Card>
            
          </motion.div>

          {/* RIGHT: Compliance (2/5) */}
          <motion.div variants={cardVariants} className="xl:col-span-2">
            <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80 h-full">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center shrink-0">
                    <ShieldAlert className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">
                    Compliance
                  </h3>
                </div>

                <div className="space-y-5">
                  {/* Social Security / AVS Number */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Social Security / AVS Number
                    </label>
                    <Input
                      value={form.socialSecurityNumber}
                      onChange={(e) => updateField("socialSecurityNumber", e.target.value)}
                      placeholder="000.0000.0000.00"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </motion.div>

                  {/* Pension Fund (LPP) */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Pension Fund (LPP)
                    </label>
                    <Select 
                      value={form.pensionFund} 
                      onValueChange={(v) => updateField("pensionFund", v)}
                    >
                      <SelectTrigger className="h-11 rounded-xl border-gray-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
                        <SelectValue placeholder="Select fund" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="allianz-swiss">Allianz Swiss (Classic)</SelectItem>
                        <SelectItem value="zurich">Zurich Insurance</SelectItem>
                        <SelectItem value="axa">AXA</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  {/* Health Insurance Contribution */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Health Insurance Contribution
                    </label>
                    <Input
                      value={form.healthInsurance}
                      onChange={(e) => updateField("healthInsurance", e.target.value)}
                      placeholder="CHF 0.00 / mo"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </motion.div>

                  {/* Payment Frequency */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Payment Frequency
                    </label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => updateField("paymentFrequency", "monthly")}
                        className={`
                          h-9 px-6 rounded-lg text-xs font-bold transition-all duration-200
                          ${form.paymentFrequency === "monthly"
                            ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                          }
                        `}
                      >
                        Monthly
                      </button>
                      <button
                        type="button"
                        onClick={() => updateField("paymentFrequency", "bi-weekly")}
                        className={`
                          h-9 px-6 rounded-lg text-xs font-bold transition-all duration-200
                          ${form.paymentFrequency === "bi-weekly"
                            ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                          }
                        `}
                      >
                        Bi-Weekly
                      </button>
                    </div>
                  </motion.div>

                  {/* Primary Bank Account */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                        Primary Bank Account
                      </label>
                      <button className="flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                        <Pencil className="w-3 h-3" />
                        Edit
                      </button>
                    </div>
                    <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800/30">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                          <BankIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
                            UBS Switzerland AG
                          </p>
                          <p className="text-[10px] text-gray-400 dark:text-gray-500 font-mono mt-0.5">
                            CH93 8080 8000 8012 3456 7
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* ─── ADDITIONAL BENEFITS (Full Width) ─── */}
        <motion.div variants={cardVariants}>
          <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center shrink-0">
                  <Car className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Additional Benefits
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Car Allowance / Vehicle */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                    Car Allowance / Vehicle
                  </label>
                  <Input
                    value={form.carAllowance}
                    onChange={(e) => updateField("carAllowance", e.target.value)}
                    placeholder="Enter allowance"
                    className="h-11 rounded-xl border-gray-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  />
                </motion.div>

                {/* Expense Account */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                    Expense Account
                  </label>
                  <Select 
                    value={form.expenseAccount} 
                    onValueChange={(v) => updateField("expenseAccount", v)}
                  >
                    <SelectTrigger className="h-11 rounded-xl border-gray-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="uncapped">Uncapped (Approval required)</SelectItem>
                      <SelectItem value="capped-1k">Capped at CHF 1,000</SelectItem>
                      <SelectItem value="capped-5k">Capped at CHF 5,000</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                {/* 13th Month Salary */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                    13th Month Salary
                  </label>
                  <div className="flex items-center justify-between p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800/30">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      Eligibility Status
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                      <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                        Eligible
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Annual Bonus Structure */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                    Annual Bonus Structure
                  </label>
                  <Input
                    value={form.annualBonusStructure}
                    onChange={(e) => updateField("annualBonusStructure", e.target.value)}
                    placeholder="Enter bonus structure"
                    className="h-11 rounded-xl border-gray-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  />
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ─── ACTION BUTTONS ─── */}
        <motion.div 
          variants={cardVariants}
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 pb-8"
        >
          <div className="flex gap-3 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              className="flex-1 sm:flex-none rounded-xl h-11 px-6 font-medium border-gray-300 dark:border-gray-600 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
            >
              Discard Changes
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1 sm:flex-none rounded-xl h-11 px-6 font-medium border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
            >
              <History className="w-4 h-4 mr-2" />
              View Revision History
            </Button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <AnimatePresence>
              {savedSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-xl"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Plan saved successfully
                </motion.div>
              )}
            </AnimatePresence>
            
            <Button
              type="button"
              onClick={handleSave}
              disabled={isSubmitting}
              className="flex-1 sm:flex-none rounded-xl h-11 px-6 font-medium bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transition-all duration-200 disabled:opacity-70"
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
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Save Compensation Plan
                </span>
              )}
            </Button>
          </div>
        </motion.div>

      </div>
    </motion.div>
  )
}