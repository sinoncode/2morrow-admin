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
import { Progress } from "@/components/ui/progress"
import { 
  Shield, 
  Monitor, 
  Smartphone, 
  Mail, 
  Globe,
  Clock,
  MapPin,
  HardDrive,
  Activity,
  Download,
  X,
  CheckCircle2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Laptop,
  Tablet
} from "lucide-react"

/* ─────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────── */
interface Session {
  id: number
  device: string
  os: string
  location: string
  dateTime: string
  ipAddress: string
  status: "current" | "completed"
}

interface CRMAccessForm {
  crmLoginEmail: string
  portalLanguage: string
  activationDate: string
  expiryDate: string
  twoFactorEnabled: boolean

  ipRestrictionInput: string
  restrictedIps: string[]

  mobileAppAccess: boolean
  emailNotifications: boolean
  apiAccess: boolean
  dashboardView: string
  listingFeedFormat: string
}

/* ─────────────────────────────────────────────────────────────
   MOCK DATA
   ───────────────────────────────────────────────────────────── */
const SESSIONS: Session[] = [
  {
    id: 1,
    device: "Chrome",
    os: "Windows 11",
    location: "London, United Kingdom",
    dateTime: "Oct 24, 2023 · 14:32",
    ipAddress: "192.168.1.45",
    status: "current"
  },
  {
    id: 2,
    device: "iPhone 14",
    os: "Angel App v2.4",
    location: "London, United Kingdom",
    dateTime: "Oct 23, 2023 · 09:15",
    ipAddress: "212.45.1.201",
    status: "completed"
  },
  {
    id: 3,
    device: "Safari",
    os: "macOS Sonoma",
    location: "Paris, France",
    dateTime: "Oct 21, 2023 · 18:44",
    ipAddress: "184.18.23.5",
    status: "completed"
  },
  {
    id: 4,
    device: "Firefox",
    os: "Ubuntu 22.04",
    location: "Berlin, Germany",
    dateTime: "Oct 20, 2023 · 11:20",
    ipAddress: "91.45.12.88",
    status: "completed"
  },
  {
    id: 5,
    device: "Edge",
    os: "Windows 10",
    location: "Madrid, Spain",
    dateTime: "Oct 19, 2023 · 16:05",
    ipAddress: "203.12.5.44",
    status: "completed"
  }
]

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

const tableRowVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.35,
      ease: "easeOut"
    }
  })
}

/* ─────────────────────────────────────────────────────────────
   HELPERS
   ───────────────────────────────────────────────────────────── */
function getDeviceIcon(device: string) {
  const d = device.toLowerCase()
  if (d.includes("iphone") || d.includes("android") || d.includes("mobile")) {
    return <Smartphone className="w-4 h-4" />
  }
  if (d.includes("ipad") || d.includes("tablet")) {
    return <Tablet className="w-4 h-4" />
  }
  return <Monitor className="w-4 h-4" />
}

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────────── */
export default function CRMAccess() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 14

  const [form, setForm] = useState<CRMAccessForm>({
    crmLoginEmail: "alexander.vance@2morrow.realestate",
    portalLanguage: "en-uk",
    activationDate: "01/12/2023",
    expiryDate: "01/12/2025",
    twoFactorEnabled: true,

    ipRestrictionInput: "",
    restrictedIps: ["212.45.1.201", "104.18.23.5"],

    mobileAppAccess: true,
    emailNotifications: true,
    apiAccess: false,
    dashboardView: "property-portfolio",
    listingFeedFormat: "json-standard"
  })

  const updateField = useCallback(<K extends keyof CRMAccessForm>(
    field: K, 
    value: CRMAccessForm[K]
  ) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setSavedSuccess(false)
  }, [])

  /* ── IP Restriction ── */
  const addIp = () => {
    const ip = form.ipRestrictionInput.trim()
    if (ip && !form.restrictedIps.includes(ip)) {
      updateField("restrictedIps", [...form.restrictedIps, ip])
      updateField("ipRestrictionInput", "")
    }
  }

  const removeIp = (ip: string) => {
    updateField("restrictedIps", form.restrictedIps.filter(i => i !== ip))
  }

  const handleIpKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addIp()
    }
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
                CRM Access
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                Manage authentication settings, access controls, and monitor session activity.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ─── TOP ROW: Authentication (left) + Security Snapshot (right) ─── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* LEFT: Authentication Details + Interface Settings */}
          <div className="xl:col-span-2 space-y-6">
            
            {/* Authentication Details */}
            <motion.div variants={cardVariants}>
              <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2.5">
                      <Shield className="w-5 h-5 text-blue-600 dark:text-[#1f6ea9]" />
                      <h3 className="text-sm font-bold text-blue-600 dark:text-[#1f6ea9] uppercase tracking-wider">
                        Authentication Details
                      </h3>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 border-0 font-semibold text-xs px-3 py-1 flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      Account Active
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* CRM Login Email */}
                    <motion.div variants={itemVariants} className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                        CRM Login Email
                      </label>
                      <Input
                        type="email"
                        value={form.crmLoginEmail}
                        onChange={(e) => updateField("crmLoginEmail", e.target.value)}
                        placeholder="email@example.com"
                        className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                      />
                    </motion.div>

                    {/* Portal Language */}
                    <motion.div variants={itemVariants} className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                        Portal Language
                      </label>
                      <Select 
                        value={form.portalLanguage} 
                        onValueChange={(v) => updateField("portalLanguage", v)}
                      >
                        <SelectTrigger className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectItem value="en-uk">English (United Kingdom)</SelectItem>
                          <SelectItem value="en-us">English (United States)</SelectItem>
                          <SelectItem value="de">Deutsch</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="it">Italiano</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                        </SelectContent>
                      </Select>
                    </motion.div>

                    {/* Activation Date */}
                    <motion.div variants={itemVariants} className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                        CRM Access Activation Date
                      </label>
                      <div className="relative">
                        <Input
                          type="text"
                          value={form.activationDate}
                          onChange={(e) => updateField("activationDate", e.target.value)}
                          placeholder="mm/dd/yyyy"
                          className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 pl-10"
                        />
                        <Clock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      </div>
                    </motion.div>

                    {/* Expiry Date */}
                    <motion.div variants={itemVariants} className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                        CRM Access Expiry Date
                      </label>
                      <div className="relative">
                        <Input
                          type="text"
                          value={form.expiryDate}
                          onChange={(e) => updateField("expiryDate", e.target.value)}
                          placeholder="mm/dd/yyyy"
                          className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 pl-10"
                        />
                        <Clock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Two-Factor Authentication */}
                  <motion.div 
                    variants={itemVariants}
                    className="mt-6 flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-blue-600 dark:text-[#1f6ea9]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          Two-Factor Authentication
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Enhanced security via mobile authenticator app
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={form.twoFactorEnabled}
                      onCheckedChange={(checked) => updateField("twoFactorEnabled", checked)}
                      className="data-[state=checked]:bg-blue-600"
                    />
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Interface & Capability Settings */}
            <motion.div variants={cardVariants}>
              <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center gap-2.5 mb-6">
                    <Monitor className="w-5 h-5 text-blue-600 dark:text-[#1f6ea9]" />
                    <h3 className="text-sm font-bold text-blue-600 dark:text-[#1f6ea9] uppercase tracking-wider">
                      Interface & Capability Settings
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left: Toggles */}
                    <div className="space-y-4">
                      {/* Mobile App Access */}
                      <motion.div 
                        variants={itemVariants}
                        className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 hover:border-gray-200 dark:hover:border-gray-700 transition-colors duration-200"
                      >
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            Mobile App Access
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            Allow login via iOS/Android
                          </p>
                        </div>
                        <Switch
                          checked={form.mobileAppAccess}
                          onCheckedChange={(checked) => updateField("mobileAppAccess", checked)}
                          className="data-[state=checked]:bg-blue-600"
                        />
                      </motion.div>

                      {/* Email Notifications */}
                      <motion.div 
                        variants={itemVariants}
                        className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 hover:border-gray-200 dark:hover:border-gray-700 transition-colors duration-200"
                      >
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            Email Notifications
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            Crucial alerts and reports
                          </p>
                        </div>
                        <Switch
                          checked={form.emailNotifications}
                          onCheckedChange={(checked) => updateField("emailNotifications", checked)}
                          className="data-[state=checked]:bg-blue-600"
                        />
                      </motion.div>

                      {/* API Access */}
                      <motion.div 
                        variants={itemVariants}
                        className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 hover:border-gray-200 dark:hover:border-gray-700 transition-colors duration-200"
                      >
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            API Access
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            Enable REST API endpoints
                          </p>
                        </div>
                        <Switch
                          checked={form.apiAccess}
                          onCheckedChange={(checked) => updateField("apiAccess", checked)}
                          className="data-[state=checked]:bg-blue-600"
                        />
                      </motion.div>
                    </div>

                    {/* Right: Selects */}
                    <div className="space-y-5">
                      {/* Dashboard View */}
                      <motion.div variants={itemVariants} className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                          Dashboard View
                        </label>
                        <Select 
                          value={form.dashboardView} 
                          onValueChange={(v) => updateField("dashboardView", v)}
                        >
                          <SelectTrigger className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
                            <SelectValue placeholder="Select view" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            <SelectItem value="property-portfolio">Property Portfolio Overview</SelectItem>
                            <SelectItem value="sales-pipeline">Sales Pipeline</SelectItem>
                            <SelectItem value="market-analytics">Market Analytics</SelectItem>
                            <SelectItem value="team-activity">Team Activity</SelectItem>
                          </SelectContent>
                        </Select>
                      </motion.div>

                      {/* Listing Feed Format */}
                      <motion.div variants={itemVariants} className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                          Listing Feed Format
                        </label>
                        <Select 
                          value={form.listingFeedFormat} 
                          onValueChange={(v) => updateField("listingFeedFormat", v)}
                        >
                          <SelectTrigger className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
                            <SelectValue placeholder="Select format" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            <SelectItem value="json-standard">JSON Standard (Universal)</SelectItem>
                            <SelectItem value="xml-idx">XML IDX Compatible</SelectItem>
                            <SelectItem value="rest-api">REST API Feed</SelectItem>
                            <SelectItem value="csv-export">CSV Export</SelectItem>
                          </SelectContent>
                        </Select>
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* RIGHT: Security Snapshot */}
          <motion.div variants={cardVariants} className="xl:col-span-1 space-y-6">
            <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80 h-fit">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Security Snapshot
                  </h3>
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                </div>

                <div className="space-y-6">
                  {/* Last Login */}
                  <motion.div variants={itemVariants} className="space-y-1.5">
                    <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                      Last Login
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      Oct 24, 2023 · 14:32:01
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      London, UK (192.168.1.45)
                    </p>
                  </motion.div>

                  <div className="h-px bg-gray-100 dark:bg-gray-800" />

                  {/* IP Restriction */}
                  <motion.div variants={itemVariants} className="space-y-3">
                    <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                      IP Restriction
                    </p>
                    <div className="flex gap-2">
                      <Input
                        value={form.ipRestrictionInput}
                        onChange={(e) => updateField("ipRestrictionInput", e.target.value)}
                        onKeyDown={handleIpKeyDown}
                        placeholder="Add IP Address..."
                        className="h-10 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm"
                      />
                      <Button
                        type="button"
                        onClick={addIp}
                        disabled={!form.ipRestrictionInput.trim()}
                        className="h-10 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-all duration-200 disabled:opacity-40"
                      >
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <AnimatePresence mode="popLayout">
                        {form.restrictedIps.map((ip) => (
                          <motion.div
                            key={ip}
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ type: "spring", stiffness: 500, damping: 25 }}
                          >
                            <Badge 
                              className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-0 pl-3 pr-2 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1.5"
                            >
                              {ip}
                              <button
                                onClick={() => removeIp(ip)}
                                className="ml-0.5 hover:bg-blue-100 dark:hover:bg-blue-800/50 rounded-md p-0.5 transition-colors"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </Badge>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>

            {/* Access Summary - Blue Card */}
            <motion.div variants={cardVariants}>
              <Card className="border-0 shadow-lg shadow-blue-900/20 rounded-2xl overflow-hidden bg-gradient-to-br from-[#1f6ea9] to-[#0a2f4f] dark:from-[#0a2f4f] dark:to-[#1f6ea9]">
                <CardContent className="p-6 sm:p-8 text-white">
                  <h3 className="text-sm font-bold text-blue-100 uppercase tracking-wider mb-5">
                    Access Summary
                  </h3>

                  <div className="space-y-5">
                    {/* Storage Used */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-blue-100 font-medium">Storage Used</span>
                        <span className="font-bold">42.8 GB / 100 GB</span>
                      </div>
                      <div className="h-2 rounded-full bg-blue-800/50 overflow-hidden">
                        <motion.div 
                          className="h-full rounded-full bg-white/90"
                          initial={{ width: 0 }}
                          animate={{ width: "42.8%" }}
                          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                        />
                      </div>
                    </div>

                    {/* API Requests */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-blue-100 font-medium">2.5k API Requests</span>
                      <span className="text-xs text-blue-200 font-medium bg-blue-800/40 px-2 py-0.5 rounded-md">
                        Today
                      </span>
                    </div>

                    {/* Download Audit Log */}
                    <Button
                      type="button"
                      className="w-full h-11 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-medium transition-all duration-200 backdrop-blur-sm"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Audit Log
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* ─── RECENT SESSION HISTORY ─── */}
        <motion.div variants={cardVariants}>
          <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <Activity className="w-5 h-5 text-blue-600 dark:text-[#1f6ea9]" />
                  <h3 className="text-sm font-bold text-blue-600 dark:text-[#1f6ea9] uppercase tracking-wider">
                    Recent Session History
                  </h3>
                </div>
                <button className="text-xs font-medium text-blue-600 dark:text-[#1f6ea9] hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                  View All Activities
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto -mx-2">
                <table className="w-full min-w-[640px]">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-800">
                      <th className="text-left py-3 px-3 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                        Device & OS
                      </th>
                      <th className="text-left py-3 px-3 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="text-left py-3 px-3 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th className="text-left py-3 px-3 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                        IP Address
                      </th>
                      <th className="text-left py-3 px-3 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {SESSIONS.slice(0, 3).map((session, index) => (
                      <motion.tr
                        key={session.id}
                        custom={index}
                        variants={tableRowVariants}
                        initial="hidden"
                        animate="visible"
                        className="border-b border-gray-50 dark:border-gray-800/50 last:border-0 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors duration-150"
                      >
                        <td className="py-4 px-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400">
                              {getDeviceIcon(session.device)}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {session.device}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {session.os}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-3">
                          <div className="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300">
                            <MapPin className="w-3.5 h-3.5 text-gray-400" />
                            {session.location}
                          </div>
                        </td>
                        <td className="py-4 px-3">
                          <div className="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300">
                            <Clock className="w-3.5 h-3.5 text-gray-400" />
                            {session.dateTime}
                          </div>
                        </td>
                        <td className="py-4 px-3">
                          <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
                            {session.ipAddress}
                          </span>
                        </td>
                        <td className="py-4 px-3">
                          {session.status === "current" ? (
                            <Badge className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 border-0 font-medium text-xs px-2.5 py-1 rounded-md flex items-center gap-1.5 w-fit">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                              Current
                            </Badge>
                          ) : (
                            <Badge 
                              variant="secondary" 
                              className="bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border-0 font-medium text-xs px-2.5 py-1 rounded-md"
                            >
                              Completed
                            </Badge>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Showing 3 of 42 sessions
                </p>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    Previous
                  </button>
                  
                  {[1, 2, 3].map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`
                        w-8 h-8 rounded-lg text-xs font-semibold transition-all duration-200
                        ${currentPage === page
                          ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                          : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }
                      `}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
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
                Settings saved successfully
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
                "Save Settings"
              )}
            </Button>
          </div>
        </motion.div> */}

      </div>
    </motion.div>
  )
}