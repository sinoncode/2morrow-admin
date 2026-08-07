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
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Eye, 
  Filter, 
  ShieldAlert, 
  Database,
  X,
  CheckCircle2,
  Sparkles,
  ChevronDown
} from "lucide-react"

/* ─────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────── */
type PermissionLevel = "hidden" | "read" | "write"

interface SensitiveField {
  id: string
  name: string
  permission: PermissionLevel
}

interface AccessRightsForm {
  propertiesVisible: boolean
  offMarketListings: boolean
  comingSoonDrafts: boolean
  soldArchived: boolean
  otherAgentsListings: boolean

  propertyTypeTags: string[]
  propertyTypeInput: string
  filterCountryRegion: string
  filterPriceRange: string

  sensitiveFields: SensitiveField[]

  agentAssignment: boolean
  mandateTerms: boolean
  financialData: boolean
  documents: boolean
  offerHistory: boolean
  viewingHistory: boolean
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

const tagVariants = {
  hidden: { opacity: 0, scale: 0.6, y: 8 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 500, damping: 25 }
  },
  exit: { 
    opacity: 0, 
    scale: 0.6, 
    transition: { duration: 0.2 } 
  }
}

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────────── */
export default function CRMAccessRights() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)

  const [form, setForm] = useState<AccessRightsForm>({
    propertiesVisible: true,
    offMarketListings: false,
    comingSoonDrafts: true,
    soldArchived: false,
    otherAgentsListings: true,

    propertyTypeTags: ["Penthouse", "Villa", "Loft"],
    propertyTypeInput: "",
    filterCountryRegion: "emea",
    filterPriceRange: "luxury-5m",

    sensitiveFields: [
      { id: "full-address", name: "Full Address (street + number)", permission: "read" },
      { id: "asking-price", name: "Asking Price", permission: "read" },
      { id: "confidential-price", name: "Confidential / Minimum Price", permission: "hidden" },
      { id: "commission-rate", name: "Commission Rate", permission: "hidden" },
      { id: "owner-identity", name: "Owner / Seller Identity", permission: "read" },
      { id: "owner-contact", name: "Owner Contact Details", permission: "hidden" },
      { id: "internal-notes", name: "Internal Notes", permission: "write" },
    ],

    agentAssignment: true,
    mandateTerms: false,
    financialData: true,
    documents: true,
    offerHistory: false,
    viewingHistory: true
  })

  const updateField = useCallback(<K extends keyof AccessRightsForm>(
    field: K, 
    value: AccessRightsForm[K]
  ) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setSavedSuccess(false)
  }, [])

  /* ── Property Type Tags ── */
  const addPropertyTag = () => {
    const trimmed = form.propertyTypeInput.trim()
    if (trimmed && !form.propertyTypeTags.includes(trimmed)) {
      updateField("propertyTypeTags", [...form.propertyTypeTags, trimmed])
      updateField("propertyTypeInput", "")
    }
  }

  const removePropertyTag = (tag: string) => {
    updateField("propertyTypeTags", form.propertyTypeTags.filter(t => t !== tag))
  }

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addPropertyTag()
    }
  }

  /* ── Sensitive Field Permissions ── */
  const updateFieldPermission = (id: string, permission: PermissionLevel) => {
    setForm(prev => ({
      ...prev,
      sensitiveFields: prev.sensitiveFields.map(f => 
        f.id === id ? { ...f, permission } : f
      )
    }))
    setSavedSuccess(false)
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
   RENDER HELPERS
   ───────────────────────────────────────────────────────────── */
  const renderToggleRow = (
    label: string,
    description: string,
    checked: boolean,
    onChange: (checked: boolean) => void,
    delay: number = 0
  ) => (
    <motion.div 
      variants={itemVariants}
      className="flex items-center justify-between py-3.5 border-b border-gray-50 dark:border-gray-800/50 last:border-0"
    >
      <div>
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
          {label}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 leading-relaxed">
          {description}
        </p>
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onChange}
        className="data-[state=checked]:bg-blue-600 shrink-0 ml-4"
      />
    </motion.div>
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
            <div className="p-2.5 bg-[#1f6ea9] rounded-xl shadow-lg shadow-blue-600/20">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                CRM Access Rights
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                Configure listing visibility, field-level permissions, and operational data access.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ─── MAIN GRID: Left (1/2) + Right (1/2) ─── */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            
            {/* ─── LISTING VISIBILITY ─── */}
            <motion.div variants={cardVariants}>
              <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center gap-2.5 mb-5">
                    <Eye className="w-5 h-5 text-blue-600 dark:text-[#1f6ea9]" />
                    <h3 className="text-sm font-bold text-blue-600 dark:text-[#1f6ea9] uppercase tracking-wider">
                      Listing Visibility
                    </h3>
                  </div>

                  <div className="space-y-0">
                    {renderToggleRow(
                      "Properties Visible",
                      "Enable global visibility for active property listings",
                      form.propertiesVisible,
                      (v) => updateField("propertiesVisible", v)
                    )}
                    {renderToggleRow(
                      "Off-market / Confidential Listings",
                      "Grant access to exclusive, non-public inventory",
                      form.offMarketListings,
                      (v) => updateField("offMarketListings", v)
                    )}
                    {renderToggleRow(
                      "Coming Soon / Draft Listings",
                      "Allow viewing of pre-launch or incomplete listing drafts",
                      form.comingSoonDrafts,
                      (v) => updateField("comingSoonDrafts", v)
                    )}
                    {renderToggleRow(
                      "Sold / Archived Listings",
                      "Access historical transaction data and sold assets",
                      form.soldArchived,
                      (v) => updateField("soldArchived", v)
                    )}
                    {renderToggleRow(
                      "Other Agents' Listings",
                      "Cross-team visibility for collaborative sales",
                      form.otherAgentsListings,
                      (v) => updateField("otherAgentsListings", v)
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* ─── ADVANCED ACCESS FILTERING ─── */}
            <motion.div variants={cardVariants}>
              <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center gap-2.5 mb-6">
                    <Filter className="w-5 h-5 text-blue-600 dark:text-[#1f6ea9]" />
                    <h3 className="text-sm font-bold text-blue-600 dark:text-[#1f6ea9] uppercase tracking-wider">
                      Advanced Access Filtering
                    </h3>
                  </div>

                  <div className="space-y-5">
                    {/* Filter by Property Type */}
                    <motion.div variants={itemVariants} className="space-y-2.5">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                        Filter by Property Type
                      </label>
                      <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30 min-h-[48px]">
                        <div className="flex flex-wrap gap-2 mb-2">
                          <AnimatePresence mode="popLayout">
                            {form.propertyTypeTags.map((tag) => (
                              <motion.div
                                key={tag}
                                layout
                                variants={tagVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                              >
                                <Badge 
                                  className="bg-blue-600 hover:bg-blue-700 text-white border-0 pl-3 pr-2 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1.5 cursor-default"
                                >
                                  {tag}
                                  <button
                                    onClick={() => removePropertyTag(tag)}
                                    className="ml-0.5 hover:bg-white/20 rounded-md p-0.5 transition-colors"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </Badge>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>
                        <Input
                          value={form.propertyTypeInput}
                          onChange={(e) => updateField("propertyTypeInput", e.target.value)}
                          onKeyDown={handleTagKeyDown}
                          placeholder="Select type..."
                          className="h-9 border-0 bg-transparent shadow-none focus-visible:ring-0 p-0 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 dark:text-gray-200"
                        />
                      </div>
                    </motion.div>

                    {/* Filter by Country / Region & Price Range */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <motion.div variants={itemVariants} className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                          Filter by Country / Region
                        </label>
                        <Select 
                          value={form.filterCountryRegion} 
                          onValueChange={(v) => updateField("filterCountryRegion", v)}
                        >
                          <SelectTrigger className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
                            <SelectValue placeholder="Select region" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            <SelectItem value="emea">EMEA Region</SelectItem>
                            <SelectItem value="apac">APAC Region</SelectItem>
                            <SelectItem value="americas">Americas</SelectItem>
                            <SelectItem value="global">Global</SelectItem>
                          </SelectContent>
                        </Select>
                      </motion.div>

                      <motion.div variants={itemVariants} className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                          Filter by Price Range
                        </label>
                        <Select 
                          value={form.filterPriceRange} 
                          onValueChange={(v) => updateField("filterPriceRange", v)}
                        >
                          <SelectTrigger className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
                            <SelectValue placeholder="Select range" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            <SelectItem value="all">All Price Ranges</SelectItem>
                            <SelectItem value="entry">Entry Level (&lt; €1M)</SelectItem>
                            <SelectItem value="mid">Mid Market (€1M – €5M)</SelectItem>
                            <SelectItem value="luxury-5m">Luxury (&gt; €5M)</SelectItem>
                            <SelectItem value="ultra">Ultra Luxury (&gt; €20M)</SelectItem>
                          </SelectContent>
                        </Select>
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            
            {/* ─── SENSITIVE FIELD PERMISSIONS ─── */}
            <motion.div variants={cardVariants}>
              <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center gap-2.5 mb-6">
                    <ShieldAlert className="w-5 h-5 text-blue-600 dark:text-[#1f6ea9]" />
                    <h3 className="text-sm font-bold text-blue-600 dark:text-[#1f6ea9] uppercase tracking-wider">
                      Sensitive Field Permissions
                    </h3>
                  </div>

                  {/* Permission Matrix Header */}
                  <div className="grid grid-cols-[1fr_60px_60px_60px] gap-2 px-3 pb-2 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                      Field Name
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-center">
                      Hidden
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-center">
                      Read
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider text-center">
                      Write
                    </span>
                  </div>

                  {/* Permission Rows */}
                  <div className="space-y-0">
                    {form.sensitiveFields.map((field, index) => (
                      <motion.div
                        key={field.id}
                        variants={itemVariants}
                        custom={index}
                        className="grid grid-cols-[1fr_60px_60px_60px] gap-2 items-center py-3.5 border-b border-gray-50 dark:border-gray-800/50 last:border-0"
                      >
                        <span className="text-sm text-gray-700 dark:text-gray-200 pr-2 leading-snug">
                          {field.name}
                        </span>
                        
                        {/* Hidden */}
                        <div className="flex justify-center">
                          <button
                            onClick={() => updateFieldPermission(field.id, "hidden")}
                            className={`
                              w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200
                              ${field.permission === "hidden"
                                ? "border-blue-600 bg-blue-600"
                                : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                              }
                            `}
                          >
                            {field.permission === "hidden" && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-2 h-2 rounded-full bg-white"
                              />
                            )}
                          </button>
                        </div>

                        {/* Read */}
                        <div className="flex justify-center">
                          <button
                            onClick={() => updateFieldPermission(field.id, "read")}
                            className={`
                              w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200
                              ${field.permission === "read"
                                ? "border-blue-600 bg-blue-600"
                                : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                              }
                            `}
                          >
                            {field.permission === "read" && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-2 h-2 rounded-full bg-white"
                              />
                            )}
                          </button>
                        </div>

                        {/* Write */}
                        <div className="flex justify-center">
                          <button
                            onClick={() => updateFieldPermission(field.id, "write")}
                            className={`
                              w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200
                              ${field.permission === "write"
                                ? "border-blue-600 bg-blue-600"
                                : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                              }
                            `}
                          >
                            {field.permission === "write" && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-2 h-2 rounded-full bg-white"
                              />
                            )}
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* ─── OPERATIONAL & ASSET DATA ─── */}
            <motion.div variants={cardVariants}>
              <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center gap-2.5 mb-6">
                    <Database className="w-5 h-5 text-blue-600 dark:text-[#1f6ea9]" />
                    <h3 className="text-sm font-bold text-blue-600 dark:text-[#1f6ea9] uppercase tracking-wider">
                      Operational & Asset Data
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                    {/* Agent Assignment */}
                    <motion.label 
                      variants={itemVariants}
                      className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-800/20 hover:bg-gray-50 dark:hover:bg-gray-800/40 cursor-pointer transition-colors duration-200"
                    >
                      <Checkbox 
                        checked={form.agentAssignment}
                        onCheckedChange={(checked) => updateField("agentAssignment", checked === true)}
                        className="rounded-md border-gray-300 dark:border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200 select-none">
                        Agent Assignment
                      </span>
                    </motion.label>

                    {/* Mandate Terms & Dates */}
                    <motion.label 
                      variants={itemVariants}
                      className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-800/20 hover:bg-gray-50 dark:hover:bg-gray-800/40 cursor-pointer transition-colors duration-200"
                    >
                      <Checkbox 
                        checked={form.mandateTerms}
                        onCheckedChange={(checked) => updateField("mandateTerms", checked === true)}
                        className="rounded-md border-gray-300 dark:border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200 select-none">
                        Mandate Terms & Dates
                      </span>
                    </motion.label>

                    {/* Financial Data */}
                    <motion.label 
                      variants={itemVariants}
                      className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-800/20 hover:bg-gray-50 dark:hover:bg-gray-800/40 cursor-pointer transition-colors duration-200"
                    >
                      <Checkbox 
                        checked={form.financialData}
                        onCheckedChange={(checked) => updateField("financialData", checked === true)}
                        className="rounded-md border-gray-300 dark:border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                      <div className="select-none">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200 block">
                          Financial Data
                        </span>
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                          (yields, charges)
                        </span>
                      </div>
                    </motion.label>

                    {/* Documents */}
                    <motion.label 
                      variants={itemVariants}
                      className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-800/20 hover:bg-gray-50 dark:hover:bg-gray-800/40 cursor-pointer transition-colors duration-200"
                    >
                      <Checkbox 
                        checked={form.documents}
                        onCheckedChange={(checked) => updateField("documents", checked === true)}
                        className="rounded-md border-gray-300 dark:border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                      <div className="select-none">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200 block">
                          Documents
                        </span>
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                          (plans, EPC, photos)
                        </span>
                      </div>
                    </motion.label>

                    {/* Offer History */}
                    <motion.label 
                      variants={itemVariants}
                      className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-800/20 hover:bg-gray-50 dark:hover:bg-gray-800/40 cursor-pointer transition-colors duration-200"
                    >
                      <Checkbox 
                        checked={form.offerHistory}
                        onCheckedChange={(checked) => updateField("offerHistory", checked === true)}
                        className="rounded-md border-gray-300 dark:border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200 select-none">
                        Offer History
                      </span>
                    </motion.label>

                    {/* Viewing History */}
                    <motion.label 
                      variants={itemVariants}
                      className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-800/20 hover:bg-gray-50 dark:hover:bg-gray-800/40 cursor-pointer transition-colors duration-200"
                    >
                      <Checkbox 
                        checked={form.viewingHistory}
                        onCheckedChange={(checked) => updateField("viewingHistory", checked === true)}
                        className="rounded-md border-gray-300 dark:border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200 select-none">
                        Viewing History
                      </span>
                    </motion.label>
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
                Access rights saved successfully
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="flex gap-3 w-full sm:w-auto">
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
                "Save Rights"
              )}
            </Button>
          </div>
        </motion.div> */}

      </div>
    </motion.div>
  )
}