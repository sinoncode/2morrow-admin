import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import IdentityStep from "./steps/IdentityStep"
import InternationalAddressStep from "./steps/InternationalAddressesStep"
import PartnershipAggreementStep from "./steps/PartnershipAgreementStep"
import CRMAccess from "./steps/CRMAccessStep"
import CRMAccessRight from "./steps/CRMAccessRights"
import PerformanceStep from "./steps/PerformanceStep"
import MailStep from "./steps/MailStep"

import RequestWizardHeader from "./RequestWizardHeader"
import RequestWizardNavigation from "./RequestWizardNavigation"
import { useRequestCreationStore, type RequestFormData } from "./store/requestCreationStore"
import { createRequest, updateRequest } from "@/services/request.service"
import { toast } from "@/lib/toast"


const createSteps = ["Employment", "Qualifications", "Specialisation & Territory", "Commission", "Activity & Performance", "Performance"]
const editSteps = ["Contacts", "Requests & Search", "Calls", "Mails"]

interface RequestWizardProps {
  mode?: "create" | "edit"
  requestId?: number | string
  initialFormData?: RequestFormData
}

export default function RequestWizard({
  mode = "create",
  requestId,
  initialFormData,
}: RequestWizardProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const { form, reset, setForm } = useRequestCreationStore()

  useEffect(() => {
    if (initialFormData) {
      setForm(initialFormData)
    } else {
      reset()
    }
  }, [initialFormData, reset, setForm])

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <IdentityStep
            onSave={handleSave}
            isSubmitting={isSubmitting}
            onCancel={handleCancel}
            onNext={() => setCurrentStep(1)}
          />
        )
      case 1:
        return (
          <InternationalAddressStep
            onSave={handleSave}
            isSubmitting={isSubmitting}
            onCancel={handleCancel}
            onBack={() => setCurrentStep(0)}
          />
        )
      case 2:
        return (
          <PartnershipAggreementStep
            onSave={handleSave}
            isSubmitting={isSubmitting}
            onCancel={handleCancel}
            onNext={() => setCurrentStep(3)}
          />
        )

        case 3:
        return (
          <CRMAccess
            onSave={handleSave}
            isSubmitting={isSubmitting}
            onCancel={handleCancel}
            onNext={() => setCurrentStep(4)}
          />
        )

        case 4:
        return (
          <CRMAccessRight
            onSave={handleSave}
            isSubmitting={isSubmitting}
            onCancel={handleCancel}
          />
        ) 

        case 5:
        return (
          <PerformanceStep
            onSave={handleSave}
            isSubmitting={isSubmitting}
            onCancel={handleCancel}
            onNext={() => setCurrentStep(4)}
          />
        )
      case 6:
        return (
          <MailStep
            emails={[]}
          />
        )
      default:
        return (
          <IdentityStep
            onSave={handleSave}
            isSubmitting={isSubmitting}
            onCancel={handleCancel}
            onNext={() => setCurrentStep(1)}
          />
        )
    }
  }

  const payload = {
    first_name: form.first_name,
    last_name: form.last_name,
    phones: form.phones,
    emails: form.emails,
    language: form.language,
    memo: form.memo,
    notes: form.notes,
    status: form.status,
    transaction: form.transaction,
    category: form.category,
    budget_min: form.budget_min,
    budget_max: form.budget_max,
    currency: form.currency,
    zip: form.zip,
    city: form.city,
    country: form.country,
    radius: form.radius,
    rooms_min: form.rooms_min,
    rooms_max: form.rooms_max,
    livable_space_min: form.livable_space_min,
    livable_space_max: form.livable_space_max,
    surface_land_min: form.surface_land_min,
    surface_land_max: form.surface_land_max,
  }

  const handleSave = async () => {
    try {
      setIsSubmitting(true)

      if (mode === "edit") {
        if (!requestId) {
          toast.error("Request ID is required to save changes.")
          return
        }

        await updateRequest(requestId, payload)
        toast.success("Request updated successfully")
      } else {
        await createRequest(payload)
        toast.success("Request created successfully")
      }

      reset()
      navigate("/requests/list")
    } catch (error) {
      console.error(error)
      toast.error(mode === "edit" ? "Unable to update request" : "Unable to create request")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    reset()
    navigate("/requests/list")
  }

  const isEditMode = mode === "edit"
  const title = isEditMode ? "Edit Request" : "Create Request"
  const description = isEditMode
    ? "Update the existing request and save your changes."
    : "Add a new request listing to the CRM"
  const actionLabel = isEditMode ? "Save Changes" : "Save Request"
  const steps = isEditMode ? editSteps : createSteps

  return (
    <div className="space-y-6">
      <RequestWizardHeader
        title={title}
        description={description}
        actionLabel={actionLabel}
        onSave={handleSave}
        isSubmitting={isSubmitting}
        onCancel={handleCancel}
      />

      <RequestWizardNavigation
        steps={steps}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
      />

      <div className="rounded-xl border bg-card p-6 shadow-sm">
        {renderStep()}
      </div>
    </div>
  )
}