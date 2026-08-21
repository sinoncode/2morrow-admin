"use client"

import React, { useState, useRef } from "react"
import { motion, type Variants } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AnimatePresence } from "framer-motion"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  FileText,
  Calendar,
  Clock,
  Link2,
  X,
  CreditCard,
  Building,
  ShieldCheck,
  Plus,
  FileCheck2,
} from "lucide-react"
import { useAgencyStore } from "@/store/useAgencyStore"

interface PartnershipStepProps {
  onSave?: () => void
  isSubmitting?: boolean
  onCancel?: () => void
  onNext?: () => void
  onBack?: () => void
}

const COMMON_ZONES = [
  "Geneva Central & Left Bank",
  "Geneva Right Bank",
  "Canton Vaud / Lausanne",
  "Montreux Riviera",
  "Nyon / La Côte",
  "Valais Ski Resorts",
  "Zurich Metropolitan",
]

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

export default function PartnershipAgreementStep({
  onSave,
  isSubmitting = false,
  onCancel,
  onNext,
  onBack,
}: PartnershipStepProps) {
  const {
    formData,
    updatePartnership,
    toggleArrayItem,
    setArrayField,
  } = useAgencyStore()

  const partnership = formData.partnership
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [newZone, setNewZone] = useState("")

  const handleAddZone = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ("key" in e && e.key !== "Enter") return
    e.preventDefault()
    if (newZone.trim() && !partnership.exclusive_geographic_zones.includes(newZone.trim())) {
      setArrayField("partnership", "exclusive_geographic_zones", [
        ...partnership.exclusive_geographic_zones,
        newZone.trim(),
      ])
      setNewZone("")
    }
  }

  const handleRemoveZone = (zone: string) => {
    setArrayField(
      "partnership",
      "exclusive_geographic_zones",
      partnership.exclusive_geographic_zones.filter((z) => z !== zone)
    )
  }

  const handleFileMockUpload = (files: FileList | null) => {
    if (files && files[0]) {
      updatePartnership("agreement_file", files[0].name)
      updatePartnership("agreement_signed", true)
    }
  }

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
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              Partnership Terms & Agreement
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Define partnership classification, contractual duration, commission splits, and banking terms.
            </p>
          </div>
        </div>
      </motion.div>

      {/* TOP ROW: Governance (3/5) + Duration (2/5) */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* LEFT: Governance & Classification */}
        <motion.div variants={cardVariants} className="xl:col-span-3">
          <Card className="border border-gray-100 dark:border-gray-800 shadow-sm rounded-2xl overflow-hidden bg-card h-full">
            <CardContent className="p-6 sm:p-7 space-y-5">
              <div className="flex items-center gap-2.5 pb-4 border-b border-gray-100 dark:border-gray-800">
                <FileCheck2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                  Governance & Operational Status
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.div variants={itemVariants} className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Partnership Type
                  </label>
                  <Select
                    value={partnership.type || "franchise"}
                    onValueChange={(v) => updatePartnership("type", v)}
                  >
                    <SelectTrigger className="h-11 rounded-xl">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="franchise">Franchise</SelectItem>
                      <SelectItem value="affiliate">Affiliate Partner</SelectItem>
                      <SelectItem value="strategic">Strategic Alliance</SelectItem>
                      <SelectItem value="referral">Referral Partner</SelectItem>
                      <SelectItem value="mandate_broker">Mandate Broker</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Partnership Status
                  </label>
                  <Select
                    value={partnership.status || "active"}
                    onValueChange={(v) => updatePartnership("status", v)}
                  >
                    <SelectTrigger className="h-11 rounded-xl">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending Approval</SelectItem>
                      <SelectItem value="under_review">Under Review</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                      <SelectItem value="terminated">Terminated</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>
              </div>

              {/* Agreement Document & Signing */}
              <motion.div variants={itemVariants} className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Partnership Agreement Document
                  </label>
                  <label className="flex items-center gap-2 text-xs font-medium cursor-pointer text-muted-foreground">
                    <Checkbox
                      checked={partnership.agreement_signed}
                      onCheckedChange={(checked) =>
                        updatePartnership("agreement_signed", checked === true)
                      }
                      className="rounded-md"
                    />
                    Agreement Officially Signed
                  </label>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileMockUpload(e.target.files)}
                  className="hidden"
                />

                <AnimatePresence mode="wait">
                  {partnership.agreement_file ? (
                    <motion.div
                      key="file"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center justify-between p-3.5 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50/40 dark:bg-blue-950/20"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                          <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-900 dark:text-white">
                            {partnership.agreement_file}
                          </p>
                          <p className="text-[10px] text-emerald-600 dark:text-emerald-400">
                            ✓ Document attached
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          onClick={() => fileInputRef.current?.click()}
                          className="h-8 text-xs text-blue-600"
                        >
                          Change
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          onClick={() => updatePartnership("agreement_file", "")}
                          className="h-8 text-xs text-red-600 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full flex items-center justify-center gap-2.5 p-4 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-800 hover:border-blue-400 dark:hover:border-blue-600 bg-muted/20 transition-all cursor-pointer text-xs font-medium text-muted-foreground hover:text-foreground"
                    >
                      <FileText className="w-4 h-4 text-blue-500" />
                      Upload Signed Partnership Agreement (.PDF, .DOCX)
                    </button>
                  )}
                </AnimatePresence>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* RIGHT: Agreement Duration & Notice */}
        <motion.div variants={cardVariants} className="xl:col-span-2">
          <Card className="border border-gray-100 dark:border-gray-800 shadow-sm rounded-2xl overflow-hidden bg-card h-full">
            <CardContent className="p-6 sm:p-7 space-y-4">
              <div className="flex items-center gap-2.5 pb-4 border-b border-gray-100 dark:border-gray-800">
                <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                  Contract Duration
                </h3>
              </div>

              <motion.div variants={itemVariants} className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Agreement Start Date
                </label>
                <div className="relative">
                  <Input
                    type="date"
                    value={partnership.start_date ? partnership.start_date.split("T")[0] : ""}
                    onChange={(e) => updatePartnership("start_date", e.target.value)}
                    className="h-11 rounded-xl pr-10"
                  />
                  <Calendar className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Agreement End Date
                </label>
                <div className="relative">
                  <Input
                    type="date"
                    value={partnership.end_date ? partnership.end_date.split("T")[0] : ""}
                    onChange={(e) => updatePartnership("end_date", e.target.value)}
                    className="h-11 rounded-xl pr-10"
                  />
                  <Calendar className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Termination Notice Period
                </label>
                <Input
                  value={partnership.notice_period_terminate}
                  onChange={(e) => updatePartnership("notice_period_terminate", e.target.value)}
                  placeholder="e.g. 3 months written notice"
                  className="h-11 rounded-xl"
                />
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* FULL WIDTH: Commercial Split & Banking Details */}
      <motion.div variants={cardVariants}>
        <Card className="border border-gray-100 dark:border-gray-800 shadow-sm rounded-2xl overflow-hidden bg-card">
          <CardContent className="p-6 sm:p-7 space-y-6">
            <div className="flex items-center gap-2.5 pb-4 border-b border-gray-100 dark:border-gray-800">
              <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                Commercial Splits & Financial Settlement
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Exclusivity */}
              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Exclusivity
                </label>
                <div className="flex rounded-xl border border-input overflow-hidden p-0.5 bg-muted/30">
                  <button
                    type="button"
                    onClick={() => updatePartnership("exclusivity", "exclusive")}
                    className={`flex-1 h-9 rounded-lg text-xs font-semibold transition-all ${partnership.exclusivity === "exclusive"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    Exclusive
                  </button>
                  <button
                    type="button"
                    onClick={() => updatePartnership("exclusivity", "shared")}
                    className={`flex-1 h-9 rounded-lg text-xs font-semibold transition-all ${partnership.exclusivity === "shared"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    Shared / Open
                  </button>
                </div>
              </motion.div>

              {/* Commission Split */}
              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Commission Split
                </label>
                <Input
                  value={partnership.commission_split}
                  onChange={(e) => updatePartnership("commission_split", e.target.value)}
                  placeholder="e.g. 80/20 or 50/50"
                  className="h-11 rounded-xl"
                />
              </motion.div>

              {/* Split Method */}
              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Commission Split Method
                </label>
                <Input
                  value={partnership.commission_split_method}
                  onChange={(e) => updatePartnership("commission_split_method", e.target.value)}
                  placeholder="Fixed Percentage on Net"
                  className="h-11 rounded-xl"
                />
              </motion.div>

              {/* Payment Terms */}
              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Payment Terms
                </label>
                <Select
                  value={partnership.payment_terms || "net-30"}
                  onValueChange={(v) => updatePartnership("payment_terms", v)}
                >
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue placeholder="Select terms" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="immediate">Immediate upon Closing</SelectItem>
                    <SelectItem value="net-15">Net 15 Days</SelectItem>
                    <SelectItem value="net-30">Net 30 Days</SelectItem>
                    <SelectItem value="net-60">Net 60 Days</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
            </div>

            {/* Geographic Zones Multi-Selector */}
            <motion.div variants={itemVariants} className="space-y-2 pt-1">
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Exclusive Geographic Zones
              </label>
              <div className="flex flex-wrap gap-2 items-center p-3 rounded-xl border border-input bg-background/50 min-h-[46px]">
                {partnership.exclusive_geographic_zones.map((zone) => (
                  <Badge
                    key={zone}
                    variant="secondary"
                    className="gap-1.5 px-3 py-1 text-xs font-medium rounded-lg bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
                  >
                    {zone}
                    <button
                      type="button"
                      onClick={() => handleRemoveZone(zone)}
                      className="text-orange-400 hover:text-orange-700 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
                <div className="flex items-center gap-1.5">
                  <Input
                    value={newZone}
                    onChange={(e) => setNewZone(e.target.value)}
                    onKeyDown={handleAddZone}
                    placeholder="Type custom zone & Enter..."
                    className="h-7 text-xs border-0 bg-transparent shadow-none focus-visible:ring-0 w-48 px-1"
                  />
                  {newZone && (
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={handleAddZone}
                      className="h-7 px-2 text-xs"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Quick suggestions */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {COMMON_ZONES.map((zone) => {
                  const isSelected = partnership.exclusive_geographic_zones.includes(zone)
                  return (
                    <button
                      key={zone}
                      type="button"
                      onClick={() => toggleArrayItem("partnership", "exclusive_geographic_zones", zone)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-medium border transition-all ${isSelected
                        ? "bg-orange-600 text-white border-orange-600"
                        : "bg-muted/30 text-muted-foreground border-transparent hover:bg-muted"
                        }`}
                    >
                      {zone}
                    </button>
                  )
                })}
              </div>
            </motion.div>

            {/* Banking & Compliance Group */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-3 border-t border-gray-100 dark:border-gray-800">
              <motion.div variants={itemVariants} className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-blue-600" />
                  IBAN Number
                </label>
                <Input
                  value={partnership.iban}
                  onChange={(e) => updatePartnership("iban", e.target.value)}
                  placeholder="CH93 0000 0000 0000 0000 0"
                  className="h-11 rounded-xl font-mono text-sm"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-blue-600" />
                  Bank Name
                </label>
                <Input
                  value={partnership.bank_name}
                  onChange={(e) => updatePartnership("bank_name", e.target.value)}
                  placeholder="UBS Switzerland AG"
                  className="h-11 rounded-xl"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Dispute Resolution Clause
                </label>
                <Input
                  value={partnership.dispute_resolution_clause}
                  onChange={(e) => updatePartnership("dispute_resolution_clause", e.target.value)}
                  placeholder="Courts of Geneva, Swiss Law"
                  className="h-11 rounded-xl"
                />
              </motion.div>
            </div>

            {/* Legal compliance flags */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <label className="flex items-center gap-3 p-3.5 rounded-xl border border-input bg-muted/20 cursor-pointer">
                <Checkbox
                  checked={partnership.nda_signed}
                  onCheckedChange={(checked) => updatePartnership("nda_signed", checked === true)}
                  className="rounded-md"
                />
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">
                  NDA (Non-Disclosure Agreement) Executed
                </span>
              </label>

              <label className="flex items-center gap-3 p-3.5 rounded-xl border border-input bg-muted/20 cursor-pointer">
                <Checkbox
                  checked={partnership.data_sharing_agreement_gdpr}
                  onCheckedChange={(checked) =>
                    updatePartnership("data_sharing_agreement_gdpr", checked === true)
                  }
                  className="rounded-md"
                />
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">
                  GDPR / FADP Data Sharing Agreement Signed
                </span>
              </label>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Navigation Actions */}
      {/* <motion.div variants={cardVariants} className="flex items-center justify-between pt-4">
        {onBack ? (
          <Button type="button" variant="outline" onClick={onBack} className="rounded-xl h-11 px-6">
            Back: Address
          </Button>
        ) : <div />}

        <div className="flex items-center gap-3">
          {onSave && (
            <Button
              type="button"
              variant="outline"
              onClick={onSave}
              disabled={isSubmitting}
              className="rounded-xl h-11 px-6"
            >
              {isSubmitting ? "Saving..." : "Save Progress"}
            </Button>
          )}

          {onNext && (
            <Button
              type="button"
              onClick={onNext}
              className="rounded-xl h-11 px-8 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20"
            >
              Continue to CRM Access
            </Button>
          )}
        </div>
      </motion.div> */}
    </motion.div>
  )
}