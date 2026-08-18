"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Calendar as CalendarIcon,
  CheckSquare,
  FileCheck,
  CheckCircle2,
  BookmarkCheck,
} from "lucide-react"

/* ─────────────────────────────────────────────────────────────
   ANIMATION VARIANTS
   ───────────────────────────────────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────────── */
export default function PerformanceDashboard() {
  // Form State
  const [formData, setFormData] = useState({
    activeMandates: "Edyta Graf",
    listingsPublished: "Home",
    viewingsConducted: "",
    offersGenerated: "Edyta Graf",
    transactionsClosed: "Edyta Graf",
    transactionVolume: "Edyta Graf",
    commissionEarned: "",
    averageDaysOnMarket: "",
    clientSatisfactionScore: "Manuel",
    leadResponseTime: "Manuel",
    performanceReviewNotes: "",
    annualReviewDate: "Manuel",
  })

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <motion.div
      className="min-h-screen bg-[#EEF2F6] dark:bg-slate-950 p-4 sm:p-6 lg:p-8 font-sans antialiased text-slate-800 dark:text-slate-100"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="mx-auto max-w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ─────────────────────────────────────────────────────────────
             LEFT COLUMN: Performance Metrics Form (8/12)
             ───────────────────────────────────────────────────────────── */}
          <motion.div variants={cardVariants} className="lg:col-span-8">
            <Card className="border border-slate-200/80 dark:border-slate-800/80 shadow-sm rounded-2xl bg-white dark:bg-slate-900 overflow-hidden">
              <CardContent className="p-6 sm:p-8 space-y-6">
                
                {/* 2-Column Inputs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                  
                  {/* Active Mandates */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                      Active Mandates
                    </label>
                    <Input
                      value={formData.activeMandates}
                      onChange={(e) => updateField("activeMandates", e.target.value)}
                      className="bg-[#F1F5F9] dark:bg-slate-800/60 border-0 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 rounded-xl h-11 focus-visible:ring-2 focus-visible:ring-blue-500 shadow-none font-medium text-sm"
                    />
                  </div>

                  {/* Listings Published */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                      Listings Published
                    </label>
                    <Input
                      value={formData.listingsPublished}
                      onChange={(e) => updateField("listingsPublished", e.target.value)}
                      className="bg-[#F1F5F9] dark:bg-slate-800/60 border-0 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 rounded-xl h-11 focus-visible:ring-2 focus-visible:ring-blue-500 shadow-none font-medium text-sm"
                    />
                  </div>

                  {/* Viewings Conducted */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                      Viewings Conducted
                    </label>
                    <Input
                      placeholder="Enter count"
                      value={formData.viewingsConducted}
                      onChange={(e) => updateField("viewingsConducted", e.target.value)}
                      className="bg-[#F1F5F9] dark:bg-slate-800/60 border-0 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 rounded-xl h-11 focus-visible:ring-2 focus-visible:ring-blue-500 shadow-none font-medium text-sm"
                    />
                  </div>

                  {/* Offers Generated */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                      Offers Generated
                    </label>
                    <Input
                      value={formData.offersGenerated}
                      onChange={(e) => updateField("offersGenerated", e.target.value)}
                      className="bg-[#F1F5F9] dark:bg-slate-800/60 border-0 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 rounded-xl h-11 focus-visible:ring-2 focus-visible:ring-blue-500 shadow-none font-medium text-sm"
                    />
                  </div>

                  {/* Transactions Closed */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                      Transactions Closed
                    </label>
                    <Input
                      value={formData.transactionsClosed}
                      onChange={(e) => updateField("transactionsClosed", e.target.value)}
                      className="bg-[#F1F5F9] dark:bg-slate-800/60 border-0 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 rounded-xl h-11 focus-visible:ring-2 focus-visible:ring-blue-500 shadow-none font-medium text-sm"
                    />
                  </div>

                  {/* Transaction Volume */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                      Transaction Volume
                    </label>
                    <Input
                      value={formData.transactionVolume}
                      onChange={(e) => updateField("transactionVolume", e.target.value)}
                      className="bg-[#F1F5F9] dark:bg-slate-800/60 border-0 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 rounded-xl h-11 focus-visible:ring-2 focus-visible:ring-blue-500 shadow-none font-medium text-sm"
                    />
                  </div>

                  {/* Commission Earned */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                      Commission Earned
                    </label>
                    <div className="relative">
                      <Select
                        value={formData.commissionEarned}
                        onValueChange={(val) => updateField("commissionEarned", val)}
                      >
                        <SelectTrigger className="bg-[#F1F5F9] dark:bg-slate-800/60 border-0 text-slate-800 dark:text-slate-100 rounded-xl h-11 focus:ring-2 focus:ring-blue-500 shadow-none font-medium text-sm pr-10">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tier1">$0 - $10,000</SelectItem>
                          <SelectItem value="tier2">$10,000 - $50,000</SelectItem>
                          <SelectItem value="tier3">$50,000+</SelectItem>
                        </SelectContent>
                      </Select>
                      <CalendarIcon className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Average Days on Market */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                      Average Days on Market
                    </label>
                    <Select
                      value={formData.averageDaysOnMarket}
                      onValueChange={(val) => updateField("averageDaysOnMarket", val)}
                    >
                      <SelectTrigger className="bg-[#F1F5F9] dark:bg-slate-800/60 border-0 text-slate-800 dark:text-slate-100 rounded-xl h-11 focus:ring-2 focus:ring-blue-500 shadow-none font-medium text-sm">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 Days</SelectItem>
                        <SelectItem value="30">30 Days</SelectItem>
                        <SelectItem value="60">60+ Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Client Satisfaction Score */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                      Client Satisfaction Score
                    </label>
                    <Input
                      value={formData.clientSatisfactionScore}
                      onChange={(e) => updateField("clientSatisfactionScore", e.target.value)}
                      className="bg-[#F1F5F9] dark:bg-slate-800/60 border-0 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 rounded-xl h-11 focus-visible:ring-2 focus-visible:ring-blue-500 shadow-none font-medium text-sm"
                    />
                  </div>

                  {/* Lead Response Time */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                      Lead Response Time
                    </label>
                    <Input
                      value={formData.leadResponseTime}
                      onChange={(e) => updateField("leadResponseTime", e.target.value)}
                      className="bg-[#F1F5F9] dark:bg-slate-800/60 border-0 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 rounded-xl h-11 focus-visible:ring-2 focus-visible:ring-blue-500 shadow-none font-medium text-sm"
                    />
                  </div>

                </div>

                {/* Performance Review Notes (Full Width Textarea) */}
                <div className="space-y-1.5 pt-1">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    Performance Review Notes
                  </label>
                  <Textarea
                    placeholder="Select"
                    value={formData.performanceReviewNotes}
                    onChange={(e) => updateField("performanceReviewNotes", e.target.value)}
                    className="bg-[#F1F5F9] dark:bg-slate-800/60 border-0 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 rounded-xl min-h-[120px] focus-visible:ring-2 focus-visible:ring-blue-500 shadow-none resize-y font-medium text-sm p-4"
                  />
                </div>

                {/* Annual Review Date (Full Width Input) */}
                <div className="space-y-1.5 pt-1">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    Annual Review Date
                  </label>
                  <Input
                    value={formData.annualReviewDate}
                    onChange={(e) => updateField("annualReviewDate", e.target.value)}
                    className="bg-[#F1F5F9] dark:bg-slate-800/60 border-0 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 rounded-xl h-11 focus-visible:ring-2 focus-visible:ring-blue-500 shadow-none font-medium text-sm"
                  />
                </div>

              </CardContent>
            </Card>
          </motion.div>

          {/* ─────────────────────────────────────────────────────────────
             RIGHT COLUMN: Sentiment & Action Items (4/12)
             ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* CARD 1: Client Sentiment */}
            <motion.div variants={cardVariants}>
              <Card className="border border-slate-200/80 dark:border-slate-800/80 shadow-sm rounded-2xl bg-white dark:bg-slate-900 overflow-hidden">
                <CardContent className="p-6 sm:p-8 flex flex-col items-center justify-center text-center relative">
                  
                  {/* Card Title & Icon */}
                  <div className="w-full flex items-center justify-between mb-8">
                    <h3 className="text-base font-bold text-slate-800 dark:text-white">
                      Client Sentiment
                    </h3>
                    <div className="p-1.5 rounded-md text-blue-600 dark:text-blue-400">
                      <BookmarkCheck className="w-5 h-5 fill-blue-600/10 dark:fill-blue-400/20" />
                    </div>
                  </div>

                  {/* Circular Score Rating Gauge */}
                  <div className="relative w-36 h-36 flex items-center justify-center my-2">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      {/* Background Track Circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        stroke="currentColor"
                        strokeWidth="7"
                        fill="transparent"
                        className="text-slate-100 dark:text-slate-800"
                      />
                      {/* Progress Circle (4.9 / 5.0 ratio) */}
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        stroke="#0066FF"
                        strokeWidth="7"
                        strokeDasharray={2 * Math.PI * 42}
                        strokeDashoffset={2 * Math.PI * 42 * (1 - 0.98)}
                        strokeLinecap="round"
                        fill="transparent"
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <span className="absolute text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
                      4.9
                    </span>
                  </div>

                  {/* Subtext */}
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-6 max-w-[200px] leading-relaxed">
                    Highest rated agent in the Western District this month.
                  </p>

                </CardContent>
              </Card>
            </motion.div>

            {/* CARD 2: Action Items */}
            <motion.div variants={cardVariants}>
              <Card className="border border-slate-200/80 dark:border-slate-800/80 shadow-sm rounded-2xl bg-white dark:bg-slate-900 overflow-hidden">
                <CardContent className="p-6 sm:p-8 space-y-6">
                  
                  <h3 className="text-base font-bold text-slate-800 dark:text-white mb-2">
                    Action Items
                  </h3>

                  <div className="space-y-5">
                    
                    {/* Item 1: Annual Review Due */}
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                        <CheckSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-snug">
                          Annual Review Due
                        </h4>
                        <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mt-0.5">
                          Scheduled for Sept 12th
                        </p>
                      </div>
                    </div>

                    {/* Item 2: Upload Qualifications */}
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                        <FileCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-snug">
                          Upload Qualifications
                        </h4>
                        <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mt-0.5">
                          Missing REA License Scan
                        </p>
                      </div>
                    </div>

                    {/* Item 3: Q2 Goals Met */}
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-snug">
                          Q2 Goals Met
                        </h4>
                        <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mt-0.5">
                          Completed July 5th
                        </p>
                      </div>
                    </div>

                  </div>

                </CardContent>
              </Card>
            </motion.div>

          </div>

        </div>
      </div>
    </motion.div>
  )
}