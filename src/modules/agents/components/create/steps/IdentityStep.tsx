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
import { Switch } from "@/components/ui/switch"
import { 
  Briefcase, 
  Building2, 
  Calendar,
  MapPin,
  Pencil,
  CheckCircle2,
  Sparkles
} from "lucide-react"

/* ─────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────── */
type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun"

interface EmploymentForm {
  agentRole: string
  employeeNumber: string
  employmentType: string
  contractType: string
  employmentStartDate: string
  employmentEndDate: string
  directManager: { name: string; title: string; initials: string }
  teamDepartment: string
  branchLocation: string
  workingDays: Record<DayKey, boolean>
  workingHoursFrom: string
  workingHoursTo: string
  remoteWorkAllowed: boolean
  noticePeriodValue: string
  noticePeriodUnit: string
  probationEndDate: string
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
export default function EmploymentData() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)

  const [form, setForm] = useState<EmploymentForm>({
    agentRole: "Senior Sales Executive",
    employeeNumber: "EMP-2024-089",
    employmentType: "full-time",
    contractType: "standard",
    employmentStartDate: "",
    employmentEndDate: "",
    directManager: { name: "Sarah Jenkins", title: "Regional Director", initials: "SJ" },
    teamDepartment: "residential-sales",
    branchLocation: "Main Street HQ, London",
    workingDays: {
      mon: true,
      tue: true,
      wed: true,
      thu: true,
      fri: true,
      sat: false,
      sun: false
    },
    workingHoursFrom: "09:00 AM",
    workingHoursTo: "06:00 PM",
    remoteWorkAllowed: true,
    noticePeriodValue: "3",
    noticePeriodUnit: "months",
    probationEndDate: ""
  })

  const updateField = useCallback(<K extends keyof EmploymentForm>(
    field: K, 
    value: EmploymentForm[K]
  ) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setSavedSuccess(false)
  }, [])

  const toggleDay = (day: DayKey) => {
    setForm(prev => ({
      ...prev,
      workingDays: { ...prev.workingDays, [day]: !prev.workingDays[day] }
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

  const dayLabels: { key: DayKey; label: string }[] = [
    { key: "mon", label: "M" },
    { key: "tue", label: "T" },
    { key: "wed", label: "W" },
    { key: "thu", label: "T" },
    { key: "fri", label: "F" },
    { key: "sat", label: "S" },
    { key: "sun", label: "S" }
  ]

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
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                Employment Data
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                Manage employee details, work schedule, and organizational structure.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ─── TOP ROW: Basic Employment (left) + Organization (right) ─── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* LEFT: Basic Employment Data (2/3) */}
          <motion.div variants={cardVariants} className="xl:col-span-2">
            <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80 h-full">
              <CardContent className="p-6 sm:p-8">
                {/* Section Title with blue accent bar */}
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="w-1 h-5 rounded-full bg-blue-600" />
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">
                    Basic Employment Data
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Agent Role / Title */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Agent Role / Title
                    </label>
                    <Input
                      value={form.agentRole}
                      onChange={(e) => updateField("agentRole", e.target.value)}
                      placeholder="Enter role"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </motion.div>

                  {/* Employee Number / Staff ID */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Employee Number / Staff ID
                    </label>
                    <Input
                      value={form.employeeNumber}
                      onChange={(e) => updateField("employeeNumber", e.target.value)}
                      placeholder="EMP-XXXX-XXX"
                      className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </motion.div>

                  {/* Employment Type */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Employment Type
                    </label>
                    <Select 
                      value={form.employmentType} 
                      onValueChange={(v) => updateField("employmentType", v)}
                    >
                      <SelectTrigger className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="full-time">Full-Time Permanent</SelectItem>
                        <SelectItem value="part-time">Part-Time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="intern">Intern</SelectItem>
                        <SelectItem value="freelance">Freelance</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  {/* Contract Type */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Contract Type
                    </label>
                    <Select 
                      value={form.contractType} 
                      onValueChange={(v) => updateField("contractType", v)}
                    >
                      <SelectTrigger className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
                        <SelectValue placeholder="Select contract" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="standard">Standard Employment</SelectItem>
                        <SelectItem value="fixed-term">Fixed Term</SelectItem>
                        <SelectItem value="zero-hours">Zero Hours</SelectItem>
                        <SelectItem value="consultancy">Consultancy</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  {/* Employment Start Date */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Employment Start Date
                    </label>
                    <div className="relative">
                      <Input
                        type="text"
                        value={form.employmentStartDate}
                        onChange={(e) => updateField("employmentStartDate", e.target.value)}
                        placeholder="mm/dd/yyyy"
                        className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 pr-10"
                      />
                      <Calendar className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </motion.div>

                  {/* Employment End Date */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Employment End Date
                    </label>
                    <div className="relative">
                      <Input
                        type="text"
                        value={form.employmentEndDate}
                        onChange={(e) => updateField("employmentEndDate", e.target.value)}
                        placeholder="mm/dd/yyyy"
                        className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 pr-10"
                      />
                      <Calendar className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* RIGHT: Organization (1/3) */}
          <motion.div variants={cardVariants} className="xl:col-span-1">
            <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80 h-full">
              <CardContent className="p-6 sm:p-8">
                {/* Section Title with blue accent bar */}
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="w-1 h-5 rounded-full bg-blue-600" />
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">
                    Organization
                  </h3>
                </div>

                <div className="space-y-5">
                  {/* Direct Manager */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Direct Manager
                    </label>
                    <div className="flex items-center justify-between p-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                          <img
                            src={`https://ui-avatars.com/api/?name=${form.directManager.name}&background=random&color=fff&size=40`}
                            alt={form.directManager.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            {form.directManager.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {form.directManager.title}
                          </p>
                        </div>
                      </div>
                      <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <Pencil className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      </button>
                    </div>
                  </motion.div>

                  {/* Team / Department */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Team / Department
                    </label>
                    <Select 
                      value={form.teamDepartment} 
                      onValueChange={(v) => updateField("teamDepartment", v)}
                    >
                      <SelectTrigger className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
                        <SelectValue placeholder="Select team" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="residential-sales">Residential Sales</SelectItem>
                        <SelectItem value="commercial-sales">Commercial Sales</SelectItem>
                        <SelectItem value="property-management">Property Management</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="operations">Operations</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  {/* Branch / Office Location */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Branch / Office Location
                    </label>
                    <div className="relative">
                      <Input
                        value={form.branchLocation}
                        onChange={(e) => updateField("branchLocation", e.target.value)}
                        placeholder="Enter location"
                        className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 pl-10"
                      />
                      <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* ─── SCHEDULE & WORKING TERMS (Full Width) ─── */}
        <motion.div variants={cardVariants}>
          <Card className="border-0 shadow-sm dark:shadow-none dark:bg-gray-900/60 dark:border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/80">
            <CardContent className="p-6 sm:p-8">
              {/* Section Title with blue accent bar */}
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-1 h-5 rounded-full bg-blue-600" />
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Schedule & Working Terms
                </h3>
              </div>

              <div className="space-y-6">
                {/* Row 1: Working Days + Hours + Remote */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {/* Working Days */}
                  <motion.div variants={itemVariants} className="space-y-3">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Working Days
                    </label>
                    <div className="flex gap-2">
                      {dayLabels.map((day, index) => (
                        <motion.button
                          key={day.key}
                          type="button"
                          onClick={() => toggleDay(day.key)}
                          whileTap={{ scale: 0.9 }}
                          className={`
                            w-9 h-9 rounded-lg text-sm font-bold transition-all duration-200
                            ${form.workingDays[day.key]
                              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 shadow-sm"
                              : "bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                            }
                          `}
                        >
                          {day.label}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>

                  {/* Working Hours */}
                  <motion.div variants={itemVariants} className="space-y-3">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Working Hours
                    </label>
                    <div className="flex items-center gap-3">
                      <Input
                        type="text"
                        value={form.workingHoursFrom}
                        onChange={(e) => updateField("workingHoursFrom", e.target.value)}
                        placeholder="09:00 AM"
                        className="h-10 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-center text-sm"
                      />
                      <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">to</span>
                      <Input
                        type="text"
                        value={form.workingHoursTo}
                        onChange={(e) => updateField("workingHoursTo", e.target.value)}
                        placeholder="06:00 PM"
                        className="h-10 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-center text-sm"
                      />
                    </div>
                  </motion.div>

                  {/* Remote Work Options */}
                  <motion.div variants={itemVariants} className="space-y-3">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Remote Work Options
                    </label>
                    <div className="flex items-center justify-between p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/30 dark:bg-gray-800/20">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                          Remote Work Allowed
                        </span>
                      </div>
                      <Switch
                        checked={form.remoteWorkAllowed}
                        onCheckedChange={(checked) => updateField("remoteWorkAllowed", checked)}
                        className="data-[state=checked]:bg-blue-600"
                      />
                    </div>
                  </motion.div>
                </div>

                <div className="h-px bg-gray-100 dark:bg-gray-800" />

                {/* Row 2: Notice Period + Probation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Notice Period */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Notice Period
                    </label>
                    <div className="flex gap-3">
                      <Input
                        type="text"
                        value={form.noticePeriodValue}
                        onChange={(e) => updateField("noticePeriodValue", e.target.value)}
                        placeholder="3"
                        className="h-11 w-20 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-center"
                      />
                      <Select 
                        value={form.noticePeriodUnit} 
                        onValueChange={(v) => updateField("noticePeriodUnit", v)}
                      >
                        <SelectTrigger className="h-11 flex-1 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectItem value="days">Days</SelectItem>
                          <SelectItem value="weeks">Weeks</SelectItem>
                          <SelectItem value="months">Months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </motion.div>

                  {/* Probation Period End Date */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Probation Period End Date
                    </label>
                    <div className="relative">
                      <Input
                        type="text"
                        value={form.probationEndDate}
                        onChange={(e) => updateField("probationEndDate", e.target.value)}
                        placeholder="mm/dd/yyyy"
                        className="h-11 rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 pr-10"
                      />
                      <Calendar className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </motion.div>
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
                Employment data saved
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
                "Save Employment Data"
              )}
            </Button>
          </div>
        </motion.div> */}

      </div>
    </motion.div>
  )
}