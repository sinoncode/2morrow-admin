"use client"

import React, { useState, useCallback } from "react"
import { motion } from "framer-motion"
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
import { 
  MapPin, 
  Link2, 
  Building2, 
  Globe, 
  Clock,
  ChevronDown,
  CheckCircle2,
  Sparkles
} from "lucide-react"

/* ─────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────── */
interface AddressForm {
  primaryLine1: string
  primaryLine2: string
  primaryZip: string
  primaryCity: string
  primaryCountry: string
  phoneCountryCode: string
  phoneNumber: string

  secondaryAddress: string
  swissCorrespondence: string

  representativeName: string
  usePrimaryForLegal: boolean
  legalAddress: string

  timeZone: string
  contactHoursFrom: string
  contactHoursTo: string
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
export default function InternationalAddresses() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)

  const [form, setForm] = useState<AddressForm>({
    primaryLine1: "Avenue des Champs-Élysées 75",
    primaryLine2: "",
    primaryZip: "75008",
    primaryCity: "Paris",
    primaryCountry: "fr",
    phoneCountryCode: "+33",
    phoneNumber: "1 42 25 00 00",

    secondaryAddress: "",
    swissCorrespondence: "",

    representativeName: "",
    usePrimaryForLegal: false,
    legalAddress: "",

    timeZone: "cet",
    contactHoursFrom: "09:00 AM",
    contactHoursTo: "06:00 PM"
  })

  const updateField = useCallback(<K extends keyof AddressForm>(
    field: K, 
    value: AddressForm[K]
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
            <div className="p-2.5 bg-[#1f6ea9] rounded-xl shadow-lg shadow-blue-600/20">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                International Addresses
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                Manage your primary, secondary, and legal correspondence addresses worldwide.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ─── PRIMARY ADDRESS ─── */}
        <motion.div variants={cardVariants}>
          <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-5 h-5 text-blue-600 dark:text-[#1f6ea9]" />
                  <h3 className="text-sm font-bold text-blue-600 dark:text-[#1f6ea9] uppercase tracking-wider">
                    Primary Address
                  </h3>
                </div>
                <Badge 
                  variant="secondary" 
                  className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-0 font-semibold text-xs px-3 py-1"
                >
                  Required
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Line 1 */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Line 1
                  </label>
                  <Input
                    value={form.primaryLine1}
                    onChange={(e) => updateField("primaryLine1", e.target.value)}
                    placeholder="Street address"
                    className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  />
                </motion.div>

                {/* Line 2 */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Line 2
                  </label>
                  <Input
                    value={form.primaryLine2}
                    onChange={(e) => updateField("primaryLine2", e.target.value)}
                    placeholder="Suite, Floor, etc."
                    className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  />
                </motion.div>

                {/* ZIP / Postal Code */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    ZIP / Postal Code
                  </label>
                  <Input
                    value={form.primaryZip}
                    onChange={(e) => updateField("primaryZip", e.target.value)}
                    placeholder="00000"
                    className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  />
                </motion.div>

                {/* City */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    City
                  </label>
                  <Input
                    value={form.primaryCity}
                    onChange={(e) => updateField("primaryCity", e.target.value)}
                    placeholder="City name"
                    className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  />
                </motion.div>

                {/* Country */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Country
                  </label>
                  <Select 
                    value={form.primaryCountry} 
                    onValueChange={(v) => updateField("primaryCountry", v)}
                  >
                    <SelectTrigger className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl max-h-60">
                      <SelectItem value="fr">France</SelectItem>
                      <SelectItem value="ch">Switzerland</SelectItem>
                      <SelectItem value="de">Germany</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="it">Italy</SelectItem>
                      <SelectItem value="es">Spain</SelectItem>
                      <SelectItem value="ae">UAE</SelectItem>
                      <SelectItem value="sg">Singapore</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                {/* Phone Number */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Phone Number
                  </label>
                  <div className="flex gap-2">
                    <Select 
                      value={form.phoneCountryCode} 
                      onValueChange={(v) => updateField("phoneCountryCode", v)}
                    >
                      <SelectTrigger className="h-11 w-20 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-sm font-medium text-gray-600 dark:text-gray-300 justify-center">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="+33">+33</SelectItem>
                        <SelectItem value="+41">+41</SelectItem>
                        <SelectItem value="+49">+49</SelectItem>
                        <SelectItem value="+44">+44</SelectItem>
                        <SelectItem value="+1">+1</SelectItem>
                        <SelectItem value="+39">+39</SelectItem>
                        <SelectItem value="+34">+34</SelectItem>
                        <SelectItem value="+971">+971</SelectItem>
                        <SelectItem value="+65">+65</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      value={form.phoneNumber}
                      onChange={(e) => updateField("phoneNumber", e.target.value)}
                      placeholder="1 42 25 00 00"
                      className="h-11 flex-1 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ─── MIDDLE ROW: Swiss (left) + Representative (right) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Swiss & Secondary Alignment */}
          <motion.div variants={cardVariants}>
            <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80 h-full">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center gap-2.5 mb-6">
                  <Link2 className="w-5 h-5 text-blue-600 dark:text-[#1f6ea9]" />
                  <h3 className="text-sm font-bold text-blue-600 dark:text-[#1f6ea9] uppercase tracking-wider">
                    Swiss & Secondary Alignment
                  </h3>
                </div>

                <div className="space-y-5">
                  {/* Secondary Address */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                      Secondary Address (Line 1)
                    </label>
                    <Input
                      value={form.secondaryAddress}
                      onChange={(e) => updateField("secondaryAddress", e.target.value)}
                      placeholder="Alternate seasonal address..."
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </motion.div>

                  {/* Swiss Correspondence Address */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                      Swiss Correspondence Address
                    </label>
                    <Select 
                      value={form.swissCorrespondence} 
                      onValueChange={(v) => updateField("swissCorrespondence", v)}
                    >
                      <SelectTrigger className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
                        <SelectValue placeholder="Select Swiss Branch / Proxy" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="zurich">Zurich Main Office</SelectItem>
                        <SelectItem value="geneva">Geneva Branch</SelectItem>
                        <SelectItem value="basel">Basel Proxy</SelectItem>
                        <SelectItem value="bern">Bern Representative</SelectItem>
                        <SelectItem value="lausanne">Lausanne Office</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5 leading-relaxed">
                      Determines legal jurisdiction for Swiss-based documents.
                    </p>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Representative Details */}
          <motion.div variants={cardVariants}>
            <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80 h-full">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center gap-2.5 mb-6">
                  <Building2 className="w-5 h-5 text-blue-600 dark:text-[#1f6ea9]" />
                  <h3 className="text-sm font-bold text-blue-600 dark:text-[#1f6ea9] uppercase tracking-wider">
                    Representative Details
                  </h3>
                </div>

                <div className="space-y-5">
                  {/* C/O Representative */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                      C/O — Care of Representative in CH
                    </label>
                    <Input
                      value={form.representativeName}
                      onChange={(e) => updateField("representativeName", e.target.value)}
                      placeholder="Name of Swiss Legal Representative"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </motion.div>

                  {/* Mailing / Legal Documents Address */}
                  <motion.div variants={itemVariants} className="space-y-3">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                      Mailing / Legal Documents Address
                    </label>
                    
                    {/* Checkbox */}
                    <div 
                      className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30 cursor-pointer hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors duration-200"
                      onClick={() => updateField("usePrimaryForLegal", !form.usePrimaryForLegal)}
                    >
                      <Checkbox 
                        checked={form.usePrimaryForLegal}
                        onCheckedChange={(checked) => updateField("usePrimaryForLegal", checked === true)}
                        className="rounded-md border-gray-300 dark:border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200 select-none">
                        Use Primary Address for Legal Mailings
                      </span>
                    </div>

                    {/* Legal Address Input */}
                    <Input
                      value={form.legalAddress}
                      onChange={(e) => updateField("legalAddress", e.target.value)}
                      placeholder="Specify different legal address if applicable"
                      disabled={form.usePrimaryForLegal}
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* ─── GLOBAL AVAILABILITY ─── */}
        <motion.div variants={cardVariants}>
          <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-2.5 mb-6">
                <Globe className="w-5 h-5 text-blue-600 dark:text-[#1f6ea9]" />
                <h3 className="text-sm font-bold text-blue-600 dark:text-[#1f6ea9] uppercase tracking-wider">
                  Global Availability
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Time Zone */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Time Zone
                  </label>
                  <Select 
                    value={form.timeZone} 
                    onValueChange={(v) => updateField("timeZone", v)}
                  >
                    <SelectTrigger className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-gray-400" />
                        <SelectValue placeholder="Select time zone" />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="rounded-xl max-h-72">
                      <SelectItem value="cet">(GMT+01:00) Central European Time - Paris</SelectItem>
                      <SelectItem value="gmt">(GMT+00:00) Greenwich Mean Time - London</SelectItem>
                      <SelectItem value="eet">(GMT+02:00) Eastern European Time - Helsinki</SelectItem>
                      <SelectItem value="est">(GMT-05:00) Eastern Standard Time - New York</SelectItem>
                      <SelectItem value="cst">(GMT-06:00) Central Standard Time - Chicago</SelectItem>
                      <SelectItem value="mst">(GMT-07:00) Mountain Standard Time - Denver</SelectItem>
                      <SelectItem value="pst">(GMT-08:00) Pacific Standard Time - Los Angeles</SelectItem>
                      <SelectItem value="jst">(GMT+09:00) Japan Standard Time - Tokyo</SelectItem>
                      <SelectItem value="sgt">(GMT+08:00) Singapore Standard Time</SelectItem>
                      <SelectItem value="aest">(GMT+10:00) Australian Eastern Standard Time - Sydney</SelectItem>
                      <SelectItem value="gst">(GMT+04:00) Gulf Standard Time - Dubai</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                {/* Best Contact Hours */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Best Contact Hours (Local Time)
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                      <Input
                        type="text"
                        value={form.contactHoursFrom}
                        onChange={(e) => updateField("contactHoursFrom", e.target.value)}
                        placeholder="09:00 AM"
                        className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 pl-10"
                      />
                      <Clock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                    
                    <span className="text-sm font-medium text-gray-400 dark:text-gray-500 shrink-0">
                      to
                    </span>
                    
                    <div className="relative flex-1">
                      <Input
                        type="text"
                        value={form.contactHoursTo}
                        onChange={(e) => updateField("contactHoursTo", e.target.value)}
                        placeholder="06:00 PM"
                        className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 pl-10"
                      />
                      <Clock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
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
          {savedSuccess && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-4 py-2.5 rounded-xl"
            >
              <CheckCircle2 className="w-4 h-4" />
              Addresses saved successfully
            </motion.div>
          )}
          
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
                "Save Addresses"
              )}
            </Button>
          </div> */}
        </motion.div>

      </div>
    </motion.div>
  )
}