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
  Building2, 
  ShieldCheck, 
  Globe,
  Camera,
  Users,
  FileText,
  Calendar,
  CheckCircle2,
  Sparkles
} from "lucide-react"

/* ─────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────── */
interface AgencyForm {
  agencyLegalName: string
  tradingName: string
  agencyType: string
  foundingYear: string
  numberOfAgents: string
  numberOfOffices: string
  countriesOfOperation: string
  primaryMarket: string
  specialisation: string
  franchiseNetworkName: string
  companyRegistrationNumber: string
  vatUidNumber: string
  agencyWebsite: string
  instagram: string
  facebook: string
  linkedin: string
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
export default function AgencyDetails() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)

  const [form, setForm] = useState<AgencyForm>({
    agencyLegalName: "Edyta Graf",
    tradingName: "Home",
    agencyType: "independent",
    foundingYear: "",
    numberOfAgents: "1-10",
    numberOfOffices: "",
    countriesOfOperation: "Manuel",
    primaryMarket: "",
    specialisation: "Residential",
    franchiseNetworkName: "",
    companyRegistrationNumber: "",
    vatUidNumber: "",
    agencyWebsite: "https://2morrow.agency",
    instagram: "@instagram_handle",
    facebook: "facebook.com/agency",
    linkedin: "linkedin.com/company/agency"
  })

  const updateField = useCallback(<K extends keyof AgencyForm>(
    field: K, 
    value: AgencyForm[K]
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
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                Agency Details
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                Manage your agency profile, registration, and social presence.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ─── TOP ROW: Agency Details (left) + Registration (right) ─── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* LEFT: Agency Details */}
          <motion.div variants={cardVariants} className="xl:col-span-2">
            <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80 h-full">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
                  <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                    Agency Details
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {/* Agency Legal Name */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Agency Legal Name
                    </label>
                    <Input
                      value={form.agencyLegalName}
                      onChange={(e) => updateField("agencyLegalName", e.target.value)}
                      placeholder="Enter legal name"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </motion.div>

                  {/* Trading Name */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Trading Name
                    </label>
                    <Input
                      value={form.tradingName}
                      onChange={(e) => updateField("tradingName", e.target.value)}
                      placeholder="Enter trading name"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </motion.div>

                  {/* Agency Type */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Agency Type
                    </label>
                    <Select 
                      value={form.agencyType} 
                      onValueChange={(v) => updateField("agencyType", v)}
                    >
                      <SelectTrigger className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="independent">Independent Agency</SelectItem>
                        <SelectItem value="franchise">Franchise</SelectItem>
                        <SelectItem value="network">Network Member</SelectItem>
                        <SelectItem value="boutique">Boutique</SelectItem>
                        <SelectItem value="corporate">Corporate</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  {/* Founding Year */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Founding Year
                    </label>
                    <Input
                      value={form.foundingYear}
                      onChange={(e) => updateField("foundingYear", e.target.value)}
                      placeholder="e.g. 2010"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </motion.div>

                  {/* Number of Agents / Staff */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Number of Agents / Staff
                    </label>
                    <Input
                      value={form.numberOfAgents}
                      onChange={(e) => updateField("numberOfAgents", e.target.value)}
                      placeholder="1-10"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </motion.div>

                  {/* Number of Offices / Branches */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Number of Offices / Branches
                    </label>
                    <Select 
                      value={form.numberOfOffices} 
                      onValueChange={(v) => updateField("numberOfOffices", v)}
                    >
                      <SelectTrigger className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
                        <SelectValue placeholder="Select number office" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2-5">2 - 5</SelectItem>
                        <SelectItem value="6-10">6 - 10</SelectItem>
                        <SelectItem value="11-20">11 - 20</SelectItem>
                        <SelectItem value="20+">20+</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  {/* Countries of Operation */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Countries of Operation
                    </label>
                    <Input
                      value={form.countriesOfOperation}
                      onChange={(e) => updateField("countriesOfOperation", e.target.value)}
                      placeholder="Enter countries"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </motion.div>

                  {/* Primary Market */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Primary Market
                    </label>
                    <div className="relative">
                      <Select 
                        value={form.primaryMarket} 
                        onValueChange={(v) => updateField("primaryMarket", v)}
                      >
                        <SelectTrigger className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 pr-10">
                          <SelectValue placeholder="Select market" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectItem value="residential">Residential</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                          <SelectItem value="luxury">Luxury</SelectItem>
                          <SelectItem value="industrial">Industrial</SelectItem>
                          <SelectItem value="mixed">Mixed Use</SelectItem>
                        </SelectContent>
                      </Select>
                      <Calendar className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </motion.div>

                  {/* Specialisation */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Specialisation
                    </label>
                    <Input
                      value={form.specialisation}
                      onChange={(e) => updateField("specialisation", e.target.value)}
                      placeholder="e.g. Residential"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* RIGHT: Registration */}
          <motion.div variants={cardVariants} className="xl:col-span-1">
            <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80 h-full">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
                  <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                    Registration
                  </h3>
                </div>

                <div className="space-y-5">
                  {/* Franchise / Network Name */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Franchise / Network Name
                    </label>
                    <Input
                      value={form.franchiseNetworkName}
                      onChange={(e) => updateField("franchiseNetworkName", e.target.value)}
                      placeholder="Enter network name"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </motion.div>

                  {/* Company Registration Number */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Company Registration Number
                    </label>
                    <Input
                      value={form.companyRegistrationNumber}
                      onChange={(e) => updateField("companyRegistrationNumber", e.target.value)}
                      placeholder="Enter registration #"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </motion.div>

                  {/* VAT / UID / TVA Number */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      VAT / UID / TVA Number
                    </label>
                    <Input
                      value={form.vatUidNumber}
                      onChange={(e) => updateField("vatUidNumber", e.target.value)}
                      placeholder="Enter tax ID"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* ─── SOCIAL PRESENCE (Full Width) ─── */}
        <motion.div variants={cardVariants}>
          <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
                <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                  Social Presence
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* Agency Website */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Agency Website
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-blue-500" />
                      <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">https://</span>
                    </div>
                    <Input
                      value={form.agencyWebsite.replace("https://", "")}
                      onChange={(e) => updateField("agencyWebsite", `https://${e.target.value}`)}
                      placeholder="2morrow.agency"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 pl-[5.5rem] text-blue-600 dark:text-blue-400 font-medium"
                    />
                  </div>
                </motion.div>

                {/* Instagram */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Instagram
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                      <Camera className="w-4 h-4 text-gray-400" />
                    </div>
                    <Input
                      value={form.instagram}
                      onChange={(e) => updateField("instagram", e.target.value)}
                      placeholder="@instagram_handle"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 pl-10 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </div>
                </motion.div>

                {/* Facebook */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Facebook
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                      <Users className="w-4 h-4 text-gray-400" />
                    </div>
                    <Input
                      value={form.facebook}
                      onChange={(e) => updateField("facebook", e.target.value)}
                      placeholder="facebook.com/agency"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 pl-10 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </div>
                </motion.div>

                {/* LinkedIn */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    LinkedIn
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                      <FileText className="w-4 h-4 text-gray-400" />
                    </div>
                    <Input
                      value={form.linkedin}
                      onChange={(e) => updateField("linkedin", e.target.value)}
                      placeholder="linkedin.com/company/agency"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 pl-10 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}