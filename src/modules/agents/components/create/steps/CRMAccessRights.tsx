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
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { 
  Lock, 
  AtSign,
  X,
  Plus,
  ShieldCheck,
  Award,
  MonitorCheck
} from "lucide-react"

/* ─────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────── */
type ModuleTag = { id: string; name: string }

interface PermissionsForm {
  crmLoginEmail: string
  crmRole: string
  twoFactorEnabled: boolean
  modules: ModuleTag[]
  moduleInput: string
  canCreateListings: boolean
  canEditOtherAgents: boolean
  canDeleteRecords: boolean
  canManageUsers: boolean
  canViewCommissionData: string
  canExportData: string
  canManagePortals: string
  canAccessFinancialReports: string
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
export default function ModuleDataPermissions() {
  const [form, setForm] = useState<PermissionsForm>({
    crmLoginEmail: "edyta.graf@2morrow.estate",
    crmRole: "senior-property-consultant",
    twoFactorEnabled: true,
    modules: [
      { id: "inventory", name: "Inventory" },
      { id: "crm", name: "CRM" },
      { id: "reports", name: "Reports" },
      { id: "leads", name: "Leads" }
    ],
    moduleInput: "",
    canCreateListings: true,
    canEditOtherAgents: false,
    canDeleteRecords: false,
    canManageUsers: false,
    canViewCommissionData: "full-access",
    canExportData: "all-formats",
    canManagePortals: "manual-approval",
    canAccessFinancialReports: "monthly-only"
  })

  const updateField = useCallback(<K extends keyof PermissionsForm>(
    field: K, 
    value: PermissionsForm[K]
  ) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }, [])

  /* ── Module Tags ── */
  const addModule = () => {
    const trimmed = form.moduleInput.trim()
    if (trimmed && !form.modules.find(m => m.name.toLowerCase() === trimmed.toLowerCase())) {
      updateField("modules", [...form.modules, { id: trimmed.toLowerCase().replace(/\s+/g, "-"), name: trimmed }])
      updateField("moduleInput", "")
    }
  }

  const removeModule = (id: string) => {
    updateField("modules", form.modules.filter(m => m.id !== id))
  }

  const handleModuleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addModule()
    }
  }

  /* ─────────────────────────────────────────────────────────────
   RENDER
   ───────────────────────────────────────────────────────────── */
  return (
    <motion.div 
      className="min-h-full bg-[#F4F7F9] dark:bg-gray-950 p-4 sm:p-6 lg:p-8 font-sans"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="mx-auto max-w-full space-y-6">
        
        {/* ─── MAIN GRID: Login (left) + Permissions (right) ─── */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          
          {/* LEFT: Login Details (4/12) */}
          <motion.div variants={cardVariants} className="xl:col-span-4 flex flex-col h-full">
            <Card className="border border-gray-200 dark:border-gray-800 shadow-sm rounded-xl overflow-hidden bg-white dark:bg-gray-900 h-full">
              <CardContent className="p-6 sm:p-8 flex flex-col h-full">
                
                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-lg bg-[#F0F5FF] dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                    <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
                    Login Details
                  </h2>
                </div>

                <div className="space-y-6 flex-1">
                  
                  {/* CRM Login Email */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                      CRM Login Email
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        <AtSign className="w-4 h-4 text-slate-500" />
                      </div>
                      <Input
                        value={form.crmLoginEmail}
                        onChange={(e) => updateField("crmLoginEmail", e.target.value)}
                        className="pl-9 bg-[#F4F7F9] dark:bg-gray-800/50 border-0 text-slate-700 dark:text-slate-200 rounded-lg h-11 focus-visible:ring-1 focus-visible:ring-blue-500 shadow-none"
                        placeholder="email@example.com"
                      />
                    </div>
                  </motion.div>

                  {/* CRM Role */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                      CRM Role / Permission Level
                    </label>
                    <div className="relative">
                      <Select 
                        value={form.crmRole} 
                        onValueChange={(val) => updateField("crmRole", val)}
                      >
                        <SelectTrigger className="pl-9 bg-[#F4F7F9] dark:bg-gray-800/50 border-0 text-slate-700 dark:text-slate-200 rounded-lg h-11 focus:ring-1 focus:ring-blue-500 shadow-none">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <Award className="w-4 h-4 text-slate-500" />
                          </div>
                          <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="senior-property-consultant">Senior Property Consultant</SelectItem>
                          <SelectItem value="admin">Administrator</SelectItem>
                          <SelectItem value="agent">Agent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </motion.div>

                </div>

                {/* Two-Factor Auth Box */}
                <motion.div variants={itemVariants} className="mt-8">
                  <div className="bg-[#F8FAFC] dark:bg-gray-800/40 border border-slate-100 dark:border-gray-800 rounded-xl p-5 flex items-center justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                        Two-Factor Authentication
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-[160px]">
                        Secure login via SMS or App
                      </p>
                    </div>
                    <Switch 
                      checked={form.twoFactorEnabled}
                      onCheckedChange={(checked) => updateField("twoFactorEnabled", checked)}
                      className="data-[state=checked]:bg-blue-600"
                    />
                  </div>
                </motion.div>

              </CardContent>
            </Card>
          </motion.div>

          {/* RIGHT: Module & Data Permissions (8/12) */}
          <motion.div variants={cardVariants} className="xl:col-span-8">
            <Card className="border border-gray-200 dark:border-gray-800 shadow-sm rounded-xl overflow-hidden bg-white dark:bg-gray-900 h-full">
              <CardContent className="p-6 sm:p-8">
                
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#F0F5FF] dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                      <MonitorCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
                      Module & Data Permissions
                    </h2>
                  </div>
                  <Badge variant="secondary" className="bg-[#E6F4EA] text-[#1E7E34] hover:bg-[#E6F4EA] dark:bg-green-900/30 dark:text-green-400 border-0 font-bold tracking-wide uppercase px-3 py-1 rounded-md text-[10px]">
                    Custom Profile
                  </Badge>
                </div>

                {/* Modules Accessible */}
                <motion.div variants={itemVariants} className="mb-10">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-3">
                    Modules Accessible
                  </label>
                  <div className="flex flex-wrap items-center gap-2">
                    <AnimatePresence>
                      {form.modules.map(module => (
                        <motion.div
                          key={module.id}
                          variants={tagVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="flex items-center gap-1.5 bg-[#0A58CA] text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-sm"
                        >
                          {module.name}
                          <button 
                            onClick={() => removeModule(module.id)}
                            className="hover:bg-blue-700 rounded-full p-0.5 transition-colors focus:outline-none"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    
                    {/* Add Module Button / Input */}
                    <div className="relative flex items-center">
                      <div className="flex items-center border border-dashed border-[#0A58CA] text-[#0A58CA] dark:border-blue-500 dark:text-blue-400 rounded-full px-1 overflow-hidden focus-within:ring-2 ring-blue-500/20 transition-all bg-white dark:bg-gray-900">
                        <Plus className="w-4 h-4 ml-2" />
                        <input
                          type="text"
                          value={form.moduleInput}
                          onChange={(e) => updateField("moduleInput", e.target.value)}
                          onKeyDown={handleModuleKeyDown}
                          onBlur={addModule}
                          placeholder="Add Module"
                          className="w-24 sm:w-28 bg-transparent border-none text-sm font-medium focus:ring-0 px-2 py-1.5 outline-none placeholder:text-[#0A58CA]/60 dark:placeholder:text-blue-400/60"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Permissions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  
                  {/* ACTIONS COLUMN */}
                  <div className="space-y-6">
                    <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase mb-4">
                      Actions
                    </h3>

                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Can Create Listings</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Allow adding new units to inventory</p>
                      </div>
                      <Switch 
                        checked={form.canCreateListings} 
                        onCheckedChange={(val) => updateField("canCreateListings", val)}
                        className="data-[state=checked]:bg-blue-600 mt-1"
                      />
                    </div>

                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Can Edit Other Agents' Listings</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Global edit access for entire agency</p>
                      </div>
                      <Switch 
                        checked={form.canEditOtherAgents} 
                        onCheckedChange={(val) => updateField("canEditOtherAgents", val)}
                        className="data-[state=checked]:bg-blue-600 mt-1"
                      />
                    </div>

                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Can Delete Records</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Permanent deletion authority</p>
                      </div>
                      <Switch 
                        checked={form.canDeleteRecords} 
                        onCheckedChange={(val) => updateField("canDeleteRecords", val)}
                        className="data-[state=checked]:bg-blue-600 mt-1"
                      />
                    </div>

                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Can Manage Users</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Creation and management of team profiles</p>
                      </div>
                      <Switch 
                        checked={form.canManageUsers} 
                        onCheckedChange={(val) => updateField("canManageUsers", val)}
                        className="data-[state=checked]:bg-blue-600 mt-1"
                      />
                    </div>
                  </div>

                  {/* DATA VISIBILITY COLUMN */}
                  <div className="space-y-6">
                    <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase mb-4">
                      Data Visibility
                    </h3>

                    <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
                        Can View Commission Data
                      </label>
                      <Select value={form.canViewCommissionData} onValueChange={(val) => updateField("canViewCommissionData", val)}>
                        <SelectTrigger className="w-full bg-[#F4F7F9] dark:bg-gray-800/50 border-0 h-11 text-slate-700 dark:text-slate-200 shadow-none">
                          <SelectValue placeholder="Select visibility" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-access">Full Access (Agency Wide)</SelectItem>
                          <SelectItem value="personal-only">Personal Only</SelectItem>
                          <SelectItem value="none">None</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
                        Can Export Data
                      </label>
                      <Select value={form.canExportData} onValueChange={(val) => updateField("canExportData", val)}>
                        <SelectTrigger className="w-full bg-[#F4F7F9] dark:bg-gray-800/50 border-0 h-11 text-slate-700 dark:text-slate-200 shadow-none">
                          <SelectValue placeholder="Select export rights" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all-formats">All Formats (CSV, PDF, XL)</SelectItem>
                          <SelectItem value="pdf-only">PDF Only</SelectItem>
                          <SelectItem value="none">None</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
                        Can Manage Portals / Publications
                      </label>
                      <Select value={form.canManagePortals} onValueChange={(val) => updateField("canManagePortals", val)}>
                        <SelectTrigger className="w-full bg-[#F4F7F9] dark:bg-gray-800/50 border-0 h-11 text-slate-700 dark:text-slate-200 shadow-none">
                          <SelectValue placeholder="Select portal access" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="manual-approval">Manual Approval Required</SelectItem>
                          <SelectItem value="direct-publish">Direct Publish</SelectItem>
                          <SelectItem value="no-access">No Access</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
                        Can Access Financial Reports
                      </label>
                      <Select value={form.canAccessFinancialReports} onValueChange={(val) => updateField("canAccessFinancialReports", val)}>
                        <SelectTrigger className="w-full bg-[#F4F7F9] dark:bg-gray-800/50 border-0 h-11 text-slate-700 dark:text-slate-200 shadow-none">
                          <SelectValue placeholder="Select report access" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monthly-only">Monthly Summaries Only</SelectItem>
                          <SelectItem value="full-reports">Full Financial Reports</SelectItem>
                          <SelectItem value="none">No Access</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                  </div>
                </div>

              </CardContent>
            </Card>
          </motion.div>

        </div>
      </div>
    </motion.div>
  )
} 