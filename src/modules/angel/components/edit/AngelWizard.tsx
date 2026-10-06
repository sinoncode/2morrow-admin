import { useState } from "react"

// The step components live under src/modules/angel/components/steps, so adjust
// the relative import from this file's directory (`edit`) to the shared steps folder.
import IdentityStep from "../../steps/IdentityStep"
import InternationalAddressesStep from "../../steps/InternationalAddressesStep"
import PartnershipAgreementStep from "../../steps/PartnershipAgreementStep"
import CRMAccessStep from "../../steps/CRMAccessStep"
import CRMAccessRigthsStep from "../../steps/CRMAccessRigths"

// ── FIX 2: If the above doesn't work, try these common alternatives ──
// import { ContactStep } from "@/components/requests/steps/ContactStep"
// import { ContactStep } from "../steps/ContactStep"

import RequestWizardHeader from "./AngelWizardHeader"
import RequestWizardNavigation from "./AngelWizardNavigation" // ← FIX 3: Same folder

const steps = ["Contacts", "Requests & Search", "Calls", "Mails"]

// ── FIX 4: Shared form state so data persists across steps ──
interface WizardData {
  identity?: any
  internationalAddresses?: any
  partnershipAgreement?: any
  crmAccess?: any
  crmAccessRights?: any
}

export default function RequestWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [wizardData, setWizardData] = useState<WizardData>({})

  const updateStepData = (stepKey: keyof WizardData, data: any) => {
    setWizardData(prev => ({ ...prev, [stepKey]: data }))
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <IdentityStep
            data={wizardData.identity}
            onChange={(data) => updateStepData("identity", data)}
          />
        )
      case 1:
        return (
          <InternationalAddressesStep
            data={wizardData.internationalAddresses}
            onChange={(data) => updateStepData("internationalAddresses", data)}
          />
        )
      case 2:
        return (
          <PartnershipAgreementStep
            data={wizardData.partnershipAgreement}
            onChange={(data) => updateStepData("partnershipAgreement", data)}
          />
        )
      case 3:
        return (
          <CRMAccessStep
            data={wizardData.crmAccess}
            onChange={(data) => updateStepData("crmAccess", data)}
          />
        )
        case 4:
        return (
          <CRMAccessRigthsStep
            data={wizardData.crmAccessRights}
            onChange={(data) => updateStepData("crmAccessRights", data)}
          />
        )
      default:
        return (
          <IdentityStep
            data={wizardData.identity}
            onChange={(data) => updateStepData("identity", data)}
          />
        )
    }
  }

  // ── FIX 5: Error fallback so you know WHICH step crashes ──
  const [error, setError] = useState<string | null>(null)

  if (error) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-red-600 font-bold">Error in Step {currentStep + 1}</h2>
        <p className="text-muted-foreground">{error}</p>
        <button
          className="mt-4 px-4 py-2 bg-primary text-white rounded"
          onClick={() => setError(null)}
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <RequestWizardHeader />

      <RequestWizardNavigation
        steps={steps}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
      />

      <div className="rounded-xl border bg-card p-6 shadow-sm">
        {/* ── FIX 6: Wrap in error boundary to catch step crashes ── */}
        <StepErrorBoundary onError={(err) => setError(err.message)}>
          {renderStep()}
        </StepErrorBoundary>
      </div>
    </div>
  )
}

// ── FIX 7: Simple error boundary to catch step-level crashes ──
import { Component, ReactNode } from "react"

class StepErrorBoundary extends Component<
  { children: ReactNode; onError: (err: Error) => void },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    this.props.onError(error)
  }

  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}