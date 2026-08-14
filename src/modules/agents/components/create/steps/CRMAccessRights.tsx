"use client"

import React, { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Card, 
  CardContent 
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { 
  ArrowLeftRight,
  ArrowRightLeft,
  Handshake,
  Building2,
  Shield,
  Network,
  Star,
  Calendar,
  CheckCircle2,
  Sparkles
} from "lucide-react"

/* ─────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────── */
interface RelationshipForm {
  relationshipNotes: string
  issuesComplaints: string
  annualReviewDate: string
  activeTab: "notes" | "history"
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

const progressVariants = {
  hidden: { width: 0 },
  visible: (width: string) => ({
    width,
    transition: {
      duration: 1.2,
      delay: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  })
}

const statCardVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.3 + i * 0.08,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  })
}

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────────── */
export default function RelationshipManagement() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)

  const [form, setForm] = useState<RelationshipForm>({
    relationshipNotes: "",
    issuesComplaints: "",
    annualReviewDate: "",
    activeTab: "notes"
  })

  const updateField = useCallback(<K extends keyof RelationshipForm>(
    field: K, 
    value: RelationshipForm[K]
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

  /* ── Star Rating ── */
  const renderStars = (filled: number) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= filled
              ? "text-amber-500 fill-amber-500"
              : "text-gray-300 dark:text-gray-600 fill-gray-300 dark:fill-gray-600"
          }`}
        />
      ))}
    </div>
  )

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
              <Handshake className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                Relationship Management
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                Track partner performance, financial metrics, and collaboration health.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ─── TOP STATS ROW ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Referrals Sent to Us */}
          <motion.div
            custom={0}
            variants={statCardVariants}
            initial="hidden"
            animate="visible"
          >
            <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80 hover:shadow-md dark:hover:shadow-none transition-shadow duration-300">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                    <ArrowLeftRight className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    +12% this month
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Referrals Sent to Us</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">42</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Referrals We Sent to Them */}
          <motion.div
            custom={1}
            variants={statCardVariants}
            initial="hidden"
            animate="visible"
          >
            <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80 hover:shadow-md dark:hover:shadow-none transition-shadow duration-300">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                    <ArrowRightLeft className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    -5% from last month
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Referrals We Sent to Them</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">28</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Transactions Closed Together */}
          <motion.div
            custom={2}
            variants={statCardVariants}
            initial="hidden"
            animate="visible"
          >
            <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80 hover:shadow-md dark:hover:shadow-none transition-shadow duration-300">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center">
                    <Handshake className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    Top Partner Status
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Transactions Closed Together</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">114</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* ─── MIDDLE ROW: Financial (left) + Relationship (right) ─── */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          
          {/* LEFT: Financial Performance (2/5) */}
          <motion.div variants={cardVariants} className="xl:col-span-2">
            <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80 h-full">
              <CardContent className="p-6 sm:p-8">
                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-6">
                  Financial Performance
                </p>

                <div className="space-y-6">
                  {/* Total Co-transaction Volume */}
                  <motion.div variants={itemVariants}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        Total Co-transaction Volume
                      </span>
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                        $1.2M
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-blue-600 dark:bg-blue-500"
                        custom="75%"
                        variants={progressVariants}
                        initial="hidden"
                        animate="visible"
                      />
                    </div>
                  </motion.div>

                  {/* Total Commission */}
                  <motion.div variants={itemVariants}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        Total Commission
                      </span>
                      <span className="text-sm font-bold text-amber-700 dark:text-amber-500">
                        $184k
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-amber-600 dark:bg-amber-500"
                        custom="45%"
                        variants={progressVariants}
                        initial="hidden"
                        animate="visible"
                      />
                    </div>
                  </motion.div>

                  {/* Total Commission Received */}
                  <motion.div variants={itemVariants}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        Total Commission Received
                      </span>
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                        $162k
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-blue-600 dark:bg-blue-500"
                        custom="85%"
                        variants={progressVariants}
                        initial="hidden"
                        animate="visible"
                      />
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* RIGHT: Relationship Management (3/5) */}
          <motion.div variants={cardVariants} className="xl:col-span-3">
            <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80 h-full">
              <CardContent className="p-6 sm:p-8">
                {/* Header with Tabs */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Relationship Management
                  </h3>
                  <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden bg-gray-50 dark:bg-gray-800/50 p-0.5">
                    <button
                      type="button"
                      onClick={() => updateField("activeTab", "notes")}
                      className={`
                        px-4 py-1.5 rounded-md text-xs font-semibold transition-all duration-200
                        ${form.activeTab === "notes"
                          ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                          : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                        }
                      `}
                    >
                      Notes
                    </button>
                    <button
                      type="button"
                      onClick={() => updateField("activeTab", "history")}
                      className={`
                        px-4 py-1.5 rounded-md text-xs font-semibold transition-all duration-200
                        ${form.activeTab === "history"
                          ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                          : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                        }
                      `}
                    >
                      History
                    </button>
                  </div>
                </div>

                <div className="space-y-5">
                  {/* Relationship Notes */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Relationship Notes
                    </label>
                    <Textarea
                      value={form.relationshipNotes}
                      onChange={(e) => updateField("relationshipNotes", e.target.value)}
                      placeholder="Summarize historical collaboration and general sentiment..."
                      rows={4}
                      className="rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 resize-none text-sm"
                    />
                  </motion.div>

                  {/* Bottom Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Issues / Complaints Log */}
                    <motion.div variants={itemVariants} className="space-y-2">
                      <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                        Issues / Complaints Log
                      </label>
                      <Textarea
                        value={form.issuesComplaints}
                        onChange={(e) => updateField("issuesComplaints", e.target.value)}
                        placeholder="Document any friction points or unresolved disputes..."
                        rows={3}
                        className="rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 resize-none text-sm"
                      />
                    </motion.div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      {/* Annual Review Date */}
                      <motion.div variants={itemVariants} className="space-y-2">
                        <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                          Annual Review Date
                        </label>
                        <div className="relative">
                          <Input
                            type="text"
                            value={form.annualReviewDate}
                            onChange={(e) => updateField("annualReviewDate", e.target.value)}
                            placeholder="mm/dd/yyyy"
                            className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 pr-10"
                          />
                          <Calendar className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                        </div>
                      </motion.div>

                      {/* Last Modified By */}
                      <motion.div 
                        variants={itemVariants}
                        className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800"
                      >
                        <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                          Last Modified By
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-700 dark:text-blue-300 text-xs font-bold">
                            MG
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                              Manuel G.
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              2 hours ago
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* ─── BOTTOM STATS ROW ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Entity Type */}
          <motion.div
            custom={0}
            variants={statCardVariants}
            initial="hidden"
            animate="visible"
          >
            <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80 hover:shadow-md dark:hover:shadow-none transition-shadow duration-300">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Entity Type
                  </p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">
                    Franchise Group
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tier */}
          <motion.div
            custom={1}
            variants={statCardVariants}
            initial="hidden"
            animate="visible"
          >
            <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80 hover:shadow-md dark:hover:shadow-none transition-shadow duration-300">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Tier
                  </p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">
                    Platinum Partner
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Connections */}
          <motion.div
            custom={2}
            variants={statCardVariants}
            initial="hidden"
            animate="visible"
          >
            <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80 hover:shadow-md dark:hover:shadow-none transition-shadow duration-300">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                  <Network className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Connections
                  </p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">
                    12 Active Agents
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Rating */}
          <motion.div
            custom={3}
            variants={statCardVariants}
            initial="hidden"
            animate="visible"
          >
            <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80 hover:shadow-md dark:hover:shadow-none transition-shadow duration-300">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                  <Star className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
                    Rating
                  </p>
                  {renderStars(4)}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

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
                Relationship details saved
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
        </motion.div>

      </div>
    </motion.div>
  )
}