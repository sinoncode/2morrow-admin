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
  MapPin, 
  Mail, 
  User,
  CheckCircle2,
  Sparkles
} from "lucide-react"

/* ─────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────── */
interface OfficeContactForm {
  registeredAddressLine1: string
  registeredAddressLine2: string
  registeredZipCode: string
  registeredCity: string
  registeredCountry: string
  officeAddressDifferent: string
  generalPhone: string
  generalEmail: string
  primaryContactPerson: string
  secondaryContactPerson: string
  ownerName: string
  ownerEmail: string
  ownerPhone: string
  emergencyContact: string
}

/* ─────────────────────────────────────────────────────────────
   ANIMATION VARIANTS
   ───────────────────────────────────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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
export default function OfficeAddress() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)

  const [form, setForm] = useState<OfficeContactForm>({
    registeredAddressLine1: "Edyta Graf",
    registeredAddressLine2: "Home",
    registeredZipCode: "",
    registeredCity: "Franchise",
    registeredCountry: "",
    officeAddressDifferent: "",
    generalPhone: "Manuel",
    generalEmail: "",
    primaryContactPerson: "",
    secondaryContactPerson: "Manuel",
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
    emergencyContact: ""
  })

  const updateField = useCallback(<K extends keyof OfficeContactForm>(
    field: K, 
    value: OfficeContactForm[K]
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
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                Office Address & Contact
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                Manage registered office details, communication channels, and owner information.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ─── OFFICE ADDRESS ─── */}
        <motion.div variants={cardVariants}>
          <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">
                    Office Address
                  </h3>
                  <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-0.5">
                    Official Registration Data
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Registered Address - Line 1 */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                    Registered Address - Line 1
                  </label>
                  <Input
                    value={form.registeredAddressLine1}
                    onChange={(e) => updateField("registeredAddressLine1", e.target.value)}
                    placeholder="Enter address"
                    className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  />
                </motion.div>

                {/* Registered Address - Line 2 */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                    Registered Address - Line 2
                  </label>
                  <Input
                    value={form.registeredAddressLine2}
                    onChange={(e) => updateField("registeredAddressLine2", e.target.value)}
                    placeholder="Home"
                    className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  />
                </motion.div>

                {/* Registered ZIP code */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                    Registered ZIP code
                  </label>
                  <Input
                    value={form.registeredZipCode}
                    onChange={(e) => updateField("registeredZipCode", e.target.value)}
                    placeholder="Enter ZIP"
                    className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  />
                </motion.div>

                {/* Registered City */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                    Registered City
                  </label>
                  <Input
                    value={form.registeredCity}
                    onChange={(e) => updateField("registeredCity", e.target.value)}
                    placeholder="Enter city"
                    className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  />
                </motion.div>

                {/* Registered Country */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                    Registered Country
                  </label>
                  <Input
                    value={form.registeredCountry}
                    onChange={(e) => updateField("registeredCountry", e.target.value)}
                    placeholder="Enter Company Registration Number"
                    className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  />
                </motion.div>

                {/* Office Address (if different) */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                    Office Address (if different)
                  </label>
                  <Input
                    value={form.officeAddressDifferent}
                    onChange={(e) => updateField("officeAddressDifferent", e.target.value)}
                    placeholder="Enter office address"
                    className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  />
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ─── CONTACT INFORMATION ─── */}
        <motion.div variants={cardVariants}>
          <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">
                    Contact Information
                  </h3>
                  <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-0.5">
                    Primary Communication Channels
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* General Phone */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                    General Phone
                  </label>
                  <Input
                    value={form.generalPhone}
                    onChange={(e) => updateField("generalPhone", e.target.value)}
                    placeholder="Enter phone"
                    className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  />
                </motion.div>

                {/* General Email */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                    General Email
                  </label>
                  <Select 
                    value={form.generalEmail} 
                    onValueChange={(v) => updateField("generalEmail", v)}
                  >
                    <SelectTrigger className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="info@agency.com">info@agency.com</SelectItem>
                      <SelectItem value="contact@agency.com">contact@agency.com</SelectItem>
                      <SelectItem value="support@agency.com">support@agency.com</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                {/* Primary Contact Person */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                    Primary Contact Person
                  </label>
                  <Input
                    value={form.primaryContactPerson}
                    onChange={(e) => updateField("primaryContactPerson", e.target.value)}
                    placeholder="Select number office"
                    className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  />
                </motion.div>

                {/* Secondary Contact Person */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                    Secondary Contact Person
                  </label>
                  <Input
                    value={form.secondaryContactPerson}
                    onChange={(e) => updateField("secondaryContactPerson", e.target.value)}
                    placeholder="Enter name"
                    className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  />
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ─── OWNER CONTACT DETAILS ─── */}
        <motion.div variants={cardVariants}>
          <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">
                    Owner Contact Details
                  </h3>
                  <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-0.5">
                    Executive & Emergency Stakeholders
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Owner Name */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                    Owner Name
                  </label>
                  <Input
                    value={form.ownerName}
                    onChange={(e) => updateField("ownerName", e.target.value)}
                    placeholder="Enter owner name"
                    className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  />
                </motion.div>

                {/* Owner Email */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                    Owner Email
                  </label>
                  <Input
                    type="email"
                    value={form.ownerEmail}
                    onChange={(e) => updateField("ownerEmail", e.target.value)}
                    placeholder="Enter owner email"
                    className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  />
                </motion.div>

                {/* Owner Phone */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                    Owner Phone
                  </label>
                  <Input
                    value={form.ownerPhone}
                    onChange={(e) => updateField("ownerPhone", e.target.value)}
                    placeholder="Owner phone number"
                    className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  />
                </motion.div>

                {/* Emergency Contact */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                    Emergency Contact
                  </label>
                  <Input
                    value={form.emergencyContact}
                    onChange={(e) => updateField("emergencyContact", e.target.value)}
                    placeholder="Emergency contact no"
                    className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  />
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

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
                Contact details saved
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