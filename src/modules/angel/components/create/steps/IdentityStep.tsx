"use client"

import React, { useState, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
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
import { 
  Upload, 
  X, 
  FileText, 
  Globe, 
  Briefcase, 
  User, 
  Shield, 
  Scroll,
  Linkedin,
  Languages,
  Calendar,
  Building2,
  BadgeCheck,
  Trash2,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  Sparkles
} from "lucide-react"

/* ─────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────── */
interface IdentityForm {
  salutation: string
  firstName: string
  lastName: string
  knownAs: string
  dateOfBirth: string
  nationality: string
  professionalTitle: string
  company: string
  professionalAssociation: string
  professionalInsurance: string
  policyNumber: string
  personalWebsite: string
  linkedinProfile: string
  primaryLanguage: string
  companyRegistrationNo: string
  vatTaxNo: string
  realEstateLicenceCountry: string
  countryOfPrimaryResidence: string
  passportNumber: string
  passportExpiry: string
  languagesSpoken: string[]
  idDocument: File | null
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
export default function Identity() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [languageInput, setLanguageInput] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)

  const [form, setForm] = useState<IdentityForm>({
    salutation: "",
    firstName: "",
    lastName: "",
    knownAs: "",
    dateOfBirth: "",
    nationality: "",
    professionalTitle: "",
    company: "",
    professionalAssociation: "",
    professionalInsurance: "",
    policyNumber: "",
    personalWebsite: "",
    linkedinProfile: "",
    primaryLanguage: "",
    companyRegistrationNo: "",
    vatTaxNo: "",
    realEstateLicenceCountry: "",
    countryOfPrimaryResidence: "",
    passportNumber: "",
    passportExpiry: "",
    languagesSpoken: ["English", "German"],
    idDocument: null
  })

  const updateField = useCallback(<K extends keyof IdentityForm>(
    field: K, 
    value: IdentityForm[K]
  ) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setSavedSuccess(false)
  }, [])

  /* ── Language Tags ── */
  const addLanguage = () => {
    const trimmed = languageInput.trim()
    if (trimmed && !form.languagesSpoken.includes(trimmed)) {
      updateField("languagesSpoken", [...form.languagesSpoken, trimmed])
      setLanguageInput("")
    }
  }

  const removeLanguage = (lang: string) => {
    updateField("languagesSpoken", form.languagesSpoken.filter(l => l !== lang))
  }

  const handleLanguageKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addLanguage()
    }
  }

  /* ── File Upload ── */
  const handleFileSelect = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0]
      const validTypes = ["application/pdf", "image/jpeg", "image/jpg", "image/png"]
      const maxSize = 10 * 1024 * 1024 // 10MB
      
      if (!validTypes.includes(file.type)) {
        alert("Please upload a PDF, JPG, or PNG file.")
        return
      }
      if (file.size > maxSize) {
        alert("File size must be less than 10MB.")
        return
      }
      updateField("idDocument", file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const removeFile = () => {
    updateField("idDocument", null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  /* ── Submit ── */
  const handleSave = async () => {
    setIsSubmitting(true)
    // Simulate API call
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
            <div className="p-2.5 bg-[#1f6ea9] rounded-xl shadow-lg shadow-blue-600/20">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                Identity Verification
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                Complete your profile and submit identity documentation for KYC compliance.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Top Grid: Personal + Professional (left) | Regulatory (right) */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* LEFT COLUMN (2/3) */}
          <div className="xl:col-span-2 space-y-6">
            
            {/* ─── PERSONAL DETAILS ─── */}
            <motion.div variants={cardVariants}>
              <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center gap-2.5 mb-6">
                    <User className="w-5 h-5 text-blue-600 dark:text-[#1f6ea9]" />
                    <h3 className="text-sm font-bold text-blue-600 dark:text-[#1f6ea9] uppercase tracking-wider">
                      Personal Details
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {/* Salutation */}
                    <motion.div variants={itemVariants} className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                        Salutation / Title
                      </label>
                      <Select 
                        value={form.salutation} 
                        onValueChange={(v) => updateField("salutation", v)}
                      >
                        <SelectTrigger className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectItem value="mr">Mr.</SelectItem>
                          <SelectItem value="mrs">Mrs.</SelectItem>
                          <SelectItem value="ms">Ms.</SelectItem>
                          <SelectItem value="dr">Dr.</SelectItem>
                          <SelectItem value="prof">Prof.</SelectItem>
                        </SelectContent>
                      </Select>
                    </motion.div>

                    {/* First Name */}
                    <motion.div variants={itemVariants} className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                        First Name
                      </label>
                      <Input
                        value={form.firstName}
                        onChange={(e) => updateField("firstName", e.target.value)}
                        placeholder="e.g. Julianne"
                        className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                      />
                    </motion.div>

                    {/* Last Name */}
                    <motion.div variants={itemVariants} className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                        Last Name
                      </label>
                      <Input
                        value={form.lastName}
                        onChange={(e) => updateField("lastName", e.target.value)}
                        placeholder="e.g. Davenport"
                        className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                      />
                    </motion.div>

                    {/* Known As */}
                    <motion.div variants={itemVariants} className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                        Known As / Preferred Name
                      </label>
                      <Input
                        value={form.knownAs}
                        onChange={(e) => updateField("knownAs", e.target.value)}
                        placeholder="e.g. Jules"
                        className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                      />
                    </motion.div>

                    {/* Date of Birth */}
                    <motion.div variants={itemVariants} className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                        Date of Birth
                      </label>
                      <div className="relative">
                        <Input
                          type="text"
                          value={form.dateOfBirth}
                          onChange={(e) => updateField("dateOfBirth", e.target.value)}
                          placeholder="mm/dd/yyyy"
                          className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 pl-10"
                        />
                        <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      </div>
                    </motion.div>

                    {/* Nationality */}
                    <motion.div variants={itemVariants} className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                        Nationality
                      </label>
                      <Select 
                        value={form.nationality} 
                        onValueChange={(v) => updateField("nationality", v)}
                      >
                        <SelectTrigger className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl max-h-60">
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="de">Germany</SelectItem>
                          <SelectItem value="fr">France</SelectItem>
                          <SelectItem value="au">Australia</SelectItem>
                          <SelectItem value="sg">Singapore</SelectItem>
                          <SelectItem value="ae">UAE</SelectItem>
                        </SelectContent>
                      </Select>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* ─── PROFESSIONAL EXPERIENCE ─── */}
            <motion.div variants={cardVariants}>
              <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center gap-2.5 mb-6">
                    <Briefcase className="w-5 h-5 text-blue-600 dark:text-[#1f6ea9]" />
                    <h3 className="text-sm font-bold text-blue-600 dark:text-[#1f6ea9] uppercase tracking-wider">
                      Professional Experience
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {/* Professional Title */}
                    <motion.div variants={itemVariants} className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                        Professional Title / Role
                      </label>
                      <Input
                        value={form.professionalTitle}
                        onChange={(e) => updateField("professionalTitle", e.target.value)}
                        placeholder="e.g. Senior Portfolio Manager"
                        className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                      />
                    </motion.div>

                    {/* Company */}
                    <motion.div variants={itemVariants} className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                        Company / Firm (if any)
                      </label>
                      <Input
                        value={form.company}
                        onChange={(e) => updateField("company", e.target.value)}
                        placeholder="e.g. Davenport & Partners"
                        className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                      />
                    </motion.div>

                    {/* Professional Association */}
                    <motion.div variants={itemVariants} className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                        Professional Association
                      </label>
                      <Input
                        value={form.professionalAssociation}
                        onChange={(e) => updateField("professionalAssociation", e.target.value)}
                        placeholder="e.g. RICS"
                        className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                      />
                    </motion.div>

                    {/* Professional Insurance */}
                    <motion.div variants={itemVariants} className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                        Professional Insurance
                      </label>
                      <Input
                        value={form.professionalInsurance}
                        onChange={(e) => updateField("professionalInsurance", e.target.value)}
                        placeholder="Provider name"
                        className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                      />
                    </motion.div>

                    {/* Policy Number */}
                    <motion.div variants={itemVariants} className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                        Policy Number / Provider
                      </label>
                      <Input
                        value={form.policyNumber}
                        onChange={(e) => updateField("policyNumber", e.target.value)}
                        placeholder="Policy #"
                        className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                      />
                    </motion.div>

                    {/* Personal Website */}
                    <motion.div variants={itemVariants} className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                        Personal Website / Profile URL
                      </label>
                      <div className="relative">
                        <Input
                          value={form.personalWebsite}
                          onChange={(e) => updateField("personalWebsite", e.target.value)}
                          placeholder="julianne.re"
                          className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 pl-16"
                        />
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">
                          https://
                        </span>
                      </div>
                    </motion.div>

                    {/* LinkedIn */}
                    <motion.div variants={itemVariants} className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                        LinkedIn Profile
                      </label>
                      <div className="relative">
                        <Input
                          value={form.linkedinProfile}
                          onChange={(e) => updateField("linkedinProfile", e.target.value)}
                          placeholder="username"
                          className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 pl-[7.5rem]"
                        />
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium truncate max-w-[6.5rem]">
                          linkedin.com/in/
                        </span>
                      </div>
                    </motion.div>

                    {/* Primary Language */}
                    <motion.div variants={itemVariants} className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                        Primary Language
                      </label>
                      <Select 
                        value={form.primaryLanguage} 
                        onValueChange={(v) => updateField("primaryLanguage", v)}
                      >
                        <SelectTrigger className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="it">Italian</SelectItem>
                          <SelectItem value="zh">Chinese</SelectItem>
                        </SelectContent>
                      </Select>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* RIGHT COLUMN (1/3) - REGULATORY & COMPLIANCE */}
          <motion.div variants={cardVariants} className="xl:col-span-1">
            <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80 h-fit">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center gap-2.5 mb-6">
                  <BadgeCheck className="w-5 h-5 text-blue-600 dark:text-[#1f6ea9]" />
                  <h3 className="text-sm font-bold text-blue-600 dark:text-[#1f6ea9] uppercase tracking-wider">
                    Regulatory & Compliance
                  </h3>
                </div>

                <div className="space-y-5">
                  {/* Company Registration No */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                      Company Registration No.
                    </label>
                    <Input
                      value={form.companyRegistrationNo}
                      onChange={(e) => updateField("companyRegistrationNo", e.target.value)}
                      placeholder="e.g. CRN1028384"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </motion.div>

                  {/* VAT/Tax No */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                      VAT / Tax No. (local)
                    </label>
                    <Input
                      value={form.vatTaxNo}
                      onChange={(e) => updateField("vatTaxNo", e.target.value)}
                      placeholder="e.g. GB123456789"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </motion.div>

                  {/* Real Estate Licence Country */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                      Real Estate Licence – Country
                    </label>
                    <Select 
                      value={form.realEstateLicenceCountry} 
                      onValueChange={(v) => updateField("realEstateLicenceCountry", v)}
                    >
                      <SelectTrigger className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl max-h-60">
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="de">Germany</SelectItem>
                        <SelectItem value="fr">France</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                        <SelectItem value="sg">Singapore</SelectItem>
                        <SelectItem value="ae">UAE</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  {/* Country of Primary Residence */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                      Country of Primary Residence
                    </label>
                    <Select 
                      value={form.countryOfPrimaryResidence} 
                      onValueChange={(v) => updateField("countryOfPrimaryResidence", v)}
                    >
                      <SelectTrigger className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl max-h-60">
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="de">Germany</SelectItem>
                        <SelectItem value="fr">France</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                        <SelectItem value="sg">Singapore</SelectItem>
                        <SelectItem value="ae">UAE</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* ─── IDENTITY DOCUMENTATION ─── */}
        <motion.div variants={cardVariants}>
          <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <Scroll className="w-5 h-5 text-blue-600 dark:text-[#1f6ea9]" />
                  <h3 className="text-sm font-bold text-blue-600 dark:text-[#1f6ea9] uppercase tracking-wider">
                    Identity Documentation
                  </h3>
                </div>
                <Badge 
                  variant="secondary" 
                  className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-0 font-semibold text-xs px-3 py-1"
                >
                  KYC Required
                </Badge>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left: Passport fields */}
                <div className="space-y-5">
                  {/* Passport Number */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                      Passport Number
                    </label>
                    <Input
                      value={form.passportNumber}
                      onChange={(e) => updateField("passportNumber", e.target.value)}
                      placeholder="e.g. AB1234567"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </motion.div>

                  {/* Passport Expiry */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                      Passport Expiry
                    </label>
                    <div className="relative">
                      <Input
                        type="text"
                        value={form.passportExpiry}
                        onChange={(e) => updateField("passportExpiry", e.target.value)}
                        placeholder="mm/dd/yyyy"
                        className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 pl-10"
                      />
                      <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </motion.div>

                  {/* Languages Spoken */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-1.5">
                      <Languages className="w-3.5 h-3.5" />
                      Languages Spoken
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <AnimatePresence mode="popLayout">
                        {form.languagesSpoken.map((lang) => (
                          <motion.div
                            key={lang}
                            layout
                            variants={tagVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                          >
                            <Badge 
                              className="bg-blue-600 hover:bg-blue-700 text-white border-0 pl-3 pr-2 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1.5 cursor-default"
                            >
                              {lang}
                              <button
                                onClick={() => removeLanguage(lang)}
                                className="ml-0.5 hover:bg-white/20 rounded-md p-0.5 transition-colors"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </Badge>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={languageInput}
                        onChange={(e) => setLanguageInput(e.target.value)}
                        onKeyDown={handleLanguageKeyDown}
                        placeholder="Type language and press Enter..."
                        className="h-10 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm"
                      />
                      <Button
                        type="button"
                        onClick={addLanguage}
                        disabled={!languageInput.trim()}
                        className="h-10 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 font-medium transition-all duration-200 disabled:opacity-40"
                      >
                        Add...
                      </Button>
                    </div>
                  </motion.div>
                </div>

                {/* Right: Upload Area */}
                <motion.div variants={itemVariants}>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileSelect(e.target.files)}
                    className="hidden"
                  />
                  
                  <AnimatePresence mode="wait">
                    {form.idDocument ? (
                      <motion.div
                        key="file-selected"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="h-full min-h-[240px] flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-300 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/20 p-6 text-center"
                      >
                        <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mb-4">
                          <FileText className="w-8 h-8 text-blue-600 dark:text-[#1f6ea9]" />
                        </div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                          {form.idDocument.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                          {(form.idDocument.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                            className="rounded-xl h-9 px-4 text-xs font-medium border-gray-300 dark:border-gray-600 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                          >
                            Change File
                          </Button>
                          <Button
                            type="button"
                            variant="destructive"
                            onClick={removeFile}
                            className="rounded-xl h-9 px-4 text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 border-0 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
                          >
                            <Trash2 className="w-3.5 h-3.5 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="upload-zone"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        onClick={() => fileInputRef.current?.click()}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        className={`
                          h-full min-h-[240px] flex flex-col items-center justify-center rounded-2xl border-2 border-dashed 
                          transition-all duration-300 cursor-pointer group
                          ${isDragging 
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 scale-[1.02] shadow-lg shadow-blue-500/10" 
                            : "border-gray-300 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30 hover:border-[#1f6ea9] dark:hover:border-blue-700 hover:bg-blue-50/30 dark:hover:bg-blue-900/20"
                          }
                        `}
                      >
                        <motion.div 
                          className="w-16 h-16 rounded-2xl bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center mb-4 group-hover:shadow-md group-hover:scale-110 transition-all duration-300"
                          animate={isDragging ? { y: [0, -6, 0] } : {}}
                          transition={{ repeat: isDragging ? Infinity : 0, duration: 1.2 }}
                        >
                          <Upload className={`w-7 h-7 transition-colors duration-300 ${isDragging ? "text-blue-600" : "text-gray-400 dark:text-gray-500 group-hover:text-blue-500"}`} />
                        </motion.div>
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
                          {isDragging ? "Drop your file here" : "Drag & Drop ID Document"}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 max-w-[240px] mb-4 leading-relaxed">
                          Upload a clear scan of your valid Passport or National ID (PDF, JPG, PNG up to 10MB)
                        </p>
                        <Button
                          type="button"
                          variant="outline"
                          className="rounded-xl h-10 px-6 text-sm font-medium border-gray-300 dark:border-gray-600 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800 hover:shadow-md transition-all duration-200"
                        >
                          Select Files
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

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
                Identity saved successfully
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* <div className="flex gap-3 w-full sm:w-auto">
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
                "Save Identity"
              )}
            </Button>
          </div> */}
        </motion.div>

      </div>
    </motion.div>
  )
}