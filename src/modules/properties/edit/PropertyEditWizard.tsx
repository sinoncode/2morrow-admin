import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

import GeneralStep from "../create/steps/GeneralStep"
import CharacteristicsStep from "../create/steps/CharacteristicsStep"
import PricingStep from "../create/steps/PricingStep"
import DescriptionStep from "../create/steps/DescriptionStep"
import MediaStep from "../create/steps/MediaStep"
import PublicationStep from "../create/steps/PublicationStep"
import MatchingStep from "../create/steps/MatchingStep"
import ProposedStep from "../create/steps/ProposedStep"

import PropertyWizardNavigation from "../create/PropertyWizardNavigation"
import PropertyEditWizardHeader from "./PropertyEditWizardHeader"

import { usePropertyCreationStore } from "../create/store/propertyCreationStore"
import { usePropertyStore } from "@/store/propertyStore"

import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const STEPS = [
  "General",
  "Characteristics",
  "Price",
  "Description",
  "Image",
  "Publication",
  "Matching",
  "Proposed",
]

function renderStep(step: number) {
  switch (step) {
    case 0: return <GeneralStep />
    case 1: return <CharacteristicsStep />
    case 2: return <PricingStep />
    case 3: return <DescriptionStep />
    case 4: return <MediaStep />
    case 5: return <PublicationStep />
    case 6: return <MatchingStep />
    case 7: return <ProposedStep />
    default: return <GeneralStep />
  }
}

export default function PropertyEditWizard() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [currentStep, setCurrentStep] = useState(0)
  const [fetchError, setFetchError] = useState(false)

  const { fetchPropertyById, detailsLoading } = usePropertyStore()
  const { updateField, reset } = usePropertyCreationStore()

  // ─── Hydrate the store with the existing property data ─────────────────────
  useEffect(() => {
    if (!id) return

    reset()
    setFetchError(false)

    fetchPropertyById(Number(id)).then((property) => {
      if (!property) {
        setFetchError(true)
        return
      }

      // Map Property → PropertyFormData field by field
      updateField("title", property.title ?? "")
      updateField("propertyType", property.type ?? "")
      updateField("listingType", property.listing_type ?? "sale")
      updateField("description", property.description ?? "")
      updateField("publicationStatus", (property.status as any) ?? "draft")

      // Location
      updateField("address", property.address ?? "")
      updateField("city", property.city ?? "")
      updateField("state", property.state ?? "")
      updateField("zipCode", property.zip_code ?? "")
      updateField("latitude", property.latitude ?? "")
      updateField("longitude", property.longitude ?? "")
      updateField("locationDescription", property.neighborhood_description ?? "")

      // Specs
      updateField("bedrooms", property.bedrooms ?? 0)
      updateField("bathrooms", property.bathrooms ?? 0)
      updateField("balconies", property.balconies ?? 0)
      updateField("builtUpArea", property.area ?? "")
      updateField("floorNumber", property.floor_number ? String(property.floor_number) : "")
      updateField("totalFloors", property.total_floors ? String(property.total_floors) : "")
      updateField("yearBuilt", property.year_built ? String(property.year_built) : "")
      updateField("furnishing", property.furnishing_status ?? "")
      updateField("facing", property.facing_direction ?? "")

      // Parking
      updateField("coveredParking", property.covered_parking ?? false)
      updateField("openParking", property.open_parking ?? false)
      updateField("parkingSlots", property.parking_slots ? String(property.parking_slots) : "")

      // Pricing
      updateField("price", property.price ?? "")
      updateField("taxPercentage", property.tax_percentage ?? "")
      updateField("maintenanceFee", property.maintenance_charges ?? "")
      updateField("discount", property.discount ?? "")

      // Amenities / Keywords
      updateField("amenities", property.indoor_amenities ?? [])
      updateField("keywords", property.keywords ?? [])

      // Media
      updateField("images", [])
    })

    return () => {
      reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  // ─── Loading skeleton ───────────────────────────────────────────────────────
  if (detailsLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-56" />
            <Skeleton className="h-4 w-72" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-9 w-28" />
            <Skeleton className="h-9 w-36" />
          </div>
        </div>
        <Skeleton className="h-14 w-full rounded-full" />
        <Skeleton className="h-[400px] w-full rounded-xl" />
      </div>
    )
  }

  // ─── Error state ────────────────────────────────────────────────────────────
  if (fetchError) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-xl border bg-card p-10 text-center">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <div>
          <h2 className="text-xl font-semibold">Property Not Found</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            We couldn't load the property with ID&nbsp;<strong>{id}</strong>.
            It may have been deleted or you may not have permission to view it.
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate("/properties/list")}>
          Back to Properties
        </Button>
      </div>
    )
  }

  // ─── Wizard ─────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      <PropertyEditWizardHeader propertyId={Number(id)} />

      <PropertyWizardNavigation
        steps={STEPS}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
      />

      <div className="rounded-xl border bg-card p-6 shadow-sm">
        {renderStep(currentStep)}
      </div>
    </div>
  )
}
