"use client"

import React, { useState } from "react"
import { motion, type Variants } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeftRight,
  ArrowRightLeft,
  Handshake,
  Building2,
  Star,
  Calendar,
  AlertTriangle,
  FileText,
  DollarSign,
  TrendingUp,
  Plus,
  X,
  Sparkles,
} from "lucide-react"
import { useAgencyStore } from "@/store/useAgencyStore"

interface ActivityStepProps {
  onSave?: () => void
  isSubmitting?: boolean
  onCancel?: () => void
  onBack?: () => void
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
}

export default function CRMAccessRights({
  onSave,
  isSubmitting = false,
  onCancel,
  onBack,
}: ActivityStepProps) {
  const {
    formData,
    updateActivity,
    setArrayField,
  } = useAgencyStore()

  const activity = formData.activity
  const [newIssue, setNewIssue] = useState("")

  const handleAddIssue = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ("key" in e && e.key !== "Enter") return
    e.preventDefault()
    if (newIssue.trim()) {
      setArrayField("activity", "issues_complaints_log", [
        ...(activity.issues_complaints_log || []),
        `${new Date().toLocaleDateString()}: ${newIssue.trim()}`,
      ])
      setNewIssue("")
    }
  }

  const handleRemoveIssue = (index: number) => {
    const list = [...(activity.issues_complaints_log || [])]
    list.splice(index, 1)
    setArrayField("activity", "issues_complaints_log", list)
  }

  const currentScore = parseInt(activity.relationship_score || "5", 10) || 5

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header Banner */}
      <motion.div variants={cardVariants}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-600 rounded-xl shadow-lg shadow-blue-600/20">
            <Handshake className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              Activity, Performance & Relationship Health
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Monitor co-mandate transactions, financial volume, referral velocity, and relationship history.
            </p>
          </div>
        </div>
      </motion.div>

      {/* TOP STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Referrals Sent to Us */}
        <motion.div variants={cardVariants}>
          <Card className="border border-gray-100 dark:border-gray-800 shadow-sm rounded-2xl bg-card">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                  <ArrowLeftRight className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <Badge variant="outline" className="text-[10px] font-semibold text-blue-600 border-blue-200">
                  Incoming
                </Badge>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
                  Referrals Sent to Us
                </label>
                <Input
                  type="number"
                  value={activity.referrals_sent_to_us || ""}
                  onChange={(e) =>
                    updateActivity("referrals_sent_to_us", parseInt(e.target.value, 10) || 0)
                  }
                  placeholder="0"
                  className="h-10 text-lg font-bold rounded-xl"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Referrals We Sent to Them */}
        <motion.div variants={cardVariants}>
          <Card className="border border-gray-100 dark:border-gray-800 shadow-sm rounded-2xl bg-card">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center">
                  <ArrowRightLeft className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <Badge variant="outline" className="text-[10px] font-semibold text-indigo-600 border-indigo-200">
                  Outgoing
                </Badge>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
                  Referrals We Sent
                </label>
                <Input
                  type="number"
                  value={activity.referrals_we_sent || ""}
                  onChange={(e) =>
                    updateActivity("referrals_we_sent", parseInt(e.target.value, 10) || 0)
                  }
                  placeholder="0"
                  className="h-10 text-lg font-bold rounded-xl"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Closed Transactions Together */}
        <motion.div variants={cardVariants}>
          <Card className="border border-gray-100 dark:border-gray-800 shadow-sm rounded-2xl bg-card">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
                  <Handshake className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <Badge variant="outline" className="text-[10px] font-semibold text-emerald-600 border-emerald-200">
                  Closed Deals
                </Badge>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
                  Transactions Closed Together
                </label>
                <Input
                  type="number"
                  value={activity.transactions_closed_together || ""}
                  onChange={(e) =>
                    updateActivity("transactions_closed_together", parseInt(e.target.value, 10) || 0)
                  }
                  placeholder="0"
                  className="h-10 text-lg font-bold rounded-xl"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Active Co-Mandated Properties */}
        <motion.div variants={cardVariants}>
          <Card className="border border-gray-100 dark:border-gray-800 shadow-sm rounded-2xl bg-card">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <Badge variant="outline" className="text-[10px] font-semibold text-orange-600 border-orange-200">
                  Active
                </Badge>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-1">
                  Co-Mandates Active
                </label>
                <Input
                  type="number"
                  value={activity.comandated_properties_active || ""}
                  onChange={(e) =>
                    updateActivity("comandated_properties_active", parseInt(e.target.value, 10) || 0)
                  }
                  placeholder="0"
                  className="h-10 text-lg font-bold rounded-xl"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* 2-COL ROW: Financial Volume & Relationship Scoring */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Financial Performance */}
        <motion.div variants={cardVariants}>
          <Card className="border border-gray-100 dark:border-gray-800 shadow-sm rounded-2xl overflow-hidden bg-card h-full">
            <CardContent className="p-6 sm:p-7 space-y-5">
              <div className="flex items-center gap-2.5 pb-4 border-b border-gray-100 dark:border-gray-800">
                <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                  Cumulative Financial Performance
                </h3>
              </div>

              <div className="space-y-4">
                <motion.div variants={itemVariants} className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Total Co-Transaction Volume
                  </label>
                  <div className="relative">
                    <TrendingUp className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <Input
                      value={activity.total_cotransaction_volume}
                      onChange={(e) => updateActivity("total_cotransaction_volume", e.target.value)}
                      placeholder="e.g. CHF 14,500,000"
                      className="h-11 rounded-xl pl-10"
                    />
                  </div>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div variants={itemVariants} className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Commission Paid to Partner
                    </label>
                    <Input
                      value={activity.total_commission_paid}
                      onChange={(e) => updateActivity("total_commission_paid", e.target.value)}
                      placeholder="e.g. CHF 180,000"
                      className="h-11 rounded-xl"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Commission Received from Partner
                    </label>
                    <Input
                      value={activity.total_commission_received}
                      onChange={(e) => updateActivity("total_commission_received", e.target.value)}
                      placeholder="e.g. CHF 240,000"
                      className="h-11 rounded-xl"
                    />
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <motion.div variants={itemVariants} className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Last Joint Transaction Date
                    </label>
                    <div className="relative">
                      <Input
                        type="date"
                        value={activity.last_joint_transaction_date ? activity.last_joint_transaction_date.split("T")[0] : ""}
                        onChange={(e) => updateActivity("last_joint_transaction_date", e.target.value)}
                        className="h-11 rounded-xl pr-10"
                      />
                      <Calendar className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Next Annual Review Date
                    </label>
                    <div className="relative">
                      <Input
                        type="date"
                        value={activity.annual_review_date ? activity.annual_review_date.split("T")[0] : ""}
                        onChange={(e) => updateActivity("annual_review_date", e.target.value)}
                        className="h-11 rounded-xl pr-10"
                      />
                      <Calendar className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Relationship Health & Scoring */}
        <motion.div variants={cardVariants}>
          <Card className="border border-gray-100 dark:border-gray-800 shadow-sm rounded-2xl overflow-hidden bg-card h-full">
            <CardContent className="p-6 sm:p-7 space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2.5">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                    Relationship Health & Quality Rating
                  </h3>
                </div>

                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => updateActivity("relationship_score", String(star))}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-5 h-5 ${star <= currentScore
                            ? "text-amber-500 fill-amber-500"
                            : "text-gray-300 dark:text-gray-700"
                          }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Relationship Notes */}
              <motion.div variants={itemVariants} className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Relationship Notes & Sentiment Summary
                </label>
                <Textarea
                  value={activity.relationship_notes}
                  onChange={(e) => updateActivity("relationship_notes", e.target.value)}
                  placeholder="Record strategic observations, key milestones, and preferred communication cadence..."
                  rows={4}
                  className="rounded-xl resize-none text-sm"
                />
              </motion.div>

              {/* Issues & Complaints Log */}
              <motion.div variants={itemVariants} className="space-y-2 pt-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Issues & Dispute Log ({activity.issues_complaints_log?.length || 0})
                  </label>
                </div>

                <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                  {activity.issues_complaints_log && activity.issues_complaints_log.length > 0 ? (
                    activity.issues_complaints_log.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 rounded-xl border border-border/60 bg-muted/20 text-xs"
                      >
                        <span className="text-muted-foreground truncate">{item}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveIssue(idx)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-muted-foreground italic py-1">No active issues recorded.</p>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <Input
                    value={newIssue}
                    onChange={(e) => setNewIssue(e.target.value)}
                    onKeyDown={handleAddIssue}
                    placeholder="Log new observation or resolution..."
                    className="h-10 text-xs rounded-xl"
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={handleAddIssue}
                    className="h-10 rounded-xl px-3 shrink-0"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Log
                  </Button>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Navigation Actions */}
      {/* <motion.div variants={cardVariants} className="flex items-center justify-between pt-4">
        {onBack ? (
          <Button type="button" variant="outline" onClick={onBack} className="rounded-xl h-11 px-6">
            Back: CRM Access
          </Button>
        ) : <div />}

        <div className="flex items-center gap-3">
          {onSave && (
            <Button
              type="button"
              onClick={onSave}
              disabled={isSubmitting}
              className="rounded-xl h-11 px-8 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 animate-spin" />
                  Saving Agency...
                </span>
              ) : (
                "Save Agency Profile"
              )}
            </Button>
          )}
        </div>
      </motion.div> */}
    </motion.div>
  )
}