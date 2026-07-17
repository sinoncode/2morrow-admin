import { useState } from "react"
import { useNavigate } from "react-router-dom"

import ContactStep from "./steps/ContactStep"
import RequestsStep from "./steps/RequestsStep"

import RequestWizardHeader from "./RequestWizardHeader"
import RequestWizardNavigation from "./RequestWizardNavigation"
import { useRequestCreationStore } from "./store/requestCreationStore"
import { createRequest } from "@/services/request.service"
import { toast } from "@/lib/toast"

const steps = ["Contacts", "Requests & Search"]

export default function RequestWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const { form, reset } = useRequestCreationStore()

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <ContactStep
            onSave={handleSave}
            isSubmitting={isSubmitting}
            onCancel={handleCancel}
            onNext={() => setCurrentStep(1)}
          />
        )
      case 1:
        return (
          <RequestsStep
            onSave={handleSave}
            isSubmitting={isSubmitting}
            onCancel={handleCancel}.
            onBack={() => setCurrentStep(0)}
          />
        )
      default:
        return (
          <ContactStep
            onSave={handleSave}
            isSubmitting={isSubmitting}
            onCancel={handleCancel}
            onNext={() => setCurrentStep(1)}
          />
        )
    }
  }

  const handleSave = async () => {
    try {
      setIsSubmitting(true)

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
};
console.log("Payload:", payload);
console.log("Notes:", payload.notes);
console.log("Type:", typeof payload.notes);

      await createRequest(payload)
      reset()
      toast.success("Request created successfully")
      navigate("/requests")
    } catch (error) {
      console.error(error)
      toast.error("Unable to create request")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    reset()
    navigate("/requests/list")
  }

  return (
    <div className="space-y-6">
      <RequestWizardHeader
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