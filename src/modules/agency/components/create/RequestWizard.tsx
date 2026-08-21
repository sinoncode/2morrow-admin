"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import IdentityStep from "./steps/IdentityStep"
import InternationalAddressesStep from "./steps/InternationalAddressesStep"
import PartnershipAgreementStep from "./steps/PartnershipAgreementStep"
import CRMAccessStep from "./steps/CRMAccessStep"
import CRMAccessRights from "./steps/CRMAccessRights"
import CallStep from "./steps/CallStep"
import MailStep from "./steps/MailStep"

import RequestWizardHeader from "./RequestWizardHeader"
import RequestWizardNavigation from "./RequestWizardNavigation"
import { useAgencyStore } from "@/store/useAgencyStore"
import { toast } from "@/lib/toast"

const createSteps = [
  "Company Identity",
  "Address & Contact",
  "Partnership",
  "CRM Portal Access",
  "Activity & Performance",
]

const editSteps = [
  "Company Identity",
  "Address & Contact",
  "Partnership",
  "CRM Portal Access",
  "Activity & Performance",
  "Calls",
  "Mails",
]

interface RequestWizardProps {
  mode?: "create" | "edit"
  agencyId?: number | string
  requestId?: number | string // alias
}

export default function RequestWizard({
  mode = "create",
  agencyId,
  requestId,
}: RequestWizardProps) {
  const currentId = agencyId ?? requestId
  const isEditMode = mode === "edit"
  const [currentStep, setCurrentStep] = useState(0)
  const navigate = useNavigate()

  const {
    formData,
    loading,
    saving,
    resetForm,
    fetchAgencyProfile,
    submitAgencyProfile,
    updateAgencyProfile,
  } = useAgencyStore()

  useEffect(() => {
    if (isEditMode && currentId) {
      fetchAgencyProfile(currentId)
    } else if (!isEditMode) {
      resetForm()
    }
  }, [isEditMode, currentId, fetchAgencyProfile, resetForm])

  const handleSave = async () => {
    if (!Number.isInteger(formData.person_id) || formData.person_id < 1) {
      toast.error("Please enter a valid Person ID before saving.")
      setCurrentStep(0)
      return
    }

    // Validate basic requirement: agency legal name
    if (!formData.company_identity?.agency_legal_name?.trim()) {
      toast.error("Please enter the Agency Legal Name before saving.")
      setCurrentStep(0)
      return
    }

    if (isEditMode) {
      if (!currentId) {
        toast.error("Agency ID is missing for update.")
        return
      }
      const success = await updateAgencyProfile(currentId)
      if (success) {
        navigate("/agency/list")
      }
    } else {
      const success = await submitAgencyProfile()
      if (success) {
        navigate("/agency/list")
      }
    }
  }

  const handleCancel = () => {
    navigate("/agency/list")
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <IdentityStep
            onSave={handleSave}
            isSubmitting={saving}
            onCancel={handleCancel}
            onNext={() => setCurrentStep(1)}
          />
        )
      case 1:
        return (
          <InternationalAddressesStep
            onSave={handleSave}
            isSubmitting={saving}
            onCancel={handleCancel}
            onNext={() => setCurrentStep(2)}
            onBack={() => setCurrentStep(0)}
          />
        )
      case 2:
        return (
          <PartnershipAgreementStep
            onSave={handleSave}
            isSubmitting={saving}
            onCancel={handleCancel}
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
          />
        )
      case 3:
        return (
          <CRMAccessStep
            onSave={handleSave}
            isSubmitting={saving}
            onCancel={handleCancel}
            onNext={() => setCurrentStep(4)}
            onBack={() => setCurrentStep(2)}
          />
        )
      case 4:
        return (
          <CRMAccessRights
            onSave={handleSave}
            isSubmitting={saving}
            onCancel={handleCancel}
            onBack={() => setCurrentStep(3)}
          />
        )

      case 5:
        return <MailStep emails={[]} />
      default:
        return (
          <IdentityStep
            onSave={handleSave}
            isSubmitting={saving}
            onCancel={handleCancel}
            onNext={() => setCurrentStep(1)}
          />
        )
    }
  }

  const title = isEditMode
    ? formData.company_identity?.agency_legal_name
      ? `Edit ${formData.company_identity.agency_legal_name}`
      : "Edit Agency Profile"
    : "Create Agency Profile"

  const description = isEditMode
    ? "Review and update partner agency details, commercial split, and permission scopes."
    : "Fill out the information below to register and onboard a new partner agency."

  const actionLabel = isEditMode ? "Save Changes (PUT)" : "Create Agency (POST)"
  const steps = isEditMode ? editSteps : createSteps

  if (isEditMode && loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-3">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-medium text-muted-foreground">Loading agency profile details...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-full mx-auto py-2">
      <RequestWizardHeader
        title={title}
        description={description}
        actionLabel={actionLabel}
        onSave={handleSave}
        isSubmitting={saving}
        onCancel={handleCancel}
        mode={mode}
        agencyId={currentId}
      />

      <RequestWizardNavigation
        steps={steps}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
      />

      <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-card p-6 sm:p-8 shadow-sm">
        {renderStep()}
      </div>
    </div>
  )
}