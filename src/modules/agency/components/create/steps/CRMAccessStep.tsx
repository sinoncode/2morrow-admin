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
import { Checkbox } from "@/components/ui/checkbox"
import {
  Key,
  ShieldCheck,
  Zap,
  RefreshCw,
  Copy,
  Check,
  Calendar,
  Lock,
  Eye,
  Server,
  Layers,
} from "lucide-react"
import { useAgencyStore } from "@/store/useAgencyStore"

interface CRMAccessProps {
  onSave?: () => void
  isSubmitting?: boolean
  onCancel?: () => void
  onNext?: () => void
  onBack?: () => void
}

const MLS_SYSTEMS = [
  "MLS Switzerland",
  "Geneva Board of Realtors",
  "Zurich MLS Network",
  "Luxury Real Estate Exchange",
  "European Commercial Portal",
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

export default function CRMAccessStep({
  onSave,
  isSubmitting = false,
  onCancel,
  onNext,
  onBack,
}: CRMAccessProps) {
  const {
    formData,
    updatePortalAccess,
    toggleArrayItem,
  } = useAgencyStore()

  const access = formData.portal_access
  const [copiedKey, setCopiedKey] = useState(false)

  const handleGenerateApiKey = () => {
    const randomKey = `ag_${Math.random().toString(36).substring(2, 10)}_${Date.now().toString(36)}`
    updatePortalAccess("api_key", randomKey)
    updatePortalAccess("api_integration", true)
  }

  const handleCopyKey = () => {
    if (!access.api_key) return
    navigator.clipboard?.writeText(access.api_key)
    setCopiedKey(true)
    setTimeout(() => setCopiedKey(false), 2000)
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
            <Key className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              CRM Portal & API Access Control
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Configure partner agent login credentials, listing publishing scopes, data visibility, and API webhooks.
            </p>
          </div>
        </div>
      </motion.div>

      {/* TOP ROW: Authentication & Scopes (3/5) + API Integration (2/5) */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* LEFT: Authentication & Permissions */}
        <motion.div variants={cardVariants} className="xl:col-span-3">
          <Card className="border border-gray-100 dark:border-gray-800 shadow-sm rounded-2xl overflow-hidden bg-card h-full">
            <CardContent className="p-6 sm:p-7 space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                    Portal Access Credentials
                  </h3>
                </div>

                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <Checkbox
                    checked={access.granted}
                    onCheckedChange={(checked) => updatePortalAccess("granted", checked === true)}
                    className="rounded-md"
                  />
                  <span className={access.granted ? "text-emerald-600 font-bold" : "text-muted-foreground"}>
                    {access.granted ? "Access Active" : "Access Disabled"}
                  </span>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Login Email */}
                <motion.div variants={itemVariants} className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Agency Master Login Email
                  </label>
                  <Input
                    type="email"
                    value={access.login_email}
                    onChange={(e) => updatePortalAccess("login_email", e.target.value)}
                    placeholder="portal@agency-partner.ch"
                    className="h-11 rounded-xl"
                  />
                </motion.div>

                {/* Permission Level */}
                <motion.div variants={itemVariants} className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Permission Level
                  </label>
                  <Select
                    value={access.permission_level || "agent"}
                    onValueChange={(v) => updatePortalAccess("permission_level", v)}
                  >
                    <SelectTrigger className="h-11 rounded-xl">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="admin">Agency Super Admin</SelectItem>
                      <SelectItem value="manager">Branch Manager</SelectItem>
                      <SelectItem value="agent">Certified Partner Agent</SelectItem>
                      <SelectItem value="viewer">Read-Only Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                {/* Listings Publish Scope */}
                <motion.div variants={itemVariants} className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Listings They Can Publish
                  </label>
                  <Select
                    value={access.listings_they_can_publish || "all"}
                    onValueChange={(v) => updatePortalAccess("listings_they_can_publish", v)}
                  >
                    <SelectTrigger className="h-11 rounded-xl">
                      <SelectValue placeholder="Select scope" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="all">All Co-Mandates & Direct Listings</SelectItem>
                      <SelectItem value="exclusive_only">Exclusive Mandates Only</SelectItem>
                      <SelectItem value="review_required">Submission with Admin Review</SelectItem>
                      <SelectItem value="none">Cannot Publish (View Only)</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                {/* Can View Our Listings */}
                <motion.div variants={itemVariants} className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Can View Our Listings
                  </label>
                  <Select
                    value={access.can_view_our_listings || "full_access"}
                    onValueChange={(v) => updatePortalAccess("can_view_our_listings", v)}
                  >
                    <SelectTrigger className="h-11 rounded-xl">
                      <SelectValue placeholder="Select view scope" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="full_access">Full Inventory & Off-Market</SelectItem>
                      <SelectItem value="public_only">Public Listings Only</SelectItem>
                      <SelectItem value="co_mandates_only">Co-Mandated Properties Only</SelectItem>
                      <SelectItem value="none">Restricted</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                {/* Can See Client Data */}
                <motion.div variants={itemVariants} className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Client Data Visibility
                  </label>
                  <Select
                    value={access.can_see_client_data || "full"}
                    onValueChange={(v) => updatePortalAccess("can_see_client_data", v)}
                  >
                    <SelectTrigger className="h-11 rounded-xl">
                      <SelectValue placeholder="Select data privacy" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="full">Full Contact Details</SelectItem>
                      <SelectItem value="masked">Masked / Anonymized</SelectItem>
                      <SelectItem value="none">No Client Data (Hidden)</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                {/* Max Active Listings */}
                <motion.div variants={itemVariants} className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Max Active Listings Allocation
                  </label>
                  <Input
                    type="number"
                    value={access.max_active_listings || ""}
                    onChange={(e) =>
                      updatePortalAccess("max_active_listings", parseInt(e.target.value, 10) || 0)
                    }
                    placeholder="e.g. 50"
                    className="h-11 rounded-xl"
                  />
                </motion.div>
              </div>

              {/* Extra Permissions Toggle */}
              <div className="pt-2">
                <label className="flex items-center gap-3 p-3.5 rounded-xl border border-input bg-muted/20 cursor-pointer">
                  <Checkbox
                    checked={access.can_access_reports}
                    onCheckedChange={(checked) =>
                      updatePortalAccess("can_access_reports", checked === true)
                    }
                    className="rounded-md"
                  />
                  <div>
                    <p className="text-xs font-semibold text-gray-900 dark:text-white">
                      Access Performance & Financial Analytics Reports
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      Grants permission to download monthly referral and commission statements.
                    </p>
                  </div>
                </label>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* RIGHT: API & Webhook Configuration */}
        <motion.div variants={cardVariants} className="xl:col-span-2">
          <Card className="border border-gray-100 dark:border-gray-800 shadow-sm rounded-2xl overflow-hidden bg-card h-full">
            <CardContent className="p-6 sm:p-7 space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2.5">
                  <Zap className="w-5 h-5 text-amber-500" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                    API & Feed Sync
                  </h3>
                </div>

                <label className="flex items-center gap-2 text-xs font-medium cursor-pointer text-muted-foreground">
                  <Checkbox
                    checked={access.api_integration}
                    onCheckedChange={(checked) =>
                      updatePortalAccess("api_integration", checked === true)
                    }
                    className="rounded-md"
                  />
                  API Enabled
                </label>
              </div>

              {/* API Key */}
              <motion.div variants={itemVariants} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Agency Secret API Key
                  </label>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={handleGenerateApiKey}
                    className="h-7 text-xs text-blue-600 hover:text-blue-700 gap-1 px-2"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Generate
                  </Button>
                </div>
                <div className="relative">
                  <Input
                    value={access.api_key}
                    onChange={(e) => updatePortalAccess("api_key", e.target.value)}
                    placeholder="Click Generate to issue key"
                    className="h-11 rounded-xl font-mono text-xs pr-10"
                  />
                  {access.api_key && (
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={handleCopyKey}
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-muted-foreground"
                    >
                      {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </Button>
                  )}
                </div>
              </motion.div>

              {/* Feed Format */}
              <motion.div variants={itemVariants} className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Listing Feed Format
                </label>
                <Select
                  value={access.listing_feed_format || "JSON"}
                  onValueChange={(v) => updatePortalAccess("listing_feed_format", v)}
                >
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="JSON">REST / JSON Feed</SelectItem>
                    <SelectItem value="XML">OpenImmo / XML Stream</SelectItem>
                    <SelectItem value="RETS">IDX / RETS Protocol</SelectItem>
                    <SelectItem value="CSV">Automated SFTP / CSV</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>

              {/* Auto Sync Frequency */}
              <motion.div variants={itemVariants} className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Auto-Sync Frequency
                </label>
                <Select
                  value={access.auto_sync_frequency || "Daily"}
                  onValueChange={(v) => updatePortalAccess("auto_sync_frequency", v)}
                >
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="Real-time">Real-time Webhook</SelectItem>
                    <SelectItem value="Hourly">Hourly Sync</SelectItem>
                    <SelectItem value="Daily">Daily at 02:00 AM</SelectItem>
                    <SelectItem value="Weekly">Weekly Digest</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* FULL WIDTH: MLS Access Systems */}
      <motion.div variants={cardVariants}>
        <Card className="border border-gray-100 dark:border-gray-800 shadow-sm rounded-2xl overflow-hidden bg-card">
          <CardContent className="p-6 sm:p-7 space-y-4">
            <div className="flex items-center gap-2.5 pb-4 border-b border-gray-100 dark:border-gray-800">
              <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                Multi-Listing Service (MLS) System Interconnects
              </h3>
            </div>

            <p className="text-xs text-muted-foreground">
              Select which multi-agency networks and syndicated listing hubs this agency has verified federation with:
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {MLS_SYSTEMS.map((system) => {
                const isSelected = access.mls_access?.includes(system)
                return (
                  <button
                    key={system}
                    type="button"
                    onClick={() => toggleArrayItem("portal_access", "mls_access", system)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${isSelected
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20"
                      : "bg-muted/30 text-muted-foreground border-transparent hover:bg-muted"
                      }`}
                  >
                    {system} {isSelected && "✓"}
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Navigation Actions */}
      {/* <motion.div variants={cardVariants} className="flex items-center justify-between pt-4">
        {onBack ? (
          <Button type="button" variant="outline" onClick={onBack} className="rounded-xl h-11 px-6">
            Back: Partnership
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
              Continue to Activity
            </Button>
          )}
        </div>
      </motion.div> */}
    </motion.div>
  )
}