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
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { 
  Users, 
  Heart, 
  FileText, 
  Calendar,
  AlertTriangle,
  Sparkles,
  Gift,
  Star,
  CheckCircle2,
  Plus
} from "lucide-react"

/* ─────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────── */
interface EngagementForm {
  referralsReceived: string
  referralsSent: string
  totalFeesPaid: string
  totalFeesReceived: string
  transactionsInvolving: string
  transactionsSupported: string
  lastInteractionDate: string
  nextPlannedMeeting: string
  exclusiveAgreement: boolean
  linkedInConnected: string
  feedbackNotes: string
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
export default function PartnerEngagementDetails() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)

  const [form, setForm] = useState<EngagementForm>({
    referralsReceived: "",
    referralsSent: "Home",
    totalFeesPaid: "",
    totalFeesReceived: "",
    transactionsInvolving: "",
    transactionsSupported: "",
    lastInteractionDate: "",
    nextPlannedMeeting: "",
    exclusiveAgreement: false,
    linkedInConnected: "not-connected",
    feedbackNotes: ""
  })

  const updateField = useCallback(<K extends keyof EngagementForm>(
    field: K, 
    value: EngagementForm[K]
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
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                Partner Engagement Details
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                Track partner interactions, sentiment, and engagement history.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ─── MAIN GRID ─── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* LEFT COLUMN (2/3) */}
          <div className="xl:col-span-2 space-y-6">
            
            {/* ─── PARTNER ENGAGEMENT DETAILS ─── */}
            <motion.div variants={cardVariants}>
              <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80">
                <CardContent className="p-0">
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between px-6 sm:px-8 pt-6 sm:pt-8 pb-6 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-2.5">
                      <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <h3 className="text-base font-bold text-gray-900 dark:text-white">
                        Partner Engagement Details
                      </h3>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-0 font-semibold text-[10px] uppercase tracking-wider px-3 py-1"
                    >
                      Updated 2h ago
                    </Badge>
                  </div>

                  {/* Form Body */}
                  <div className="px-6 sm:px-8 py-6 space-y-5">
                    
                    {/* Row 1 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <motion.div variants={itemVariants} className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Referrals Received from Partner
                        </label>
                        <Input
                          value={form.referralsReceived}
                          onChange={(e) => updateField("referralsReceived", e.target.value)}
                          placeholder="Enter company name"
                          className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        />
                      </motion.div>

                      <motion.div variants={itemVariants} className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Referrals Sent to Partner
                        </label>
                        <Input
                          value={form.referralsSent}
                          onChange={(e) => updateField("referralsSent", e.target.value)}
                          placeholder="Home"
                          className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        />
                      </motion.div>
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <motion.div variants={itemVariants} className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Total Referral Fees Paid
                        </label>
                        <Input
                          value={form.totalFeesPaid}
                          onChange={(e) => updateField("totalFeesPaid", e.target.value)}
                          placeholder="Select range"
                          className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        />
                      </motion.div>

                      <motion.div variants={itemVariants} className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Total Referral Fees Received
                        </label>
                        <Input
                          value={form.totalFeesReceived}
                          onChange={(e) => updateField("totalFeesReceived", e.target.value)}
                          placeholder="Select range"
                          className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        />
                      </motion.div>
                    </div>

                    {/* Row 3 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <motion.div variants={itemVariants} className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Transactions Involving
                        </label>
                        <Input
                          value={form.transactionsInvolving}
                          onChange={(e) => updateField("transactionsInvolving", e.target.value)}
                          placeholder="Project name or ID"
                          className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        />
                      </motion.div>

                      <motion.div variants={itemVariants} className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Transactions Supported
                        </label>
                        <Input
                          value={form.transactionsSupported}
                          onChange={(e) => updateField("transactionsSupported", e.target.value)}
                          placeholder="Role or assistance type"
                          className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        />
                      </motion.div>
                    </div>

                    {/* Row 4: Dates */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <motion.div variants={itemVariants} className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Last Interaction Date
                        </label>
                        <div className="relative">
                          <Input
                            type="text"
                            value={form.lastInteractionDate}
                            onChange={(e) => updateField("lastInteractionDate", e.target.value)}
                            placeholder="mm/dd/yyyy"
                            className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 pr-10"
                          />
                          <Calendar className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                        </div>
                      </motion.div>

                      <motion.div variants={itemVariants} className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Next Planned Meeting
                        </label>
                        <div className="relative">
                          <Input
                            type="text"
                            value={form.nextPlannedMeeting}
                            onChange={(e) => updateField("nextPlannedMeeting", e.target.value)}
                            placeholder="mm/dd/yyyy"
                            className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 pr-10"
                          />
                          <Calendar className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* ─── AGREEMENTS & LEGAL ─── */}
            <motion.div variants={cardVariants}>
              <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center gap-2.5 mb-6">
                    <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                      Agreements & Legal
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Exclusive Referral Agreement */}
                    <motion.div variants={itemVariants}>
                      <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 block">
                        Exclusive Referral Agreement
                      </label>
                      <label className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-800/20 hover:bg-gray-50 dark:hover:bg-gray-800/40 cursor-pointer transition-colors duration-200">
                        <Checkbox 
                          checked={form.exclusiveAgreement}
                          onCheckedChange={(checked) => updateField("exclusiveAgreement", checked === true)}
                          className="rounded-md border-gray-300 dark:border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200 select-none">
                          Active agreement in place
                        </span>
                      </label>
                    </motion.div>

                    {/* LinkedIn Connected */}
                    <motion.div variants={itemVariants} className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        LinkedIn Connected
                      </label>
                      <Select 
                        value={form.linkedInConnected} 
                        onValueChange={(v) => updateField("linkedInConnected", v)}
                      >
                        <SelectTrigger className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectItem value="not-connected">Not Connected</SelectItem>
                          <SelectItem value="connected">Connected</SelectItem>
                          <SelectItem value="pending">Pending Request</SelectItem>
                        </SelectContent>
                      </Select>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* RIGHT COLUMN (1/3) */}
          <div className="xl:col-span-1 space-y-6">
            
            {/* ─── SENTIMENT ANALYSIS ─── */}
            <motion.div variants={cardVariants}>
              <Card className="border-0 shadow-lg shadow-blue-900/20 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-900">
                <CardContent className="p-6 text-white">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-blue-100" />
                      <h3 className="text-sm font-bold text-blue-50">
                        Sentiment Analysis
                      </h3>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-white">Excellent</p>
                    </div>
                  </div>

                  {/* Relationship Quality */}
                  <div className="mb-5">
                    <p className="text-xs text-blue-100 font-medium mb-2">Relationship Quality</p>
                    <div className="h-2 rounded-full bg-blue-800/40 overflow-hidden">
                      <motion.div 
                        className="h-full rounded-full bg-white/90"
                        initial={{ width: 0 }}
                        animate={{ width: "92%" }}
                        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  {/* Net Promoter Score */}
                  <div>
                    <p className="text-xs text-blue-100 font-medium mb-2">Net Promoter Score</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 flex gap-1">
                        {[...Array(10)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scaleY: 0 }}
                            animate={{ opacity: 1, scaleY: 1 }}
                            transition={{ delay: 0.7 + i * 0.05, duration: 0.3 }}
                            className={`
                              flex-1 h-2 rounded-full origin-bottom
                              ${i < 9 ? "bg-white/30" : "bg-white"}
                            `}
                          />
                        ))}
                      </div>
                      <span className="text-lg font-bold text-white ml-2">9/10</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* ─── FEEDBACK & ISSUES ─── */}
            <motion.div variants={cardVariants}>
              <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80">
                <CardContent className="p-6 space-y-5">
                  
                  {/* Feedback / Review Notes */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Feedback / Review Notes
                      </label>
                    </div>
                    <Textarea
                      value={form.feedbackNotes}
                      onChange={(e) => updateField("feedbackNotes", e.target.value)}
                      placeholder="Add summary of latest feedback..."
                      rows={3}
                      className="rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 resize-none text-sm"
                    />
                  </motion.div>

                  <div className="h-px bg-gray-100 dark:bg-gray-800" />

                  {/* Issues Log */}
                  <motion.div variants={itemVariants} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                      <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Issues Log
                      </label>
                    </div>

                    {/* Issue Item */}
                    <div className="p-3.5 rounded-xl border border-red-100 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10">
                      <p className="text-sm font-semibold text-red-600 dark:text-red-400">
                        Payment delay on Project X
                      </p>
                      <p className="text-xs text-red-400 dark:text-red-500 mt-1">
                        Opened Mar 12, 2024
                      </p>
                    </div>

                    {/* Log New Issue */}
                    <button className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:border-blue-400 dark:hover:border-blue-700 hover:bg-blue-50/30 dark:hover:bg-blue-900/20 transition-all duration-200">
                      <Plus className="w-4 h-4" />
                      LOG NEW ISSUE
                    </button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* ─── ENGAGEMENT HISTORY ─── */}
            <motion.div variants={cardVariants}>
              <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80">
                <CardContent className="p-6">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-5">
                    Engagement History
                  </h3>

                  <div className="space-y-4">
                    {/* Event 1 */}
                    <motion.div 
                      variants={itemVariants}
                      className="flex items-start gap-3"
                    >
                      <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          Events Attended Together
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          Annual Real Estate Gala 2023
                        </p>
                      </div>
                    </motion.div>

                    {/* Event 2 */}
                    <motion.div 
                      variants={itemVariants}
                      className="flex items-start gap-3"
                    >
                      <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Gift className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          Christmas / VIP Gift Sent
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          Premium Wine Set - Dec 15
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

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
                Engagement details saved
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
                "Save Details"
              )}
            </Button>
          </div>
        </motion.div> */}

      </div>
    </motion.div>
  )
}