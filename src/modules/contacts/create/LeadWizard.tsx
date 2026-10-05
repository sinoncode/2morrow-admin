import { useState } from "react"

import ClientClassification from "./steps/ClientClassificationStep"
import FinancialProfile from "./steps/FinancialProfileStep"
import PropertySearchCriteria from "./steps/PropertySearchCriteriaStep"
import PropertyForSaleRent from "./steps/PropertyForSaleRentStep"
import CommunicationActivity from "./steps/CommunicationActivityStep"
import RelationshipsLinkedRecords from "./steps/RelationshipsLinkedRecordsStep"

import LeadWizardHeader from "./LeadWizardHeader"
import LeadWizardNavigation from "./LeadWizardNavigation"

import { useLeadCreationStore } from "./store/contactCreationStore"

const steps = [
  "Client Classification",
  "Financial Profile",
  "Property Search Criteria",
  "Property for Sale / Rent",
  "Communication & Activity History",
  "Relationships & Linked Records",
]

export default function LeadWizard() {
  const [currentStep, setCurrentStep] = useState(0)

  const {
    submitContact,
    creating,
    createError,
    createSuccess,
  } = useLeadCreationStore()

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <ClientClassification />

      case 1:
        return <FinancialProfile />

      case 2:
        return <PropertySearchCriteria />

      case 3:
        return <PropertyForSaleRent />

      case 4:
        return <CommunicationActivity />

      case 5:
        return <RelationshipsLinkedRecords />

      default:
        return <ClientClassification />
    }
  }

  const handleSaveContact = async () => {
    await submitContact()
  }

  return (
    <div className="w-full min-w-0 max-w-full overflow-x-hidden space-y-6">

      {/* HEADER */}
      <LeadWizardHeader
        onSaveContact={handleSaveContact}
        isSubmitting={creating}
      />

      {/* ONLY TABS HAVE HORIZONTAL SCROLL */}
      <div
        className="w-full min-w-0 max-w-full"
        style={{ width: "1140px" }}
      >
        <LeadWizardNavigation
          steps={steps}
          currentStep={currentStep}
          onStepChange={setCurrentStep}
        />
      </div>

      {/* FORM - NO HORIZONTAL PAGE SCROLL */}
      <div className="w-full min-w-0 max-w-full overflow-x-hidden rounded-xl border bg-card p-6 shadow-sm">
        {renderStep()}
      </div>

      {/* API STATUS */}
      {(createError || createSuccess) && (
        <div className="w-full">
          {createError && (
            <p className="text-sm font-medium text-destructive">
              {createError}
            </p>
          )}

          {createSuccess && (
            <p className="text-sm font-medium text-green-600">
              Contact created successfully.
            </p>
          )}
        </div>
      )}
    </div>
  )
}