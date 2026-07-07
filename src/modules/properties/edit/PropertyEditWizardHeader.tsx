import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Save, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { usePropertyCreationStore } from "../create/store/propertyCreationStore"
import { usePropertyStore } from "@/store/propertyStore"
import { toast } from "@/lib/toast"
import type { PropertyPayload } from "@/types/property.types"

interface Props {
  propertyId: number
}

export default function PropertyEditWizardHeader({ propertyId }: Props) {
  const navigate = useNavigate()
  const { form } = usePropertyCreationStore()
  const { updateProperty, saving } = usePropertyStore()
  const [isSavingDraft, setIsSavingDraft] = useState(false)

  // ─── Build payload from wizard store ────────────────────────────────────────
  const buildPayload = (overrideStatus?: string): PropertyPayload => ({
    title: form.title || "Untitled Property",
    listing_type: (form.listingType as any) || "sale",
    price: form.price || "0",

    description: form.description || null,
    status: (overrideStatus ?? form.publicationStatus ?? "draft") as any,
    type: form.propertyType || null,

    address: form.address || null,
    city: form.city || null,
    state: form.state || null,
    zip_code: form.zipCode || null,
    latitude: form.latitude || null,
    longitude: form.longitude || null,
    neighborhood_description: form.locationDescription || null,

    bedrooms: form.bedrooms || 0,
    bathrooms: form.bathrooms || 0,
    area: form.builtUpArea || form.area || 0,
    balconies: form.balconies || 0,
    floor_number: Number(form.floorNumber) || 0,
    total_floors: Number(form.totalFloors) || 0,
    year_built: Number(form.yearBuilt) || 0,
    furnishing_status: (form.furnishing as any) || null,
    facing_direction: (form.facing as any) || null,

    covered_parking: Boolean(form.coveredParking),
    open_parking: Boolean(form.openParking),
    parking_slots: Number(form.parkingSlots) || 0,

    tax_percentage: form.taxPercentage || null,
    maintenance_charges: form.maintenanceFee || "0",
    discount: form.discount || null,

    indoor_amenities: form.amenities || [],
    outdoor_features: [],
    smart_features: [],
    high_value_assets: [],

    video_url: null,
    virtual_tour_url: null,
    title_deed: null,
    floor_plan: null,
    id_proof: null,
    legal_documents: null,
    keywords: form.keywords || [],
  })

  // ─── Save as draft ───────────────────────────────────────────────────────────
  const handleSaveDraft = async () => {
    try {
      setIsSavingDraft(true)
      const payload = buildPayload("draft")
      await updateProperty(propertyId, payload)
    } catch {
      toast.error("An unexpected error occurred.")
    } finally {
      setIsSavingDraft(false)
    }
  }

  // ─── Save & publish ──────────────────────────────────────────────────────────
  const handleUpdate = async () => {
    try {
      const payload = buildPayload()
      const success = await updateProperty(propertyId, payload)
      if (success) {
        navigate("/properties/list")
      }
    } catch {
      toast.error("An unexpected error occurred.")
    }
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      {/* ── Left: Breadcrumb + title ─────────────────────────────────────────── */}
      <div className="space-y-1">
        {/* Back link */}
        <button
          onClick={() => navigate("/properties/list")}
          className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Properties
        </button>

        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Edit Property</h1>
          <Badge variant="outline" className="text-xs font-normal">
            ID #{propertyId}
          </Badge>
        </div>

        <p className="text-muted-foreground">
          Update the property listing details and save your changes.
        </p>
      </div>

      {/* ── Right: Actions ───────────────────────────────────────────────────── */}
      <div className="flex shrink-0 gap-2">
        <Button
          variant="outline"
          onClick={handleSaveDraft}
          disabled={isSavingDraft || saving}
        >
          <Save className="mr-1.5 h-4 w-4" />
          {isSavingDraft ? "Saving…" : "Save Draft"}
        </Button>

        <Button
          onClick={handleUpdate}
          disabled={saving || isSavingDraft}
        >
          <Send className="mr-1.5 h-4 w-4" />
          {saving ? "Updating…" : "Update Property"}
        </Button>
      </div>
    </div>
  )
}
