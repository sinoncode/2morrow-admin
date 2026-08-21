"use client"

import React, { useState } from "react"
import { motion, type Variants } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Building2,
  ShieldCheck,
  Globe,
  Camera,
  Users,
  FileText,
  Calendar,
  Sparkles,
  Plus,
  X,
  Layers,
} from "lucide-react"
import { useAgencyStore } from "@/store/useAgencyStore"

interface IdentityStepProps {
  onSave?: () => void
  isSubmitting?: boolean
  onCancel?: () => void
  onNext?: () => void
}

const AVAILABLE_SPECIALISATIONS = [
  "Residential",
  "Commercial",
  "Luxury Villas",
  "New Developments",
  "Rentals",
  "Land & Plots",
  "Investment Properties",
]

const AVAILABLE_PORTALS = [
  "ImmoScout24",
  "Homegate",
  "RealAdvisor",
  "Flatfox",
  "Acheter-Louer",
  "Properstar",
]

const SWISS_CANTONS = [
  "Geneva (GE)",
  "Vaud (VD)",
  "Valais (VS)",
  "Zurich (ZH)",
  "Bern (BE)",
  "Basel (BS/BL)",
  "Lucerne (LU)",
  "Ticino (TI)",
  "Neuchâtel (NE)",
  "Fribourg (FR)",
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
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

export default function IdentityStep({
  onSave,
  isSubmitting = false,
  onCancel,
  onNext,
}: IdentityStepProps) {
  const {
    formData,
    setFormData,
    updateCompanyIdentity,
    updateSubNestedField,
    toggleArrayItem,
    setArrayField,
  } = useAgencyStore()

  const identity = formData.company_identity
  const [newCountry, setNewCountry] = useState("")

  const handleAddCountry = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ("key" in e && e.key !== "Enter") return
    e.preventDefault()
    if (newCountry.trim() && !identity.countries_of_operation.includes(newCountry.trim())) {
      setArrayField("company_identity", "countries_of_operation", [
        ...identity.countries_of_operation,
        newCountry.trim(),
      ])
      setNewCountry("")
    }
  }

  const handleRemoveCountry = (country: string) => {
    setArrayField(
      "company_identity",
      "countries_of_operation",
      identity.countries_of_operation.filter((c) => c !== country)
    )
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
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              Company Identity & Profile
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Enter official agency legal credentials, operational coverage, and digital footprint.
            </p>
          </div>
        </div>
      </motion.div>

      {/* TOP GRID: Agency Details + Registration */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* LEFT 2-COLS: Agency Profile */}
        <motion.div variants={cardVariants} className="xl:col-span-2">
          <Card className="border border-gray-100 dark:border-gray-800 shadow-sm rounded-2xl overflow-hidden bg-card h-full">
            <CardContent className="p-6 sm:p-7 space-y-6">
              <div className="flex items-center gap-2.5 pb-4 border-b border-gray-100 dark:border-gray-800">
                <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                  Agency Details
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Person ID */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Person ID <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="number"
                    min="1"
                    value={formData.person_id || ""}
                    onChange={(e) =>
                      setFormData({ person_id: parseInt(e.target.value, 10) || 0 })
                    }
                    placeholder="Enter existing person ID"
                    className="h-11 rounded-xl"
                  />
                  <p className="text-[11px] text-muted-foreground">
                    Enter the ID of the person linked to this agency.
                  </p>
                </motion.div>

                {/* Agency Legal Name */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Agency Legal Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={identity.agency_legal_name}
                    onChange={(e) => updateCompanyIdentity("agency_legal_name", e.target.value)}
                    placeholder="e.g. Horizon Real Estate SA"
                    className="h-11 rounded-xl"
                  />
                </motion.div>

                {/* Trading Name / Brand */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Trading Name / Brand
                  </label>
                  <Input
                    value={identity.trading_name_brand}
                    onChange={(e) => updateCompanyIdentity("trading_name_brand", e.target.value)}
                    placeholder="e.g. Horizon Living"
                    className="h-11 rounded-xl"
                  />
                </motion.div>

                {/* Agency Type */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Agency Type
                  </label>
                  <Select
                    value={identity.agency_type || "independent"}
                    onValueChange={(v) => updateCompanyIdentity("agency_type", v)}
                  >
                    <SelectTrigger className="h-11 rounded-xl">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="independent">Independent Agency</SelectItem>
                      <SelectItem value="franchise">Franchise</SelectItem>
                      <SelectItem value="network">Network Member</SelectItem>
                      <SelectItem value="boutique">Boutique</SelectItem>
                      <SelectItem value="corporate">Corporate Group</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                {/* Founding Year */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Founding Year
                  </label>
                  <Input
                    type="number"
                    value={identity.founding_year || ""}
                    onChange={(e) =>
                      updateCompanyIdentity("founding_year", parseInt(e.target.value, 10) || 0)
                    }
                    placeholder="e.g. 2015"
                    className="h-11 rounded-xl"
                  />
                </motion.div>

                {/* Number of Agents / Staff Size */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Staff Size Bracket
                  </label>
                  <Select
                    value={identity.staff_size_bracket || "1-10"}
                    onValueChange={(v) => updateCompanyIdentity("staff_size_bracket", v)}
                  >
                    <SelectTrigger className="h-11 rounded-xl">
                      <SelectValue placeholder="Select staff size" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="1-5">1 - 5 Agents</SelectItem>
                      <SelectItem value="1-10">1 - 10 Agents</SelectItem>
                      <SelectItem value="11-25">11 - 25 Agents</SelectItem>
                      <SelectItem value="26-50">26 - 50 Agents</SelectItem>
                      <SelectItem value="50+">50+ Agents</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                {/* Total Active Agents Count */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Total Active Agents
                  </label>
                  <Input
                    type="number"
                    value={identity.total_agents || ""}
                    onChange={(e) =>
                      updateCompanyIdentity("total_agents", parseInt(e.target.value, 10) || 0)
                    }
                    placeholder="e.g. 8"
                    className="h-11 rounded-xl"
                  />
                </motion.div>

                {/* Number of Offices */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Number of Offices
                  </label>
                  <Input
                    type="number"
                    value={identity.offices_count || ""}
                    onChange={(e) =>
                      updateCompanyIdentity("offices_count", parseInt(e.target.value, 10) || 0)
                    }
                    placeholder="e.g. 2"
                    className="h-11 rounded-xl"
                  />
                </motion.div>

                {/* Primary Market */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Primary Market
                  </label>
                  <Select
                    value={identity.primary_market || "residential"}
                    onValueChange={(v) => updateCompanyIdentity("primary_market", v)}
                  >
                    <SelectTrigger className="h-11 rounded-xl">
                      <SelectValue placeholder="Select market" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="luxury">Luxury / High-End</SelectItem>
                      <SelectItem value="industrial">Industrial</SelectItem>
                      <SelectItem value="mixed">Mixed Use</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                {/* Incorporation Date */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Incorporation Date
                  </label>
                  <div className="relative">
                    <Input
                      type="date"
                      value={identity.incorporation_date ? identity.incorporation_date.split("T")[0] : ""}
                      onChange={(e) => updateCompanyIdentity("incorporation_date", e.target.value)}
                      className="h-11 rounded-xl pr-10"
                    />
                    <Calendar className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </motion.div>
              </div>

              {/* Countries of Operation */}
              <motion.div variants={itemVariants} className="space-y-2 pt-2">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Countries of Operation
                </label>
                <div className="flex flex-wrap gap-2 items-center p-3 rounded-xl border border-input bg-background/50 min-h-[46px]">
                  {identity.countries_of_operation.map((country) => (
                    <Badge
                      key={country}
                      variant="secondary"
                      className="gap-1.5 px-3 py-1 text-xs font-medium rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                    >
                      {country}
                      <button
                        type="button"
                        onClick={() => handleRemoveCountry(country)}
                        className="text-blue-400 hover:text-blue-700 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                  <div className="flex items-center gap-1.5">
                    <Input
                      value={newCountry}
                      onChange={(e) => setNewCountry(e.target.value)}
                      onKeyDown={handleAddCountry}
                      placeholder="Add country and press Enter..."
                      className="h-7 text-xs border-0 bg-transparent shadow-none focus-visible:ring-0 w-48 px-1"
                    />
                    {newCountry && (
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={handleAddCountry}
                        className="h-7 px-2 text-xs"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Cantons of Operation */}
              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Cantons of Operation
                </label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {SWISS_CANTONS.map((canton) => {
                    const isSelected = identity.cantons_of_operation?.includes(canton)
                    return (
                      <button
                        key={canton}
                        type="button"
                        onClick={() => toggleArrayItem("company_identity", "cantons_of_operation", canton)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${isSelected
                          ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                          : "bg-muted/40 text-muted-foreground border-transparent hover:bg-muted"
                          }`}
                      >
                        {canton}
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* RIGHT 1-COL: Legal Registration & Credentials */}
        <motion.div variants={cardVariants} className="xl:col-span-1">
          <Card className="border border-gray-100 dark:border-gray-800 shadow-sm rounded-2xl overflow-hidden bg-card h-full">
            <CardContent className="p-6 sm:p-7 space-y-5">
              <div className="flex items-center gap-2.5 pb-4 border-b border-gray-100 dark:border-gray-800">
                <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                  Registration & Legal
                </h3>
              </div>

              {/* Franchise / Network Name */}
              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Franchise / Network Name
                </label>
                <Input
                  value={identity.franchise_name}
                  onChange={(e) => updateCompanyIdentity("franchise_name", e.target.value)}
                  placeholder="e.g. Engel & Völkers Network"
                  className="h-11 rounded-xl"
                />
              </motion.div>

              {/* Company Registration Number */}
              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Registration Number (CH-ID)
                </label>
                <Input
                  value={identity.company_registration_no}
                  onChange={(e) => updateCompanyIdentity("company_registration_no", e.target.value)}
                  placeholder="CHE-123.456.789"
                  className="h-11 rounded-xl"
                />
              </motion.div>

              {/* VAT / UID / TVA Number */}
              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  VAT / TVA / UID Number
                </label>
                <Input
                  value={identity.vat_number}
                  onChange={(e) => updateCompanyIdentity("vat_number", e.target.value)}
                  placeholder="CHE-123.456.789 TVA"
                  className="h-11 rounded-xl"
                />
              </motion.div>

              {/* Specialisations Tag Group */}
              <motion.div variants={itemVariants} className="space-y-2 pt-2">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Specialisation
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {AVAILABLE_SPECIALISATIONS.map((spec) => {
                    const isSelected = identity.specialisation?.includes(spec)
                    return (
                      <button
                        key={spec}
                        type="button"
                        onClick={() => toggleArrayItem("company_identity", "specialisation", spec)}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-medium border transition-all ${isSelected
                          ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                          : "bg-muted/40 text-muted-foreground border-transparent hover:bg-muted"
                          }`}
                      >
                        {spec}
                      </button>
                    )
                  })}
                </div>
              </motion.div>

              {/* Portals Used Group */}
              <motion.div variants={itemVariants} className="space-y-2 pt-2">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-blue-500" />
                  Portals Used
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {AVAILABLE_PORTALS.map((portal) => {
                    const isSelected = identity.portals_used?.includes(portal)
                    return (
                      <button
                        key={portal}
                        type="button"
                        onClick={() => toggleArrayItem("company_identity", "portals_used", portal)}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-medium border transition-all ${isSelected
                          ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                          : "bg-muted/40 text-muted-foreground border-transparent hover:bg-muted"
                          }`}
                      >
                        {portal}
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* FULL WIDTH: Digital & Social Presence */}
      <motion.div variants={cardVariants}>
        <Card className="border border-gray-100 dark:border-gray-800 shadow-sm rounded-2xl overflow-hidden bg-card">
          <CardContent className="p-6 sm:p-7 space-y-5">
            <div className="flex items-center gap-2.5 pb-4 border-b border-gray-100 dark:border-gray-800">
              <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                Digital & Social Media Presence
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Agency Website */}
              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Agency Website
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-muted-foreground">
                    <Globe className="w-4 h-4 text-blue-500" />
                  </div>
                  <Input
                    value={identity.agency_website}
                    onChange={(e) => updateCompanyIdentity("agency_website", e.target.value)}
                    placeholder="https://agency-domain.com"
                    className="h-11 rounded-xl pl-10"
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
                    <Camera className="w-4 h-4 text-pink-500" />
                  </div>
                  <Input
                    value={identity.social_media.instagram}
                    onChange={(e) =>
                      updateSubNestedField("company_identity", "social_media", "instagram", e.target.value)
                    }
                    placeholder="@agency_instagram"
                    className="h-11 rounded-xl pl-10"
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
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  <Input
                    value={identity.social_media.facebook}
                    onChange={(e) =>
                      updateSubNestedField("company_identity", "social_media", "facebook", e.target.value)
                    }
                    placeholder="facebook.com/agency"
                    className="h-11 rounded-xl pl-10"
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
                    <FileText className="w-4 h-4 text-blue-700" />
                  </div>
                  <Input
                    value={identity.social_media.linkedin}
                    onChange={(e) =>
                      updateSubNestedField("company_identity", "social_media", "linkedin", e.target.value)
                    }
                    placeholder="linkedin.com/company/agency"
                    className="h-11 rounded-xl pl-10"
                  />
                </div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Navigation Actions */}
      {/* <motion.div variants={cardVariants} className="flex items-center justify-between pt-4">
        {onCancel ? (
          <Button type="button" variant="outline" onClick={onCancel} className="rounded-xl h-11 px-6">
            Cancel
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
              Continue to Address
            </Button>
          )}
        </div>
      </motion.div> */}
    </motion.div>
  )
}