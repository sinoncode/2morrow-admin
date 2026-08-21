"use client"

import React, { useState } from "react"
import { motion, type Variants } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  MapPin,
  Mail,
  User,
  Building,
  Phone,
  Copy,
  Check,
  ShieldAlert,
} from "lucide-react"
import { useAgencyStore } from "@/store/useAgencyStore"

interface AddressStepProps {
  onSave?: () => void
  isSubmitting?: boolean
  onCancel?: () => void
  onNext?: () => void
  onBack?: () => void
}

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

export default function InternationalAddressesStep({
  onSave,
  isSubmitting = false,
  onCancel,
  onNext,
  onBack,
}: AddressStepProps) {
  const {
    formData,
    updateAddressContact,
    updateAddress,
  } = useAgencyStore()

  const contact = formData.address_contact
  const [copiedAddress, setCopiedAddress] = useState(false)

  const handleCopyRegisteredToOffice = () => {
    updateAddressContact("office_address", { ...contact.registered_address })
    setCopiedAddress(true)
    setTimeout(() => setCopiedAddress(false), 2000)
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
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              Addresses & Contact Information
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Specify registered and operational headquarters, primary channels, and executive contacts.
            </p>
          </div>
        </div>
      </motion.div>

      {/* 2-COL GRID: Registered Address vs Office Address */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Registered Address */}
        <motion.div variants={cardVariants}>
          <Card className="border border-gray-100 dark:border-gray-800 shadow-sm rounded-2xl overflow-hidden bg-card h-full">
            <CardContent className="p-6 sm:p-7 space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2.5">
                  <Building className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                    Registered Headquarters Address
                  </h3>
                </div>
              </div>

              <div className="space-y-4">
                <motion.div variants={itemVariants} className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Address Line 1 <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={contact.registered_address.line_1}
                    onChange={(e) => updateAddress("registered_address", "line_1", e.target.value)}
                    placeholder="Rue du Rhône 42"
                    className="h-11 rounded-xl"
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Address Line 2 (Building / Suite)
                  </label>
                  <Input
                    value={contact.registered_address.line_2}
                    onChange={(e) => updateAddress("registered_address", "line_2", e.target.value)}
                    placeholder="4th Floor, Suite A"
                    className="h-11 rounded-xl"
                  />
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <motion.div variants={itemVariants} className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      ZIP Code <span className="text-red-500">*</span>
                    </label>
                    <Input
                      value={contact.registered_address.zip_code}
                      onChange={(e) => updateAddress("registered_address", "zip_code", e.target.value)}
                      placeholder="1204"
                      className="h-11 rounded-xl"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      City <span className="text-red-500">*</span>
                    </label>
                    <Input
                      value={contact.registered_address.city}
                      onChange={(e) => updateAddress("registered_address", "city", e.target.value)}
                      placeholder="Geneva"
                      className="h-11 rounded-xl"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Country
                    </label>
                    <Input
                      value={contact.registered_address.country}
                      onChange={(e) => updateAddress("registered_address", "country", e.target.value)}
                      placeholder="Switzerland"
                      className="h-11 rounded-xl"
                    />
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Office / Physical Address */}
        <motion.div variants={cardVariants}>
          <Card className="border border-gray-100 dark:border-gray-800 shadow-sm rounded-2xl overflow-hidden bg-card h-full">
            <CardContent className="p-6 sm:p-7 space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                    Operational / Office Address
                  </h3>
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={handleCopyRegisteredToOffice}
                  className="h-8 text-xs gap-1.5 rounded-lg border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-900 dark:text-blue-400 dark:hover:bg-blue-900/30"
                >
                  {copiedAddress ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedAddress ? "Copied!" : "Same as Registered"}
                </Button>
              </div>

              <div className="space-y-4">
                <motion.div variants={itemVariants} className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Office Address Line 1
                  </label>
                  <Input
                    value={contact.office_address.line_1}
                    onChange={(e) => updateAddress("office_address", "line_1", e.target.value)}
                    placeholder="Place de la Fusterie 10"
                    className="h-11 rounded-xl"
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Office Address Line 2
                  </label>
                  <Input
                    value={contact.office_address.line_2}
                    onChange={(e) => updateAddress("office_address", "line_2", e.target.value)}
                    placeholder="Building B"
                    className="h-11 rounded-xl"
                  />
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <motion.div variants={itemVariants} className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      ZIP Code
                    </label>
                    <Input
                      value={contact.office_address.zip_code}
                      onChange={(e) => updateAddress("office_address", "zip_code", e.target.value)}
                      placeholder="1204"
                      className="h-11 rounded-xl"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      City
                    </label>
                    <Input
                      value={contact.office_address.city}
                      onChange={(e) => updateAddress("office_address", "city", e.target.value)}
                      placeholder="Geneva"
                      className="h-11 rounded-xl"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Country
                    </label>
                    <Input
                      value={contact.office_address.country}
                      onChange={(e) => updateAddress("office_address", "country", e.target.value)}
                      placeholder="Switzerland"
                      className="h-11 rounded-xl"
                    />
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* 2-COL GRID: Communication Channels vs Executive Stakeholders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Communication Channels */}
        <motion.div variants={cardVariants}>
          <Card className="border border-gray-100 dark:border-gray-800 shadow-sm rounded-2xl overflow-hidden bg-card h-full">
            <CardContent className="p-6 sm:p-7 space-y-5">
              <div className="flex items-center gap-2.5 pb-4 border-b border-gray-100 dark:border-gray-800">
                <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                  Primary Agency Contacts
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.div variants={itemVariants} className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    General Office Phone
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <Input
                      value={contact.general_phone}
                      onChange={(e) => updateAddressContact("general_phone", e.target.value)}
                      placeholder="+41 22 123 45 67"
                      className="h-11 rounded-xl pl-10"
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    General Office Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <Input
                      type="email"
                      value={contact.general_email}
                      onChange={(e) => updateAddressContact("general_email", e.target.value)}
                      placeholder="info@agency-domain.ch"
                      className="h-11 rounded-xl pl-10"
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Primary Contact Person ID
                  </label>
                  <Input
                    type="number"
                    value={contact.primary_contact_person_id || ""}
                    onChange={(e) =>
                      updateAddressContact("primary_contact_person_id", parseInt(e.target.value, 10) || 0)
                    }
                    placeholder="Contact ID e.g. 101"
                    className="h-11 rounded-xl"
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Secondary Contact Person ID
                  </label>
                  <Input
                    type="number"
                    value={contact.secondary_contact_person_id || ""}
                    onChange={(e) =>
                      updateAddressContact("secondary_contact_person_id", parseInt(e.target.value, 10) || 0)
                    }
                    placeholder="Contact ID e.g. 102"
                    className="h-11 rounded-xl"
                  />
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Director / Owner / Emergency Details */}
        <motion.div variants={cardVariants}>
          <Card className="border border-gray-100 dark:border-gray-800 shadow-sm rounded-2xl overflow-hidden bg-card h-full">
            <CardContent className="p-6 sm:p-7 space-y-5">
              <div className="flex items-center gap-2.5 pb-4 border-b border-gray-100 dark:border-gray-800">
                <User className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                  Director & Emergency Escalations
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.div variants={itemVariants} className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Director / Managing Partner Name
                  </label>
                  <Input
                    value={contact.director_owner_name}
                    onChange={(e) => updateAddressContact("director_owner_name", e.target.value)}
                    placeholder="Jean-Marc Blanc"
                    className="h-11 rounded-xl"
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Director Email
                  </label>
                  <Input
                    type="email"
                    value={contact.director_owner_email}
                    onChange={(e) => updateAddressContact("director_owner_email", e.target.value)}
                    placeholder="jm.blanc@agency.ch"
                    className="h-11 rounded-xl"
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Director Direct Phone
                  </label>
                  <Input
                    value={contact.director_owner_phone}
                    onChange={(e) => updateAddressContact("director_owner_phone", e.target.value)}
                    placeholder="+41 79 987 65 43"
                    className="h-11 rounded-xl"
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
                    After-Hours Emergency Contact
                  </label>
                  <Input
                    value={contact.after_hours_emergency_contact}
                    onChange={(e) =>
                      updateAddressContact("after_hours_emergency_contact", e.target.value)
                    }
                    placeholder="+41 78 555 01 99 (24/7 Hotline)"
                    className="h-11 rounded-xl"
                  />
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Navigation Actions */}
      {/* <motion.div variants={cardVariants} className="flex items-center justify-between pt-4">
        {onBack ? (
          <Button type="button" variant="outline" onClick={onBack} className="rounded-xl h-11 px-6">
            Back: Identity
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
              Continue to Partnership
            </Button>
          )}
        </div>
      </motion.div> */}
    </motion.div>
  )
}