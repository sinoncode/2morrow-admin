import { useState } from "react"

import ContactStep from "./steps/ContactStep"
import RequestsStep from "./steps/RequestsStep"

import RequestWizardHeader from "./RequestWizardHeader"
import RequestWizardNavigation from "./RequestWizardNavigation"

// Updated to match the exact text from the screenshot
const steps = [
  "Contacts",
  "Requests & Search",
]

export default function RequestWizard() {
  const [currentStep, setCurrentStep] = useState(0)

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <ContactStep />
      case 1: return <RequestsStep />
      default: return <ContactStep />
    }
  }

  return (
    <div className="space-y-6">
      <RequestWizardHeader />

      <RequestWizardNavigation
        steps={steps}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
      />

      {/* Wrapping the step content in a card/container for better separation */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        {renderStep()}
      </div>
    </div>
  )
}